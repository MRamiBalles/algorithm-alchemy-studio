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
        // const initialNodes: GraphNode[] = graphData.nodes.map(n => ({
        //     ...n,
        //     x: width / 2 + (Math.random() - 0.5) * 200,
        //     y: height / 2 + (Math.random() - 0.5) * 200,
        //     vx: 0,
        //     vy: 0
        // }));

        // setNodes(initialNodes);
        setNodes(graphData.nodes.map(n => ({
            ...n,
            x: (Math.random() - 0.5) * 100,
            y: (Math.random() - 0.5) * 100,
            vx: 0,
            vy: 0
        })));
        setLinks(graphData.links);

        // Simple Force Simulation
        const simulationLoop = () => {
            setNodes(prevNodes => {
                const newNodes = prevNodes.map(node => {
                    const updatedNode = { ...node };

                    // 1. METHODOLOGICAL QUADRANTS (Spatial Organization)
                    // We divide the space into 4 Zones based on the 'TOOL' or 'ROOT' group

                    let targetX = 0;
                    let targetY = 0;
                    let strength = 0.0;

                    // DEDUCTION (Top-Left): Math, Logic, CS (-X, -Y)
                    if (updatedNode.id === 'TOOL_DEDUCTION' || updatedNode.id.includes('LOGOS') || updatedNode.id.includes('Z7.') || updatedNode.group === 0) {
                        targetX = -150;
                        targetY = -150;
                        strength = 0.02;
                    }
                    // EMPIRICISM (Top-Right): Physics, Bio, Medicine (+X, -Y)
                    else if (updatedNode.id === 'TOOL_EMPIRICISM' || updatedNode.id.includes('DOM_') || updatedNode.group === 1 || updatedNode.group === 3) {
                        targetX = 150;
                        targetY = -150;
                        strength = 0.02;
                    }
                    // HERMENEUTICS (Bottom-Left): Philology, History, Law (-X, +Y)
                    else if (updatedNode.id === 'TOOL_HERMENEUTICS' || updatedNode.group === 4 || updatedNode.group === 5 || updatedNode.group === 6) {
                        targetX = -150;
                        targetY = 150;
                        strength = 0.02;
                    }
                    // SYNTHESIS (Bottom-Right): Engineering, Architecture, Art (+X, +Y)
                    else if (updatedNode.id === 'TOOL_SYNTHESIS' || updatedNode.id === 'ENG_CORE' || updatedNode.group === 2) {
                        targetX = 150;
                        targetY = 150;
                        strength = 0.02;
                    }

                    if (strength > 0) {
                        // Pull to Quadrant Center
                        updatedNode.vx! += (targetX - updatedNode.x!) * strength;
                        updatedNode.vy! += (targetY - updatedNode.y!) * strength;
                    }

                    // 2. ATOMIC ROLES (Fine Tuning)
                    if (updatedNode.role === 'nucleus') {
                        // Nucleus nodes stay tighter to their quadrant center
                        updatedNode.vx! *= 0.95;
                        updatedNode.vy! *= 0.95;
                    }
                    else if (updatedNode.role === 'shell') {
                        // Shell nodes orbit/wander a bit more
                        const angle = Date.now() * 0.001 + (updatedNode.group * 10);
                        updatedNode.vx! += Math.cos(angle) * 0.1;
                        updatedNode.vy! += Math.sin(angle) * 0.1;
                    }

                    // 3. UNIVERSAL FORCES

                    // Repulsion (Coulomb)
                    prevNodes.forEach(otherNode => {
                        if (updatedNode.id === otherNode.id) return;
                        const dx = updatedNode.x! - otherNode.x!;
                        const dy = updatedNode.y! - otherNode.y!;
                        const distSq = dx * dx + dy * dy || 1;
                        const dist = Math.sqrt(distSq);

                        if (dist < 120) {
                            const force = 250 / distSq;
                            updatedNode.vx! += (dx / dist) * force;
                            updatedNode.vy! += (dy / dist) * force;
                        }
                    });

                    // Spring Forces (Links)
                    links.forEach(link => {
                        const sourceId = typeof link.source === 'string' ? link.source : (link.source as any).id;
                        const targetId = typeof link.target === 'string' ? link.target : (link.target as any).id;

                        if (updatedNode.id === sourceId || updatedNode.id === targetId) {
                            const otherNodeId = updatedNode.id === sourceId ? targetId : sourceId;
                            const otherNode = prevNodes.find(n => n.id === otherNodeId);

                            if (otherNode) {
                                const dx = otherNode.x! - updatedNode.x!;
                                const dy = otherNode.y! - updatedNode.y!;
                                const dist = Math.sqrt(dx * dx + dy * dy) || 1;

                                // Tighter springs for Method-Links
                                const k = 0.02;

                                updatedNode.vx! += dx * k;
                                updatedNode.vy! += dy * k;
                            }
                        }
                    });

                    // Damping
                    updatedNode.vx! *= 0.90;
                    updatedNode.vy! *= 0.90;

                    updatedNode.x! += updatedNode.vx!;
                    updatedNode.y! += updatedNode.vy!;

                    return updatedNode;
                });
                return newNodes;
            });

            requestAnimationFrame(simulationLoop);
        };

        useEffect(() => {
            setNodes(graphData.nodes.map(n => ({
                ...n,
                x: (Math.random() - 0.5) * 100,
                y: (Math.random() - 0.5) * 100,
                vx: 0,
                vy: 0
            })));

            const animationId = requestAnimationFrame(simulationLoop);
            return () => {
                cancelAnimationFrame(animationId);
            };
        }, []);

        // Interaction
        const handleNodeClick = (node: GraphNode) => {
            setSelectedNode(node);
            // Highlight Bridge Logic
        };

        // Helper for node colors based on METHODOLOGY
        const getNodeColor = (node: GraphNode) => {
            if (node.id === selectedNode?.id) return "bg-white ring-4 ring-primary";

            // 1. DEDUCTION (Blue/Cyan)
            if (node.id === 'TOOL_DEDUCTION' || node.group === 0 || node.id.includes('Z7.'))
                return "bg-cyan-600 shadow-[0_0_15px_rgba(8,145,178,0.5)]";

            // 2. EMPIRICISM (Green/Emerald)
            if (node.id === 'TOOL_EMPIRICISM' || node.group === 1 || node.group === 3)
                return "bg-emerald-600 shadow-[0_0_15px_rgba(5,150,105,0.5)]";

            // 3. HERMENEUTICS (Purple/Violet)
            if (node.id === 'TOOL_HERMENEUTICS' || node.group === 4 || node.group === 5 || node.group === 6)
                return "bg-violet-600 shadow-[0_0_15px_rgba(124,58,237,0.5)]";

            // 4. SYNTHESIS (Orange/Amber)
            if (node.id === 'TOOL_SYNTHESIS' || node.group === 2)
                return "bg-amber-600 shadow-[0_0_15px_rgba(217,119,6,0.5)]";

            return "bg-zinc-700";
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
