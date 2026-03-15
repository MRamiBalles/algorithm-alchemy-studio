import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { graphData, GraphNode, GraphLink, learningPaths, LearningPath } from '@/data/universitasGraph';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Lock, Sparkles, Brain, BookOpen, Route } from 'lucide-react';

const roleColors: Record<string, string> = {
    atom: '#FFFFFF',
    foundation: '#4444FF',
    pillar: '#00FFCC',
    nexus: '#8B5CF6',
    degree: '#0088FF',
    subject: '#64748b',
    legendary: '#FF0000',
    epistem: '#FFD700',
    axis: '#C0C0C0',
};

const UniversitasGraph = () => {
    const svgRef = useRef<SVGSVGElement>(null);
    const [nodes, setNodes] = useState<GraphNode[]>([]);
    const [links, setLinks] = useState<GraphLink[]>([]);
    const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
    const [activePath, setActivePath] = useState<LearningPath | null>(null);
    const navigate = useNavigate();

    const isNodeInPath = (nodeId: string): boolean => {
        if (!activePath) return false;
        return activePath.nodes.includes(nodeId);
    };

    const isLinkInPath = (link: GraphLink): boolean => {
        if (!activePath) return false;
        const pathNodes = activePath.nodes;
        for (let i = 0; i < pathNodes.length - 1; i++) {
            if ((link.source === pathNodes[i] && link.target === pathNodes[i + 1]) ||
                (link.target === pathNodes[i] && link.source === pathNodes[i + 1])) {
                return true;
            }
        }
        return false;
    };

    useEffect(() => {
        const width = 800;
        const height = 600;

        const initialNodes: GraphNode[] = graphData.nodes.map(n => ({
            ...n,
            x: width / 2 + (Math.random() - 0.5) * 300,
            y: height / 2 + (Math.random() - 0.5) * 250,
            vx: 0,
            vy: 0
        }));

        setNodes(initialNodes);
        setLinks(graphData.links);

        const simulationLoop = () => {
            setNodes(prevNodes => {
                const newNodes = prevNodes.map(node => ({ ...node }));

                // Repulsion
                for (let i = 0; i < newNodes.length; i++) {
                    for (let j = i + 1; j < newNodes.length; j++) {
                        const a = newNodes[i];
                        const b = newNodes[j];
                        const dx = a.x! - b.x!;
                        const dy = a.y! - b.y!;
                        const d = Math.sqrt(dx * dx + dy * dy) || 1;
                        const force = 4000 / (d * d);

                        const fx = (dx / d) * force;
                        const fy = (dy / d) * force;

                        a.vx! += fx;
                        a.vy! += fy;
                        b.vx! -= fx;
                        b.vy! -= fy;
                    }
                }

                // Attraction (Springs)
                graphData.links.forEach(link => {
                    const source = newNodes.find(n => n.id === link.source);
                    const target = newNodes.find(n => n.id === link.target);
                    if (source && target) {
                        const dx = target.x! - source.x!;
                        const dy = target.y! - source.y!;
                        const d = Math.sqrt(dx * dx + dy * dy) || 1;
                        const targetDist =
                            link.type === 'Ouroboros' ? 60 :
                                link.type === 'Genesis' ? 70 :
                                    link.type === 'Foundation' ? 80 :
                                        link.type === 'Pillar' ? 100 : 120;
                        const force = (d - targetDist) * 0.05;

                        const fx = (dx / d) * force;
                        const fy = (dy / d) * force;

                        source.vx! += fx;
                        source.vy! += fy;
                        target.vx! -= fx;
                        target.vy! -= fy;
                    }
                });

                // Center Gravity
                newNodes.forEach(node => {
                    const dx = width / 2 - node.x!;
                    const dy = height / 2 - node.y!;
                    node.vx! += dx * 0.005;
                    node.vy! += dy * 0.005;
                });

                // Update Positions
                newNodes.forEach(node => {
                    node.vx! *= 0.88;
                    node.vy! *= 0.88;
                    node.x! += node.vx!;
                    node.y! += node.vy!;

                    // Boundaries
                    node.x = Math.max(40, Math.min(760, node.x!));
                    node.y = Math.max(40, Math.min(560, node.y!));
                });

                return newNodes;
            });

            requestAnimationFrame(simulationLoop);
        };

        const animationId = requestAnimationFrame(simulationLoop);
        return () => cancelAnimationFrame(animationId);
    }, []);

    const handleNodeClick = (node: GraphNode) => {
        setSelectedNode(node);
    };

    const handleNavigate = (node: GraphNode) => {
        if (node.route) {
            navigate(node.route);
        }
    };

    const getNodeRadius = (node: GraphNode): number => {
        if (node.group === 'EPISTEM') return node.size || 16;
        if (node.group === 'AXIS') return node.size || 12;
        if (node.role === 'atom') return node.size || 18;
        if (node.role === 'legendary') return 16;
        if (node.level < 0) return 14; // Foundations
        if (node.level === 1) return 12; // Pillars
        if (node.level === 1.5) return 11; // Nexus
        if (node.role === 'degree') return 10;
        return 7;
    };

    const getNodeColor = (node: GraphNode): string => {
        return node.color || roleColors[node.role || 'subject'] || '#64748b';
    };

    const getLinkColor = (link: GraphLink): string => {
        if (link.type === 'Ouroboros') return '#FFFFFF';
        if (link.type === 'Genesis') return '#66CCFF';
        if (link.type === 'NeuralPath') return '#8B5CF6';
        if (link.type === 'Prerequisite') return '#8B5CF6';
        if (link.type === 'Specialization') return '#A78BFA';

        const sourceNode = nodes.find(n => n.id === link.source);
        if (sourceNode?.role === 'atom') return sourceNode.color || '#FFFFFF';

        return '#334155';
    };

    const isRelatedToSelected = (link: GraphLink): boolean => {
        if (!selectedNode) return false;
        return link.source === selectedNode.id || link.target === selectedNode.id;
    };

    return (
        <div className="relative w-full h-[600px] border border-cyan-500/20 rounded-xl bg-black/95 overflow-hidden shadow-2xl">
            {/* HUD Overlay: Version & Axiom */}
            <div className="absolute top-3 left-3 z-10 pointer-events-none max-w-[55%]">
                <p className="text-[10px] font-mono text-cyan-500/60 tracking-widest uppercase">
                    Universitas v16.0 · Capa 0 + Capa 1 + Capa 2
                </p>
                <p className="text-[10px] italic text-amber-200/40 mt-1 leading-snug font-serif">
                    «La realidad nunca te va a permitir que la traiciones. La realidad es incompatible con el idealismo: la mentira está en las apariencias.»
                </p>
            </div>

            {/* Manifiesto Button */}
            <button
                onClick={() => navigate('/content/courses/epistem/autocritica_epistemologica.md')}
                className="absolute top-3 right-3 z-10 flex items-center gap-1.5 px-3 py-1.5 bg-amber-900/30 border border-amber-500/30 rounded-lg text-amber-300/80 hover:text-amber-200 hover:bg-amber-900/50 transition-all text-[10px] font-mono uppercase tracking-wider"
            >
                <BookOpen className="w-3 h-3" />
                Manifiesto
            </button>

            <svg ref={svgRef} className="w-full h-full" viewBox="0 0 800 600">
                {/* Glow Filters */}
                <defs>
                    <filter id="glow-white" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="4" result="blur" />
                        <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                    <filter id="glow-violet" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feFlood floodColor="#8B5CF6" floodOpacity="0.4" result="color" />
                        <feComposite in="color" in2="blur" operator="in" result="shadow" />
                        <feMerge><feMergeNode in="shadow" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                    <filter id="glow-red" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="5" result="blur" />
                        <feFlood floodColor="#FF0000" floodOpacity="0.5" result="color" />
                        <feComposite in="color" in2="blur" operator="in" result="shadow" />
                        <feMerge><feMergeNode in="shadow" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                    <filter id="glow-magenta" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="4" result="blur" />
                        <feFlood floodColor="#FF00DD" floodOpacity="0.4" result="color" />
                        <feComposite in="color" in2="blur" operator="in" result="shadow" />
                        <feMerge><feMergeNode in="shadow" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                    <filter id="glow-gold" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="5" result="blur" />
                        <feFlood floodColor="#FFD700" floodOpacity="0.5" result="color" />
                        <feComposite in="color" in2="blur" operator="in" result="shadow" />
                        <feMerge><feMergeNode in="shadow" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                    <filter id="glow-silver" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feFlood floodColor="#C0C0C0" floodOpacity="0.3" result="color" />
                        <feComposite in="color" in2="blur" operator="in" result="shadow" />
                        <feMerge><feMergeNode in="shadow" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                </defs>

                {/* Depth Zone Rings */}
                <circle cx="400" cy="300" r="280" fill="none" stroke="#FFD70012" strokeWidth="1" strokeDasharray="6 4" />
                <text x="400" y="28" textAnchor="middle" className="text-[8px] fill-amber-500/20 font-mono">Z-4 EPISTEMOLOGÍA</text>
                <circle cx="400" cy="300" r="230" fill="none" stroke="#FFFFFF10" strokeWidth="1" strokeDasharray="4 4" />
                <text x="686" y="300" textAnchor="middle" className="text-[7px] fill-white/15 font-mono" transform="rotate(90,686,300)">Z-3 ÁTOMOS (CAPA 0)</text>
                <circle cx="400" cy="300" r="205" fill="none" stroke="#66CCFF08" strokeWidth="1" strokeDasharray="3 5" />
                <text x="605" y="300" textAnchor="middle" className="text-[6px] fill-cyan-400/12 font-mono" transform="rotate(90,605,300)">CAPA 1</text>
                <circle cx="400" cy="300" r="180" fill="none" stroke="#C0C0C010" strokeWidth="1" strokeDasharray="4 4" />
                <text x="114" y="300" textAnchor="middle" className="text-[7px] fill-gray-400/15 font-mono" transform="rotate(-90,114,300)">Z-2 EJES</text>
                <circle cx="400" cy="300" r="120" fill="none" stroke="#00FFCC08" strokeWidth="1" strokeDasharray="3 5" />
                <circle cx="400" cy="300" r="50" fill="none" stroke="#FF000015" strokeWidth="1.5" strokeDasharray="2 3" />
                <text x="400" y="256" textAnchor="middle" className="text-[7px] fill-red-500/20 font-mono">APEX</text>

                {/* Links */}
                {links.map((link, i) => {
                    const source = nodes.find(n => n.id === link.source);
                    const target = nodes.find(n => n.id === link.target);
                    if (!source || !target) return null;

                    const isHighlighted = isRelatedToSelected(link);
                    const isNeuralPath = link.type === 'NeuralPath' || link.type === 'Prerequisite' || link.type === 'Specialization';
                    const inPath = isLinkInPath(link);
                    const dimmed = activePath && !inPath;

                    return (
                        <motion.line
                            key={`link-${i}`}
                            x1={source.x} y1={source.y}
                            x2={target.x} y2={target.y}
                            stroke={inPath ? activePath!.color : (isHighlighted ? '#00ffff' : getLinkColor(link))}
                            strokeWidth={inPath ? 3 : (isHighlighted ? 2.5 : (isNeuralPath ? 1.5 : 1))}
                            strokeOpacity={dimmed ? 0.08 : (inPath ? 1 : (isHighlighted ? 1 : (isNeuralPath ? 0.7 : 0.35)))}
                            strokeDasharray={link.type === 'Sibling' ? '4 4' : undefined}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        />
                    );
                })}

                {/* Nodes */}
                {nodes.map((node) => {
                    const isSelected = selectedNode?.id === node.id;
                    const inPath = isNodeInPath(node.id);
                    const dimmed = activePath && !inPath;
                    const r = inPath ? getNodeRadius(node) + 3 : getNodeRadius(node);
                    const color = inPath ? activePath!.color : getNodeColor(node);
                    const glowFilter = node.group === 'EPISTEM'
                        ? 'url(#glow-gold)'
                        : node.group === 'AXIS'
                            ? 'url(#glow-silver)'
                            : node.role === 'atom' && node.color === '#FF00DD'
                                ? 'url(#glow-magenta)'
                                : node.role === 'atom'
                                    ? 'url(#glow-white)'
                                    : node.role === 'legendary'
                                        ? 'url(#glow-red)'
                                        : node.color === '#8B5CF6'
                                            ? 'url(#glow-violet)'
                                            : undefined;

                    // Path step number
                    const pathIndex = activePath ? activePath.nodes.indexOf(node.id) : -1;

                    return (
                        <motion.g
                            key={node.id}
                            onClick={() => handleNodeClick(node)}
                            className="cursor-pointer"
                            style={{ opacity: dimmed ? 0.15 : 1 }}
                        >
                            {/* Path Pulse Ring */}
                            {inPath && (
                                <circle cx={node.x} cy={node.y} r={r + 6} fill="none" stroke={activePath!.color} strokeWidth={1.5} strokeDasharray="4 3" opacity={0.7}>
                                    <animate attributeName="r" from={r + 4} to={r + 10} dur="1.5s" repeatCount="indefinite" />
                                    <animate attributeName="opacity" from="0.7" to="0" dur="1.5s" repeatCount="indefinite" />
                                </circle>
                            )}

                            {/* Outer Ring (selected) */}
                            {isSelected && (
                                <circle cx={node.x} cy={node.y} r={r + 5} fill="none" stroke="#00ffff" strokeWidth={1.5} strokeDasharray="3 3" opacity={0.8} />
                            )}

                            {/* Node Circle */}
                            <circle
                                cx={node.x}
                                cy={node.y}
                                r={r}
                                fill={color}
                                fillOpacity={inPath ? 1 : (node.role === 'atom' ? 0.9 : 0.8)}
                                filter={glowFilter}
                                stroke={isSelected ? '#fff' : 'none'}
                                strokeWidth={1.5}
                            />

                            {/* Path Step Number */}
                            {inPath && pathIndex >= 0 && (
                                <text
                                    x={node.x}
                                    y={node.y! + 4}
                                    textAnchor="middle"
                                    className="pointer-events-none select-none font-bold text-[11px]"
                                    fill="#000"
                                >
                                    {pathIndex + 1}
                                </text>
                            )}

                            {/* Label */}
                            <text
                                x={node.x}
                                y={node.y! + r + 14}
                                textAnchor="middle"
                                className={`pointer-events-none select-none font-mono ${inPath ? 'text-[10px] font-bold' :
                                    node.group === 'EPISTEM' ? 'text-[10px] font-bold' :
                                        node.group === 'AXIS' ? 'text-[9px] font-semibold' :
                                            node.role === 'atom' ? 'text-[11px] fill-white font-bold' :
                                                node.role === 'legendary' ? 'text-[10px] fill-red-400 font-bold' :
                                                    node.role === 'degree' ? 'text-[9px] fill-gray-300' :
                                                        'text-[8px] fill-gray-500'
                                    }`}
                                fill={inPath ? activePath!.color : node.group === 'EPISTEM' ? '#FFD700' : node.group === 'AXIS' ? '#C0C0C0' : undefined}
                            >
                                {node.label}
                            </text>
                        </motion.g>
                    );
                })}
            </svg>

            {/* Node Detail Panel */}
            <AnimatePresence>
                {selectedNode && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="absolute top-4 right-4 w-72 bg-slate-950/95 border border-cyan-500/30 p-4 rounded-lg backdrop-blur-md shadow-xl"
                    >
                        <div className="flex items-start justify-between mb-2">
                            <div>
                                <p className="text-[10px] uppercase tracking-widest text-cyan-500/70 font-mono mb-1">
                                    {selectedNode.role || selectedNode.group}
                                </p>
                                <h3 className="text-lg font-bold text-white">{selectedNode.label}</h3>
                            </div>
                            <button onClick={() => setSelectedNode(null)} className="text-gray-500 hover:text-white text-xs">✕</button>
                        </div>

                        {selectedNode.description && (
                            <p className="text-xs text-gray-400 mb-3 leading-relaxed">{selectedNode.description}</p>
                        )}

                        {selectedNode.historicalContext && (
                            <div className="mb-3 p-2 bg-[#ff8800]/10 border border-[#ff8800]/20 rounded-md">
                                <p className="text-[10px] font-mono text-[#ff8800]/70 uppercase mb-1 flex items-center gap-1">
                                    <span>🕰️</span> Contexto Histórico
                                </p>
                                <p className="text-[11px] text-[#ff8800]/80 leading-relaxed italic">
                                    {selectedNode.historicalContext}
                                </p>
                            </div>
                        )}

                        {/* Connected nodes */}
                        <div className="space-y-1 mb-3">
                            <p className="text-[10px] font-mono text-gray-500 uppercase">Conexiones:</p>
                            {graphData.links
                                .filter(l => l.source === selectedNode.id || l.target === selectedNode.id)
                                .slice(0, 6)
                                .map((l, i) => {
                                    const otherId = l.source === selectedNode.id ? l.target : l.source;
                                    const other = graphData.nodes.find(n => n.id === otherId);
                                    return (
                                        <div key={i} className="flex items-center gap-2 text-xs">
                                            <span className="text-cyan-500/50">→</span>
                                            <span className="text-gray-300">{other?.label}</span>
                                            <span className="text-gray-600 text-[10px] font-mono">{l.type}</span>
                                        </div>
                                    );
                                })}
                        </div>

                        {/* Action Button */}
                        {selectedNode.route && (
                            <button
                                onClick={() => handleNavigate(selectedNode)}
                                className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium mb-2 transition-all ${selectedNode.role === 'legendary'
                                    ? 'bg-red-600/20 border border-red-500/40 text-red-300 hover:bg-red-600/40'
                                    : selectedNode.color === '#8B5CF6'
                                        ? 'bg-violet-600/20 border border-violet-500/40 text-violet-300 hover:bg-violet-600/40'
                                        : 'bg-cyan-600/20 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-600/40'
                                    }`}
                            >
                                {selectedNode.role === 'legendary' ? <Sparkles className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                                {selectedNode.role === 'legendary' ? 'Acceder al Nodo Legendario' : 'Explorar'}
                            </button>
                        )}

                        {selectedNode.bibliographyPath && (
                            <button
                                onClick={() => navigate(selectedNode.bibliographyPath!)}
                                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600/20 border border-emerald-500/40 text-emerald-300 rounded-md text-sm font-medium hover:bg-emerald-600/40 transition-all"
                            >
                                <BookOpen className="w-4 h-4" />
                                Ver Bibliografía
                            </button>
                        )}

                        {!selectedNode.route && (
                            <div className="flex items-center gap-2 text-xs text-gray-500 border border-gray-800 rounded-md px-3 py-2">
                                <Lock className="w-3 h-3" />
                                Módulo en desarrollo
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Learning Path Selector Bar */}
            <div className="absolute bottom-3 left-3 right-3 z-10">
                <div className="flex items-center gap-2 bg-slate-950/90 backdrop-blur-md border border-slate-700/50 rounded-lg px-3 py-2">
                    <Route className="w-4 h-4 text-slate-500 shrink-0" />
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider shrink-0">Rutas:</span>
                    <div className="flex gap-2 overflow-x-auto">
                        {learningPaths.map((path) => (
                            <button
                                key={path.id}
                                onClick={() => setActivePath(activePath?.id === path.id ? null : path)}
                                className={`whitespace-nowrap px-3 py-1 rounded-full text-[11px] font-medium transition-all border ${activePath?.id === path.id
                                    ? 'text-white shadow-lg scale-105'
                                    : 'text-slate-400 hover:text-white border-slate-700 hover:border-slate-500 bg-slate-900/50'
                                    }`}
                                style={activePath?.id === path.id ? {
                                    backgroundColor: path.color + '30',
                                    borderColor: path.color,
                                    color: path.color,
                                    boxShadow: `0 0 12px ${path.color}40`
                                } : undefined}
                            >
                                {path.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UniversitasGraph;
