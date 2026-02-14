import AlgorithmPlaceholder from "./AlgorithmPlaceholder";

export const TabuSearchPage = () => (
  <AlgorithmPlaceholder
    title="Tabu Search"
    module="Trajectories"
    description="Deterministic local search that avoids revisiting recent solutions using a tabu list of forbidden moves."
    parameters={[
      { name: "Tabu Tenure", defaultValue: "7" },
      { name: "Aspiration Criterion", defaultValue: "enabled" },
      { name: "Max Iterations", defaultValue: "1000" },
    ]}
  />
);

export const GRASPPage = () => (
  <AlgorithmPlaceholder
    title="GRASP"
    module="Trajectories"
    description="Greedy Randomized Adaptive Search Procedure — constructs solutions with a restricted candidate list, then applies local search."
    parameters={[
      { name: "α (RCL parameter)", defaultValue: "0.3" },
      { name: "Iterations", defaultValue: "100" },
      { name: "Local Search", defaultValue: "2-opt" },
    ]}
  />
);

export const ILSPage = () => (
  <AlgorithmPlaceholder
    title="Iterated Local Search"
    module="Multi-start"
    description="Iteratively perturbs and locally optimizes solutions, using acceptance criteria to balance exploration and exploitation."
    parameters={[
      { name: "Perturbation Strength", defaultValue: "3" },
      { name: "Acceptance", defaultValue: "Better" },
      { name: "Max Iterations", defaultValue: "500" },
    ]}
  />
);

export const VNSPage = () => (
  <AlgorithmPlaceholder
    title="Variable Neighborhood Search"
    module="Multi-start"
    description="Systematically changes neighborhoods to escape local optima, combining shaking, local search, and neighborhood change steps."
    parameters={[
      { name: "k_max (neighborhoods)", defaultValue: "5" },
      { name: "Local Search", defaultValue: "Best Improvement" },
      { name: "Max Iterations", defaultValue: "500" },
    ]}
  />
);

export const MultiStartPage = () => (
  <AlgorithmPlaceholder
    title="Multi-start"
    module="Multi-start"
    description="Generates multiple random starting solutions and applies local search to each, keeping the best overall result."
    parameters={[
      { name: "Restarts", defaultValue: "50" },
      { name: "Local Search", defaultValue: "First Improvement" },
    ]}
  />
);

export const GAPage = () => (
  <AlgorithmPlaceholder
    title="Genetic Algorithm"
    module="Bio-inspired"
    description="Evolutionary algorithm using selection, crossover, and mutation operators on a population of candidate solutions."
    parameters={[
      { name: "Population Size", defaultValue: "50" },
      { name: "Crossover Rate", defaultValue: "0.8" },
      { name: "Mutation Rate", defaultValue: "0.05" },
      { name: "Generations", defaultValue: "200" },
    ]}
  />
);

export const CHCPage = () => (
  <AlgorithmPlaceholder
    title="CHC"
    module="Bio-inspired"
    description="Cross-generational elitist selection, Heterogeneous recombination, and Cataclysmic mutation. A steady-state GA variant."
    parameters={[
      { name: "Population Size", defaultValue: "50" },
      { name: "Divergence Rate", defaultValue: "0.35" },
      { name: "Threshold", defaultValue: "n/4" },
    ]}
  />
);

export const ACOPage = () => (
  <AlgorithmPlaceholder
    title="Ant Colony Optimization"
    module="Bio-inspired"
    description="Swarm intelligence algorithm where artificial ants deposit pheromones to guide the colony toward optimal solutions."
    parameters={[
      { name: "Ants", defaultValue: "20" },
      { name: "α (pheromone weight)", defaultValue: "1.0" },
      { name: "β (heuristic weight)", defaultValue: "2.0" },
      { name: "Evaporation (ρ)", defaultValue: "0.1" },
    ]}
  />
);
