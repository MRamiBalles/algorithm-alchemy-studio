import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { TabbedLabLayout } from "@/components/layout/TabbedLabLayout";
import { PermutationGrid } from "@/components/visualizer/PermutationGrid";
import { NUG5 } from "@/data/benchmarks";
import { QAPInstance } from "@/lib/algorithms/qap";
import { runVNS } from "@/lib/algorithms/multiStart";
import { VideoPlayer } from "@/components/ui/VideoPlayer";
import { CodeDeck } from "@/components/ui/CodeDeck";
import { Button } from "@/components/ui/button";
import { Play, RotateCcw } from "lucide-react";

export default function VNSPage() {
    const [instance] = useState<QAPInstance>(NUG5);
    const [result, setResult] = useState<{ permutation: number[]; cost: number; history: any[] } | null>(null);

    const run = () => {
        const res = runVNS(instance, 10000, 5);
        setResult(res);
    };

    const reset = () => setResult(null);

    const videoSrc = "/content/mbhb/mod2/2.2_ils_vns.mp4";
    const snippets = [
        {
            language: "typescript" as const,
            label: "VNS",
            code: `// Shaking con tamaño k variable
// Búsqueda Local
// Cambio de entorno: if mejora k=1 else k++
const result = runVNS(instance, maxEvals, kMax);`
        }
    ];

    const VisualizerContent = (
        <div className="flex-1 flex flex-col min-w-0 h-full p-4 gap-4">
            <div className="flex items-center justify-between shrink-0">
                <h2 className="text-lg font-bold text-foreground">VNS Visualizer</h2>
                <div className="flex gap-2">
                    <Button onClick={run} className="gap-2">
                        <Play className="h-4 w-4" /> Run VNS
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
                                <span>k={entry.k}</span>
                                <span>Evals: {entry.evals}</span>
                            </div>
                            <div className="text-right text-accent">Cost: {entry.cost}</div>
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
                            <h1>Variable Neighborhood Search (VNS)</h1>
                            <p>Búsqueda de Entorno Variable.</p>
                        </div>
                    }
                    code={<CodeDeck snippets={snippets} />}
                    visualizer={VisualizerContent}
                />
            </div>
        </AppLayout>
    );
}
