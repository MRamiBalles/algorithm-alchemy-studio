
export interface CodeSnippet {
  language: 'cpp' | 'python' | 'typescript';
  label: string;
  code: string;
}

export interface ContentUnit {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'lab' | 'exercise' | 'combined';
  metadata: {
    format: 'short' | 'lecture';
    duration?: number;
    tags?: string[];
  };
  assets: {
    videoUrl?: string;
    notesUrl?: string;
    visualizerPreset?: any;
    codeSnippets?: CodeSnippet[];
  };
}

export interface CourseModule {
  id: string;
  title: string;
  units: ContentUnit[];
}

export interface Subject {
  id: string;
  title: string;
  description: string;
  modules: CourseModule[];
}

export const CURRICULUM: Subject[] = [
  {
    id: 'mbhb',
    title: 'Modelos Bioinspirados (MBHB)',
    description: 'Curso avanzado de optimización heurística y metaheurística.',
    modules: [
      {
        id: 'mod1',
        title: 'Módulo 1: Algoritmos de Trayectoria (Fundamentos)',
        units: [
          {
            id: '1.1',
            title: '¿Por qué falla la fuerza bruta? Intro a Heurísticas y Greedy',
            description: 'Analizamos por qué N! es un muro imposible y presentamos la solución: Metaheurísticas. Programamos el algoritmo Greedy de Potenciales.',
            type: 'combined',
            metadata: {
              format: 'lecture',
              duration: 15,
              tags: ['#IngenieriaInformatica', '#QAP', '#GreedyAlgorithm', '#NPduro']
            },
            assets: {
              videoUrl: '/content/mbhb/mod1/video1_greedy.mp4',
              visualizerPreset: { algorithm: 'greedy', instance: 'tai20a' }
            }
          },
          {
            id: '1.2',
            title: 'Búsqueda Local: Cómo mejorar tu solución',
            description: 'Explicamos el operador 2-opt y comparamos Mejor Vecino vs Primer Vecino. La trampa del Óptimo Local.',
            type: 'combined',
            metadata: {
              format: 'lecture',
              duration: 12,
              tags: ['#BusquedaLocal', '#2opt', '#HillClimbing', '#OptimoLocal']
            },
            assets: {
              videoUrl: '/content/mbhb/mod1/video2_localsearch.mp4',
              visualizerPreset: { algorithm: 'localsearch', instance: 'tai20a' }
            }
          },
          {
            id: '1.3',
            title: 'Enfriamiento Simulado: Aceptar errores',
            description: 'Copiamos a la termodinámica. Criterio de Metrópolis y esquema de Cauchy para saltar fuera de valles.',
            type: 'combined',
            metadata: {
              format: 'lecture',
              duration: 12,
              tags: ['#SimulatedAnnealing', '#Metropolis', '#Cauchy', '#FisicaComputacional']
            },
            assets: {
              videoUrl: '/content/mbhb/mod1/video3_sa.mp4',
              visualizerPreset: { algorithm: 'sa', instance: 'tai20a', params: { schedule: 'cauchy' } }
            }
          },
          {
            id: '1.4',
            title: 'Búsqueda Tabú: IA con Memoria',
            description: 'Evitamos repetir errores. Lista Tabú y criterio de aspiración.',
            type: 'combined',
            metadata: {
              format: 'lecture',
              duration: 15,
              tags: ['#TabuSearch', '#MemoriaAlgoritmica', '#InteligenciaArtificial']
            },
            assets: {
              videoUrl: '/content/mbhb/mod1/video4_tabu.mp4'
            }
          }
        ]
      },
      {
        id: 'mod2',
        title: 'Módulo 2: Multiarranque y Perturbación',
        units: [
          {
            id: '1.5',
            title: 'GRASP: Construcción Voraz Aleatorizada',
            description: 'Fase constructiva con aleatoriedad controlada (LRC) + Búsqueda Local.',
            type: 'combined',
            metadata: {
              format: 'lecture',
              duration: 20,
              tags: ['#GRASP', '#Multiarranque', '#LRC']
            },
            assets: {
              videoUrl: '/content/mbhb/mod2/video5_grasp.mp4'
            }
          },
          {
            id: '1.6',
            title: '¿Reiniciar o Perturbar? ILS y VNS',
            description: 'Estrategias de perturbación: ILS (patada) y VNS (entornos variables).',
            type: 'video',
            metadata: {
              format: 'short',
              duration: 3,
              tags: ['#VNS', '#ILS', '#Perturbacion', '#Short']
            },
            assets: {
              videoUrl: '/content/mbhb/mod2/video6_ils_vns_short.mp4'
            }
          }
        ]
      },
      {
        id: 'mod3',
        title: 'Módulo 3: Bioinspirados y Evolutivos',
        units: [
          {
            id: '1.8',
            title: 'Particle Swarm (PSO): IA de Aves',
            description: 'Cómo las partículas actualizan su velocidad usando pBest y gBest.',
            type: 'video',
            metadata: {
              format: 'short',
              duration: 3,
              tags: ['#PSO', '#SwarmIntelligence', '#Short']
            },
            assets: {
              videoUrl: '/content/mbhb/mod3/video7_pso_short.mp4'
            }
          },
          {
            id: '2.1',
            title: 'Intro a la Computación Evolutiva',
            description: 'De Darwin al Algoritmo: Genotipo, Fenotipo y Selección.',
            type: 'video',
            metadata: {
              format: 'short',
              duration: 2,
              tags: ['#ComputacionEvolutiva', '#Darwinismo', '#Short']
            },
            assets: {
              videoUrl: '/content/mbhb/mod3/video8_intro_evo_short.mp4'
            }
          },
          {
            id: '2.3',
            title: 'El Algoritmo Genético: Cruce OX',
            description: 'Mecánica del Genético Generacional: Cruce de Orden y Torneo.',
            type: 'video',
            metadata: {
              format: 'short',
              duration: 3,
              tags: ['#GeneticAlgorithms', '#CruceOX', '#Short']
            },
            assets: {
              videoUrl: '/content/mbhb/mod3/video9_ga_basic_short.mp4'
            }
          },
          {
            id: '2.4',
            title: 'Algoritmo CHC: Cataclismos',
            description: 'Prevención de incesto (Hamming) y reinicios por cataclismo.',
            type: 'video',
            metadata: {
              format: 'short',
              duration: 3,
              tags: ['#CHC', '#Cataclismo', '#Eshelman', '#Short']
            },
            assets: {
              videoUrl: '/content/mbhb/mod3/video10_chc_short.mp4'
            }
          },
          {
            id: '2.5',
            title: 'Algoritmos Multimodales: Niching',
            description: 'Fitness Sharing y Clearing para encontrar múltiples óptimos.',
            type: 'video',
            metadata: {
              format: 'short',
              duration: 3,
              tags: ['#Multimodal', '#Niching', '#Short']
            },
            assets: {
              videoUrl: '/content/mbhb/mod3/video11_niching_short.mp4'
            }
          }
        ]
      }
    ]
  }
];
