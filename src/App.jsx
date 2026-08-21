import { useState } from 'react'
import { AppProvider, useApp } from './store.jsx'
import { navItems } from './data/nav.js'
import Login from './components/Login.jsx'
import Sidebar from './components/Sidebar.jsx'
import Topbar from './components/Topbar.jsx'
import Toast from './components/Toast.jsx'

import OwnerDashboard from './pages/OwnerDashboard.jsx'
import EmployeeDashboard from './pages/EmployeeDashboard.jsx'
import Watches from './pages/Watches.jsx'
import Rentals from './pages/Rentals.jsx'
import Customers from './pages/Customers.jsx'
import Finances from './pages/Finances.jsx'
import Employees from './pages/Employees.jsx'
import Activity from './pages/Activity.jsx'
import RepairIntake from './pages/RepairIntake.jsx'

function Router() {
  const { state } = useApp()
  const role = state.user.role
  const route = state.route

  // Guard: an employee can never land on an owner-only route.
  const allowed = navItems.find((n) => n.key === route)
  const permitted = allowed ? allowed.roles.includes(role) : true
  const safeRoute = permitted ? route : 'dashboard'

  switch (safeRoute) {
    case 'dashboard':
      return role === 'owner' ? <OwnerDashboard /> : <EmployeeDashboard />
    case 'watches':
      return <Watches />
    case 'intake':
      return <RepairIntake />
    case 'customers':
      return <Customers />
    case 'rentals':
      return <Rentals />
    case 'finances':
      return <Finances />
    case 'employees':
      return <Employees />
    case 'activity':
      return <Activity />
    default:
      return role === 'owner' ? <OwnerDashboard /> : <EmployeeDashboard />
  }
}

function Shell() {
  const { state } = useApp()
  const [navOpen, setNavOpen] = useState(false)

  if (!state.user) return <Login />

  return (
    <div className="flex h-screen overflow-hidden bg-cream">
      <Sidebar open={navOpen} onClose={() => setNavOpen(false)} />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar onMenu={() => setNavOpen(true)} />
        <main className="scroll-thin flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <Router />
          </div>
        </main>
      </div>
      <Toast />
    </div>
  )
}

export default function App() {
  return (
    <AppProvider>
      <Shell />
    </AppProvider>
  )
}
