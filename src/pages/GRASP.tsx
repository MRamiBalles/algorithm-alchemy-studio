import { useState, useRef, useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { TabbedLabLayout } from "@/components/layout/TabbedLabLayout";
import { PermutationGrid } from "@/components/visualizer/PermutationGrid";
import { NUG5 } from "@/data/benchmarks";
import { QAPInstance } from "@/lib/algorithms/qap";
import { runGRASPGen, MultiStartYield } from "@/lib/algorithms/multiStart";
import { VideoPlayer } from "@/components/ui/VideoPlayer";
import { CodeDeck } from "@/components/ui/CodeDeck";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw } from "lucide-react";

export default function GRASPPage() {
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
                generatorRef.current = runGRASPGen(instance, 10, 0.3);
            }
            intervalRef.current = setInterval(() => {
                if (!generatorRef.current) return;
                const next = generatorRef.current.next();
                if (next.done) {
                    stop();
                } else {
                    setCurrentState(next.value);
                }
            }, 50); // 50ms per step
        }
    };

    useEffect(() => {
        return () => stop();
    }, []);

    const videoSrc = "/content/mbhb/mod2/2.1_grasp.mp4";
    const snippets = [
        {
            language: "typescript" as const,
            label: "GRASP Generator",
            code: `// Construcción paso a paso
yield { phase: 'construction', permutation: partialPerm };

// Búsqueda Local interactiva
const lsGenerator = localSearchGen(instance, permutation);
for (const step of lsGenerator) {
    yield { phase: 'local-search', ...step };
}`
        }
    ];

    const VisualizerContent = (
        <div className="flex-1 flex flex-col min-w-0 h-full p-4 gap-4">
            <div className="flex items-center justify-between shrink-0">
                <h2 className="text-lg font-bold text-foreground">GRASP Visualizer</h2>
                <div className="flex gap-2">
                    <Button onClick={toggleRun} className="gap-2">
                        {isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                        {isRunning ? "Pause" : "Run GRASP"}
                    </Button>
                    <Button variant="outline" onClick={reset}>
                        <RotateCcw className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            <div className="flex-1 grid grid-cols-2 gap-4 min-h-0">
                {/* Current Solution */}
                <div className="panel-glass rounded-lg p-4 flex flex-col items-center justify-center relative">
                    <h3 className="text-sm font-semibold mb-4 text-purple-400">
                        {currentState ? `Cost: ${currentState.cost}` : "Ready"}
                    </h3>
                    {currentState?.phase && (
                        <span className="absolute top-2 right-2 text-xs px-2 py-1 bg-white/10 rounded font-mono text-yellow-400">
                            State: {currentState.phase}
                        </span>
                    )}
                    <PermutationGrid
                        permutation={currentState?.permutation ?? Array.from({ length: instance.size }, (_, i) => i)}
                    />
                </div>

                {/* History / Log */}
                <div className="panel-glass rounded-lg p-4 overflow-y-auto font-mono text-xs">
                    <h3 className="text-sm font-semibold mb-2 text-cyan-400">Execution Log</h3>
                    {/* Show Live Description */}
                    {currentState?.description && (
                        <div className="mb-4 p-2 bg-blue-500/20 text-blue-200 rounded border border-blue-500/30">
                            {currentState.description}
                        </div>
                    )}

                    {currentState?.history.map((entry, idx) => (
                        <div key={idx} className="mb-2 p-2 border-b border-white/5">
                            <div className="flex justify-between text-muted-foreground">
                                <span>Iter {entry.iter + 1}</span>
                                <span>Evals: {entry.evals}</span>
                            </div>
                            <div className="flex justify-between mt-1">
                                <span>Const: {entry.constructiveCost}</span>
                                <span className="text-green-400">Imp: {entry.improvedCost}</span>
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
                            <h1>GRASP</h1>
                            <p>Greedy Randomized Adaptive Search Procedure.</p>
                            <ul>
                                <li><strong>Fase 1 (Constructiva):</strong> Solución inicial greedy-aleatoria ($\alpha=0.3$).</li>
                                <li><strong>Fase 2 (Mejora):</strong> Búsqueda Local (First Improvement).</li>
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
