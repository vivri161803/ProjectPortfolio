# Roadmap

## Strategia di Implementazione

Il progetto è suddiviso in **6 fasi sequenziali**, ciascuna autocontenuta e verificabile indipendentemente. Ogni fase produce un deliverable funzionante che può essere deployato e testato prima di procedere alla successiva.

> **Principio guida:** Ogni fase deve poter essere mergiata in `main` senza rompere nulla. Le fasi avanzano dal fondamento (scaffold, config, dati) verso la complessità (3D, animazioni, polish).

---

## Fase 0 — Scaffold & Infrastruttura

**Obiettivo:** Progetto Astro funzionante con tutte le integrazioni configurate, deployabile su Vercel come pagina vuota.

**Deliverable:** `npm run dev` mostra una pagina dark vuota con font caricati.

### Task

- [ ] Inizializzare progetto Astro con template `minimal`
- [ ] Installare integrazioni: `@astrojs/react`, `@astrojs/tailwind`
- [ ] Installare dipendenze: `react`, `react-dom`, `three`, `@react-three/fiber`, `@react-three/drei`, `gsap`
- [ ] Configurare `astro.config.mjs` con React e Tailwind
- [ ] Configurare `tailwind.config.mjs` con design tokens da `mission.md`
- [ ] Creare `src/styles/global.css` con Tailwind directives + reset base
- [ ] Creare `BaseLayout.astro` con meta tags, font preload, SEO base
- [ ] Setup font self-hosting: download, subset, WOFF2, preload
- [ ] Creare `index.astro` minimal (dark background, test heading)
- [ ] Verificare: `npm run build` produce output statico
- [ ] Verificare: Lighthouse score ≥ 95 sulla pagina vuota

### Criteri di Accettazione

```
✅ Dev server funziona senza errori
✅ Font personalizzati caricati correttamente
✅ Pagina completamente dark (#070707)
✅ Tailwind tokens accessibili (bg-primary, text-primary, ecc.)
✅ Build statico < 50KB (pre-3D)
```

---

## Fase 1 — Configurazione Centralizzata & Dati

**Obiettivo:** `config.ts` completo e `graph_data.json` con dati reali. Tutto il contenuto del sito è definito in un unico punto.

**Deliverable:** File config importabili, type-safe, con tutti i contenuti e parametri.

### Task

- [ ] Creare `src/config.ts` con interfacce TypeScript per:
  - Dati personali (nome, ruolo, bio)
  - Social links (GitHub, LinkedIn, CV PDF path)
  - Progetti (titolo, descrizione, tech, link GitHub, categoria)
  - Esperienze (ruolo, azienda, periodo, descrizione)
  - Competenze (raggruppate per categoria)
  - Design tokens (colori, font families)
  - Camera coordinates per sezione (position, lookAt, fov)
- [ ] Creare `src/data/graph_data.json` con:
  - Nodi: `{ id, label, size, category, group, position: [x, y, z] }`
  - Edge: `{ source, target, weight }`
  - Categorie semantiche: "AI/ML", "Systems", "Research", "Data", "DevOps"
  - Layout pre-calcolato con clustering spaziale per categoria
- [ ] Validazione: i tipi TypeScript corrispondono alla struttura JSON
- [ ] Documentare lo schema dei dati in un commento in-file

### Criteri di Accettazione

```
✅ config.ts esporta tutti i dati tipizzati
✅ graph_data.json contiene ≥ 40 nodi e ≥ 60 edge
✅ Ogni sezione ha coordinate camera definite
✅ tsc --noEmit passa senza errori
```

---

## Fase 2 — Componenti HTML Statici (Astro Layer)

**Obiettivo:** Tutte e 4 le sezioni HTML funzionanti, stilate in brutalist-tech, scroll-ready. Nessun JavaScript.

**Deliverable:** Sito navigabile con tutti i contenuti, senza 3D.

### Task

#### Hero.astro
- [ ] Layout: nome in display font massivo (clamp 48px–120px), ruolo sottostante
- [ ] Bio: 2-3 righe in monospazio, allineamento asimmetrico
- [ ] Effetto: testo che "emerge" con stagger animation CSS (`@keyframes`)
- [ ] Scroll indicator minimale (chevron o linea animata)

#### Projects.astro
- [ ] Card layout: griglia asimmetrica (non uniforme), max 3 colonne desktop
- [ ] Ogni card: titolo bold, descrizione concisa, tech tags, link GitHub
- [ ] Hover state: shift violento (translate + scale), bordo accent
- [ ] Dati letti da `config.ts`

#### Experience.astro
- [ ] Timeline verticale con indicatori temporali a sinistra
- [ ] Ogni entry: ruolo, azienda, periodo, breve descrizione
- [ ] Layout: testo oversize per il ruolo, company name in muted
- [ ] Responsive: stack verticale su mobile, side-by-side su desktop

#### Contacts.astro
- [ ] Skill summary in tag/badge layout, raggruppati per categoria
- [ ] Link buttons: GitHub, LinkedIn, Download CV
- [ ] Footer minimal: copyright, "built with Astro + R3F"
- [ ] CTA prominente per il CV download (bottone accent full-width mobile)

#### index.astro
- [ ] Assembla tutti i componenti in sequenza
- [ ] Ogni sezione ha `id` semantico e `data-section` attribute (per GSAP)
- [ ] Sezioni con `min-height: 100vh` e padding generoso
- [ ] Background trasparente (preparazione per il canvas 3D sotto)

### Criteri di Accettazione

```
✅ Tutte le sezioni leggibili e complete
✅ Responsive: mobile (375px), tablet (768px), desktop (1440px)
✅ Contrasto WCAG AA su tutti i testi
✅ Zero JavaScript caricato (verificare in DevTools Network)
✅ Lighthouse Performance ≥ 98
✅ Tutti gli elementi interattivi hanno ID univoci
```

---

## Fase 3 — 3D Knowledge Graph Engine (React Island)

**Obiettivo:** Canvas R3F funzionante con grafo 3D renderizzato, camera statica (nessuna animazione scroll ancora).

**Deliverable:** Background 3D visibile sotto le sezioni HTML.

### Task

#### KnowledgeGraph.jsx (Container)
- [ ] `<Canvas>` R3F con background trasparente, antialiasing, pixel ratio capped a 2
- [ ] Caricamento `graph_data.json` e parsing posizioni
- [ ] State management per `activeSection` e `mousePosition`
- [ ] `useFrame` loop con camera interpolation stub
- [ ] `prefers-reduced-motion` detection → skip animazioni

#### GraphNodes.jsx (InstancedMesh)
- [ ] `InstancedMesh` con geometria `SphereGeometry` (segments ridotti per perf)
- [ ] Colore per-istanza via `instanceColor` attribute
- [ ] Dimensione per-istanza via matrix transform
- [ ] Categorie mappate a colori dal design token
- [ ] Opacità/scala modulata in base alla distanza dalla camera target

#### GraphEdges.jsx (Segments)
- [ ] `<Segments>` da `@react-three/drei` per rendering batch degli edge
- [ ] Colore edge: low-opacity `--graph-edge`
- [ ] Line width: sottilissimo (0.5–1px equivalent)
- [ ] Edge visibility: fade con la distanza (coerente con i nodi)

#### CameraController.jsx
- [ ] `useFrame` hook che interpola `camera.position` verso target
- [ ] Lerp factor configurabile (0.02–0.05 per smoothness)
- [ ] Damping della `lookAt` per evitare scatti
- [ ] Camera iniziale posizionata sulla vista "Hero"

#### Integrazione in index.astro
- [ ] Canvas posizionato `fixed inset-0 z-0`
- [ ] Sezioni HTML con `relative z-10` e background semi-trasparente
- [ ] `client:only="react"` per evitare SSR del canvas
- [ ] `aria-hidden="true"` sul container canvas

### Criteri di Accettazione

```
✅ Grafo 3D visibile e renderizzato correttamente
✅ FPS ≥ 55 su hardware medio (MacBook Air M1 baseline)
✅ Draw calls ≤ 5 (verificare con Spector.js o R3F perf monitor)
✅ Nessun errore console WebGL
✅ Canvas trasparente, sezioni HTML leggibili sopra
✅ Mobile: graceful degradation (nodi ridotti o canvas nascosto)
```

---

## Fase 4 — Interattività & Animazioni Scroll

**Obiettivo:** GSAP ScrollTrigger connesso al React Island. Camera fly-through funzionante. Mouse gravity attiva.

**Deliverable:** Esperienza scroll completa con transizioni camera fluide e interazione mouse.

### Task

#### GSAP Setup (Astro layer)
- [ ] Inizializzare GSAP + ScrollTrigger nel `<script>` di `index.astro`
- [ ] Creare ScrollTrigger per ogni `[data-section]`
- [ ] Su `onEnter` / `onEnterBack`: dispatchare `CustomEvent('section-change')`
- [ ] Payload evento: `{ sectionId: string }`

#### Camera Fly-Through (React)
- [ ] `CameraController` ascolta `section-change` via `useEffect` + `addEventListener`
- [ ] Aggiorna `targetPosition` e `targetLookAt` da `config.ts`
- [ ] `useFrame` interpola con lerp + damping
- [ ] Transizioni smooth tra sezioni (duration effettiva ~1.5s)

#### Cursor Gravity (React)
- [ ] Track `mousemove` normalizzato (-1, 1) nel `Canvas`
- [ ] In `useFrame`: per ogni nodo nel raggio di soglia, applicare vettore di attrazione/repulsione
- [ ] Effetto sottile: max displacement ~0.3 unità, falloff quadratico
- [ ] `prefers-reduced-motion`: gravità disattivata

#### Semantic Focal Reveal
- [ ] In `useFrame`: calcolare distanza di ogni nodo dal cluster della sezione attiva
- [ ] Nodi attivi: opacità 1, scala 1
- [ ] Nodi inattivi: opacità → 0.1, scala → 0.3, transizione smooth
- [ ] Effetto "spotlighting" semantico che guida l'attenzione

### Criteri di Accettazione

```
✅ Scrollare attiva transizioni camera fluide tra 4 sezioni
✅ Mouse hover crea effetto gravitazionale sui nodi vicini
✅ Nodi della sezione attiva evidenziati, altri attenuati
✅ Nessun jank visibile durante le transizioni (< 16ms frame time)
✅ CustomEvent bridge funziona senza race condition
✅ prefers-reduced-motion: animazioni disattivate/ridotte
```

---

## Fase 5 — Polish, Performance & Deploy

**Obiettivo:** Sito production-ready, ottimizzato, accessibile, deployato su Vercel.

**Deliverable:** URL pubblica funzionante con Lighthouse ≥ 95 su tutte le metriche.

### Task

#### Performance
- [ ] Audit Lighthouse completo e fix issue
- [ ] Bundle analysis: verificare tree-shaking Three.js (goal: < 200KB gzip per il JS 3D)
- [ ] Font: verificare subset e preload
- [ ] Image optimization (se presenti): WebP/AVIF, lazy loading
- [ ] CSS: verificare Tailwind purge, nessuna classe inutilizzata

#### Accessibilità
- [ ] Screen reader testing (VoiceOver/NVDA)
- [ ] Keyboard navigation completa
- [ ] Focus styles visibili e consistenti
- [ ] `aria-label` su tutti i link/button
- [ ] Contrast ratio verification su tutte le combinazioni colore

#### SEO
- [ ] Meta tags completi: title, description, OG tags
- [ ] Structured data: `Person` schema JSON-LD
- [ ] `sitemap.xml` generato da Astro
- [ ] `robots.txt`
- [ ] Canonical URL

#### Cross-Browser
- [ ] Test: Chrome, Firefox, Safari, Edge
- [ ] Test: iOS Safari, Chrome Android
- [ ] WebGL fallback per browser senza supporto

#### Deployment
- [ ] Setup progetto su Vercel
- [ ] Configurare dominio custom (se disponibile)
- [ ] Verificare deploy preview funzionante
- [ ] Verificare headers di sicurezza (CSP, HSTS)

### Criteri di Accettazione

```
✅ Lighthouse: Performance ≥ 95, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95
✅ FCP < 1.2s, LCP < 2.0s, CLS < 0.05
✅ Bundle JS totale < 250KB gzip
✅ Nessun errore in console su nessun browser target
✅ Link CV download funzionante
✅ OG preview corretta quando condiviso su social
✅ Vercel deploy live e funzionante
```

---

## Timeline Stimata

| Fase | Durata Stimata | Dipendenze |
|------|----------------|------------|
| **Fase 0** — Scaffold | 1-2 ore | Nessuna |
| **Fase 1** — Config & Dati | 1-2 ore | Fase 0 |
| **Fase 2** — HTML Statico | 3-4 ore | Fase 1 |
| **Fase 3** — 3D Engine | 4-5 ore | Fase 1 |
| **Fase 4** — Interattività | 3-4 ore | Fase 2 + Fase 3 |
| **Fase 5** — Polish & Deploy | 2-3 ore | Fase 4 |

> **Totale stimato: 14-20 ore di lavoro effettivo**
>
> Le Fasi 2 e 3 possono procedere in parallelo poiché sono indipendenti (HTML e 3D).

---

## Rischi e Mitigazioni

| Rischio | Impatto | Mitigazione |
|---------|---------|-------------|
| Performance 3D su mobile basso | Alto | Fallback: canvas nascosto o nodi ridotti sotto 768px |
| Font troppo pesanti | Medio | Subset aggressivo, limit a 3 font file max |
| GSAP ↔ React race condition | Medio | Debounce CustomEvent, stato iniziale safe |
| WebGL non supportato | Basso | Fallback CSS gradient background |
| Three.js bundle bloat | Medio | Import selettivi, verificare tree-shaking |
| GSAP license | Basso | Versione free sufficiente per ScrollTrigger base |
