# Ardhitech Consulting — Property Management Dashboard
## Design System & UI Specification

---

## 1. Brand Identity & Color System

The palette is extracted directly from the Ardhitech Consulting logo and extended with semantic action colors.

```css
:root {
  /* — Core Brand — */
  --color-noir:        #0D0D0D;   /* near-black from logo background */
  --color-charcoal:    #1A1A1A;   /* card / panel surfaces */
  --color-graphite:    #2C2C2C;   /* secondary surfaces, borders */
  --color-crimson:     #C0182A;   /* primary brand red (logo) */
  --color-crimson-dim: #8C1020;   /* darker red for hover/depth */
  --color-blush:       #E8354A;   /* lighter red for highlights */

  /* — Semantic Actions — */
  --color-action:      #22C55E;   /* green — create, update, save, confirm */
  --color-action-dim:  #16A34A;   /* darker green on hover */
  --color-danger:      #EF4444;   /* red — delete, archive, destructive */
  --color-danger-dim:  #DC2626;   /* darker on hover */

  /* — Neutrals — */
  --color-smoke:       #F5F5F4;   /* light text on dark */
  --color-ash:         #A8A29E;   /* muted / secondary text */
  --color-border:      rgba(255,255,255,0.06);

  /* — AI Accent — */
  --color-ai:          #6366F1;   /* indigo — AI-powered features */
  --color-ai-glow:     rgba(99,102,241,0.15);
}
```

**Theme:** Dark-first. The dashboard lives on near-black (`--color-noir`) with the crimson brand color used for active states, section accents, and the navigation spine. Green and red are reserved exclusively for action semantics — never decorative.

---

## 2. Typography

| Role | Font | Weight | Notes |
|---|---|---|---|
| Display / Headings | **Syne** | 700–800 | Geometric, architectural — echoes the house icon in the logo |
| Body / UI Labels | **DM Sans** | 400–500 | Clean, legible, professional |
| Data / Numbers | **JetBrains Mono** | 400–600 | Monospaced for prices, stats, metrics |
| AI Annotations | **DM Sans** Italic | 400 | Subtle differentiation for AI-generated content |

**Import:**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:ital,wght@0,400;0,500;1,400&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">
```

**Scale (rem):**
```
xs:   0.75   — captions, badges
sm:   0.875  — secondary labels
base: 1.0    — body
lg:   1.125  — card titles
xl:   1.25   — section headers
2xl:  1.5    — page titles
3xl:  2.0    — hero numbers / KPIs
4xl:  2.75   — dashboard hero stat
```

---

## 3. Layout Architecture

```
┌─────────────────────────────────────────────────────────┐
│  NAV RAIL (72px, fixed left)                            │
│  ┌─────────────────────────────────────────────────┐   │
│  │ Logo mark                                       │   │
│  │ ─────────────────                               │   │
│  │ [icon] Overview                                 │   │
│  │ [icon] Properties       ← active: crimson bar   │   │
│  │ [icon] Analytics                                │   │
│  │ [icon] AI Insights                              │   │
│  │ [icon] Blog                                     │   │
│  │ [icon] Settings                                 │   │
│  │ ─────────────────                               │   │
│  │ [avatar] Profile                                │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  MAIN CONTENT (fluid, left: 72px)                       │
│  ┌─────────────────────────────────────────────────┐   │
│  │  TOP BAR (56px, sticky)                         │   │
│  │  Page title          [Search] [Notif] [+ New]   │   │
│  │─────────────────────────────────────────────────│   │
│  │  CONTENT AREA (scrollable, padding: 32px)       │   │
│  │                                                 │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

**Grid:** 12-column, gap `24px`, responsive breakpoints at 768px and 1280px.  
**Nav collapses** to a bottom bar on mobile.

---

## 4. Navigation Rail

- **Width:** 72px collapsed / 240px expanded (hover or toggle)
- **Background:** `--color-charcoal` with a 1px right border in `--color-border`
- **Logo:** Full logo mark at top; collapses to icon-only
- **Active state:** 3px left accent bar in `--color-crimson`, icon tints to crimson, label visible
- **Hover:** subtle `--color-graphite` background pill on icon
- **Transition:** `200ms ease` expand/collapse

---

## 5. Component Library

### 5.1 KPI / Stat Cards
Used in the Overview dashboard.

```
┌────────────────────────────────┐
│  Total Properties              │
│                                │
│  247            ↑ 12%          │
│  [sparkline]                   │
│                                │
│  ○ AI Confidence: High         │
└────────────────────────────────┘
```

- Background: `--color-charcoal`
- Border: 1px `--color-border`, `border-radius: 12px`
- Large number: `font-family: Syne`, `4xl`, `--color-smoke`
- Delta positive: `--color-action` with up-arrow icon
- Delta negative: `--color-danger` with down-arrow icon
- AI badge: indigo dot + italic label when AI-derived

---

### 5.2 Property Card (Grid View)

```
┌────────────────────────────────┐
│  [PROPERTY IMAGE / MAP THUMB]  │
│  ──────────────────────────── │
│  Westlands Plaza          [⋯]  │
│  Nairobi, Kenya                │
│                                │
│  KES 2,400,000/mo              │
│  ✦ AI Est: KES 2,550,000      │
│                                │
│  ● Occupied  3 units / 3      │
│                                │
│  [Edit ✎]  [View →]  [⚠ Del] │
└────────────────────────────────┘
```

- Card bg: `--color-charcoal`, hover lifts with `box-shadow: 0 8px 32px rgba(0,0,0,0.4)` + `translateY(-2px)`
- AI estimate line: indigo color, small icon prefix `✦`
- **Edit button:** ghost button, green border + text (`--color-action`)
- **View button:** filled crimson (`--color-crimson`)
- **Delete button:** icon-only, dimmed until hover → red (`--color-danger`)
- Status pill: green dot for occupied, amber for partial, red for vacant

---

### 5.3 Property Detail / Edit Panel

Slides in as a right-side drawer (480px) rather than navigating away.

**Sections:**
1. **Header** — property image hero, address, status badge
2. **Details Form** — editable fields (name, address, type, size, units)
3. **AI Pricing Engine** — dedicated card with indigo accent
4. **Financials** — rent roll, expenses, NOI
5. **Tenants** — list with lease dates
6. **Actions Bar (sticky bottom):**
   - `[Save Changes]` — filled green `--color-action`
   - `[Discard]` — ghost neutral
   - `[Delete Property]` — text-only red, requires confirmation modal

---

### 5.4 AI Pricing Engine Card

```
┌─────────────────────────────────────────────────────┐
│  ✦ AI Pricing Intelligence          [Refresh ↻]     │
│─────────────────────────────────────────────────────│
│  Current Rent:    KES 2,400,000/mo                  │
│  AI Estimate:     KES 2,550,000/mo   ↑ +6.25%      │
│  Market Avg:      KES 2,480,000/mo                  │
│                                                     │
│  [Price Trend Chart — 12 months]                    │
│                                                     │
│  Confidence: ████████░░ 82%                         │
│  Based on: 47 comparable listings in Westlands      │
│                                                     │
│  [Apply AI Price]   [Dismiss]                       │
└─────────────────────────────────────────────────────┘
```

- Border: 1px `--color-ai` with a soft `--color-ai-glow` background tint
- `[Apply AI Price]` button: green (this is a create/update action)
- Confidence bar: filled with `--color-ai`, track in `--color-graphite`
- Refresh triggers a loading shimmer state

---

### 5.5 Data Table (List View)

| # | Property | Location | Units | Occupancy | AI Rent Est. | Status | Actions |
|---|---|---|---|---|---|---|---|
| 1 | Westlands Plaza | Nairobi | 3/3 | 100% | KES 2.55M | ● Active | ✎ ⚠ |

- Header: sticky, `--color-graphite` bg
- Alternating rows: transparent / `rgba(255,255,255,0.02)`
- Sortable columns: arrow icon, crimson when active
- Inline action icons: edit = green on hover, delete = red on hover
- Pagination: page numbers, crimson active page

---

### 5.6 Buttons

| Variant | Use Case | Style |
|---|---|---|
| **Primary** | Main CTA, View, Navigate | `bg: --color-crimson`, white text |
| **Create / Update** | Save, Add, Edit confirm | `bg: --color-action`, dark text |
| **Destructive** | Delete, Remove | `bg: --color-danger`, white text |
| **Ghost** | Secondary actions | `border: 1px current`, transparent bg |
| **AI** | Apply AI suggestion | `bg: --color-ai`, white text |
| **Icon-only** | Compact actions | 36px circle, dimmed → colored on hover |

All buttons: `border-radius: 8px`, `padding: 10px 20px`, `font-weight: 500`, `transition: 150ms`

**Confirmation pattern for destructive actions:**
```
[Delete Property] clicked →
  Modal: "Delete Westlands Plaza? This cannot be undone."
  [Cancel]    [Yes, Delete]  ← red filled button
```

---

### 5.7 Blog Section

URL: `/blog`  
Layout: magazine-style editorial grid.

```
┌──────────────────────────────────────────────────────────┐
│  FEATURED ARTICLE (full width, image left, text right)   │
│  Tag: Market Watch | 5 min read                          │
│  Nairobi Office Rents Climb 8% in Q1 2025               │
│  [excerpt...] [Read More →]                             │
├────────────────┬─────────────────┬───────────────────────┤
│  Card          │  Card           │  Card                 │
│  [img]         │  [img]          │  [img]                │
│  AI Trends     │  Legal Update   │  Investment          │
└────────────────┴─────────────────┴───────────────────────┘
```

**Article Card:**
- Image with a crimson gradient overlay on hover
- Tag badge: colored by category (AI = indigo, Legal = amber, Market = crimson, Investment = green)
- Title: `Syne` font
- Read time + date in `--color-ash`

**Blog Detail Page:**
- Max-width 720px centered prose
- Drop-cap first letter in `--color-crimson`
- Floating "AI Summary" sidebar card (indigo accent)
- Share and copy-link actions at bottom

---

## 6. AI Features — Interaction Patterns

All AI-powered features share a consistent visual language: **indigo accent (`--color-ai`)**, an icon prefix `✦`, and italic annotated labels.

| Feature | Location | Trigger |
|---|---|---|
| AI Rent Estimate | Property card + detail drawer | Auto on load; refresh button |
| Market Trend Forecast | Analytics page | Date range selector |
| AI Blog Summaries | Blog cards | Toggle in card |
| Vacancy Risk Score | Property overview | KPI card |
| Comparable Listings | AI Insights page | Property selector |

**Loading state:** Shimmer skeleton in charcoal tones, with a pulsing indigo dot in the corner.  
**Error state:** Muted message in `--color-ash` — "AI estimate unavailable. Using market average."

---

## 7. Page Specifications

### 7.1 Overview (Home Dashboard)

```
Row 1: 4 KPI Cards — Total Properties | Portfolio Value | Occupancy Rate | AI Avg Rent
Row 2: Left (8 col) — Occupancy trend chart (12mo) | Right (4 col) — Vacancy alerts
Row 3: Left (7 col) — Recent Activity feed | Right (5 col) — AI Market Pulse card
```

**AI Market Pulse Card:**
- Indigo border
- Bullet list of 3 AI-generated market insights
- "Updated 2 hours ago" timestamp
- Link to full blog post

---

### 7.2 Properties Page

**View toggle:** Grid / Table (top right)  
**Filters bar:** Type | Location | Status | Occupancy | Price Range  
**Sort:** AI Estimated Value (default), Newest, Alphabetical  
**[+ Add Property] button** — green, top right, opens a multi-step wizard drawer

**Add Property Wizard (4 steps):**
1. Basic Info (name, type, location, size)
2. Units & Tenants
3. Financials
4. Review + AI Pricing Suggestion → [Create Property] green button

---

### 7.3 Analytics Page

- Portfolio-level charts: Rent Roll, NOI, Occupancy over time
- Property comparison table
- AI Forecast section: 3-month, 6-month projections with confidence intervals
- Export to PDF/CSV button (ghost, top right)

---

### 7.4 AI Insights Page

- Full-page AI experience with indigo-themed header
- Comparable listings map view
- "Ask AI" freeform query input (chat-style, bottom of page)
- Saved insights panel (right sidebar)

---

### 7.5 Blog Page

Editor-in-chief mode (for Ardhitech admins): `[+ New Post]` green button, rich text editor with AI draft-assist (`✦ Generate Draft`).  
Public view: clean editorial grid as described in §5.7.

---

## 8. Motion & Animation

| Element | Animation | Duration | Easing |
|---|---|---|---|
| Page transition | Fade + 8px translateY | 200ms | ease-out |
| Nav rail expand | Width 72→240px | 200ms | ease |
| Card hover | translateY(-2px) + shadow | 150ms | ease |
| Drawer open | translateX(100%→0) | 250ms | cubic-bezier(0.16,1,0.3,1) |
| AI loading shimmer | Shimmer keyframe | 1.4s loop | linear |
| KPI numbers | Count-up on mount | 800ms | ease-out |
| Destructive confirm modal | Scale(0.96→1) + fade | 150ms | ease-out |

**Reduced motion:** All animations respect `prefers-reduced-motion: reduce`.

---

## 9. Iconography

Library: **FontAwesome Icons** (consistent weight: `regular` for nav, `bold` for actions)

| Icon | Context |
|---|---|
| `House` | Properties nav, property type |
| `ChartLine` | Analytics |
| `Sparkle` | All AI features |
| `Article` | Blog |
| `PencilSimple` | Edit (green on hover) |
| `Trash` | Delete (red on hover) |
| `Plus` | Create actions |
| `ArrowRight` | Navigate / view |
| `Warning` | Alerts, vacancy risk |
| `CheckCircle` | Success states |

---

## 10. Responsive Behaviour

| Breakpoint | Layout Changes |
|---|---|
| `< 768px` | Nav collapses to bottom tab bar; cards stack single column; drawers become full-screen modals |
| `768–1280px` | Nav stays left rail (icon-only); 2-column grid |
| `> 1280px` | Full layout as specified; nav can expand to 240px |

---

## 11. Empty & Loading States

**Empty Properties:** Centered illustration (house outline in charcoal), heading "No properties yet", subtext, `[+ Add Your First Property]` green CTA.

**Loading Skeletons:** Charcoal-based shimmer rectangles matching the exact shape of the content they replace. No spinners.

**Error States:** Red-tinted banner at top of content area. Retry button in ghost style.

---

## 12. Notification & Alert System

- **Toast notifications** — bottom-right, stacked, auto-dismiss 4s
  - Success: green left border + checkmark
  - Error: red left border + X icon
  - AI update: indigo left border + sparkle icon
- **In-app alerts** — above affected section, dismissable
- **Badge counts** — on nav icons, crimson background

---

## 13. Design Tokens Summary

```
border-radius-sm:   6px
border-radius-md:   12px
border-radius-lg:   16px
border-radius-full: 9999px

shadow-sm:  0 1px 3px rgba(0,0,0,0.3)
shadow-md:  0 4px 16px rgba(0,0,0,0.4)
shadow-lg:  0 8px 32px rgba(0,0,0,0.5)
shadow-ai:  0 0 20px rgba(99,102,241,0.2)

transition-fast:    150ms ease
transition-base:    200ms ease
transition-slow:    300ms ease

z-nav:     100
z-drawer:  200
z-modal:   300
z-toast:   400
```

---

## 14. Tech Stack Recommendations

| Layer | Technology |
|---|---|
| Framework | React |
| Styling | Tailwind CSS  |
| Charts | Recharts or Tremor |
| Maps | Mapbox GL JS |
| Icons | FontAwesome |
| Animation | Framer Motion |
| AI Pricing | OpenAI / Anthropic API + property data pipeline |

---

*Design System v1.0 — Ardhitech Consulting Property Management Platform*
