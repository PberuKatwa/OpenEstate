# Ardhitech Consulting — Property Management Dashboard
## Design System & UI Specification

> **Styling rule:** Pure Tailwind CSS utility classes only. No custom CSS, no CSS variables, no inline `style` attributes. All design decisions are expressed exclusively through Tailwind classes. Where brand colors fall outside Tailwind's default palette, they are registered in `tailwind.config.js` as custom tokens so they remain accessible as utility classes.

---

## 1. Tailwind Configuration

All brand-specific colors that fall outside Tailwind defaults are extended in `tailwind.config.js`. Everything else uses Tailwind's built-in palette directly.

```js
// tailwind.config.js
const { fontFamily } = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        crimson: {
          DEFAULT: '#C0182A',   // brand primary — logo red
          dark:    '#8C1020',   // hover / depth
          light:   '#E8354A',   // highlights
        },
      },
      fontFamily: {
        sans: ['Poppins', ...fontFamily.sans],
      },
    },
  },
  plugins: [],
}
```

**Tailwind palette mappings used throughout this spec:**

| Design Intent | Tailwind Class |
|---|---|
| Page / card background | `bg-white` |
| Alt surface (rows, inner sections) | `bg-gray-50` |
| Border default | `border-gray-200` |
| Border strong | `border-gray-300` |
| Text primary | `text-gray-900` |
| Text muted | `text-gray-500` |
| Text faint / captions | `text-gray-400` |
| Brand crimson (bg) | `bg-crimson` |
| Brand crimson (text) | `text-crimson` |
| Brand crimson (border) | `border-crimson` |
| Brand crimson hover | `hover:bg-crimson-dark` |
| Action green create/update (bg) | `bg-green-500` |
| Action green (text) | `text-green-600` |
| Action green hover | `hover:bg-green-600` |
| Danger red delete (bg) | `bg-red-500` |
| Danger red (text) | `text-red-500` |
| Danger red hover | `hover:bg-red-600` |
| AI indigo (bg) | `bg-indigo-500` |
| AI indigo (text) | `text-indigo-500` |
| AI indigo tint (bg) | `bg-indigo-50` |
| Amber partial occupancy | `bg-amber-100 text-amber-700` |

**Google Fonts import** (in `<head>` — the only non-Tailwind line permitted):
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet">
```

**Font Awesome import** (icons — only other non-Tailwind line permitted):
```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
```

---

## 2. Typography

Single typeface — **Poppins** — registered as the default `sans` in `tailwind.config.js`, so `font-sans` applies it everywhere automatically.

| Role | Tailwind Classes |
|---|---|
| Page / section title | `font-sans text-2xl font-bold text-gray-900` |
| Card title | `font-sans text-lg font-semibold text-gray-900` |
| Body text | `font-sans text-base font-normal text-gray-700` |
| Secondary label | `font-sans text-sm font-medium text-gray-500` |
| Caption / faint | `font-sans text-xs font-normal text-gray-400` |
| KPI hero number | `font-sans text-4xl font-bold text-gray-900` |
| Price / data number | `font-sans text-xl font-semibold text-gray-900` |
| AI annotation | `font-sans text-sm italic text-indigo-500` |

---

## 3. Layout Architecture

```
┌─────────────────────────────────────────────────────────┐
│  NAV RAIL (w-[72px], fixed left)                        │
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
│  MAIN CONTENT (ml-[72px], fluid)                        │
│  ┌─────────────────────────────────────────────────┐   │
│  │  TOP BAR (h-14, sticky top-0)                   │   │
│  │  Page title          [Search] [Notif] [+ New]   │   │
│  │─────────────────────────────────────────────────│   │
│  │  CONTENT AREA (p-8, overflow-y-auto)            │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

**Root shell classes:**
```html
<div class="flex h-screen bg-white font-sans">

  <!-- Nav Rail -->
  <aside class="fixed inset-y-0 left-0 w-[72px] hover:w-60 bg-white border-r border-gray-200
                flex flex-col items-center py-4 z-[100] transition-all duration-200 overflow-hidden group">

  <!-- Main area -->
  <main class="ml-[72px] flex flex-col flex-1 min-h-screen bg-white">

    <!-- Top bar -->
    <header class="sticky top-0 z-[90] h-14 bg-white border-b border-gray-200
                   flex items-center justify-between px-8">

    <!-- Content -->
    <div class="flex-1 p-8 overflow-y-auto bg-gray-50">
```

**Content grid:** `grid grid-cols-12 gap-6`

---

## 4. Navigation Rail

**Container:**
```html
<aside class="fixed inset-y-0 left-0 w-[72px] hover:w-60 bg-white border-r border-gray-200
              flex flex-col items-center pt-4 pb-6 gap-1 z-[100] transition-all duration-200 overflow-hidden group">
```

**Logo area:**
```html
<div class="w-full flex items-center justify-center px-3 mb-6 h-10">
  <img class="h-8 w-auto object-contain" src="/logo.png" alt="Ardhitech">
</div>
```

**Nav item — default:**
```html
<a class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-500
          hover:bg-gray-50 hover:text-gray-900 transition-colors duration-150 cursor-pointer">
  <i class="fa-regular fa-house w-5 text-center text-base flex-shrink-0"></i>
  <span class="text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
    Properties
  </span>
</a>
```

**Nav item — active:**
```html
<a class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-red-50
          border-l-[3px] border-crimson text-crimson transition-colors duration-150">
  <i class="fa-solid fa-house w-5 text-center text-base flex-shrink-0 text-crimson"></i>
  <span class="text-sm font-semibold whitespace-nowrap text-crimson">Properties</span>
</a>
```

**Mobile bottom tab bar:**
```html
<nav class="fixed bottom-0 inset-x-0 bg-white border-t border-gray-200
            flex justify-around items-center h-16 md:hidden z-[100]">
```

---

## 5. Top Bar

```html
<header class="sticky top-0 z-[90] h-14 bg-white border-b border-gray-200
               flex items-center justify-between px-8">

  <!-- Page title -->
  <h1 class="text-xl font-semibold text-gray-900">Properties</h1>

  <!-- Right actions -->
  <div class="flex items-center gap-3">

    <!-- Search -->
    <div class="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 w-56">
      <i class="fa-regular fa-magnifying-glass text-gray-400 text-sm"></i>
      <input class="bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none w-full"
             placeholder="Search properties...">
    </div>

    <!-- Notifications -->
    <button class="relative w-9 h-9 flex items-center justify-center rounded-lg
                   hover:bg-gray-100 text-gray-500 hover:text-gray-900 transition-colors">
      <i class="fa-regular fa-bell text-base"></i>
      <span class="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-crimson"></span>
    </button>

    <!-- Primary CTA -->
    <button class="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white
                   text-sm font-medium px-4 py-2 rounded-lg transition-colors duration-150">
      <i class="fa-solid fa-plus text-xs"></i>
      Add Property
    </button>

  </div>
</header>
```

---

## 6. Component Library

### 6.1 KPI / Stat Cards

```html
<div class="bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex flex-col gap-3 col-span-3">

  <!-- Label -->
  <p class="text-sm font-medium text-gray-500">Total Properties</p>

  <!-- Value + delta -->
  <div class="flex items-end justify-between">
    <span class="text-4xl font-bold text-gray-900">247</span>
    <span class="flex items-center gap-1 text-sm font-medium text-green-600">
      <i class="fa-solid fa-arrow-trend-up text-xs"></i>
      +12%
    </span>
  </div>

  <!-- Sparkline placeholder -->
  <div class="h-10 bg-gray-50 rounded-lg animate-none"></div>

  <!-- AI badge -->
  <div class="flex items-center gap-1.5">
    <span class="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
    <span class="text-xs italic text-indigo-500">AI Confidence: High</span>
  </div>

</div>
```

---

### 6.2 Property Card (Grid View)

```html
<div class="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden
            hover:shadow-lg hover:-translate-y-0.5 transition-all duration-150 cursor-pointer col-span-4">

  <!-- Image -->
  <div class="h-44 bg-gray-100 relative overflow-hidden">
    <img class="w-full h-full object-cover" src="..." alt="Property">
    <!-- Status pill -->
    <span class="absolute top-3 left-3 flex items-center gap-1.5 bg-white rounded-full
                 px-2.5 py-1 text-xs font-medium shadow-sm text-green-600">
      <span class="w-1.5 h-1.5 rounded-full bg-green-500"></span>
      Occupied
    </span>
  </div>

  <!-- Body -->
  <div class="p-4 flex flex-col gap-3">

    <!-- Title row -->
    <div class="flex items-start justify-between">
      <div>
        <p class="text-base font-semibold text-gray-900">Westlands Plaza</p>
        <p class="text-xs text-gray-400">Nairobi, Kenya</p>
      </div>
      <button class="w-7 h-7 flex items-center justify-center rounded-md hover:bg-gray-100 text-gray-400">
        <i class="fa-solid fa-ellipsis-vertical text-sm"></i>
      </button>
    </div>

    <!-- Price -->
    <div class="flex flex-col gap-0.5">
      <p class="text-xl font-semibold text-gray-900">KES 2,400,000/mo</p>
      <p class="flex items-center gap-1 text-xs italic text-indigo-500">
        <i class="fa-solid fa-wand-magic-sparkles text-[10px]"></i>
        AI Est: KES 2,550,000/mo
      </p>
    </div>

    <!-- Units -->
    <p class="text-xs text-gray-500">3 units / 3 occupied</p>

    <hr class="border-gray-100">

    <!-- Actions -->
    <div class="flex items-center gap-2">
      <button class="flex-1 text-xs font-medium border border-green-500 text-green-600
                     hover:bg-green-50 rounded-lg py-1.5 transition-colors">
        <i class="fa-regular fa-pen-to-square mr-1"></i> Edit
      </button>
      <button class="flex-1 text-xs font-medium bg-crimson hover:bg-crimson-dark
                     text-white rounded-lg py-1.5 transition-colors">
        <i class="fa-regular fa-arrow-right mr-1"></i> View
      </button>
      <button class="w-8 h-8 flex items-center justify-center rounded-lg text-gray-300
                     hover:text-red-500 hover:bg-red-50 transition-colors">
        <i class="fa-regular fa-trash text-sm"></i>
      </button>
    </div>

  </div>
</div>
```

---

### 6.3 Property Detail Drawer

```html
<!-- Backdrop -->
<div class="fixed inset-0 bg-black/20 z-[200] transition-opacity duration-200"></div>

<!-- Panel -->
<aside class="fixed inset-y-0 right-0 w-[480px] bg-white shadow-xl z-[210]
              flex flex-col translate-x-0 transition-transform duration-[250ms]">

  <!-- Header -->
  <div class="flex items-center justify-between px-6 py-4 border-b border-gray-200">
    <h2 class="text-lg font-semibold text-gray-900">Westlands Plaza</h2>
    <button class="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-400">
      <i class="fa-solid fa-xmark"></i>
    </button>
  </div>

  <!-- Scrollable body -->
  <div class="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-6">
    <!-- Form sections go here -->
  </div>

  <!-- Sticky action bar -->
  <div class="px-6 py-4 border-t border-gray-200 bg-white flex items-center gap-3">
    <button class="flex-1 bg-green-500 hover:bg-green-600 text-white text-sm font-medium
                   py-2.5 rounded-lg transition-colors">
      Save Changes
    </button>
    <button class="px-4 py-2.5 text-sm font-medium text-gray-600 border border-gray-200
                   hover:bg-gray-50 rounded-lg transition-colors">
      Discard
    </button>
    <button class="text-sm font-medium text-red-500 hover:text-red-600 transition-colors ml-auto">
      Delete Property
    </button>
  </div>

</aside>
```

---

### 6.4 AI Pricing Engine Card

```html
<div class="bg-indigo-50 border border-indigo-500 rounded-xl p-5 flex flex-col gap-4">

  <!-- Header -->
  <div class="flex items-center justify-between">
    <div class="flex items-center gap-2">
      <i class="fa-solid fa-wand-magic-sparkles text-indigo-500 text-sm"></i>
      <span class="text-sm font-semibold text-indigo-700">AI Pricing Intelligence</span>
    </div>
    <button class="flex items-center gap-1.5 text-xs text-indigo-500 hover:text-indigo-700 transition-colors">
      <i class="fa-solid fa-rotate text-[10px]"></i> Refresh
    </button>
  </div>

  <!-- Stats grid -->
  <div class="grid grid-cols-3 gap-3">
    <div class="flex flex-col gap-0.5">
      <p class="text-xs text-gray-500">Current Rent</p>
      <p class="text-sm font-semibold text-gray-900">KES 2,400,000</p>
    </div>
    <div class="flex flex-col gap-0.5">
      <p class="text-xs text-gray-500">AI Estimate</p>
      <p class="flex items-center gap-1 text-sm font-semibold text-green-600">
        <i class="fa-solid fa-arrow-trend-up text-xs"></i> KES 2,550,000
      </p>
    </div>
    <div class="flex flex-col gap-0.5">
      <p class="text-xs text-gray-500">Market Avg</p>
      <p class="text-sm font-semibold text-gray-900">KES 2,480,000</p>
    </div>
  </div>

  <!-- Chart placeholder -->
  <div class="h-24 bg-white rounded-lg border border-indigo-100"></div>

  <!-- Confidence bar -->
  <div class="flex flex-col gap-1.5">
    <div class="flex justify-between">
      <span class="text-xs text-gray-500">Confidence</span>
      <span class="text-xs font-semibold text-indigo-600">82%</span>
    </div>
    <div class="h-1.5 bg-gray-200 rounded-full overflow-hidden">
      <div class="h-full bg-indigo-500 rounded-full w-[82%]"></div>
    </div>
    <p class="text-xs italic text-gray-400">Based on 47 comparable listings in Westlands</p>
  </div>

  <!-- Actions -->
  <div class="flex gap-2">
    <button class="flex-1 bg-green-500 hover:bg-green-600 text-white text-xs font-medium
                   py-2 rounded-lg transition-colors">
      Apply AI Price
    </button>
    <button class="px-4 py-2 text-xs font-medium text-gray-500 hover:text-gray-700
                   border border-gray-200 rounded-lg transition-colors bg-white">
      Dismiss
    </button>
  </div>

</div>
```

---

### 6.5 Data Table

```html
<div class="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden col-span-12">
  <table class="w-full text-sm">

    <thead class="bg-gray-50 border-b border-gray-200">
      <tr>
        <th class="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
          <div class="flex items-center gap-1 cursor-pointer group">
            Property
            <i class="fa-solid fa-sort text-gray-300 group-hover:text-gray-400 text-[10px]"></i>
          </div>
        </th>
        <!-- Repeat for each column; active sort uses fa-sort-up or fa-sort-down in text-crimson -->
      </tr>
    </thead>

    <tbody class="divide-y divide-gray-100">
      <tr class="hover:bg-gray-50 transition-colors">
        <td class="px-4 py-3 text-sm font-medium text-gray-900">Westlands Plaza</td>
        <td class="px-4 py-3 text-sm text-gray-500">Nairobi</td>
        <td class="px-4 py-3">
          <span class="text-xs font-medium text-green-700 bg-green-100 rounded-full px-2 py-0.5">100%</span>
        </td>
        <td class="px-4 py-3 text-sm italic text-indigo-500">KES 2.55M</td>
        <td class="px-4 py-3">
          <span class="inline-flex items-center gap-1.5 text-xs font-medium text-green-700">
            <span class="w-1.5 h-1.5 rounded-full bg-green-500"></span> Active
          </span>
        </td>
        <td class="px-4 py-3">
          <div class="flex items-center gap-1">
            <button class="w-7 h-7 flex items-center justify-center rounded-md text-gray-400
                           hover:text-green-600 hover:bg-green-50 transition-colors">
              <i class="fa-regular fa-pen-to-square text-xs"></i>
            </button>
            <button class="w-7 h-7 flex items-center justify-center rounded-md text-gray-400
                           hover:text-red-500 hover:bg-red-50 transition-colors">
              <i class="fa-regular fa-trash text-xs"></i>
            </button>
          </div>
        </td>
      </tr>
    </tbody>

  </table>

  <!-- Pagination -->
  <div class="flex items-center justify-between px-4 py-3 border-t border-gray-100">
    <p class="text-xs text-gray-500">Showing 1–12 of 247</p>
    <div class="flex items-center gap-1">
      <button class="w-8 h-8 rounded-lg text-sm text-gray-500 hover:bg-gray-100 transition-colors">‹</button>
      <button class="w-8 h-8 rounded-lg text-sm font-medium bg-crimson text-white">1</button>
      <button class="w-8 h-8 rounded-lg text-sm text-gray-500 hover:bg-gray-100 transition-colors">2</button>
      <button class="w-8 h-8 rounded-lg text-sm text-gray-500 hover:bg-gray-100 transition-colors">3</button>
      <button class="w-8 h-8 rounded-lg text-sm text-gray-500 hover:bg-gray-100 transition-colors">›</button>
    </div>
  </div>

</div>
```

---

### 6.6 Buttons — Full Reference

| Variant | Tailwind Classes |
|---|---|
| **Primary (crimson)** | `bg-crimson hover:bg-crimson-dark text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors duration-150 active:scale-95` |
| **Create / Update (green)** | `bg-green-500 hover:bg-green-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors duration-150 active:scale-95` |
| **Destructive (red)** | `bg-red-500 hover:bg-red-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors duration-150 active:scale-95` |
| **Ghost neutral** | `border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-medium px-4 py-2 rounded-lg transition-colors duration-150` |
| **Ghost green** | `border border-green-500 hover:bg-green-50 text-green-600 text-sm font-medium px-4 py-2 rounded-lg transition-colors duration-150` |
| **Ghost red** | `border border-red-400 hover:bg-red-50 text-red-500 text-sm font-medium px-4 py-2 rounded-lg transition-colors duration-150` |
| **AI (indigo)** | `bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors duration-150 active:scale-95` |
| **Icon-only** | `w-9 h-9 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors` |
| **Text-only destructive** | `text-sm font-medium text-red-500 hover:text-red-600 transition-colors` |

**Destructive confirmation modal:**
```html
<div class="fixed inset-0 bg-black/30 z-[300] flex items-center justify-center">
  <div class="bg-white rounded-xl shadow-xl p-6 w-96 flex flex-col gap-4">
    <div class="flex items-center gap-3">
      <div class="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
        <i class="fa-solid fa-triangle-exclamation text-red-500"></i>
      </div>
      <div>
        <p class="text-base font-semibold text-gray-900">Delete Westlands Plaza?</p>
        <p class="text-sm text-gray-500">This cannot be undone.</p>
      </div>
    </div>
    <div class="flex gap-2 justify-end">
      <button class="border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-medium px-4 py-2 rounded-lg transition-colors">
        Cancel
      </button>
      <button class="bg-red-500 hover:bg-red-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors active:scale-95">
        Yes, Delete
      </button>
    </div>
  </div>
</div>
```

---

### 6.7 Form Inputs

```html
<!-- Text input -->
<div class="flex flex-col gap-1.5">
  <label class="text-sm font-medium text-gray-700">Property Name</label>
  <input class="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900
                placeholder-gray-400 outline-none bg-white
                focus:border-crimson focus:ring-2 focus:ring-crimson/20
                transition-colors duration-150"
         placeholder="e.g. Westlands Plaza">
</div>

<!-- Error state — replace border classes with: -->
<!-- border-red-400 focus:border-red-500 focus:ring-red-100 -->
<p class="text-xs text-red-500">This field is required.</p>

<!-- Select -->
<select class="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900
               outline-none focus:border-crimson focus:ring-2 focus:ring-crimson/20
               bg-white appearance-none cursor-pointer transition-colors">
```

---

### 6.8 Status Pills / Badges

```html
<!-- Occupied -->
<span class="inline-flex items-center gap-1.5 text-xs font-medium text-green-700 bg-green-100 rounded-full px-2.5 py-1">
  <span class="w-1.5 h-1.5 rounded-full bg-green-500"></span> Occupied
</span>

<!-- Partial -->
<span class="inline-flex items-center gap-1.5 text-xs font-medium text-amber-700 bg-amber-100 rounded-full px-2.5 py-1">
  <span class="w-1.5 h-1.5 rounded-full bg-amber-400"></span> Partial
</span>

<!-- Vacant -->
<span class="inline-flex items-center gap-1.5 text-xs font-medium text-red-600 bg-red-100 rounded-full px-2.5 py-1">
  <span class="w-1.5 h-1.5 rounded-full bg-red-500"></span> Vacant
</span>
```

**Blog category badges:**
```html
AI         → <span class="text-xs font-medium text-indigo-700 bg-indigo-100 rounded-full px-2.5 py-0.5">AI Trends</span>
Legal      → <span class="text-xs font-medium text-amber-700 bg-amber-100 rounded-full px-2.5 py-0.5">Legal</span>
Market     → <span class="text-xs font-medium text-crimson bg-red-100 rounded-full px-2.5 py-0.5">Market Watch</span>
Investment → <span class="text-xs font-medium text-green-700 bg-green-100 rounded-full px-2.5 py-0.5">Investment</span>
```

---

### 6.9 Blog Cards

**Featured (full-width):**
```html
<div class="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden grid grid-cols-2 col-span-12">
  <div class="relative overflow-hidden">
    <img class="w-full h-full object-cover" src="..." alt="">
  </div>
  <div class="p-8 flex flex-col justify-center gap-4">
    <div class="flex items-center gap-3">
      <span class="text-xs font-medium text-crimson bg-red-100 rounded-full px-2.5 py-0.5">Market Watch</span>
      <span class="text-xs text-gray-400">5 min read</span>
    </div>
    <h2 class="text-2xl font-bold text-gray-900">Nairobi Office Rents Climb 8% in Q1 2025</h2>
    <p class="text-sm text-gray-500 leading-relaxed">excerpt...</p>
    <button class="bg-crimson hover:bg-crimson-dark text-white text-sm font-medium px-4 py-2 rounded-lg
                   transition-colors self-start flex items-center gap-2">
      Read More <i class="fa-regular fa-arrow-right text-xs"></i>
    </button>
  </div>
</div>
```

**Standard card:**
```html
<div class="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden
            hover:shadow-md hover:-translate-y-0.5 transition-all duration-150 col-span-4">
  <div class="h-40 bg-gray-100 overflow-hidden">
    <img class="w-full h-full object-cover" src="..." alt="">
  </div>
  <div class="p-4 flex flex-col gap-2">
    <div class="flex items-center justify-between">
      <!-- category badge -->
      <span class="text-xs text-gray-400">Mar 12 · 3 min</span>
    </div>
    <h3 class="text-base font-semibold text-gray-900 line-clamp-2">Article title</h3>
    <p class="text-xs text-gray-500 line-clamp-2">excerpt...</p>
  </div>
</div>
```

---

### 6.10 Toast Notifications

```html
<div class="fixed bottom-6 right-6 z-[400] flex flex-col gap-2">

  <!-- Success -->
  <div class="flex items-start gap-3 bg-white border-l-4 border-green-500 rounded-lg shadow-lg px-4 py-3 w-72">
    <i class="fa-solid fa-circle-check text-green-500 mt-0.5 flex-shrink-0"></i>
    <div>
      <p class="text-sm font-medium text-gray-900">Property saved</p>
      <p class="text-xs text-gray-500">Changes applied successfully.</p>
    </div>
    <button class="ml-auto text-gray-400 hover:text-gray-600">
      <i class="fa-solid fa-xmark text-xs"></i>
    </button>
  </div>

  <!-- Error -->
  <div class="flex items-start gap-3 bg-white border-l-4 border-red-500 rounded-lg shadow-lg px-4 py-3 w-72">
    <i class="fa-solid fa-circle-xmark text-red-500 mt-0.5 flex-shrink-0"></i>
    <!-- same structure -->
  </div>

  <!-- AI update -->
  <div class="flex items-start gap-3 bg-white border-l-4 border-indigo-500 rounded-lg shadow-lg px-4 py-3 w-72">
    <i class="fa-solid fa-wand-magic-sparkles text-indigo-500 mt-0.5 flex-shrink-0"></i>
    <!-- same structure -->
  </div>

</div>
```

---

## 7. Page Specifications

### 7.1 Overview (Dashboard)

```html
<div class="flex flex-col gap-6">

  <!-- KPI Row — 4 cards -->
  <div class="grid grid-cols-12 gap-6">
    <!-- [KPI Card col-span-3] × 4 -->
    <!-- Total Properties | Portfolio Value | Occupancy Rate | AI Avg Rent -->
  </div>

  <!-- Charts Row -->
  <div class="grid grid-cols-12 gap-6">
    <div class="col-span-8 bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <h3 class="text-base font-semibold text-gray-900 mb-4">Occupancy Trend (12mo)</h3>
      <!-- Recharts component -->
    </div>
    <div class="col-span-4 bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <h3 class="text-base font-semibold text-gray-900 mb-4">Vacancy Alerts</h3>
    </div>
  </div>

  <!-- Activity + AI Pulse Row -->
  <div class="grid grid-cols-12 gap-6">
    <div class="col-span-7 bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <h3 class="text-base font-semibold text-gray-900 mb-4">Recent Activity</h3>
    </div>
    <!-- AI Market Pulse -->
    <div class="col-span-5 bg-indigo-50 border border-indigo-500 rounded-xl p-6">
      <div class="flex items-center gap-2 mb-4">
        <i class="fa-solid fa-wand-magic-sparkles text-indigo-500"></i>
        <h3 class="text-base font-semibold text-indigo-700">AI Market Pulse</h3>
      </div>
      <ul class="flex flex-col gap-2 text-sm text-gray-700"><!-- insights --></ul>
      <p class="text-xs text-gray-400 mt-3">Updated 2 hours ago</p>
    </div>
  </div>

</div>
```

---

### 7.2 Properties Page

```html
<div class="flex flex-col gap-6">

  <!-- Controls -->
  <div class="flex items-center justify-between">
    <div class="flex items-center gap-2">
      <!-- Filter pills -->
      <span class="text-xs font-medium border border-gray-200 rounded-full px-3 py-1.5 cursor-pointer
                   hover:border-crimson hover:text-crimson transition-colors">All Types</span>
    </div>
    <div class="flex items-center gap-3">
      <!-- View toggle -->
      <div class="flex border border-gray-200 rounded-lg overflow-hidden">
        <button class="px-3 py-1.5 bg-crimson text-white text-xs">
          <i class="fa-solid fa-grid-2"></i>
        </button>
        <button class="px-3 py-1.5 text-gray-500 hover:bg-gray-50 text-xs">
          <i class="fa-solid fa-list"></i>
        </button>
      </div>
      <button class="bg-green-500 hover:bg-green-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
        <i class="fa-solid fa-plus mr-2 text-xs"></i> Add Property
      </button>
    </div>
  </div>

  <!-- Grid view -->
  <div class="grid grid-cols-12 gap-6">
    <!-- [Property Card col-span-4] × N -->
  </div>

</div>
```

**Add Property Wizard — step indicator:**
```html
<div class="flex items-center gap-2 px-6 py-4 border-b border-gray-100">
  <!-- Step 1 — active -->
  <div class="flex items-center gap-2">
    <span class="w-6 h-6 rounded-full bg-crimson text-white text-xs font-semibold flex items-center justify-center">1</span>
    <span class="text-sm font-medium text-gray-900">Basic Info</span>
  </div>
  <div class="flex-1 h-px bg-gray-200"></div>
  <!-- Step 2 — pending -->
  <div class="flex items-center gap-2">
    <span class="w-6 h-6 rounded-full bg-gray-100 text-gray-400 text-xs font-semibold flex items-center justify-center">2</span>
    <span class="text-sm font-medium text-gray-400">Units</span>
  </div>
  <!-- ... steps 3, 4 -->
  <!-- Completed step uses bg-green-500 text-white -->
</div>
```

---

### 7.3 Analytics Page

```html
<div class="flex flex-col gap-6">
  <div class="flex justify-between items-center">
    <h1 class="text-2xl font-bold text-gray-900">Analytics</h1>
    <button class="border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-medium px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
      <i class="fa-regular fa-download text-xs"></i> Export
    </button>
  </div>
  <div class="grid grid-cols-12 gap-6">
    <div class="col-span-12 bg-white rounded-xl border border-gray-200 shadow-sm p-6">Rent Roll</div>
    <div class="col-span-6 bg-white rounded-xl border border-gray-200 shadow-sm p-6">NOI</div>
    <div class="col-span-6 bg-white rounded-xl border border-gray-200 shadow-sm p-6">Occupancy</div>
    <div class="col-span-12 bg-indigo-50 border border-indigo-500 rounded-xl p-6">
      <div class="flex items-center gap-2 mb-4">
        <i class="fa-solid fa-wand-magic-sparkles text-indigo-500"></i>
        <h3 class="text-base font-semibold text-indigo-700">AI Forecast — Next 6 Months</h3>
      </div>
    </div>
  </div>
</div>
```

---

### 7.4 AI Insights Page

```html
<div class="flex flex-col gap-6">

  <div class="bg-indigo-50 border border-indigo-500 rounded-xl p-6">
    <div class="flex items-center gap-3 mb-1">
      <i class="fa-solid fa-wand-magic-sparkles text-indigo-500 text-xl"></i>
      <h1 class="text-2xl font-bold text-indigo-700">AI Insights</h1>
    </div>
    <p class="text-sm text-indigo-500">Powered by market data and your portfolio</p>
  </div>

  <div class="grid grid-cols-12 gap-6">
    <div class="col-span-8 bg-white rounded-xl border border-gray-200 shadow-sm p-6 h-96">
      <!-- Map / comparables -->
    </div>
    <div class="col-span-4 bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <h3 class="text-base font-semibold text-gray-900 mb-4">Saved Insights</h3>
    </div>
  </div>

  <!-- Ask AI -->
  <div class="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-3 shadow-sm">
    <i class="fa-solid fa-wand-magic-sparkles text-indigo-400"></i>
    <input class="flex-1 text-sm text-gray-700 placeholder-gray-400 outline-none"
           placeholder="Ask AI anything about your portfolio...">
    <button class="bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors active:scale-95">
      Ask
    </button>
  </div>

</div>
```

---

### 7.5 Blog Page

```html
<!-- Admin toolbar -->
<div class="flex items-center justify-between mb-6">
  <h1 class="text-2xl font-bold text-gray-900">Market Blog</h1>
  <button class="bg-green-500 hover:bg-green-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
    <i class="fa-solid fa-plus text-xs"></i> New Post
  </button>
</div>

<!-- Editorial grid -->
<div class="grid grid-cols-12 gap-6">
  <!-- Featured — col-span-12 -->
  <!-- Standard cards — col-span-4 -->
</div>
```

**Blog detail page:**
```html
<div class="max-w-2xl mx-auto py-12 px-4">

  <div class="flex items-center gap-3 mb-6">
    <!-- category badge -->
    <span class="text-xs text-gray-400">March 12, 2025 · 5 min read</span>
  </div>

  <h1 class="text-3xl font-bold text-gray-900 mb-6">Article Title</h1>

  <!-- AI Summary -->
  <div class="bg-indigo-50 border border-indigo-500 rounded-xl p-4 mb-8">
    <div class="flex items-center gap-2 mb-2">
      <i class="fa-solid fa-wand-magic-sparkles text-indigo-500 text-sm"></i>
      <span class="text-sm font-semibold text-indigo-700">AI Summary</span>
    </div>
    <p class="text-sm italic text-indigo-600">summary...</p>
  </div>

  <!-- Prose -->
  <div class="text-base text-gray-700 leading-relaxed"><!-- content --></div>

  <!-- Share -->
  <div class="flex items-center gap-3 mt-10 pt-6 border-t border-gray-100">
    <span class="text-sm text-gray-500">Share:</span>
    <button class="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-500 transition-colors">
      <i class="fa-solid fa-link text-xs"></i>
    </button>
    <button class="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-500 transition-colors">
      <i class="fa-brands fa-x-twitter text-xs"></i>
    </button>
  </div>

</div>
```

---

## 8. Motion & Animation

All animation uses Tailwind utilities only. No keyframe CSS written manually.

| Element | Tailwind Classes |
|---|---|
| Card hover lift | `hover:-translate-y-0.5 hover:shadow-lg transition-all duration-150` |
| Button press | `active:scale-95 transition-transform duration-100` |
| Nav item colour | `transition-colors duration-150` |
| Nav rail expand | `transition-all duration-200` |
| Drawer slide | `transition-transform duration-[250ms]` + JS toggles `translate-x-0` / `translate-x-full` |
| Overlay fade | `transition-opacity duration-200` |
| Modal scale | JS toggles `scale-95 opacity-0` / `scale-100 opacity-100` + `transition-all duration-150` |
| Skeleton shimmer | `animate-pulse bg-gray-200 rounded` |

**Reduced motion:** Add `motion-reduce:transition-none motion-reduce:animate-none` to every animated element.

**Drawer toggle pattern (JS):**
```js
// Open
drawer.classList.remove('translate-x-full')
drawer.classList.add('translate-x-0')
// Close
drawer.classList.remove('translate-x-0')
drawer.classList.add('translate-x-full')
```

---

## 9. Iconography

Library: **Font Awesome 6 Free** — loaded via CDN (see §1).

Style rule: `fa-regular` for passive/nav, `fa-solid` for active/action. Size via `text-xs` through `text-xl`.

| FA Class | Context | Tailwind Colour |
|---|---|---|
| `fa-gauge-high` | Overview nav | `text-gray-500` / active `text-crimson` |
| `fa-house` | Properties nav | `text-gray-500` / active `text-crimson` |
| `fa-chart-line` | Analytics | `text-gray-500` / active `text-crimson` |
| `fa-wand-magic-sparkles` | All AI | `text-indigo-500` |
| `fa-newspaper` | Blog | `text-gray-500` / active `text-crimson` |
| `fa-gear` | Settings | `text-gray-500` |
| `fa-bell` | Notifications | `text-gray-500` |
| `fa-magnifying-glass` | Search | `text-gray-400` |
| `fa-pen-to-square` | Edit | `text-gray-400` hover `text-green-600` |
| `fa-trash` | Delete | `text-gray-400` hover `text-red-500` |
| `fa-plus` | Create | `text-white` (inside green button) |
| `fa-arrow-right` | Navigate | `text-white` (inside crimson button) |
| `fa-triangle-exclamation` | Alerts | `text-amber-500` or `text-red-500` |
| `fa-circle-check` | Success | `text-green-500` |
| `fa-sort` / `fa-sort-up` / `fa-sort-down` | Table sort | `text-gray-300` / active `text-crimson` |
| `fa-rotate` | Refresh AI | `text-indigo-500` |
| `fa-xmark` | Close | `text-gray-400` hover `text-gray-700` |
| `fa-ellipsis-vertical` | Overflow menu | `text-gray-400` |
| `fa-arrow-trend-up` | Positive delta | `text-green-500` |
| `fa-arrow-trend-down` | Negative delta | `text-red-500` |

---

## 10. Responsive Behaviour

| Breakpoint | Tailwind prefix | Changes |
|---|---|---|
| Mobile `< 768px` | _(base)_ | `grid-cols-1`; nav `hidden`; bottom bar `flex md:hidden`; drawers full-screen |
| Tablet `768px+` | `md:` | Nav icon-only `w-[72px]`; `md:grid-cols-2`; `md:ml-[72px]` |
| Desktop `1280px+` | `xl:` | Full `xl:grid-cols-12`; nav expands on hover to `w-60` |

Key responsive classes per element:

```
Sidebar:        hidden md:flex
Bottom nav:     flex md:hidden
Content grid:   grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12
Property card:  col-span-12 md:col-span-6 xl:col-span-4
KPI card:       col-span-12 md:col-span-6 xl:col-span-3
Main offset:    ml-0 md:ml-[72px]
```

---

## 11. Empty & Loading States

**Empty state:**
```html
<div class="col-span-12 flex flex-col items-center justify-center py-20 gap-4 text-center">
  <div class="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
    <i class="fa-regular fa-house text-2xl text-gray-300"></i>
  </div>
  <p class="text-base font-semibold text-gray-900">No properties yet</p>
  <p class="text-sm text-gray-500">Add your first property to get started.</p>
  <button class="bg-green-500 hover:bg-green-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors mt-2">
    <i class="fa-solid fa-plus mr-2 text-xs"></i> Add Your First Property
  </button>
</div>
```

**Skeleton card:**
```html
<div class="bg-white rounded-xl border border-gray-200 col-span-4 overflow-hidden">
  <div class="h-44 bg-gray-200 animate-pulse"></div>
  <div class="p-4 flex flex-col gap-3">
    <div class="h-4 bg-gray-200 animate-pulse rounded w-3/4"></div>
    <div class="h-3 bg-gray-200 animate-pulse rounded w-1/2"></div>
    <div class="h-6 bg-gray-200 animate-pulse rounded w-2/3"></div>
  </div>
</div>
```

**Error banner:**
```html
<div class="col-span-12 flex items-center gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
  <i class="fa-solid fa-triangle-exclamation text-red-500 flex-shrink-0"></i>
  <p class="text-sm text-red-700 flex-1">Something went wrong loading your properties.</p>
  <button class="text-sm font-medium text-red-600 hover:text-red-700 transition-colors">Retry</button>
</div>
```

---

## 12. Z-Index Stack

| Layer | Class |
|---|---|
| Top bar | `z-[90]` |
| Navigation rail | `z-[100]` |
| Drawer backdrop | `z-[200]` |
| Drawer panel | `z-[210]` |
| Modal backdrop | `z-[300]` |
| Modal panel | `z-[310]` |
| Toast stack | `z-[400]` |

---

## 13. Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| **Styling** | **Tailwind CSS v3 — utility classes only. Zero custom CSS.** |
| Fonts | Google Fonts — Poppins (loaded in `<head>`, registered in `tailwind.config.js`) |
| Icons | Font Awesome 6 Free (CDN) |
| Charts | Recharts or Tremor (both Tailwind-compatible) |
| Maps | Mapbox GL JS |
| Animation | Tailwind `transition-*` + `animate-*`; Framer Motion for complex sequences |
| AI Pricing | Anthropic / OpenAI API + property data pipeline |
| Auth | Clerk or NextAuth |
| Database | Supabase (Postgres) |
| Blog CMS | Sanity.io or Contentlayer (MDX) |

---

*Design System v1.2 — Ardhitech Consulting Property Management Platform*
