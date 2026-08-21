import { useState } from 'react'
import { useApp } from '../store.jsx'
import Icon from './Icons.jsx'

// Role picker standing in for real auth. Owner sees both businesses; Employee
// sees the watch shop only. Choosing a role signs you in as that account.
export default function Login() {
  const { actions } = useApp()
  const [hover, setHover] = useState('owner')

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
            Sign in
          </p>
          <h2 className="mt-2 font-serif text-4xl leading-tight text-ink">
            Choose how you're signing in.
          </h2>
          <p className="mt-3 text-ink-soft">
            This prototype has two demo accounts so you can explore each experience.
          </p>

          <div className="mt-8 space-y-3">
            <RoleButton
              role="owner"
              name="Michael"
              blurb="Owner — full access. Watches, rentals, finances, employees & activity log."
              tone="gold"
              active={hover === 'owner'}
              onHover={() => setHover('owner')}
              onClick={() => actions.login('owner')}
            />
            <RoleButton
              role="employee"
              name="Sarah K."
              blurb="Employee — watch shop only. No rentals, finances or admin, anywhere."
              tone="green"
              active={hover === 'employee'}
              onHover={() => setHover('employee')}
              onClick={() => actions.login('employee')}
            />
          </div>

          <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-mute">
            Prototype · sample data · no real accounts or integrations
          </p>
        </div>
      </div>
    </div>
  )
}

function RoleButton({ role, name, blurb, tone, active, onHover, onClick }) {
  const dot = tone === 'gold' ? 'bg-gold' : 'bg-green'
  return (
    <button
      type="button"
      onMouseEnter={onHover}
      onFocus={onHover}
      onClick={onClick}
      className={`group flex w-full items-center gap-4 rounded-card border bg-surface p-4 text-left transition focus-visible:focus-ring ${
        active ? 'border-green/60 shadow-card' : 'border-rule hover:border-green/40'
      }`}
    >
      <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-full ${dot} font-mono text-xs font-medium uppercase text-white`}>
        {role === 'owner' ? 'M' : 'SK'}
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-2">
          <span className="font-serif text-xl text-ink">{name}</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-mute">
            · {role}
          </span>
        </span>
        <span className="mt-0.5 block text-[13px] leading-snug text-ink-soft">{blurb}</span>
      </span>
      <Icon name="chevron" className="shrink-0 text-ink-mute transition group-hover:translate-x-0.5 group-hover:text-green" />
    </button>
  )
}
