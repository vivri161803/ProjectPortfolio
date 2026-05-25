// ═══════════════════════════════════════════════════════════
// CENTRAL CONFIGURATION — Single source of truth
// All content, design tokens, and 3D parameters live here.
// ═══════════════════════════════════════════════════════════

// ─── Personal Info ───────────────────────────────────────
export const personal = {
  name: "Carlo Bianchi",
  role: "AI Engineer & Researcher",
  subtitle: "Master's Student in Data Science & AI @ University of Florence",
  bio: "Research-oriented engineer with a solid background in Management Engineering. Focused on Explainable AI, Automated Fact-Checking, Knowledge Graphs, and LLM architectures. I combine analytical and problem-solving abilities, honed through diverse work experiences from data annotation to teaching.",
  cvPath: "/CV_Aggiornato.pdf",
  email: "bianchicarlo2002@icloud.com",
  languages: ["Italian (Native)", "English (Professional)"],
} as const;

// ─── Social Links ────────────────────────────────────────
export const socials = [
  { label: "GitHub", url: "https://github.com/vivri161803", icon: "github" },
  { label: "LinkedIn", url: "https://www.linkedin.com/in/carlo-bianchi-b6016b390", icon: "linkedin" },
] as const;

// ─── Projects ────────────────────────────────────────────
export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  github: string;
  category: "research" | "engineering" | "collaboration" | "teaching";
}

export const projects: Project[] = [
  {
    id: "coldrag",
    title: "ColdRAG",
    description:
      "A research framework for Knowledge Graph extraction and semantic matching. Implements graph-based retrieval augmented generation with cold-start optimization for domain-specific corpora.",
    tech: ["Python", "PyTorch", "Neo4j", "LangChain", "GraphRAG"],
    github: "https://github.com/vivri161803/ColdRAG",
    category: "engineering",
  },
  {
    id: "whisper-medical",
    title: "Whisper Medical",
    description:
      "Fine-tuning pipeline for Whisper Large-v3 specializing in medical terminology transcription. Achieves domain-specific WER improvements through curriculum learning on clinical audio datasets.",
    tech: ["Python", "PyTorch", "Whisper", "HuggingFace", "PEFT", "torchaudio"],
    github: "https://github.com/vivri161803/Medical_Whisper",
    category: "collaboration",
  },
  {
    id: "ontohology",
    title: "Computational Ontohology",
    description:
      "An AI pipeline transforming literary texts into structured Knowledge Graphs (KG) using LLMs with entity resolution. It leverages Graph Neural Networks (R-GCN and TransE) optimized via Optuna to learn narrative space embeddings, powering a Cosine Similarity-based recommendation engine. Features a Flask web application with dynamic OpenLibrary API metadata integration.",
    tech: ["Knowledge Graphs", "LLM", "R-GCN", "TransE", "Optuna"],
    github: "https://github.com/vivri161803/OntologiaComputazionale",
    category: "research",
  },
  {
    id: "PythonForDataAnanlysis",
    title: "Book: Python For DataAnanlysis",
    description:
      "An open-source, interactive digital textbook and codebase designed to bridge the gap between core Python programming and practical data science engineering. Built using a literate programming approach with Jupyter Notebooks, the project synthesizes foundational methodologies from industry-standard texts (like Wes McKinney's Python for Data Analysis) into structured, production-ready workflows.",
    tech: ["Python", "Pandas", "NumPy", "Vega Altair"],
    github: "https://vivri161803.github.io/PythonForDataAnanlysis/",
    category: "teaching",
  },
  {
    id: "mouse",
    title: "Mouse Cortex Network Analysis",
    description:
      "An interactive web application and computational framework designed to analyze the biological network structure of the mouse visual cortex (comprising 194 neurons and 214 directed synaptic connections). The platform models the system's structural constraints, connectivity patterns, and underlying 3D architectural properties.",
    tech: ["R", "ergm", "letentnet", "igraph", "ggplot"],
    github: "https://mouse-cortex-network-analysis.vercel.app",
    category: "research",
  }
];

// ─── Experience ──────────────────────────────────────────
export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  current?: boolean;
}

export const experiences: Experience[] = [
  {
    id: "exp-unifi-master",
    role: "Master's Student — Data Science & AI",
    company: "Università degli Studi di Firenze",
    period: "Sep 2024 — Jul 2026",
    description:
      "Master's degree program in Data Science and Artificial Intelligence. Research on Knowledge Graph construction, GraphRAG architectures, and Explainable AI.",
    current: true,
  },
  {
    id: "exp-dometria",
    role: "AI & Data Science Intern",
    company: "Dometrìa",
    period: "Present",
    description:
      "Engineered a specialized GraphRAG matching system leveraging ColdRAG and DialKG frameworks. Modernized internal conversational bot with event-driven LlamaIndex workflows, Pydantic validation, and FAISS similarity search.",
    current: true,
  },
  {
    id: "exp-outlier",
    role: "Freelance Data Annotator",
    company: "Outlier AI",
    period: "Jan 2025 — Present",
    description:
      "Ensuring quality and accuracy of annotations for AI models. Applying rigorous data annotation methodologies with high attention to detail.",
    current: true,
  },
  {
    id: "exp-tutor",
    role: "Academic Tutor — Python Programming",
    company: "Università degli Studi di Firenze",
    period: "Present",
    description:
      "Academic mentoring for Management Engineering students. Facilitating practical exercises, clarifying complex technical concepts, and teaching problem-solving methodologies with Python.",
    current: true,
  },
  {
    id: "exp-riverloop",
    role: "Python Teacher",
    company: "Riverloop",
    period: "Nov 2024 — Dec 2024",
    description:
      "Taught Python for Data Analysis, Machine Learning, and Deep Learning. Developed and maintained a GitHub repository with structured curriculum, code examples, notebooks, and practical exercises.",
  },
  {
    id: "exp-unifi-bachelor",
    role: "Bachelor's in Management Engineering",
    company: "Università degli Studi di Firenze",
    period: "2021 — 2024",
    description:
      "Bachelor's degree in Management Engineering. Final grade: 100/110. Strong foundation in analytical reasoning, operations research, and quantitative methods.",
  },
];

// ─── Skills ──────────────────────────────────────────────
export interface SkillGroup {
  category: string;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    category: "Programming",
    skills: ["Python (Advanced)", "Java", "SQL", "LaTeX", "Bash"],
  },
  {
    category: "Deep Learning & AI",
    skills: ["PyTorch", "Keras", "HuggingFace", "LangChain", "LangGraph", "LlamaIndex"],
  },
  {
    category: "Data Analysis & ML",
    skills: ["pandas", "NumPy", "matplotlib", "seaborn", "scikit-learn", "SciPy"],
  },
  {
    category: "NLP & Knowledge",
    skills: ["LLMs", "RAG", "GraphRAG", "Knowledge Graphs", "Transformers", "Prompt Engineering"],
  },
  {
    category: "Speech & Vision",
    skills: ["ASR", "OpenAI Whisper", "torchaudio", "Computer Vision", "OCR", "VLM"],
  },
  {
    category: "Tools & DevOps",
    skills: ["Git/GitHub", "Docker", "Linux", "Jupyter", "NeoVim", "VS Code"],
  },
];

// ─── Education ───────────────────────────────────────────
export const education = [
  {
    degree: "Master's in Data Science & AI",
    institution: "Università degli Studi di Firenze",
    period: "Sep 2024 — Jul 2026",
    current: true,
  },
  {
    degree: "Bachelor's in Management Engineering",
    institution: "Università degli Studi di Firenze",
    period: "2021 — 2024",
    grade: "100/110",
  },
  {
    degree: "Liceo Classico Galileo",
    institution: "High School Diploma",
    period: "2016 — 2021",
    grade: "95/100",
  },
] as const;

// ─── Volunteering ────────────────────────────────────────
export const volunteering = {
  role: "Volunteer — First Aid & DAE Certified",
  organization: "Misericordia di Prato",
  description: "First aid, teamwork, and crisis communication. DAE and First Aid certified.",
} as const;

// ─── Design Tokens (for JS-side access) ─────────────────
// NEON VIOLET PALETTE
export const colors = {
  bgPrimary: "#080811",
  bgSecondary: "#0F0F1A",
  bgTertiary: "#181828",
  textPrimary: "#EDECF5",
  textSecondary: "#8888AA",
  textMuted: "#44445A",
  accentPrimary: "#B24BF3",       // Neon violet — main accent
  accentSecondary: "#7C3AED",     // Deep violet
  accentTertiary: "#E040FB",      // Magenta-pink neon
  accentInfo: "#00E5FF",          // Neon cyan complement
  accentWarm: "#FF6BF3",          // Hot pink
  borderHard: "#2A2A40",
  graphNode: "#B24BF3",
  graphEdge: "#2A1A4A",
  graphGlow: "rgba(178, 75, 243, 0.2)",
} as const;

// ─── 3D Camera Coordinates per Section ───────────────────
export interface CameraState {
  position: [number, number, number];
  lookAt: [number, number, number];
  fov: number;
}

export const cameraStates: Record<string, CameraState> = {
  hero: {
    position: [0, 2, 18],
    lookAt: [0, 0, 0],
    fov: 55,
  },
  projects: {
    position: [8, 1, 12],
    lookAt: [6, 0, 0],
    fov: 50,
  },
  experience: {
    position: [-6, 3, 14],
    lookAt: [-4, 0, 0],
    fov: 50,
  },
  contacts: {
    position: [0, -2, 20],
    lookAt: [0, 0, 0],
    fov: 60,
  },
};

// ─── Graph Category Colors (neon violet palette) ─────────
export const categoryColors: Record<string, string> = {
  "AI/ML": "#B24BF3",       // Neon violet
  Systems: "#00E5FF",        // Neon cyan
  Research: "#E040FB",       // Magenta pink
  Data: "#FFB347",           // Warm amber
  DevOps: "#7C3AED",        // Deep violet
};

// ─── Project Category Colors (matching neon palette) ─────
export const projectCategoryColors: Record<string, string> = {
  research: "#B24BF3",      // Neon violet (accentPrimary)
  engineering: "#00E5FF",   // Neon cyan (accentInfo)
  collaboration: "#E040FB", // Magenta pink (accentTertiary)
  teaching: "#FF6BF3",      // Hot pink (accentWarm)
};

// ─── 3D Rendering Config ─────────────────────────────────
export const graphConfig = {
  // Camera — exponential damping speed (lower = slower, silkier)
  cameraDamping: 0.4,
  // Cursor interaction
  mouseGravityRadius: 5,
  mouseGravityStrength: 0.12,
  focalFadeDistance: 8,
  // Node rendering
  nodeBaseScale: 1.2,
  nodeLerpSpeed: 3.5,    // exponential damping for node scale transitions
  edgeOpacity: 0.15,
  pixelRatio: 2,
  // Node glow / pulse — slow, breathing rhythm
  pulseSpeed: 0.35,
  pulseAmplitude: 0.08,
  // Organic floating motion — very gentle
  floatSpeed: 0.25,
  floatAmplitude: 0.08,
  // Floating particles
  particleCount: 80,
  particleDrift: 0.0015,
} as const;
