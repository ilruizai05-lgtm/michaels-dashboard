import { customers } from '../data/mockData.js'
import PageHeader from '../components/PageHeader.jsx'
import Icon from '../components/Icons.jsx'

// Customer database — builds itself from intake. Watch-shop scoped, so both
// roles can see it.
export default function Customers() {
  return (
    <>
      <PageHeader
        eyebrow="Watch shop"
        title="Customers"
        sub="The customer record builds itself from intake — name, contact, watch history and photos."
      />

      <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
        {customers.map((c) => (
          <div key={c.id} className="card flex flex-col gap-3 p-4">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-cream-2 font-serif text-lg text-green">
                {c.name.charAt(0)}
              </span>
              <div className="min-w-0">
                <div className="truncate font-serif text-[17px] text-ink">{c.name}</div>
                <div className="truncate text-[13px] text-ink-mute">{c.contact}</div>
              </div>
            </div>
            <div className="flex items-center justify-between border-t border-rule-soft pt-3 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-mute">
              <span className="inline-flex items-center gap-1.5">
                <Icon name="watch" size={13} /> {c.watches} {c.watches === 1 ? 'watch' : 'watches'}
              </span>
              <span>Last visit {c.lastVisit}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
