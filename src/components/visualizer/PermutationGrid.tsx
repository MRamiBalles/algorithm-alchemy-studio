import { motion } from "framer-motion";

interface PermutationGridProps {
  permutation: number[];
  swapI?: number;
  swapJ?: number;
  accepted?: boolean;
}

export function PermutationGrid({
  permutation,
  swapI = -1,
  swapJ = -1,
  accepted,
}: PermutationGridProps) {
  return (
    <div className="flex flex-wrap gap-1.5 justify-center items-center">
      {permutation.map((val, idx) => {
        const isSwapped = idx === swapI || idx === swapJ;
        return (
          <motion.div
            key={`${idx}`}
            layout
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className={`
              w-10 h-10 rounded-md flex items-center justify-center font-mono text-sm font-bold
              border transition-colors duration-200
              ${
                isSwapped
                  ? accepted
                    ? "border-neon-cyan bg-primary/20 text-primary neon-glow-cyan"
                    : "border-neon-orange bg-accent/20 text-accent neon-glow-orange"
                  : "border-border bg-secondary/50 text-foreground"
              }
            `}
          >
            {val}
          </motion.div>
        );
      })}
    </div>
  );
}
