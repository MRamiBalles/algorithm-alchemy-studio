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

  return (
    <AppLayout>
      <div className="flex-1 flex min-h-0">
        {/* Main Stage */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex-1 relative p-6 flex flex-col gap-6 overflow-auto">
            {/* Title */}
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-bold text-foreground">
                Simulated Annealing
              </h2>
              <span className="text-[10px] font-mono text-muted-foreground bg-secondary/50 px-2 py-0.5 rounded">
                QAP: {instance.name} (n={instance.size})
              </span>
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
              <div className="flex-1 flex flex-col gap-4 relative">
                <FormulaOverlay
                  step={currentStep}
                  schedule={params.coolingSchedule}
                />

                {/* Permutation Grid */}
                <div className="panel-glass rounded-lg p-4">
                  <h3 className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider mb-3">
                    Permutation
                  </h3>
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
                <div className="panel-glass rounded-lg p-4 flex-1 min-h-[200px]">
                  <h3 className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider mb-2">
                    Cost over Iterations
                  </h3>
                  <div className="h-[calc(100%-20px)]">
                    <AcceptanceGraph history={history} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Control Panel */}
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

        {/* Properties Panel */}
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
