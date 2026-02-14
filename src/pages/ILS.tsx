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

    const run = () => {
        const res = runILS(instance, 25);
        setResult(res);
    };

    const reset = () => setResult(null);

    const videoSrc = "/content/mbhb/mod2/2.2_ils_vns.mp4";
    const snippets = [
        {
            language: "typescript" as const,
            label: "ILS",
            code: `// 1. Perturbación (shuffle sublista)
// 2. Búsqueda Local
// 3. Aceptación (si mejora)
const result = runILS(instance, maxIter);`
        }
    ];

    const VisualizerContent = (
        <div className="flex-1 flex flex-col min-w-0 h-full p-4 gap-4">
            <div className="flex items-center justify-between shrink-0">
                <h2 className="text-lg font-bold text-foreground">ILS Visualizer</h2>
                <div className="flex gap-2">
                    <Button onClick={run} className="gap-2">
                        <Play className="h-4 w-4" /> Run ILS
                    </Button>
                    <Button variant="outline" onClick={reset}>
                        <RotateCcw className="h-4 w-4" />
                    </Button>
                </div>
            </div>
            <div className="flex-1 grid grid-cols-2 gap-4 min-h-0">
                <div className="panel-glass rounded-lg p-4 flex flex-col items-center justify-center">
                    <h3 className="text-sm font-semibold mb-4 text-primary">
                        {result ? `Best Cost: ${result.cost}` : "Ready"}
                    </h3>
                    <PermutationGrid
                        permutation={result?.permutation ?? Array.from({ length: instance.size }, (_, i) => i)}
                    />
                </div>
                <div className="panel-glass rounded-lg p-4 overflow-y-auto font-mono text-xs">
                    <h3 className="text-sm font-semibold mb-2 text-primary">Execution Log</h3>
                    {result?.history.map((entry, idx) => (
                        <div key={idx} className="mb-2 p-2 border-b border-border">
                            <div className="flex justify-between text-muted-foreground">
                                <span>Iter {entry.iter}</span>
                                <span>Cost: {entry.cost}</span>
                            </div>
                        </div>
                    ))}
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
                            <p>Búsqueda Local Reiterada.</p>
                        </div>
                    }
                    code={<CodeDeck snippets={snippets} />}
                    visualizer={VisualizerContent}
                />
            </div>
        </AppLayout>
    );
}
