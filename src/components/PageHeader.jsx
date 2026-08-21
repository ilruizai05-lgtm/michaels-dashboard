import { PERIOD_LABEL } from '../data/mockData.js'

// Consistent page heading: mono eyebrow + serif title + optional right slot.
export default function PageHeader({ eyebrow, title, sub, right }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        {eyebrow && <p className="label-mono">{eyebrow}</p>}
        <h1 className="mt-1 font-serif text-3xl leading-tight text-ink sm:text-[34px]">{title}</h1>
        {sub && <p className="mt-2 max-w-2xl text-ink-soft">{sub}</p>}
      </div>
      {right ?? (
        <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-mute">
          {PERIOD_LABEL}
        </span>
      )}
    </div>
  )
}
