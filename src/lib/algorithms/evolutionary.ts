import {
    QAPInstance,
    calculateQAPCost,
    generateRandomPermutation,
    shuffleSublist
} from './qap';

export interface EvoYield {
    population: { permutation: number[]; cost: number }[];
    bestPermutation: number[];
    bestCost: number;
    generation: number;
    phase: string; // 'selection', 'crossover', 'mutation', 'restart'
    description?: string;
    history: any[];
}

// --- Order Crossover (OX) ---
export function oxCrossover(p1: number[], p2: number[]): number[] {
    const n = p1.length;
    const child = new Array(n).fill(-1);

    // 1. Select two cut points
    const cut1 = Math.floor(Math.random() * n);
    const cut2 = Math.floor(Math.random() * n);
    const start = Math.min(cut1, cut2);
    const end = Math.max(cut1, cut2);

    // 2. Copy segment from P1
    const visited = new Set<number>();
    for (let i = start; i <= end; i++) {
        child[i] = p1[i];
        visited.add(p1[i]);
    }

    // 3. Fill from P2 (starting after end)
    let p2Index = (end + 1) % n;
    let childIndex = (end + 1) % n;

    while (childIndex !== start) {
        const gene = p2[p2Index];
        if (!visited.has(gene)) {
            child[childIndex] = gene;
            childIndex = (childIndex + 1) % n;
        }
        p2Index = (p2Index + 1) % n;
    }

    return child;
}

// --- Mutation (Swap) ---
export function mutation(perm: number[], mutationRate: number): number[] {
    if (Math.random() > mutationRate) return perm;
    const n = perm.length;
    const mut = [...perm];
    const i = Math.floor(Math.random() * n);
    const j = Math.floor(Math.random() * n);
    [mut[i], mut[j]] = [mut[j], mut[i]];
    return mut;
}

// --- Genetic Algorithm (Generational) ---
export function* runGAGen(
    instance: QAPInstance,
    popSize: number = 50,
    generations: number = 100,
    mutationRate: number = 0.1
): Generator<EvoYield, void, void> {
    const n = instance.size;
    let population = Array.from({ length: popSize }, () => {
        const p = generateRandomPermutation(n);
        return { permutation: p, cost: calculateQAPCost(p, instance.distance, instance.flow) };
    });

    // Sort valid population
    population.sort((a, b) => a.cost - b.cost);
    let bestSol = population[0];
    const history: any[] = [];

    yield {
        population,
        bestPermutation: bestSol.permutation,
        bestCost: bestSol.cost,
        generation: 0,
        phase: 'init',
        description: 'Initial Population Generated',
        history
    };

    for (let gen = 1; gen <= generations; gen++) {
        const newPop: typeof population = [];

        // Elitism: Keep best 2
        newPop.push(population[0]);
        newPop.push(population[1]);

        while (newPop.length < popSize) {
            // Tournament Selection
            const p1 = tournamentSelect(population);
            const p2 = tournamentSelect(population);

            // Crossover (OX)
            const childPerm = oxCrossover(p1.permutation, p2.permutation);

            // Mutation
            const mutatedPerm = mutation(childPerm, mutationRate);

            newPop.push({
                permutation: mutatedPerm,
                cost: calculateQAPCost(mutatedPerm, instance.distance, instance.flow)
            });
        }

        // Replace and Sort
        population = newPop.sort((a, b) => a.cost - b.cost);

        if (population[0].cost < bestSol.cost) {
            bestSol = population[0];
        }

        history.push({ gen, best: bestSol.cost, avg: calculateAvg(population) });

        yield {
            population,
            bestPermutation: bestSol.permutation,
            bestCost: bestSol.cost,
            generation: gen,
            phase: 'generation',
            description: `Gen ${gen}: Best Cost ${bestSol.cost}`,
            history
        };
    }
}

// --- CHC Algorithm ---
export function* runCHCGen(
    instance: QAPInstance,
    popSize: number = 50, // Usually smaller, e.g. 50, but handled mainly by selection
    maxEvals: number = 50000
): Generator<EvoYield, void, void> {
    const n = instance.size;
    let population = Array.from({ length: popSize }, () => {
        const p = generateRandomPermutation(n);
        return { permutation: p, cost: calculateQAPCost(p, instance.distance, instance.flow) };
    });

    population.sort((a, b) => a.cost - b.cost);
    let bestSol = population[0];
    let evals = popSize;
    const history: any[] = [];

    // Initial Threshold (d) = n/4
    let threshold = Math.floor(n / 4);
    let restartCount = 0;

    yield { population, bestPermutation: bestSol.permutation, bestCost: bestSol.cost, generation: 0, phase: 'init', history };

    let gen = 0;
    while (evals < maxEvals) {
        gen++;
        const offspring: typeof population = [];

        // Mate pairs that are diverse enough (Hamming distance > d)
        // Since Hamming distance is expensive and OX is structural, we check if parents are different enough?
        // For QAP Permutations, we simulate CHC selection: Random pairing, check diff.
        // HUX is approximated by OX with high disruption or structural diff check.
        // Simplified CHC for Permutations: Always mate, check if child survives elitist selection later?
        // No, CHC strict rule: Incest Prevention.

        let matesCount = 0;
        // Randomize mating pool
        const pool = [...population];
        shuffleArray(pool);

        for (let i = 0; i < pool.length; i += 2) {
            if (i + 1 >= pool.length) break;
            const p1 = pool[i];
            const p2 = pool[i + 1];

            // Check distance (simple difference count for perms)
            const dist = hammingDistance(p1.permutation, p2.permutation);

            if (dist > threshold) {
                matesCount++;
                // HUX equivalent for Perms -> OX or PMX. Using OX.
                const c1Perm = oxCrossover(p1.permutation, p2.permutation);
                const c2Perm = oxCrossover(p2.permutation, p1.permutation); // Try both directions

                offspring.push({ permutation: c1Perm, cost: calculateQAPCost(c1Perm, instance.distance, instance.flow) });
                offspring.push({ permutation: c2Perm, cost: calculateQAPCost(c2Perm, instance.distance, instance.flow) });
            }
        }

        evals += offspring.length;

        if (matesCount === 0) {
            // Threshold Drop
            threshold = Math.max(0, threshold - 1);
        } else {
            // Elitist Selection: Combine Parent + Offspring, select best N
            const combined = [...population, ...offspring];
            combined.sort((a, b) => a.cost - b.cost);
            const newPop = combined.slice(0, popSize);

            // Check for stasis (Simplification: if pop didn't change much or identical)
            // CHC logic: if new population == old population (no offspring survived), drop threshold
            // Here we compare best costs as proxy or exact Identity?
            // "If no offspring is better than the worst parent" -> loosely implemented by checking if offspring entered

            const offspringSurvived = newPop.some(ind => offspring.includes(ind)); // This check is tricky with objects
            // Better: Check if best Improved? No, CHC accepts ANY improvement.

            if (!offspringSurvived && matesCount > 0) {
                threshold = Math.max(0, threshold - 1);
            }

            population = newPop;
        }

        if (population[0].cost < bestSol.cost) {
            bestSol = population[0];
        }

        // Restart (Cataclysmic)
        if (threshold === 0) {
            restartCount++;
            // Keep best, refill rest with mutated clones
            const survivors = [bestSol];
            const mutationStrength = Math.floor(n * 0.35); // Heavy mutation

            while (survivors.length < popSize) {
                const mutated = shuffleSublist(bestSol.permutation, mutationStrength);
                survivors.push({
                    permutation: mutated,
                    cost: calculateQAPCost(mutated, instance.distance, instance.flow)
                });
            }
            population = survivors;
            threshold = Math.floor(n * (1.0 - 0.35 * restartCount % 1.0) / 4); // Reset threshold logic... simplified: n/4
            threshold = Math.floor(n / 4);

            yield {
                population,
                bestPermutation: bestSol.permutation,
                bestCost: bestSol.cost,
                generation: gen,
                phase: 'restart',
                description: `Cataclysmic Restart! (Threshold 0)`,
                history
            };
        } else {
            yield {
                population,
                bestPermutation: bestSol.permutation,
                bestCost: bestSol.cost,
                generation: gen,
                phase: 'selection',
                description: `Gen ${gen}: Thresh ${threshold} | Mates ${matesCount}`,
                history
            };
        }

        history.push({ gen, best: bestSol.cost });
    }
}

// Helpers
function tournamentSelect(pop: { permutation: number[], cost: number }[], size = 2) {
    let best = pop[Math.floor(Math.random() * pop.length)];
    for (let i = 1; i < size; i++) {
        const candidate = pop[Math.floor(Math.random() * pop.length)];
        if (candidate.cost < best.cost) best = candidate;
    }
    return best;
}

function calculateAvg(pop: any[]) {
    return pop.reduce((sum, p) => sum + p.cost, 0) / pop.length;
}

function shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function hammingDistance(p1: number[], p2: number[]): number {
    let dist = 0;
    for (let i = 0; i < p1.length; i++) {
        if (p1[i] !== p2[i]) dist++;
    }
    return Math.floor(dist / 2); // Hamming for perms usually defined as swaps needed? Or just mismatches? 
    // CHC usually standard Hamming. For perms, mismatch count is fine proxy for diversity.
}
