import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { TabbedLabLayout } from "@/components/layout/TabbedLabLayout";
import { PermutationGrid } from "@/components/visualizer/PermutationGrid";
import { NUG5 } from "@/data/benchmarks";
import { QAPInstance } from "@/lib/algorithms/qap";
import { runILS } from "@/lib/algorithms/multiStart";
import { VideoPlayer } from "@/components/ui/VideoPlayer";
import { CodeDeck } from "@/components/ui/CodeDeck";
import { Button } from "@/components/ui/button";
import { Play, RotateCcw } from "lucide-react";

export default function ILSPage() {
    const [instance] = useState<QAPInstance>(NUG5);
    const [result, setResult] = useState<{ permutation: number[]; cost: number; history: any[] } | null>(null);
    const [isRunning, setIsRunning] = useState(false);

    const handleRun = async () => {
        setIsRunning(true);
        await new Promise(r => setTimeout(r, 100));

        const res = runILS(instance, 25); // 25 iters
        setResult(res);
        setIsRunning(false);
    };

    const videoSrc = "/content/mbhb/mod2/2.2_ils_vns.mp4";
    const snippets = [
        {
            language: "typescript" as const,
            label: "ILS Perturbation (Shuffle)",
            code: `// Perturbación: Shuffle de sublista tamaño n/4
const mutationSize = Math.max(2, Math.floor(n / 4));
const mutatedPerm = shuffleSublist(currentPerm, mutationSize);

// Búsqueda Local desde el punto perturbado
const result = localSearchFirstImprovement(instance, mutatedPerm);`
        },
        {
            language: "typescript" as const,
            label: "Acceptance Criterion (Better)",
            code: `// Solo aceptamos si mejora estrictamente (High Exploitation)
if (result.cost < currentCost) {
    currentPerm = result.permutation;
    currentCost = result.cost;
}`
        }
    ];

    const VisualizerContent = (
        <div className="flex-1 flex flex-col min-w-0 h-full p-4 gap-4">
            <div className="flex items-center justify-between shrink-0">
                <h2 className="text-lg font-bold text-foreground">ILS Visualizer</h2>
                <div className="flex gap-2">
                    <Button onClick={handleRun} disabled={isRunning} className="gap-2">
                        <Play className="h-4 w-4" />
                        {isRunning ? "Running..." : "Run ILS"}
                    </Button>
                    <Button variant="outline" onClick={() => setResult(null)} disabled={isRunning}>
                        <RotateCcw className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            <div className="flex-1 grid grid-cols-2 gap-4 min-h-0">
                <div className="panel-glass rounded-lg p-4 flex flex-col items-center justify-center">
                    <h3 className="text-sm font-semibold mb-4 text-purple-400">
                        {result ? `Best Found (Cost: ${result.cost})` : "Ready to Start"}
                    </h3>
                    <PermutationGrid
                        permutation={result?.permutation ?? Array.from({ length: instance.size }, (_, i) => i)}
                    />
                </div>

                <div className="panel-glass rounded-lg p-4 overflow-y-auto font-mono text-xs">
                    <h3 className="text-sm font-semibold mb-2 text-cyan-400">Execution Log</h3>
                    {result?.history.map((entry, idx) => (
                        <div key={idx} className="mb-2 p-2 border-b border-white/5">
                            <div className="flex justify-between text-muted-foreground">
                                <span>Iter {entry.iter}</span>
                                <span>Cost: {entry.cost}</span>
                            </div>
                        </div>
                    ))}
                    {!result && <div className="text-muted-foreground italic">Click Run to start...</div>}
                </div>
            </div>
        </div>
    );

    return (
        <AppLayout>
            <div className="flex-1 flex min-h-0 overflow-hidden">
                <TabbedLabLayout
                    video={<VideoPlayer src={videoSrc} />}
                    theory={
                        <div className="p-8 prose prose-invert max-w-none">
                            <h1>Iterated Local Search (ILS)</h1>
                            <p>Estrategia de "Paracaidistas" (Reinicio Suave).</p>
                            <ul>
                                <li><strong>Búsqueda Local:</strong> Encuentra un óptimo local.</li>
                                <li><strong>Perturbación:</strong> Aplica un cambio aleatorio (Shuffle) para escapar del valle.</li>
                                <li><strong>Reinicio:</strong> Vuelve a aplicar Búsqueda Local desde el nuevo punto.</li>
                            </ul>
                        </div>
                    }
                    code={<CodeDeck snippets={snippets} />}
                    visualizer={VisualizerContent}
                />
            </div>
        </AppLayout>
    );
}
