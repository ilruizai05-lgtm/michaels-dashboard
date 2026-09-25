import { useMemo, useState } from 'react'
import { useApp } from '../store.jsx'
import { sources, rentals, customers } from '../data/mockData.js'
import Icon from './Icons.jsx'

// Global search across watches, customers and properties + quick-add repair
// ticket + per-source last-synced. Single-user, so search spans everything.
export default function Topbar({ onMenu }) {
  const { state, actions } = useApp()
  const [q, setQ] = useState('')
  const [focused, setFocused] = useState(false)

  const results = useMemo(() => {
    const term = q.trim().toLowerCase()
    if (!term) return []
    const out = []
    for (const r of state.repairs) {
      if (`${r.ticket} ${r.watch} ${r.customer}`.toLowerCase().includes(term))
        out.push({ id: r.id, label: `${r.ticket} · ${r.watch} · ${r.customer}`, kind: 'Repair', route: 'watches' })
    }
    for (const c of customers) {
      if (`${c.name} ${c.contact}`.toLowerCase().includes(term))
        out.push({ id: c.id, label: c.name, kind: 'Customer', route: 'customers' })
    }
    for (const r of rentals) {
      if (`${r.property} ${r.tenant}`.toLowerCase().includes(term))
        out.push({ id: r.id, label: `${r.property} · ${r.tenant}`, kind: 'Rental', route: 'rentals' })
    }
    return out.slice(0, 6)
  }, [q, state.repairs])

  return (
    <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-rule bg-cream/90 px-4 py-3 backdrop-blur sm:px-6">
      <button
        type="button"
        onClick={onMenu}
        className="rounded-md p-1.5 text-ink-soft hover:bg-cream-2 lg:hidden focus-visible:focus-ring"
        aria-label="Open navigation"
      >
        <Icon name="grid" />
      </button>

      {/* Search */}
      <div className="relative w-full max-w-md">
        <div className="flex items-center gap-2 rounded-lg border border-rule bg-surface px-3 py-2 focus-within:border-green/50">
          <Icon name="search" size={16} className="shrink-0 text-ink-mute" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setTimeout(() => setFocused(false), 150)}
            placeholder="Search watches, customers, properties…"
            className="w-full bg-transparent text-sm text-ink placeholder:text-ink-mute focus:outline-none"
          />
          <kbd className="hidden shrink-0 rounded border border-rule bg-cream px-1.5 py-0.5 font-mono text-[10px] text-ink-mute sm:block">
            /
          </kbd>
        </div>

        {focused && q.trim() && (
          <div className="absolute left-0 right-0 top-full z-30 mt-2 overflow-hidden rounded-lg border border-rule bg-white shadow-card">
            {results.length === 0 ? (
              <div className="px-3 py-4 text-sm text-ink-mute">No matches for “{q}”.</div>
            ) : (
              <ul className="max-h-72 overflow-y-auto py-1">
                {results.map((r) => (
                  <li key={`${r.kind}-${r.id}`}>
                    <button
                      type="button"
                      onMouseDown={() => {
                        actions.navigate(r.route)
                        setQ('')
                      }}
                      className="flex w-full items-center justify-between gap-3 px-3 py-2 text-left hover:bg-cream"
                    >
                      <span className="truncate text-sm text-ink">{r.label}</span>
                      <span className="shrink-0 font-mono text-[9px] uppercase tracking-[0.1em] text-ink-mute">
                        {r.kind}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

      <div className="ml-auto flex items-center gap-3">
        {/* Per-source last synced */}
        <div className="hidden items-center gap-3 md:flex">
          {sources.map((s) => (
            <span
              key={s.key}
              className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.08em] text-ink-mute"
              title={`${s.name} last synced ${s.syncedAt}${s.status === 'stale' ? ' (stale)' : ''}`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${s.status === 'stale' ? 'bg-gold' : 'bg-green'}`} />
              {s.name} {s.syncedAt}
            </span>
          ))}
        </div>

        {/* Quick-add repair ticket */}
        <button
          type="button"
          onClick={() => actions.navigate('intake')}
          className="inline-flex items-center gap-1.5 rounded-lg bg-green px-3 py-2 text-sm font-medium text-cream transition hover:bg-green-deep focus-visible:focus-ring"
        >
          <Icon name="plus" size={16} className="text-cream" />
          <span className="hidden sm:inline">New repair</span>
        </button>
      </div>
    </header>
  )
}
