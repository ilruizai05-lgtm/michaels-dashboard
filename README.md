# Michael's Dashboard

> Michael's dashboard — helps organize and manage the business more efficiently.

A clickable **prototype** of a unified, read-only business dashboard for
Michael's two businesses — a **watch repair shop** and **rental properties** —
in one place. Single-user: Michael is the only account.

Built from the design handoff in `Client Portal Pitch.html` (the pitch deck),
recreating its visual language (Fraunces / Geist type, cream + green + gold
palette, card/panel patterns) as a real React app rather than reusing the deck
markup.

> This is a front-end prototype with **sample data**. There are no real
> integrations, accounts, SMS, or printing — those are simulated so the flows
> can be clicked through end to end.

## What's in it

- **Sign-in** — a simple welcome screen that opens the dashboard.
- **Dashboard** — KPI strip across both businesses (with trend deltas), two
  "needs attention" panels (Rentals · TurboTenant / Watches · Square) with
  per-source _last synced_ times and "View all" links, plus a recent-activity
  rail.
- **Mobile repair intake** — iOS-style phone flow: photo row → form → save.
  Saving adds the ticket (it shows on the dashboard immediately), "prints" an
  envelope, and creates the customer.
- **Watch repairs** — full list with inline status changes; moving a ticket to
  **Ready for pickup** fires the (simulated) repair-ready SMS and logs it.
- **Rentals**, **Customers**, **Finances** (income/expense + automations),
  **Activity log** (filterable).
- **Global search** in the header across watches, customers and properties.

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
  App.jsx              # shell + router
  store.jsx            # tiny domain store (useReducer + context)
  data/
    mockData.js        # sample KPIs, rentals, repairs, customers, etc.
    nav.js             # navigation config
  components/          # Login, Sidebar, Topbar, KpiCard, Panel, Pill, Toast…
  pages/               # OwnerDashboard, Watches, Rentals,
                       # Customers, Finances, Activity, RepairIntake
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
