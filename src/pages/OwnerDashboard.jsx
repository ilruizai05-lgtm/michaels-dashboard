import { useApp } from '../store.jsx'
import { ownerKpis, rentals, PERIOD_LABEL } from '../data/mockData.js'
import KpiCard from '../components/KpiCard.jsx'
import Panel, { RowItem } from '../components/Panel.jsx'
import Pill from '../components/Pill.jsx'
import PageHeader from '../components/PageHeader.jsx'
import Icon from '../components/Icons.jsx'

// Owner dashboard: KPI strip across both businesses, two "needs attention"
// panels (rentals | watches), and a recent-activity rail.
export default function OwnerDashboard() {
  const { state, actions } = useApp()

  const rentalItems = rentals.filter((r) => r.needsAttention)
  const watchItems = state.repairs.filter((r) => ['Pickup', 'Parts', 'Quote', 'Active'].includes(r.status)).slice(0, 5)
  const recent = state.activity.slice(0, 5)

  return (
    <>
      <PageHeader
        eyebrow="Overview"
        title="Both businesses on one screen."
        sub="Live status across the watch shop and the rentals — the things that need you, up top."
        right={
          <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-mute">
            {PERIOD_LABEL}
          </span>
        }
      />

      {/* KPI strip */}
      <div className="grid grid-cols-2 gap-3.5 lg:grid-cols-4">
        {ownerKpis.map((kpi) => (
          <KpiCard key={kpi.id} kpi={kpi} />
        ))}
      </div>

      {/* Needs-attention panels */}
      <div className="mt-4 grid gap-3.5 lg:grid-cols-2">
        <div className="h-[360px]">
          <Panel
            title="Rentals — needs attention"
            source="TurboTenant"
            syncedAt="9:41 am"
            onViewAll={() => actions.navigate('rentals')}
          >
            {rentalItems.map((r) => (
              <RowItem
                key={r.id}
                title={r.property}
                sub={r.detail}
                right={<Pill tone={r.pill}>{r.status}</Pill>}
                onClick={() => actions.navigate('rentals')}
              />
            ))}
          </Panel>
        </div>

        <div className="h-[360px]">
          <Panel
            title="Watches — needs attention"
            source="Square"
            syncedAt="9:42 am"
            onViewAll={() => actions.navigate('watches')}
          >
            {watchItems.map((r) => (
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
      </div>

      {/* Recent activity rail */}
      <div className="mt-4">
        <div className="card p-4">
          <div className="flex items-center justify-between border-b border-rule-soft pb-2.5">
            <h3 className="flex items-center gap-2 font-serif text-lg text-ink">
              <Icon name="activity" size={17} className="text-green" />
              Recent activity
            </h3>
            <button
              type="button"
              onClick={() => actions.navigate('activity')}
              className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.1em] text-green hover:underline"
            >
              View log <Icon name="chevron" size={11} />
            </button>
          </div>
          <ul className="mt-1 divide-y divide-rule-soft">
            {recent.map((a) => (
              <li key={a.id} className="flex items-center justify-between gap-4 py-2.5">
                <span className="min-w-0 text-sm text-ink">
                  <span className="font-medium">{a.who}</span>{' '}
                  <span className="text-ink-soft">{a.what}</span>
                </span>
                <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.08em] text-ink-mute">
                  {a.when}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}
