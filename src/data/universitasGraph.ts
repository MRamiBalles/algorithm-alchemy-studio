export interface GraphNode {
    id: string;
    group: string;
    label: string;
    level: number;
    size?: number;
    color?: string;
    type?: 'bridge' | 'standard';
    role?: 'atom' | 'degree' | 'subject' | 'legendary';
    description?: string;
    route?: string; // Navigation target
    x?: number;
    y?: number;
    vx?: number;
    vy?: number;
    canonicalText?: string; // The single source of truth for this node
    bibliographyPath?: string; // Path to the bibliografia_annas_archive.md file
}

export interface GraphLink {
    source: string;
    target: string;
    type: string;
}

export const graphData = {
    meta: {
        version: "12.0 (The Neural Taxonomy)",
        description: "Unified Knowledge Graph: -3 (Atoms) to 4 (Apexes)"
    },
    nodes: [
        // ─── LEVEL -3: ATOMIC CONSTANTS ───
        { id: "ATOM_SEM", group: "ATOM", label: "LINGÜÍSTICA", level: -3, color: "#FFFFFF", size: 30, role: "atom", description: "El Verbo. La capacidad simbólica que permite expresar conocimiento." },
        { id: "ATOM_ALG", group: "ATOM", label: "ÁLGEBRA", level: -3, color: "#FFFFFF", size: 30, role: "atom", description: "El Número. La precisión cuantitativa que estructura el universo." },
        { id: "ATOM_CRI", group: "ATOM", label: "LÓGICA", level: -3, color: "#FFFFFF", size: 30, role: "atom", description: "La Razón. El mecanismo de deducción y validación." },
        { id: "ATOM_AIS", group: "ATOM", label: "AISTHESIS", level: -3, color: "#FF00DD", size: 30, role: "atom", description: "El Sentido. Percepción, soma y experiencia directa." },

        // ─── LEVEL -2: EPISTEMOLOGICAL SUBSTRATE (ZONE 0) ───
        { id: "Z0_MATH", group: "FOUNDATION", label: "MATEMÁTICAS", level: -2, color: "#4444FF", size: 25, role: "degree", description: "El lenguaje de las proporciones universales.", route: "/course/foundations/math_core.md" },
        { id: "Z0_PHYS", group: "FOUNDATION", label: "FÍSICA", level: -2, color: "#44FFFF", size: 25, role: "degree", description: "Las leyes del sustrato material.", route: "/course/foundations/physics_core.md" },
        { id: "Z0_PHIL", group: "FOUNDATION", label: "FILOSOFÍA", level: -2, color: "#FF44FF", size: 25, role: "degree", description: "La episteme fenomenológica.", route: "/course/foundations/philosophy_core.md" },

        // ─── LEVEL 1: ONTOLOGICAL PILLARS (ZONES 1-6) ───
        { id: "Z1_MATTER", group: "PILLAR", label: "MATERIA", level: 1, color: "#AAAAAA", route: "/course/pillars/physical_bio_pillars.md" },
        { id: "Z2_ENG", group: "PILLAR", label: "INGENIERÍA", level: 1, color: "#00FFCC", route: "/course/pillars/physical_bio_pillars.md" },
        { id: "Z3_LIFE", group: "PILLAR", label: "VIDA", level: 1, color: "#00CC00", route: "/course/pillars/physical_bio_pillars.md" },
        { id: "Z4_MIND", group: "PILLAR", label: "MENTE", level: 1, color: "#FF00DD", route: "/course/pillars/mind_society_culture.md" },
        { id: "Z5_SOCIETY", group: "PILLAR", label: "SOCIEDAD", level: 1, color: "#FF4400", route: "/course/pillars/mind_society_culture.md" },
        { id: "Z6_CULTURE", group: "PILLAR", label: "CULTURA", level: 1, color: "#FF8800", route: "/course/pillars/mind_society_culture.md" },

        // ─── LEVEL 1.5: CYBERNETIC NEXUS (ZONE 7) ───
        { id: "DEG_CS", group: "NEXUS", label: "INFORMÁTICA", level: 1.5, color: "#0088FF", role: "degree", route: "/track/intelligence/intro" },
        { id: "DEG_IDIA", group: "NEXUS", label: "ING. DATOS e IA", level: 1.5, color: "#8B5CF6", role: "degree", route: "/degree/ingenieria-datos-ia" },

        // ─── LEVEL 2: DEGREES (Samples) ───
        { id: "DEG_LAW", group: "DEGREE", label: "DERECHO", level: 2, color: "#FF4400", role: "degree", route: "/track/law/intro", description: "Jurisprudencia y ordenamiento civil." },
        { id: "DEG_HIST", group: "DEGREE", label: "HISTORIA", level: 2, color: "#FF8800", role: "degree", route: "/track/history/intro", description: "Relato y análisis temporal de la Societas." },
        { id: "DEG_ARTS", group: "DEGREE", label: "BELLAS ARTES", level: 2, color: "#FF0088", role: "degree", route: "/track/visual/intro", description: "Poiesis visual y plástica." },
        { id: "DEG_SPORT", group: "DEGREE", label: "CC. DEPORTE", level: 2, color: "#00FF88", role: "degree", route: "/track/sport/intro", description: "Ciencias de la propiocepción." },
        { id: "DEG_MED", group: "DEGREE", label: "MEDICINA", level: 2, color: "#00CC00", role: "degree", route: "/track/medicine/intro", description: "Biología aplicada a la salud." },
        { id: "DEG_CHEM", group: "DEGREE", label: "QUÍMICA", level: 2, color: "#AAAAAA", role: "degree", route: "/track/chemistry/intro", description: "La materia y sus transformaciones." },
        { id: "DEG_ARCH", group: "DEGREE", label: "ARQUITECTURA", level: 2, color: "#00FFCC", role: "degree", route: "/track/architecture/intro", description: "Ingeniería del hábitat humano." },
        { id: "DEG_BIO", group: "DEGREE", label: "BIOLOGÍA", level: 2, color: "#00CC00", role: "degree", route: "/track/biology/intro", description: "El estudio de la vida misma." },
        { id: "DEG_PSY", group: "DEGREE", label: "PSICOLOGÍA", level: 2, color: "#FF00DD", role: "degree", route: "/track/psychology/intro", description: "Estructuras de la mente." },
        { id: "DEG_SOC", group: "DEGREE", label: "SOCIOLOGÍA", level: 2, color: "#FF4400", role: "degree", route: "/track/sociology/intro", description: "Dinámicas de grupos humanos." },

        // ─── LEVEL 3: SUBJECTS (With Bibliographies) ───
        // Mathematical Foundations
        { id: "SUB_ALG", group: "SUBJECT", label: "Algoritmia", level: 3, role: "subject", route: "/subject/ucm/cs/algoritmia", canonicalText: "Introduction to Algorithms (Cormen)", bibliographyPath: "/content/official_docs/ucm/ingenieria_computadores/Diseño de Algoritmos/bibliografia_annas_archive.md" },
        { id: "SUB_LA", group: "SUBJECT", label: "Álgebra Lineal", level: 3, role: "subject", route: "/subject/ucm/ingenieria-datos-ia/algebra-lineal", canonicalText: "Introduction to Linear Algebra (Strang)", bibliographyPath: "/content/official_docs/ucm/ingenieria_computadores/Álgebra Lineal/bibliografia_annas_archive.md" },
        { id: "SUB_CALC", group: "SUBJECT", label: "Cálculo", level: 3, role: "subject", route: "/subject/ucm/ingenieria-datos-ia/calculo", canonicalText: "Calculus (Stewart)", bibliographyPath: "/content/official_docs/ucm/ingenieria_datos_ia/Cálculo/bibliografia_annas_archive.md" },
        { id: "SUB_DIS", group: "SUBJECT", label: "Matemática Discreta", level: 3, role: "subject", canonicalText: "Discrete Mathematics (Rosen)" },
        { id: "SUB_EST", group: "SUBJECT", label: "Estadística", level: 3, role: "subject", canonicalText: "Probability and Statistics (Devore)" },

        // Physics Foundations
        { id: "SUB_FIS1", group: "SUBJECT", label: "Fundamentos Físicos", level: 3, role: "subject", canonicalText: "Physics for Scientists & Engineers (Tipler)" },
        { id: "SUB_ELEC", group: "SUBJECT", label: "Electrónica y Electricidad", level: 3, color: "#44FFFF", role: "subject", bibliographyPath: "/content/official_docs/ucm/ingenieria_computadores/Electrónica/bibliografia_annas_archive.md" },

        // Philosophical / Social Foundations
        { id: "SUB_ETH", group: "SUBJECT", label: "Ética y Legislación", level: 3, color: "#FF44FF", role: "subject", bibliographyPath: "/content/official_docs/ucm/ingenieria_computadores/Ética, legislación y profesión/bibliografia_annas_archive.md" },
        { id: "SUB_EPI", group: "SUBJECT", label: "Epistemología", level: 3, color: "#FF44FF", role: "subject" },

        // Intelligence
        { id: "SUB_FIA", group: "SUBJECT", label: "Fund. Inteligencia Artificial", level: 3, role: "subject", route: "/subject/ucm/ingenieria-datos-ia/fundamentos-ia", canonicalText: "Artificial Intelligence: A Modern Approach (Russell & Norvig)", bibliographyPath: "/content/official_docs/ucm/ingenieria_datos_ia/Fundamentos de Inteligencia Artificial/bibliografia_annas_archive.md" },
        { id: "SUB_ML1", group: "SUBJECT", label: "Aprendizaje Automático I", level: 3, role: "subject", route: "/subject/ucm/ingenieria-datos-ia/aprendizaje-automatico-1", color: "#8B5CF6", canonicalText: "The Elements of Statistical Learning (Hastie)", bibliographyPath: "/content/official_docs/ucm/ingenieria_datos_ia/Aprendizaje Automático I/bibliografia_annas_archive.md" },

        // ─── LEVEL 4: APEXES ───
        { id: "APEX_MBHB", group: "LEGENDARY", label: "MBHB", level: 4, color: "#FF0000", size: 25, role: "legendary", route: "/subject/uhu/m-ing-inf/mbhb", description: "Metaheurísticas y Modelos Bioinspirados.", canonicalText: "Metaheuristics (Talbi)" },
        { id: "APEX_HIST", group: "LEGENDARY", label: "HISTORIA TOTAL", level: 4, color: "#FF8800", size: 25, role: "legendary", route: "/subject/ugr/historia/historia-total", description: "La síntesis de los tiempos.", canonicalText: "The Mediterranean (Braudel)" },
    ] as GraphNode[],

    links: [
        // ─── OUROBOROS (Atomic Triangle) ───
        { source: "ATOM_SEM", target: "ATOM_CRI", type: "Ouroboros" },
        { source: "ATOM_CRI", target: "ATOM_ALG", type: "Ouroboros" },
        { source: "ATOM_ALG", target: "ATOM_SEM", type: "Ouroboros" },
        { source: "ATOM_AIS", target: "ATOM_ALG", type: "Proportion" },

        // ─── ATOM → FOUNDATION ───
        { source: "ATOM_ALG", target: "Z0_MATH", type: "Foundation" },
        { source: "ATOM_CRI", target: "Z0_PHIL", type: "Episteme" },
        { source: "ATOM_AIS", target: "Z0_PHYS", type: "Reality" },

        // ─── FOUNDATION → PILLAR ───
        { source: "Z0_MATH", target: "Z2_ENG", type: "Prerequisite" },
        { source: "Z0_PHYS", target: "Z1_MATTER", type: "Prerequisite" },
        { source: "Z0_PHIL", target: "Z5_SOCIETY", type: "Prerequisite" },
        { source: "Z0_PHIL", target: "Z6_CULTURE", type: "Prerequisite" },
        { source: "Z0_MATH", target: "Z4_MIND", type: "Abstract" },

        // ─── PILLAR → NEXUS (CS) ───
        { source: "Z2_ENG", target: "DEG_CS", type: "Integration" },
        { source: "Z4_MIND", target: "DEG_IDIA", type: "NeuralIntegration" },

        // ─── SUBSTRATE TO CORE SUBJECTS ───
        { source: "Z0_MATH", target: "SUB_CALC", type: "Core" },
        { source: "Z0_MATH", target: "SUB_LA", type: "Core" },
        { source: "Z0_MATH", target: "SUB_DIS", type: "Core" },
        { source: "Z0_MATH", target: "SUB_EST", type: "Core" },
        { source: "Z0_PHYS", target: "SUB_FIS1", type: "Core" },
        { source: "Z0_PHYS", target: "SUB_ELEC", type: "Core" },
        { source: "Z0_PHIL", target: "SUB_ETH", type: "Core" },
        { source: "Z0_PHIL", target: "SUB_EPI", type: "Core" },

        // ─── CORE SUBJECTS TO DEGREES ───
        { source: "SUB_CALC", target: "DEG_CS", type: "Prerequisite" },
        { source: "SUB_LA", target: "DEG_CS", type: "Prerequisite" },
        { source: "SUB_DIS", target: "DEG_CS", type: "Prerequisite" },
        { source: "SUB_EST", target: "DEG_IDIA", type: "Prerequisite" },
        { source: "SUB_FIS1", target: "DEG_CS", type: "Prerequisite" },
        { source: "SUB_ELEC", target: "DEG_CS", type: "Prerequisite" },
        { source: "SUB_ETH", target: "DEG_LAW", type: "Prerequisite" },
        { source: "SUB_ETH", target: "DEG_CS", type: "Integration" },
        { source: "SUB_EPI", target: "DEG_PSY", type: "Prerequisite" },

        // ─── PILLAR → DEGREE ───
        { source: "Z1_MATTER", target: "DEG_CHEM", type: "Derivation" },
        { source: "Z2_ENG", target: "DEG_ARCH", type: "Derivation" },
        { source: "Z3_LIFE", target: "DEG_BIO", type: "Derivation" },
        { source: "Z3_LIFE", target: "DEG_MED", type: "Derivation" },
        { source: "Z4_MIND", target: "DEG_PSY", type: "Derivation" },
        { source: "Z5_SOCIETY", target: "DEG_SOC", type: "Derivation" },
        { source: "Z5_SOCIETY", target: "DEG_LAW", type: "Derivation" },
        { source: "Z6_CULTURE", target: "DEG_HIST", type: "Derivation" },
        { source: "Z6_CULTURE", target: "DEG_ARTS", type: "Derivation" },

        // ─── NEXUS → DEGREE ───
        { source: "DEG_CS", target: "DEG_LAW", type: "Bridge" },
        { source: "DEG_CS", target: "DEG_HIST", type: "Bridge" },

        // ─── DEGREE → SUBJECT ───
        { source: "DEG_CS", target: "SUB_ALG", type: "Core" },
        { source: "DEG_IDIA", target: "SUB_LA", type: "Foundation" },
        { source: "DEG_IDIA", target: "SUB_CALC", type: "Foundation" },
        { source: "DEG_IDIA", target: "SUB_FIA", type: "Core" },
        { source: "SUB_LA", target: "SUB_ML1", type: "Prerequisite" },
        { source: "SUB_FIA", target: "SUB_ML1", type: "Prerequisite" },

        // ─── SUBJECT → APEX ───
        { source: "SUB_ML1", target: "APEX_MBHB", type: "NeuralPath" },
        { source: "DEG_HIST", target: "APEX_HIST", type: "Synthesis" },
    ] as GraphLink[]
};
