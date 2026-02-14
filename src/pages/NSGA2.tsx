import { useState, useRef, useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { TabbedLabLayout } from "@/components/layout/TabbedLabLayout";
import { NUG5 } from "@/data/benchmarks";
import { QAPInstance } from "@/lib/algorithms/qap";
import { runNSGA2Gen, MultiObjYield } from "@/lib/algorithms/evolutionary";
import { VideoPlayer } from "@/components/ui/VideoPlayer";
import { CodeDeck } from "@/components/ui/CodeDeck";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw } from "lucide-react";
import { ScatterChart, Scatter, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function NSGA2Page() {
    const [instance] = useState<QAPInstance>(NUG5);
    const [currentState, setCurrentState] = useState<MultiObjYield | null>(null);
    const [isRunning, setIsRunning] = useState(false);
    const generatorRef = useRef<Generator<MultiObjYield, void, void> | null>(null);
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
                // Bi-Objective QAP
                generatorRef.current = runNSGA2Gen(instance, 50, 50);
            }
            intervalRef.current = setInterval(() => {
                if (!generatorRef.current) return;
                const next = generatorRef.current.next();
                if (next.done) {
                    stop();
                } else if (next.value) {
                    setCurrentState(next.value as MultiObjYield);
                }
            }, 100);
        }
    };

    useEffect(() => {
        return () => stop();
    }, []);

    const videoSrc = "/content/mbhb/mod2/2.7_multiobjective.mp4"; // Placeholder
    const snippets = [
        {
            language: "typescript" as const,
            label: "Fast Non-Dominated Sort",
            code: `// Clasificar en Fronteras (F1, F2...)
// F1: Soluciones no dominadas por nadie
// F2: Dominadas solo por F1, etc.
const fronts = nonDominatedSort(pop);

// Crowding Distance
// Para desempatar en la misma frontera, 
// preferimos las que están más aisladas.`
        }
    ];

    // Prepare data for chart
    const data = currentState?.fronts.flatMap((front, fIdx) =>
        front.map(ind => ({
            x: ind.cost1,
            y: ind.cost2,
            front: fIdx,
            fill: fIdx === 0 ? '#10b981' : (fIdx === 1 ? '#3b82f6' : '#6b7280'),
            opacity: fIdx === 0 ? 1 : 0.5
        }))
    ) || [];

    const VisualizerContent = (
        <div className="flex-1 flex flex-col min-w-0 h-full p-4 gap-4">
            <div className="flex items-center justify-between shrink-0">
                <h2 className="text-lg font-bold text-foreground">NSGA-II (Multiobjective)</h2>
                <div className="flex gap-2">
                    <Button onClick={toggleRun} className="gap-2">
                        {isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                        {isRunning ? "Pause" : "Run NSGA-II"}
                    </Button>
                    <Button variant="outline" onClick={reset}>
                        <RotateCcw className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            <div className="flex-1 min-h-0 flex flex-col items-center justify-center p-4 panel-glass rounded-lg">
                <h3 className="text-sm font-semibold mb-2 text-cyan-400">Objective Space (Pareto Front)</h3>
                <div className="w-full h-full min-h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                            <XAxis type="number" dataKey="x" name="Cost 1 (Flow A)" stroke="#94a3b8" />
                            <YAxis type="number" dataKey="y" name="Cost 2 (Flow B)" stroke="#94a3b8" />
                            <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ backgroundColor: '#1e293b', border: 'none' }} />
                            <Scatter name="Solutions" data={data}>
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.fill} fillOpacity={entry.opacity} />
                                ))}
                            </Scatter>
                        </ScatterChart>
                    </ResponsiveContainer>
                </div>
                <div className="mt-2 text-xs text-muted-foreground text-center">
                    <span className="text-emerald-400 font-bold">Green: Pareto Front (F1)</span> |
                    <span className="text-blue-400"> Blue: F2</span> |
                    <span className="text-gray-400"> Gray: Dominated</span>
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
                            <h1>NSGA-II</h1>
                            <p>Non-dominated Sorting Genetic Algorithm II.</p>
                            <ul>
                                <li><strong>Objetivo:</strong> Minimizar Coste 1 y Coste 2 simultáneamente.</li>
                                <li><strong>Dominancia:</strong> Una solución domina a otra si es mejor en todo.</li>
                                <li><strong>Frontera de Pareto:</strong> Conjunto de soluciones de "compromiso" óptimo (nadie las domina).</li>
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
