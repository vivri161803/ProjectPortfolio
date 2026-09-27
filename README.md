# Carlo Bianchi — portfolio

Personal portfolio: AI engineering, research and teaching work. Built as a static
Astro site on the **Modernist** design system — flat, architectural, set entirely in
Archivo, near-mono red on a light ground, visible modular grid, zero corner radius,
2px rules.

Rebuilt from the design mockups in `Portfolio site UI mockups/`.

## Pages

| Route | Mockup | What it is |
| --- | --- | --- |
| `/` | 1b | Poster home: statement headline, four-up fact strip, scrolling research band, modular project grid, red closing field |
| `/work` | 1c | Full project index, filterable by area, rows expand in place |
| `/about` | 1d | Bio, experience, education and skills, with CV download |
| `/404` | — | Not found |

## Structure

```
src/
  data/site.ts            All copy: projects, facts, CV sections, skills
  layouts/BaseLayout.astro Head, SEO, JSON-LD, nav + main shell
  components/             Nav, CloseBanner, Footer
  pages/                  index, work, about, 404
  styles/
    modernist.css         The design system — tokens and component classes
    site.css              Page structure built on those tokens
public/                   CV, favicons, robots.txt
```

Content is edited in one place: `src/data/site.ts`. Colors, type, spacing and
elevation come from `modernist.css` variables — nothing hard-codes a hex or a font.

## Develop

```sh
npm install
npm run dev       # http://localhost:4321
npm run build     # static output in dist/
npm run preview
```

Requires Node 22.12+.

## Deploy

Static build on Vercel. `npm run build` outputs `dist/`; no server runtime, no
environment variables.
