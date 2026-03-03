import React, { useState, useCallback, useRef } from 'react';
import { Play, RotateCcw, Cpu, ChevronRight } from 'lucide-react';

// Predefined DFA: accepts strings ending in "01"
// States: q0 (start), q1 (saw 0), q2 (saw 01, accept)
interface DFAState {
    id: string;
    label: string;
    x: number;
    y: number;
    isAccept: boolean;
    isStart: boolean;
}

interface DFATransition {
    from: string;
    to: string;
    symbol: string;
}

const PRESETS: Record<string, { name: string; desc: string; states: DFAState[]; transitions: DFATransition[]; alphabet: string }> = {
    ends01: {
        name: 'Termina en "01"',
        desc: 'L = { w ∈ {0,1}* | w termina en 01 }',
        alphabet: '01',
        states: [
            { id: 'q0', label: 'q₀', x: 120, y: 150, isAccept: false, isStart: true },
            { id: 'q1', label: 'q₁', x: 320, y: 150, isAccept: false, isStart: false },
            { id: 'q2', label: 'q₂', x: 520, y: 150, isAccept: true, isStart: false },
        ],
        transitions: [
            { from: 'q0', to: 'q0', symbol: '1' },
            { from: 'q0', to: 'q1', symbol: '0' },
            { from: 'q1', to: 'q1', symbol: '0' },
            { from: 'q1', to: 'q2', symbol: '1' },
            { from: 'q2', to: 'q1', symbol: '0' },
            { from: 'q2', to: 'q0', symbol: '1' },
        ],
    },
    even0s: {
        name: 'Nº par de ceros',
        desc: 'L = { w ∈ {0,1}* | w tiene un nº par de ceros }',
        alphabet: '01',
        states: [
            { id: 'q0', label: 'q₀', x: 200, y: 150, isAccept: true, isStart: true },
            { id: 'q1', label: 'q₁', x: 440, y: 150, isAccept: false, isStart: false },
        ],
        transitions: [
            { from: 'q0', to: 'q0', symbol: '1' },
            { from: 'q0', to: 'q1', symbol: '0' },
            { from: 'q1', to: 'q1', symbol: '1' },
            { from: 'q1', to: 'q0', symbol: '0' },
        ],
    },
    div3: {
        name: 'Divisible por 3',
        desc: 'L = { w ∈ {0,1}* | w (binario) es divisible por 3 }',
        alphabet: '01',
        states: [
            { id: 'q0', label: 'r=0', x: 320, y: 70, isAccept: true, isStart: true },
            { id: 'q1', label: 'r=1', x: 500, y: 220, isAccept: false, isStart: false },
            { id: 'q2', label: 'r=2', x: 140, y: 220, isAccept: false, isStart: false },
        ],
        transitions: [
            { from: 'q0', to: 'q0', symbol: '0' },
            { from: 'q0', to: 'q1', symbol: '1' },
            { from: 'q1', to: 'q2', symbol: '0' },
            { from: 'q1', to: 'q0', symbol: '1' },
            { from: 'q2', to: 'q1', symbol: '0' },
            { from: 'q2', to: 'q2', symbol: '1' },
        ],
    },
};

const W = 640;
const H = 300;
const R = 30;

export const AutomatonVisualizer: React.FC = () => {
    const [presetKey, setPresetKey] = useState<string>('ends01');
    const [inputString, setInputString] = useState('1001');
    const [currentState, setCurrentState] = useState<string | null>(null);
    const [step, setStep] = useState(-1);
    const [isRunning, setIsRunning] = useState(false);
    const [result, setResult] = useState<'accept' | 'reject' | null>(null);
    const [activeTransition, setActiveTransition] = useState<string | null>(null);
    const timerRef = useRef<number | null>(null);

    const preset = PRESETS[presetKey];

    const reset = useCallback(() => {
        if (timerRef.current) clearTimeout(timerRef.current);
        setCurrentState(null);
        setStep(-1);
        setIsRunning(false);
        setResult(null);
        setActiveTransition(null);
    }, []);

    const run = useCallback(() => {
        reset();
        setIsRunning(true);

        const chars = inputString.split('');
        let i = -1;
        let state = preset.states.find(s => s.isStart)!.id;

        const animateStep = () => {
            i++;
            if (i >= chars.length) {
                setCurrentState(state);
                const final = preset.states.find(s => s.id === state);
                setResult(final?.isAccept ? 'accept' : 'reject');
                setIsRunning(false);
                setStep(i);
                setActiveTransition(null);
                return;
            }

            const symbol = chars[i];
            const transition = preset.transitions.find(t => t.from === state && t.symbol === symbol);
            if (transition) {
                setActiveTransition(`${transition.from}-${transition.to}-${symbol}`);
                setCurrentState(state);
                setStep(i);

                timerRef.current = window.setTimeout(() => {
                    state = transition.to;
                    setCurrentState(state);
                    timerRef.current = window.setTimeout(animateStep, 400);
                }, 400);
            } else {
                setCurrentState(state);
                setResult('reject');
                setIsRunning(false);
                setActiveTransition(null);
            }
        };

        setCurrentState(state);
        timerRef.current = window.setTimeout(animateStep, 500);
    }, [inputString, preset, reset]);

    const getTransitionPath = (from: DFAState, to: DFAState, symbol: string): { path: string; labelX: number; labelY: number } => {
        if (from.id === to.id) {
            // Self-loop
            return {
                path: `M ${from.x - 8} ${from.y - R} A 20 20 0 1 1 ${from.x + 8} ${from.y - R}`,
                labelX: from.x,
                labelY: from.y - R - 28,
            };
        }

        // Check if there's a reverse transition
        const hasReverse = preset.transitions.some(t => t.from === to.id && t.to === from.id);

        if (hasReverse) {
            // Curve the arrow
            const dx = to.x - from.x;
            const dy = to.y - from.y;
            const mx = (from.x + to.x) / 2;
            const my = (from.y + to.y) / 2;
            const offset = 25;
            const nx = -dy / Math.sqrt(dx * dx + dy * dy) * offset;
            const ny = dx / Math.sqrt(dx * dx + dy * dy) * offset;
            return {
                path: `M ${from.x} ${from.y} Q ${mx + nx} ${my + ny} ${to.x} ${to.y}`,
                labelX: mx + nx * 1.5,
                labelY: my + ny * 1.5,
            };
        }

        // Straight line
        return {
            path: `M ${from.x} ${from.y} L ${to.x} ${to.y}`,
            labelX: (from.x + to.x) / 2,
            labelY: (from.y + to.y) / 2 - 12,
        };
    };

    return (
        <div className="my-8 p-4 rounded-xl border border-cyan-500/30 bg-black/80">
            <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                <div className="flex items-center gap-2">
                    <Cpu className="w-5 h-5 text-cyan-400" />
                    <h3 className="text-lg font-bold text-cyan-300 font-mono">Autómata Finito Determinista (DFA)</h3>
                </div>
                <div className="flex gap-2 flex-wrap">
                    <select
                        value={presetKey}
                        onChange={(e) => { setPresetKey(e.target.value); reset(); }}
                        disabled={isRunning}
                        className="px-2 py-1.5 rounded-lg bg-slate-800 border border-slate-600 text-white text-sm font-mono"
                    >
                        {Object.entries(PRESETS).map(([k, v]) => (
                            <option key={k} value={k}>{v.name}</option>
                        ))}
                    </select>
                </div>
            </div>

            <p className="text-xs text-slate-400 mb-2 font-mono">{preset.desc}</p>

            <div className="flex items-center gap-2 mb-3">
                <label className="text-xs text-slate-500 font-mono">Cadena:</label>
                <input
                    type="text"
                    value={inputString}
                    onChange={(e) => { setInputString(e.target.value.replace(/[^01]/g, '')); reset(); }}
                    disabled={isRunning}
                    maxLength={16}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-600 text-white text-sm font-mono w-44 tracking-[0.3em]"
                    placeholder="0101..."
                />
                <button
                    onClick={run}
                    disabled={isRunning || inputString.length === 0}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-700 text-white text-sm font-mono transition-colors"
                >
                    <Play className="w-3.5 h-3.5" /> Ejecutar
                </button>
                <button
                    onClick={reset}
                    disabled={isRunning}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 text-white text-sm font-mono transition-colors"
                >
                    <RotateCcw className="w-3.5 h-3.5" /> Reset
                </button>
            </div>

            {/* Input tape */}
            <div className="flex items-center gap-1 mb-3">
                <span className="text-xs text-slate-500 font-mono mr-2">Cinta:</span>
                {inputString.split('').map((ch, i) => (
                    <div
                        key={i}
                        className={`w-7 h-7 flex items-center justify-center rounded text-sm font-mono font-bold transition-all ${i < step ? 'bg-slate-700 text-slate-500' :
                                i === step ? 'bg-cyan-500 text-black scale-110 shadow-lg shadow-cyan-500/50' :
                                    'bg-slate-800 text-slate-300 border border-slate-600'
                            }`}
                    >
                        {ch}
                    </div>
                ))}
                {step >= 0 && step < inputString.length && (
                    <ChevronRight className="w-4 h-4 text-cyan-400 animate-pulse" />
                )}
            </div>

            <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ maxHeight: '320px' }}>
                {/* Transitions */}
                {preset.transitions.map((t) => {
                    const from = preset.states.find(s => s.id === t.from)!;
                    const to = preset.states.find(s => s.id === t.to)!;
                    const { path, labelX, labelY } = getTransitionPath(from, to, t.symbol);
                    const tKey = `${t.from}-${t.to}-${t.symbol}`;
                    const isActive = activeTransition === tKey;

                    return (
                        <g key={tKey}>
                            <path
                                d={path}
                                fill="none"
                                stroke={isActive ? '#06B6D4' : '#334155'}
                                strokeWidth={isActive ? 2.5 : 1.2}
                                markerEnd="url(#arrowhead)"
                                style={{ transition: 'all 0.3s ease' }}
                            />
                            <text
                                x={labelX} y={labelY}
                                textAnchor="middle"
                                className="text-[11px] font-mono font-bold"
                                fill={isActive ? '#06B6D4' : '#64748b'}
                            >
                                {t.symbol}
                            </text>
                        </g>
                    );
                })}

                {/* Arrow marker */}
                <defs>
                    <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="30" refY="3" orient="auto">
                        <polygon points="0 0, 8 3, 0 6" fill="#64748b" />
                    </marker>
                </defs>

                {/* Start arrow */}
                {preset.states.filter(s => s.isStart).map(s => (
                    <line key={`start-${s.id}`}
                        x1={s.x - 60} y1={s.y} x2={s.x - R - 2} y2={s.y}
                        stroke="#06B6D4" strokeWidth={2} markerEnd="url(#arrowhead)"
                    />
                ))}

                {/* States */}
                {preset.states.map((s) => {
                    const isActive = currentState === s.id;
                    const isAccepted = result === 'accept' && currentState === s.id;
                    const isRejected = result === 'reject' && currentState === s.id;

                    return (
                        <g key={s.id}>
                            {/* Active pulse */}
                            {isActive && !result && (
                                <circle cx={s.x} cy={s.y} r={R + 8} fill="none" stroke="#06B6D4" strokeWidth={1.5} opacity={0.6}>
                                    <animate attributeName="r" from={R + 4} to={R + 14} dur="1s" repeatCount="indefinite" />
                                    <animate attributeName="opacity" from="0.6" to="0" dur="1s" repeatCount="indefinite" />
                                </circle>
                            )}
                            {/* Accept double circle */}
                            {s.isAccept && (
                                <circle cx={s.x} cy={s.y} r={R + 5}
                                    fill="none"
                                    stroke={isAccepted ? '#10B981' : '#334155'}
                                    strokeWidth={1.5}
                                    strokeDasharray={isAccepted ? undefined : '3 3'}
                                />
                            )}
                            <circle
                                cx={s.x} cy={s.y} r={R}
                                fill={isAccepted ? '#10B981' : isRejected ? '#EF4444' : isActive ? '#164E63' : '#0F172A'}
                                stroke={isAccepted ? '#34D399' : isRejected ? '#F87171' : isActive ? '#06B6D4' : '#475569'}
                                strokeWidth={isActive ? 2.5 : 1.5}
                                style={{ transition: 'all 0.3s ease' }}
                            />
                            <text x={s.x} y={s.y + 5} textAnchor="middle"
                                className="text-[13px] font-mono font-bold"
                                fill={isAccepted || isRejected ? '#FFFFFF' : (isActive ? '#06B6D4' : '#94A3B8')}
                            >
                                {s.label}
                            </text>
                        </g>
                    );
                })}
            </svg>

            {result && (
                <div className={`mt-2 flex items-center gap-2 text-sm font-mono px-3 py-2 rounded-lg ${result === 'accept' ? 'bg-emerald-900/30 border border-emerald-500/30 text-emerald-300'
                        : 'bg-red-900/30 border border-red-500/30 text-red-300'
                    }`}>
                    <span className="text-lg">{result === 'accept' ? '✅' : '❌'}</span>
                    <span>
                        Cadena <strong className="text-white">"{inputString}"</strong>
                        {result === 'accept' ? ' ACEPTADA' : ' RECHAZADA'}
                        {' '}— estado final: <strong className="text-white">{currentState}</strong>
                        {result === 'accept' ? ' (estado de aceptación)' : ' (no es estado de aceptación)'}
                    </span>
                </div>
            )}

            <p className="mt-2 text-xs text-slate-500 italic font-mono">
                Doble círculo = estado de aceptación · Flecha entrante = estado inicial · Solo acepta símbolos {'{'}0, 1{'}'}
            </p>
        </div>
    );
};
