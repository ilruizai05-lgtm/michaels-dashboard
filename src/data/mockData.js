// ─────────────────────────────────────────────────────────────────────────
// Mock data for Michael's Dashboard (prototype)
//
// Everything here is illustrative sample data standing in for the live feeds
// the real product will pull from Square (watches), TurboTenant (rentals),
// and SimplyWise (expenses). No real integrations — this is a clickable
// prototype built from the pitch-deck design handoff.
// ─────────────────────────────────────────────────────────────────────────

// The "as of" month shown in the header — computed live from the current date
// (e.g. "August 2026"), so it always reflects today rather than a fixed month.
// In the real product this is the reporting period the live figures cover.
export const PERIOD_LABEL = new Date().toLocaleDateString('en-US', {
  month: 'long',
  year: 'numeric',
})

// Per-source sync state. The real dashboard polls each API independently and
// degrades gracefully (shows stale data + last-synced instead of erroring).
export const sources = [
  { key: 'square', name: 'Square', syncedAt: '9:42 am', status: 'ok' },
  { key: 'turbotenant', name: 'TurboTenant', syncedAt: '9:41 am', status: 'ok' },
  { key: 'simplywise', name: 'SimplyWise', syncedAt: '8:15 am', status: 'stale' },
]

// ── Owner KPI strip (both businesses) ──────────────────────────────────────
export const ownerKpis = [
  {
    id: 'rent',
    label: 'Rent collected',
    value: '$11,400',
    sub: '5 of 6 properties · 1 outstanding',
    trend: { dir: 'up', pct: '4%' },
    accent: true,
    link: 'rentals',
  },
  {
    id: 'repairs',
    label: 'Repairs in progress',
    value: '7',
    sub: '2 ready for pickup',
    trend: { dir: 'up', pct: '2' },
    link: 'watches',
  },
  {
    id: 'income',
    label: 'MTD income',
    value: '$15,820',
    sub: 'Watches + rent combined',
    trend: { dir: 'up', pct: '9%' },
    link: 'finances',
  },
  {
    id: 'expenses',
    label: 'MTD expenses',
    value: '$3,210',
    sub: 'Parts, repairs, hosting',
    trend: { dir: 'down', pct: '3%' },
    link: 'finances',
  },
]

// ── Rentals (TurboTenant) ──────────────────────────────────────────────────
// status pill: red=late, gold=renewal, gray=open, green=paid
export const rentals = [
  {
    id: 'r1',
    property: '412 Locust St · Unit B',
    tenant: 'Marcus Reed',
    rent: '$1,450',
    detail: 'Rent due Apr 1 · 4 days late',
    status: 'Late',
    pill: 'red',
    needsAttention: true,
  },
  {
    id: 'r2',
    property: '88 Ridge Way',
    tenant: 'Priya Nair',
    rent: '$1,875',
    detail: 'Lease expires Jun 30 · renew?',
    status: 'Renewal',
    pill: 'gold',
    needsAttention: true,
  },
  {
    id: 'r3',
    property: '220 Bell Ave',
    tenant: 'The Okafor Family',
    rent: '$2,100',
    detail: 'Maintenance request open · 2d',
    status: 'Open',
    pill: 'gray',
    needsAttention: true,
  },
  {
    id: 'r4',
    property: '17 Court Pl',
    tenant: 'Dana Whitfield',
    rent: '$1,600',
    detail: 'Rent received Apr 1',
    status: 'Paid',
    pill: 'green',
    needsAttention: false,
  },
  {
    id: 'r5',
    property: '5 Harbor Row · Unit 2',
    tenant: 'Leo Barnes',
    rent: '$1,725',
    detail: 'Rent received Apr 1',
    status: 'Paid',
    pill: 'green',
    needsAttention: false,
  },
  {
    id: 'r6',
    property: '340 Vine St',
    tenant: 'Sofia Castellano',
    rent: '$1,950',
    detail: 'Rent received Mar 31',
    status: 'Paid',
    pill: 'green',
    needsAttention: false,
  },
]

// ── Watch repairs (Square + intake) ────────────────────────────────────────
// status pill: green=pickup, gold=parts/active, gray=quote/logged, red=late
export const initialRepairs = [
  {
    id: 'w1',
    watch: 'Omega Seamaster',
    customer: 'D. Hayes',
    detail: 'Crystal replaced · ready Apr 28',
    status: 'Pickup',
    pill: 'green',
    cost: '$385',
    due: 'Apr 28',
  },
  {
    id: 'w2',
    watch: 'Rolex Submariner',
    customer: 'M. Chen',
    detail: 'Awaiting parts · ETA May 3',
    status: 'Parts',
    pill: 'gold',
    cost: '$520',
    due: 'May 3',
  },
  {
    id: 'w3',
    watch: 'Tag Heuer Carrera',
    customer: 'J. Park',
    detail: 'Diagnosed · quote sent',
    status: 'Quote',
    pill: 'gray',
    cost: '$180',
    due: 'Apr 30',
  },
  {
    id: 'w4',
    watch: 'Cartier Tank',
    customer: 'L. Ortiz',
    detail: 'Battery + service · in progress',
    status: 'Active',
    pill: 'gold',
    cost: '$140',
    due: 'Apr 29',
  },
  {
    id: 'w5',
    watch: 'Breitling Navitimer',
    customer: 'A. Rao',
    detail: 'Logged 8:14 am · awaiting diagnosis',
    status: 'Logged',
    pill: 'gray',
    cost: '—',
    due: 'TBD',
  },
  {
    id: 'w6',
    watch: 'Seiko Prospex',
    customer: 'K. Liu',
    detail: 'Logged Apr 26 · in progress',
    status: 'Active',
    pill: 'gold',
    cost: '$95',
    due: 'May 1',
  },
  {
    id: 'w7',
    watch: 'Hamilton Khaki',
    customer: 'R. Diaz',
    detail: 'Logged Apr 25 · ready for pickup',
    status: 'Pickup',
    pill: 'green',
    cost: '$120',
    due: 'Apr 27',
  },
]

// ── Customers (watch shop) ─────────────────────────────────────────────────
export const customers = [
  { id: 'c1', name: 'Daniel Hayes', contact: 'd.hayes@gmail.com', watches: 2, lastVisit: 'Apr 22' },
  { id: 'c2', name: 'Mei Chen', contact: '(804) 555-0142', watches: 1, lastVisit: 'Apr 20' },
  { id: 'c3', name: 'Jordan Park', contact: 'j.park@outlook.com', watches: 3, lastVisit: 'Apr 19' },
  { id: 'c4', name: 'Luis Ortiz', contact: '(804) 555-0177', watches: 1, lastVisit: 'Apr 18' },
  { id: 'c5', name: 'Anaya Rao', contact: 'anaya.rao@gmail.com', watches: 1, lastVisit: 'Apr 26' },
  { id: 'c6', name: 'Kevin Liu', contact: '(804) 555-0199', watches: 2, lastVisit: 'Apr 26' },
]

// ── Activity log ───────────────────────────────────────────────────────────
export const initialActivity = [
  { id: 'a1', who: 'Michael', what: 'Marked Hamilton Khaki · R. Diaz "Ready for pickup"', when: '9:20 am', kind: 'status' },
  { id: 'a2', who: 'System', what: 'Sent repair-ready SMS to R. Diaz', when: '9:20 am', kind: 'automation' },
  { id: 'a3', who: 'Michael', what: 'Logged new intake · Breitling Navitimer · A. Rao', when: '8:14 am', kind: 'intake' },
  { id: 'a4', who: 'Michael', what: 'Signed in', when: '8:02 am', kind: 'auth' },
  { id: 'a5', who: 'System', what: 'Synced TurboTenant · 6 properties', when: '9:41 am', kind: 'sync' },
  { id: 'a6', who: 'Michael', what: 'Updated Cartier Tank · L. Ortiz to "In progress"', when: 'Apr 26 · 4:36 pm', kind: 'status' },
]

// ── Finances snapshot (owner only) ─────────────────────────────────────────
export const finances = {
  income: [
    { label: 'Rent (TurboTenant)', value: '$11,400', pct: 72 },
    { label: 'Watch repairs (Square)', value: '$3,120', pct: 20 },
    { label: 'Watch sales (Square)', value: '$1,300', pct: 8 },
  ],
  expenses: [
    { label: 'Parts & materials', value: '$1,540', pct: 48 },
    { label: 'Property maintenance', value: '$980', pct: 30 },
    { label: 'Hosting & software', value: '$690', pct: 22 },
  ],
}

// Automations promised in phase 1 (status view).
export const automations = [
  {
    id: 'sms',
    name: 'Repair-ready SMS',
    channel: 'Twilio',
    trigger: 'On status → Ready for pickup',
    lastSent: 'Today · 9:20 am',
    on: true,
  },
  {
    id: 'rent',
    name: 'Rent reminders',
    channel: 'Business email',
    trigger: '1st of each month · courtesy only',
    lastSent: 'Apr 1',
    on: true,
  },
  {
    id: 'summary',
    name: 'Monday weekly summary',
    channel: 'Business email',
    trigger: 'Mondays · to Owner',
    lastSent: 'Apr 21',
    on: true,
  },
]
