export interface CampFactsRow {
  /** Term, e.g. "Dates", "Venue", "In collaboration with". */
  term: string;
  /** Value cell. */
  value: string;
  /** When true, `value` is trusted HTML (built by partnerLinks) and rendered with set:html. */
  html?: boolean;
}

export interface Partner {
  /** Display name, exactly as the partner writes it. */
  name: string;
  /** Canonical public URL. */
  url: string;
}

/**
 * Render partners as an inline, linked, prose-joined list:
 * one -> "A"; two -> "A and B"; three+ -> "A, B, and C" (Oxford comma).
 * Returns trusted HTML — only ever pass it to set:html, never to a meta tag.
 */
export function partnerLinks(partners: Partner[]): string {
  const links = partners.map(
    (p) => `<a href="${p.url}" target="_blank" rel="noopener">${p.name}</a>`,
  );
  if (links.length === 1) return links[0];
  if (links.length === 2) return `${links[0]} and ${links[1]}`;
  return `${links.slice(0, -1).join(', ')}, and ${links[links.length - 1]}`;
}

/** Plain-text equivalent of partnerLinks, for meta descriptions and JSON-LD. */
export function partnerNames(partners: Partner[]): string {
  const names = partners.map((p) => p.name);
  if (names.length === 1) return names[0];
  if (names.length === 2) return `${names[0]} and ${names[1]}`;
  return `${names.slice(0, -1).join(', ')}, and ${names[names.length - 1]}`;
}

export interface CampScheduleSlot {
  time: string;
  title: string;
}

export interface CampScheduleDay {
  day: 'Day 1' | 'Day 2';
  slots: CampScheduleSlot[];
}

export interface Camp {
  /** URL slug, also the getStaticPaths param. */
  slug: 'tokyo' | 'adelaide';
  /** <title> contents. */
  title: string;
  /** <meta name="description"> contents. */
  description: string;
  /** og:description / twitter:description. */
  ogDescription: string;
  /** Hero <h1> statement, including trailing period. */
  statement: string;
  /** Hero meta line after the middot, e.g. "Tokyo · 24–25 August 2026". */
  metaLine: string;
  /** Mailto subject slug without the host, percent-encoded, e.g. "Tokyo%20invitation%20request". */
  subject: string;
  /** Collaborating organisations for this camp, in credit order. */
  partners: Partner[];
  /** Overview lead-statement text before the <span class="dim">. */
  overviewLead: string;
  /** Overview lead-statement dim text. */
  overviewDim: string;
  /** Overview left column paragraphs, in order. */
  overviewLeft: string[];
  /** Overview right column paragraphs, in order. */
  overviewRight: string[];
  /** Schedule days and slots, in order. */
  schedule: CampScheduleDay[];
  /** Logistics facts rows, in order. */
  facts: CampFactsRow[];
}

const sharedSchedule: CampScheduleDay[] = [
  {
    day: 'Day 1',
    slots: [
      { time: '09:00', title: 'Welcome + frame' },
      { time: '10:00', title: "Methods you can't see" },
      { time: '11:40', title: 'Lunch' },
      { time: '12:40', title: 'Write it down, it compounds' },
      { time: '14:15', title: 'Explicit = shareable' },
      { time: '15:30', title: 'Form teams, or go solo' },
      { time: '16:15', title: 'Networking drinks' },
    ],
  },
  {
    day: 'Day 2',
    slots: [
      { time: '09:00', title: 'Re-entry' },
      { time: '09:15', title: 'Morning frame: lock the build' },
      { time: '09:45', title: 'Build I' },
      { time: '11:15', title: 'Mid-build crit' },
      { time: '11:45', title: 'Lunch' },
      { time: '12:30', title: 'Build II' },
      { time: '14:00', title: 'Demo rounds' },
      { time: '14:45', title: 'Wrap, early finish' },
    ],
  },
];

const tokyoPartners: Partner[] = [
  { name: 'Chiba Institute of Technology Henkaku Center', url: 'https://www.henkaku.center/en/' },
  { name: 'Mousterian', url: 'https://www.mousterian.com' },
];

const adelaidePartners: Partner[] = [
  { name: 'Flinders University New Venture Institute', url: 'https://www.flinders.edu.au/new-venture-institute' },
  { name: 'SA Futures Agency', url: 'https://www.safuturesagency.com.au' },
];

/** Every collaborating organisation across all camps, in footer credit order. */
export const allPartners: Partner[] = [...tokyoPartners, ...adelaidePartners];

export const camps: Camp[] = [
  {
    slug: 'tokyo',
    title: 'Make It So Camp Tokyo — 24–25 August 2026',
    description: 'Make It So Camp Tokyo is a two-day AI workshop at Crypto Café Tokyo, in collaboration with Chiba Institute of Technology Henkaku Center and Mousterian.',
    ogDescription: 'Two days to make your way of working legible — to a machine, and to people who work nothing like you.',
    statement: 'Make It So Camp Tokyo.',
    metaLine: 'Tokyo · 24–25 August 2026',
    subject: 'Tokyo%20invitation%20request',
    partners: tokyoPartners,
    overviewLead: 'Two days to make your way of working legible — to a machine, and to people who work nothing like you.',
    overviewDim: 'This page is what to expect in Tokyo.',
    overviewLeft: [
      'Make It So Camp Tokyo runs over two days at Crypto Café Tokyo, in collaboration with Chiba Institute of Technology Henkaku Center and Mousterian. The cohort is deliberately mixed: researchers, strategists, designers, operators — people from the region who share a problem type, not a job title.',
      'You bring real work. Not a case study, not a sandbox exercise: a live problem where your judgment matters and your method has never been written down. That problem is your material for both days.',
    ],
    overviewRight: [
      'Day 1 is about articulation — making the method behind your work explicit enough that someone from another field could follow it. Day 2 puts it to work: you build with the tools, alone or in a small team, and demo what your way of working makes possible.',
      'You leave with three things: a written method you can keep using, a working thing you built from it, and a set of people who now know how you think.',
    ],
    schedule: sharedSchedule,
    facts: [
      { term: 'Dates', value: '24–25 August 2026' },
      { term: 'Venue', value: 'Crypto Café Tokyo' },
      { term: 'In collaboration with', value: partnerLinks(tokyoPartners), html: true },
      { term: 'Format', value: 'Two days, hands-on' },
      { term: 'Cohort', value: 'Deliberately mixed: academic, creative industries, corporate' },
      { term: 'Bring', value: 'A real problem you are working on' },
    ],
  },
  {
    slug: 'adelaide',
    title: 'Make It So Camp Adelaide — 17–18 September 2026',
    description: 'Make It So Camp Adelaide is a two-day AI workshop in Adelaide, in collaboration with Flinders University New Venture Institute and SA Futures Agency.',
    ogDescription: 'Two days to make your way of working legible — to a machine, and to people who work nothing like you.',
    statement: 'Make It So Camp Adelaide.',
    metaLine: 'Adelaide · 17–18 September 2026',
    subject: 'Adelaide%20invitation%20request',
    partners: adelaidePartners,
    overviewLead: 'Two days to make your way of working legible — to a machine, and to people who work nothing like you.',
    overviewDim: 'This page is what to expect in Adelaide.',
    overviewLeft: [
      'Make It So Camp Adelaide runs over two days in Adelaide, in collaboration with Flinders University New Venture Institute and SA Futures Agency. The venue will be announced. The cohort is deliberately mixed: researchers, strategists, designers, operators — people from the region who share a problem type, not a job title.',
      'You bring real work. Not a case study, not a sandbox exercise: a live problem where your judgment matters and your method has never been written down. That problem is your material for both days.',
    ],
    overviewRight: [
      'Day 1 is about articulation — making the method behind your work explicit enough that someone from another field could follow it. Day 2 puts it to work: you build with the tools, alone or in a small team, and demo what your way of working makes possible.',
      'You leave with three things: a written method you can keep using, a working thing you built from it, and a set of people who now know how you think.',
    ],
    schedule: sharedSchedule,
    facts: [
      { term: 'Dates', value: '17–18 September 2026' },
      { term: 'Venue', value: 'TBD' },
      { term: 'In collaboration with', value: partnerLinks(adelaidePartners), html: true },
      { term: 'Format', value: 'Two days, hands-on' },
      { term: 'Cohort', value: 'Deliberately mixed: academic, creative industries, corporate' },
      { term: 'Bring', value: 'A real problem you are working on' },
    ],
  },
];

export function getCamp(slug: string): Camp {
  const camp = camps.find((c) => c.slug === slug);
  if (!camp) throw new Error(`Unknown camp slug: ${slug}`);
  return camp;
}
