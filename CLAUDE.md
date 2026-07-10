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
- If, during work, a rule in this file seems like it should change (update,
  add, or remove something) — propose it explicitly and wait for the user's
  decision. Never edit this file silently.

## Code quality
- After every edit: re-review the code that was written/changed until it's
  clean, correct, secure, and professional — not just "it works." Repeat
  this on every change, not only at the end.
- No premature abstractions, no dead code, no half-finished TODOs.

## Lessons learned (real bugs hit in this project — do not repeat)
- **RTL + numbers/symbols can visually reverse.** A string mixing Hebrew
  text or symbols (`+`, `-`, `%`, `–`) with digits in one text node can
  bidi-reorder incorrectly (e.g. `+12.5%` rendering as `12.5%+`, or
  `09:00–17:00` rendering backwards). Isolate the numeric/symbol part in
  its own element with `dir="ltr"` when this happens, and verify visually
  — never assume it renders correctly.
- **Tailwind class names must be complete literal strings in the source.**
  The build-time scanner cannot see dynamically-built class names (e.g.
  `` `row-start-${n}` ``) — it needs the full string to exist literally
  somewhere in the file. For data-driven layout (e.g. positioning items on
  a grid by time), precompute a lookup array/object of literal class name
  strings instead.
- **`flex-col` cross-axis alignment is not reliably RTL-aware.** An element
  relying on the default/`items-start` alignment inside a `flex-col`
  container can ignore `dir="rtl"` and stick to the physical left. A
  `flex` row wrapper (`justify-content`) has been reliable for RTL
  throughout this project — prefer it over column cross-axis alignment
  when RTL-correct positioning matters.
- **Use `h-dvh`, not `min-h-full`, for full-viewport app-shell layouts.**
  A fixed-sidebar + scrollable-content layout needs a definite height
  at the root to work — `min-height` doesn't reliably give flex children
  a definite size to grow into, which left the sidebar only as tall as
  the page content on short pages.

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
