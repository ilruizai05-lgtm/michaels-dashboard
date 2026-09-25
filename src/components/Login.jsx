import { useApp } from '../store.jsx'
import Icon from './Icons.jsx'

// Sign-in screen. Single-user: Michael is the only account, so this is a
// simple welcome/entry rather than a role picker.
export default function Login() {
  const { actions } = useApp()

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Left brand panel */}
      <div className="relative hidden flex-col justify-between overflow-hidden bg-green-deep p-14 text-cream lg:flex">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 85% 12%, rgba(184,146,74,0.14), transparent 45%)',
          }}
        />
        <div className="relative flex items-center gap-3">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-gold/90 shadow-[0_0_0_4px_rgba(184,146,74,0.18)]">
            <Icon name="clock" size={16} className="text-green-deep" />
          </span>
          <span className="font-mono text-sm uppercase tracking-[0.16em] text-[#c8d4cd]">
            Michael's Dashboard
          </span>
        </div>

        <div className="relative">
          <h1 className="max-w-[14ch] font-serif text-6xl leading-[0.96] tracking-tight">
            Both businesses, one screen.
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-[#c8d4cd]">
            The watch shop and the rentals, side by side — live from Square,
            TurboTenant &amp; SimplyWise, with the things that need your attention up top.
          </p>
        </div>

        <div className="relative flex gap-8 border-t border-[#2f4e42] pt-6 font-mono text-xs uppercase tracking-[0.12em] text-[#8ca398]">
          <span>Watch repair</span>
          <span>Rentals</span>
          <span>Read-only · secure</span>
        </div>
      </div>

      {/* Right sign-in panel */}
      <div className="flex flex-col justify-center bg-cream px-6 py-16 sm:px-16">
        <div className="mx-auto w-full max-w-md">
          <div className="mb-2 flex items-center gap-2 lg:hidden">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-green-deep">
              <Icon name="clock" size={14} className="text-gold" />
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.16em] text-ink-mute">
              Michael's Dashboard
            </span>
          </div>

          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-mute">
            Welcome back
          </p>
          <h2 className="mt-2 font-serif text-4xl leading-tight text-ink">
            Sign in to your dashboard.
          </h2>
          <p className="mt-3 text-ink-soft">
            Your watch shop and rentals, both in one place.
          </p>

          <div className="mt-8">
            <button
              type="button"
              onClick={() => actions.login()}
              className="group flex w-full items-center gap-4 rounded-card border border-rule bg-surface p-4 text-left transition hover:border-green/50 hover:shadow-card focus-visible:focus-ring"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gold font-mono text-xs font-medium uppercase text-white">
                M
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-2">
                  <span className="font-serif text-xl text-ink">Michael</span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-mute">
                    · Owner
                  </span>
                </span>
                <span className="mt-0.5 block text-[13px] leading-snug text-ink-soft">
                  Enter the dashboard — watches, rentals, finances &amp; activity.
                </span>
              </span>
              <Icon
                name="chevron"
                className="shrink-0 text-ink-mute transition group-hover:translate-x-0.5 group-hover:text-green"
              />
            </button>
          </div>

          <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-mute">
            Prototype · sample data · no real integrations
          </p>
        </div>
      </div>
    </div>
  )
}
