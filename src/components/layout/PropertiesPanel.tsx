import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BENCHMARKS } from "@/data/benchmarks";
import { QAPInstance } from "@/lib/algorithms/qap";
import { SAParams, DEFAULT_SA_PARAMS } from "@/lib/algorithms/sa";
import { ChevronLeft, ChevronRight, Upload } from "lucide-react";

interface PropertiesPanelProps {
  instance: QAPInstance;
  onInstanceChange: (instance: QAPInstance) => void;
  params: SAParams;
  onParamsChange: (params: SAParams) => void;
  algorithmType?: string;
}

export function PropertiesPanel({
  instance,
  onInstanceChange,
  params,
  onParamsChange,
  algorithmType = "sa",
}: PropertiesPanelProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [jsonInput, setJsonInput] = useState("");

  const handleBenchmarkSelect = (name: string) => {
    const found = BENCHMARKS.find((b) => b.name === name);
    if (found) onInstanceChange(found);
  };

  const handleJsonParse = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      if (parsed.distance && parsed.flow) {
        onInstanceChange({
          name: "Custom",
          size: parsed.distance.length,
          distance: parsed.distance,
          flow: parsed.flow,
        });
      }
    } catch {
      // TODO: show error toast
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(ev.target?.result as string);
        if (parsed.distance && parsed.flow) {
          onInstanceChange({
            name: file.name.replace(/\.\w+$/, ""),
            size: parsed.distance.length,
            distance: parsed.distance,
            flow: parsed.flow,
          });
        }
      } catch {}
    };
    reader.readAsText(file);
  };

  if (collapsed) {
    return (
      <div className="w-10 border-l border-border bg-card/50 flex flex-col items-center pt-3">
        <Button
          size="icon"
          variant="ghost"
          onClick={() => setCollapsed(false)}
          className="h-7 w-7 text-muted-foreground"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="w-72 border-l border-border bg-card/50 flex flex-col overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-border">
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono">
          Properties
        </span>
        <Button
          size="icon"
          variant="ghost"
          onClick={() => setCollapsed(true)}
          className="h-6 w-6 text-muted-foreground"
        >
          <ChevronRight className="h-3 w-3" />
        </Button>
      </div>

      <div className="p-3 space-y-4 text-sm">
        {/* QAP Instance Selector */}
        <div className="space-y-2">
          <Label className="text-[10px] uppercase tracking-wider text-muted-foreground font-mono">
            QAP Instance
          </Label>
          <Select value={instance.name} onValueChange={handleBenchmarkSelect}>
            <SelectTrigger className="h-8 text-xs bg-secondary/50 border-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {BENCHMARKS.map((b) => (
                <SelectItem key={b.name} value={b.name}>
                  {b.name} (n={b.size})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* File Upload */}
        <div className="space-y-2">
          <Label className="text-[10px] uppercase tracking-wider text-muted-foreground font-mono">
            Upload .json
          </Label>
          <label className="flex items-center gap-2 px-3 py-2 border border-dashed border-border rounded-md cursor-pointer hover:border-primary/50 transition-colors">
            <Upload className="h-3 w-3 text-muted-foreground" />
            <span className="text-[10px] text-muted-foreground">Choose file</span>
            <input
              type="file"
              accept=".json,.dat"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>

        {/* JSON Editor */}
        <div className="space-y-2">
          <Label className="text-[10px] uppercase tracking-wider text-muted-foreground font-mono">
            Custom JSON
          </Label>
          <Textarea
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            placeholder='{"distance":[[...]],"flow":[[...]]}'
            className="h-20 text-[10px] font-mono bg-secondary/50 border-border resize-none"
          />
          <Button
            size="sm"
            variant="outline"
            onClick={handleJsonParse}
            className="h-7 text-[10px] w-full"
          >
            Parse & Load
          </Button>
        </div>

        {/* Separator */}
        <div className="border-t border-border" />

        {/* SA Parameters */}
        {algorithmType === "sa" && (
          <div className="space-y-3">
            <Label className="text-[10px] uppercase tracking-wider text-muted-foreground font-mono">
              SA Parameters
            </Label>

            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-[10px] text-muted-foreground">μ (mu)</span>
                <span className="text-[10px] font-mono text-primary">{params.mu}</span>
              </div>
              <Slider
                value={[params.mu]}
                min={0.01}
                max={1}
                step={0.01}
                onValueChange={([v]) => onParamsChange({ ...params, mu: v })}
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-[10px] text-muted-foreground">φ (phi)</span>
                <span className="text-[10px] font-mono text-primary">{params.phi}</span>
              </div>
              <Slider
                value={[params.phi]}
                min={0.01}
                max={0.99}
                step={0.01}
                onValueChange={([v]) => onParamsChange({ ...params, phi: v })}
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-[10px] text-muted-foreground">Final Temp</span>
                <span className="text-[10px] font-mono text-primary">
                  {params.finalTemp}
                </span>
              </div>
              <Slider
                value={[params.finalTemp]}
                min={0.0001}
                max={1}
                step={0.0001}
                onValueChange={([v]) => onParamsChange({ ...params, finalTemp: v })}
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-[10px] text-muted-foreground">Max Neighbors (L)</span>
                <span className="text-[10px] font-mono text-primary">
                  {params.maxNeighbors}
                </span>
              </div>
              <Slider
                value={[params.maxNeighbors]}
                min={10}
                max={500}
                step={10}
                onValueChange={([v]) => onParamsChange({ ...params, maxNeighbors: v })}
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-[10px] text-muted-foreground">Max Successes</span>
                <span className="text-[10px] font-mono text-primary">
                  {params.maxSuccesses}
                </span>
              </div>
              <Slider
                value={[params.maxSuccesses]}
                min={5}
                max={200}
                step={5}
                onValueChange={([v]) => onParamsChange({ ...params, maxSuccesses: v })}
              />
            </div>

            <div className="space-y-1">
              <Label className="text-[10px] text-muted-foreground">Cooling Schedule</Label>
              <Select
                value={params.coolingSchedule}
                onValueChange={(v) =>
                  onParamsChange({
                    ...params,
                    coolingSchedule: v as "cauchy" | "geometric",
                  })
                }
              >
                <SelectTrigger className="h-8 text-xs bg-secondary/50 border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cauchy">Cauchy: T₀/(1+k)</SelectItem>
                  <SelectItem value="geometric">Geometric: T₀·αᵏ</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {params.coolingSchedule === "geometric" && (
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-[10px] text-muted-foreground">α (alpha)</span>
                  <span className="text-[10px] font-mono text-primary">{params.alpha}</span>
                </div>
                <Slider
                  value={[params.alpha]}
                  min={0.8}
                  max={0.999}
                  step={0.001}
                  onValueChange={([v]) => onParamsChange({ ...params, alpha: v })}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
