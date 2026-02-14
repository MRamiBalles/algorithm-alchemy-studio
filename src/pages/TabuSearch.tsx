import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PermutationGrid } from "@/components/visualizer/PermutationGrid";
import { useSimulatedAnnealing } from "@/hooks/useSimulatedAnnealing"; // Reusing state logic
import { NUG5 } from "@/data/benchmarks";
import { QAPInstance } from "@/lib/algorithms/qap";
import { DEFAULT_SA_PARAMS } from "@/lib/algorithms/sa";
import { HybridLabLayout } from "@/components/layout/HybridLabLayout";
import { CodeDeck } from "@/components/ui/CodeDeck";
import { VideoPlayer } from "@/components/ui/VideoPlayer";

export default function TabuSearch() {
    const [instance] = useState<QAPInstance>(NUG5);
    // We reuse the SA hook just to get a valid 'currentStep' structure for the visualizer
    // In a real implementation, we would have a useTabuSearch hook
    const { currentStep } = useSimulatedAnnealing(instance, DEFAULT_SA_PARAMS);

    const videoSrc = "/content/mbhb/mod1/1.4_tabu_search.mp4"; // Short video

    const codeSnippets = [
        {
            language: "cpp" as const,
            label: "Estructura: Lista Tabú (C++)",
            code: `// Matriz de Tenencia Tabú (Tabu Tenure)
// tabu_list[i][j] guarda la iteración hasta la cual 
// el movimiento swap(i, j) está PROHIBIDO.
vector<vector<int>> tabu_list(n, vector<int>(n, -1000));

int tenencia_tabu = n / 2; // Duración habitual`,
            description: "Estructura de memoria para recordar movimientos prohibidos."
        },
        {
            language: "python" as const,
            label: "Estructura: Lista Tabú (Python)",
            code: `# Matriz de Tenencia Tabú
# tabu_list[i][j] guarda hasta qué iteración es tabú
n = len(p)
tabu_list = [[-1000] * n for _ in range(n)]

tenencia_tabu = n // 2`,
            description: "Versión Python de la memoria."
        },
        {
            language: "cpp" as const,
            label: "Lógica: Aspiración (C++)",
            code: `// Es Tabú si iteración actual < iteración de desbloqueo
bool is_tabu = (iteracion < tabu_list[i][j]);

// CRITERIO DE ASPIRACIÓN:
// Si mejora el RÉCORD GLOBAL, ignoramos que sea tabú
bool aspira = (current_cost + delta < best_global_cost);

if (!is_tabu || aspira) {
    if (delta < best_neighbor_delta) {
        // Guardar mejor movimiento
    }
}`,
            description: "El criterio de aspiración permite saltarse la prohibición si encontramos una solución genial."
        },
        {
            language: "python" as const,
            label: "Lógica: Aspiración (Python)",
            code: `is_tabu = iteration < tabu_list[i][j]

# Criterio de Aspiración
aspira = (current_cost + delta < best_global_cost)

if not is_tabu or aspira:
    if delta < best_neighbor_delta:
        # Guardar mejor movimiento
        pass`,
            description: "Lógica Python."
        },
        {
            language: "cpp" as const,
            label: "Actualizar Memoria (C++)",
            code: `// Aplicar el movimiento
apply_swap(move_i, move_j);

// Prohibir deshacer este movimiento durante 'tenencia' iteraciones
// Si moví i<->j, prohibo volver a mover i<->j
tabu_list[move_i][move_j] = iteracion + tenencia_tabu;
tabu_list[move_j][move_i] = iteracion + tenencia_tabu;`,
            description: "Actualizamos la lista negra para no deshacer lo que acabamos de hacer."
        },
        {
            language: "python" as const,
            label: "Actualizar Memoria (Python)",
            code: `# Aplicar swap
apply_swap(move_i, move_j)

# Prohibir deshacer
unlock_iter = iteration + tenencia_tabu
tabu_list[move_i][move_j] = unlock_iter
tabu_list[move_j][move_i] = unlock_iter`,
            description: "Actualización en Python."
        }
    ];

    const LeftPanelContent = (
        <div className="flex flex-col h-full gap-4">
            <div className="shrink-0">
                <h3 className="text-xs font-mono text-cyan-500 mb-2 uppercase tracking-widest">
                    Topic 1.4: Memoria
                </h3>
                <VideoPlayer src={videoSrc} />
            </div>
            <div className="flex-1 min-h-0">
                <CodeDeck snippets={codeSnippets} />
            </div>
        </div>
    );

    const RightPanelContent = (
        <div className="flex-1 flex flex-col min-w-0 h-full">
            <div className="flex-1 relative p-4 flex flex-col gap-4 overflow-hidden h-full">
                <div className="flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-3">
                        <h2 className="text-lg font-bold text-foreground">Búsqueda Tabú</h2>
                        <span className="text-[10px] font-mono text-muted-foreground bg-secondary/50 px-2 py-0.5 rounded">
                            {instance.name} (n={instance.size})
                        </span>
                    </div>
                </div>

                <div className="flex gap-4 flex-1 min-h-0 justify-center items-center">
                    {/* Visualizer Placeholder */}
                    <div className="panel-glass rounded-lg p-4 shrink-0 flex flex-col items-center gap-4">
                        <PermutationGrid
                            permutation={
                                currentStep?.permutation ??
                                Array.from({ length: instance.size }, (_, i) => i)
                            }
                        />
                        <div className="text-center p-4 bg-black/40 rounded border border-purple-500/30 max-w-xs">
                            <p className="text-sm font-semibold text-purple-400 mb-1">Visualización de Memoria</p>
                            <p className="text-xs text-muted-foreground">
                                En la versión completa, aquí verás coloreados en <span className="text-red-400">rojo</span> los movimientos prohibidos por la lista Tabú.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <AppLayout>
            <div className="flex-1 flex min-h-0 overflow-hidden">
                <HybridLabLayout
                    leftPanel={LeftPanelContent}
                    rightPanel={RightPanelContent}
                />
            </div>
        </AppLayout>
    );
}
