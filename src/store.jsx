import { createContext, useContext, useMemo, useReducer } from 'react'
import {
  initialRepairs,
  initialEmployees,
  initialActivity,
} from './data/mockData.js'

// ─────────────────────────────────────────────────────────────────────────
// App store — auth + a tiny domain store so the prototype feels live:
// logging a repair on the intake screen actually adds a ticket that shows up
// on the dashboard, writes an activity-log entry, etc.
// ─────────────────────────────────────────────────────────────────────────

const AppContext = createContext(null)

// The two demo accounts. In the real product these come from an auth provider;
// here we just let you pick a role to explore each experience.
export const accounts = {
  owner: { role: 'owner', name: 'Michael', label: 'Owner', initials: 'M' },
  employee: { role: 'employee', name: 'Sarah K.', label: 'Employee', initials: 'SK' },
}

const initialState = {
  user: null, // null = logged out
  route: 'dashboard',
  repairs: initialRepairs,
  employees: initialEmployees,
  activity: initialActivity,
  toast: null,
}

let seq = 100
const nextId = (prefix) => `${prefix}${++seq}`

function reducer(state, action) {
  switch (action.type) {
    case 'LOGIN': {
      const user = accounts[action.role]
      return {
        ...state,
        user,
        route: 'dashboard',
        activity: [
          { id: nextId('a'), who: user.name, what: 'Signed in', when: 'Just now', kind: 'auth' },
          ...state.activity,
        ],
      }
    }

    case 'LOGOUT':
      return { ...state, user: null, route: 'dashboard' }

    case 'NAVIGATE':
      return { ...state, route: action.route }

    case 'ADD_REPAIR': {
      const r = action.repair
      const repair = {
        id: nextId('w'),
        watch: r.watch || 'Untitled watch',
        customer: r.customer || 'New customer',
        detail: `Logged just now · ${r.description ? 'awaiting diagnosis' : 'intake'}`,
        status: 'Logged',
        pill: 'gray',
        cost: r.cost || '—',
        due: r.due || 'TBD',
      }
      return {
        ...state,
        repairs: [repair, ...state.repairs],
        route: 'watches',
        toast: {
          title: 'Repair logged',
          body: `${repair.watch} · ${repair.customer} added. Envelope sent to printer.`,
        },
        activity: [
          {
            id: nextId('a'),
            who: state.user?.name || 'Someone',
            what: `Logged new intake · ${repair.watch} · ${repair.customer}`,
            when: 'Just now',
            kind: 'intake',
          },
          ...state.activity,
        ],
      }
    }

    case 'SET_REPAIR_STATUS': {
      const map = {
        Pickup: { pill: 'green', detail: 'Ready for pickup' },
        Parts: { pill: 'gold', detail: 'Awaiting parts' },
        Active: { pill: 'gold', detail: 'In progress' },
        Quote: { pill: 'gray', detail: 'Quote sent' },
        Logged: { pill: 'gray', detail: 'Awaiting diagnosis' },
      }
      const meta = map[action.status] || { pill: 'gray', detail: action.status }
      let changed
      const repairs = state.repairs.map((rep) => {
        if (rep.id !== action.id) return rep
        changed = rep
        return { ...rep, status: action.status, pill: meta.pill, detail: meta.detail }
      })
      if (!changed) return state
      const activity = [
        {
          id: nextId('a'),
          who: state.user?.name || 'Someone',
          what: `Updated ${changed.watch} · ${changed.customer} to "${action.status}"`,
          when: 'Just now',
          kind: 'status',
        },
        ...state.activity,
      ]
      // Ready-for-pickup fires the Twilio SMS automation.
      if (action.status === 'Pickup') {
        activity.unshift({
          id: nextId('a'),
          who: 'System',
          what: `Sent repair-ready SMS to ${changed.customer}`,
          when: 'Just now',
          kind: 'automation',
        })
      }
      return {
        ...state,
        repairs,
        activity,
        toast:
          action.status === 'Pickup'
            ? { title: 'Marked ready', body: `Repair-ready SMS sent to ${changed.customer}.` }
            : null,
      }
    }

    case 'ADD_EMPLOYEE': {
      const emp = {
        id: nextId('e'),
        name: action.employee.name,
        email: action.employee.email,
        role: 'Employee',
        status: 'Active',
        added: 'Just now',
      }
      return {
        ...state,
        employees: [...state.employees, emp],
        toast: { title: 'Employee added', body: `${emp.name} can now sign in to the watch shop.` },
        activity: [
          {
            id: nextId('a'),
            who: state.user?.name || 'Owner',
            what: `Added employee account · ${emp.name}`,
            when: 'Just now',
            kind: 'admin',
          },
          ...state.activity,
        ],
      }
    }

    case 'REMOVE_EMPLOYEE': {
      const emp = state.employees.find((e) => e.id === action.id)
      return {
        ...state,
        employees: state.employees.filter((e) => e.id !== action.id),
        toast: emp ? { title: 'Employee removed', body: `${emp.name}'s access was revoked.` } : state.toast,
        activity: emp
          ? [
              {
                id: nextId('a'),
                who: state.user?.name || 'Owner',
                what: `Removed employee account · ${emp.name}`,
                when: 'Just now',
                kind: 'admin',
              },
              ...state.activity,
            ]
          : state.activity,
      }
    }

    case 'CLEAR_TOAST':
      return { ...state, toast: null }

    default:
      return state
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  const value = useMemo(() => {
    const actions = {
      login: (role) => dispatch({ type: 'LOGIN', role }),
      logout: () => dispatch({ type: 'LOGOUT' }),
      navigate: (route) => dispatch({ type: 'NAVIGATE', route }),
      addRepair: (repair) => dispatch({ type: 'ADD_REPAIR', repair }),
      setRepairStatus: (id, status) => dispatch({ type: 'SET_REPAIR_STATUS', id, status }),
      addEmployee: (employee) => dispatch({ type: 'ADD_EMPLOYEE', employee }),
      removeEmployee: (id) => dispatch({ type: 'REMOVE_EMPLOYEE', id }),
      clearToast: () => dispatch({ type: 'CLEAR_TOAST' }),
    }
    return { state, actions }
  }, [state])

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
