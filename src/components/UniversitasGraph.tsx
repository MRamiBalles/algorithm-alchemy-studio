import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { graphData, GraphNode, GraphLink } from '@/data/universitasGraph';

// Simple Vector Math
const distance = (a: GraphNode, b: GraphNode) => Math.sqrt(Math.pow(a.x! - b.x!, 2) + Math.pow(a.y! - b.y!, 2));

const UniversitasGraph = () => {
    const svgRef = useRef<SVGSVGElement>(null);
    const [nodes, setNodes] = useState<GraphNode[]>([]);
    const [links, setLinks] = useState<GraphLink[]>([]);
    const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
    const [tooltip, setTooltip] = useState<{ x: number, y: number, content: string } | null>(null);

    // Initial Setup
    useEffect(() => {
        const width = 800;
        const height = 600;

        // Clone data to avoid mutation issues
        const initialNodes: GraphNode[] = graphData.nodes.map(n => ({
            ...n,
            x: width / 2 + (Math.random() - 0.5) * 200,
            y: height / 2 + (Math.random() - 0.5) * 200,
            vx: 0,
            vy: 0
        }));

        setNodes(initialNodes);
        setLinks(graphData.links);

        // Simple Force Simulation
        const simulationLoop = () => {
            setNodes(prevNodes => {
                const newNodes = prevNodes.map(node => ({ ...node })); // Shallow copy

                // 1. Repulsion (Coulomb)
                for (let i = 0; i < newNodes.length; i++) {
                    for (let j = i + 1; j < newNodes.length; j++) {
                        const a = newNodes[i];
                        const b = newNodes[j];
                        const dx = a.x! - b.x!;
                        const dy = a.y! - b.y!;
                        const d = Math.sqrt(dx * dx + dy * dy) || 1;
                        const force = 3000 / (d * d); // Repulsion strength

                        const fx = (dx / d) * force;
                        const fy = (dy / d) * force;

                        a.vx! += fx;
                        a.vy! += fy;
                        b.vx! -= fx;
                        b.vy! -= fy;
                    }
                }

                // 2. Attraction (Springs)
                graphData.links.forEach(link => {
                    const source = newNodes.find(n => n.id === link.source);
                    const target = newNodes.find(n => n.id === link.target);
                    if (source && target) {
                        const dx = target.x! - source.x!;
                        const dy = target.y! - source.y!;
                        const d = Math.sqrt(dx * dx + dy * dy) || 1;
                        const targetDist = 100; // Optimal distance
                        const force = (d - targetDist) * 0.05; // Spring constant

                        const fx = (dx / d) * force;
                        const fy = (dy / d) * force;

                        source.vx! += fx;
                        source.vy! += fy;
                        target.vx! -= fx;
                        target.vy! -= fy;
                    }
                });

                // 3. Center Gravity
                newNodes.forEach(node => {
                    const dx = width / 2 - node.x!;
                    const dy = height / 2 - node.y!;
                    node.vx! += dx * 0.005;
                    node.vy! += dy * 0.005;
                });

                // 4. Update Positions (Velocity Verlet-ish)
                newNodes.forEach(node => {
                    node.vx! *= 0.9; // Friction
                    node.vy! *= 0.9;
                    node.x! += node.vx!;
                    node.y! += node.vy!;
                });

                return newNodes;
            });

            requestAnimationFrame(simulationLoop);
        };

        const animationId = requestAnimationFrame(simulationLoop);
        return () => cancelAnimationFrame(animationId);
    }, []);

    // Interaction
    const handleNodeClick = (node: GraphNode) => {
        setSelectedNode(node);
        // Highlight Bridge Logic
    };

    return (
        <div className="relative w-full h-[600px] border border-cyan-500/30 rounded-xl bg-black/90 overflow-hidden shadow-2xl">
            <svg
                ref={svgRef}
                className="w-full h-full"
                viewBox="0 0 800 600"
            >
                {/* Links */}
                {links.map((link, i) => {
                    const source = nodes.find(n => n.id === link.source);
                    const target = nodes.find(n => n.id === link.target);
                    if (!source || !target) return null;

                    const isRelated = selectedNode && (
                        link.source === selectedNode.id ||
                        link.target === selectedNode.id
                    );

                    return (
                        <motion.line
                            key={i}
                            x1={source.x} y1={source.y}
                            x2={target.x} y2={target.y}
                            stroke={isRelated ? "#00ffff" : "#334155"}
                            strokeWidth={isRelated ? 2 : 1}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        />
                    );
                })}

                {/* Nodes */}
                {nodes.map((node, i) => {
                    const isSelected = selectedNode?.id === node.id;
                    const isBridge = node.type === 'bridge';
                    const isAxis = node.id === 'Z7';

                    return (
                        <motion.g
                            key={node.id}
                            onClick={() => handleNodeClick(node)}
                            className="cursor-pointer"
                        >
                            <circle
                                cx={node.x}
                                cy={node.y}
                                r={node.size ? node.size : (isBridge ? 10 : 6)}
                                fill={isAxis ? "#a855f7" : isBridge ? "#00ffff" : "#64748b"}
                                stroke={isSelected ? "#fff" : "none"}
                                strokeWidth={2}
                            />
                            <text
                                x={node.x}
                                y={node.y! + 20}
                                textAnchor="middle"
                                className="text-[10px] fill-gray-300 font-mono pointer-events-none select-none"
                            >
                                {node.label}
                            </text>
                        </motion.g>
                    );
                })}
            </svg>

            {/* Overlay UI for Node Details */}
            <AnimatePresence>
                {selectedNode && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="absolute top-4 right-4 w-64 bg-slate-900/90 border border-cyan-500/50 p-4 rounded-lg backdrop-blur-md"
                    >
                        <h3 className="text-lg font-bold text-cyan-400">{selectedNode.label}</h3>
                        <p className="text-xs text-muted-foreground mb-4">Zone {selectedNode.group} :: Level {selectedNode.level}</p>

                        <div className="space-y-2">
                            {selectedNode.type === 'bridge' && (
                                <div className="bg-cyan-500/10 p-2 rounded border border-cyan-500/20">
                                    <p className="text-xs text-cyan-200">🚀 <strong>Bridge Module</strong></p>
                                    <p className="text-xs text-gray-400">This node connects Engineering to Reality.</p>
                                    <button className="mt-2 text-xs bg-cyan-600 hover:bg-cyan-500 px-3 py-1 rounded text-white w-full">
                                        Access Module
                                    </button>
                                </div>
                            )}
                            {selectedNode.group === 3 && (
                                <div className="text-xs text-gray-400">
                                    <p>Dependencies:</p>
                                    <ul className="list-disc pl-4 text-orange-400">
                                        <li>Chemistry (Z1.1)</li>
                                        <li>Physics (Z0.2)</li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default UniversitasGraph;
