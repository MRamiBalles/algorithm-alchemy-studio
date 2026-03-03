import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Play, RotateCcw, Zap } from 'lucide-react';

interface Cell {
    row: number;
    col: number;
    isWall: boolean;
    isStart: boolean;
    isEnd: boolean;
    isPath: boolean;
    isVisited: boolean;
    isFrontier: boolean;
    g: number;
    h: number;
    f: number;
    parent: Cell | null;
}

const ROWS = 20;
const COLS = 30;

const START = { row: 10, col: 3 };
const END = { row: 10, col: 26 };

function heuristic(a: Cell, b: Cell): number {
    return Math.abs(a.row - b.row) + Math.abs(a.col - b.col);
}

function createGrid(): Cell[][] {
    const grid: Cell[][] = [];
    for (let r = 0; r < ROWS; r++) {
        const row: Cell[] = [];
        for (let c = 0; c < COLS; c++) {
            row.push({
                row: r, col: c,
                isWall: false, isStart: r === START.row && c === START.col,
                isEnd: r === END.row && c === END.col,
                isPath: false, isVisited: false, isFrontier: false,
                g: Infinity, h: 0, f: Infinity, parent: null,
            });
        }
        grid.push(row);
    }
    return grid;
}

function addMaze(grid: Cell[][]): Cell[][] {
    const newGrid = grid.map(row => row.map(cell => ({ ...cell })));
    // Procedural walls
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            if (newGrid[r][c].isStart || newGrid[r][c].isEnd) continue;
            if (Math.random() < 0.28) newGrid[r][c].isWall = true;
        }
    }
    // Vertical corridors
    for (let c = 8; c <= 22; c += 7) {
        for (let r = 2; r < ROWS - 2; r++) {
            if (r === 10) continue;
            if (!newGrid[r][c].isStart && !newGrid[r][c].isEnd) newGrid[r][c].isWall = true;
        }
    }
    return newGrid;
}

export const AStarVisualizer: React.FC = () => {
    const [grid, setGrid] = useState<Cell[][]>(() => addMaze(createGrid()));
    const [isRunning, setIsRunning] = useState(false);
    const [isDone, setIsDone] = useState(false);
    const [stats, setStats] = useState({ visited: 0, pathLen: 0, time: 0 });
    const [isDrawing, setIsDrawing] = useState(false);
    const animRef = useRef<number | null>(null);

    const reset = useCallback(() => {
        if (animRef.current) cancelAnimationFrame(animRef.current);
        setGrid(addMaze(createGrid()));
        setIsRunning(false);
        setIsDone(false);
        setStats({ visited: 0, pathLen: 0, time: 0 });
    }, []);

    const clearPath = useCallback(() => {
        if (animRef.current) cancelAnimationFrame(animRef.current);
        setGrid(prev => prev.map(row => row.map(cell => ({
            ...cell, isVisited: false, isFrontier: false, isPath: false,
            g: Infinity, h: 0, f: Infinity, parent: null,
        }))));
        setIsRunning(false);
        setIsDone(false);
        setStats({ visited: 0, pathLen: 0, time: 0 });
    }, []);

    const handleCellClick = useCallback((r: number, c: number) => {
        if (isRunning) return;
        setGrid(prev => {
            const ng = prev.map(row => row.map(cell => ({ ...cell })));
            const cell = ng[r][c];
            if (cell.isStart || cell.isEnd) return prev;
            cell.isWall = !cell.isWall;
            cell.isVisited = false;
            cell.isFrontier = false;
            cell.isPath = false;
            return ng;
        });
    }, [isRunning]);

    const handleMouseDown = useCallback((r: number, c: number) => {
        if (isRunning) return;
        setIsDrawing(true);
        handleCellClick(r, c);
    }, [isRunning, handleCellClick]);

    const handleMouseEnter = useCallback((r: number, c: number) => {
        if (!isDrawing || isRunning) return;
        setGrid(prev => {
            const ng = prev.map(row => row.map(cell => ({ ...cell })));
            const cell = ng[r][c];
            if (cell.isStart || cell.isEnd) return prev;
            cell.isWall = true;
            return ng;
        });
    }, [isDrawing, isRunning]);

    useEffect(() => {
        const up = () => setIsDrawing(false);
        window.addEventListener('mouseup', up);
        return () => window.removeEventListener('mouseup', up);
    }, []);

    const runAStar = useCallback(() => {
        setIsRunning(true);
        const t0 = performance.now();

        // Deep copy grid
        const g = grid.map(row => row.map(cell => ({
            ...cell, isVisited: false, isFrontier: false, isPath: false,
            g: Infinity, h: 0, f: Infinity, parent: null,
        })));

        const start = g[START.row][START.col];
        const end = g[END.row][END.col];
        start.g = 0;
        start.h = heuristic(start, end);
        start.f = start.h;

        const openSet: Cell[] = [start];
        const closedSet = new Set<string>();
        const allSteps: { visited: string[]; frontier: string[]; path: string[] }[] = [];

        while (openSet.length > 0) {
            openSet.sort((a, b) => a.f - b.f);
            const current = openSet.shift()!;
            const key = `${current.row},${current.col}`;

            if (closedSet.has(key)) continue;
            closedSet.add(key);
            current.isVisited = true;

            // Found goal
            if (current.row === end.row && current.col === end.col) {
                let node: Cell | null = current;
                const pathCells: string[] = [];
                while (node) {
                    node.isPath = true;
                    pathCells.push(`${node.row},${node.col}`);
                    node = node.parent;
                }
                allSteps.push({
                    visited: Array.from(closedSet),
                    frontier: openSet.map(c => `${c.row},${c.col}`),
                    path: pathCells,
                });
                break;
            }

            // Neighbors (4-directional)
            const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
            for (const [dr, dc] of dirs) {
                const nr = current.row + dr;
                const nc = current.col + dc;
                if (nr < 0 || nr >= ROWS || nc < 0 || nc >= COLS) continue;
                const neighbor = g[nr][nc];
                if (neighbor.isWall || closedSet.has(`${nr},${nc}`)) continue;

                const tentG = current.g + 1;
                if (tentG < neighbor.g) {
                    neighbor.g = tentG;
                    neighbor.h = heuristic(neighbor, end);
                    neighbor.f = neighbor.g + neighbor.h;
                    neighbor.parent = current;
                    if (!openSet.includes(neighbor)) openSet.push(neighbor);
                }
            }

            allSteps.push({
                visited: Array.from(closedSet),
                frontier: openSet.map(c => `${c.row},${c.col}`),
                path: [],
            });
        }

        const elapsed = performance.now() - t0;

        // Animate steps
        let step = 0;
        const animate = () => {
            if (step >= allSteps.length) {
                const last = allSteps[allSteps.length - 1];
                setStats({ visited: last.visited.length, pathLen: last.path.length, time: Math.round(elapsed * 10) / 10 });
                setIsDone(true);
                setIsRunning(false);
                return;
            }

            const s = allSteps[step];
            setGrid(prev => prev.map(row => row.map(cell => {
                const k = `${cell.row},${cell.col}`;
                return {
                    ...cell,
                    isVisited: s.visited.includes(k),
                    isFrontier: s.frontier.includes(k),
                    isPath: s.path.includes(k),
                };
            })));

            step += Math.max(1, Math.floor(allSteps.length / 120));
            animRef.current = requestAnimationFrame(animate);
        };
        animRef.current = requestAnimationFrame(animate);
    }, [grid]);

    const getCellColor = (cell: Cell): string => {
        if (cell.isStart) return 'bg-emerald-500 shadow-lg shadow-emerald-500/50';
        if (cell.isEnd) return 'bg-red-500 shadow-lg shadow-red-500/50';
        if (cell.isPath) return 'bg-yellow-400 shadow-sm shadow-yellow-400/30';
        if (cell.isWall) return 'bg-slate-600';
        if (cell.isVisited) return 'bg-cyan-700/60';
        if (cell.isFrontier) return 'bg-blue-400/40';
        return 'bg-slate-800/60 hover:bg-slate-700/80';
    };

    return (
        <div className="my-8 p-4 rounded-xl border border-cyan-500/30 bg-black/80">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-yellow-400" />
                    <h3 className="text-lg font-bold text-cyan-300 font-mono">A* Pathfinding</h3>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={runAStar}
                        disabled={isRunning}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-700 text-white text-sm font-mono transition-colors"
                    >
                        <Play className="w-3.5 h-3.5" /> Ejecutar
                    </button>
                    <button
                        onClick={clearPath}
                        disabled={isRunning}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 text-white text-sm font-mono transition-colors"
                    >
                        Limpiar Ruta
                    </button>
                    <button
                        onClick={reset}
                        disabled={isRunning}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 text-white text-sm font-mono transition-colors"
                    >
                        <RotateCcw className="w-3.5 h-3.5" /> Nuevo Mapa
                    </button>
                </div>
            </div>

            <p className="text-xs text-slate-400 mb-2 font-mono">
                Haz clic o arrastra para crear/borrar muros.
                <span className="inline-block w-3 h-3 bg-emerald-500 mx-1 rounded-sm align-middle" /> Inicio
                <span className="inline-block w-3 h-3 bg-red-500 mx-1 rounded-sm align-middle" /> Meta
                <span className="inline-block w-3 h-3 bg-cyan-700 mx-1 rounded-sm align-middle" /> Visitado
                <span className="inline-block w-3 h-3 bg-yellow-400 mx-1 rounded-sm align-middle" /> Camino
            </p>

            <div
                className="grid gap-px mx-auto select-none"
                style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)`, maxWidth: '720px' }}
                onMouseLeave={() => setIsDrawing(false)}
            >
                {grid.flat().map(cell => (
                    <div
                        key={`${cell.row}-${cell.col}`}
                        className={`aspect-square rounded-[2px] transition-colors duration-150 cursor-pointer ${getCellColor(cell)}`}
                        onMouseDown={() => handleMouseDown(cell.row, cell.col)}
                        onMouseEnter={() => handleMouseEnter(cell.row, cell.col)}
                    />
                ))}
            </div>

            {isDone && (
                <div className="mt-3 flex gap-4 text-sm font-mono">
                    <span className="text-cyan-300">Nodos visitados: <strong className="text-white">{stats.visited}</strong></span>
                    <span className="text-yellow-300">Longitud camino: <strong className="text-white">{stats.pathLen}</strong></span>
                    <span className="text-slate-400">Tiempo: <strong className="text-white">{stats.time}ms</strong></span>
                </div>
            )}

            <p className="mt-3 text-xs text-slate-500 italic font-mono">
                f(n) = g(n) + h(n) · g = coste real desde el inicio · h = heurística Manhattan hasta la meta
            </p>
        </div>
    );
};
