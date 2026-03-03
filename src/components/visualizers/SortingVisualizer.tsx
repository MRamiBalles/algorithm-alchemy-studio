import React, { useState, useCallback, useRef } from 'react';
import { Play, RotateCcw, BarChart3 } from 'lucide-react';

const BAR_COUNT = 40;

type SortStep = { array: number[]; comparing: number[]; sorted: number[] };

function generateArray(): number[] {
    return Array.from({ length: BAR_COUNT }, () => Math.floor(Math.random() * 95) + 5);
}

function bubbleSortSteps(arr: number[]): SortStep[] {
    const steps: SortStep[] = [];
    const a = [...arr];
    const sorted: number[] = [];
    for (let i = a.length - 1; i > 0; i--) {
        for (let j = 0; j < i; j++) {
            steps.push({ array: [...a], comparing: [j, j + 1], sorted: [...sorted] });
            if (a[j] > a[j + 1]) {
                [a[j], a[j + 1]] = [a[j + 1], a[j]];
            }
        }
        sorted.push(i);
    }
    sorted.push(0);
    steps.push({ array: [...a], comparing: [], sorted: Array.from({ length: a.length }, (_, i) => i) });
    return steps;
}

function mergeSortSteps(arr: number[]): SortStep[] {
    const steps: SortStep[] = [];
    const a = [...arr];
    const sorted = new Set<number>();

    function merge(start: number, mid: number, end: number) {
        const left = a.slice(start, mid + 1);
        const right = a.slice(mid + 1, end + 1);
        let i = 0, j = 0, k = start;
        while (i < left.length && j < right.length) {
            steps.push({ array: [...a], comparing: [start + i, mid + 1 + j], sorted: [...sorted] });
            if (left[i] <= right[j]) {
                a[k++] = left[i++];
            } else {
                a[k++] = right[j++];
            }
        }
        while (i < left.length) { a[k++] = left[i++]; }
        while (j < right.length) { a[k++] = right[j++]; }
        for (let x = start; x <= end; x++) sorted.add(x);
        steps.push({ array: [...a], comparing: [], sorted: [...sorted] });
    }

    function sort(start: number, end: number) {
        if (start >= end) return;
        const mid = Math.floor((start + end) / 2);
        sort(start, mid);
        sort(mid + 1, end);
        merge(start, mid, end);
    }

    sort(0, a.length - 1);
    steps.push({ array: [...a], comparing: [], sorted: Array.from({ length: a.length }, (_, i) => i) });
    return steps;
}

export const SortingVisualizer: React.FC = () => {
    const [array, setArray] = useState(generateArray);
    const [displayArray, setDisplayArray] = useState<number[]>(() => [...array]);
    const [comparing, setComparing] = useState<number[]>([]);
    const [sortedIndices, setSortedIndices] = useState<number[]>([]);
    const [algorithm, setAlgorithm] = useState<'bubble' | 'merge'>('merge');
    const [isRunning, setIsRunning] = useState(false);
    const [isDone, setIsDone] = useState(false);
    const [stats, setStats] = useState({ steps: 0, comparisons: 0 });
    const timerRef = useRef<number | null>(null);

    const reset = useCallback(() => {
        if (timerRef.current) clearTimeout(timerRef.current);
        const newArr = generateArray();
        setArray(newArr);
        setDisplayArray([...newArr]);
        setComparing([]);
        setSortedIndices([]);
        setIsRunning(false);
        setIsDone(false);
        setStats({ steps: 0, comparisons: 0 });
    }, []);

    const runSort = useCallback(() => {
        setIsRunning(true);
        setIsDone(false);
        setComparing([]);
        setSortedIndices([]);

        const steps = algorithm === 'bubble' ? bubbleSortSteps(array) : mergeSortSteps(array);
        const totalComps = steps.filter(s => s.comparing.length > 0).length;

        let i = 0;
        const speed = algorithm === 'bubble' ? 8 : 30;
        const skip = algorithm === 'bubble' ? Math.max(1, Math.floor(steps.length / 300)) : 1;

        const animate = () => {
            if (i >= steps.length) {
                setIsDone(true);
                setIsRunning(false);
                setStats({ steps: steps.length, comparisons: totalComps });
                return;
            }
            const step = steps[i];
            setDisplayArray(step.array);
            setComparing(step.comparing);
            setSortedIndices(step.sorted);
            i += skip;
            timerRef.current = window.setTimeout(animate, speed);
        };
        animate();
    }, [array, algorithm]);

    const maxVal = Math.max(...displayArray);

    const getBarColor = (index: number): string => {
        if (comparing.includes(index)) return '#FBBF24';
        if (sortedIndices.includes(index)) return '#10B981';
        return '#3B82F6';
    };

    return (
        <div className="my-8 p-4 rounded-xl border border-blue-500/30 bg-black/80">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-blue-400" />
                    <h3 className="text-lg font-bold text-blue-300 font-mono">Comparación de Ordenamiento</h3>
                </div>
                <div className="flex gap-2">
                    <select
                        value={algorithm}
                        onChange={(e) => { setAlgorithm(e.target.value as 'bubble' | 'merge'); reset(); }}
                        disabled={isRunning}
                        className="px-2 py-1.5 rounded-lg bg-slate-800 border border-slate-600 text-white text-sm font-mono"
                    >
                        <option value="merge">Merge Sort — O(N log N)</option>
                        <option value="bubble">Bubble Sort — O(N²)</option>
                    </select>
                    <button
                        onClick={runSort}
                        disabled={isRunning}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 text-white text-sm font-mono transition-colors"
                    >
                        <Play className="w-3.5 h-3.5" /> Ordenar
                    </button>
                    <button
                        onClick={reset}
                        disabled={isRunning}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 text-white text-sm font-mono transition-colors"
                    >
                        <RotateCcw className="w-3.5 h-3.5" /> Nuevo
                    </button>
                </div>
            </div>

            <p className="text-xs text-slate-400 mb-2 font-mono">
                <span className="inline-block w-3 h-3 bg-blue-500 mx-1 rounded-sm align-middle" /> Sin ordenar
                <span className="inline-block w-3 h-3 bg-yellow-400 mx-1 rounded-sm align-middle" /> Comparando
                <span className="inline-block w-3 h-3 bg-emerald-500 mx-1 rounded-sm align-middle" /> Ordenado
            </p>

            <div className="flex items-end gap-[2px] h-48 bg-slate-900/50 rounded-lg p-2">
                {displayArray.map((val, i) => (
                    <div
                        key={i}
                        className="flex-1 rounded-t-sm transition-all duration-75"
                        style={{
                            height: `${(val / maxVal) * 100}%`,
                            backgroundColor: getBarColor(i),
                            boxShadow: comparing.includes(i) ? '0 0 8px #FBBF24' : undefined,
                        }}
                    />
                ))}
            </div>

            {isDone && (
                <div className="mt-3 flex gap-4 text-sm font-mono">
                    <span className="text-blue-300">Algoritmo: <strong className="text-white">{algorithm === 'merge' ? 'Merge Sort' : 'Bubble Sort'}</strong></span>
                    <span className="text-yellow-300">Pasos: <strong className="text-white">{stats.steps}</strong></span>
                    <span className="text-emerald-300">Comparaciones: <strong className="text-white">{stats.comparisons}</strong></span>
                </div>
            )}

            <p className="mt-2 text-xs text-slate-500 italic font-mono">
                {algorithm === 'merge'
                    ? 'Divide y Vencerás: divide recursivamente, ordena mitades, combina → O(N log N) garantizado'
                    : 'Fuerza bruta: compara pares adyacentes, burbujea el mayor al final → O(N²) siempre'
                }
            </p>
        </div>
    );
};
