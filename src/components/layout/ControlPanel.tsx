import { Play, Pause, SkipForward, RotateCcw, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { SAStatus } from "@/hooks/useSimulatedAnnealing";

interface ControlPanelProps {
  status: SAStatus;
  onPlay: () => void;
  onPause: () => void;
  onReset: () => void;
  onStep: () => void;
  speed: number;
  onSpeedChange: (speed: number) => void;
  iteration: number;
  maxIterations?: number;
  isRecording?: boolean;
  onToggleRecord?: () => void;
}

const SPEED_OPTIONS = [0.5, 1, 2, 5];

export function ControlPanel({
  status,
  onPlay,
  onPause,
  onReset,
  onStep,
  speed,
  onSpeedChange,
  iteration,
  isRecording,
  onToggleRecord,
}: ControlPanelProps) {
  return (
    <div className="h-14 border-t border-border bg-card/90 backdrop-blur-sm flex items-center px-4 gap-3">
      {/* Transport Controls */}
      <div className="flex items-center gap-1">
        {status === "running" ? (
          <Button
            size="icon"
            variant="ghost"
            onClick={onPause}
            className="h-8 w-8 text-primary hover:text-primary hover:bg-primary/10"
          >
            <Pause className="h-4 w-4" />
          </Button>
        ) : (
          <Button
            size="icon"
            variant="ghost"
            onClick={onPlay}
            disabled={status === "finished"}
            className="h-8 w-8 text-primary hover:text-primary hover:bg-primary/10"
          >
            <Play className="h-4 w-4" />
          </Button>
        )}
        <Button
          size="icon"
          variant="ghost"
          onClick={onStep}
          disabled={status === "running"}
          className="h-8 w-8 text-muted-foreground hover:text-foreground"
        >
          <SkipForward className="h-4 w-4" />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          onClick={onReset}
          className="h-8 w-8 text-muted-foreground hover:text-foreground"
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>

      {/* Divider */}
      <div className="w-px h-6 bg-border" />

      {/* Timeline */}
      <div className="flex-1 flex items-center gap-3">
        <span className="text-[10px] font-mono text-muted-foreground min-w-[60px]">
          ITR {iteration}
        </span>
        <Slider
          value={[iteration]}
          max={Math.max(iteration, 100)}
          className="flex-1"
          disabled
        />
      </div>

      {/* Divider */}
      <div className="w-px h-6 bg-border" />

      {/* Speed Control */}
      <div className="flex items-center gap-1">
        {SPEED_OPTIONS.map((s) => (
          <Button
            key={s}
            size="sm"
            variant={speed === s ? "default" : "ghost"}
            onClick={() => onSpeedChange(s)}
            className={`h-7 px-2 text-[10px] font-mono ${
              speed === s
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {s}x
          </Button>
        ))}
      </div>

      {/* Divider */}
      <div className="w-px h-6 bg-border" />

      {/* Record */}
      <Button
        size="sm"
        variant="ghost"
        onClick={onToggleRecord}
        className={`h-7 px-3 text-[10px] font-mono gap-1 ${
          isRecording ? "text-neon-red" : "text-muted-foreground"
        }`}
      >
        <Circle className={`h-3 w-3 ${isRecording ? "fill-neon-red animate-pulse-glow" : ""}`} />
        REC
      </Button>
    </div>
  );
}
