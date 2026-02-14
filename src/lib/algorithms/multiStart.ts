import {
    QAPInstance,
    calculateQAPCost,
    calculateDeltaCost,
    calculatePotentials,
    generateRandomPermutation,
    shuffleSublist
} from './qap';

// --- Local Search: First Improvement ---
export function localSearchFirstImprovement(
    instance: QAPInstance,
    initialPermutation: number[],
    maxEvals: number = 100000
): { permutation: number[]; cost: number; evals: number } {
    let currentPerm = [...initialPermutation];
    let currentCost = calculateQAPCost(currentPerm, instance.distance, instance.flow);
    let evals = 0;
    let improved = true;
    const n = instance.size;

    // Generate all pairs (i, j)
    const pairs: [number, number][] = [];
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            pairs.push([i, j]);
        }
    }

    while (improved && evals < maxEvals) {
        improved = false;
        // Shuffle pairs to randomize exploration order
        for (let i = pairs.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
        }

        for (const [r, s] of pairs) {
            const delta = calculateDeltaCost(currentPerm, instance.distance, instance.flow, r, s);
            evals++;
            if (delta < 0) {
                // Apply move immediately (First Improvement)
                const temp = currentPerm[r];
                currentPerm[r] = currentPerm[s];
                currentPerm[s] = temp;
                currentCost += delta;
                improved = true;
                break; // Restart search from new solution
            }
        }
    }

    return { permutation: currentPerm, cost: currentCost, evals };
}

// --- GRASP ---
export function runGRASP(
    instance: QAPInstance,
    maxIter: number = 5,
    alpha: number = 0.3
): { permutation: number[]; cost: number; history: any[] } {
    const n = instance.size;
    let bestGlobalPerm: number[] = [];
    let bestGlobalCost = Infinity;
    const history: any[] = [];

    // Pre-calculate potentials
    const flowPotentials = calculatePotentials(instance.flow);
    const distPotentials = calculatePotentials(instance.distance); // Sum of distances from loc j to all others

    // Sort units by flow potential (descending) - Fixed order
    const sortedUnits = Array.from({ length: n }, (_, i) => i)
        .sort((a, b) => flowPotentials[b] - flowPotentials[a]);

    const lrcSize = Math.max(1, Math.floor(alpha * n));

    for (let iter = 0; iter < maxIter; iter++) {
        // --- Construction Phase ---
        const permutation = new Array(n).fill(-1);
        // Available locations sorted by distance potential (ascending) - Low potential = Central
        // We want to map High Flow (Unit) -> Low Distance Potential (Central Location)
        let availableLocs = Array.from({ length: n }, (_, i) => i)
            .sort((a, b) => distPotentials[a] - distPotentials[b]);

        for (const unit of sortedUnits) {
            // RCL: Select from the 'lrcSize' best available locations
            const limit = Math.min(availableLocs.length, lrcSize);
            const candidates = availableLocs.slice(0, limit);

            // Random selection from RCL
            const chosenLocIdx = Math.floor(Math.random() * candidates.length);
            const chosenLoc = candidates[chosenLocIdx];

            permutation[unit] = chosenLoc;
            availableLocs = availableLocs.filter(l => l !== chosenLoc);
        }

        // --- Improvement Phase ---
        const lsResult = localSearchFirstImprovement(instance, permutation);

        history.push({
            iter,
            constructiveCost: calculateQAPCost(permutation, instance.distance, instance.flow),
            improvedCost: lsResult.cost,
            evals: lsResult.evals
        });

        if (lsResult.cost < bestGlobalCost) {
            bestGlobalCost = lsResult.cost;
            bestGlobalPerm = lsResult.permutation;
        }
    }

    return { permutation: bestGlobalPerm, cost: bestGlobalCost, history };
}

// --- ILS ---
export function runILS(
    instance: QAPInstance,
    maxIter: number = 25
): { permutation: number[]; cost: number; history: any[] } {
    // Initial Solution
    let currentPerm = generateRandomPermutation(instance.size);
    let { permutation: lsPerm, cost: lsCost, evals } = localSearchFirstImprovement(instance, currentPerm);

    currentPerm = lsPerm;
    let currentCost = lsCost;

    let bestPerm = [...currentPerm];
    let bestCost = currentCost;

    const history: any[] = [{ iter: 0, cost: currentCost, type: 'init' }];
    const mutationSize = Math.max(2, Math.floor(instance.size / 4));

    for (let iter = 1; iter <= maxIter; iter++) {
        // 1. Perturbation
        const mutatedPerm = shuffleSublist(currentPerm, mutationSize);

        // 2. Local Search
        const result = localSearchFirstImprovement(instance, mutatedPerm);

        // 3. Acceptance (Better or Equal - here strictly better for exploitation)
        if (result.cost < currentCost) {
            currentPerm = result.permutation;
            currentCost = result.cost;

            if (currentCost < bestCost) {
                bestCost = currentCost;
                bestPerm = [...currentPerm];
            }
        }

        history.push({ iter, cost: currentCost, bestCost });
    }

    return { permutation: bestPerm, cost: bestCost, history };
}

// --- VNS ---
export function runVNS(
    instance: QAPInstance,
    maxEvals: number = 50000,
    kMax: number = 5
): { permutation: number[]; cost: number; history: any[] } {
    let currentPerm = generateRandomPermutation(instance.size);
    let { permutation: lsPerm, cost: lsCost, evals: initialEvals } = localSearchFirstImprovement(instance, currentPerm);

    currentPerm = lsPerm;
    let currentCost = lsCost;

    let bestPerm = [...currentPerm];
    let bestCost = currentCost;

    let totalEvals = initialEvals;
    const history: any[] = [{ evals: totalEvals, cost: currentCost, k: 0 }];

    while (totalEvals < maxEvals) {
        let k = 1;
        while (k <= kMax && totalEvals < maxEvals) {
            // Define perturbation size based on k
            const divisor = Math.max(1, 9 - k);
            const mutationSize = Math.max(2, Math.floor(instance.size / divisor));

            // 1. Shaking
            const shakenPerm = shuffleSublist(currentPerm, mutationSize);

            // 2. Local Search
            const result = localSearchFirstImprovement(instance, shakenPerm, maxEvals - totalEvals);
            totalEvals += result.evals;

            // 3. Neighborhood Change
            if (result.cost < currentCost) {
                currentPerm = result.permutation;
                currentCost = result.cost;
                k = 1; // Improvement -> Reset to smallest neighborhood

                if (currentCost < bestCost) {
                    bestCost = currentCost;
                    bestPerm = [...currentPerm];
                }
            } else {
                k++; // No improvement -> Increase perturbation
            }

            history.push({ evals: totalEvals, cost: currentCost, bestCost, k });
        }
    }

    return { permutation: bestPerm, cost: bestCost, history };
}
