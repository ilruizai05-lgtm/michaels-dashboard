import { createContext, useContext, useMemo, useReducer } from 'react'
import { initialRepairs, initialActivity } from './data/mockData.js'

// ─────────────────────────────────────────────────────────────────────────
// App store — a tiny domain store so the prototype feels live: logging a
// repair on the intake screen actually adds a ticket that shows up on the
// dashboard, writes an activity-log entry, etc.
//
// Single-user: Michael (the owner) is the only account. There is no employee
// role — he is the only one who accesses the dashboard.
// ─────────────────────────────────────────────────────────────────────────

const AppContext = createContext(null)

// The single account. In the real product this comes from an auth provider.
export const account = { name: 'Michael', label: 'Owner', initials: 'M' }

const initialState = {
  user: null, // null = logged out (shows the sign-in screen)
  route: 'dashboard',
  repairs: initialRepairs,
  activity: initialActivity,
  toast: null,
}

let seq = 100
const nextId = (prefix) => `${prefix}${++seq}`

function reducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: account,
        route: 'dashboard',
        activity: [
          { id: nextId('a'), who: account.name, what: 'Signed in', when: 'Just now', kind: 'auth' },
          ...state.activity,
        ],
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
            who: state.user?.name || 'Michael',
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
          who: state.user?.name || 'Michael',
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
      login: () => dispatch({ type: 'LOGIN' }),
      logout: () => dispatch({ type: 'LOGOUT' }),
      navigate: (route) => dispatch({ type: 'NAVIGATE', route }),
      addRepair: (repair) => dispatch({ type: 'ADD_REPAIR', repair }),
      setRepairStatus: (id, status) => dispatch({ type: 'SET_REPAIR_STATUS', id, status }),
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
