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
        { id: "SUB_ALG", group: "SUBJECT", label: "Algoritmia", level: 3, role: "subject", route: "/course/z7_nexus/algoritmia_master.md", canonicalText: "Introduction to Algorithms (Cormen)", bibliographyPath: "/content/official_docs/ucm/ingenieria_computadores/Diseño de Algoritmos/bibliografia_annas_archive.md", historicalContext: "Originada por la necesidad de descifrar trayectorias balísticas y criptografía de Enigma en la 2GM, formalizada en la posguerra para dominar la explosión combinatoria del naciente silicio." },
        { id: "SUB_LA", group: "SUBJECT", label: "Álgebra Lineal", level: 3, role: "subject", route: "/course/z0_math/algebra_lineal_master.md", canonicalText: "Introduction to Linear Algebra (Strang)", bibliographyPath: "/content/official_docs/ucm/ingenieria_computadores/Álgebra Lineal/bibliografia_annas_archive.md", historicalContext: "Concebida en el rincón más abstracto de la mente de Grassmann (1844), ignorada por casi un siglo hasta ser resucitada por la Física Cuántica (Heisenberg/Dirac) en 1925 como el único lenguaje capaz de sostener el caos subatómico." },
        { id: "SUB_CALC", group: "SUBJECT", label: "Cálculo", level: 3, role: "subject", route: "/course/z0_math/calculus_master.md", canonicalText: "Calculus (Stewart)", bibliographyPath: "/content/official_docs/ucm/ingenieria_datos_ia/Cálculo/bibliografia_annas_archive.md", historicalContext: "Hijo de la Revolución Científica del siglo XVII; nació del tenso conflicto geopolítico e intelectual entre Newton (el control de la gravedad y las mareas británicas) y Leibniz (el formalismo lógico continental)." },
        { id: "SUB_DIS", group: "SUBJECT", label: "Matemática Discreta", level: 3, role: "subject", route: "/course/z0_math/matematica_discreta_master.md", canonicalText: "Discrete Mathematics (Rosen)", historicalContext: "George Boole redujo el pensamiento humano a 0s y 1s en 1854; Euler inventó la Teoría de Grafos paseando por Königsberg (1736); Shannon demostró en su tesis del MIT (1938) que los circuitos eléctricos podían implementar directamente el Álgebra de Boole." },
        { id: "SUB_EST", group: "SUBJECT", label: "Estadística", level: 3, role: "subject", route: "/course/z0_math/estadistica_master.md", canonicalText: "Probability and Statistics (Devore)", historicalContext: "El pastor Thomas Bayes intentó refutar a Hume (1763) y fundó accidentalmente la única estadística útil para el Machine Learning. Fisher creó la inferencia frecuentista desde un campo de trigo en Rothamsted (1920s). La guerra Bayes vs Fisher sigue viva." },

        // Physics Foundations
        { id: "SUB_FIS1", group: "SUBJECT", label: "Fundamentos Físicos", level: 3, role: "subject", route: "/course/z0_math/fisica_master.md", canonicalText: "Physics for Scientists & Engineers (Tipler)", historicalContext: "La Termodinámica surge como respuesta directa al caos de la Revolución Industrial británica para optimizar las calderas de carbón imperial; el Electromagnetismo unificó el mundo a través del telégrafo victoriano." },
        { id: "SUB_ELEC", group: "SUBJECT", label: "Electrónica y Electricidad", level: 3, color: "#44FFFF", role: "subject", route: "/course/z0_math/fisica_master.md", bibliographyPath: "/content/official_docs/ucm/ingenieria_computadores/Electrónica/bibliografia_annas_archive.md", historicalContext: "El nacimiento del Silicio (Bell Labs, 1959) fue impulsado por la histeria de la Guerra Fría para miniaturizar sistemas de misiles, originando el transistor y la era de la información masiva." },

        // Philosophical / Social Foundations
        { id: "SUB_ETH", group: "SUBJECT", label: "Ética Teconológica", level: 3, color: "#FF44FF", role: "subject", route: "/course/z0_phil/etica_tecnologica_master.md", bibliographyPath: "/content/official_docs/ucm/ingenieria_computadores/Ética, legislación y profesión/bibliografia_annas_archive.md" },
        { id: "SUB_EPI", group: "SUBJECT", label: "Epistemología", level: 3, color: "#FF44FF", role: "subject", route: "/course/z0_phil/epistemologia_master.md", historicalContext: "El nacimiento del Método Científico Formal con Francis Bacon (1620) y la aniquilación de la inducción ingenua por Karl Popper (1934, Falsacionismo)." },
        { id: "SUB_PSY", group: "SUBJECT", label: "Psicología", level: 3, color: "#FF00FF", role: "subject", route: "/course/z4_mind/fundamentos_psicologia_master.md", canonicalText: "Psychology (Gray & Bjorklund)", historicalContext: "El Conductismo de Skinner creyó que el humano era una máquina programable (1938), hasta que Miller descubrió los límites de hardware de la memoria (1956) y Kahneman (Nobel 2002) demostró la irracionalidad sistémica con Prospect Theory." },
        { id: "SUB_LAW_ECON", group: "SUBJECT", label: "Macroeconomía y Derecho", level: 3, color: "#FFFF00", role: "subject", route: "/course/z5_society/macroeconomia_derecho_master.md", canonicalText: "Macroeconomics (Mankiw)", historicalContext: "Adam Smith decapitó el mercantilismo en 1776; Von Neumann y Nash (1944-50) revelaron matemáticamente que la paz es solo un equilibrio termodinámico de terror evocado por la Destrucción Mutua Asegurada." },
        { id: "SUB_HIST", group: "SUBJECT", label: "Historia Geopolítica", level: 3, color: "#FF8800", role: "subject", route: "/course/z6_culture/historia_politica_master.md", canonicalText: "The Age of Revolution (Hobsbawm)", historicalContext: "Braudel (1949) enseñó que los montes y los océanos dictan el destino de las naciones (Longue Durée); todo desarrollo tecnológico es balística disfrazada motivada por la doble revolución de Hobsbawm (1789-1848)." },

        // Biology / Life Sciences
        { id: "SUB_BIO", group: "SUBJECT", label: "Biología", level: 3, color: "#00CC00", role: "subject", route: "/course/z3_life/biologia_fundamental_master.md", canonicalText: "Campbell Biology (Campbell et al.)", historicalContext: "Darwin destruyó el excepcionalismo humano con la Selección Natural (1859); Watson y Crick robaron la Foto 51 de Rosalind Franklin para descifrar la Doble Hélice del ADN (1953); Doudna y Charpentier entregaron a la humanidad las tijeras CRISPR para editar el código fuente de la vida (2012, Nobel 2020)." },

        // Engineering / Hardware
        { id: "SUB_AC", group: "SUBJECT", label: "Arq. Computadores", level: 3, color: "#00FFCC", role: "subject", route: "/course/z2_eng/arquitectura_computadores_master.md", canonicalText: "Computer Organization and Design (Patterson & Hennessy)", historicalContext: "Nacida de la urgencia bélica de descifrar Enigma (Turing, 1936) y del informe EDVAC de Von Neumann (1945); su evolución fue dictada por la profecía industrial de Moore (1965) y la actual guerra geopolítica por el nanómetro entre TSMC, EEUU y China." },
        { id: "SUB_SO", group: "SUBJECT", label: "Sistemas Operativos", level: 3, color: "#00FFCC", role: "subject", route: "/course/z2_eng/sistemas_operativos_master.md", canonicalText: "Operating System Concepts (Silberschatz)", historicalContext: "Forjado por Dijkstra (1968) para domar el caos de la concurrencia, cristalizado por Thompson y Ritchie en UNIX (Bell Labs, 1969-74) y democratizado para siempre por un estudiante finlandés de 21 años: Linus Torvalds (1991)." },
        { id: "SUB_RED", group: "SUBJECT", label: "Redes", level: 3, color: "#00FFCC", role: "subject", route: "/course/z2_eng/redes_computadores_master.md", canonicalText: "Computer Networking (Kurose & Ross)", historicalContext: "Nacida del pánico nuclear de DARPA (ARPANET, 1969): el primer mensaje de Internet fue 'LO' (UCLA→SRI). Unificada por Cerf y Kahn con TCP/IP (1974) y democratizada por Tim Berners-Lee al regalar la World Wide Web al mundo desde el CERN (1989-93)." },

        // Intelligence & Data
        { id: "SUB_BD", group: "SUBJECT", label: "Bases de Datos", level: 3, color: "#0088FF", role: "subject", route: "/course/z7_nexus/bases_datos_master.md", canonicalText: "Database System Concepts (Silberschatz)", historicalContext: "Edgar Codd, matemático británico en IBM San José, publicó en 1970 el modelo relacional que su propia empresa intentó enterrar para proteger su producto IMS. Berkeley (Stonebraker) y Oracle (Ellison) lo adoptaron antes que IBM. El movimiento NoSQL del 2000s nació cuando Google y Amazon rompieron los límites del modelo para la escala planetaria." },
        { id: "SUB_IS", group: "SUBJECT", label: "Ing. Software", level: 3, color: "#0088FF", role: "subject", route: "/course/z7_nexus/ingenieria_software_master.md", canonicalText: "The Mythical Man-Month (Brooks, 1975)", historicalContext: "La OTAN acuñó el término 'Software Engineering' en Garmisch (1968) para atajar la 'Crisis del Software'. Brooks demostró en IBM que añadir gente retrasa un proyecto. En 2001, 17 rebeldes firmaron el Manifiesto Ágil en una estación de esquí de Utah, derrocando 30 años de burocracia Waterfall." },
        { id: "SUB_FIA", group: "SUBJECT", label: "Fund. Inteligencia Artificial", level: 3, role: "subject", route: "/course/z7_nexus/fundamentos_ia_master.md", canonicalText: "Artificial Intelligence: A Modern Approach (Russell & Norvig)", bibliographyPath: "/content/official_docs/ucm/ingenieria_datos_ia/Fundamentos de Inteligencia Artificial/bibliografia_annas_archive.md", historicalContext: "Acuñada en la mítica Conferencia de Dartmouth (1956) bajo la utopía de la posguerra de que una Máquina podría simular la racionalidad humana pura; oscilando entre el financiamiento bélico masivo (DARPA) y crudos 'Inviernos de la IA'." },
        { id: "SUB_ML1", group: "SUBJECT", label: "Aprendizaje Automático I", level: 3, role: "subject", route: "/course/z7_nexus/ml1_master.md", color: "#8B5CF6", canonicalText: "The Elements of Statistical Learning (Hastie)", bibliographyPath: "/content/official_docs/ucm/ingenieria_datos_ia/Aprendizaje Automático I/bibliografia_annas_archive.md", historicalContext: "El colapso de la IA lógica y el triunfo del Empirismo Estadístico a finales del s.XX; impulsado geopolíticamente por el diluvio de datos masivos (Internet) comercial y la necesidad de vigilancia predictiva." },

        // ─── EXPANSION GRÁFICOS Y MODELOS (UHU) ───
        { id: "SUB_MAC", group: "SUBJECT", label: "Modelos Avz. de Computación", level: 3, color: "#0088FF", role: "subject", route: "/course/z7_nexus/modelos_avanzados_computacion_master.md", canonicalText: "Introduction to the Theory of Computation (Sipser)", historicalContext: "De las cintas infinitas de la Máquina de Turing a la indecidibilidad irreducible, definiendo los límites físicos y lógicos del universo computable." },
        { id: "SUB_AO", group: "SUBJECT", label: "Animación por Ordenador", level: 3, color: "#FF0088", role: "subject", route: "/course/z7_nexus/animacion_ordenador_master.md", historicalContext: "El cruce de la geometría de transformaciones y la física simulada para recrear la aisthesis material en el frío silicio (Vulkan, Rigging)." },
        { id: "SUB_RV", group: "SUBJECT", label: "Realidad Virtual", level: 3, color: "#FF0088", role: "subject", route: "/course/z7_nexus/realidad_virtual_master.md", historicalContext: "La forja de universos sensoriales inmersivos alterando los fotones simulados mediante shaders, álgebra lineal y rasterización profunda (OpenGL, GLSL)." },
        { id: "SUB_PJ", group: "SUBJECT", label: "Programación de Juegos", level: 3.5, color: "#FF0000", role: "subject", route: "/course/z7_nexus/programacion_juegos_master.md", historicalContext: "El meta-dominio de síntesis interactiva. Se erigen motores físicos, inteligencia artificial (NPCs) y poiesis visual dentro de arquitecturas masivas (Unity)." },

        // ─── LEVEL 4: APEXES ───
        { id: "APEX_MBHB", group: "LEGENDARY", label: "MBHB", level: 4, color: "#FF0000", size: 25, role: "legendary", route: "/course/apex/mbhb_master.md", description: "Metaheurísticas y Modelos Bioinspirados.", canonicalText: "Adaptation in Natural Systems (Holland, 1975)", historicalContext: "Nacido de la frustración ante el límite físico del silicio (Fin de Moore) y la intraductibilidad matemática de problemas NP-Hard, forzando a la computación a imitar la implacable selección natural darwiniana (Genética 1970s)." },
        { id: "APEX_HIST", group: "LEGENDARY", label: "HISTORIA TOTAL", level: 4, color: "#FF8800", size: 25, role: "legendary", route: "/subject/ugr/historia/historia-total", description: "La síntesis de los tiempos.", canonicalText: "The Mediterranean (Braudel)", historicalContext: "No es una disciplina, sino el eje que atraviesa y ancla todas las creaciones científicas, literarias y políticas al fluir ineludible del Tiempo Geopolítico del Hombre." },
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
        { source: "SUB_ELEC", target: "SUB_AC", type: "Prerequisite" },
        { source: "SUB_ETH", target: "DEG_LAW", type: "Prerequisite" },
        { source: "SUB_ETH", target: "DEG_CS", type: "Integration" },
        { source: "SUB_EPI", target: "DEG_PSY", type: "Prerequisite" },
        { source: "Z4_MIND", target: "SUB_PSY", type: "Core" },
        { source: "SUB_PSY", target: "DEG_PSY", type: "Prerequisite" },
        { source: "Z5_SOCIETY", target: "SUB_LAW_ECON", type: "Core" },
        { source: "SUB_LAW_ECON", target: "DEG_LAW", type: "Prerequisite" },
        { source: "SUB_LAW_ECON", target: "DEG_SOC", type: "Prerequisite" },
        { source: "Z6_CULTURE", target: "SUB_HIST", type: "Core" },
        { source: "SUB_HIST", target: "DEG_HIST", type: "Prerequisite" },

        // ─── PILLAR → DEGREE ───
        { source: "Z1_MATTER", target: "DEG_CHEM", type: "Derivation" },
        { source: "Z2_ENG", target: "DEG_ARCH", type: "Derivation" },
        { source: "Z3_LIFE", target: "DEG_BIO", type: "Derivation" },
        { source: "Z3_LIFE", target: "DEG_MED", type: "Derivation" },
        { source: "Z3_LIFE", target: "SUB_BIO", type: "Core" },
        { source: "SUB_BIO", target: "DEG_BIO", type: "Prerequisite" },
        { source: "SUB_BIO", target: "DEG_MED", type: "Prerequisite" },
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
        { source: "DEG_CS", target: "SUB_AC", type: "Core" },
        { source: "DEG_CS", target: "SUB_SO", type: "Core" },
        { source: "SUB_AC", target: "SUB_SO", type: "Prerequisite" },
        { source: "DEG_CS", target: "SUB_RED", type: "Core" },
        { source: "SUB_SO", target: "SUB_RED", type: "Prerequisite" },
        { source: "DEG_IDIA", target: "SUB_LA", type: "Foundation" },
        { source: "DEG_IDIA", target: "SUB_CALC", type: "Foundation" },
        { source: "DEG_IDIA", target: "SUB_FIA", type: "Core" },
        { source: "SUB_LA", target: "SUB_ML1", type: "Prerequisite" },
        { source: "SUB_FIA", target: "SUB_ML1", type: "Prerequisite" },
        { source: "DEG_CS", target: "SUB_BD", type: "Core" },
        { source: "DEG_CS", target: "SUB_IS", type: "Core" },
        { source: "DEG_IDIA", target: "SUB_BD", type: "Core" },
        { source: "SUB_BD", target: "SUB_ML1", type: "Prerequisite" },
        { source: "SUB_ALG", target: "SUB_IS", type: "Prerequisite" },
        { source: "SUB_BD", target: "SUB_IS", type: "Sibling" },
        { source: "SUB_AC", target: "SUB_ALG", type: "Sibling" },

        // ─── EXPANSION GRÁFICOS Y MODELOS (UHU) ───
        { source: "SUB_DIS", target: "SUB_MAC", type: "Prerequisite" },
        { source: "SUB_ALG", target: "SUB_MAC", type: "Core" },
        { source: "SUB_MAC", target: "SUB_EPI", type: "Bridge" },
        { source: "DEG_CS", target: "SUB_MAC", type: "Core" },

        { source: "SUB_LA", target: "SUB_AO", type: "Prerequisite" },
        { source: "SUB_AC", target: "SUB_AO", type: "Foundation" },
        { source: "DEG_CS", target: "SUB_AO", type: "Core" },

        { source: "SUB_LA", target: "SUB_RV", type: "Prerequisite" },
        { source: "SUB_FIS1", target: "SUB_RV", type: "Foundation" },
        { source: "DEG_CS", target: "SUB_RV", type: "Core" },

        { source: "SUB_AO", target: "SUB_PJ", type: "Prerequisite" },
        { source: "SUB_RV", target: "SUB_PJ", type: "Prerequisite" },
        { source: "SUB_IS", target: "SUB_PJ", type: "Prerequisite" },
        { source: "SUB_FIA", target: "SUB_PJ", type: "Integration" },
        { source: "SUB_PJ", target: "DEG_ARTS", type: "Synthesis" },

        // ─── SUBJECT → APEX ───
        { source: "SUB_ML1", target: "APEX_MBHB", type: "NeuralPath" },
        { source: "DEG_HIST", target: "APEX_HIST", type: "Synthesis" },
    ] as GraphLink[]
};
