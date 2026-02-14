import { QAPInstance } from "./qap";

export function greedyConstructive(instance: QAPInstance): number[] {
    const n = instance.size;

    // 1. Calculate Potentials
    const flowPotential = instance.flow.map((row, i) => ({
        index: i,
        sum: row.reduce((a, b) => a + b, 0),
    }));
    const distPotential = instance.distance.map((row, i) => ({
        index: i,
        sum: row.reduce((a, b) => a + b, 0),
    }));

    // 2. Sort
    // Units: High flow -> Low flow (Descending)
    const unitsSorted = [...flowPotential].sort((a, b) => b.sum - a.sum);
    // Locations: Low distance -> High distance (Ascending)
    const locsSorted = [...distPotential].sort((a, b) => a.sum - b.sum);

    // 3. Assign
    const permutation = new Array(n).fill(-1);
    for (let i = 0; i < n; i++) {
        const unit = unitsSorted[i].index;
        const loc = locsSorted[i].index;
        permutation[unit] = loc;
    }

    return permutation;
}

export function calculateCost(instance: QAPInstance, permutation: number[]): number {
    let cost = 0;
    for (let i = 0; i < instance.size; i++) {
        for (let j = 0; j < instance.size; j++) {
            cost += instance.flow[i][j] * instance.distance[permutation[i]][permutation[j]];
        }
    }
    return cost;
}
