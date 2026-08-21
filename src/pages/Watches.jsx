import { useState } from 'react'
import { useApp } from '../store.jsx'
import Pill from '../components/Pill.jsx'
import PageHeader from '../components/PageHeader.jsx'
import Icon from '../components/Icons.jsx'

const STATUSES = ['Logged', 'Quote', 'Active', 'Parts', 'Pickup']

// Watch repairs list (Square + intake). Statuses are editable; moving a ticket
// to "Pickup" fires the repair-ready SMS automation (see the toast + log).
export default function Watches() {
  const { state, actions } = useApp()
  const [filter, setFilter] = useState('all')

  const rows =
    filter === 'all'
      ? state.repairs
      : state.repairs.filter((r) => r.status.toLowerCase() === filter)

  const counts = STATUSES.reduce((acc, s) => {
    acc[s] = state.repairs.filter((r) => r.status === s).length
    return acc
  }, {})

  return (
    <>
      <PageHeader
        eyebrow="Watch shop · Square"
        title="Watch repairs"
        sub="Every ticket on the bench. Change a status inline — “Ready for pickup” texts the customer."
        right={
          <button
            type="button"
            onClick={() => actions.navigate('intake')}
            className="inline-flex items-center gap-1.5 rounded-lg bg-green px-3 py-2 text-sm font-medium text-cream hover:bg-green-deep focus-visible:focus-ring"
          >
            <Icon name="plus" size={16} className="text-cream" /> New intake
          </button>
        }
      />

      {/* Filter chips */}
      <div className="mb-4 flex flex-wrap gap-2">
        <Chip active={filter === 'all'} onClick={() => setFilter('all')}>
          All · {state.repairs.length}
        </Chip>
        {STATUSES.map((s) => (
          <Chip key={s} active={filter === s.toLowerCase()} onClick={() => setFilter(s.toLowerCase())}>
            {s} · {counts[s]}
          </Chip>
        ))}
      </div>

      <div className="card overflow-hidden">
        {/* Header row (desktop) */}
        <div className="hidden grid-cols-[1.6fr_1fr_0.7fr_0.7fr_auto] gap-4 border-b border-rule bg-surface px-4 py-3 sm:grid">
          {['Watch & customer', 'Status detail', 'Est. cost', 'Due', 'Status'].map((h) => (
            <span key={h} className="label-mono">
              {h}
            </span>
          ))}
        </div>

        <ul>
          {rows.map((r) => (
            <li
              key={r.id}
              className="grid grid-cols-1 gap-2 border-b border-rule-soft px-4 py-3 last:border-b-0 sm:grid-cols-[1.6fr_1fr_0.7fr_0.7fr_auto] sm:items-center sm:gap-4"
            >
              <div>
                <div className="font-serif text-[17px] text-ink">{r.watch}</div>
                <div className="text-[13px] text-ink-mute">{r.customer}</div>
              </div>
              <div className="text-sm text-ink-soft">{r.detail}</div>
              <div className="font-mono text-[13px] text-ink-soft">{r.cost}</div>
              <div className="font-mono text-[13px] text-ink-soft">{r.due}</div>
              <div className="flex items-center gap-2">
                <Pill tone={r.pill}>{r.status}</Pill>
                <StatusMenu current={r.status} onPick={(s) => actions.setRepairStatus(r.id, s)} />
              </div>
            </li>
          ))}
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

function StatusMenu({ current, onPick }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        className="rounded-md border border-rule bg-surface p-1.5 text-ink-mute hover:border-green/40 hover:text-green focus-visible:focus-ring"
        title="Change status"
      >
        <Icon name="chevron" size={14} className="rotate-90" />
      </button>
      {open && (
        <div className="absolute right-0 top-full z-20 mt-1 w-36 overflow-hidden rounded-lg border border-rule bg-white shadow-card">
          {STATUSES.map((s) => (
            <button
              key={s}
              type="button"
              onMouseDown={() => {
                onPick(s)
                setOpen(false)
              }}
              className={`flex w-full items-center justify-between px-3 py-2 text-left text-sm hover:bg-cream ${
                s === current ? 'text-green' : 'text-ink-soft'
              }`}
            >
              {s}
              {s === current && <Icon name="check" size={14} className="text-green" />}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
