import { useEffect } from 'react'
import { useApp } from '../store.jsx'
import Icon from './Icons.jsx'

// Transient confirmation toast (intake saved, SMS sent, employee added…).
export default function Toast() {
  const { state, actions } = useApp()
  const toast = state.toast

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => actions.clearToast(), 3800)
    return () => clearTimeout(t)
  }, [toast, actions])

  if (!toast) return null

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-5 z-50 flex justify-center px-4">
      <div className="pointer-events-auto flex max-w-md items-start gap-3 rounded-card border border-rule bg-green-deep px-4 py-3 text-cream shadow-card">
        <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-gold/90">
          <Icon name="check" size={13} className="text-green-deep" />
        </span>
        <div className="min-w-0">
          <div className="font-serif text-[15px] leading-tight">{toast.title}</div>
          <div className="mt-0.5 text-[13px] leading-snug text-[#c8d4cd]">{toast.body}</div>
        </div>
        <button
          type="button"
          onClick={actions.clearToast}
          className="ml-2 shrink-0 rounded p-0.5 text-[#8ca398] hover:text-cream"
          aria-label="Dismiss"
        >
          <Icon name="plus" size={14} className="rotate-45" />
        </button>
      </div>
    </div>
  )
}
