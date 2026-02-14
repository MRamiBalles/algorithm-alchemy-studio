import { useState, useCallback, useRef } from "react";
import {
  SAParams,
  SAIterationResult,
  DEFAULT_SA_PARAMS,
  calculateInitialTemperature,
  cauchySchedule,
  geometricSchedule,
  metropolisCriterion,
} from "@/lib/algorithms/sa";
import {
  QAPInstance,
  calculateQAPCost,
  generateRandomPermutation,
  swapNeighbor,
} from "@/lib/algorithms/qap";

export type SAStatus = "idle" | "running" | "paused" | "finished";

export function useSimulatedAnnealing(instance: QAPInstance, params: SAParams) {
  const [status, setStatus] = useState<SAStatus>("idle");
  const [history, setHistory] = useState<SAIterationResult[]>([]);
  const [currentStep, setCurrentStep] = useState<SAIterationResult | null>(null);
  const [bestPermutation, setBestPermutation] = useState<number[]>([]);
  const [bestCost, setBestCost] = useState<number>(Infinity);
  const [speed, setSpeed] = useState(1);

  const statusRef = useRef<SAStatus>("idle");
  const speedRef = useRef(1);
  speedRef.current = speed;

  const reset = useCallback(() => {
    statusRef.current = "idle";
    setStatus("idle");
    setHistory([]);
    setCurrentStep(null);
    setBestPermutation([]);
    setBestCost(Infinity);
  }, []);

  const pause = useCallback(() => {
    statusRef.current = "paused";
    setStatus("paused");
  }, []);

  const run = useCallback(async () => {
    const perm = generateRandomPermutation(instance.size);
    let currentPerm = [...perm];
    let currentCost = calculateQAPCost(currentPerm, instance.distance, instance.flow);
    let best = [...currentPerm];
    let bCost = currentCost;

    const t0 = calculateInitialTemperature(currentCost, params.mu, params.phi);
    let temperature = t0;
    let epoch = 0;
    let iteration = 0;

    statusRef.current = "running";
    setStatus("running");
    setBestPermutation(best);
    setBestCost(bCost);

    const allHistory: SAIterationResult[] = [];

    while (temperature > params.finalTemp && statusRef.current === "running") {
      let successes = 0;

      for (let l = 0; l < params.maxNeighbors && successes < params.maxSuccesses; l++) {
        // Check for pause - use indirect read to avoid TS narrowing
        const getStatus = () => statusRef.current;
        while (getStatus() === "paused") {
          await new Promise((r) => setTimeout(r, 100));
        }
        if (getStatus() !== "running") return;

        const { newPerm, i, j } = swapNeighbor(currentPerm);
        const newCost = calculateQAPCost(newPerm, instance.distance, instance.flow);
        const delta = newCost - currentCost;
        const { accepted, probability } = metropolisCriterion(delta, temperature);

        const result: SAIterationResult = {
          iteration,
          epoch,
          permutation: [...(accepted ? newPerm : currentPerm)],
          cost: accepted ? newCost : currentCost,
          bestCost: bCost,
          temperature,
          delta,
          probability,
          accepted,
          worseAccepted: accepted && delta > 0,
          swapI: i,
          swapJ: j,
        };

        if (accepted) {
          currentPerm = newPerm;
          currentCost = newCost;
          successes++;

          if (currentCost < bCost) {
            bCost = currentCost;
            best = [...currentPerm];
            setBestPermutation(best);
            setBestCost(bCost);
          }
        }

        result.bestCost = bCost;
        allHistory.push(result);
        setCurrentStep(result);
        setHistory([...allHistory]);

        iteration++;

        // Delay based on speed
        const delay = Math.max(10, 200 / speedRef.current);
        await new Promise((r) => setTimeout(r, delay));
      }

      epoch++;
      temperature =
        params.coolingSchedule === "cauchy"
          ? cauchySchedule(t0, epoch)
          : geometricSchedule(t0, epoch, params.alpha);
    }

    statusRef.current = "finished";
    setStatus("finished");
  }, [instance, params]);

  const start = useCallback(() => {
    if (statusRef.current === "paused") {
      statusRef.current = "running";
      setStatus("running");
    } else {
      run();
    }
  }, [run]);

  const stepForward = useCallback(() => {
    // For step mode, just run one iteration then pause
    // Simplified: just start and immediately pause
    if (statusRef.current === "idle") {
      run().then(() => {});
      setTimeout(() => pause(), 50);
    }
  }, [run, pause]);

  return {
    status,
    history,
    currentStep,
    bestPermutation,
    bestCost,
    speed,
    setSpeed,
    start,
    pause,
    reset,
    stepForward,
  };
}
