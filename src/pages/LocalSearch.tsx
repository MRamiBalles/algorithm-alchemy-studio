import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PermutationGrid } from "@/components/visualizer/PermutationGrid";
import { useSimulatedAnnealing } from "@/hooks/useSimulatedAnnealing";
import { NUG5 } from "@/data/benchmarks";
import { QAPInstance } from "@/lib/algorithms/qap";
import { DEFAULT_SA_PARAMS } from "@/lib/algorithms/sa";
import { TabbedLabLayout } from "@/components/layout/TabbedLabLayout";
import { TheoryViewer } from "@/components/content/TheoryViewer";
import { CodeDeck } from "@/components/ui/CodeDeck";
import { VideoPlayer } from "@/components/ui/VideoPlayer";
import { lsNotes } from "@/data/lessons/ls_notes";

export default function LocalSearch() {
    const [instance] = useState<QAPInstance>(NUG5);
    // Reusing SA hook for visualizer grid state
    const { currentStep } = useSimulatedAnnealing(instance, DEFAULT_SA_PARAMS);

    const videoSrc = "/content/mbhb/mod1/1.2_local_search.mp4";
    const localSnippets = [
        {
            language: "python" as const,
            label: "Local Search (Best Imp)",
            code: `def local_search_best_improvement(problem, initial_sol):
    current_sol = list(initial_sol)
    current_cost = problem.evaluate(current_sol)
    
    while True:
        best_delta = 0
        best_move = None
        
        # Evaluar TODA la vecindad
        for i in range(problem.n):
            for j in range(i + 1, problem.n):
                delta = problem.delta_evaluate(current_sol, i, j)
                if delta < best_delta: 
                    best_delta = delta
                    best_move = (i, j)
        
        # Si no hay mejora, paramos (Óptimo Local)
        if best_move is None:
            break
            
        # Aplicar movimiento
        i, j = best_move
        current_sol[i], current_sol[j] = current_sol[j], current_sol[i]
        current_cost += best_delta
        
    return current_sol, current_cost`
        }
    ];

    const VisualizerContent = (
        <div className="flex-1 flex flex-col min-w-0 h-full">
            <div className="flex-1 relative p-4 flex flex-col gap-4 overflow-hidden h-full">
                <div className="flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-3">
                        <h2 className="text-lg font-bold text-foreground">Búsqueda Local</h2>
                        <span className="text-[10px] font-mono text-muted-foreground bg-secondary/50 px-2 py-0.5 rounded">
                            {instance.name} (n={instance.size})
                        </span>
                    </div>
                </div>

                <div className="flex gap-4 flex-1 min-h-0 justify-center items-center">
                    <div className="panel-glass rounded-lg p-4 shrink-0">
                        <PermutationGrid
                            permutation={
                                currentStep?.permutation ??
                                Array.from({ length: instance.size }, (_, i) => i)
                            }
                        />
                        <p className="text-center text-xs text-muted-foreground mt-4 font-mono">
                            (Visualizador Muestra Estado Inicial)
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <AppLayout>
            <div className="flex-1 flex min-h-0 overflow-hidden">
                <TabbedLabLayout
                    video={<VideoPlayer src={videoSrc} />}
                    theory={<TheoryViewer content={lsNotes} />}
                    code={<CodeDeck snippets={localSnippets} />}
                    visualizer={VisualizerContent}
                />
            </div>
        </AppLayout>
    );
}
