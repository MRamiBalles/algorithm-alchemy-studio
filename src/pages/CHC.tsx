import { useState, useRef, useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { TabbedLabLayout } from "@/components/layout/TabbedLabLayout";
import { PermutationGrid } from "@/components/visualizer/PermutationGrid";
import { NUG5 } from "@/data/benchmarks";
import { QAPInstance } from "@/lib/algorithms/qap";
import { runCHCGen, EvoYield } from "@/lib/algorithms/evolutionary";
import { VideoPlayer } from "@/components/ui/VideoPlayer";
import { CodeDeck } from "@/components/ui/CodeDeck";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw } from "lucide-react";

export default function CHCPage() {
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
                generatorRef.current = runCHCGen(instance, 50, 50000);
            }
            intervalRef.current = setInterval(() => {
                if (!generatorRef.current) return;
                const next = generatorRef.current.next();
                if (next.done) {
                    stop();
                } else {
                    setCurrentState(next.value);
                }
            }, 100);
        }
    };

    useEffect(() => {
        return () => stop();
    }, []);

    const videoSrc = "/content/mbhb/mod2/2.4_chc.mp4";
    const snippets = [
        {
            language: "typescript" as const,
            label: "Incest Prevention (Threshold)",
            code: `// Solo cruzar si son muy distintos
const dist = hamming(p1, p2);
if (dist > threshold) {
    offspring.push(crossover(p1, p2));
}

// Si nadie se cruza (población convergida):
threshold--;`
        },
        {
            language: "typescript" as const,
            label: "Cataclysmic Restart",
            code: `if (threshold === 0) {
    // Reinicio Cataclísmico
    // 1. Guardar SOLO al mejor
    const best = population[0];
    
    // 2. Rellenar resto con copias muy mutadas (35% perturbación)
    population = [best, ...mutatedClones(best, 0.35)];
    
    // 3. Reiniciar Threshold
    threshold = initialThreshold;
}`
        }
    ];

    const VisualizerContent = (
        <div className="flex-1 flex flex-col min-w-0 h-full p-4 gap-4">
            <div className="flex items-center justify-between shrink-0">
                <h2 className="text-lg font-bold text-foreground">CHC Algorithm</h2>
                <div className="flex gap-2">
                    <Button onClick={toggleRun} className="gap-2">
                        {isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                        {isRunning ? "Pause" : "Run CHC"}
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
                    {currentState?.phase === 'restart' && (
                        <div className="absolute inset-0 flex items-center justify-center bg-red-500/20 animate-pulse rounded-lg">
                            <span className="text-red-200 font-bold text-xl uppercase tracking-widest bg-black/50 px-4 py-2 rounded">
                                Cataclysm!
                            </span>
                        </div>
                    )}
                </div>

                <div className="panel-glass rounded-lg p-4 overflow-y-auto font-mono text-xs">
                    <h3 className="text-sm font-semibold mb-2 text-cyan-400">Evolution Log</h3>
                    {currentState?.description && (
                        <div className={`mb-4 p-2 rounded border ${currentState.phase === 'restart'
                                ? 'bg-red-500/20 text-red-200 border-red-500/30'
                                : 'bg-orange-500/20 text-orange-200 border-orange-500/30'
                            }`}>
                            {currentState.description}
                        </div>
                    )}
                    {currentState?.history.slice(-10).reverse().map((entry, idx) => (
                        <div key={idx} className="mb-2 p-2 border-b border-white/5">
                            <div className="flex justify-between text-muted-foreground">
                                <span>Gen {entry.gen}</span>
                                <span className="text-orange-400">Best: {entry.best}</span>
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
                            <h1>CHC Algorithm</h1>
                            <p>Cross-Generational elitist selection, Heterogeneous recombination, Cataclysmic mutation.</p>
                            <ul>
                                <li><strong>Selección Elitista (C):</strong> Los N mejores de Padres + Hijos pasan.</li>
                                <li><strong>Prevensión Incesto (H):</strong> Solo cruza si $dist > d$. Si no, baja $d$.</li>
                                <li><strong>Reinicio Cataclísmico (C):</strong> Cuando $d=0$ (convergencia), reinicia la población mutando drásticamente al mejor.</li>
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
