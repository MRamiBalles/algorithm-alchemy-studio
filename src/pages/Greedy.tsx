import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PermutationGrid } from "@/components/visualizer/PermutationGrid";
import { useSimulatedAnnealing } from "@/hooks/useSimulatedAnnealing";
import { NUG5 } from "@/data/benchmarks";
import { QAPInstance } from "@/lib/algorithms/qap";
import { DEFAULT_SA_PARAMS } from "@/lib/algorithms/sa";
import { HybridLabLayout } from "@/components/layout/HybridLabLayout";
import { CodeDeck } from "@/components/ui/CodeDeck";
import { VideoPlayer } from "@/components/ui/VideoPlayer";

export default function Greedy() {
    const [instance] = useState<QAPInstance>(NUG5);
    // Reusing SA hook for visualizer grid state, even if we don't run it
    const { currentStep } = useSimulatedAnnealing(instance, DEFAULT_SA_PARAMS);

    const videoSrc = "/content/mbhb/mod1/1.1_greedy.mp4";
    const codeSnippets = [
        {
            language: "cpp" as const,
            label: "Evaluación Delta",
            code: `int delta_cost(int i, int j, const vector<int>& p) {
    int delta = 0;
    // Calcular solo la diferencia de arcos afectados
    // O(n) en lugar de O(n²) de la función completa
    for (int k = 0; k < n; k++) {
        if (k != i && k != j) {
            delta += (flow[i][k] - flow[j][k]) * 
                     (dist[p[j]][p[k]] - dist[p[i]][p[k]]);
            // ... (términos simétricos)
        }
    }
    return delta;
}`
        },
        {
            language: "cpp" as const,
            label: "Algoritmo Greedy (Constructivo)",
            code: `vector<int> greedy_constructive() {
    vector<int> p(n, -1);
    // Asignar primera facilidad/locación al azar
    // Luego elegir la siguiente que minimice el coste parcial
}`
        }
    ];

    const LeftPanelContent = (
        <div className="flex flex-col h-full gap-4">
            <div className="shrink-0">
                <h3 className="text-xs font-mono text-cyan-500 mb-2 uppercase tracking-widest">
                    Lecture: Topic 1.1
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
                        <h2 className="text-lg font-bold text-foreground">Greedy Algorithm</h2>
                        <span className="text-[10px] font-mono text-muted-foreground bg-secondary/50 px-2 py-0.5 rounded">
                            {instance.name} (n={instance.size})
                        </span>
                    </div>
                </div>

                <div className="flex gap-4 flex-1 min-h-0 justify-center items-center">
                    {/* Permutation Grid (Static or from generic hook) */}
                    <div className="panel-glass rounded-lg p-4 shrink-0">
                        <PermutationGrid
                            permutation={
                                currentStep?.permutation ??
                                Array.from({ length: instance.size }, (_, i) => i)
                            }
                        // No swap highlights for greedy initial state
                        />
                        <p className="text-center text-xs text-muted-foreground mt-4 font-mono">
                            (Visualizer Coming Soon for Greedy Step-by-Step)
                        </p>
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
