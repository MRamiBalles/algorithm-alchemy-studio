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
        version: "15.0 (Capa 0 — 6 Átomos Irreducibles)",
        description: "Unified Knowledge Graph: -4 (Epistemology) to 4 (Apexes)"
    },
    nodes: [
        // ─── CAPA Z-4: EPISTEMOLOGÍA PURA (Marco A) ───
        { id: "EP_TRUTH", group: "EPISTEM", label: "VERDAD", level: -4, color: "#FFD700", size: 26, description: "Manifiesto Fundacional: Autocrítica epistemológica del sistema. Las reglas, los compromisos y los límites del Grafo.", route: "/content/courses/epistem/autocritica_epistemologica.md" },
        { id: "EP_LOGIC", group: "EPISTEM", label: "LÓGICA FORMAL", level: -4, color: "#FFD700", size: 22, description: "Sistemas axiomáticos, deducción y paradojas del lenguaje formal.", route: "/content/courses/epistem/logica_formal_master.md" },
        { id: "EP_METHOD", group: "EPISTEM", label: "MÉTODO", level: -4, color: "#FFD700", size: 22, description: "Filosofía de la Ciencia: Observación, Falsacionismo, Verosimilitud.", route: "/content/courses/epistem/filosofia_ciencia_master.md" },
        { id: "EP_PRAXIS", group: "EPISTEM", label: "PRAXIS", level: -4, color: "#FFD700", size: 22, description: "Pragmática y Ética del Discurso: Consenso, Falacias, Acción.", route: "/content/courses/epistem/pragmatica_etica_master.md" },

        // ─── CAPA Z-3.5: COGNITIVA (prerrequisitos biológicos) ───
        { id: "ATOM_AIS", group: "COGNITIVE", label: "AISTHESIS", level: -3.5, color: "#FF00DD", size: 26, role: "atom", description: "El Sentido. Percepción, soma y experiencia directa. Prerrequisito biológico de todo conocimiento.", route: "/content/courses/atoms/aisthesis_master.md" },

        // ─── CAPA Z-3: ÁTOMOS IRREDUCIBLES (Capa 0 del conocimiento) ───
        { id: "ATOM_LOG", group: "ATOM", label: "LÓGICA", level: -3, color: "#FFFFFF", size: 30, role: "atom", description: "La Razón. Deducción, inducción, abducción y validación. El mecanismo que separa lo verdadero de lo falso.", route: "/content/courses/atoms/capa0_logica_master.md" },
        { id: "ATOM_LANG", group: "ATOM", label: "LENGUAJE", level: -3, color: "#FFFFFF", size: 30, role: "atom", description: "El Verbo. Sintaxis, semántica, pragmática y argumentación. La primera tecnología de la especie.", route: "/content/courses/atoms/capa0_lenguaje_master.md" },
        { id: "ATOM_ARIT", group: "ATOM", label: "ARITMÉTICA", level: -3, color: "#FFFFFF", size: 30, role: "atom", description: "El Número. Conteo, operaciones, orden y proporción. La cuantificación irreducible.", route: "/content/courses/atoms/capa0_aritmetica_master.md" },
        { id: "ATOM_GEO", group: "ATOM", label: "GEOMETRÍA", level: -3, color: "#FFFFFF", size: 30, role: "atom", description: "El Espacio. Forma, distancia, simetría y transformación. La intuición espacial formalizada.", route: "/content/courses/atoms/capa0_geometria_master.md" },
        { id: "ATOM_CAUS", group: "ATOM", label: "CAUSALIDAD", level: -3, color: "#FFFFFF", size: 30, role: "atom", description: "El Porqué. Causa-efecto, correlación vs causalidad, contrafactuales. El motor de toda explicación.", route: "/content/courses/atoms/capa0_causalidad_master.md" },
        { id: "ATOM_ANAL", group: "ATOM", label: "ANALOGÍA", level: -3, color: "#FFFFFF", size: 30, role: "atom", description: "El Puente. Isomorfismo, metáfora y transferencia estructural entre dominios. El motor del descubrimiento.", route: "/content/courses/atoms/capa0_analogia_master.md" },

        // ─── CAPA Z-2.5: CONTENIDOS COMPUESTOS ELEMENTALES (Capa 1) ───
        { id: "C1_ALG", group: "CAPA1", label: "ÁLGEBRA", level: -2.5, color: "#66CCFF", size: 22, role: "atom", description: "Lógica + Aritmética → la variable, la ecuación, la estructura algebraica.", route: "/content/courses/atoms/capa1_algebra_master.md" },
        { id: "C1_FUNC", group: "CAPA1", label: "FUNCIONES", level: -2.5, color: "#66CCFF", size: 22, role: "atom", description: "Aritmética + Causalidad + Lógica → correspondencia, dominio, composición.", route: "/content/courses/atoms/capa1_funciones_master.md" },
        { id: "C1_COMB", group: "CAPA1", label: "COMBINATORIA", level: -2.5, color: "#66CCFF", size: 22, role: "atom", description: "Lógica + Aritmética → contar posibilidades sin enumerar.", route: "/content/courses/atoms/capa1_combinatoria_master.md" },
        { id: "C1_PROB", group: "CAPA1", label: "PROBABILIDAD", level: -2.5, color: "#66CCFF", size: 22, role: "atom", description: "Aritmética + Causalidad + Lógica → cuantificación de la incertidumbre.", route: "/content/courses/atoms/capa1_probabilidad_master.md" },
        { id: "C1_CONJ", group: "CAPA1", label: "CONJUNTOS/GRAFOS", level: -2.5, color: "#66CCFF", size: 22, role: "atom", description: "Lógica + Geometría → pertenencia, relación, conexión.", route: "/content/courses/atoms/capa1_conjuntos_grafos_master.md" },
        { id: "C1_TAX", group: "CAPA1", label: "TAXONOMÍA", level: -2.5, color: "#66CCFF", size: 22, role: "atom", description: "Lógica + Lenguaje + Analogía → clasificar, nombrar, jerarquizar.", route: "/content/courses/atoms/capa1_taxonomia_master.md" },
        { id: "C1_NAR", group: "CAPA1", label: "NARRATIVA", level: -2.5, color: "#66CCFF", size: 22, role: "atom", description: "Lenguaje + Causalidad + Analogía → secuencia, conflicto, resolución.", route: "/content/courses/atoms/capa1_narrativa_master.md" },
        { id: "C1_MED", group: "CAPA1", label: "MEDICIÓN", level: -2.5, color: "#66CCFF", size: 22, role: "atom", description: "Aritmética + Geometría + Causalidad → magnitud, unidad, escala, error.", route: "/content/courses/atoms/capa1_medicion_master.md" },
        { id: "C1_REC", group: "CAPA1", label: "RECURSIÓN", level: -2.5, color: "#66CCFF", size: 22, role: "atom", description: "Lógica + Aritmética → autorreferencia controlada, inducción matemática.", route: "/content/courses/atoms/capa1_recursion_master.md" },

        // ─── CAPA Z-2: EJES ONTOLÓGICOS (Marco B) ───
        { id: "AX_RADIAL", group: "AXIS", label: "C. RADIALES", level: -2, color: "#C0C0C0", size: 18, description: "Ciencias donde el sujeto desaparece del resultado: Física, Química, Matemáticas puras.", route: "/content/courses/axes/ejes_ontologicos_master.md" },
        { id: "AX_CIRCULAR", group: "AXIS", label: "C. CIRCULARES", level: -2, color: "#C0C0C0", size: 18, description: "Ciencias donde el sujeto es ineliminable: Historia, Psicología, Economía.", route: "/content/courses/axes/ejes_ontologicos_master.md" },
        { id: "AX_TECH", group: "AXIS", label: "TECNOLOGÍAS", level: -2, color: "#C0C0C0", size: 18, description: "Fabricar herramientas operativas, no descubrir verdades: Ingeniería, IA, Software.", route: "/content/courses/axes/ejes_ontologicos_master.md" },
        { id: "AX_PHIL", group: "AXIS", label: "FILOSOFÍA", level: -2, color: "#C0C0C0", size: 18, description: "Saber de segundo grado: interpreta las Ideas que desbordan a las ciencias.", route: "/content/courses/axes/ejes_ontologicos_master.md" },
        { id: "AX_LIT", group: "AXIS", label: "LITERATURA", level: -2, color: "#C0C0C0", size: 18, description: "Laboratorio racional de ficción: simulación de la experiencia humana.", route: "/content/courses/axes/literatura_ficcion_master.md" },

        // ─── PILARES ONTOLÓGICOS (ZONAS 1-6) ───
        { id: "Z1_MATTER", group: "PILLAR", label: "MATERIA", level: 1, color: "#AAAAAA" },
        { id: "Z2_ENG", group: "PILLAR", label: "INGENIERÍA", level: 1, color: "#00FFCC" },
        { id: "TEC_LING", group: "PILLAR", label: "TEC. LINGÜÍSTICA", level: 2, color: "#E8AA00", role: "subject", route: "/content/courses/z2_eng/tecnologia_linguistica_master.md", description: "Ingeniería del Verbo. Diseño y optimización de idiomas como herramientas operativas." },
        { id: "Z3_LIFE", group: "PILLAR", label: "VIDA", level: 1, color: "#00CC00", route: "/content/courses/z3_life/biologia_fundamental_master.md" },
        { id: "Z4_MIND", group: "PILLAR", label: "MENTE", level: 1, color: "#FF00DD", route: "/content/courses/z4_mind/fundamentos_psicologia_master.md" },
        { id: "Z5_SOCIETY", group: "PILLAR", label: "SOCIEDAD", level: 1, color: "#FF4400", route: "/content/courses/z5_society/macroeconomia_derecho_master.md" },
        { id: "Z6_CULTURE", group: "PILLAR", label: "CULTURA", level: 1, color: "#FF8800", route: "/content/courses/z6_culture/historia_politica_master.md" },

        // ─── NEXUS DEGREE ALCHEMY CYBERNETICS ───
        { id: "DEG_CS", group: "NEXUS", label: "INFORMÁTICA", level: 1.5, color: "#0088FF", role: "degree", route: "/content/courses/degrees/informatica_master.md" },
        { id: "DEG_IDIA", group: "NEXUS", label: "ING. DATOS e IA", level: 1.5, color: "#8B5CF6", role: "degree", route: "/content/courses/degrees/datos_ia_master.md" },

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
        // Cadena Epistemológica Z-4
        { source: "EP_TRUTH", target: "EP_LOGIC", type: "Epistem" },
        { source: "EP_LOGIC", target: "EP_METHOD", type: "Epistem" },
        { source: "EP_METHOD", target: "EP_PRAXIS", type: "Epistem" },

        // Z-4 → Cognitiva → Z-3 (Epistemología alimenta Aisthesis, Aisthesis alimenta Átomos)
        { source: "EP_TRUTH", target: "ATOM_LOG", type: "Foundation" },
        { source: "EP_LOGIC", target: "ATOM_ARIT", type: "Foundation" },
        { source: "EP_METHOD", target: "ATOM_CAUS", type: "Foundation" },
        { source: "EP_PRAXIS", target: "ATOM_LANG", type: "Foundation" },

        // Aisthesis (Capa -1 Cognitiva) → alimenta todos los átomos
        { source: "ATOM_AIS", target: "ATOM_LOG", type: "Cognitive" },
        { source: "ATOM_AIS", target: "ATOM_LANG", type: "Cognitive" },
        { source: "ATOM_AIS", target: "ATOM_ARIT", type: "Cognitive" },
        { source: "ATOM_AIS", target: "ATOM_GEO", type: "Cognitive" },
        { source: "ATOM_AIS", target: "ATOM_CAUS", type: "Cognitive" },
        { source: "ATOM_AIS", target: "ATOM_ANAL", type: "Cognitive" },

        // Z-2 ← Cursos (Ejes clasifican nodos existentes)
        { source: "AX_RADIAL", target: "SUB_CALC", type: "Classify" },
        { source: "AX_RADIAL", target: "SUB_FIS1", type: "Classify" },
        { source: "AX_RADIAL", target: "SUB_EST", type: "Classify" },
        { source: "AX_CIRCULAR", target: "SUB_BIO", type: "Classify" },
        { source: "AX_CIRCULAR", target: "SUB_PSY", type: "Classify" },
        { source: "AX_CIRCULAR", target: "SUB_LAW_ECON", type: "Classify" },
        { source: "AX_CIRCULAR", target: "SUB_HIST", type: "Classify" },
        { source: "AX_TECH", target: "SUB_AC", type: "Classify" },
        { source: "AX_TECH", target: "SUB_ALG", type: "Classify" },
        { source: "AX_TECH", target: "TEC_LING", type: "Classify" },
        { source: "AX_PHIL", target: "SUB_EPI", type: "Classify" },
        { source: "AX_PHIL", target: "SUB_ETH", type: "Classify" },

        // Capa 0 → Capa 1: Átomos generan contenidos compuestos
        { source: "ATOM_LOG", target: "C1_ALG", type: "Genesis" },
        { source: "ATOM_ARIT", target: "C1_ALG", type: "Genesis" },
        { source: "ATOM_ARIT", target: "C1_FUNC", type: "Genesis" },
        { source: "ATOM_CAUS", target: "C1_FUNC", type: "Genesis" },
        { source: "ATOM_LOG", target: "C1_FUNC", type: "Genesis" },
        { source: "ATOM_LOG", target: "C1_COMB", type: "Genesis" },
        { source: "ATOM_ARIT", target: "C1_COMB", type: "Genesis" },
        { source: "ATOM_ARIT", target: "C1_PROB", type: "Genesis" },
        { source: "ATOM_CAUS", target: "C1_PROB", type: "Genesis" },
        { source: "ATOM_LOG", target: "C1_PROB", type: "Genesis" },
        { source: "ATOM_LOG", target: "C1_CONJ", type: "Genesis" },
        { source: "ATOM_GEO", target: "C1_CONJ", type: "Genesis" },
        { source: "ATOM_LOG", target: "C1_TAX", type: "Genesis" },
        { source: "ATOM_LANG", target: "C1_TAX", type: "Genesis" },
        { source: "ATOM_ANAL", target: "C1_TAX", type: "Genesis" },
        { source: "ATOM_LANG", target: "C1_NAR", type: "Genesis" },
        { source: "ATOM_CAUS", target: "C1_NAR", type: "Genesis" },
        { source: "ATOM_ANAL", target: "C1_NAR", type: "Genesis" },
        { source: "ATOM_ARIT", target: "C1_MED", type: "Genesis" },
        { source: "ATOM_GEO", target: "C1_MED", type: "Genesis" },
        { source: "ATOM_CAUS", target: "C1_MED", type: "Genesis" },
        { source: "ATOM_LOG", target: "C1_REC", type: "Genesis" },
        { source: "ATOM_ARIT", target: "C1_REC", type: "Genesis" },

        // Capa 1 → Capa 1: Conexiones internas
        { source: "C1_COMB", target: "C1_PROB", type: "Foundation" },
        { source: "C1_ALG", target: "C1_FUNC", type: "Foundation" },
        { source: "C1_FUNC", target: "C1_REC", type: "Foundation" },
        { source: "C1_CONJ", target: "C1_TAX", type: "Foundation" },

        // Capa 1 → Asignaturas
        { source: "C1_ALG", target: "SUB_CALC", type: "Foundation" },
        { source: "C1_ALG", target: "SUB_LA", type: "Foundation" },
        { source: "C1_FUNC", target: "SUB_CALC", type: "Foundation" },
        { source: "C1_MED", target: "SUB_FIS1", type: "Foundation" },
        { source: "C1_MED", target: "SUB_EST", type: "Foundation" },
        { source: "C1_PROB", target: "SUB_EST", type: "Foundation" },
        { source: "C1_CONJ", target: "SUB_DIS", type: "Foundation" },
        { source: "C1_REC", target: "SUB_ALG", type: "Foundation" },
        { source: "C1_REC", target: "SUB_DIS", type: "Foundation" },
        { source: "C1_COMB", target: "SUB_DIS", type: "Foundation" },
        { source: "C1_TAX", target: "SUB_BIO", type: "Foundation" },
        { source: "C1_NAR", target: "SUB_HIST", type: "Foundation" },
        { source: "C1_NAR", target: "SUB_LAW_ECON", type: "Foundation" },
        { source: "C1_PROB", target: "SUB_ML1", type: "Foundation" },

        // Ouroboros Capa 0: Los 6 átomos se retroalimentan
        { source: "ATOM_LANG", target: "ATOM_LOG", type: "Ouroboros" },
        { source: "ATOM_LOG", target: "ATOM_ARIT", type: "Ouroboros" },
        { source: "ATOM_ARIT", target: "ATOM_GEO", type: "Ouroboros" },
        { source: "ATOM_GEO", target: "ATOM_LANG", type: "Ouroboros" },
        { source: "ATOM_CAUS", target: "ATOM_LOG", type: "Ouroboros" },
        { source: "ATOM_ANAL", target: "ATOM_CAUS", type: "Ouroboros" },
        { source: "ATOM_ANAL", target: "ATOM_LANG", type: "Ouroboros" },
        { source: "ATOM_ARIT", target: "ATOM_ANAL", type: "Proportion" },

        // Átomos → Asignaturas (dependencias directas)
        { source: "ATOM_ARIT", target: "SUB_CALC", type: "Foundation" },
        { source: "ATOM_ARIT", target: "SUB_LA", type: "Foundation" },
        { source: "ATOM_ARIT", target: "SUB_EST", type: "Foundation" },
        { source: "ATOM_GEO", target: "SUB_LA", type: "Foundation" },
        { source: "ATOM_GEO", target: "SUB_FIS1", type: "Foundation" },
        { source: "ATOM_LOG", target: "SUB_DIS", type: "Foundation" },
        { source: "ATOM_LOG", target: "SUB_EPI", type: "Foundation" },
        { source: "ATOM_CAUS", target: "SUB_FIS1", type: "Foundation" },
        { source: "ATOM_CAUS", target: "SUB_BIO", type: "Foundation" },
        { source: "ATOM_CAUS", target: "SUB_EST", type: "Foundation" },
        { source: "ATOM_ANAL", target: "SUB_FIA", type: "Foundation" },
        { source: "ATOM_ANAL", target: "SUB_PSY", type: "Foundation" },

        // Tecnología Lingüística
        { source: "ATOM_LANG", target: "TEC_LING", type: "Technology" },
        { source: "TEC_LING", target: "SUB_IS", type: "Formalization" },
        { source: "TEC_LING", target: "SUB_MAC", type: "Grammar" },

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

export interface LearningPath {
    id: string;
    name: string;
    subtitle: string;
    color: string;
    description: string;
    nodes: string[]; // Ordered sequence of node IDs
    acquisitions: string[]; // What the student gains at each hop
}

export const learningPaths: LearningPath[] = [
    {
        id: "PATH_VERB_IA",
        name: "Del Verbo a la Inteligencia Artificial",
        subtitle: "Cómo el lenguaje humano se formaliza hasta convertirse en IA",
        color: "#00AAFF",
        description: "Ruta epistemológica que traza el arco completo desde los límites de la certeza humana, pasando por la formalización lógica y tecnológica del lenguaje, hasta los modelos de aprendizaje automático y sus dilemas éticos.",
        nodes: ["SUB_EPI", "SUB_DIS", "TEC_LING", "SUB_FIA", "SUB_ML1", "SUB_ETH"],
        acquisitions: [
            "Límites de la Certeza: Comprender qué puede y qué no puede ser demostrado (Popper, Gödel). El filtro epistemológico que impide construir IA sin saber qué es 'verdad'.",
            "Lógica Formal y Grafos: Traducir el razonamiento a estructuras discretas operables por máquinas (Boole → Shannon → Autómatas).",
            "Ingeniería del Lenguaje: De las gramáticas de Chomsky a BNF, compiladores y embeddings vectoriales. El lenguaje como tecnología optimizable.",
            "Fundamentos de IA: Búsqueda, representación del conocimiento, planificación. La IA simbólica clásica (GOFAI) y sus límites.",
            "Machine Learning: Redes Neuronales, Gradient Descent, CNNs y Transformers. El salto estadístico que reemplazó las reglas manuales.",
            "Ética y Alineación: El Value Alignment Problem, las alucinaciones de los LLMs, y por qué la Epistemología del primer nodo vuelve a ser crítica al final."
        ]
    },
    {
        id: "PATH_MATTER_SILICON",
        name: "De la Materia al Silicio",
        subtitle: "Cómo la física construye computadoras",
        color: "#00FFCC",
        description: "Ruta ingenieril que muestra cómo las leyes de la física se solidifican en transistores, se abstraen en sistemas operativos, se interconectan en redes y persisten datos a escala planetaria.",
        nodes: ["ATOM_ARIT", "SUB_CALC", "SUB_FIS1", "SUB_AC", "SUB_SO", "SUB_RED", "SUB_BD"],
        acquisitions: [
            "El Número abstracto: La propiedad cuantitativa del universo antes de tocar materia.",
            "Cálculo Diferencial: Dominar el infinito continuo para describir el movimiento y la electricidad.",
            "Física y Electrónica: Del campo electromagnético al transistor MOSFET. El hardware del universo.",
            "Arquitectura de Computadores: Cómo los transistores se organizan en CPUs, caches y buses (Von Neumann, RISC-V).",
            "Sistemas Operativos: El software que gestiona el hardware: procesos, memoria virtual, scheduling.",
            "Redes de Computadores: TCP/IP, routing, DNS. La infraestructura planetaria de comunicación.",
            "Bases de Datos: Persistencia, SQL, índices B-Tree. El destino final del dato procesado."
        ]
    },
    {
        id: "PATH_CELL_CIVILIZATION",
        name: "De la Célula a la Civilización",
        subtitle: "Cómo la vida genera sociedades y éstas generan algoritmos",
        color: "#FF4400",
        description: "Ruta biológico-social que traza cómo la materia viva evoluciona hasta producir mentes, mercados, imperios y finalmente algoritmos bioinspirados que imitan el proceso completo.",
        nodes: ["ATOM_AIS", "SUB_BIO", "SUB_PSY", "SUB_LAW_ECON", "SUB_HIST", "APEX_MBHB"],
        acquisitions: [
            "El Sentido: La percepción cruda como interfaz primordial entre el organismo y el caos entrópico.",
            "Biología: El ADN como código fuente, la célula como nanofábrica, la evolución como algoritmo genético natural.",
            "Psicología Cognitiva: La mente emergente, los sesgos, Kahneman, el Sistema 1/2 y la ilusión del Yo.",
            "Macroeconomía y Derecho: Mentes egoístas compitiendo por recursos escasos. Nash, la Mano Invisible, el Estado.",
            "Historia Geopolítica: 10.000 años de imperios dictados por ríos, trigo, carbón y semiconductores.",
            "Metaheurísticas: El cierre del círculo. Imitamos en silicio (Algoritmos Genéticos, Enjambres) exactamente lo que la biología hizo en carbono durante 3.800 millones de años."
        ]
    },
    {
        id: "PATH_AXIOM_ALGO",
        name: "Del Axioma al Algoritmo",
        subtitle: "El descenso vertical: de la epistemología pura al código ejecutable",
        color: "#FFD700",
        description: "Ruta fundacional que desciende desde las preguntas más abstractas sobre la Verdad (Z-4), cruza los Átomos del pensamiento (Z-3) y aterriza en los algoritmos ejecutables (Z7). Es la columna vertebral vertical del Grafo completo.",
        nodes: ["EP_TRUTH", "EP_LOGIC", "ATOM_LOG", "SUB_DIS", "SUB_ALG", "SUB_MAC", "APEX_MBHB"],
        acquisitions: [
            "Verdad: ¿Qué significa que algo sea verdadero? Correspondencia, coherencia o utilidad pragmática. Sin esta pregunta resuelta, todo lo que sigue es castillo en el aire.",
            "Lógica Formal: Silogismos, axiomas, Gödel. Las reglas inmutables del razonamiento válido y sus límites demostrados.",
            "Lógica (Átomo Capa 0): Deducción, inducción y abducción como operaciones irreducibles del pensamiento. Bacon, Peirce y Piaget.",
            "Matemática Discreta: Boole, Shannon, Grafos, Autómatas. La formalización que convierte la lógica en circuitos y algoritmos.",
            "Algoritmia: Divide y vencerás, programación dinámica, teoría de grafos. El arte de resolver problemas eficientemente.",
            "Modelos Avanzados de Computación: Turing, Halting Problem, P vs NP. Los límites teóricos absolutos de lo que una máquina puede calcular.",
            "Metaheurísticas (Apex): Cuando los problemas son NP-Hard y la solución exacta es imposible, imitamos a la naturaleza: Algoritmos Genéticos, Enjambres, Recocido Simulado."
        ]
    }
];
