import { useState, useRef, useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { TabbedLabLayout } from "@/components/layout/TabbedLabLayout";
import { PermutationGrid } from "@/components/visualizer/PermutationGrid";
import { NUG5 } from "@/data/benchmarks";
import { QAPInstance } from "@/lib/algorithms/qap";
import { runMemeticGen, EvoYield } from "@/lib/algorithms/evolutionary";
import { VideoPlayer } from "@/components/ui/VideoPlayer";
import { CodeDeck } from "@/components/ui/CodeDeck";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw } from "lucide-react";

export default function MemeticPage() {
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
                // GA + 1000 step LS
                generatorRef.current = runMemeticGen(instance, 30, 50, 500);
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

    const videoSrc = "/content/mbhb/mod2/2.6_memeticing.mp4"; // Placeholder
    const snippets = [
        {
            language: "typescript" as const,
            label: "Memetic Hybridization",
            code: `// Por cada hijo generado:
const child = crossover(p1, p2);
const mutant = mutation(child);

// APLICAR MEJORA LOCAL (Lamarckian)
// El individuo "aprende" y mejora su propio ADN
const improved = localSearch(mutant);

population.push(improved);`
        }
    ];

    const VisualizerContent = (
        <div className="flex-1 flex flex-col min-w-0 h-full p-4 gap-4">
            <div className="flex items-center justify-between shrink-0">
                <h2 className="text-lg font-bold text-foreground">Memetic Algorithm (MA)</h2>
                <div className="flex gap-2">
                    <Button onClick={toggleRun} className="gap-2">
                        {isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                        {isRunning ? "Pause" : "Run MA"}
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
                    {currentState?.phase === 'memetic' && (
                        <div className="absolute top-2 right-2 flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-yellow-400 animate-ping" />
                            <span className="text-xs text-yellow-400 font-mono">Learning...</span>
                        </div>
                    )}
                </div>

                <div className="panel-glass rounded-lg p-4 overflow-y-auto font-mono text-xs">
                    <h3 className="text-sm font-semibold mb-2 text-cyan-400">Hybrid Log</h3>
                    {currentState?.description && (
                        <div className="mb-4 p-2 bg-yellow-500/20 text-yellow-200 rounded border border-yellow-500/30">
                            {currentState.description}
                        </div>
                    )}
                    {currentState?.history.slice(-10).reverse().map((entry, idx) => (
                        <div key={idx} className="mb-2 p-2 border-b border-white/5">
                            <div className="flex justify-between text-muted-foreground">
                                <span>Gen {entry.gen}</span>
                                <span className="text-green-400">Best: {entry.best}</span>
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
                            <h1>Algoritmos Meméticos</h1>
                            <p>Hibridación de Evolución Global con Búsqueda Local.</p>
                            <ul>
                                <li><strong>Metáfora Cultural:</strong> La evolución de las ideas (memes) es más rápida que la de los genes.</li>
                                <li><strong>Lamarckismo:</strong> Sinergia donde los individuos mejoran durante su vida (Local Search) y transmiten esa mejora.</li>
                                <li><strong>Intensificación:</strong> La Búsqueda Local refina lo que el Genético explora.</li>
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
