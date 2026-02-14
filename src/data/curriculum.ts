
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
    description: 'Domina los algoritmos que resuelven lo imposible. De la fuerza bruta a la inteligencia de enjambre.',
    modules: [
      {
        id: 'mod1',
        title: 'Módulo 1: La Montaña y la Niebla (Trayectorias)',
        description: 'Fundamentos de Optimización y búsqueda de una sola solución.',
        units: [
          {
            id: '1.0',
            title: 'Trailer: ¿Por qué tu ordenador NO puede encontrar la solución perfecta?',
            description: 'Un problema con solo 18 ciudades tiene más de 3.500 billones de rutas posibles. Descubre por qué la fuerza bruta ha muerto y nacen las Heurísticas.',
            type: 'video',
            metadata: {
              format: 'short',
              duration: 2,
              tags: ['#Ingenieria', '#NPhard', '#Intro', '#Viral']
            },
            assets: {
              videoUrl: '/content/mbhb/mod1/1.0_trailer.mp4'
            }
          },
          {
            id: '1.1',
            title: 'Clase 1: El Problema QAP y Algoritmos Greedy',
            description: 'Analizamos por qué N! es un muro imposible y presentamos la solución: Metaheurísticas. Programamos el algoritmo Greedy de Potenciales y la Evaluación Delta.',
            type: 'combined',
            metadata: {
              format: 'lecture',
              duration: 15,
              tags: ['#Greedy', '#QAP', '#DeltaEval', '#C++']
            },
            assets: {
              videoUrl: '/content/mbhb/mod1/1.1_greedy.mp4',
              visualizerPreset: { algorithm: 'greedy', instance: 'tai20a' },
              codeSnippets: [
                {
                  label: 'Evaluación Delta (C++)',
                  language: 'cpp',
                  code: `// Cálculo eficiente de la diferencia de costes
int delta_cost(int i, int j, const vector<int>& p) {
    int delta = 0;
    // ... solo calculamos los arcos afectados ...
    return delta;
}`
                }
              ]
            }
          },
          {
            id: '1.2',
            title: 'Concepto: La Colina en la Niebla (Búsqueda Local)',
            description: 'Imagínate en una montaña con niebla. Solo ves tus pies. Así funciona Hill Climbing. Entiende la diferencia entre "Mejor Vecino" y "Primer Vecino".',
            type: 'video',
            metadata: {
              format: 'short',
              duration: 5,
              tags: ['#LocalSearch', '#HillClimbing', '#OptimoLocal']
            },
            assets: {
              videoUrl: '/content/mbhb/mod1/1.2_local_search.mp4',
              codeSnippets: [
                {
                  label: 'Operador 2-Opt (Swap)',
                  language: 'cpp',
                  code: `void swap_move(vector<int>& p, int i, int j) {
    int temp = p[i];
    p[i] = p[j];
    p[j] = temp;
}`
                }
              ]
            }
          },
          {
            id: '1.3a',
            title: 'Concepto: Enfriamiento Simulado (Short)',
            description: '¿Y si para mejorar hay que empeorar? Inspirado en la metalurgia, este algoritmo acepta errores aposta para escapar de la trampa local.',
            type: 'video',
            metadata: {
              format: 'short',
              duration: 3,
              tags: ['#SimulatedAnnealing', '#Metalurgia', '#Intro']
            },
            assets: {
              videoUrl: '/content/mbhb/mod1/1.3b_simulated_annealing_short.mp4'
            }
          },
          {
            id: '1.3b',
            title: 'Clase 2: Implementación de Enfriamiento (Cauchy)',
            description: 'La receta técnica exacta para la Práctica 1. Esquema de Enfriamiento de Cauchy, Criterio de Metrópolis y los parámetros mágicos (mu=0.3, phi=0.3).',
            type: 'combined',
            metadata: {
              format: 'lecture',
              duration: 12,
              tags: ['#SimulatedAnnealing', '#Cauchy', '#Metropolis', '#Codigo']
            },
            assets: {
              videoUrl: '/content/mbhb/mod1/1.3_simulated_annealing_lecture.mp4',
              visualizerPreset: { algorithm: 'simulated-annealing', instance: 'tai20a' },
              codeSnippets: [
                {
                  label: 'Esquema de Enfriamiento (Cauchy)',
                  language: 'cpp',
                  code: `double current_temp(double t0, int k) {
    return t0 / (1.0 + k); // Esquema Lento
}`
                },
                {
                  label: 'Criterio de Metrópolis',
                  language: 'cpp',
                  code: `if (delta < 0 || (exp(-delta / T) > random_01())) {
    apply_move(); // Aceptamos
}`
                }
              ]
            }
          },
          {
            id: '1.4',
            title: 'Concepto: Búsqueda Tabú (La Memoria)',
            description: 'Si te pierdes en el laberinto, necesitas un diario. Tabu Search introduce "Memoria a Corto Plazo" para no volver a cometer los mismos errores.',
            type: 'video',
            metadata: {
              format: 'short',
              duration: 4,
              tags: ['#TabuSearch', '#Memoria', '#IA']
            },
            assets: {
              videoUrl: '/content/mbhb/mod1/1.4_tabu_search.mp4',
              codeSnippets: [
                {
                  label: 'Lista Tabú (Circular)',
                  language: 'cpp',
                  code: `// Estructura básica
deque<Move> tabu_list;
void add_tabu(Move m) {
    tabu_list.push_back(m);
    if (tabu_list.size() > TENURE) tabu_list.pop_front();
}`
                }
              ]
            }
          }
        ]
      },
      {
        id: 'mod2',
        title: 'Módulo 2: Paracaidistas y Niebla (Multiarranque)',
        description: 'No te juegues todo a una sola carta. Estrategias de reinicio y perturbación.',
        units: [
          {
            id: '2.1',
            title: 'Concepto: El Método GRASP',
            description: 'Greedy Randomized Adaptive Search Procedure. Lanzamos "paracaidistas" en puntos prometedores pero aleatorios del mapa.',
            type: 'video',
            metadata: {
              format: 'short',
              duration: 5,
              tags: ['#GRASP', '#Random', '#MultiStart']
            },
            assets: {
              videoUrl: '/content/mbhb/mod2/2.1_grasp.mp4',
              codeSnippets: [
                {
                  label: 'Cálculo LRC y Alpha',
                  language: 'cpp',
                  code: `// Umbral para la lista de candidatos
double limit = min_cost + alpha * (max_cost - min_cost);
// Alpha = 0 (Greedy Puro), Alpha = 1 (Aleatorio Puro)`
                }
              ]
            }
          },
          {
            id: '2.2',
            title: 'Concepto: ILS y VNS (Teletransporte vs Niebla)',
            description: 'Comparativa visual: ¿Es mejor saltar a otro pico (ILS) o ampliar tu visión cuando te atascas (VNS)?',
            type: 'video',
            metadata: {
              format: 'short',
              duration: 5,
              tags: ['#VNS', '#ILS', '#Perturbation']
            },
            assets: {
              videoUrl: '/content/mbhb/mod2/2.2_ils_vns.mp4',
              codeSnippets: [
                {
                  label: 'Bucle VNS (Cambio de Entorno)',
                  language: 'cpp',
                  code: `int k = 1;
while (k <= k_max) {
    Solution s_prime = shake(s, k); // Perturbación
    s_prime = local_search(s_prime);
    if (fitness(s_prime) > fitness(s)) {
        s = s_prime;
        k = 1; // Mejora -> Reiniciar entorno
    } else {
        k++; // No mejora -> Ampliar entorno
    }
}`
                }
              ]
            }
          }
        ]
      },
      {
        id: 'mod3',
        title: 'Módulo 3: La Revolución Biológica',
        description: 'Cuando la ingeniería falla, copiamos a la naturaleza. Evolución y Enjambres.',
        units: [
          {
            id: '3.0',
            title: 'Intro: Computación Bioinspirada',
            description: 'Hormigas logísticas, enjambres de partículas y cerebros artificiales. La naturaleza lleva millones de años optimizando.',
            type: 'video',
            metadata: {
              format: 'short',
              duration: 3,
              tags: ['#Bio', '#Hormigas', '#Swarm']
            },
            assets: {
              videoUrl: '/content/mbhb/mod3/3.0_bio_intro.mp4'
            }
          },
          {
            id: '3.1',
            title: 'Concepto: Computación Evolutiva',
            description: 'Supervivencia del más apto aplicada al código. Padres, hijos, cruces y mutaciones.',
            type: 'video',
            metadata: {
              format: 'short',
              duration: 4,
              tags: ['#Genetica', '#Evolucion', '#Darwin']
            },
            assets: {
              videoUrl: '/content/mbhb/mod3/3.1_evo_intro.mp4',
              codeSnippets: [
                {
                  label: '¡OJO! Cruce OX (No Binario)',
                  language: 'cpp',
                  code: `// Order Crossover para Permutaciones
// 1. Copiar subcadena del Padre 1
// 2. Rellenar resto con orden del Padre 2
// Evita repetir ciudades (inválido en QAP)`
                }
              ]
            }
          }
        ]
      }
    ]
  }
];
