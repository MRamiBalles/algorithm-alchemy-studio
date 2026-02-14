interface ThermometerProps {
  temperature: number;
  initialTemperature: number;
}

export function Thermometer({ temperature, initialTemperature }: ThermometerProps) {
  const ratio = Math.min(1, Math.max(0, temperature / (initialTemperature || 1)));
  const height = `${ratio * 100}%`;

  // Color: red (hot) → blue (cold)
  const hue = 0 + (1 - ratio) * 240; // 0 = red, 240 = blue

  return (
    <div className="flex flex-col items-center gap-2 h-full">
      <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-wider">
        Temp
      </span>
      <div className="relative w-6 flex-1 rounded-full bg-secondary/50 border border-border overflow-hidden">
        <div
          className="absolute bottom-0 left-0 right-0 rounded-full transition-all duration-300"
          style={{
            height,
            background: `hsl(${hue}, 80%, 50%)`,
            boxShadow: `0 0 12px hsl(${hue}, 80%, 50%, 0.5)`,
          }}
        />
      </div>
      <span className="text-[9px] font-mono text-primary tabular-nums">
        {temperature.toFixed(1)}
      </span>
    </div>
  );
}
