import { useState, useRef, useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { TabbedLabLayout } from "@/components/layout/TabbedLabLayout";
import { PermutationGrid } from "@/components/visualizer/PermutationGrid";
import { NUG5 } from "@/data/benchmarks";
import { QAPInstance } from "@/lib/algorithms/qap";
import { runMultimodalGen, EvoYield } from "@/lib/algorithms/evolutionary";
import { VideoPlayer } from "@/components/ui/VideoPlayer";
import { CodeDeck } from "@/components/ui/CodeDeck";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw } from "lucide-react";

export default function MultimodalPage() {
    const [instance] = useState<QAPInstance>(NUG5);
    const [currentState, setCurrentState] = useState<EvoYield | null>(null);
    const [isRunning, setIsRunning] = useState(false);
    const generatorRef = useRef<Generator<EvoYield, void, void> | null>(null);
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
                // Radius auto-calculated inside as n/3
                generatorRef.current = runMultimodalGen(instance, 60, 100);
            }
            intervalRef.current = setInterval(() => {
                if (!generatorRef.current) return;
                const next = generatorRef.current.next();
                if (next.done) {
                    stop();
                } else if (next.value) {
                    setCurrentState(next.value as EvoYield);
                }
            }, 100);
        }
    };

    useEffect(() => {
        return () => stop();
    }, []);

    const videoSrc = "/content/mbhb/mod2/2.5_clearing.mp4"; // Hypothetical video path
    const snippets = [
        {
            language: "typescript" as const,
            label: "Clearing Logic",
            code: `// Si un individuo está cerca de uno mejor (radius), muere.
if (dist < radius) {
    if (winners < capacity) {
        winners++;
    } else {
        population[j].cost = Infinity; // Clearing
    }
}`
        }
    ];

    // Calculate active niches (non-infinite costs)
    const activeNiches = currentState?.population.filter(p => p.cost !== Infinity).length ?? 0;

    const VisualizerContent = (
        <div className="flex-1 flex flex-col min-w-0 h-full p-4 gap-4">
            <div className="flex items-center justify-between shrink-0">
                <h2 className="text-lg font-bold text-foreground">Multimodal GA (Clearing)</h2>
                <div className="flex gap-2">
                    <Button onClick={toggleRun} className="gap-2">
                        {isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                        {isRunning ? "Pause" : "Run Clearing"}
                    </Button>
                    <Button variant="outline" onClick={reset}>
                        <RotateCcw className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            <div className="flex-1 grid grid-cols-2 gap-4 min-h-0">
                <div className="panel-glass rounded-lg p-4 flex flex-col items-center justify-center relative">
                    <h3 className="text-sm font-semibold mb-4 text-purple-400">
                        {currentState ? `Best Cost: ${currentState.bestCost}` : "Ready"}
                    </h3>
                    <PermutationGrid
                        permutation={currentState?.bestPermutation ?? Array.from({ length: instance.size }, (_, i) => i)}
                    />
                    <div className="mt-4 flex gap-4 text-xs">
                        <span className="text-blue-400 font-bold">Active Niches: {activeNiches}</span>
                        <span className="text-muted-foreground">Gen: {currentState?.generation}</span>
                    </div>
                </div>

                <div className="panel-glass rounded-lg p-4 overflow-y-auto font-mono text-xs">
                    <h3 className="text-sm font-semibold mb-2 text-cyan-400">Clearing Log</h3>
                    {currentState?.description && (
                        <div className="mb-4 p-2 bg-blue-500/20 text-blue-200 rounded border border-blue-500/30">
                            {currentState.description}
                        </div>
                    )}
                    {currentState?.history.slice(-10).reverse().map((entry, idx) => (
                        <div key={idx} className="mb-2 p-2 border-b border-white/5">
                            <div className="flex justify-between text-muted-foreground">
                                <span>Gen {entry.gen}</span>
                                <span className="text-red-400">Cleared: {entry.cleared}</span>
                            </div>
                            <div className="text-right text-green-400">
                                Best: {entry.best}
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
                            <h1>Clearing (Niching)</h1>
                            <p>Técnica para encontrar múltiples óptimos locales (Picos).</p>
                            <ul>
                                <li><strong>Ordenamiento:</strong> La población se ordena por fitness.</li>
                                <li><strong>Dominancia:</strong> El mejor de una zona (radio $n/3$) anula a sus vecinos.</li>
                                <li><strong>Efecto:</strong> Se mantienen subpoblaciones diversas en distintos valles del espacio de búsqueda.</li>
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
