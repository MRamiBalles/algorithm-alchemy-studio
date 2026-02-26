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
    historicalContext?: string; // Geopolitical or evolutionary genesis of the discipline
}

export interface GraphLink {
    source: string;
    target: string;
    type: string;
}

export const graphData = {
    meta: {
        version: "12.1 (The Purified Taxonomy)",
        description: "Unified Knowledge Graph: -3 (Atoms) to 4 (Apexes)"
    },
    nodes: [
        // ─── LÍMITES TEÓRICOS (-3) ───
        { id: "ATOM_SEM", group: "ATOM", label: "LINGÜÍSTICA", level: -3, color: "#FFFFFF", size: 30, role: "atom", description: "El Verbo. Capacidad simbólica de expresar conocimiento." },
        { id: "ATOM_ALG", group: "ATOM", label: "ÁLGEBRA", level: -3, color: "#FFFFFF", size: 30, role: "atom", description: "El Número. Precisión cuantitativa estructurante." },
        { id: "ATOM_CRI", group: "ATOM", label: "LÓGICA", level: -3, color: "#FFFFFF", size: 30, role: "atom", description: "La Razón. Mecanismo de deducción y validación." },
        { id: "ATOM_AIS", group: "ATOM", label: "AISTHESIS", level: -3, color: "#FF00DD", size: 30, role: "atom", description: "El Sentido. Percepción, soma y experiencia directa." },

        // ─── PILARES ONTOLÓGICOS (ZONAS 1-6) ───
        { id: "Z1_MATTER", group: "PILLAR", label: "MATERIA", level: 1, color: "#AAAAAA" },
        { id: "Z2_ENG", group: "PILLAR", label: "INGENIERÍA", level: 1, color: "#00FFCC" },
        { id: "Z3_LIFE", group: "PILLAR", label: "VIDA", level: 1, color: "#00CC00" },
        { id: "Z4_MIND", group: "PILLAR", label: "MENTE", level: 1, color: "#FF00DD" },
        { id: "Z5_SOCIETY", group: "PILLAR", label: "SOCIEDAD", level: 1, color: "#FF4400" },
        { id: "Z6_CULTURE", group: "PILLAR", label: "CULTURA", level: 1, color: "#FF8800" },

        // ─── NEXUS DEGREE ALCHEMY CYBERNETICS ───
        { id: "DEG_CS", group: "NEXUS", label: "INFORMÁTICA", level: 1.5, color: "#0088FF", role: "degree" },
        { id: "DEG_IDIA", group: "NEXUS", label: "ING. DATOS e IA", level: 1.5, color: "#8B5CF6", role: "degree" },

        // ─── ZONA 0: FUNDAMENTOS / THE SUBSTRATE ───
        { id: "SUB_CALC", group: "SUBJECT", label: "Cálculo", level: 3, role: "subject", color: "#4444FF", route: "/content/courses/z0_math/calculus_master.md", canonicalText: "Calculus (Stewart)", historicalContext: "Originado por el tenso conflicto entre Newton y Leibniz en el siglo XVII para dominar el movimiento y la geometría continua." },
        { id: "SUB_LA", group: "SUBJECT", label: "Álgebra Lineal", level: 3, role: "subject", color: "#4444FF", route: "/content/courses/z0_math/algebra_lineal_master.md", canonicalText: "Introduction to Linear Algebra (Strang)", historicalContext: "Concebida en abstracto y resucitada por la Física Cuántica (Heisenberg) en 1925 como lenguaje de probabilidades. Base del Deep Learning." },
        { id: "SUB_DIS", group: "SUBJECT", label: "Matemática Discreta", level: 3, role: "subject", color: "#4444FF", route: "/content/courses/z0_math/matematica_discreta_master.md", canonicalText: "Discrete Mathematics (Rosen)", historicalContext: "De los puentes de Königsberg de Euler (1736) al Álgebra de Boole (1854); materializada electrónicamente por Shannon en el MIT (1938)." },
        { id: "SUB_EST", group: "SUBJECT", label: "Estadística", level: 3, role: "subject", color: "#4444FF", route: "/content/courses/z0_math/estadistica_master.md", canonicalText: "Probability and Statistics (Devore)", historicalContext: "Nacida de la inferencia Bayesiana vs Frecuentista; es el motor probabilístico estocástico detrás de la Inteligencia Artificial moderna." },
        { id: "SUB_FIS1", group: "SUBJECT", label: "Física y Electrónica", level: 3, role: "subject", color: "#44FFFF", route: "/content/courses/z0_math/fisica_master.md", canonicalText: "Physics for Scientists and Engineers (Tipler)", historicalContext: "De la termodinámica imperial a la unificación electromagnética de Maxwell, culminando en la invención del Transistor (Bell Labs)." },
        { id: "SUB_EPI", group: "SUBJECT", label: "Epistemología", level: 3, role: "subject", color: "#FF44FF", route: "/content/courses/z0_phil/epistemologia_master.md", canonicalText: "The Logic of Scientific Discovery (Popper)", historicalContext: "De la inducción ciega de Bacon al Falsacionismo radical de Karl Popper; los límites del conocimiento verdadero." },
        { id: "SUB_ETH", group: "SUBJECT", label: "Ética Tecnológica", level: 3, role: "subject", color: "#FF44FF", route: "/content/courses/z0_phil/etica_tecnologica_master.md", canonicalText: "Superintelligence (Bostrom)", historicalContext: "El problema insalvable del Value Alignment y el riesgo existencial frente al utilitarismo algorítmico agnóstico." },

        // ─── ZONA 2: INGENIERÍA Y SISTEMAS ───
        { id: "SUB_AC", group: "SUBJECT", label: "Arq. Computadores", level: 3, color: "#00FFCC", role: "subject", route: "/content/courses/z2_eng/arquitectura_computadores_master.md", canonicalText: "Computer Organization and Design (Patterson/Hennessy)" },
        { id: "SUB_SO", group: "SUBJECT", label: "Sistemas Operativos", level: 3, color: "#00FFCC", role: "subject", route: "/content/courses/z2_eng/sistemas_operativos_master.md", canonicalText: "Operating System Concepts (Silberschatz)" },
        { id: "SUB_RED", group: "SUBJECT", label: "Redes", level: 3, color: "#00FFCC", role: "subject", route: "/content/courses/z2_eng/redes_computadores_master.md", canonicalText: "Computer Networking (Kurose/Ross)" },

        // ─── ZONAS 3-6: LOS PILARES ───
        { id: "SUB_BIO", group: "SUBJECT", label: "Biología Fundamental", level: 3, color: "#00CC00", role: "subject", route: "/content/courses/z3_life/biologia_fundamental_master.md", canonicalText: "Campbell Biology" },
        { id: "SUB_PSY", group: "SUBJECT", label: "Psicología Cognitiva", level: 3, color: "#FF00DD", role: "subject", route: "/content/courses/z4_mind/fundamentos_psicologia_master.md", canonicalText: "Cognitive Psychology (Eysenck/Keane)" },
        { id: "SUB_LAW_ECON", group: "SUBJECT", label: "Macroeconomía y Derecho", level: 3, color: "#FF4400", role: "subject", route: "/content/courses/z5_society/macroeconomia_derecho_master.md", canonicalText: "Macroeconomics (Mankiw)" },
        { id: "SUB_HIST", group: "SUBJECT", label: "Historia Geopolítica Total", level: 3, color: "#FF8800", role: "subject", route: "/content/courses/z6_culture/historia_politica_master.md", canonicalText: "Civilization & Capitalism (Braudel)" },

        // ─── ZONA 7: NEXUS Y ALGORITMOS ───
        { id: "SUB_ALG", group: "SUBJECT", label: "Algoritmia", level: 3, color: "#0088FF", role: "subject", route: "/content/courses/z7_nexus/algoritmia_master.md", canonicalText: "Introduction to Algorithms (Cormen)" },
        { id: "SUB_BD", group: "SUBJECT", label: "Bases de Datos", level: 3, color: "#0088FF", role: "subject", route: "/content/courses/z7_nexus/bases_datos_master.md", canonicalText: "Database System Concepts (Silberschatz)" },
        { id: "SUB_IS", group: "SUBJECT", label: "Ingeniería Software", level: 3, color: "#0088FF", role: "subject", route: "/content/courses/z7_nexus/ingenieria_software_master.md", canonicalText: "The Mythical Man-Month (Brooks)" },
        { id: "SUB_FIA", group: "SUBJECT", label: "Fundamentos IA", level: 3, color: "#8B5CF6", role: "subject", route: "/content/courses/z7_nexus/fundamentos_ia_master.md", canonicalText: "Artificial Intelligence: A Modern Approach (Russell)" },
        { id: "SUB_ML1", group: "SUBJECT", label: "Machine Learning I", level: 3, color: "#8B5CF6", role: "subject", route: "/content/courses/z7_nexus/ml1_master.md", canonicalText: "The Elements of Statistical Learning (Hastie)" },

        // ─── EXTENSIONES UHU ───
        { id: "SUB_MAC", group: "SUBJECT", label: "Modelos Avz. Computación", level: 3, color: "#0088FF", role: "subject", route: "/content/courses/z7_nexus/modelos_avanzados_computacion_master.md" },
        { id: "SUB_AO", group: "SUBJECT", label: "Animación por Ordenador", level: 3, color: "#FF0088", role: "subject", route: "/content/courses/z7_nexus/animacion_ordenador_master.md" },
        { id: "SUB_RV", group: "SUBJECT", label: "Realidad Virtual", level: 3, color: "#FF0088", role: "subject", route: "/content/courses/z7_nexus/realidad_virtual_master.md" },
        { id: "SUB_PJ", group: "SUBJECT", label: "Programación de Juegos", level: 3.5, color: "#FF0000", role: "subject", route: "/content/courses/z7_nexus/programacion_juegos_master.md" },

        // ─── ZONA OMEGA: NODO APEX ───
        { id: "APEX_MBHB", group: "LEGENDARY", label: "MBHB", level: 4, color: "#FF0000", size: 25, role: "legendary", route: "/content/courses/apex/mbhb_master.md", description: "Metaheurísticas y Modelos Bioinspirados. Adaptación extrema." },
    ] as GraphNode[],

    links: [
        // Ouroboros Base
        { source: "ATOM_SEM", target: "ATOM_CRI", type: "Ouroboros" },
        { source: "ATOM_CRI", target: "ATOM_ALG", type: "Ouroboros" },
        { source: "ATOM_ALG", target: "ATOM_SEM", type: "Ouroboros" },
        { source: "ATOM_AIS", target: "ATOM_ALG", type: "Proportion" },

        // Z0 Conexiones
        { source: "SUB_CALC", target: "SUB_FIS1", type: "Prerequisite" },
        { source: "SUB_LA", target: "SUB_FIS1", type: "Prerequisite" },
        { source: "SUB_DIS", target: "SUB_ALG", type: "Prerequisite" },
        { source: "SUB_LA", target: "SUB_ML1", type: "Integration" },
        { source: "SUB_EST", target: "SUB_ML1", type: "Integration" },
        { source: "SUB_EPI", target: "SUB_FIA", type: "Cross" },
        { source: "SUB_ETH", target: "SUB_IS", type: "Regulator" },

        // Z2 Conexiones
        { source: "SUB_FIS1", target: "SUB_AC", type: "Core" },
        { source: "SUB_AC", target: "SUB_SO", type: "Prerequisite" },
        { source: "SUB_SO", target: "SUB_RED", type: "Prerequisite" },

        // Pilares
        { source: "SUB_FIS1", target: "SUB_BIO", type: "Thermodynamics" },
        { source: "SUB_EPI", target: "SUB_PSY", type: "Philosophy" },
        { source: "SUB_BIO", target: "SUB_PSY", type: "Evolution" },
        { source: "SUB_PSY", target: "SUB_LAW_ECON", type: "Behavior" },
        { source: "SUB_LAW_ECON", target: "SUB_HIST", type: "Dynamics" },

        // Nexus Z7
        { source: "SUB_ALG", target: "SUB_BD", type: "Core" },
        { source: "SUB_FIA", target: "SUB_ML1", type: "Evolution" },
        { source: "SUB_IS", target: "SUB_BD", type: "Architecture" },

        // Extensiones
        { source: "SUB_LA", target: "SUB_RV", type: "Prerequisite" },
        { source: "SUB_LA", target: "SUB_AO", type: "Prerequisite" },
        { source: "SUB_AC", target: "SUB_AO", type: "Performance" },
        { source: "SUB_RV", target: "SUB_PJ", type: "Engine" },
        { source: "SUB_AO", target: "SUB_PJ", type: "Engine" },
        { source: "SUB_DIS", target: "SUB_MAC", type: "Theory" },
        { source: "SUB_ALG", target: "SUB_MAC", type: "Theory" },

        // Apex Connection
        { source: "SUB_ML1", target: "APEX_MBHB", type: "NeuralPath" },
        { source: "SUB_BIO", target: "APEX_MBHB", type: "NeuralPath" },
        { source: "SUB_MAC", target: "APEX_MBHB", type: "NeuralPath" },
    ] as GraphLink[]
};
