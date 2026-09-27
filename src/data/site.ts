// ─────────────────────────────────────────────────────────
// Site content — the single source of truth for every page.
// Copy here comes from the Modernist portfolio mockups.
// ─────────────────────────────────────────────────────────

export const personal = {
  name: "Carlo Bianchi",
  role: "AI Engineer",
  location: "Florence, Italy",
  statement: {
    lead: "I build retrieval systems that can",
    accent: "explain themselves.",
  },
  bio: "AI engineer with hands-on industry experience building GraphRAG systems, agentic LLM workflows, and LLM-based document extraction pipelines.",
  bioLong:
    "MSc in Data Science & AI (University of Florence, 2026). Research interests: explainable AI, automated fact-checking, and robustness of retrieval-augmented systems.",
  cvPath: "/Carlo-Bianchi-CV.pdf",
  email: "bianchicarlo2002@icloud.com",
  github: "https://github.com/vivri161803",
  linkedin: "https://www.linkedin.com/in/carlo-bianchi-b6016b390",
  repoCount: 24,
} as const;

export type Area = "Research" | "Engineering" | "Teaching";

export interface Project {
  title: string;
  area: Area;
  url: string;
  desc: string;
  stack: string[];
}

export const projects: Project[] = [
  {
    title: "ColdRAG",
    area: "Engineering",
    url: "https://github.com/vivri161803/ColdRAG",
    desc: "GraphRAG framework for knowledge-graph extraction and semantic matching under cold-start conditions, built for Dometrìa.",
    stack: ["Python", "PyTorch", "Neo4j", "LangChain"],
  },
  {
    title: "Medical Whisper",
    area: "Engineering",
    url: "https://github.com/vivri161803/Medical_Whisper",
    desc: "Fine-tuning pipeline for Whisper Large-v3 specialised in medical terminology transcription.",
    stack: ["PyTorch", "Hugging Face", "PEFT", "torchaudio"],
  },
  {
    title: "Computational Ontology",
    area: "Research",
    url: "https://github.com/vivri161803/OntologiaComputazionale",
    desc: "LLM pipeline that turns literary texts into knowledge graphs; R-GCN and TransE embeddings drive a book recommender.",
    stack: ["LLMs", "R-GCN", "TransE", "Optuna", "Flask"],
  },
  {
    title: "GraphLIME-RDF",
    area: "Research",
    url: "https://github.com/vivri161803/graphlime-rdf",
    desc: "Local explanations for graph neural network predictions on RDF knowledge graphs.",
    stack: ["Python", "GNNs", "XAI"],
  },
  {
    title: "Mouse Cortex Network",
    area: "Research",
    url: "https://mouse-cortex-network-analysis.vercel.app",
    desc: "Interactive analysis of the mouse visual cortex network: 194 neurons and 214 directed synaptic connections.",
    stack: ["R", "ERGM", "igraph", "ggplot"],
  },
  {
    title: "Python for Data Analysis",
    area: "Teaching",
    url: "https://vivri161803.github.io/PythonForDataAnanlysis/",
    desc: "Open, interactive textbook bridging core Python and practical data science workflows.",
    stack: ["Python", "pandas", "NumPy", "Altair"],
  },
  {
    title: "Hands-On ML, in Italian",
    area: "Teaching",
    url: "https://github.com/vivri161803/HandsOnMachineLearning",
    desc: "Italian implementation of Géron's Hands-On Machine Learning, chapter by chapter.",
    stack: ["Jupyter", "scikit-learn", "Keras"],
  },
];

export const areas: Array<"All" | Area> = ["All", "Research", "Engineering", "Teaching"];

/** The four-up fact strip under the poster headline. */
export const facts = [
  { label: "Now", value: "AI & Data Science Intern, Dometrìa" },
  { label: "Education", value: "MSc Data Science & AI, University of Florence, 2026" },
  { label: "Focus", value: "GraphRAG, agentic LLM workflows, document extraction" },
] as const;

/** The scrolling research band between the fact strip and the work grid. */
export const researchBand = [
  "Explainable AI",
  "Automated fact-checking",
  "Robustness of retrieval-augmented systems",
  "Knowledge graphs",
  "GraphRAG",
] as const;

export interface CvItem {
  date: string;
  role: string;
  org: string;
  desc: string;
}

export const cvSections: Array<{ title: string; items: CvItem[] }> = [
  {
    title: "Experience",
    items: [
      {
        date: "Present",
        role: "AI & Data Science Intern",
        org: "Dometrìa",
        desc: "GraphRAG matching system built on ColdRAG and DialKG. Rebuilt the internal conversational bot with event-driven LlamaIndex workflows, Pydantic validation and FAISS similarity search.",
      },
      {
        date: "Jan 2025 — Present",
        role: "Freelance Data Annotator",
        org: "Outlier AI",
        desc: "Quality and accuracy of annotations used to train AI models.",
      },
      {
        date: "Present",
        role: "Academic Tutor, Python",
        org: "Università degli Studi di Firenze",
        desc: "Mentoring Management Engineering students through practical Python exercises and problem-solving.",
      },
      {
        date: "Nov — Dec 2024",
        role: "Python Teacher",
        org: "Riverloop",
        desc: "Taught Python for data analysis, machine learning and deep learning; maintained the course repository.",
      },
    ],
  },
  {
    title: "Education",
    items: [
      {
        date: "2024 — 2026",
        role: "MSc Data Science & AI",
        org: "Università degli Studi di Firenze",
        desc: "Knowledge graph construction, GraphRAG architectures and explainable AI.",
      },
      {
        date: "2021 — 2024",
        role: "BSc Management Engineering",
        org: "Università degli Studi di Firenze",
        desc: "Final grade 100/110. Operations research and quantitative methods.",
      },
    ],
  },
];

export const skills = [
  { name: "Programming", list: "Python, Java, SQL, LaTeX, Bash" },
  { name: "Deep learning", list: "PyTorch, Keras, Hugging Face, LangChain, LangGraph, LlamaIndex" },
  { name: "Data & ML", list: "pandas, NumPy, scikit-learn, SciPy, matplotlib, seaborn" },
  { name: "NLP & knowledge", list: "LLMs, RAG, GraphRAG, knowledge graphs, Transformers" },
  { name: "Speech & vision", list: "ASR, Whisper, torchaudio, OCR, VLMs" },
  { name: "Tools", list: "Git, Docker, Linux, Jupyter, Neovim" },
];

/** Two-digit index used down the left edge of every list and grid. */
export const pad = (i: number) => String(i + 1).padStart(2, "0");
