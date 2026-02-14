import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { ControlPanel } from "@/components/layout/ControlPanel";
import { PropertiesPanel } from "@/components/layout/PropertiesPanel";
import { PermutationGrid } from "@/components/visualizer/PermutationGrid";
import { Thermometer } from "@/components/visualizer/Thermometer";
import { AcceptanceGraph } from "@/components/visualizer/AcceptanceGraph";
import { FormulaOverlay } from "@/components/visualizer/FormulaOverlay";
import { useSimulatedAnnealing } from "@/hooks/useSimulatedAnnealing";
import { NUG5 } from "@/data/benchmarks";
import { QAPInstance } from "@/lib/algorithms/qap";
import { SAParams, DEFAULT_SA_PARAMS, calculateInitialTemperature } from "@/lib/algorithms/sa";
import { HybridLabLayout } from "@/components/layout/HybridLabLayout";
import { CodeDeck } from "@/components/ui/CodeDeck";
import { VideoPlayer } from "@/components/ui/VideoPlayer";

export default function SimulatedAnnealing() {
  const [instance, setInstance] = useState<QAPInstance>(NUG5);
  const [params, setParams] = useState<SAParams>(DEFAULT_SA_PARAMS);

  const {
    status,
    history,
    currentStep,
    bestCost,
    speed,
    setSpeed,
    start,
    pause,
    reset,
    stepForward,
  } = useSimulatedAnnealing(instance, params);

  const initialTemp = currentStep
    ? history[0]?.temperature ?? 0
    : 0;

  // Hardcoded data for the Hybrid Lab demo
  const videoSrc = "/content/mbhb/mod1/topic1_3_sa.mp4"; // Placeholder path
  const codeSnippets = [
    {
      language: "cpp" as const,
      label: "Esquema Cauchy",
      code: `// Enfriamiento Lento
double temp = t0 / (1.0 + k);`
    },
    {
      language: "cpp" as const,
      label: "Criterio Metropolis",
      code: `// Aceptar si mejora (delta < 0) o por probabilidad
if (delta < 0 || (exp(-delta/temp) > random01())) {
    accept();
}`
    },
    {
      language: "processing" as const,
      label: "Initial Temp Formula",
      code: `T0 = (mu / -log(phi)) * initialCost;`
    }
  ];

  const LeftPanelContent = (
    <div className="flex flex-col h-full gap-4">
      {/* Video Section */}
      <div className="shrink-0">
        <h3 className="text-xs font-mono text-cyan-500 mb-2 uppercase tracking-widest">
          Lecture: Topic 1.3
        </h3>
        <VideoPlayer src={videoSrc} />
      </div>

      {/* Code Deck Section */}
      <div className="flex-1 min-h-0">
        <CodeDeck snippets={codeSnippets} />
      </div>
    </div>
  );

  const RightPanelContent = (
    <div className="flex-1 flex flex-col min-w-0 h-full">
      <div className="flex-1 relative p-4 flex flex-col gap-4 overflow-hidden h-full">
        {/* Title Bar inside Visualizer */}
        <div className="flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-bold text-foreground">Simulated Annealing</h2>
            <span className="text-[10px] font-mono text-muted-foreground bg-secondary/50 px-2 py-0.5 rounded">
              {instance.name} (n={instance.size})
            </span>
          </div>
          {bestCost < Infinity && (
            <span className="text-[10px] font-mono text-neon-green bg-neon-green/10 px-2 py-0.5 rounded">
              Best: {bestCost}
            </span>
          )}
        </div>

        {/* Visualization Area */}
        <div className="flex gap-4 flex-1 min-h-0">
          {/* Thermometer */}
          <div className="w-12 shrink-0">
            <Thermometer
              temperature={currentStep?.temperature ?? 0}
              initialTemperature={initialTemp}
            />
          </div>

          {/* Center content */}
          <div className="flex-1 flex flex-col gap-4 relative min-h-0">
            <div className="absolute inset-0 z-10 pointer-events-none">
              <FormulaOverlay
                step={currentStep}
                schedule={params.coolingSchedule}
              />
            </div>

            {/* Permutation Grid */}
            <div className="panel-glass rounded-lg p-4 shrink-0">
              <PermutationGrid
                permutation={
                  currentStep?.permutation ??
                  Array.from({ length: instance.size }, (_, i) => i)
                }
                swapI={currentStep?.swapI}
                swapJ={currentStep?.swapJ}
                accepted={currentStep?.accepted}
              />
            </div>

            {/* Acceptance Graph */}
            <div className="panel-glass rounded-lg p-4 flex-1 min-h-0">
              <div className="h-full w-full">
                <AcceptanceGraph history={history} />
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <ControlPanel
          status={status}
          onPlay={start}
          onPause={pause}
          onReset={reset}
          onStep={stepForward}
          speed={speed}
          onSpeedChange={setSpeed}
          iteration={currentStep?.iteration ?? 0}
        />
      </div>
    </div>
  );

  return (
    <AppLayout>
      <div className="flex-1 flex min-h-0 overflow-hidden">
        {/* Main Content with Hybrid Layout */}
        <div className="flex-1 min-w-0">
          <HybridLabLayout
            leftPanel={LeftPanelContent}
            rightPanel={RightPanelContent}
          />
        </div>

        {/* Properties Panel (Collapsible/Fixed) */}
        <PropertiesPanel
          instance={instance}
          onInstanceChange={setInstance}
          params={params}
          onParamsChange={setParams}
        />
      </div>
    </AppLayout>
  );
}
