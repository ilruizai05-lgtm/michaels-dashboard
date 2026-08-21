import Icon from './Icons.jsx'
import { useApp } from '../store.jsx'

// KPI card: mono uppercase label, large serif value, secondary sub-text,
// and a trend delta vs. last month. Clickable → drills into its area.
export default function KpiCard({ kpi }) {
  const { actions } = useApp()
  const clickable = Boolean(kpi.link)
  const trend = kpi.trend

  return (
    <button
      type="button"
      disabled={!clickable}
      onClick={() => clickable && actions.navigate(kpi.link)}
      className={`card group flex flex-col items-start p-4 text-left transition ${
        clickable ? 'cursor-pointer hover:border-green/50 hover:shadow-sm focus-visible:focus-ring' : 'cursor-default'
      }`}
    >
      <div className="flex w-full items-center justify-between">
        <span className="label-mono">{kpi.label}</span>
        {trend && (
          <span
            className={`inline-flex items-center gap-0.5 font-mono text-[11px] ${
              trend.dir === 'up' ? 'text-green' : 'text-[#8a3d26]'
            }`}
          >
            <Icon name={trend.dir === 'up' ? 'arrowUp' : 'arrowDown'} size={11} />
            {trend.pct}
          </span>
        )}
      </div>
      <div className={`mt-1 font-serif text-[30px] leading-tight ${kpi.accent ? 'text-green' : 'text-ink'}`}>
        {kpi.value}
      </div>
      <div className="mt-0.5 text-xs text-ink-mute">{kpi.sub}</div>
      {clickable && (
        <span className="mt-2 inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-mute opacity-0 transition group-hover:opacity-100">
          View <Icon name="chevron" size={11} />
        </span>
      )}
    </button>
  )
}
