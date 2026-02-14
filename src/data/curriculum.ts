
export interface ContentUnit {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'lab' | 'exercise' | 'combined';
  assets: {
    videoUrl?: string;     // Relative to /public
    notesUrl?: string;     // Download link
    visualizerPreset?: any; // Config for the lab
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
        title: 'Módulo 1: Algoritmos de Trayectoria',
        units: [
          {
            id: '1.1',
            title: 'El Problema Imposible (Intro & Greedy)',
            description: '¿Por qué fallan los ordenadores clásicos? Introducción a la complejidad NP y heurísticas constructivas.',
            type: 'combined',
            assets: {
              videoUrl: '/content/mbhb/mod1/topic1_intro.mp4',
              visualizerPreset: { algorithm: 'greedy', instance: 'tai20a' }
            }
          },
          {
            id: '1.3',
            title: 'Enfriamiento Simulado (Simulated Annealing)',
            description: 'Escapando de óptimos locales mediante el esquema de Cauchy y el criterio de Metrópolis.',
            type: 'combined',
            assets: {
              videoUrl: '/content/mbhb/mod1/topic1_3_sa.mp4',
              visualizerPreset: { algorithm: 'sa', instance: 'tai20a', params: { schedule: 'cauchy' } }
            }
          },
          {
            id: '1.4',
            title: 'Búsqueda Tabú',
            description: 'Uso de memoria a corto plazo para evitar ciclos y diversificar la búsqueda.',
            type: 'combined',
            assets: {
              videoUrl: '/content/mbhb/mod1/topic1_4_tabu.mp4',
            }
          }
        ]
      },
      {
        id: 'mod2',
        title: 'Módulo 2: Multiarranque',
        units: [
            {
                id: '2.1',
                title: 'GRASP y Multiarranque',
                description: 'Estrategias de construcción aleatorizada y búsqueda desde múltiples puntos.',
                type: 'combined',
                assets: {
                    videoUrl: '/content/mbhb/mod2/topic2_1_grasp.mp4'
                }
            }
        ]
      },
      {
        id: 'mod3',
        title: 'Módulo 3: Bioinspirados',
        units: [
            {
                id: '3.1',
                title: 'Algoritmos Genéticos',
                description: 'Evolución de poblaciones mediante selección, cruce y mutación.',
                type: 'combined',
                assets: {
                    videoUrl: '/content/mbhb/mod3/topic3_1_ga.mp4'
                }
            }
        ]
      }
    ]
  }
];
