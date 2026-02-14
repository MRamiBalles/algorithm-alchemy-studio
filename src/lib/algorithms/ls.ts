import { QAPInstance } from "./qap";
import { calculateCost } from "./greedy";

export interface LSStep {
    iteration: number;
    cost: number;
}

export function localSearchBestImprovement(
    instance: QAPInstance,
    initialSol: number[],
    onStep?: (step: LSStep) => void
): { solution: number[]; cost: number; history: LSStep[] } {
    const n = instance.size;
    let currentSol = [...initialSol];
    let currentCost = calculateCost(instance, currentSol);
    const history: LSStep[] = [{ iteration: 0, cost: currentCost }];

    if (onStep) onStep({ iteration: 0, cost: currentCost });

    let improve = true;
    let iteration = 0;

    while (improve) {
        improve = false;
        let bestDelta = 0;
        let bestMove: [number, number] | null = null;

        // Explore Neighborhood (2-opt)
        for (let i = 0; i < n; i++) {
            for (let j = i + 1; j < n; j++) {
                const delta = calculateDelta(instance, currentSol, i, j);
                if (delta < bestDelta) {
                    bestDelta = delta;
                    bestMove = [i, j];
                }
            }
        }

        if (bestMove) {
            const [i, j] = bestMove;
            // Apply Swap
            const temp = currentSol[i];
            currentSol[i] = currentSol[j];
            currentSol[j] = temp;

            currentCost += bestDelta;
            improve = true;
            iteration++;

            const step = { iteration, cost: currentCost };
            history.push(step);
            if (onStep) onStep(step);
        }
    }

    return { solution: currentSol, cost: currentCost, history };
}

function calculateDelta(instance: QAPInstance, p: number[], r: number, s: number): number {
    const n = instance.size;
    let delta = 0;

    for (let k = 0; k < n; k++) {
        if (k !== r && k !== s) {
            const flow_rk = instance.flow[r][k];
            const flow_sk = instance.flow[s][k];
            const flow_kr = instance.flow[k][r];
            const flow_ks = instance.flow[k][s];

            const dist_curr_rk = instance.distance[p[r]][p[k]];
            const dist_curr_sk = instance.distance[p[s]][p[k]];
            const dist_curr_kr = instance.distance[p[k]][p[r]];
            const dist_curr_ks = instance.distance[p[k]][p[s]];

            const dist_new_rk = instance.distance[p[s]][p[k]];
            const dist_new_sk = instance.distance[p[r]][p[k]];
            const dist_new_kr = instance.distance[p[k]][p[s]];
            const dist_new_ks = instance.distance[p[k]][p[r]];

            delta += (flow_rk * dist_new_rk - flow_rk * dist_curr_rk) +
                (flow_sk * dist_new_sk - flow_sk * dist_curr_sk) +
                (flow_kr * dist_new_kr - flow_kr * dist_curr_kr) +
                (flow_ks * dist_new_ks - flow_ks * dist_curr_ks);
        }
    }
    return delta;
}
