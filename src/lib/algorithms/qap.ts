// QAP (Quadratic Assignment Problem) utilities

export interface QAPInstance {
  name: string;
  size: number;
  distance: number[][];
  flow: number[][];
  optimalCost?: number;
}

export function calculateQAPCost(
  permutation: number[],
  distance: number[][],
  flow: number[][]
): number {
  const n = permutation.length;
  let cost = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      cost += flow[i][j] * distance[permutation[i]][permutation[j]];
    }
  }
  return cost;
}

export function calculateDeltaCost(
  permutation: number[],
  distance: number[][],
  flow: number[][],
  r: number,
  s: number
): number {
  const n = permutation.length;
  let delta = 0;
  const pi_r = permutation[r];
  const pi_s = permutation[s];

  for (let k = 0; k < n; k++) {
    if (k !== r && k !== s) {
      const pi_k = permutation[k];
      delta += (flow[r][k] - flow[s][k]) *
        (distance[pi_s][pi_k] - distance[pi_r][pi_k]) +
        (flow[k][r] - flow[k][s]) *
        (distance[pi_k][pi_s] - distance[pi_k][pi_r]);
    }
  }
  return delta;
}

export function calculatePotentials(matrix: number[][]): number[] {
  return matrix.map(row => row.reduce((a, b) => a + b, 0));
}

export function generateRandomPermutation(n: number): number[] {
  const perm = Array.from({ length: n }, (_, i) => i);
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [perm[i], perm[j]] = [perm[j], perm[i]];
  }
  return perm;
}

export function swapNeighbor(
  permutation: number[]
): { newPerm: number[]; i: number; j: number } {
  const n = permutation.length;
  const newPerm = [...permutation];
  const i = Math.floor(Math.random() * n);
  let j = Math.floor(Math.random() * (n - 1));
  if (j >= i) j++;
  [newPerm[i], newPerm[j]] = [newPerm[j], newPerm[i]];
  return { newPerm, i, j };
}

export function shuffleSublist(permutation: number[], sublistSize: number): number[] {
  const n = permutation.length;
  if (sublistSize >= n) sublistSize = n;
  if (sublistSize < 2) return [...permutation];

  const newPerm = [...permutation];
  const start = Math.floor(Math.random() * (n - sublistSize + 1));
  const end = start + sublistSize;

  // Extract and shuffle
  const subsegment = newPerm.slice(start, end);
  // Fisher-Yates shuffle for subsegment
  for (let i = subsegment.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [subsegment[i], subsegment[j]] = [subsegment[j], subsegment[i]];
  }

  // Reinsert
  for (let i = 0; i < subsegment.length; i++) {
    newPerm[start + i] = subsegment[i];
  }

  return newPerm;
}
