# Academic portfolio

A dark, high-contrast personal research site — built with [Astro](https://astro.build),
deployed to GitHub Pages by a GitHub Actions workflow. No runtime framework, no
client-side rendering: the output is static HTML plus four small scripts (the
mobile menu, the carousel arrows, the scroll reveal, and the hero point cloud).

It opens on a full-screen panel — your name over a drifting point cloud — and
the rest of the page fades in as you scroll. Below that it follows the shape of
a conventional academic homepage: sticky header, portrait + intro, publications
grouped by year with thumbnails, a horizontal "academic journey" track, contact
block. Near-black palette, monospace metadata, a single amber accent.

Everything degrades honestly: with JavaScript off, nothing is hidden and the
whole page is readable; under `prefers-reduced-motion`, the cloud paints one
static frame and every reveal is skipped.

---

## Quick start

```bash
npm install
npm run dev        # http://localhost:4321
```

```bash
npm run build      # type-checks, then writes ./dist
npm run preview    # serve ./dist locally
```

Node 20 or newer.

---

## Publishing to GitHub Pages

Requires the [GitHub CLI](https://cli.github.com), logged in with `gh auth login`.

```bash
./setup-github-pages.sh
```

It asks for a repo name, patches `astro.config.mjs` with the right `site`/`base`,
runs a test build, creates the repo, pushes, and switches Pages to the
"GitHub Actions" source. First deploy takes a minute or two.

**Repo name determines the URL.** Naming it `<your-username>.github.io` gives you
`https://<your-username>.github.io`. Any other name gives you
`https://<your-username>.github.io/<repo-name>`, and the script sets `base`
accordingly — get this wrong and your CSS 404s, which is the single most common
way an Astro site on Pages breaks.

Every later push to `main` redeploys on its own. To force one without a commit:
Actions tab → *Deploy to GitHub Pages* → *Run workflow*.

### Doing it by hand instead

1. Create the repo and push this folder to `main`.
2. Settings → Pages → **Source: GitHub Actions**.
3. Edit `site` (and `base`, if it is a project repo) in `astro.config.mjs`.

### Custom domain

See **[DEPLOYING.md](DEPLOYING.md)** for the full walkthrough — DNS records,
repository settings, certificate, and the failure modes.

The short version: add the DNS records, set the domain in **Settings → Pages →
Custom domain**, then in `astro.config.mjs` set `site` to your domain and
**delete `base` entirely**.

Note that a `CNAME` file in `public/` does *nothing* here. GitHub only writes and
reads that file when a site is published from a branch; on an Actions-based
deploy — which is how this project ships — the file is ignored and the domain
comes from repository settings alone.

---

## Making it yours

### 1. Identity — `src/data/site.ts`

Name, tagline, intro paragraphs, interest chips, nav, social links, contact block.
`intro` entries accept raw HTML, so `<strong>` and `<a href>` work inside them.

`authorName` matters: any author string in a publication that matches it is
bolded automatically, so you never hand-mark your own name.

### 2. The splash — `src/data/site.ts` → `splash`

The opening panel fills the viewport with your name over an animated point
cloud; everything else fades in as you scroll to it.

```ts
splash: {
  enabled: true,
  eyebrow: 'Example University · Distributed Systems Group',
},
```

Set `enabled: false` and the panel disappears, the header stops hiding itself,
and the about block goes back to leading with your name as an `<h1>`. Nothing
else needs changing — the layout adapts.

**The graphic** lives in `src/components/Splash.astro`, in a single `<script>`
block with no dependencies. Points are sampled on a sphere, rotated, projected,
and joined to near neighbours. The knobs are at the top:

| Constant | Does |
| --- | --- |
| `COUNT` | Number of points. Cost grows with its square — see below. |
| `LINK_DIST` | How close two points must be to be joined, in screen pixels. |
| `REBUILD_EVERY` | Frames between neighbour-list rebuilds. Higher is cheaper. |

Colours come from your CSS tokens at runtime, so changing `--accent` restyles
the cloud too.

Three things keep it from being a battery drain, and are worth preserving if you
edit it: the neighbour search is O(n²) so `COUNT` stays modest and the pair list
is rebuilt every third frame rather than every frame; the animation stops
entirely once the splash scrolls out of view or the tab is hidden; and under
`prefers-reduced-motion` it paints one static frame and never starts a loop.

### 3. Publications — `src/content/publications/`

One markdown file per paper. Filename is irrelevant; the frontmatter is what counts.

```markdown
---
title: "Elastic Scheduling for Mixed Latency Workloads"
authors: ["Your Name", "A. Collaborator", "B. Advisor"]
venue: "ACM Symposium on Operating Systems Principles (SOSP)"
year: 2026
detail: "To appear"          # optional, shown after the venue
badge: "Best Paper"          # optional pill next to the title
short: "TVCG"                # optional venue acronym for the fallback tile
thumb: "/img/pubs/order-up.jpg"   # optional; falls back to that tile
order: 0                     # optional; lower sorts first within a year
links:
  - { label: "PDF", href: "https://example.com/paper.pdf" }
  - { label: "Code", href: "https://github.com/you/elastic" }
---

Anything below the frontmatter renders as a short abstract under the entry.
Leave it empty to omit.
```

Year headings, sorting, and grouping are derived — you never edit a list of years.
The first entry in `links` also becomes the title's hyperlink.

**Teaser images.** Drop a file in `public/img/pubs/` and uncomment the `thumb:`
line already present in each entry. Any size or aspect ratio works — the CSS
crops to 16:10 with `object-fit: cover` — so there is nothing to resize first;
aim for 528px wide or more so it stays sharp on a high-DPI screen. Entries with
no image fall back to a hatched tile showing `short` (the venue acronym), which
looks deliberate enough to leave permanently.

The frontmatter is schema-checked (`src/content.config.ts`). A misspelled field or
a `year` in quotes fails the build with a pointed error rather than silently
producing a broken page. That is the point of the schema; don't route around it.

### 4. Academic journey — `src/content/journey/`

One file per position. `start` is used only for sorting (newest first); `period`
is the string people actually read.

```markdown
---
role: "PhD Candidate"
org: "Example University"
period: "2024 — present"
start: 2024
logo: "/img/example-university.svg"   # optional; falls back to initials
blurb: "Distributed Systems Group."   # optional
---
```

### 5. Images

Everything in `public/` is served from the site root.

- `public/img/portrait.svg` — replace with your photo (square, ~800×800). Update
  `portrait` in `src/data/site.ts` to the new filename, or set it to `null` to
  drop the portrait entirely.
- `public/img/` — publication thumbnails and institution logos.
- `public/favicon.svg` — currently a placeholder with "YN" in it.
- `public/cv.pdf` — drop your CV here; the CV button already points at it.

### 6. Theme

Every colour is a token at the top of `src/styles/global.css`. Changing `--accent`
re-skins the whole site; `--bg` and the `--fg-*` scale control the rest. Fonts
(Inter + JetBrains Mono) load from Google Fonts in `src/layouts/Base.astro` —
swap or self-host them there.

---

## Structure

```
src/
  data/site.ts            identity, nav, socials, contact
  content.config.ts       frontmatter schemas for both collections
  content/
    publications/*.md     one file per paper
    journey/*.md          one file per position
  components/
    Header.astro          sticky bar + mobile dropdown, hidden over the splash
    Splash.astro          full-screen opening panel + point-cloud canvas
    Hero.astro            portrait, intro, chips, social row
    Publications.astro    year grouping and entry cards
    Journey.astro         scroll-snap carousel
    Contact.astro         contact block + footer
    Icon.astro            inline SVG icons
  layouts/Base.astro      <head>, meta tags, JSON-LD, fonts, scroll-reveal
  pages/index.astro       assembles the page
  styles/global.css       tokens + all styling
public/                   static files, served from /
.github/workflows/        Pages deploy
```

Adding a second page — `/cv`, `/teaching`, a blog — means dropping another
`.astro` file into `src/pages/`. It picks up the layout and styles as-is.

---

## Troubleshooting

**Page loads but is unstyled.** `base` in `astro.config.mjs` doesn't match the repo
name. For repo `portfolio` it must be `base: '/portfolio'`; for
`<username>.github.io` it must be absent.

**Actions run fails on `npm ci`.** `package-lock.json` wasn't committed. Run
`npm install` and commit the lockfile.

**Build fails with a content error.** Read the message — it names the file and the
field. Usually a missing `year`, or `authors` written as a bare string instead of
a list.

**404 after the first push.** Settings → Pages → Source must be **GitHub Actions**,
not "Deploy from a branch".
