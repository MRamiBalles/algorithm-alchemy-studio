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

export default function LocalSearch() {
    const [instance] = useState<QAPInstance>(NUG5);
    const { currentStep } = useSimulatedAnnealing(instance, DEFAULT_SA_PARAMS);

    const videoSrc = "/content/mbhb/mod1/1.2_local_search.mp4";
    const codeSnippets = [
        {
            language: "cpp" as const,
            label: "Operador 2-Opt (C++)",
            code: `void swap_move(vector<int>& p, int i, int j) {
    int temp = p[i];
    p[i] = p[j];
    p[j] = temp;
}`
        },
        {
            language: "python" as const,
            label: "Operador 2-Opt (Python)",
            code: `def swap_move(p, i, j):
    # Intercambio simple en Python
    p[i], p[j] = p[j], p[i]`
        },
        {
            language: "cpp" as const,
            label: "Búsqueda Local (C++)",
            code: `bool improve = true;
while (improve) {
    improve = false;
    for (int i=0; i<n; i++) {
        for (int j=i+1; j<n; j++) {
            if (delta_cost(i, j) < 0) {
                apply_swap(i, j);
                improve = true;
                break; // Primer Vecino (First Improvement)
            }
        }
    }
}`
        },
        {
            language: "python" as const,
            label: "Búsqueda Local (Python)",
            code: `improve = True
while improve:
    improve = False
    for i in range(n):
        for j in range(i + 1, n):
            # Evaluamos el vecino con Delta
            if delta_cost(i, j) < 0:
                swap_move(p, i, j)
                improve = True
                break # First Improvement`
        }
    ];

    const LeftPanelContent = (
        <div className="flex flex-col h-full gap-4">
            <div className="shrink-0">
                <h3 className="text-xs font-mono text-cyan-500 mb-2 uppercase tracking-widest">
                    Lecture: Topic 1.2
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
                        <h2 className="text-lg font-bold text-foreground">Local Search (Hill Climbing)</h2>
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
                            (Visualizer Reused from SA Module)
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
