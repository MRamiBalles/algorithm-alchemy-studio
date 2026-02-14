
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
    duration: number; // minutes
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
        title: 'Módulo 1: Algoritmos de Trayectoria',
        units: [
          {
            id: '1.1',
            title: 'El Problema Imposible (Intro & Greedy)',
            description: '¿Por qué fallan los ordenadores clásicos? Introducción a la complejidad NP y heurísticas constructivas.',
            type: 'combined',
            metadata: { format: 'lecture', duration: 15 },
            assets: {
              videoUrl: '/content/mbhb/mod1/topic1_intro.mp4',
              visualizerPreset: { algorithm: 'greedy', instance: 'tai20a' },
              codeSnippets: [
                {
                  language: 'cpp',
                  label: 'Greedy Constructivo',
                  code: `vector<int> greedy(int n, const matrix& flow, const matrix& dist) {
    // Implementación básica...
}`
                }
              ]
            }
          },
          {
            id: '1.3',
            title: 'Enfriamiento Simulado (Simulated Annealing)',
            description: 'Escapando de óptimos locales mediante el esquema de Cauchy y el criterio de Metrópolis.',
            type: 'combined',
            metadata: { format: 'lecture', duration: 12 },
            assets: {
              videoUrl: '/content/mbhb/mod1/topic1_3_sa.mp4',
              visualizerPreset: { algorithm: 'sa', instance: 'tai20a', params: { schedule: 'cauchy' } },
              codeSnippets: [
                {
                  language: 'cpp',
                  label: 'Esquema Cauchy',
                  code: `double temp = t0 / (1.0 + k);`
                },
                {
                  language: 'cpp',
                  label: 'Criterio Metropolis',
                  code: `if (delta < 0 || (exp(-delta/temp) > random01())) accept();`
                }
              ]
            }
          },
          {
            id: '1.4',
            title: 'Concepto Tabú en 2 minutos',
            description: 'Explicación rápida de la memoria a corto plazo.',
            type: 'video',
            metadata: { format: 'short', duration: 2 },
            assets: {
              videoUrl: '/content/mbhb/mod1/topic1_4_tabu_short.mp4',
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
            metadata: { format: 'lecture', duration: 20 },
            assets: {
              videoUrl: '/content/mbhb/mod2/topic2_1_grasp.mp4'
            }
          }
        ]
      }
    ]
  }
];
