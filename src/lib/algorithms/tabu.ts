import { QAPInstance } from "./qap";
import { calculateCost } from "./greedy";

export interface TabuStep {
    iteration: number;
    cost: number;
}

function calculateDelta(instance: QAPInstance, p: number[], r: number, s: number): number {
    const n = instance.size;
    let delta = 0;
    // Simplified delta for symmetric matrices (most QAP benchmarks)
    for (let k = 0; k < n; k++) {
        if (k !== r && k !== s) {
            delta += (instance.flow[r][k] - instance.flow[s][k]) *
                (instance.distance[p[s]][p[k]] - instance.distance[p[r]][p[k]]) +
                (instance.flow[k][r] - instance.flow[k][s]) *
                (instance.distance[p[k]][p[s]] - instance.distance[p[k]][p[r]]);
        }
    }
    return delta;
}

export function tabuSearch(
    instance: QAPInstance,
    initialSol: number[],
    maxIter: number = 100,
    tabuTenure: number = 5,
    onStep?: (step: TabuStep) => void
): { solution: number[]; cost: number; history: TabuStep[] } {
    const n = instance.size;
    let currentSol = [...initialSol];
    let currentCost = calculateCost(instance, currentSol);
    let bestSol = [...currentSol];
    let bestCost = currentCost;

    const history: TabuStep[] = [{ iteration: 0, cost: currentCost }];
    if (onStep) onStep({ iteration: 0, cost: currentCost });

    // Tabu Matrix initialization
    const tabuMatrix = Array.from({ length: n }, () => Array(n).fill(0));

    for (let iter = 0; iter < maxIter; iter++) {
        let bestDelta = Infinity;
        let bestMove: [number, number] | null = null;

        // Explore subset of neighbors (random sampling for speed in demo)
        // or full neighborhood for small instances.
        // For n=12 (benchmark), size is 66, full search is fine.

        for (let i = 0; i < n; i++) {
            for (let j = i + 1; j < n; j++) {
                const delta = calculateDelta(instance, currentSol, i, j);
                const isTabu = tabuMatrix[i][j] > iter;

                // Aspiration Criteria
                const aspired = (currentCost + delta < bestCost);

                if (!isTabu || aspired) {
                    if (delta < bestDelta) {
                        bestDelta = delta;
                        bestMove = [i, j];
                    }
                }
            }
        }

        if (bestMove) {
            const [i, j] = bestMove;

            // Update Tabu Matrix (store unlock iteration)
            tabuMatrix[i][j] = iter + tabuTenure;
            tabuMatrix[j][i] = iter + tabuTenure; // Symmetric

            // Apply Move
            const temp = currentSol[i];
            currentSol[i] = currentSol[j];
            currentSol[j] = temp;
            currentCost += bestDelta;

            // Update Best Global
            if (currentCost < bestCost) {
                bestCost = currentCost;
                bestSol = [...currentSol];
            }
        }

        const step = { iteration: iter + 1, cost: currentCost };
        history.push(step);
        if (onStep) onStep(step);
    }

    return { solution: bestSol, cost: bestCost, history };
}
