@AGENTS.md

# Bookora — Project Rules

A smart appointment-scheduling dashboard for small/medium businesses. Hebrew, RTL.
The rules below are non-negotiable — every line of code in this project must
follow them, no exceptions, no "just this once."

## Stack
- Next.js 16 (App Router), TypeScript, Tailwind CSS v4, Framer Motion.
- Deployed to Vercel.

## Styling — Tailwind only
- Zero inline styles for color / spacing / typography. `className` only.
- The only exceptions: `direction: "rtl"`, `fontFamily`, and dynamic values
  coming from Framer Motion's `useTransform`/`useSpring`.
- Every color/shadow/radius must be a token defined in `src/app/theme.css`
  (`@theme`), never a free hex/rgb value inside a component. Changing the
  visual design later = editing that one file, nothing else.

## RTL
- `dir="rtl"`, `lang="he"` on `<html>`.
- Any directional icon/element (arrows, chevrons, element order) must flip
  correctly under RTL.
- Numbers/times/currency (₪) stay LTR inside the RTL context.
- Body font: Assistant. Heading font: Google Sans (local variable font).

## Workflow — approvals
- One component at a time. Never start the next one before the previous one
  is explicitly approved.
- Before writing any code: present the approach + structure + list of
  affected files. Wait for approval.
- Every change / new file requires explicit approval — a clear "yes" from
  the user.
- After each component: write ✅ Done + what changed. Do not continue
  without explicit approval.
- After every visual change: show/describe the result (screenshot) before
  moving on — never adopt a solution without seeing it work.
- REWIND is a legitimate tool for going back — don't hesitate to use it.

## Code quality
- After every edit: re-review the code that was written/changed until it's
  clean, correct, and professional — not just "it works." Repeat this on
  every change, not only at the end.
- No premature abstractions, no dead code, no half-finished TODOs.

## Scroll / animation architecture (lessons from past projects — do not repeat)
- **No `zoom` on a wrapper** — it breaks `scroll`, `getBoundingClientRect`,
  and `offsetTop`.
- Any section with a scroll-linked animation must live **outside** any
  zoom/transform wrapper.
- `useScroll` with a `target` ref is not reliable together with
  `position: sticky`. For correct offset measurement, use
  `getBoundingClientRect().top + window.scrollY`.
- `useSpring` can introduce lag; when immediate responsiveness is needed,
  use the raw progress value directly.
- The scroll listener should only run once the DOM has settled
  (`setTimeout(..., 150)`).
- Scroll-triggered animations start only when the element enters the
  viewport, never on mount.
- `position: sticky` breaks if any ancestor has `overflow: hidden`.

## Visual rules
- No glow / colored box-shadow on buttons — looks cheap.
- On marketing/landing page sections: transparent background, not a hardcoded
  hex — the body controls the background. (This does **not** apply to
  dashboard cards inside the app itself — those have a dedicated background,
  see theme.css.)

## Design tokens (theme.css)
`background`, `card`, `border`, `primary`, `foreground`, `muted-foreground`,
`success`, `warning`, `destructive`, `service-1..5` (appointment card colors
per service type — fixed, not random), a subtle shadow scale, base radius `0.75rem`.

## Data model (reference shape — not a DB schema)
```ts
Client   { id, name, phone, email, tags[], notes, createdAt }
Service  { id, name, durationMinutes, price, colorToken } // colorToken -> service-1..5
Staff    { id, name, avatarUrl, workingHours[] }
Appointment {
  id, clientId, staffId, serviceId,
  start, end,        // ISO datetime
  status: "confirmed" | "pending" | "cancelled" | "completed",
}
```
Every module (Calendar, Clients, Reports) must reference these exact shapes —
don't reinvent field names locally.
