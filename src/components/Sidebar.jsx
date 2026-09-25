import { useApp } from '../store.jsx'
import { navItems } from '../data/nav.js'
import Icon from './Icons.jsx'

// Navigation. Single-user dashboard — Michael sees every area.
export default function Sidebar({ open, onClose }) {
  const { state, actions } = useApp()

  return (
    <>
      {/* Mobile scrim */}
      {open && (
        <div className="fixed inset-0 z-30 bg-ink/30 backdrop-blur-[1px] lg:hidden" onClick={onClose} />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-rule bg-surface transition-transform lg:static lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand */}
        <div className="flex items-center gap-2.5 border-b border-rule px-5 py-4">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-green-deep">
            <Icon name="clock" size={15} className="text-gold" />
          </span>
          <div className="leading-tight">
            <div className="font-serif text-[17px] text-ink">Michael's</div>
            <div className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink-mute">
              Dashboard
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <p className="px-2 pb-2 font-mono text-[9px] uppercase tracking-[0.14em] text-ink-mute">
            Watches + rentals
          </p>
          <ul className="space-y-0.5">
            {navItems.map((item) => {
              const activeRoute = state.route === item.key
              return (
                <li key={item.key}>
                  <button
                    type="button"
                    onClick={() => {
                      actions.navigate(item.key)
                      onClose?.()
                    }}
                    className={`flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-sm transition focus-visible:focus-ring ${
                      activeRoute
                        ? 'bg-green text-cream'
                        : 'text-ink-soft hover:bg-cream-2/70 hover:text-ink'
                    }`}
                  >
                    <Icon name={item.icon} size={17} className={activeRoute ? 'text-cream' : 'text-ink-mute'} />
                    {item.label}
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Account footer */}
        <div className="border-t border-rule p-3">
          <div className="flex items-center gap-3 rounded-lg px-2 py-2">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gold font-mono text-[11px] font-medium text-white">
              {state.user.initials}
            </span>
            <div className="min-w-0 flex-1 leading-tight">
              <div className="truncate text-sm text-ink">{state.user.name}</div>
              <div className="font-mono text-[9px] uppercase tracking-[0.12em] text-ink-mute">
                {state.user.label}
              </div>
            </div>
            <button
              type="button"
              onClick={actions.logout}
              title="Sign out"
              className="rounded-md p-1.5 text-ink-mute hover:bg-cream-2 hover:text-ink focus-visible:focus-ring"
            >
              <Icon name="logout" size={16} />
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}
