# Handoff: Olivier Guitton — CV site (portfolio + Kakemphaton case study + PM Big Picture)

## Overview
A complete multi-page personal **CV / portfolio website** for Olivier Guitton (Product Manager, 15 ans). It comprises:
1. **CV home** — hero, parcours, expertises, impact, the "Side project · Kakemphaton" grid (with a hero card linking to the Big Picture), and contact.
2. **Product Management — Big Picture** — a large framework poster.
3. **Kakemphaton case study** — a fictional end-to-end product case in **11 livrables across 4 phases** (Discovery, Stratégie, Delivery, Pilotage), plus a case-study hub page and an app-refonte mockup.

All pages cross-link via relative `href`s (e.g. the CV grid cards link to each `Kakemphaton *.dc.html`; each case page has a breadcrumb back to the CV and the case hub; the Big Picture links back to the CV).

## About the Design Files
The files in `pages/` are **design references created in HTML** — high-fidelity prototypes of the intended look & behavior, **not production code to ship as-is**. The goal is to **rebuild this entire site in a real codebase/framework of your choice** (recommended: a component-based stack — Next.js/React or Astro — since the pages share one design system and a common nav/footer), reproducing the visuals pixel-faithfully while using clean, idiomatic components.

**Ignore the `.dc.html` runtime wrapper.** These files were authored in an internal "DC" environment: each loads `support.js` and uses custom tags `<x-dc>`, `<helmet>`, `<sc-for list as>` (a repeat/loop), `<sc-if>`, `{{ mustache }}` holes, and a trailing `<script type="text/x-dc">` containing a `class Component extends DCLogic { renderVals(){…} }` that returns the page's data arrays. When porting:
- Treat `<helmet>` contents as `<head>` (fonts, `<style>` resets, `@keyframes`).
- Treat the markup between `<x-dc>`…`</x-dc>` as the page body.
- `<sc-for list="{{ items }}" as="x">…{{ x.field }}…</sc-for>` → a `.map()` / `v-for` over the array of the same name found in the `renderVals()` return object at the bottom of the file. Copy those arrays as your data/constants.
- `{{ path }}` → interpolation; `onClick="{{ printCv }}"` → an event handler.
- Inline `style="…"` is the source of truth for all styling (no external CSS). `style-hover="…"` / `style-active` → `:hover` / `:active` rules.
- `support.js` is the DC runtime — **do not port it**; it's only included so the prototypes render in a browser.

## Fidelity
**High-fidelity (hifi).** Final colors, typography, spacing, shadows, and interactions are settled. Rebuild pixel-faithfully. Page content widths are fixed (CV ~960px column; case pages ~1100–1200px; the Big Picture poster is 1910px and intended for large-screen/print, scrolling horizontally on small viewports).

## Shared design system (applies to every page)
- **Typography**: Display & UI = **Schibsted Grotesk** (600/700/800); body = **Hanken Grotesk** (400–600); mono/labels/eyebrows = **JetBrains Mono** (500–700). All via Google Fonts.
- **Primary blue**: `#2563eb`; link/active blue `#1d4ed8`; deep blue `#1e3a8a`; dark navy (CTAs/gradients) `#0f1f3d` / `#1b3a6b`.
- **Pills / chips**: bg `#eef2ff`, text `#1d4ed8`, border `#d8e3fb`, radius 6px (case pages also use neutral chips bg `#f1f3f7`, text `#5a6275`, radius 999px).
- **Inks**: `#0f172a` (headlines), `#334155`/`#475569` (body), `#64748b`/`#8a92a3`/`#9aa1b2` (muted). **Hairlines**: `#e6e3f2`, `#eaecf1`, `#eceef3`. **Surfaces**: page bg `#f4f5f9`, cards `#fff`.
- **Radius**: cards 14–18px, big canvas 24px, buttons 11–12px, pills 6px / 999px. **Shadow (card)**: `0 1px 2px rgba(16,30,60,.04), 0 12px 26px -18px rgba(16,30,60,.12)`.
- **Sticky top nav** (every page): translucent white + backdrop-blur(12px), bottom hairline. Left = 30–32px rounded-9px blue logo tile + "Olivier Guitton" / breadcrumb; right = nav links (CV) or prev/next piece switcher (case pages) + a blue CTA pill. Active nav link has an animated sliding pill indicator (`#eef3ff`).
- **Section eyebrow pattern**: mono 13px, uppercase, letter-spacing .14em, blue number + grey label, followed by a 1px hairline rule.

## Pages / Views

### CV home — `CV Olivier Guitton.dc.html`
- **Sections**: sticky nav (Parcours · Expertises · Impact · Side project · Contact + "Prendre 30 min" CTA) → **Hero** ("Transformer la vision produit en valeur business", portrait card with "15+ ans" stat, primary "Télécharger le CV"/print + "Me contacter") → **Parcours** (timeline of roles, e.g. "OPS — Service Intelligence Marché, Vecteur Plus") → **Expertises** (capability pillars) → **Impact** (metrics) → **Side project · Kakemphaton** (intro + "Ouvrir l'étude de cas" + a stats band "11 pièces / 1 étude de cas / 4 phases" + the **Big Picture hero card** + the 11-piece grid grouped by phase 01–04) → **Contact** (navy gradient CTA card) → footer.
- **Big Picture hero card** (top of the Kakemphaton grid): navy gradient `linear-gradient(135deg,#1b3a6b,#0f1f3d)`, radius 18px; badge "VUE D'ENSEMBLE · FRAMEWORK" (mono, `#bcd4fb` on `rgba(96,165,250,.16)`), title Schibsted 800/25px white, subtitle `#aebfd9`, white "Voir la big picture →" button, decorative mini double-diamond SVG (blue strokes). Hover lifts the card. Links to `Product Management Big Picture.dc.html`.
- **Piece cards** (grid `repeat(3,1fr)`, gap 18px): white, border `rgba(37,99,235,.16)`, radius 18px; 200px thumbnail (`assets/thumb-*.png`) with a navy uppercase category tag pill; body = phase eyebrow + title + 1-line desc + 3 neutral chips + "Voir →" link. Each links to its `Kakemphaton *.dc.html`.
- **Print**: a `printCv` handler triggers `window.print()`; ensure a clean print stylesheet in the rebuild.

### Product Management — Big Picture — `Product Management Big Picture.dc.html`
Full framework poster. **See the detailed section below** (its spec is the most intricate). Authored at 1910px; blue palette matching the rest of the site.

### Kakemphaton case study (11 livrables, 4 phases)
All share the case-page chrome: breadcrumb nav (Kakemphaton / "Vue d'ensemble" → hub / current piece), a piece switcher (prev/next + "n / 11" counter), an eyebrow badge, an H1 (Schibsted 800/36px) + subtitle, the diagram body, and prev/next footer links. Phase tints reuse the blue/indigo system.

- **`Kakemphaton Etude de Cas.dc.html`** — case-study **hub**: overview of the fictional case, the 4 phases and the 11 deliverables, entry point to all pieces.
- **Discovery (01)** — `Kakemphaton User Research.dc.html` (empathy/persona/JTBD; persona "Camille", `assets/persona-camille.png`), `Kakemphaton Market Sizing.dc.html` (TAM/SAM/SOM revenue sizing), `Kakemphaton Parties Prenantes.dc.html` (stakeholder map: influence/pouvoir, confiance, RACI).
- **Stratégie (02)** — `Kakemphaton Product Canvas.dc.html` (product/lean canvas, BMC), `Kakemphaton Go To Market.dc.html` (GTM plan, expansion), `Kakemphaton OKR.dc.html` (4 objectives × 3 key results; objective boxes bg `#ede9fe`/`#eef2ff`, KR labels blue), `Kakemphaton Roadmap.dc.html` (Now/Next/Later, goal-oriented roadmap).
- **Delivery (03)** — `Kakemphaton User Story Mapping.dc.html` (story map: activities → steps → stories), `Kakemphaton Scrum Kanban.dc.html` (Scrum-with-Kanban board/flow; `assets/board`/`thumb-scrum.png`).
- **Pilotage (04)** — `Kakemphaton Tableau de Bord.dc.html` (KPI dashboard with charts; `assets/kakemphaton-dashboard.png`, `thumb-dashboard.png`), `Kakemphaton App - Refonte.dc.html` (app redesign mockup; `assets/kakemphaton-hero.png`, `kakemphaton-analyses.png`, `thumb-app.png`).

(Each piece's exact internal layout/specs live in its own `.dc.html` — read the file's markup + its `renderVals()` data. They all obey the Shared design system above.)

---

## Product Management — Big Picture: detailed spec
A single white "canvas" card (radius 24px, soft shadow) holding four stacked, transparent sections that read as one continuous diagram. Grid unit throughout: **`110px` gutter + 8 × `215px` columns** (=1830) inside the 1910px canvas.

- **Title block**: badge "VUE D'ENSEMBLE · FRAMEWORK"; H1 Schibsted 800/34px; subtitle 17px `#64748b`; **framing quote** (3px blue left bar): *"Le cadre que j'applique au quotidien depuis 10 ans en Product Management — de la découverte du besoin jusqu'à l'impact mesuré et l'itération continue."*
- **(1) Design-thinking band**: 4 diamonds (Problème · Hypothèse · Développement · Mesure) via SVG polylines; diagonal phase labels rotated ±19°; 8 circles 56px `#2563eb` white text (Pourquoi/Quoi/Comment/Apprendre…); descriptions row + steps row (8-col grids). **Mesure** diamond holds an ascending **launch funnel**: Alpha → Beta → Early adopters → **Commercialisation** (rotated squares, increasing size; Commercialisation filled blue tint `#cdddf7`/border `#aec6f1`/text `#1e3a8a`).
- **(2) Phase / Acteurs / Étapes matrix**: 3 labelled rows over the 9-col grid; Étapes = grouped tool **pills** (bg `#eef2ff`, text `#1d4ed8`, border `#d8e3fb`, hover→blue) with blue abbr badges. **Product Backlog** block (box + stacked prioritisation pills: Moscow/RICE/WSJF/Buy a feature/KANO/Business Value & risk/Systemic consensing/Merrill & Covey consensing) absolutely positioned in the empty zone under col 2.
- **(3) Execution flow**: phase labels + "Sprint Planning" box (row 1); six big bold down-chevrons (SVG stroke `#9aa1b4`, width 9, ~62×50px) Alignement·Conception·Construction·Livraison·Impacts·Optimisation (row 2); boxes Objectifs · Sprint Backlog · Daily · Review/Rétrospective · Mesure · Analyse (row 3) with metric clusters (Métriques de suivi, Tableau de bord, Ateliers) inside the Scrum zone.
- **(4) Goal & value ellipses**: left = nested right-aligned goal cascade (Vision produit → Goal-oriented roadmap → Product goal → Sprint goal → **Daily goal**; grey ramp `#e9ebf1→#d4d8e0→#bcc1ce→#a9b0c0→#cfd3db`). Right = value Venn cascade (Incrément `#d3d7df` → Produit `#b8bdc9` → Service `#9aa1b4` → **Expérience utilisateur** `#2563eb`) inside a grey "Influence du système" ellipse with force bubbles (Analyse des usages, Technologique, Business, Feedbacks, Législatif/norme, Concurrents, Éthique et social, …). Below: "Valeurs et impacts" (down-chevrons → 3 boxes Utilisateur/client · Collaborateur · Business) + "Symétrie des attentions" double-hourglass.
- **Connector overlay** (one canvas-level SVG, `viewBox="0 0 1910 2524"`, `preserveAspectRatio="none"`, `pointer-events:none`; lines `#ccd1db`, arrowheads `#aeb4c2`): Étapes→chevrons; Product Backlog→Sprint Planning→Sprint Backlog; Sprint Backlog→Daily (horizontal); Objectifs→goals; **Daily→Daily goal** (curved); **feedback loop** Incrément → up through Review/Rétrospective → curve to Product Backlog, labelled "FEEDBACK CONTINU".
- **Dashed boundary**: one continuous path (stroke `#a8c2ef`, dasharray "7 5") framing the iterative-delivery scope — narrow top over Conception+Livraison étapes, widening down to enclose the Scrum cycle + goals ellipse + value cascade; "SCRUM WITH KANBAN" label (Schibsted 800/16px `#1f2937`, uppercase) on the frame's top edge.

## Interactions & Behavior (site-wide)
- Hover states: pills → blue fill; nav CTA/buttons → lift + shadow; cards → `translateY(-2px/-3px)` + deeper shadow; nav links → sliding pill indicator.
- Navigation: standard relative-link page-to-page; case pages have prev/next piece switching; print handler on the CV.
- Transitions are CSS only (`.15s–.28s ease`/cubic-bezier). No data fetching, no auth, no backend.
- Responsive: rebuild the CV & case pages to reflow gracefully (single column on mobile); the Big Picture poster may stay wide with horizontal scroll, or be offered as a zoom/print view.

## State Management
Essentially static/content-driven. Per-page data lives in each file's `renderVals()` return object (arrays like `phases`, `etapes`, `descs`, `steps`, OKR objects, roadmap items, etc.) — port these as typed constants/JSON feeding your components. The only behavioral state: active-nav highlighting and the print action.

## Design Tokens (quick reference)
- Blue `#2563eb` · `#1d4ed8` · `#1e3a8a` · navy `#0f1f3d`/`#1b3a6b`
- Pill bg `#eef2ff` / border `#d8e3fb` / text `#1d4ed8`; neutral chip bg `#f1f3f7` / text `#5a6275`
- Dashed frame `#a8c2ef` · connector `#ccd1db` · arrowhead `#aeb4c2`
- Inks `#0f172a`/`#334155`/`#475569`/`#64748b`/`#8a92a3`/`#9aa1b2`; hairlines `#e6e3f2`/`#eaecf1`/`#eceef3`; page bg `#f4f5f9`
- Goal ramp `#e9ebf1`,`#d4d8e0`,`#bcc1ce`,`#a9b0c0`,`#cfd3db`; value greys `#9aa1b4`,`#b8bdc9`,`#d3d7df`
- Radius: 24 / 18 / 14 / 12 / 9 / 6 / 999; card shadow `0 1px 2px rgba(16,30,60,.04), 0 12px 26px -18px rgba(16,30,60,.12)`
- Grid: 110 + 8×215 (Big Picture); CV ~960px; fonts Schibsted Grotesk / Hanken Grotesk / JetBrains Mono

## Assets (`pages/assets/`)
- Portraits/hero: `portrait.png`, `kakemphaton-hero.png`, `kakemphaton-analyses.png`, `kakemphaton-dashboard.png`, `persona-camille.png`
- Card thumbnails: `thumb-research.png`, `thumb-market.png`, `thumb-stakeholders.png`, `thumb-canvas.png`, `thumb-gtm.png`, `thumb-okr.png`, `thumb-roadmap.png`, `thumb-storymap.png`, `thumb-scrum.png`, `thumb-dashboard.png`, `thumb-app.png`
- All other shapes (logos, diamonds, circles, ellipses, charts, arrows) are inline SVG/CSS. No third-party brand assets.

## Files (`pages/`)
- `CV Olivier Guitton.dc.html` — home/portfolio (entry point)
- `Product Management Big Picture.dc.html` — framework poster
- `Kakemphaton Etude de Cas.dc.html` — case-study hub
- `Kakemphaton User Research.dc.html`, `… Market Sizing`, `… Parties Prenantes`, `… Product Canvas`, `… Go To Market`, `… OKR`, `… Roadmap`, `… User Story Mapping`, `… Scrum Kanban`, `… Tableau de Bord`, `… App - Refonte` — the 11+1 case pieces
- `assets/` — images · `support.js` — DC runtime (reference only; **do not port**)

## Suggested build approach
1. Set up the chosen framework + the 3 Google Fonts + a tokens file from the palette above.
2. Build shared primitives: `<TopNav>`, `<Footer>`, `<SectionEyebrow>`, `<Pill>`, `<PieceCard>`, `<Button>`, `<StatBand>`.
3. Implement routes: `/` (CV), `/big-picture`, `/case` (hub) + one route per piece. Keep page content in per-page data modules ported from each file's `renderVals()`.
4. Reproduce the Big Picture with an SVG connector layer over a CSS-grid scaffold (it's the highest-effort page).
5. Wire relative links, active-nav state, print, and responsive reflow.
# Current public filenames

The publishable entry point is now `index.html`. The original visual export is preserved, but public pages have been renamed to clean SEO-oriented slugs:

- `product-management-big-picture.html`
- `kakemphaton-etude-de-cas.html`
- `kakemphaton-user-research.html`
- `kakemphaton-market-sizing.html`
- `kakemphaton-parties-prenantes.html`
- `kakemphaton-product-canvas.html`
- `kakemphaton-go-to-market.html`
- `kakemphaton-okr.html`
- `kakemphaton-roadmap.html`
- `kakemphaton-user-story-mapping.html`
- `kakemphaton-scrum-kanban.html`
- `kakemphaton-tableau-de-bord.html`
- `kakemphaton-app-refonte.html`

Archived duplicates are in `_archive/`. SEO metadata and `sitemap.xml` have been updated for the public files.
