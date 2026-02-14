import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { TabbedLabLayout } from "@/components/layout/TabbedLabLayout";
import { PermutationGrid } from "@/components/visualizer/PermutationGrid";
import { NUG5 } from "@/data/benchmarks";
import { QAPInstance } from "@/lib/algorithms/qap";
import { runGRASP } from "@/lib/algorithms/multiStart";
import { VideoPlayer } from "@/components/ui/VideoPlayer";
import { CodeDeck } from "@/components/ui/CodeDeck";
import { Button } from "@/components/ui/button";
import { Play, RotateCcw } from "lucide-react";

export default function GRASPPage() {
    const [instance] = useState<QAPInstance>(NUG5);
    const [result, setResult] = useState<{ permutation: number[]; cost: number; history: any[] } | null>(null);
    const [isRunning, setIsRunning] = useState(false);

    const handleRun = async () => {
        setIsRunning(true);
        // Small delay to allow UI update
        await new Promise(r => setTimeout(r, 100));

        const res = runGRASP(instance, 10, 0.3); // 10 iters, alpha 0.3
        setResult(res);
        setIsRunning(false);
    };

    const videoSrc = "/content/mbhb/mod2/2.1_grasp.mp4";
    const snippets = [
        {
            language: "typescript" as const,
            label: "GRASP Constructive (Alpha=0.3)",
            code: `// Lista de Candidatos Restringida (RCL)
const lrcSize = Math.max(1, Math.floor(alpha * n));

// Para cada unidad (ordenada por flujo):
// 1. Identificar 'lrcSize' mejores ubicaciones disponibles (menor potencial distancia)
const candidates = availableLocs.slice(0, lrcSize);

// 2. Elegir una al azar
const chosen = candidates[Math.floor(Math.random() * candidates.length)];`
        },
        {
            language: "typescript" as const,
            label: "First Improvement LS",
            code: `// Barajar pares para evitar sesgo
shuffle(pairs);

for (const [r, s] of pairs) {
    if (delta(r, s) < 0) {
        swap(r, s);
        return; // Aceptar PRIMERA mejora y reiniciar
    }
}`
        }
    ];

    const VisualizerContent = (
        <div className="flex-1 flex flex-col min-w-0 h-full p-4 gap-4">
            <div className="flex items-center justify-between shrink-0">
                <h2 className="text-lg font-bold text-foreground">GRASP Visualizer</h2>
                <div className="flex gap-2">
                    <Button onClick={handleRun} disabled={isRunning} className="gap-2">
                        <Play className="h-4 w-4" />
                        {isRunning ? "Running..." : "Run GRASP"}
                    </Button>
                    <Button variant="outline" onClick={() => setResult(null)} disabled={isRunning}>
                        <RotateCcw className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            <div className="flex-1 grid grid-cols-2 gap-4 min-h-0">
                {/* Current Best Solution */}
                <div className="panel-glass rounded-lg p-4 flex flex-col items-center justify-center">
                    <h3 className="text-sm font-semibold mb-4 text-purple-400">
                        {result ? `Best Found (Cost: ${result.cost})` : "Ready to Start"}
                    </h3>
                    <PermutationGrid
                        permutation={result?.permutation ?? Array.from({ length: instance.size }, (_, i) => i)}
                    />
                </div>

                {/* History / Log */}
                <div className="panel-glass rounded-lg p-4 overflow-y-auto font-mono text-xs">
                    <h3 className="text-sm font-semibold mb-2 text-cyan-400">Execution Log</h3>
                    {result?.history.map((entry, idx) => (
                        <div key={idx} className="mb-2 p-2 border-b border-white/5">
                            <div className="flex justify-between text-muted-foreground">
                                <span>Iter {entry.iter + 1}</span>
                                <span>Evals: {entry.evals}</span>
                            </div>
                            <div className="flex justify-between mt-1">
                                <span>Constructive: {entry.constructiveCost}</span>
                                <span className="text-green-400">Improved: {entry.improvedCost}</span>
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
                            <h1>GRASP</h1>
                            <p>Greedy Randomized Adaptive Search Procedure.</p>
                            <ul>
                                <li><strong>Fase Constructiva:</strong> Construye una solución paso a paso, pero eligiendo aleatoriamente entre los mejores candidatos (RCL).</li>
                                <li><strong>Fase de Mejora:</strong> Aplica búsqueda local a la solución construida.</li>
                            </ul>
                            <p>El parámetro <code>alpha</code> controla la aleatoriedad (0 = Greedy Puro, 1 = Aleatorio).</p>
                        </div>
                    }
                    code={<CodeDeck snippets={snippets} />}
                    visualizer={VisualizerContent}
                />
            </div>
        </AppLayout>
    );
}
