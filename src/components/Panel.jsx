import Icon from './Icons.jsx'

// A "needs attention" panel: title + source badge header, a scrollable list of
// row-items, and a "View all" link (real data won't cap at a handful).
export default function Panel({ title, source, syncedAt, onViewAll, children, footer }) {
  return (
    <div className="card flex min-h-0 flex-col p-4">
      <div className="flex items-center justify-between border-b border-rule-soft pb-2.5">
        <h3 className="font-serif text-lg text-ink">{title}</h3>
        <div className="flex flex-col items-end">
          {source && <span className="label-mono">{source}</span>}
          {syncedAt && (
            <span className="mt-0.5 inline-flex items-center gap-1 font-mono text-[9px] uppercase tracking-[0.08em] text-ink-mute">
              <Icon name="clock" size={9} /> synced {syncedAt}
            </span>
          )}
        </div>
      </div>

      <div className="scroll-thin -mr-1 mt-1 flex-1 overflow-y-auto pr-1">{children}</div>

      {(onViewAll || footer) && (
        <div className="mt-2 border-t border-rule-soft pt-2.5">
          {footer || (
            <button
              type="button"
              onClick={onViewAll}
              className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.1em] text-green hover:underline focus-visible:focus-ring"
            >
              View all <Icon name="chevron" size={11} />
            </button>
          )}
        </div>
      )}
    </div>
  )
}

// A single row-item inside a panel: primary line + secondary line + a slot on
// the right (status pill, etc). Optionally clickable for drill-down.
export function RowItem({ title, sub, right, onClick }) {
  const Tag = onClick ? 'button' : 'div'
  return (
    <Tag
      type={onClick ? 'button' : undefined}
      onClick={onClick}
      className={`grid w-full grid-cols-[1fr_auto] items-baseline gap-3 border-b border-rule-soft py-2 text-left last:border-b-0 ${
        onClick ? 'cursor-pointer rounded-md px-1 -mx-1 hover:bg-cream/60 focus-visible:focus-ring' : ''
      }`}
    >
      <div className="min-w-0">
        <div className="truncate text-sm text-ink">{title}</div>
        {sub && <div className="mt-0.5 truncate text-[11px] text-ink-mute">{sub}</div>}
      </div>
      <div className="shrink-0">{right}</div>
    </Tag>
  )
}
