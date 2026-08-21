import { finances, automations } from '../data/mockData.js'
import PageHeader from '../components/PageHeader.jsx'
import Icon from '../components/Icons.jsx'

// Finances (owner only) — income/expense mix + phase-1 automation status.
export default function Finances() {
  return (
    <>
      <PageHeader
        eyebrow="Owner · finances"
        title="Income & expenses"
        sub="Month-to-date across both businesses. Read-only from Square, TurboTenant and SimplyWise."
      />

      <div className="grid gap-3.5 lg:grid-cols-2">
        <Breakdown title="Income" total="$15,820" rows={finances.income} tone="green" />
        <Breakdown title="Expenses" total="$3,210" rows={finances.expenses} tone="gold" />
      </div>

      {/* Automations */}
      <div className="mt-4 card p-4">
        <h3 className="border-b border-rule-soft pb-2.5 font-serif text-lg text-ink">Automations</h3>
        <ul className="mt-1 divide-y divide-rule-soft">
          {automations.map((a) => (
            <li key={a.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
              <div className="min-w-0">
                <div className="font-serif text-[16px] text-ink">{a.name}</div>
                <div className="text-[13px] text-ink-mute">{a.trigger}</div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-right font-mono text-[11px] uppercase tracking-[0.08em] text-ink-mute">
                  {a.channel}
                  <span className="block text-ink-soft">Last sent {a.lastSent}</span>
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#e1ecdf] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-green-deep">
                  <Icon name="check" size={12} className="text-green-deep" /> On
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

function Breakdown({ title, total, rows, tone }) {
  const bar = tone === 'green' ? 'bg-green' : 'bg-gold'
  return (
    <div className="card p-4">
      <div className="flex items-end justify-between border-b border-rule-soft pb-2.5">
        <h3 className="font-serif text-lg text-ink">{title}</h3>
        <span className={`font-serif text-2xl ${tone === 'green' ? 'text-green' : 'text-ink'}`}>{total}</span>
      </div>
      <ul className="mt-3 space-y-3">
        {rows.map((r) => (
          <li key={r.label}>
            <div className="flex items-center justify-between text-sm">
              <span className="text-ink-soft">{r.label}</span>
              <span className="font-mono text-[13px] text-ink">{r.value}</span>
            </div>
            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-bar">
              <div className={`h-full rounded-full ${bar}`} style={{ width: `${r.pct}%` }} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
