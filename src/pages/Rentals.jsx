import { rentals } from '../data/mockData.js'
import Pill from '../components/Pill.jsx'
import PageHeader from '../components/PageHeader.jsx'

// Rentals (owner only) — TurboTenant stays the system of record; this is a
// read-only roll-up of every property.
export default function Rentals() {
  const collected = rentals.filter((r) => r.status === 'Paid').length

  return (
    <>
      <PageHeader
        eyebrow="Rentals · TurboTenant"
        title="Properties"
        sub="Read-only from TurboTenant. Late rent flips 5 days after the due date; leases inside the renewal window are flagged."
      />

      <div className="mb-4 grid grid-cols-2 gap-3.5 sm:grid-cols-4">
        <MiniStat label="Properties" value={rentals.length} />
        <MiniStat label="Rent collected" value={`${collected}/${rentals.length}`} accent />
        <MiniStat label="Late" value={rentals.filter((r) => r.status === 'Late').length} />
        <MiniStat label="Renewals due" value={rentals.filter((r) => r.status === 'Renewal').length} />
      </div>

      <div className="card overflow-hidden">
        <div className="hidden grid-cols-[1.4fr_1fr_0.7fr_1.2fr_auto] gap-4 border-b border-rule bg-surface px-4 py-3 sm:grid">
          {['Property', 'Tenant', 'Rent', 'Detail', 'Status'].map((h) => (
            <span key={h} className="label-mono">
              {h}
            </span>
          ))}
        </div>
        <ul>
          {rentals.map((r) => (
            <li
              key={r.id}
              className="grid grid-cols-1 gap-2 border-b border-rule-soft px-4 py-3 last:border-b-0 sm:grid-cols-[1.4fr_1fr_0.7fr_1.2fr_auto] sm:items-center sm:gap-4"
            >
              <div className="font-serif text-[17px] text-ink">{r.property}</div>
              <div className="text-sm text-ink-soft">{r.tenant}</div>
              <div className="font-mono text-[13px] text-ink-soft">{r.rent}</div>
              <div className="text-[13px] text-ink-mute">{r.detail}</div>
              <div>
                <Pill tone={r.pill}>{r.status}</Pill>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

function MiniStat({ label, value, accent }) {
  return (
    <div className="card p-4">
      <div className="label-mono">{label}</div>
      <div className={`mt-1 font-serif text-[26px] leading-none ${accent ? 'text-green' : 'text-ink'}`}>{value}</div>
    </div>
  )
}
