import { Subject } from "@/types";

export const CURRICULUM: Subject[] = [
  {
    id: 'mbhb',
    title: 'Modelos Bioinspirados e Heurísticas de Búsqueda (MBHB)',
    description: 'Curso avanzado de optimización combinatoria: Desde las trayectorias individuales hasta la inteligencia de enjambre distribuidas.',
    modules: [
      {
        id: 'mod1',
        title: 'Módulo 1: Metaheurísticas de Trayectoria (QAP)',
        description: 'Fundamentos de optimización, búsquedas locales y algoritmos basados en trayectoria única.',
        units: [
          {
            id: '1.0',
            title: 'Tema 1.0: Introducción (Problemas Imposibles)',
            description: 'Por qué necesitamos la IA Heurística.',
            type: 'video',
            metadata: { format: 'lecture', duration: 10, tags: ['#Intro', '#Complejidad'] },
            assets: {
              videoUrl: '/content/mbhb/mod1/Resolviendo_problemas_imposibles.mp4'
            }
          },
          {
            id: '1.1',
            title: 'Tema 1.1: Introducción y Algoritmos Constructivos',
            description: 'El problema QAP y heurísticas voraces (Greedy).',
            type: 'combined',
            metadata: { format: 'lecture', duration: 15, tags: ['#Greedy', '#QAP'] },
            assets: {
              videoUrl: '/content/mbhb/mod1/Optimización_Heurística.mp4',
              notesUrl: '/content/mbhb/MBYHB/Teoria/01 Tema_1.1_V1_2024.pdf'
            }
          },
          {
            id: '1.2',
            title: 'Tema 1.2: Búsqueda Local',
            description: 'Conceptos de Vecindad, Óptimo Local y estrategias de mejora.',
            type: 'combined',
            metadata: { format: 'lecture', duration: 20, tags: ['#LocalSearch', '#2Opt'] },
            assets: {
              videoUrl: '/content/mbhb/mod1/Algoritmos_de_Búsqueda_Local.mp4',
              notesUrl: '/content/mbhb/MBYHB/Teoria/02 Tema_1.2_V1_V2024.pdf'
            }
          },
          {
            id: '1.3',
            title: 'Tema 1.3: Enfriamiento Simulado',
            description: 'Algoritmos basados en temperatura (Simulated Annealing) para escapar de óptimos locales.',
            type: 'combined',
            metadata: { format: 'lecture', duration: 25, tags: ['#SimulatedAnnealing', '#Metropolis'] },
            assets: {
              videoUrl: '/content/mbhb/mod1/Enfriamiento_Simulado.mp4',
              notesUrl: '/content/mbhb/MBYHB/Teoria/03 Tema_1.3_V1_2024.pdf'
            }
          },
          {
            id: '1.4',
            title: 'Tema 1.4: Búsqueda Tabú',
            description: 'Uso de memoria a corto y largo plazo para guiar la búsqueda.',
            type: 'combined',
            metadata: { format: 'lecture', duration: 30, tags: ['#TabuSearch', '#Memoria'] },
            assets: {
              videoUrl: '/content/mbhb/mod1/Búsqueda_Tabú__La_Memoria.mp4',
              notesUrl: '/content/mbhb/MBYHB/Teoria/04 Tema_1.4_V2_2024.pdf'
            }
          },
          {
            id: '1.5',
            title: 'Tema 1.5: GRASP',
            description: 'Greedy Randomized Adaptive Search Procedure.',
            type: 'video',
            metadata: { format: 'lecture', duration: 20 },
            assets: {
              videoUrl: '/content/mbhb/mod1/La_búsqueda_de_lo_mejor.mp4',
              notesUrl: '/content/mbhb/MBYHB/Teoria/05 Tema 1.5_V_2024.pdf'
            }
          },
          {
            id: '1.6',
            title: 'Tema 1.6: ILS y VNS',
            description: 'Iterated Local Search y Variable Neighborhood Search.',
            type: 'video',
            metadata: { format: 'lecture', duration: 20 },
            assets: {
              videoUrl: '/content/mbhb/mod1/Escapar_la_trampa_del_algoritmo.mp4',
              notesUrl: '/content/mbhb/MBYHB/Teoria/06 Tema 1.6_V_2024.pdf'
            }
          }
        ]
      },
      {
        id: 'mod2',
        title: 'Módulo 2: Metaheurísticas Poblacionales (Energía)',
        description: 'Algoritmos Evolutivos, Genéticos y Meméticos aplicados a problemas continuos y discretos.',
        units: [
          {
            id: '2.1',
            title: 'Tema 2.1: Introducción a Algoritmos Evolutivos',
            description: 'Conceptos básicos de evolución natural aplicada al cómputo.',
            type: 'video',
            metadata: { format: 'lecture', duration: 20 },
            assets: { notesUrl: '/content/mbhb/MBYHB/Teoria/07 Tema 2.1_V_2024.pdf' }
          },
          {
            id: '2.2',
            title: 'Tema 2.2: Teorema de Schemata',
            description: 'Fundamentos teóricos de los Algoritmos Genéticos.',
            type: 'video',
            metadata: { format: 'lecture', duration: 20 },
            assets: { notesUrl: '/content/mbhb/MBYHB/Teoria/08 Tema 2.2_V_2024.pdf' }
          },
          {
            id: '2.3',
            title: 'Tema 2.3: Operadores Genéticos',
            description: 'Selección, Cruce y Mutación en detalle.',
            type: 'video',
            metadata: { format: 'lecture', duration: 20 },
            assets: { notesUrl: '/content/mbhb/MBYHB/Teoria/09 Tema 2.3_V_2024 (2 Sesiones).pdf' }
          },
          {
            id: '2.4',
            title: 'Tema 2.4: Modelos de Población',
            description: 'Modelos generacionales vs estado estacionario (Steady State).',
            type: 'video',
            metadata: { format: 'lecture', duration: 20 },
            assets: { notesUrl: '/content/mbhb/MBYHB/Teoria/10 Tema 2.4_V2024.pdf' }
          },
          {
            id: '2.5',
            title: 'Tema 2.5: Genéticos Multimodales',
            description: 'Mantenimiento de diversidad y niching.',
            type: 'video',
            metadata: { format: 'lecture', duration: 20 },
            assets: { notesUrl: '/content/mbhb/MBYHB/Teoria/11 Tema 2.5_V2024-Genéticos III Multimodales.pdf' }
          },
          {
            id: '2.6',
            title: 'Tema 2.6: Algoritmos Meméticos',
            description: 'Hibridación de Algoritmos Genéticos con Búsqueda Local.',
            type: 'video',
            metadata: { format: 'lecture', duration: 20 },
            assets: { notesUrl: '/content/mbhb/MBYHB/Teoria/12 Tema 2.6_V2024 - Meméticos.pdf' }
          },
          {
            id: '2.7',
            title: 'Tema 2.7: Optimización Multiobjetivo',
            description: 'Frontera de Pareto y NSGA-II.',
            type: 'video',
            metadata: { format: 'lecture', duration: 20 },
            assets: { notesUrl: '/content/mbhb/MBYHB/Teoria/13 Tema 2.7_V2024 Genéticos IV Multiobjetivo.pdf' }
          }
        ]
      },
      {
        id: 'mod3',
        title: 'Módulo 3: Inteligencia de Enjambre (Hormigas)',
        description: 'Optimización basada en colonias de hormigas (ACO).',
        units: [
          {
            id: '3.1',
            title: 'Tema 2.8: Hormigas I (ACO)',
            description: 'Fundamentos de Ant Colony Optimization.',
            type: 'video',
            metadata: { format: 'lecture', duration: 20 },
            assets: { notesUrl: '/content/mbhb/MBYHB/Teoria/Tema_2.8_v1 Hormigas.pdf' }
          },
          {
            id: '3.2',
            title: 'Tema 2.9: Hormigas II',
            description: 'Variantes avanzadas de ACO (Max-Min Ant System).',
            type: 'video',
            metadata: { format: 'lecture', duration: 20 },
            assets: { notesUrl: '/content/mbhb/MBYHB/Teoria/Tema_2.9v1 HormigasII.pdf' }
          }
        ]
      },
      {
        id: 'mod4',
        title: 'Módulo 4: Sistemas Descentralizados',
        description: 'Particle Swarm Optimization (PSO) y algoritmos distribuidos.',
        units: [
          {
            id: '4.1',
            title: 'Tema 2.10: Algoritmos Descentralizados',
            description: 'PSO y modelos de islas.',
            type: 'video',
            metadata: { format: 'lecture', duration: 20 },
            assets: { notesUrl: '/content/mbhb/MBYHB/Teoria/Tema_2.10 Descentralizados.pdf' }
          }
        ]
      },
      {
        id: 'mod5',
        title: 'Módulo 5: Proyectos Aplicados',
        description: 'Casos prácticos de integración.',
        units: [
          {
            id: '5.1',
            title: 'Caso: Tetris Challenge',
            description: 'Aplicación de heurísticas constructivas y búsqueda local al juego Tetris.',
            type: 'lab',
            metadata: { format: 'short', duration: 10 },
            assets: {}
          },
          {
            id: '5.2',
            title: 'Caso: VRP (Vehículos y Rutas)',
            description: 'Problema de rutas de vehículos con restricciones.',
            type: 'lab',
            metadata: { format: 'short', duration: 10 },
            assets: {}
          }
        ]
      }
    ],
    recommendedReadings: [
      {
        title: "Metaheurísticas Bioinspiradas: Guía Docente y Apuntes",
        author: "Departamento de Tecnologías de la Información, Universidad de Huelva",
        year: 2025,
        description: "Material oficial de referencia para el curso (PDFs disponibles en cada tema)."
      },
      {
        title: "Tabu Search",
        author: "Fred Glover & Manuel Laguna",
        year: 1997,
        description: "La biblia de la Búsqueda Tabú y sus aplicaciones prácticas."
      },
      {
        title: "Genetic Algorithms in Search, Optimization, and Machine Learning",
        author: "David E. Goldberg",
        year: 1989,
        description: "Texto clásico sobre algoritmos genéticos y schemata."
      },
      {
        title: "Ant Colony Optimization",
        author: "Marco Dorigo & Thomas Stützle",
        year: 2004,
        description: "Referencia fundamental para ACO."
      },
      {
        title: "Swarm Intelligence",
        author: "James Kennedy & Russell C. Eberhart",
        year: 2001,
        description: "Fundamentos de PSO e inteligencia social de enjambre."
      }
    ]
  }
];
