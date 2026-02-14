import { useState, useRef, useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { TabbedLabLayout } from "@/components/layout/TabbedLabLayout";
import { PermutationGrid } from "@/components/visualizer/PermutationGrid";
import { NUG5 } from "@/data/benchmarks";
import { QAPInstance } from "@/lib/algorithms/qap";
import { runVNSGen, MultiStartYield } from "@/lib/algorithms/multiStart";
import { VideoPlayer } from "@/components/ui/VideoPlayer";
import { CodeDeck } from "@/components/ui/CodeDeck";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw } from "lucide-react";

export default function VNSPage() {
    const [instance] = useState<QAPInstance>(NUG5);
    const [currentState, setCurrentState] = useState<MultiStartYield | null>(null);
    const [isRunning, setIsRunning] = useState(false);
    const generatorRef = useRef<Generator<MultiStartYield, void, void> | null>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const stop = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = null;
        setIsRunning(false);
    };

    const reset = () => {
        stop();
        setCurrentState(null);
        generatorRef.current = null;
    };

    const toggleRun = () => {
        if (isRunning) {
            stop();
        } else {
            setIsRunning(true);
            if (!generatorRef.current) {
                // Reduced evals for visual demo
                generatorRef.current = runVNSGen(instance, 10000, 5);
            }
            intervalRef.current = setInterval(() => {
                if (!generatorRef.current) return;
                const next = generatorRef.current.next();
                if (next.done) {
                    stop();
                } else {
                    setCurrentState(next.value);
                }
            }, 50);
        }
    };

    useEffect(() => {
        return () => stop();
    }, []);

    const videoSrc = "/content/mbhb/mod2/2.2_ils_vns.mp4";
    const snippets = [
        {
            language: "typescript" as const,
            label: "Variable Neighborhood (Generator)",
            code: `// Shaking con tamaño dependiente de k
const mutationSize = Math.max(2, Math.floor(n / (9-k)));
yield { phase: 'shaking', description: \`k=\${k} Shaking\` };

// Búsqueda Local
yield* mapLSSteps(localSearchGen(...));

// Cambio de Entorno
if (mejora) k = 1; else k++;`
        }
    ];

    const VisualizerContent = (
        <div className="flex-1 flex flex-col min-w-0 h-full p-4 gap-4">
            <div className="flex items-center justify-between shrink-0">
                <h2 className="text-lg font-bold text-foreground">VNS Visualizer</h2>
                <div className="flex gap-2">
                    <Button onClick={toggleRun} className="gap-2">
                        {isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                        {isRunning ? "Pause" : "Run VNS"}
                    </Button>
                    <Button variant="outline" onClick={reset}>
                        <RotateCcw className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            <div className="flex-1 grid grid-cols-2 gap-4 min-h-0">
                <div className="panel-glass rounded-lg p-4 flex flex-col items-center justify-center relative">
                    <h3 className="text-sm font-semibold mb-4 text-purple-400">
                        {currentState ? `Cost: ${currentState.cost}` : "Ready"}
                    </h3>
                    {currentState?.phase && (
                        <span className="absolute top-2 right-2 text-xs px-2 py-1 bg-white/10 rounded font-mono text-emerald-400">
                            State: {currentState.phase}
                        </span>
                    )}
                    <PermutationGrid
                        permutation={currentState?.permutation ?? Array.from({ length: instance.size }, (_, i) => i)}
                    />
                </div>

                <div className="panel-glass rounded-lg p-4 overflow-y-auto font-mono text-xs">
                    <h3 className="text-sm font-semibold mb-2 text-cyan-400">Execution Log</h3>
                    {currentState?.description && (
                        <div className="mb-4 p-2 bg-emerald-500/20 text-emerald-200 rounded border border-emerald-500/30">
                            {currentState.description}
                        </div>
                    )}
                    {currentState?.history.map((entry, idx) => (
                        <div key={idx} className="mb-2 p-2 border-b border-white/5">
                            <div className="flex justify-between text-muted-foreground">
                                <span>k={entry.k}</span>
                                <span>Evals: {entry.evals}</span>
                            </div>
                            <div className="text-right text-green-400">
                                Cost: {entry.cost}
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
                            <h1>Variable Neighborhood Search (VNS)</h1>
                            <p>Búsqueda de Entorno Variable.</p>
                            <ul>
                                <li><strong>k=1..kMax:</strong> El tamaño del entorno crece si no hay mejora.</li>
                                <li><strong>Shaking:</strong> Perturbación controlada para salir de óptimos locales.</li>
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
