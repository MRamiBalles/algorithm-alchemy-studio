import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface DNA {
    genes: { x: number; y: number }[];
}

interface Agent {
    pos: { x: number; y: number };
    vel: { x: number; y: number };
    acc: { x: number; y: number };
    dna: DNA;
    fitness: number;
    completed: boolean;
    crashed: boolean;
}

const LIFESPAN = 400;
const POP_SIZE = 100;
const MAX_FORCE = 0.2;

export const GeneticVisualizer: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [mutationRate, setMutationRate] = useState(0.01);
    const [generation, setGeneration] = useState(1);
    const [maxFitnessLog, setMaxFitnessLog] = useState<number>(0);

    // Simulation State Refs to avoid dependency cycles in requestAnimationFrame
    const state = useRef({
        population: [] as Agent[],
        target: { x: 300, y: 50 },
        obstacle: { x: 150, y: 200, w: 300, h: 20 },
        age: 0,
        animationId: 0,
        generation: 1
    });

    // Helpers
    const createDNA = (): DNA => {
        const genes = [];
        for (let i = 0; i < LIFESPAN; i++) {
            // Random 2D vector
            const angle = Math.random() * Math.PI * 2;
            genes.push({ x: Math.cos(angle) * MAX_FORCE, y: Math.sin(angle) * MAX_FORCE });
        }
        return { genes };
    };

    const createAgent = (dna?: DNA): Agent => {
        return {
            pos: { x: 300, y: 380 },
            vel: { x: 0, y: 0 },
            acc: { x: 0, y: 0 },
            dna: dna || createDNA(),
            fitness: 0,
            completed: false,
            crashed: false
        };
    };

    const initPopulation = () => {
        state.current.population = Array.from({ length: POP_SIZE }, () => createAgent());
        state.current.age = 0;
        state.current.generation = 1;
        setGeneration(1);
        setMaxFitnessLog(0);
    };

    const evaluateFitness = () => {
        let maxFit = 0;
        const { population, target } = state.current;

        population.forEach(agent => {
            const d = Math.hypot(target.x - agent.pos.x, target.y - agent.pos.y);
            // Map distance to fitness (closer = higher)
            agent.fitness = 100 / (d + 1); // Avoid div zero

            if (agent.completed) agent.fitness *= 10;
            if (agent.crashed) agent.fitness /= 10;

            if (agent.fitness > maxFit) maxFit = agent.fitness;
        });

        // Normalize
        population.forEach(agent => {
            agent.fitness /= maxFit;
        });

        setMaxFitnessLog(maxFit);
    };

    const nextGeneration = () => {
        const { population } = state.current;

        // Create mating pool
        const matingPool: Agent[] = [];
        population.forEach(agent => {
            // Add multiple copies based on fitness (0.0 - 1.0)
            const n = Math.floor(agent.fitness * 100);
            for (let j = 0; j < n; j++) {
                matingPool.push(agent);
            }
        });

        // Crossover and Mutate
        const newPopulation = population.map(() => {
            // Pick random parents
            const parentA = matingPool[Math.floor(Math.random() * matingPool.length)] || population[0];
            const parentB = matingPool[Math.floor(Math.random() * matingPool.length)] || population[0];

            // Crossover
            const newGenes = [];
            const midpoint = Math.floor(Math.random() * LIFESPAN);
            for (let i = 0; i < LIFESPAN; i++) {
                if (i > midpoint) newGenes[i] = parentA.dna.genes[i];
                else newGenes[i] = parentB.dna.genes[i];

                // Mutate
                if (Math.random() < mutationRate) {
                    const angle = Math.random() * Math.PI * 2;
                    newGenes[i] = { x: Math.cos(angle) * MAX_FORCE, y: Math.sin(angle) * MAX_FORCE };
                }
            }
            return createAgent({ genes: newGenes });
        });

        state.current.population = newPopulation;
        state.current.age = 0;
        state.current.generation++;
        setGeneration(state.current.generation);
    };

    const updatePhysics = () => {
        const { population, target, obstacle, age } = state.current;

        population.forEach(agent => {
            if (agent.crashed || agent.completed) return;

            // Apply DNA force
            const force = agent.dna.genes[age];
            agent.acc.x += force.x;
            agent.acc.y += force.y;

            // Physics integration
            agent.vel.x += agent.acc.x;
            agent.vel.y += agent.acc.y;
            agent.pos.x += agent.vel.x;
            agent.pos.y += agent.vel.y;
            agent.acc.x = 0; agent.acc.y = 0; // Clear acc

            // Check Target
            const d = Math.hypot(target.x - agent.pos.x, target.y - agent.pos.y);
            if (d < 16) {
                agent.completed = true;
                agent.pos.x = target.x;
                agent.pos.y = target.y;
            }

            // Check Obstacle
            if (agent.pos.x > obstacle.x && agent.pos.x < obstacle.x + obstacle.w &&
                agent.pos.y > obstacle.y && agent.pos.y < obstacle.y + obstacle.h) {
                agent.crashed = true;
            }

            // Check Walls
            if (agent.pos.x < 0 || agent.pos.x > 600 || agent.pos.y < 0 || agent.pos.y > 400) {
                agent.crashed = true;
            }
        });

        state.current.age++;
        if (state.current.age >= LIFESPAN) {
            evaluateFitness();
            nextGeneration();
        }
    };

    const draw = (ctx: CanvasRenderingContext2D) => {
        const { population, target, obstacle } = state.current;

        // Clear
        ctx.fillStyle = '#0f172a'; // slate-900
        ctx.fillRect(0, 0, 600, 400);

        // Draw Target
        ctx.beginPath();
        ctx.arc(target.x, target.y, 16, 0, Math.PI * 2);
        ctx.fillStyle = '#10b981'; // emerald-500
        ctx.fill();

        // Draw Obstacle
        ctx.fillStyle = '#e11d48'; // rose-600
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.w, obstacle.h);

        // Draw Agents
        population.forEach(agent => {
            ctx.beginPath();
            ctx.arc(agent.pos.x, agent.pos.y, 4, 0, Math.PI * 2);
            ctx.fillStyle = agent.completed ? '#10b981' : (agent.crashed ? '#475569' : '#06b6d4'); // cyan-500
            ctx.fill();
        });
    };

    const loop = () => {
        updatePhysics();
        if (canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');
            if (ctx) draw(ctx);
        }
        state.current.animationId = requestAnimationFrame(loop);
    };

    // Lifecycles
    useEffect(() => {
        initPopulation();
        if (canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');
            if (ctx) draw(ctx);
        }
        return () => cancelAnimationFrame(state.current.animationId);
    }, []);

    useEffect(() => {
        if (isPlaying) {
            state.current.animationId = requestAnimationFrame(loop);
        } else {
            cancelAnimationFrame(state.current.animationId);
        }
        return () => cancelAnimationFrame(state.current.animationId);
    }, [isPlaying]);


    return (
        <div className="w-full bg-slate-900 rounded-xl border border-slate-700 shadow-xl overflow-hidden my-8">
            <div className="bg-slate-800/50 p-4 border-b border-slate-700 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="p-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-full transition-colors flex items-center justify-center"
                    >
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                    </button>
                    <button
                        onClick={() => {
                            cancelAnimationFrame(state.current.animationId);
                            initPopulation();
                            setIsPlaying(false);
                            if (canvasRef.current) {
                                const ctx = canvasRef.current.getContext('2d');
                                if (ctx) draw(ctx);
                            }
                        }}
                        className="p-2 border border-slate-600 hover:bg-slate-700 text-slate-300 rounded-full transition-colors"
                        title="Resetear Simulación"
                    >
                        <RotateCcw className="w-4 h-4" />
                    </button>
                </div>
                <div className="flex items-center gap-4 text-sm font-mono">
                    <div className="flex flex-col">
                        <span className="text-slate-400 text-xs text-right">Generación</span>
                        <span className="text-cyan-400 font-bold">{generation}</span>
                    </div>
                    <div className="flex flex-col border-l border-slate-700 pl-4">
                        <span className="text-slate-400 text-xs text-right">Gen Mutación</span>
                        <input
                            type="range"
                            min="0" max="0.1" step="0.01"
                            value={mutationRate}
                            onChange={(e) => setMutationRate(parseFloat(e.target.value))}
                            className="w-24 accent-cyan-500"
                        />
                    </div>
                </div>
            </div>

            <div className="relative w-full aspect-[3/2] flex justify-center bg-slate-950 p-4">
                <canvas
                    ref={canvasRef}
                    width={600}
                    height={400}
                    className="rounded shadow-inner border border-slate-800 bg-slate-900 w-full h-auto object-contain"
                    style={{ maxWidth: '600px' }}
                />
                {!isPlaying && generation === 1 && state.current.age === 0 && (
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm pointer-events-none">
                        <p className="text-cyan-400 font-bold px-4 py-2 border border-cyan-500/50 rounded-lg bg-cyan-950/80 animate-pulse">
                            Pulsa PLAY para iniciar la selección natural
                        </p>
                    </div>
                )}
            </div>

            <div className="p-4 bg-slate-800/20 text-xs text-slate-400 font-mono border-t border-slate-700">
                <p><strong>Metaheurística Simulada:</strong> Población {POP_SIZE} | Pasos de vida: {LIFESPAN} | El muro rojo corta genes. Al final de la vida, se reproducen en base a su distancia al círculo verde.</p>
            </div>
        </div>
    );
};
