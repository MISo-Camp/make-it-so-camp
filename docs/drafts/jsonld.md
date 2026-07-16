# JSON-LD Draft — Make It So Camp

Drafted strictly from the approved facts for `misocamp.com`. No offers, no
prices, no invented facts. The "by invitation" / "email-only CTA" nature is
expressed only in description text, never as a price or offer property.

## Schema choices

- **Organization + WebSite** on the hub, combined in one `@graph` with the two
  Event nodes and both founder Person nodes (so cross-references resolve
  within a single crawl of the hub).
- **Event** per camp. `eventAttendanceMode` is `OfflineEventAttendanceMode` for
  both. No `offers` anywhere.
  - Tokyo: `Place` name `Crypto Café Tokyo`, addressLocality `Tokyo`, country `JP`.
  - Adelaide: venue is `TBD` per the approved facts, so the `Place` name is
    `Venue to be announced` with addressLocality `Adelaide`, country `AU`. No
    street address is invented.
  - Collaborating institutions are modeled as `contributor` (Organization),
    not `sponsor`/`organizer` — they are partners, not the organizer.
- **Person** per founder with `sameAs` to the personal sites named in the
  facts. Noah Raford carries `jobTitle` (Managing Partner), `affiliation`
  (EMIR), and MIT as `alumniOf` + `hasCredential`, exactly as stated. Igor
  Schwarzmann carries name + `sameAs` only — no job-title fact exists, so none
  is added.
- **BreadcrumbList** for each subpage (Tokyo, Adelaide, About). The hub does
  not get one (it is the root crumb).

## Variants

Two URL variants are given per block:

- **Staging** — the current `/new/...` paths that exist in the repo.
- **Launch** — the intended root paths (`/tokyo/`, `/adelaide/`, `/about/`)
  for the production site. The root `index.html` exists; the camp/detail root
  routes do not yet, so launch URLs are the target paths for launch migration.

The only differences between staging and launch blocks are URL strings and
`@id` bases. Description text, dates, names, and `sameAs` are identical.

## Placement

Every block is a `<script type="application/ld+json">...</script>` placed in
the `<head>` of the target page, immediately before `</head>`. Multiple blocks
on one page may be kept as separate scripts or merged into one `@graph`.

---

## 1. Hub — Organization + WebSite + Events + Persons

- **Staging target:** `https://misocamp.com/new/` → `new/index.html`
- **Launch target:** `https://misocamp.com/` → `index.html` (root). Note: the
  root hub already contains a `Course` schema; this `@graph` may be added
  alongside it or used to supersede it — coordinator's call. No other file is
  modified by this draft.

### Staging variant

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://misocamp.com/new/#org",
      "name": "Make It So Camp",
      "url": "https://misocamp.com/new/",
      "email": "hello@misocamp.com",
      "description": "Make It So Camp is a selective two-day AI workshop, by invitation. Thesis: You cannot delegate what you cannot articulate.",
      "founder": [
        { "@id": "https://misocamp.com/new/#igor" },
        { "@id": "https://misocamp.com/new/#noah" }
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://misocamp.com/new/#website",
      "name": "Make It So Camp",
      "url": "https://misocamp.com/new/",
      "inLanguage": "en",
      "publisher": { "@id": "https://misocamp.com/new/#org" }
    },
    {
      "@type": "Person",
      "@id": "https://misocamp.com/new/#igor",
      "name": "Igor Schwarzmann",
      "sameAs": ["https://igorschwarzmann.com"]
    },
    {
      "@type": "Person",
      "@id": "https://misocamp.com/new/#noah",
      "name": "Noah Raford",
      "jobTitle": "Managing Partner",
      "affiliation": { "@type": "Organization", "name": "EMIR" },
      "alumniOf": [{ "@type": "EducationalOrganization", "name": "Massachusetts Institute of Technology" }],
      "hasCredential": "PhD, Massachusetts Institute of Technology",
      "sameAs": ["https://noahraford.com"]
    },
    {
      "@type": "Event",
      "@id": "https://misocamp.com/new/#tokyo-event",
      "name": "Make It So Camp Tokyo",
      "description": "Selective two-day AI workshop, by invitation. In collaboration with Chiba Institute of Technology.",
      "startDate": "2026-08-24",
      "endDate": "2026-08-25",
      "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
      "eventStatus": "https://schema.org/EventScheduled",
      "organizer": { "@id": "https://misocamp.com/new/#org" },
      "contributor": [{ "@type": "Organization", "name": "Chiba Institute of Technology" }],
      "location": {
        "@type": "Place",
        "name": "Crypto Café Tokyo",
        "address": { "@type": "PostalAddress", "addressLocality": "Tokyo", "addressCountry": "JP" }
      }
    },
    {
      "@type": "Event",
      "@id": "https://misocamp.com/new/#adelaide-event",
      "name": "Make It So Camp Adelaide",
      "description": "Selective two-day AI workshop, by invitation. In collaboration with Flinders University New Venture Institute and SA Futures Agency.",
      "startDate": "2026-09-17",
      "endDate": "2026-09-18",
      "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
      "eventStatus": "https://schema.org/EventScheduled",
      "organizer": { "@id": "https://misocamp.com/new/#org" },
      "contributor": [
        { "@type": "Organization", "name": "Flinders University New Venture Institute" },
        { "@type": "Organization", "name": "SA Futures Agency" }
      ],
      "location": {
        "@type": "Place",
        "name": "Venue to be announced",
        "address": { "@type": "PostalAddress", "addressLocality": "Adelaide", "addressCountry": "AU" }
      }
    }
  ]
}
```

### Launch variant

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://misocamp.com/#org",
      "name": "Make It So Camp",
      "url": "https://misocamp.com/",
      "email": "hello@misocamp.com",
      "description": "Make It So Camp is a selective two-day AI workshop, by invitation. Thesis: You cannot delegate what you cannot articulate.",
      "founder": [
        { "@id": "https://misocamp.com/#igor" },
        { "@id": "https://misocamp.com/#noah" }
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://misocamp.com/#website",
      "name": "Make It So Camp",
      "url": "https://misocamp.com/",
      "inLanguage": "en",
      "publisher": { "@id": "https://misocamp.com/#org" }
    },
    {
      "@type": "Person",
      "@id": "https://misocamp.com/#igor",
      "name": "Igor Schwarzmann",
      "sameAs": ["https://igorschwarzmann.com"]
    },
    {
      "@type": "Person",
      "@id": "https://misocamp.com/#noah",
      "name": "Noah Raford",
      "jobTitle": "Managing Partner",
      "affiliation": { "@type": "Organization", "name": "EMIR" },
      "alumniOf": [{ "@type": "EducationalOrganization", "name": "Massachusetts Institute of Technology" }],
      "hasCredential": "PhD, Massachusetts Institute of Technology",
      "sameAs": ["https://noahraford.com"]
    },
    {
      "@type": "Event",
      "@id": "https://misocamp.com/#tokyo-event",
      "name": "Make It So Camp Tokyo",
      "description": "Selective two-day AI workshop, by invitation. In collaboration with Chiba Institute of Technology.",
      "startDate": "2026-08-24",
      "endDate": "2026-08-25",
      "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
      "eventStatus": "https://schema.org/EventScheduled",
      "organizer": { "@id": "https://misocamp.com/#org" },
      "contributor": [{ "@type": "Organization", "name": "Chiba Institute of Technology" }],
      "location": {
        "@type": "Place",
        "name": "Crypto Café Tokyo",
        "address": { "@type": "PostalAddress", "addressLocality": "Tokyo", "addressCountry": "JP" }
      }
    },
    {
      "@type": "Event",
      "@id": "https://misocamp.com/#adelaide-event",
      "name": "Make It So Camp Adelaide",
      "description": "Selective two-day AI workshop, by invitation. In collaboration with Flinders University New Venture Institute and SA Futures Agency.",
      "startDate": "2026-09-17",
      "endDate": "2026-09-18",
      "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
      "eventStatus": "https://schema.org/EventScheduled",
      "organizer": { "@id": "https://misocamp.com/#org" },
      "contributor": [
        { "@type": "Organization", "name": "Flinders University New Venture Institute" },
        { "@type": "Organization", "name": "SA Futures Agency" }
      ],
      "location": {
        "@type": "Place",
        "name": "Venue to be announced",
        "address": { "@type": "PostalAddress", "addressLocality": "Adelaide", "addressCountry": "AU" }
      }
    }
  ]
}
```

---

## 2. Tokyo camp page — Event + BreadcrumbList

- **Staging target:** `https://misocamp.com/new/tokyo/` → `new/tokyo/index.html`
- **Launch target:** `https://misocamp.com/tokyo/` → future `tokyo/index.html`

The camp page carries its own self-contained Event block (it does not rely on
the hub `@graph` resolving, since each page is crawled independently). The
Event is equivalent to the hub's Tokyo Event node; pick one or the other to
avoid duplicate Entity expansion — the camp-page block is the
page-scoped source per page.

### Event — staging variant

```json
{
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "Make It So Camp Tokyo",
  "description": "Selective two-day AI workshop, by invitation. In collaboration with Chiba Institute of Technology.",
  "startDate": "2026-08-24",
  "endDate": "2026-08-25",
  "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
  "eventStatus": "https://schema.org/EventScheduled",
  "url": "https://misocamp.com/new/tokyo/",
  "organizer": {
    "@type": "Organization",
    "name": "Make It So Camp",
    "url": "https://misocamp.com/new/",
    "email": "hello@misocamp.com"
  },
  "contributor": [{ "@type": "Organization", "name": "Chiba Institute of Technology" }],
  "location": {
    "@type": "Place",
    "name": "Crypto Café Tokyo",
    "address": { "@type": "PostalAddress", "addressLocality": "Tokyo", "addressCountry": "JP" }
  }
}
```

### Event — launch variant

```json
{
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "Make It So Camp Tokyo",
  "description": "Selective two-day AI workshop, by invitation. In collaboration with Chiba Institute of Technology.",
  "startDate": "2026-08-24",
  "endDate": "2026-08-25",
  "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
  "eventStatus": "https://schema.org/EventScheduled",
  "url": "https://misocamp.com/tokyo/",
  "organizer": {
    "@type": "Organization",
    "name": "Make It So Camp",
    "url": "https://misocamp.com/",
    "email": "hello@misocamp.com"
  },
  "contributor": [{ "@type": "Organization", "name": "Chiba Institute of Technology" }],
  "location": {
    "@type": "Place",
    "name": "Crypto Café Tokyo",
    "address": { "@type": "PostalAddress", "addressLocality": "Tokyo", "addressCountry": "JP" }
  }
}
```

### BreadcrumbList — staging variant

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://misocamp.com/new/" },
    { "@type": "ListItem", "position": 2, "name": "Tokyo", "item": "https://misocamp.com/new/tokyo/" }
  ]
}
```

### BreadcrumbList — launch variant

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://misocamp.com/" },
    { "@type": "ListItem", "position": 2, "name": "Tokyo", "item": "https://misocamp.com/tokyo/" }
  ]
}
```

---

## 3. Adelaide camp page — Event + BreadcrumbList

- **Staging target:** `https://misocamp.com/new/adelaide/` → `new/adelaide/index.html`
- **Launch target:** `https://misocamp.com/adelaide/` → future `adelaide/index.html`

Adelaide venue is `TBD` in the approved facts. The `Place` is named
`Venue to be announced` with `addressLocality` `Adelaide` only — no street
address is invented.

### Event — staging variant

```json
{
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "Make It So Camp Adelaide",
  "description": "Selective two-day AI workshop, by invitation. In collaboration with Flinders University New Venture Institute and SA Futures Agency.",
  "startDate": "2026-09-17",
  "endDate": "2026-09-18",
  "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
  "eventStatus": "https://schema.org/EventScheduled",
  "url": "https://misocamp.com/new/adelaide/",
  "organizer": {
    "@type": "Organization",
    "name": "Make It So Camp",
    "url": "https://misocamp.com/new/",
    "email": "hello@misocamp.com"
  },
  "contributor": [
    { "@type": "Organization", "name": "Flinders University New Venture Institute" },
    { "@type": "Organization", "name": "SA Futures Agency" }
  ],
  "location": {
    "@type": "Place",
    "name": "Venue to be announced",
    "address": { "@type": "PostalAddress", "addressLocality": "Adelaide", "addressCountry": "AU" }
  }
}
```

### Event — launch variant

```json
{
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "Make It So Camp Adelaide",
  "description": "Selective two-day AI workshop, by invitation. In collaboration with Flinders University New Venture Institute and SA Futures Agency.",
  "startDate": "2026-09-17",
  "endDate": "2026-09-18",
  "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
  "eventStatus": "https://schema.org/EventScheduled",
  "url": "https://misocamp.com/adelaide/",
  "organizer": {
    "@type": "Organization",
    "name": "Make It So Camp",
    "url": "https://misocamp.com/",
    "email": "hello@misocamp.com"
  },
  "contributor": [
    { "@type": "Organization", "name": "Flinders University New Venture Institute" },
    { "@type": "Organization", "name": "SA Futures Agency" }
  ],
  "location": {
    "@type": "Place",
    "name": "Venue to be announced",
    "address": { "@type": "PostalAddress", "addressLocality": "Adelaide", "addressCountry": "AU" }
  }
}
```

### BreadcrumbList — staging variant

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://misocamp.com/new/" },
    { "@type": "ListItem", "position": 2, "name": "Adelaide", "item": "https://misocamp.com/new/adelaide/" }
  ]
}
```

### BreadcrumbList — launch variant

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://misocamp.com/" },
    { "@type": "ListItem", "position": 2, "name": "Adelaide", "item": "https://misocamp.com/adelaide/" }
  ]
}
```

---

## 4. About page — Persons + BreadcrumbList

- **Staging target:** `https://misocamp.com/new/about/` → `new/about/index.html`
- **Launch target:** `https://misocamp.com/about/` → future `about/index.html`

The About page is the human-readable founders page, so it carries the two
Person nodes (self-contained) plus its BreadcrumbList. The Person `sameAs`
URLs are the founders' personal sites and are identical between staging and
launch; only the BreadcrumbList `item` URLs differ.

### Person blocks (identical for staging and launch)

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Igor Schwarzmann",
  "sameAs": ["https://igorschwarzmann.com"]
}
```

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Noah Raford",
  "jobTitle": "Managing Partner",
  "affiliation": { "@type": "Organization", "name": "EMIR" },
  "alumniOf": [{ "@type": "EducationalOrganization", "name": "Massachusetts Institute of Technology" }],
  "hasCredential": "PhD, Massachusetts Institute of Technology",
  "sameAs": ["https://noahraford.com"]
}
```

### BreadcrumbList — staging variant

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://misocamp.com/new/" },
    { "@type": "ListItem", "position": 2, "name": "About", "item": "https://misocamp.com/new/about/" }
  ]
}
```

### BreadcrumbList — launch variant

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://misocamp.com/" },
    { "@type": "ListItem", "position": 2, "name": "About", "item": "https://misocamp.com/about/" }
  ]
}
```