import { useApp } from '../store.jsx'
import { employeeKpis, PERIOD_LABEL } from '../data/mockData.js'
import KpiCard from '../components/KpiCard.jsx'
import Panel, { RowItem } from '../components/Panel.jsx'
import Pill from '../components/Pill.jsx'
import PageHeader from '../components/PageHeader.jsx'
import Icon from '../components/Icons.jsx'

// Employee dashboard: same chrome as the owner, scoped to the shop floor.
// Rentals / finances / admin / activity are absent from nav entirely.
export default function EmployeeDashboard() {
  const { state, actions } = useApp()

  const active = state.repairs.filter((r) => ['Pickup', 'Parts', 'Quote', 'Active'].includes(r.status)).slice(0, 5)
  const intake = state.repairs.filter((r) => r.status === 'Logged' || r.pill === 'green').slice(0, 4)

  return (
    <>
      <PageHeader
        eyebrow="Watch repair shop"
        title="Same dashboard. Watch side only."
        sub="Run repairs, log new intake and keep statuses current."
        right={
          <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-mute">
            {PERIOD_LABEL}
          </span>
        }
      />

      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-3">
        {employeeKpis.map((kpi) => (
          <KpiCard key={kpi.id} kpi={kpi} />
        ))}
      </div>

      <div className="mt-4 grid gap-3.5 lg:grid-cols-2">
        <div className="h-[360px]">
          <Panel title="Active repairs" source="Shop floor" onViewAll={() => actions.navigate('watches')}>
            {active.map((r) => (
              <RowItem
                key={r.id}
                title={`${r.watch} · ${r.customer}`}
                sub={r.detail}
                right={<Pill tone={r.pill}>{r.status}</Pill>}
                onClick={() => actions.navigate('watches')}
              />
            ))}
          </Panel>
        </div>

        <div className="h-[360px]">
          <Panel
            title="New intake"
            source="Mobile"
            footer={
              <button
                type="button"
                onClick={() => actions.navigate('intake')}
                className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.1em] text-green hover:underline"
              >
                Start a new repair <Icon name="chevron" size={11} />
              </button>
            }
          >
            <RowItem
              title="+ Start a new repair ticket"
              sub="Photograph the watch · auto-fill the form"
              right={<Pill tone="green">Tap</Pill>}
              onClick={() => actions.navigate('intake')}
            />
            {intake.map((r) => (
              <RowItem
                key={r.id}
                title={`Recent: ${r.watch} · ${r.customer}`}
                sub={r.detail}
                right={<Pill tone={r.pill}>{r.status}</Pill>}
                onClick={() => actions.navigate('watches')}
              />
            ))}
          </Panel>
        </div>
      </div>

      {/* Explicit "hidden from this role" strip, matching the mockup */}
      <div className="mt-4 flex flex-wrap items-center gap-3 rounded-[10px] border border-dashed border-rule bg-bar px-4 py-3">
        <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-mute">
          <Icon name="lock" size={13} className="text-ink-mute" /> Hidden from this role
        </span>
        <span className="hidden h-px flex-1 bg-rule sm:block" />
        <span className="font-mono text-[12px] text-ink-mute">
          Rentals · Finances · Employee admin · Activity log
        </span>
      </div>
    </>
  )
}
