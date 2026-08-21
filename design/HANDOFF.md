
# Handoff: Client Portal Dashboard (Watch Shop + Rentals)

## Overview
A unified, read-only business dashboard for Michael's two businesses (watch repair shop + rental properties). Pulls live data from Square, TurboTenant, and SimplyWise via their APIs into one screen, adds a mobile repair-intake flow, and sends automated notifications (SMS + email). Two roles: Owner (sees both businesses) and Employee (watch shop only, rentals entirely absent from nav).

## About the Design Files
The bundled HTML (`Client Portal Pitch.html`) is a **design reference / pitch deck**, not production code. It contains static mockup slides (dashboard screenshots-in-HTML, phone-frame mockup) built to sell the concept — not a working app. Build the real product as a new web app (recommend React + a component library, or the stack already used in Michael's other tools if any exist) using these mocks as the visual and structural reference, recreating layouts/behavior rather than reusing this markup directly.

## Fidelity
**High-fidelity for visual style** (colors, type, spacing, card/panel patterns are final-intent) but **low-fidelity for data/interactivity** — the mockups show static example data with no real interactivity, drill-down, search, or trend indicators. Treat slide 5 (owner dashboard) and slide 7 (employee dashboard) as the layout skeleton to extend, not the final feature set. See "Gaps to close" below — these are real product requirements, not yet reflected in the mockup visuals.

## Roles & Access
- **Owner**: full access — both businesses, side-by-side. Watches + rentals KPIs, finances, employee account management, activity log. Works on mobile.
- **Employee**: watch-shop only. Rentals, finances, employee admin, and activity log are not just hidden/greyed — absent from navigation entirely. Employee accounts are added/removed by the Owner, no developer involvement.

## Screens / Views

### 1. Owner Dashboard
- **Purpose**: at-a-glance status across both businesses; jumping-off point for drill-down and action.
- **Layout**: top KPI strip (4-up grid), below it a 2-column panel row (Rentals — needs attention | Watches — needs attention), each panel a scrollable list of row-items with a status pill.
- **Components**:
  - KPI cards: label (mono, uppercase, small), large serif value, secondary sub-text. **Add**: trend delta vs. last month (↑/↓ %).
  - "Needs attention" panels: title + source badge (e.g. "TurboTenant"/"Square") header, list of row-items (title + secondary line + status pill). Pills: green (paid/pickup), gold (renewal/parts/active), red (late), gray (open/quote).
  - **Add**: "View all" link per panel (mock shows only 4 items, real data won't cap at 4).
  - **Add**: per-source "last synced" timestamp (not just one global "Updated 9:42am") — critical since the whole pitch is "reads live, shows stale data gracefully if a source is down."
  - **Add**: global search/quick-add in header — search by customer name, watch, or property; quick-add repair ticket.
  - **Add**: every KPI/row-item should be clickable → drill-down detail view (not built in mockup, needs a spec/route per entity: property, tenant, repair ticket, customer).
  - **Add**: "Recent activity" panel or link, surfacing the activity log promised in the access-model copy (currently only mentioned, never shown).
  - **Responsive**: must work on mobile per phase-2 requirement (owner can check dashboard from phone) — mockup is desktop-only; plan a responsive/stacked layout for the KPI grid and panels.

### 2. Employee Dashboard
- Same visual chrome as Owner, scoped to shop-floor data only: In Progress / Intake this week / Picked up KPIs (3-up), Active repairs panel, New intake panel.
- Nav must not render rentals/finance/admin/activity-log items at all (not disabled state).
- Consider showing "hidden from this role" as a locked/greyed nav item in the real nav (not a text banner as in the mock) so it reads as real product chrome.

### 3. Mobile Repair Intake
- iOS-style flow: back/title/save header → photo row (multiple angles + add button) → form fields (customer name, phone/email, watch make & model, repair description, est. cost, due date).
- On save: creates/updates customer record, creates repair ticket visible on dashboard immediately, prints a repair envelope (customer/watch/due date) to match existing paper workflow.
- Status change to "ready" triggers SMS via Twilio to customer's phone from the business number.

## Interactions & Behavior
- Row items and KPIs: clickable, navigate to a detail view (needs a route/screen for: property detail, tenant detail, repair ticket detail, customer detail).
- Repair intake save: creates customer if new, else appends to existing customer's history; triggers envelope print job.
- Status change → "Ready for pickup": fires Twilio SMS to customer.
- Late-rent threshold: **5 days after due date** flips a lease to "Late" status/pill and includes it in Monday summary.
- Renewal threshold: flag leases inside a configurable window before expiry (mock uses "expires in ~60 days" in the weekly summary copy — confirm exact day count with Michael, e.g. 60/90 days).
- Automations (all outbound from business Google Workspace email / Twilio SMS, on a schedule):
  1. Repair-ready SMS (Twilio) — immediate, triggered by status change.
  2. Rent reminders — 1st of each month, courtesy-only wording (no legal weight), from business email.
  3. Monday morning weekly summary to Owner — late rent, ready-for-pickup, intake last 7 days, upcoming lease expirations.
- Data refresh: polling per source API (Square, TurboTenant, SimplyWise) — confirm interval per API rate limits; dashboard should visibly show per-source last-synced time and degrade gracefully (show stale data + "last synced" instead of erroring) if a source is unreachable.

## State Management
- Auth/role: Owner vs Employee, gating both routes and nav rendering (not just UI hiding).
- Per-entity data models: Property/Lease/Tenant (from TurboTenant), RepairTicket/Customer (from Square + intake), Expense/Receipt (from SimplyWise).
- Activity log: **open item** — need Michael's input on what to log (logins, ticket status changes, employee CRUD, dashboard edits?) and whether it's a full filterable UI or a simple data table (flagged to Michael, answer pending).
- Notification state: per-automation last-sent timestamp to avoid duplicate sends (e.g. don't re-send the same rent reminder twice in a day).

## Design Tokens
Colors:
- `--cream: #F5F1EA` (page bg), `--cream-2: #EBE5D9` (alt section bg)
- `--ink: #1A2420` (primary text), `--ink-soft: #3A4A42` (secondary text), `--ink-mute: #6B7972` (tertiary/labels)
- `--green: #2D5A4A` (primary accent / positive), `--green-deep: #1F3F34` (dark section bg)
- `--gold: #B8924A` (secondary accent / warnings-adjacent, "renewal"/"parts" pills)
- `--rule: #D9D2C2` / `--rule-soft: #E5DFD0` (borders/dividers)
- Dashboard surface: `#FBFAF6` (card bg), panel bg `#fff`, bar bg `#F1ECE0`
- Status pills: green `bg #E1ECDF / text var(--green-deep)`; gold `bg #F2E8D1 / text #7A5F22`; red `bg #F2DCD6 / text #8A3D26`; gray `bg #ECE7DA / text var(--ink-mute)`

Typography:
- Display/headings: **Fraunces** (serif), weight 400, tight letter-spacing (-0.02em)
- Body/UI: **Geist** (sans), weights 300–600
- Labels/mono/data: **Geist Mono**, uppercase, letter-spacing 0.08–0.16em

Spacing/shape: cards use 10–14px border-radius, 1px `var(--rule)` borders, 14–28px gaps in grids.

## Assets
No external image assets — the deck uses CSS-drawn watch icon (radial-gradient circles) as a placeholder in the phone mock. Real product should use actual customer/repair photos captured at intake (camera upload, not a placeholder graphic).

## Confirmed Requirements (from client Q&A)
1. Data refresh: **polling per source API** — confirmed, exact interval TBD per API limits.
2. Owner dashboard: **must work on mobile** (Employee is intake-only on mobile; Owner needs full dashboard responsive on mobile too).
3. SMS provider: **Twilio**, business phone number to be provisioned.
4. Late-rent threshold: **5 days after due date**.
5. Activity log UI: **open — awaiting Michael's answer** on scope/format. Do not build until confirmed.

## Files
- `Client Portal Pitch.html` — full pitch deck (15 slides), reference for visual language, copy tone, and the dashboard mockup slides (05, 07) and phone mockup (08).
