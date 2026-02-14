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
