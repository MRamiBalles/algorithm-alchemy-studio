import { AppLayout } from "@/components/layout/AppLayout";
import { ControlPanel } from "@/components/layout/ControlPanel";
import { Construction } from "lucide-react";

interface AlgorithmPlaceholderProps {
  title: string;
  module: string;
  description: string;
  parameters: { name: string; defaultValue: string }[];
}

export default function AlgorithmPlaceholder({
  title,
  module,
  description,
  parameters,
}: AlgorithmPlaceholderProps) {
  return (
    <AppLayout>
      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center max-w-md space-y-4">
            <div className="mx-auto w-16 h-16 rounded-2xl bg-secondary/50 border border-border flex items-center justify-center">
              <Construction className="h-8 w-8 text-muted-foreground" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-muted-foreground bg-secondary/50 px-2 py-0.5 rounded uppercase">
                {module}
              </span>
              <h2 className="text-2xl font-bold text-foreground mt-2">{title}</h2>
              <p className="text-sm text-muted-foreground mt-2">{description}</p>
            </div>

            {/* Parameter Preview */}
            <div className="panel-glass rounded-lg p-4 text-left">
              <h3 className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider mb-3">
                Parameters (coming soon)
              </h3>
              <div className="space-y-2">
                {parameters.map((p) => (
                  <div
                    key={p.name}
                    className="flex justify-between items-center text-xs"
                  >
                    <span className="text-muted-foreground">{p.name}</span>
                    <span className="font-mono text-primary">{p.defaultValue}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <ControlPanel
          status="idle"
          onPlay={() => {}}
          onPause={() => {}}
          onReset={() => {}}
          onStep={() => {}}
          speed={1}
          onSpeedChange={() => {}}
          iteration={0}
        />
      </div>
    </AppLayout>
  );
}
