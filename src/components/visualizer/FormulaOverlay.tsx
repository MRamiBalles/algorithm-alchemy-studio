import { SAIterationResult } from "@/lib/algorithms/sa";

interface FormulaOverlayProps {
  step: SAIterationResult | null;
  schedule: "cauchy" | "geometric";
}

export function FormulaOverlay({ step, schedule }: FormulaOverlayProps) {
  if (!step) return null;

  return (
    <div className="absolute top-3 right-3 bg-card/80 backdrop-blur-sm border border-border rounded-lg px-3 py-2 font-mono text-[10px] space-y-1 z-10">
      <div className="flex items-center gap-3">
        <span className="text-muted-foreground">T =</span>
        <span className="text-accent">{step.temperature.toFixed(4)}</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-muted-foreground">Δ =</span>
        <span className={step.delta < 0 ? "text-neon-green" : "text-neon-orange"}>
          {step.delta.toFixed(2)}
        </span>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-muted-foreground">P =</span>
        <span className="text-primary">{step.probability.toFixed(4)}</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-muted-foreground">Epoch =</span>
        <span className="text-foreground">{step.epoch}</span>
      </div>
      <div className="border-t border-border pt-1 mt-1 text-[8px] text-muted-foreground">
        {schedule === "cauchy" ? "T = T₀/(1+k)" : "T = T₀·αᵏ"}
      </div>
    </div>
  );
}
