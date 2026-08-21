import { useState } from 'react'
import { useApp } from '../store.jsx'
import PageHeader from '../components/PageHeader.jsx'
import Icon from '../components/Icons.jsx'

// Activity log (owner only). Scope/format is still an open question with
// Michael per the handoff — this is a simple filterable table as a starting
// point, not a committed final feature set.
const KINDS = {
  auth: { label: 'Sign-in', icon: 'lock', tone: 'gray' },
  intake: { label: 'Intake', icon: 'plus', tone: 'green' },
  status: { label: 'Status', icon: 'watch', tone: 'gold' },
  automation: { label: 'Automation', icon: 'bell', tone: 'green' },
  admin: { label: 'Admin', icon: 'badge', tone: 'gold' },
  sync: { label: 'Sync', icon: 'clock', tone: 'gray' },
}

export default function Activity() {
  const { state } = useApp()
  const [filter, setFilter] = useState('all')

  const rows = filter === 'all' ? state.activity : state.activity.filter((a) => a.kind === filter)

  return (
    <>
      <PageHeader
        eyebrow="Owner · audit"
        title="Activity log"
        sub="Who did what, and when — sign-ins, status changes, intake, admin actions and automations."
      />

      <div className="mb-4 flex flex-wrap gap-2">
        <Chip active={filter === 'all'} onClick={() => setFilter('all')}>
          All
        </Chip>
        {Object.entries(KINDS).map(([key, k]) => (
          <Chip key={key} active={filter === key} onClick={() => setFilter(key)}>
            {k.label}
          </Chip>
        ))}
      </div>

      <div className="card overflow-hidden">
        <ul className="divide-y divide-rule-soft">
          {rows.map((a) => {
            const k = KINDS[a.kind] || KINDS.sync
            return (
              <li key={a.id} className="flex items-center gap-3 px-4 py-3">
                <span
                  className={`grid h-8 w-8 shrink-0 place-items-center rounded-full ${
                    k.tone === 'green' ? 'bg-[#e1ecdf] text-green-deep' : k.tone === 'gold' ? 'bg-[#f2e8d1] text-[#7a5f22]' : 'bg-[#ece7da] text-ink-mute'
                  }`}
                >
                  <Icon name={k.icon} size={15} />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="text-sm text-ink">
                    <span className="font-medium">{a.who}</span>{' '}
                    <span className="text-ink-soft">{a.what}</span>
                  </div>
                </div>
                <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.08em] text-ink-mute">
                  {a.when}
                </span>
              </li>
            )
          })}
          {rows.length === 0 && <li className="px-4 py-6 text-sm text-ink-mute">Nothing logged for this filter yet.</li>}
        </ul>
      </div>
    </>
  )
}

function Chip({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.08em] transition ${
        active ? 'border-green bg-green text-cream' : 'border-rule bg-surface text-ink-soft hover:border-green/40'
      }`}
    >
      {children}
    </button>
  )
}
