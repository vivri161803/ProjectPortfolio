# Tech Stack

## Panoramica Architetturale

```
┌─────────────────────────────────────────────────────────────┐
│                        VERCEL CDN                           │
│                    (Edge Network / SSG)                      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                   ASTRO 5.x (SSG)                     │   │
│  │                                                       │   │
│  │  ┌─────────────┐  ┌──────────────┐  ┌─────────────┐  │   │
│  │  │ Hero.astro  │  │Projects.astro│  │ Experience  │  │   │
│  │  │             │  │              │  │   .astro    │  │   │
│  │  └─────────────┘  └──────────────┘  └─────────────┘  │   │
│  │                                                       │   │
│  │  ┌─────────────┐                                      │   │
│  │  │Contacts     │   ← HTML statico, zero JS            │   │
│  │  │  .astro     │                                      │   │
│  │  └─────────────┘                                      │   │
│  │                                                       │   │
│  │  ┌────────────────────────────────────────────────┐   │   │
│  │  │          REACT ISLAND (client:only="react")     │   │   │
│  │  │                                                 │   │   │
│  │  │  ┌─────────────────────────────────────────┐    │   │   │
│  │  │  │      REACT THREE FIBER (R3F)            │    │   │   │
│  │  │  │                                         │    │   │   │
│  │  │  │  KnowledgeGraph.jsx                     │    │   │   │
│  │  │  │  ├── InstancedMesh (nodes)              │    │   │   │
│  │  │  │  ├── Segments (edges, @react-three/drei)│    │   │   │
│  │  │  │  ├── useFrame (camera lerp + gravity)   │    │   │   │
│  │  │  │  └── Distance fog / opacity system      │    │   │   │
│  │  │  └─────────────────────────────────────────┘    │   │   │
│  │  └────────────────────────────────────────────────┘   │   │
│  │                                                       │   │
│  │  GSAP ScrollTrigger ← Custom Events → React Island    │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Stack Dettagliato

### Framework & Build

| Tecnologia       | Versione | Ruolo                                          | Motivazione                                                |
|------------------|----------|------------------------------------------------|------------------------------------------------------------|
| **Astro**        | ^5.x     | Meta-framework, SSG                            | Zero-JS default, island architecture, perf-first           |
| **React**        | ^19.x    | UI library per island interattiva              | Ecosistema R3F, concurrent rendering                       |
| **TypeScript**   | ^5.x     | Type safety su tutto il codebase               | Configurazione centralizzata type-safe                     |
| **Vite**         | Integrato con Astro | Dev server + bundler                 | HMR istantaneo, tree-shaking nativo                        |

### 3D Rendering Pipeline

| Tecnologia               | Ruolo                                      | Motivazione                                         |
|---------------------------|--------------------------------------------|-----------------------------------------------------|
| **Three.js**              | Engine 3D sottostante                      | Standard de facto per WebGL                         |
| **React Three Fiber**     | React renderer per Three.js                | Dichiarativo, composable, ecosistema hooks          |
| **@react-three/drei**     | Utility R3F (Segments, effects, helpers)   | Segments per edge batching, utility camera           |
| **@react-three/fiber**    | Core R3F                                   | useFrame, Canvas, scene graph management             |

### Animazione & Scroll

| Tecnologia           | Ruolo                                    | Motivazione                                          |
|----------------------|------------------------------------------|------------------------------------------------------|
| **GSAP**             | Animazione scroll-linked                 | ScrollTrigger best-in-class, performance 60fps       |
| **GSAP ScrollTrigger** | Mapping scroll → sezione attiva        | Pin, scrub, callback-based section detection         |

> ⚠️ GSAP vive nel layer Astro (vanilla JS). Comunica con il React Island tramite **Custom Events** (`window.dispatchEvent`), mai tramite import diretto. Questo mantiene il boundary Astro/React pulito.

### Styling

| Tecnologia       | Ruolo                                     | Motivazione                                          |
|------------------|-------------------------------------------|------------------------------------------------------|
| **Tailwind CSS** | ^4.x | Utility-first CSS framework                 | Rapid prototyping, purge aggressivo, design tokens via `@theme` |

> Le design tokens definite in `mission.md` saranno mappate nella configurazione Tailwind come custom colors e extended theme values.

### Deployment & Hosting

| Servizio     | Ruolo                        | Motivazione                                 |
|--------------|------------------------------|---------------------------------------------|
| **Vercel**   | Hosting + CI/CD              | Edge CDN, preview deploys, integrazione Git |
| **GitHub**   | Source control + CI trigger  | Standard, Actions available                  |

---

## Struttura File del Progetto

```
Portfolio/
├── public/
│   ├── fonts/                    # Font file auto-hosted (subset WOFF2)
│   ├── cv.pdf                    # CV scaricabile
│   └── favicon.svg               # Favicon SVG
│
├── src/
│   ├── components/
│   │   ├── Hero.astro            # Sezione 1: presentazione
│   │   ├── Projects.astro        # Sezione 2: progetti & research
│   │   ├── Experience.astro      # Sezione 3: timeline esperienze
│   │   ├── Contacts.astro        # Sezione 4: contatti & download CV
│   │   └── react/
│   │       ├── KnowledgeGraph.jsx    # 3D Knowledge Graph engine
│   │       ├── GraphNodes.jsx        # InstancedMesh node rendering
│   │       ├── GraphEdges.jsx        # Segments edge rendering
│   │       └── CameraController.jsx  # useFrame camera lerp logic
│   │
│   ├── layouts/
│   │   └── BaseLayout.astro      # Layout principale, meta tags, font loading
│   │
│   ├── pages/
│   │   └── index.astro           # Entry point, assembla tutto
│   │
│   ├── styles/
│   │   └── global.css            # Tailwind directives + custom utilities
│   │
│   ├── data/
│   │   └── graph_data.json       # Nodi e edge pre-calcolati per il grafo 3D
│   │
│   ├── config.ts                 # Configurazione centralizzata
│   └── env.d.ts                  # Type declarations Astro
│
├── astro.config.mjs              # Config Astro + integrazioni
├── tailwind.config.mjs           # Config Tailwind + design tokens
├── tsconfig.json                 # TypeScript config
├── package.json                  # Dependencies
└── specs/
    ├── mission.md                # ← questo documento
    ├── tech-stack.md             # ← SEI QUI
    └── roadmap.md                # Piano di implementazione
```

---

## Dipendenze NPM

### Produzione

```json
{
  "astro": "^5.x",
  "@astrojs/react": "^4.x",
  "@astrojs/tailwind": "^6.x",
  "react": "^19.x",
  "react-dom": "^19.x",
  "@react-three/fiber": "^9.x",
  "@react-three/drei": "^10.x",
  "three": "^0.170.x",
  "gsap": "^3.12.x",
  "tailwindcss": "^4.x"
}
```

### Sviluppo

```json
{
  "typescript": "^5.x",
  "@types/react": "^19.x",
  "@types/react-dom": "^19.x",
  "@types/three": "^0.170.x",
  "@astrojs/check": "^0.x"
}
```

---

## Decisioni Architetturali Chiave

### 1. Island Architecture — Perché

Il React 3D canvas è l'**unico** JavaScript client-side dell'intero sito. Le sezioni HTML (Hero, Projects, Experience, Contacts) sono generate come **HTML statico puro** da Astro. Questo garantisce:
- **TTFB < 100ms** — nessun framework JS da scaricare per il contenuto principale
- **Interazione immediata** — il testo è leggibile prima che il canvas 3D sia pronto
- **SEO perfetto** — tutto il contenuto è nel DOM statico

### 2. GSAP ↔ React — Bridge Pattern

```
GSAP (vanilla JS, Astro layer)
    │
    ├── ScrollTrigger rileva la sezione attiva
    ├── Dispatcha CustomEvent('section-change', { detail: 'projects' })
    │
React Island (R3F)
    │
    ├── useEffect ascolta 'section-change'
    ├── Aggiorna lo state interno (activeSectionId)
    └── useFrame interpola camera.position verso config[activeSectionId].camera
```

Questo pattern evita:
- Import circolari Astro → React
- Dipendenze runtime tra i due runtime
- Problemi di hydration (il React island è `client:only`, mai hydrated)

### 3. InstancedMesh + Segments — Perché

| Approccio              | Draw Calls (100 nodi, 200 edge) | FPS Target |
|------------------------|---------------------------------|------------|
| Mesh individuali       | ~300                            | ❌ < 30fps |
| **InstancedMesh + Segments** | **2**                     | ✅ 60fps   |
| Points (sprite-based)  | ~1                              | ⚠️ Limited styling |

La scelta di `InstancedMesh` per i nodi e `Segments` (drei) per gli edge è l'unica che garantisce sia performance sia controllo visivo (colore/scala per-istanza).

### 4. Font Strategy — Self-Hosted Subset

I font saranno:
1. **Subset** con `glyphhanger` o `fonttools` per includere solo i glifi necessari (latin + basic punctuation)
2. **Convertiti in WOFF2** per compressione massima
3. **Preloaded** nel `<head>` con `<link rel="preload" as="font">`
4. **Font-display: swap** per evitare FOIT

Stima peso totale: **< 60KB** per tutti i font combinati.

### 5. Accessibilità 3D

Il canvas R3F è `aria-hidden="true"` e puramente decorativo. Tutto il contenuto informativo è nel layer HTML statico. Questo semplifica enormemente l'a11y:
- Screen reader vedono solo l'HTML semantico
- Keyboard navigation funziona sul layer Astro
- `prefers-reduced-motion` disabilita/attenua il lerping camera e la gravità cursor nel `useFrame`
