import React, { useState, useCallback, useRef } from 'react';
import { Play, RotateCcw, Brain } from 'lucide-react';

const LAYER_SIZES = [4, 6, 6, 3];
const LAYER_LABELS = ['Entrada', 'Oculta 1', 'Oculta 2', 'Salida'];
const OUTPUT_LABELS = ['Gato', 'Perro', 'Pájaro'];
const INPUT_LABELS = ['Tamaño', 'Peso', 'Pelaje', 'Alas'];

const W = 680;
const H = 360;
const LAYER_GAP = W / (LAYER_SIZES.length + 1);

function sigmoid(x: number): number {
    return 1 / (1 + Math.exp(-x));
}

function randWeight(): number {
    return (Math.random() - 0.5) * 2;
}

interface NeuronState {
    activation: number;
    lit: boolean;
}

export const NeuralNetVisualizer: React.FC = () => {
    const [neurons, setNeurons] = useState<NeuronState[][]>(() =>
        LAYER_SIZES.map(size => Array.from({ length: size }, () => ({ activation: 0, lit: false })))
    );
    const [weights, setWeights] = useState<number[][][]>(() => {
        const w: number[][][] = [];
        for (let l = 0; l < LAYER_SIZES.length - 1; l++) {
            const layerW: number[][] = [];
            for (let i = 0; i < LAYER_SIZES[l]; i++) {
                const neuronW: number[] = [];
                for (let j = 0; j < LAYER_SIZES[l + 1]; j++) {
                    neuronW.push(randWeight());
                }
                layerW.push(neuronW);
            }
            w.push(layerW);
        }
        return w;
    });
    const [activeEdges, setActiveEdges] = useState<Set<string>>(new Set());
    const [isRunning, setIsRunning] = useState(false);
    const [prediction, setPrediction] = useState<string | null>(null);
    const animRef = useRef<number | null>(null);

    const getNeuronPos = (layer: number, index: number) => {
        const x = LAYER_GAP * (layer + 1);
        const layerSize = LAYER_SIZES[layer];
        const totalH = layerSize * 45;
        const startY = (H - totalH) / 2 + 22;
        const y = startY + index * 45;
        return { x, y };
    };

    const reset = useCallback(() => {
        if (animRef.current) cancelAnimationFrame(animRef.current);
        setNeurons(LAYER_SIZES.map(size => Array.from({ length: size }, () => ({ activation: 0, lit: false }))));
        setWeights(prev => {
            const w: number[][][] = [];
            for (let l = 0; l < LAYER_SIZES.length - 1; l++) {
                const layerW: number[][] = [];
                for (let i = 0; i < LAYER_SIZES[l]; i++) {
                    const neuronW: number[] = [];
                    for (let j = 0; j < LAYER_SIZES[l + 1]; j++) {
                        neuronW.push(randWeight());
                    }
                    layerW.push(neuronW);
                }
                w.push(layerW);
            }
            return w;
        });
        setActiveEdges(new Set());
        setIsRunning(false);
        setPrediction(null);
    }, []);

    const runForwardPass = useCallback(() => {
        setIsRunning(true);
        setPrediction(null);
        setActiveEdges(new Set());

        // Random input
        const inputs = Array.from({ length: LAYER_SIZES[0] }, () => Math.random());
        const allActivations: number[][] = [inputs];

        // Compute all layers
        for (let l = 0; l < weights.length; l++) {
            const prevLayer = allActivations[l];
            const nextLayer: number[] = [];
            for (let j = 0; j < LAYER_SIZES[l + 1]; j++) {
                let sum = 0;
                for (let i = 0; i < prevLayer.length; i++) {
                    sum += prevLayer[i] * weights[l][i][j];
                }
                nextLayer.push(sigmoid(sum));
            }
            allActivations.push(nextLayer);
        }

        // Animate layer by layer
        let currentLayer = 0;
        const animateLayer = () => {
            if (currentLayer >= allActivations.length) {
                // Show prediction
                const outputLayer = allActivations[allActivations.length - 1];
                const maxIdx = outputLayer.indexOf(Math.max(...outputLayer));
                setPrediction(OUTPUT_LABELS[maxIdx]);
                setIsRunning(false);
                return;
            }

            setNeurons(prev => {
                const next = prev.map(layer => layer.map(n => ({ ...n })));
                for (let i = 0; i < allActivations[currentLayer].length; i++) {
                    next[currentLayer][i] = { activation: allActivations[currentLayer][i], lit: true };
                }
                return next;
            });

            // Light up edges FROM this layer
            if (currentLayer < weights.length) {
                const edges = new Set<string>();
                for (let i = 0; i < LAYER_SIZES[currentLayer]; i++) {
                    for (let j = 0; j < LAYER_SIZES[currentLayer + 1]; j++) {
                        edges.add(`${currentLayer}-${i}-${j}`);
                    }
                }
                setActiveEdges(prev => new Set([...prev, ...edges]));
            }

            currentLayer++;
            setTimeout(animateLayer, 600);
        };

        // Reset all neurons first
        setNeurons(LAYER_SIZES.map(size => Array.from({ length: size }, () => ({ activation: 0, lit: false }))));
        setActiveEdges(new Set());

        setTimeout(animateLayer, 200);
    }, [weights]);

    const getActivationColor = (activation: number, lit: boolean): string => {
        if (!lit) return '#1e293b';
        const r = Math.round(activation * 139 + (1 - activation) * 30);
        const g = Math.round(activation * 92 + (1 - activation) * 41);
        const b = Math.round(activation * 246 + (1 - activation) * 59);
        return `rgb(${r},${g},${b})`;
    };

    return (
        <div className="my-8 p-4 rounded-xl border border-violet-500/30 bg-black/80">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    <Brain className="w-5 h-5 text-violet-400" />
                    <h3 className="text-lg font-bold text-violet-300 font-mono">Red Neuronal — Forward Pass</h3>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={runForwardPass}
                        disabled={isRunning}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 disabled:bg-slate-700 text-white text-sm font-mono transition-colors"
                    >
                        <Play className="w-3.5 h-3.5" /> Propagar
                    </button>
                    <button
                        onClick={reset}
                        disabled={isRunning}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 text-white text-sm font-mono transition-colors"
                    >
                        <RotateCcw className="w-3.5 h-3.5" /> Reset
                    </button>
                </div>
            </div>

            <p className="text-xs text-slate-400 mb-3 font-mono">
                Cada neurona computa: σ(Σ wᵢxᵢ) · Los pesos se inicializan aleatoriamente · La señal se propaga capa a capa
            </p>

            <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ maxHeight: '380px' }}>
                {/* Layer labels */}
                {LAYER_LABELS.map((label, l) => {
                    const x = LAYER_GAP * (l + 1);
                    return (
                        <text key={`label-${l}`} x={x} y={16} textAnchor="middle"
                            className="text-[9px] font-mono" fill="#64748b">
                            {label}
                        </text>
                    );
                })}

                {/* Edges */}
                {weights.map((layerW, l) =>
                    layerW.map((neuronW, i) =>
                        neuronW.map((w, j) => {
                            const from = getNeuronPos(l, i);
                            const to = getNeuronPos(l + 1, j);
                            const edgeKey = `${l}-${i}-${j}`;
                            const active = activeEdges.has(edgeKey);
                            const absW = Math.abs(w);
                            return (
                                <line
                                    key={edgeKey}
                                    x1={from.x} y1={from.y}
                                    x2={to.x} y2={to.y}
                                    stroke={active ? (w > 0 ? '#8B5CF6' : '#EF4444') : '#1e293b'}
                                    strokeWidth={active ? absW * 2 + 0.5 : 0.4}
                                    strokeOpacity={active ? 0.8 : 0.2}
                                    style={{ transition: 'all 0.5s ease' }}
                                />
                            );
                        })
                    )
                )}

                {/* Neurons */}
                {neurons.map((layer, l) =>
                    layer.map((neuron, i) => {
                        const pos = getNeuronPos(l, i);
                        const r = l === 0 || l === LAYER_SIZES.length - 1 ? 14 : 11;
                        return (
                            <g key={`neuron-${l}-${i}`}>
                                {/* Outer glow */}
                                {neuron.lit && neuron.activation > 0.5 && (
                                    <circle cx={pos.x} cy={pos.y} r={r + 6}
                                        fill="none" stroke="#8B5CF6" strokeWidth={1}
                                        opacity={neuron.activation * 0.5}>
                                        <animate attributeName="r" from={r + 4} to={r + 10} dur="1s" repeatCount="indefinite" />
                                        <animate attributeName="opacity" from={neuron.activation * 0.5} to="0" dur="1s" repeatCount="indefinite" />
                                    </circle>
                                )}
                                <circle
                                    cx={pos.x} cy={pos.y} r={r}
                                    fill={getActivationColor(neuron.activation, neuron.lit)}
                                    stroke={neuron.lit ? '#8B5CF6' : '#334155'}
                                    strokeWidth={neuron.lit ? 2 : 1}
                                    style={{ transition: 'all 0.4s ease' }}
                                />
                                {/* Activation value */}
                                {neuron.lit && (
                                    <text x={pos.x} y={pos.y + 3.5} textAnchor="middle"
                                        className="text-[8px] font-mono font-bold" fill="#fff">
                                        {neuron.activation.toFixed(2)}
                                    </text>
                                )}
                                {/* Input labels */}
                                {l === 0 && (
                                    <text x={pos.x - 22} y={pos.y + 3} textAnchor="end"
                                        className="text-[8px] font-mono" fill="#64748b">
                                        {INPUT_LABELS[i]}
                                    </text>
                                )}
                                {/* Output labels */}
                                {l === LAYER_SIZES.length - 1 && (
                                    <text x={pos.x + 22} y={pos.y + 3} textAnchor="start"
                                        className="text-[8px] font-mono" fill={neuron.lit && neuron.activation > 0.5 ? '#a78bfa' : '#64748b'}>
                                        {OUTPUT_LABELS[i]}
                                    </text>
                                )}
                            </g>
                        );
                    })
                )}
            </svg>

            {prediction && (
                <div className="mt-3 flex items-center gap-2 text-sm font-mono">
                    <span className="text-violet-400">Predicción:</span>
                    <span className="text-white font-bold text-lg">{prediction}</span>
                    <span className="text-slate-500 text-xs">(argmax de la capa de salida)</span>
                </div>
            )}

            <p className="mt-2 text-xs text-slate-500 italic font-mono">
                Pesos púrpura = excitatorios · Pesos rojos = inhibitorios · Brillo = activación alta (σ {'>'} 0.5)
            </p>
        </div>
    );
};
