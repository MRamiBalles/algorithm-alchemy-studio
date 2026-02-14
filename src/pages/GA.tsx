import { useState, useRef, useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { TabbedLabLayout } from "@/components/layout/TabbedLabLayout";
import { PermutationGrid } from "@/components/visualizer/PermutationGrid";
import { NUG5 } from "@/data/benchmarks";
import { QAPInstance } from "@/lib/algorithms/qap";
import { runGAGen, EvoYield } from "@/lib/algorithms/evolutionary";
import { VideoPlayer } from "@/components/ui/VideoPlayer";
import { CodeDeck } from "@/components/ui/CodeDeck";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw } from "lucide-react";

export default function GAPage() {
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
                // PopSize 50, 100 Gens, 0.1 Mut
                generatorRef.current = runGAGen(instance, 50, 100, 0.1);
            }
            intervalRef.current = setInterval(() => {
                if (!generatorRef.current) return;
                const next = generatorRef.current.next();
                if (next.done) {
                    stop();
                } else {
                    setCurrentState(next.value);
                }
            }, 100); // Slower for GA generations
        }
    };

    useEffect(() => {
        return () => stop();
    }, []);

    const videoSrc = "/content/mbhb/mod2/2.3_geneticos.mp4";
    const snippets = [
        {
            language: "typescript" as const,
            label: "Order Crossover (OX)",
            code: `// Mantiene adyacencias relativas
// 1. Copiar segmento aleatorio de P1 a Hijo
const segment = p1.slice(cut1, cut2);
child.set(segment, cut1);

// 2. Rellenar huecos con orden de P2
for (const gene of p2) {
    if (!segment.includes(gene)) {
        child[nextEmpty] = gene;
    }
}`
        },
        {
            language: "typescript" as const,
            label: "Tournament Selection",
            code: `// Selección por Torneo (k=2)
const p1 = tournament(pop);
const p2 = tournament(pop);
// Elitism: Mejores siempre pasan`
        }
    ];

    const VisualizerContent = (
        <div className="flex-1 flex flex-col min-w-0 h-full p-4 gap-4">
            <div className="flex items-center justify-between shrink-0">
                <h2 className="text-lg font-bold text-foreground">Genetic Algorithm</h2>
                <div className="flex gap-2">
                    <Button onClick={toggleRun} className="gap-2">
                        {isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                        {isRunning ? "Pause" : "Run GA"}
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
                    <div className="mt-4 text-xs text-muted-foreground">
                        Generation: {currentState?.generation}
                    </div>
                </div>

                <div className="panel-glass rounded-lg p-4 overflow-y-auto font-mono text-xs">
                    <h3 className="text-sm font-semibold mb-2 text-cyan-400">Evolution Log</h3>
                    {currentState?.description && (
                        <div className="mb-4 p-2 bg-purple-500/20 text-purple-200 rounded border border-purple-500/30">
                            {currentState.description}
                        </div>
                    )}
                    {currentState?.history.slice(-10).reverse().map((entry, idx) => (
                        <div key={idx} className="mb-2 p-2 border-b border-white/5">
                            <div className="flex justify-between text-muted-foreground">
                                <span>Gen {entry.gen}</span>
                                <span className="text-purple-400">Best: {entry.best}</span>
                            </div>
                            <div className="text-right text-muted-foreground/50 text-[10px]">
                                Avg: {entry.avg.toFixed(1)}
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
                            <h1>Algoritmo Genético (AG)</h1>
                            <p>Evolución simulada con poblaciones.</p>
                            <ul>
                                <li><strong>Selección:</strong> Torneo Binario (presión selectiva moderada).</li>
                                <li><strong>Cruce:</strong> OX (Order Crossover) para preservar orden relativo.</li>
                                <li><strong>Mutación:</strong> Swap aleatorio ($p_m = 0.1$).</li>
                                <li><strong>Elitismo:</strong> Los 2 mejores siempre sobreviven.</li>
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
