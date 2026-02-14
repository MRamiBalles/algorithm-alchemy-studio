import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Scatter,
  ComposedChart,
} from "recharts";
import { SAIterationResult } from "@/lib/algorithms/sa";

interface AcceptanceGraphProps {
  history: SAIterationResult[];
}

export function AcceptanceGraph({ history }: AcceptanceGraphProps) {
  // Sample history to avoid rendering too many points
  const maxPoints = 200;
  const step = Math.max(1, Math.floor(history.length / maxPoints));
  const data = history
    .filter((_, i) => i % step === 0 || i === history.length - 1)
    .map((h) => ({
      iteration: h.iteration,
      cost: h.cost,
      bestCost: h.bestCost,
      worseAccepted: h.worseAccepted ? h.cost : undefined,
    }));

  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
          <XAxis
            dataKey="iteration"
            tick={{ fontSize: 9, fill: "hsl(215 20% 55%)" }}
            tickLine={false}
            axisLine={{ stroke: "hsl(220 20% 16%)" }}
          />
          <YAxis
            tick={{ fontSize: 9, fill: "hsl(215 20% 55%)" }}
            tickLine={false}
            axisLine={{ stroke: "hsl(220 20% 16%)" }}
            width={50}
          />
          <Tooltip
            contentStyle={{
              background: "hsl(220 40% 8%)",
              border: "1px solid hsl(220 20% 16%)",
              borderRadius: "6px",
              fontSize: "10px",
              fontFamily: "JetBrains Mono, monospace",
            }}
            labelStyle={{ color: "hsl(215 20% 55%)" }}
          />
          <Line
            type="monotone"
            dataKey="cost"
            stroke="hsl(187 100% 50%)"
            strokeWidth={1.5}
            dot={false}
            name="Current Cost"
          />
          <Line
            type="monotone"
            dataKey="bestCost"
            stroke="hsl(25 100% 55%)"
            strokeWidth={1}
            strokeDasharray="4 2"
            dot={false}
            name="Best Cost"
          />
          <Scatter
            dataKey="worseAccepted"
            fill="hsl(142 76% 46%)"
            name="Worse Accepted"
            r={3}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
