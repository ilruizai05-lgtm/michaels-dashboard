import { useState } from 'react'
import { useApp } from '../store.jsx'
import PageHeader from '../components/PageHeader.jsx'
import Icon from '../components/Icons.jsx'

// Employee accounts (owner only) — add/remove watch-shop logins with no
// developer involvement.
export default function Employees() {
  const { state, actions } = useApp()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  function submit(e) {
    e.preventDefault()
    if (!name.trim() || !email.trim()) {
      setError('Add a name and an email to create the account.')
      return
    }
    actions.addEmployee({ name: name.trim(), email: email.trim() })
    setName('')
    setEmail('')
    setError('')
  }

  return (
    <>
      <PageHeader
        eyebrow="Owner · admin"
        title="Employees"
        sub="Add or remove watch-shop accounts yourself. Employees see the watch side only — never rentals, finances or this page."
      />

      <div className="grid gap-3.5 lg:grid-cols-[1.4fr_1fr]">
        {/* List */}
        <div className="card overflow-hidden">
          <div className="hidden grid-cols-[1.2fr_1.4fr_0.7fr_auto] gap-4 border-b border-rule bg-surface px-4 py-3 sm:grid">
            {['Name', 'Email', 'Added', ''].map((h, i) => (
              <span key={i} className="label-mono">
                {h}
              </span>
            ))}
          </div>
          <ul>
            {state.employees.length === 0 && (
              <li className="px-4 py-6 text-sm text-ink-mute">No employee accounts yet.</li>
            )}
            {state.employees.map((emp) => (
              <li
                key={emp.id}
                className="grid grid-cols-1 gap-2 border-b border-rule-soft px-4 py-3 last:border-b-0 sm:grid-cols-[1.2fr_1.4fr_0.7fr_auto] sm:items-center sm:gap-4"
              >
                <div className="flex items-center gap-2.5">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-green font-mono text-[11px] text-white">
                    {emp.name.split(' ').map((p) => p[0]).slice(0, 2).join('')}
                  </span>
                  <span className="font-serif text-[16px] text-ink">{emp.name}</span>
                </div>
                <div className="text-sm text-ink-soft">{emp.email}</div>
                <div className="font-mono text-[12px] text-ink-mute">{emp.added}</div>
                <div className="sm:text-right">
                  <button
                    type="button"
                    onClick={() => actions.removeEmployee(emp.id)}
                    className="inline-flex items-center gap-1 rounded-md border border-rule px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.08em] text-[#8a3d26] hover:border-[#8a3d26]/40 hover:bg-[#f2dcd6]/40 focus-visible:focus-ring"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Add form */}
        <form onSubmit={submit} className="card h-fit p-5">
          <h3 className="flex items-center gap-2 font-serif text-lg text-ink">
            <Icon name="plus" size={16} className="text-green" /> Add an employee
          </h3>
          <p className="mt-1 text-[13px] text-ink-mute">They'll be able to sign in to the watch shop only.</p>

          <div className="mt-4 space-y-3">
            <Field label="Full name">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Alex Rivera"
                className="w-full rounded-lg border border-rule bg-surface px-3 py-2 text-sm text-ink placeholder:text-ink-mute focus:border-green/50 focus:outline-none"
              />
            </Field>
            <Field label="Work email">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex@michaels.shop"
                className="w-full rounded-lg border border-rule bg-surface px-3 py-2 text-sm text-ink placeholder:text-ink-mute focus:border-green/50 focus:outline-none"
              />
            </Field>
          </div>

          {error && <p className="mt-3 text-[13px] text-[#8a3d26]">{error}</p>}

          <button
            type="submit"
            className="mt-4 w-full rounded-lg bg-green px-3 py-2.5 text-sm font-medium text-cream hover:bg-green-deep focus-visible:focus-ring"
          >
            Create account
          </button>
        </form>
      </div>
    </>
  )
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1 block font-mono text-[10px] uppercase tracking-[0.12em] text-ink-mute">{label}</span>
      {children}
    </label>
  )
}
