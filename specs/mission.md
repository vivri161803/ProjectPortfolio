# Mission

## Progetto
**Portfolio / CV Personale — Carlo Bianchi**
AI Engineer & Researcher · Data Science Master's Student @ University of Florence

---

## Obiettivo Strategico

Costruire un artefatto digitale che funzioni come **biglietto da visita definitivo** per tre audience distinte e simultanee:

| Audience            | Cosa deve ottenere                                                         |
|---------------------|----------------------------------------------------------------------------|
| **Recruiters / HR** | Conversione immediata → colloquio. CV scaricabile, skill chiare, UX rapida |
| **Ricercatori**     | Credibilità tecnica → collaborazioni. Progetti con depth, link a paper     |
| **Clienti / Aziende** | Fiducia → contratto. Dimostrare padronanza end-to-end di stack AI        |

Il sito **non è una brochure statica**. È un **sistema dimostrativo** delle competenze di Carlo: performance engineering, architettura moderna, rendering 3D in tempo reale e design d'autore usando le informazioni presenti in [CV_Aggiornato.pdf](CV_Aggiornato.pdf)

---

## Filosofia di Design

### Direzione Estetica: **Brutalist-Tech**

L'identità visiva del portfolio si posiziona nel quadrante **brutalist-tech**: layout grezzi e asimmetrici, blocchi tipografici dominanti, contrasti violenti, nessuna decorazione superflua. Il background 3D (Knowledge Graph) è l'unica concessione alla complessità visuale — e funziona come contrappunto organico alla brutalità dell'interfaccia 2D.

#### Principi Guida

1. **Raw over polished** — Nessun border-radius morbido, nessun gradiente pastel. Bordi netti, angoli vivi, ombre dure o assenti.
2. **Typography-first** — La tipografia È il design. Display font massivi, gerarchie estreme (16px body → 120px+ heading), interlinea aggressiva.
3. **High-contrast dark mode** — Background `#0A0A0A` o più scuro, testo `#F0F0F0` o bianco puro, un singolo colore d'accento vibrante (candidato: `#00FF41` — verde terminale, o `#FF3B30` — rosso d'errore brutale).
4. **Negative space as material** — Lo spazio vuoto non è "vuoto": è tensione. Grandi margini asimmetrici, composizioni off-grid deliberate.
5. **Motion with purpose** — Animazioni solo dove aggiungono informazione (scroll-reveal, state transitions). Mai decorative. `prefers-reduced-motion` rispettato rigorosamente.
6. **Grid-breaking elements** — Testo che esce dai confini del container. Overlap deliberati tra sezioni. Elementi che sfidano la griglia per creare tensione visiva.

#### Tipografia Selezionata

| Ruolo           | Font Candidato                    | Caratteristica                                       |
|-----------------|-----------------------------------|------------------------------------------------------|
| **Display**     | **Instrument Serif** o **Playfair Display** | Serifato drammatico, contrasto altissimo tra spessi e sottili |
| **Body/UI**     | **JetBrains Mono**                | Monospazio tecnico, richiamo terminale               |
| **Accenti**     | **Anybody** o **Syne**            | Variabile, geometrico, peso estremo per labels       |

> ⚠️ La scelta finale delle font sarà validata nella fase di prototipazione visiva. L'obiettivo è evitare qualsiasi convergenza verso font abusate (Inter, Roboto, Space Grotesk).

#### Palette Colori (Design Tokens)

```
--bg-primary:       #070707      /* Nero quasi assoluto */
--bg-secondary:     #111111      /* Superficie rialzata */
--bg-tertiary:      #1A1A1A      /* Cards, hover states */
--text-primary:     #EDEDED      /* Testo principale */
--text-secondary:   #888888      /* Testo secondario, muted */
--text-muted:       #444444      /* Labels, metadata */
--accent-primary:   #00FF41      /* Verde terminale — CTA, nodi attivi */
--accent-danger:    #FF3B30      /* Rosso — alert, contrasto violento */
--accent-info:      #00D4FF      /* Ciano — link, hover states */
--border-hard:      #333333      /* Bordi visibili, separatori */
--graph-node:       #00FF41      /* Nodi del Knowledge Graph */
--graph-edge:       #1A3A1A      /* Edge a bassa opacità */
--graph-glow:       rgba(0, 255, 65, 0.15)  /* Glow sui nodi attivi */
```

---

## Contenuto Emozionale

Il sito deve trasmettere in 3 secondi:

> *"Questa persona costruisce sistemi intelligenti con rigore ingegneristico e gusto per l'essenziale."*

Non è un portfolio "carino". È una **macchina** che comunica competenza, precisione e visione.

---

## Principi Non Negoziabili

1. **Performance > Tutto** — Lighthouse score ≥ 95 su tutte le metriche. SSG first.
2. **Accessibilità** — WCAG 2.1 AA minimo. `prefers-reduced-motion`, contrast ratio, keyboard navigation.
3. **Mobile-first** — Il 3D si degrada gracefully su mobile (fallback statico o ridotto).
4. **Nessun placeholder** — Ogni elemento visibile è reale, funzionale, significativo.
5. **Configurazione centralizzata** — Un singolo `config.ts` governa tutti i contenuti e parametri visivi.
