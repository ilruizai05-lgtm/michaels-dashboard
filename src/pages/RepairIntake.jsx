import { useState } from 'react'
import { useApp } from '../store.jsx'
import PageHeader from '../components/PageHeader.jsx'
import Icon from '../components/Icons.jsx'

// Mobile repair intake — the piece Michael specifically asked for. iOS-style
// flow inside a phone frame: photo row → fields → save. Saving creates the
// ticket (it appears on the dashboard immediately), "prints" an envelope, and
// creates/updates the customer.
const PHOTO_BGS = [
  'radial-gradient(circle at 50% 45%, #3a3530, #14110e 70%)',
  'linear-gradient(135deg, #2a2520, #0e0b08)',
  'radial-gradient(circle at 40% 40%, #4a4038, #1a140e 75%)',
  'linear-gradient(160deg, #35302a, #100c08)',
]

export default function RepairIntake() {
  const { actions } = useApp()
  const [photos, setPhotos] = useState([PHOTO_BGS[0], PHOTO_BGS[1]])
  // A ticket number is assigned automatically the moment intake opens.
  const [ticket] = useState(() => `WR-${1044 + Math.floor(Math.random() * 900)}`)
  const [form, setForm] = useState({
    customer: '',
    contact: '',
    watch: '',
    description: '',
    cost: '',
  })
  const [error, setError] = useState('')

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  function addPhoto() {
    setPhotos((p) => [...p, PHOTO_BGS[p.length % PHOTO_BGS.length]])
  }

  function save() {
    if (!form.watch.trim() || !form.customer.trim()) {
      setError('Add at least a customer name and the watch make & model.')
      return
    }
    actions.addRepair({ ...form, ticket }) // navigates to Watches + toast + logs activity
  }

  return (
    <>
      <PageHeader
        eyebrow="Repair intake · mobile"
        title="Snap a photo. Log the repair. Done."
        sub="Open on the work cell in the shop, photograph the watch, jot the details — the job appears on the dashboard the moment you save."
      />

      <div className="grid gap-10 lg:grid-cols-[1fr_400px] lg:items-start">
        {/* Rationale / steps */}
        <div className="order-2 lg:order-1">
          <ol className="space-y-6">
            <Step n="01" title="Photograph + log on the work cell">
              Multiple shots per intake — face, caseback, condition. Stored on the customer record.
            </Step>
            <Step n="02" title="Print a repair envelope" icon="print">
              Customer, watch and ticket number print to the envelope, so the shop's paper workflow doesn't change.
            </Step>
            <Step n="03" title="Customer record + SMS-ready" icon="bell">
              First intake creates the customer. Setting the status to “Contact for pickup” texts the customer from the business number.
            </Step>
          </ol>

          <div className="mt-6 rounded-[10px] border border-dashed border-rule bg-bar px-4 py-3 text-[13px] text-ink-mute">
            This is a prototype — photos are simulated and nothing is sent. In the real app the camera captures
            real images and Twilio sends the SMS.
          </div>
        </div>

        {/* Phone frame */}
        <div className="order-1 mx-auto lg:order-2 lg:ml-auto">
          <div className="relative h-[720px] w-[360px] rounded-[48px] bg-[#1a1a1a] p-3 shadow-phone">
            <div className="absolute left-1/2 top-[18px] z-10 h-7 w-28 -translate-x-1/2 rounded-full bg-[#0a0a0a]" />
            <div className="flex h-full w-full flex-col overflow-hidden rounded-[36px] bg-surface">
              {/* status bar */}
              <div className="flex items-center justify-between px-8 pb-1.5 pt-3.5 text-sm font-semibold text-ink">
                <span>9:41</span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="inline-block h-2.5 w-2.5 rounded-full border-2 border-ink" />
                  <span className="font-mono text-[10px]">5G</span>
                </span>
              </div>

              {/* app head */}
              <div className="grid grid-cols-[60px_1fr_60px] items-center border-b border-rule px-4 py-3">
                <button
                  type="button"
                  onClick={() => actions.navigate('dashboard')}
                  className="justify-self-start text-2xl leading-none text-green"
                  aria-label="Back"
                >
                  ‹
                </button>
                <div className="text-center font-serif text-lg text-ink">New repair</div>
                <button
                  type="button"
                  onClick={save}
                  className="justify-self-end font-mono text-xs font-semibold uppercase tracking-[0.1em] text-gold"
                >
                  Save
                </button>
              </div>

              {/* body */}
              <div className="scroll-thin flex flex-1 flex-col gap-3.5 overflow-y-auto px-4 py-4">
                {/* photo row */}
                <div className="flex flex-wrap gap-2.5">
                  {photos.map((bg, i) => (
                    <div
                      key={i}
                      className="relative h-24 w-24 overflow-hidden rounded-2xl border border-rule"
                      style={{ background: bg }}
                    >
                      <span className="absolute inset-0 grid place-items-center">
                        <span className="h-12 w-12 rounded-full border-[3px] border-[#1a1410] bg-[radial-gradient(circle_at_35%_30%,#c9b896,#6e5d3f_60%,#2c2418)] shadow-[0_2px_8px_rgba(0,0,0,0.4)]" />
                      </span>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addPhoto}
                    className="flex h-24 w-24 flex-col items-center justify-center gap-1 rounded-2xl border-[1.5px] border-dashed border-green bg-green/5 font-mono text-[11px] uppercase tracking-[0.08em] text-green"
                  >
                    <Icon name="camera" size={22} className="text-green" />
                    Add
                  </button>
                </div>

                <PhField label="Customer name">
                  <input value={form.customer} onChange={set('customer')} placeholder="Daniel Hayes" className={inputCls} />
                </PhField>
                <PhField label="Ticket number">
                  <div className="flex items-center justify-between rounded-lg border border-rule bg-cream px-3 py-2">
                    <span className="font-mono text-sm text-ink">{ticket}</span>
                    <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-ink-mute">
                      Auto-assigned
                    </span>
                  </div>
                </PhField>
                <PhField label="Phone number">
                  <input value={form.contact} onChange={set('contact')} placeholder="(804) 555-0148" className={inputCls} />
                </PhField>
                <PhField label="Watch — make & model">
                  <input value={form.watch} onChange={set('watch')} placeholder="Omega Seamaster Professional" className={inputCls} />
                </PhField>
                <PhField label="Repair description">
                  <textarea
                    value={form.description}
                    onChange={set('description')}
                    rows={2}
                    placeholder="Cracked crystal, replace and pressure test."
                    className={`${inputCls} resize-none`}
                  />
                </PhField>
                <PhField label="Est. cost">
                  <input value={form.cost} onChange={set('cost')} placeholder="$385" className={inputCls} />
                </PhField>

                {error && <p className="text-[13px] text-[#8a3d26]">{error}</p>}

                <button
                  type="button"
                  onClick={save}
                  className="mt-1 w-full rounded-xl bg-green px-3 py-3 text-sm font-medium text-cream hover:bg-green-deep"
                >
                  Save repair & print envelope
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const inputCls =
  'w-full rounded-lg border border-rule bg-white px-3 py-2 text-sm text-ink placeholder:text-ink-mute focus:border-green/50 focus:outline-none'

function PhField({ label, children }) {
  return (
    <label className="flex flex-col gap-1">
      <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-mute">{label}</span>
      {children}
    </label>
  )
}

function Step({ n, title, icon, children }) {
  return (
    <li className="grid grid-cols-[48px_1fr] gap-4 border-t border-rule pt-4">
      <span className="font-mono text-sm text-gold">{n}</span>
      <div>
        <h3 className="flex items-center gap-2 font-serif text-xl text-ink">
          {icon && <Icon name={icon} size={17} className="text-green" />}
          {title}
        </h3>
        <p className="mt-1 text-[15px] leading-relaxed text-ink-soft">{children}</p>
      </div>
    </li>
  )
}
