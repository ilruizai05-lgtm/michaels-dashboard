# Michael's Dashboard

A clickable **prototype** of a unified, read-only business dashboard for
Michael's two businesses — a **watch repair shop** and **rental properties** —
with role-based access (**Owner** vs **Employee**).

Built from the design handoff in `Client Portal Pitch.html` (the pitch deck),
recreating its visual language (Fraunces / Geist type, cream + green + gold
palette, card/panel patterns) as a real React app rather than reusing the deck
markup.

> This is a front-end prototype with **sample data**. There are no real
> integrations, accounts, SMS, or printing — those are simulated so the flows
> can be clicked through end to end.

## What's in it

- **Login / role picker** — sign in as **Michael (Owner)** or **Sarah K.
  (Employee)** to explore each experience.
- **Owner dashboard** — KPI strip across both businesses (with trend deltas),
  two "needs attention" panels (Rentals · TurboTenant / Watches · Square) with
  per-source _last synced_ times and "View all" links, plus a recent-activity
  rail.
- **Employee dashboard** — same chrome, scoped to the shop floor (3 KPIs,
  active repairs, new intake). Rentals / finances / admin / activity log are
  **absent from navigation** — shown only as a locked "Owner only" group so the
  boundary reads as real product chrome.
- **Mobile repair intake** — iOS-style phone flow: photo row → form → save.
  Saving adds the ticket (it shows on the dashboard immediately), "prints" an
  envelope, and creates the customer.
- **Watch repairs** — full list with inline status changes; moving a ticket to
  **Ready for pickup** fires the (simulated) repair-ready SMS and logs it.
- **Rentals**, **Customers**, **Finances** (income/expense + automations),
  **Employees** (owner adds/removes accounts), **Activity log** (filterable).
- **Global search** in the header, scoped by role (employees can't surface
  tenants or properties).

## Role model

| Area | Owner | Employee |
| --- | :---: | :---: |
| Watch repairs, intake, customers | ✅ | ✅ |
| Rentals, finances, employee admin, activity log | ✅ | ⛔ (absent from nav) |

Route access is guarded in `src/App.jsx` — an employee can't reach an
owner-only route even by other means, not just by hiding the link.

## Run it

```bash
cd "projects/michaels-dashboard"
npm install
npm run dev      # start the dev server (Vite)
npm run build    # production build → dist/
npm run preview  # preview the production build
```

## Project structure

```
src/
  App.jsx              # shell + role-gated router
  store.jsx            # auth + tiny domain store (useReducer + context)
  data/
    mockData.js        # sample KPIs, rentals, repairs, customers, etc.
    nav.js             # role-gated navigation config
  components/          # Login, Sidebar, Topbar, KpiCard, Panel, Pill, Toast…
  pages/               # OwnerDashboard, EmployeeDashboard, Watches, Rentals,
                       # Customers, Finances, Employees, Activity, RepairIntake
```

## Design tokens

Colors and type mirror the handoff: `cream #F5F1EA`, `ink #1A2420`,
`green #2D5A4A`, `green-deep #1F3F34`, `gold #B8924A`; **Fraunces** for
display, **Geist** for UI, **Geist Mono** for labels/data. Status pills:
green (paid/pickup), gold (renewal/parts/active), red (late), gray
(open/quote). See `tailwind.config.js` and `src/index.css`.

## Not built (intentionally)

Per the handoff these are real product requirements deferred past the
prototype: live API polling, real auth, Twilio SMS, envelope printing,
per-entity drill-down detail pages, and the final activity-log scope (still an
open question with Michael).
