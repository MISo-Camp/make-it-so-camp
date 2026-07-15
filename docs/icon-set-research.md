# Icon set research for misocamp.com

## Summary and recommendation

**Recommendation: use Phosphor Icons, Regular weight, as inline SVG.** It is the best fit for a light, warm, editorial static site set in **Newsreader** with **IBM Plex Mono** as structural metadata.

Why this is the best choice:

- **Visual harmony:** Phosphor Regular has enough presence to sit beside serif body copy without turning into hairlines, but it is less visually loud than the 2px 24-grid systems in Lucide and Tabler.
- **Warmth:** the shapes feel drawn and approachable rather than purely dashboard/system UI. Rounded terminals, softer proportions, and a broader expressive range make it more compatible with an editorial site than a SaaS interface.
- **License:** MIT, permissive for commercial/static-site use.
- **Implementation:** raw SVG assets are available directly in the `phosphor-icons/core` repository and can be pasted inline with `fill="currentColor"`; no package, build step, icon font, or runtime dependency is required.

Recommended implementation pattern:

```html
<svg class="icon" viewBox="0 0 256 256" aria-hidden="true" focusable="false">
  <!-- paste Phosphor Regular path(s) here -->
</svg>
```

```css
.icon {
  width: 1em;
  height: 1em;
  display: inline-block;
  vertical-align: -0.12em;
  fill: currentColor;
}
```

One practical caveat: unlike Lucide, Tabler, and Heroicons, Phosphor's regular SVGs are filled path outlines rather than live `stroke-width` SVGs. That is fine for a static site, but the weight should be chosen at source level (`regular`, not CSS-adjusted after paste). If a particular icon feels heavy in a very small metadata row, test `light` only for that use case; do not mix weights broadly unless the site intentionally defines two icon roles.

## Likely glyph set

Use these Phosphor Regular source SVGs. Links are pinned to the current `phosphor-icons/core` commit inspected during research: `2b75f3ad12b420c9504ef05df8d2564a28f8500e`.

| Site need | Phosphor glyph | Exact source |
|---|---|---|
| Date / schedule | `calendar` | https://github.com/phosphor-icons/core/blob/2b75f3ad12b420c9504ef05df8d2564a28f8500e/assets/regular/calendar.svg |
| Location / venue | `map-pin` | https://github.com/phosphor-icons/core/blob/2b75f3ad12b420c9504ef05df8d2564a28f8500e/assets/regular/map-pin.svg |
| Forward CTA | `arrow-right` | https://github.com/phosphor-icons/core/blob/2b75f3ad12b420c9504ef05df8d2564a28f8500e/assets/regular/arrow-right.svg |
| Participants / group | `users` | https://github.com/phosphor-icons/core/blob/2b75f3ad12b420c9504ef05df8d2564a28f8500e/assets/regular/users.svg |
| Time / duration | `clock` | https://github.com/phosphor-icons/core/blob/2b75f3ad12b420c9504ef05df8d2564a28f8500e/assets/regular/clock.svg |
| External link | `arrow-square-out` | https://github.com/phosphor-icons/core/blob/2b75f3ad12b420c9504ef05df8d2564a28f8500e/assets/regular/arrow-square-out.svg |
| Email / contact | `envelope-simple` | https://github.com/phosphor-icons/core/blob/2b75f3ad12b420c9504ef05df8d2564a28f8500e/assets/regular/envelope-simple.svg |
| Registration / pass | `ticket` | https://github.com/phosphor-icons/core/blob/2b75f3ad12b420c9504ef05df8d2564a28f8500e/assets/regular/ticket.svg |
| Info / note | `info` | https://github.com/phosphor-icons/core/blob/2b75f3ad12b420c9504ef05df8d2564a28f8500e/assets/regular/info.svg |
| Expand / small nav affordance | `caret-down` | https://github.com/phosphor-icons/core/blob/2b75f3ad12b420c9504ef05df8d2564a28f8500e/assets/regular/caret-down.svg |

## Findings

### 1. Phosphor Icons

Sources: [Phosphor homepage](https://phosphoricons.com/), [`phosphor-icons/core` README](https://github.com/phosphor-icons/core), [MIT license](https://github.com/phosphor-icons/core/blob/main/LICENSE)

- **Stroke weight / visual color:** Strongest match. Phosphor ships six weights: Thin, Light, Regular, Bold, Fill, Duotone. Regular is the right default for Newsreader because it has enough optical substance at small sizes without the hard 2px visual color of Lucide or Tabler.
- **Warmth:** Best of the evaluated sets. The proportions are more human and expressive, with softer curves and less strict dashboard geometry. This matters for a camp/workshop site that should feel inviting rather than product-SaaS.
- **License:** MIT.
- **Inline SVG practicality:** Good. The core repo exposes raw SVGs under `assets/<weight>/`. They use `fill="currentColor"`, so inline icons inherit text color cleanly. No build tooling required.
- **Trade-off:** Weight is selected by file, not adjusted with `stroke-width` in CSS. Keep the site on Regular unless visual QA shows metadata rows need the Light files.

### 2. Lucide

Sources: [Lucide icons](https://lucide.dev/icons/), [Lucide icon design guide](https://lucide.dev/contribute/icon-design-guide), [Lucide license](https://github.com/lucide-icons/lucide/blob/main/LICENSE)

- **Stroke weight / visual color:** Lucide's design guide specifies a 24x24 canvas, 2px stroke, round joins, and round caps. It is clean and consistent, but the 2px line can read too assertive next to editorial serif text unless color is softened.
- **Warmth:** Warmer than many technical sets because of round caps and joins, but still reads as modern app infrastructure. It feels functional before it feels editorial.
- **License:** ISC, with MIT attribution for Feather-derived icons listed in the license file. Both are permissive.
- **Inline SVG practicality:** Excellent. The SVGs use `stroke="currentColor"`, `fill="none"`, and simple elements. If implementation ergonomics were the only criterion, Lucide would be the easiest choice.
- **Why not selected:** Too familiar as a general-purpose product UI set; visually cleaner than the misocamp.com tone needs.

### 3. Tabler Icons

Sources: [Tabler Icons homepage](https://tabler.io/icons), [Tabler GitHub repo](https://github.com/tabler/tabler-icons), [Tabler MIT license](https://raw.githubusercontent.com/tabler/tabler-icons/master/LICENSE)

- **Stroke weight / visual color:** Tabler uses a 24x24 grid and 2px stroke. This gives strong consistency but also a darker, more utilitarian visual color.
- **Warmth:** The least editorial of the top contenders. It is excellent for admin products, dashboards, and dense UI systems, but that is exactly the association to avoid for a warm static site.
- **License:** MIT.
- **Inline SVG practicality:** Excellent. The site and repo emphasize direct SVG use, including embedding in HTML.
- **Why not selected:** The geometry and catalog breadth are practical, but the personality is too product/admin for misocamp.com.

### 4. Heroicons

Sources: [Heroicons homepage](https://heroicons.com/), [Heroicons GitHub repo](https://github.com/tailwindlabs/heroicons), [Heroicons MIT license](https://github.com/tailwindlabs/heroicons/blob/master/LICENSE)

- **Stroke weight / visual color:** The 24x24 outline set uses a 1.5px stroke, which is lighter than Lucide and Tabler and therefore more compatible with body text at small sizes.
- **Warmth:** Cleaner and less heavy than Tabler, but still strongly associated with Tailwind/product UI. It has less expressive range than Phosphor.
- **License:** MIT.
- **Inline SVG practicality:** Excellent. Raw SVG files are available and can be pasted inline without tooling.
- **Why not selected:** Good fallback if the site wants a very restrained UI tone, but it feels more interface-native than editorial.

### Wildcard check

No wildcard is recommended. Feather is effectively superseded by Lucide for this use case; Remix, Material Symbols, and similar large libraries skew more product/system than editorial; commercial/editorial sets may look better but fail the open-source/permissive/static-SVG constraint. None is genuinely better than Phosphor for this brief.

## Recommendation details

Use **Phosphor Regular** for all primary site icons. Keep icons small and text-adjacent rather than decorative: approximately `1em` inside inline metadata, `1.1em` to `1.25em` for CTA affordances. Let `currentColor` carry the tone, and avoid icon-only communication except for widely understood affordances such as external-link or expand.

If the visual design later introduces large feature cards or section markers, test Phosphor **Light** at larger sizes only. Do not switch the whole site to Light unless Newsreader is also being used in a delicate/high-contrast treatment; Light may become too brittle in small metadata rows.

## Open questions

- Final icon color should be checked against the actual misocamp.com palette; the set choice is independent, but optical weight will change with contrast.
- Confirm whether icons will appear mostly inline with metadata or also as larger section markers. If larger markers are needed, test Regular versus Light in context before mixing weights.
- If the final site uses a very small mono metadata size, run a browser pass on `calendar`, `users`, and `arrow-square-out`; these are the glyphs most likely to need either slightly larger sizing or the Light/Regular decision revisited.
