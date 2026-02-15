"use client";

import { useEffect, useRef, useState } from "react";
import ForceGraph3D from "react-force-graph-3d";
import * as THREE from "three";
import SpriteText from "three-spritetext";

// Type definitions for our Graph Data
type Node = {
    id: string;
    group: string;
    label: string;
    level: number;
    color?: string;
    size?: number;
    x?: number;
    y?: number;
    z?: number;
};

type Link = {
    source: string | Node;
    target: string | Node;
    type: string;
};

type GraphData = {
    nodes: Node[];
    links: Link[];
};

export default function GraphContainer() {
    const fgRef = useRef<any>();
    const [data, setData] = useState<GraphData>({ nodes: [], links: [] });

    useEffect(() => {
        // Load the official graph data
        // In production, this would fetch from an API or the static JSON file
        // For this prototype, we'll load the local JSON directly
        fetch("/universitas_graph_data.json")
            .then((res) => res.json())
            .then((graphData) => setData(graphData));
    }, []);

    const handleNodeClick = (node: Node) => {
        // Zoom logic: Fly camera to the clicked node
        const distance = 40;
        const distRatio = 1 + distance / Math.hypot(node.x!, node.y!, node.z!);

        fgRef.current.cameraPosition(
            { x: node.x! * distRatio, y: node.y! * distRatio, z: node.z! * distRatio }, // new position
            { x: node.x!, y: node.y!, z: node.z! }, // lookAt ({ x, y, z })
            3000 // ms transition duration
        );
    };

    return (
        <div className="w-full h-screen bg-void">
            <ForceGraph3D
                ref={fgRef}
                graphData={data}
                nodeLabel="label"
                nodeColor={(node: any) => node.color || "#ffffff"}
                nodeVal={(node: any) => node.size || 5}

                // Custom Node Rendering for Atoms (Glowing Spheres)
                nodeThreeObject={(node: any) => {
                    if (node.group === "ATOM") {
                        const group = new THREE.Group();

                        // Core Sphere
                        const geometry = new THREE.SphereGeometry(node.size ? node.size / 2 : 10, 32, 32);
                        const material = new THREE.MeshLambertMaterial({
                            color: node.color,
                            transparent: true,
                            opacity: 0.9,
                            emissive: node.color,
                            emissiveIntensity: 0.5
                        });
                        const sphere = new THREE.Mesh(geometry, material);
                        group.add(sphere);

                        // Text Label
                        const sprite = new SpriteText(node.label);
                        sprite.color = node.color;
                        sprite.textHeight = 8;
                        sprite.position.y = 15;
                        group.add(sprite);

                        return group;
                    }
                    // Default rendering for other nodes (let the engine handle it or return null)
                    return null;
                }}

                // Link Styling
                linkWidth={1}
                linkColor={(link: any) => {
                    // Dynamic coloring based on source
                    if (link.source.group === "ATOM") return link.source.color;
                    if (link.type === "Ouroboros") return "#FFFFFF";
                    return "rgba(255,255,255,0.2)";
                }}
                linkDirectionalParticles={2}
                linkDirectionalParticleWidth={2}

                // Interaction & Physics
                onNodeClick={handleNodeClick}
                backgroundColor="#050505"

                // Auto-Rotation (The Generator Effect)
                onEngineStop={() => {
                    if (fgRef.current) {
                        fgRef.current.d3Force('charge').strength(-100);
                    }
                }}
            />
        </div>
    );
}
