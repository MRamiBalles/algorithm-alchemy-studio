// MBHB Practice 1: Simulated Annealing Logic

export interface SAParams {
  mu: number;
  phi: number;
  finalTemp: number;
  maxNeighbors: number; // L - inner loop
  maxSuccesses: number;
  coolingSchedule: "cauchy" | "geometric";
  alpha: number; // for geometric schedule
}

export const DEFAULT_SA_PARAMS: SAParams = {
  mu: 0.3,
  phi: 0.3,
  finalTemp: 0.001,
  maxNeighbors: 100,
  maxSuccesses: 50,
  coolingSchedule: "cauchy",
  alpha: 0.95,
};

export function calculateInitialTemperature(
  initialCost: number,
  mu: number,
  phi: number
): number {
  // T0 = (mu / -ln(phi)) * Cost
  return (mu / -Math.log(phi)) * initialCost;
}

export function cauchySchedule(t0: number, k: number): number {
  return t0 / (1 + k);
}

export function geometricSchedule(
  t0: number,
  k: number,
  alpha: number = 0.99
): number {
  return t0 * Math.pow(alpha, k);
}

export function metropolisCriterion(
  delta: number,
  temperature: number
): { accepted: boolean; probability: number } {
  if (delta < 0) return { accepted: true, probability: 1 };
  const probability = Math.exp(-delta / temperature);
  return { accepted: Math.random() < probability, probability };
}

export interface SAIterationResult {
  iteration: number;
  epoch: number;
  permutation: number[];
  cost: number;
  bestCost: number;
  temperature: number;
  delta: number;
  probability: number;
  accepted: boolean;
  worseAccepted: boolean;
  swapI: number;
  swapJ: number;
}
