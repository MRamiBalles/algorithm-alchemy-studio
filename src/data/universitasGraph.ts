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
}

export interface GraphLink {
    source: string;
    target: string;
    type: string;
}

export const graphData = {
    meta: {
        version: "11.0 (The Neural Path)",
        description: "Unified Knowledge Graph: 4 Atoms -> Degrees -> Subjects -> MBHB"
    },
    nodes: [
        // ─── LEVEL -2: ATOMIC TETRAHEDRON ───
        { id: "ATOM_SEM", group: "ATOM", label: "LINGÜÍSTICA", level: -2, color: "#FFFFFF", size: 30, role: "atom", description: "El Verbo. La capacidad simbólica que permite expresar conocimiento." },
        { id: "ATOM_ALG", group: "ATOM", label: "ÁLGEBRA", level: -2, color: "#FFFFFF", size: 30, role: "atom", description: "El Número. La precisión cuantitativa que estructura el universo." },
        { id: "ATOM_CRI", group: "ATOM", label: "LÓGICA", level: -2, color: "#FFFFFF", size: 30, role: "atom", description: "La Razón. El mecanismo de deducción y validación." },
        { id: "ATOM_AIS", group: "ATOM", label: "AISTHESIS", level: -2, color: "#FF00DD", size: 30, role: "atom", description: "El Sentido. Percepción, soma y experiencia directa." },

        // ─── LEVEL 1: DEGREES ───
        { id: "DEG_LAW", group: "DEGREE", label: "DERECHO", level: 1, color: "#FF4400", role: "degree", route: "/track/law/intro" },
        { id: "DEG_HIST", group: "DEGREE", label: "HISTORIA", level: 1, color: "#FF8800", role: "degree", route: "/track/history/intro" },
        { id: "DEG_CS", group: "DEGREE", label: "INFORMÁTICA", level: 1, color: "#0088FF", role: "degree", route: "/track/intelligence/intro" },
        { id: "DEG_PHYS", group: "DEGREE", label: "FÍSICA", level: 1, color: "#00FFCC", role: "degree", route: "/track/physics/intro" },
        { id: "DEG_ARTS", group: "DEGREE", label: "BELLAS ARTES", level: 1, color: "#FF0088", role: "degree", route: "/track/visual/intro" },
        { id: "DEG_SPORT", group: "DEGREE", label: "CC. DEPORTE", level: 1, color: "#00FF88", role: "degree", route: "/track/sport/intro" },
        { id: "DEG_MED", group: "DEGREE", label: "MEDICINA", level: 1, color: "#00CC00", role: "degree", route: "/track/medicine/intro" },
        { id: "DEG_IDIA", group: "DEGREE", label: "ING. DATOS e IA", level: 1, color: "#8B5CF6", role: "degree", route: "/degree/ingenieria-datos-ia" },

        // ─── LEVEL 2: SUBJECTS (Samples) ───
        { id: "SUB_DRAW", group: "SUBJECT", label: "Dibujo I", level: 2, role: "subject" },
        { id: "SUB_DIG", group: "SUBJECT", label: "Creación Digital", level: 2, role: "subject" },
        { id: "SUB_CIVIL", group: "SUBJECT", label: "Derecho Civil", level: 2, role: "subject" },
        { id: "SUB_ANC", group: "SUBJECT", label: "Historia Antigua", level: 2, role: "subject" },
        { id: "SUB_ALG", group: "SUBJECT", label: "Algoritmia", level: 2, role: "subject", route: "/subject/ucm/cs/algoritmia", canonicalText: "Introduction to Algorithms (Cormen, Leiserson, Rivest, Stein)" },
        { id: "SUB_ANAT", group: "SUBJECT", label: "Anatomía Humana", level: 2, role: "subject" },
        { id: "SUB_FISIO", group: "SUBJECT", label: "Fisiología", level: 2, role: "subject" },

        // ─── IA/ML CHAIN (The Neural Path) ───
        { id: "SUB_FIA", group: "SUBJECT", label: "Fund. Inteligencia Artificial", level: 2, role: "subject", route: "/subject/ucm/ingenieria-datos-ia/fundamentos-ia", description: "Russell & Norvig. La puerta de entrada a IA.", canonicalText: "Artificial Intelligence: A Modern Approach (Russell & Norvig)" },
        { id: "SUB_ML1", group: "SUBJECT", label: "Aprendizaje Automático I", level: 2, role: "subject", route: "/subject/ucm/ingenieria-datos-ia/aprendizaje-automatico-1", color: "#8B5CF6", description: "Hastie/Tibshirani. Statistical Learning.", canonicalText: "The Elements of Statistical Learning (Hastie, Tibshirani, Friedman)" },
        { id: "SUB_ML2", group: "SUBJECT", label: "Aprendizaje Automático II", level: 2, role: "subject", route: "/subject/ucm/ingenieria-datos-ia/aprendizaje-automatico-2", color: "#8B5CF6", description: "Advanced ML: Feature Engineering, Ensemble Methods.", canonicalText: "Pattern Recognition and Machine Learning (Bishop)" },
        { id: "SUB_DL", group: "SUBJECT", label: "Redes Neuronales", level: 2, role: "subject", route: "/subject/ucm/ingenieria-datos-ia/deep-learning", color: "#8B5CF6", description: "Deep Learning. El puente neural hacia MBHB.", canonicalText: "Deep Learning (Goodfellow, Bengio, Courville)" },

        // ─── LEVEL 3: LEGENDARY ───
        { id: "APEX_MBHB", group: "LEGENDARY", label: "MBHB", level: 3, color: "#FF0000", size: 20, role: "legendary", route: "/subject/uhu/m-ing-inf/mbhb", description: "Metaheurísticas y Modelos Bioinspirados. La síntesis de optimización, computación evolutiva y heurísticas de búsqueda.", canonicalText: "Metaheuristics: From Design to Implementation (El-Ghazali Talbi)" },
    ] as GraphNode[],

    links: [
        // ─── OUROBOROS (Atomic Triangle) ───
        { source: "ATOM_SEM", target: "ATOM_CRI", type: "Ouroboros" },
        { source: "ATOM_CRI", target: "ATOM_ALG", type: "Ouroboros" },
        { source: "ATOM_ALG", target: "ATOM_SEM", type: "Ouroboros" },
        { source: "ATOM_AIS", target: "ATOM_ALG", type: "Proportion" },

        // ─── ATOM → DEGREE ───
        { source: "ATOM_SEM", target: "DEG_LAW", type: "Normative" },
        { source: "ATOM_SEM", target: "DEG_HIST", type: "Narrative" },
        { source: "ATOM_ALG", target: "DEG_CS", type: "Computation" },
        { source: "ATOM_ALG", target: "DEG_PHYS", type: "Calculus" },
        { source: "ATOM_ALG", target: "DEG_IDIA", type: "DataScience" },
        { source: "ATOM_AIS", target: "DEG_ARTS", type: "Perception" },
        { source: "ATOM_AIS", target: "DEG_SPORT", type: "Proprioception" },
        { source: "DEG_MED", target: "ATOM_AIS", type: "Somatic" },
        { source: "DEG_MED", target: "DEG_SPORT", type: "Bio-Link" },

        // ─── DEGREE → SUBJECT ───
        { source: "DEG_ARTS", target: "SUB_DRAW", type: "Praxis" },
        { source: "DEG_ARTS", target: "SUB_DIG", type: "Techne" },
        { source: "DEG_LAW", target: "SUB_CIVIL", type: "Norm" },
        { source: "DEG_HIST", target: "SUB_ANC", type: "Era" },
        { source: "DEG_CS", target: "SUB_ALG", type: "Core" },
        { source: "DEG_MED", target: "SUB_ANAT", type: "Core" },
        { source: "DEG_SPORT", target: "SUB_FISIO", type: "Core" },

        // ─── THE NEURAL PATH (IA → ML → DL → MBHB) ───
        { source: "DEG_IDIA", target: "SUB_FIA", type: "Core" },
        { source: "SUB_FIA", target: "SUB_ML1", type: "Prerequisite" },
        { source: "SUB_ML1", target: "SUB_ML2", type: "Prerequisite" },
        { source: "SUB_ML2", target: "SUB_DL", type: "Specialization" },
        { source: "SUB_DL", target: "APEX_MBHB", type: "NeuralPath" },

        // ─── SIBLING (CS ↔ Data Science) ───
        { source: "DEG_CS", target: "DEG_IDIA", type: "Sibling" },

        // ─── SOMATIC PATH → MBHB ───
        { source: "DEG_SPORT", target: "APEX_MBHB", type: "Apex" },
        { source: "SUB_FISIO", target: "APEX_MBHB", type: "Prerequisite" },
        { source: "SUB_ANAT", target: "APEX_MBHB", type: "Prerequisite" },
    ] as GraphLink[]
};
