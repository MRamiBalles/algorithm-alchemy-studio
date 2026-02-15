export interface GraphNode {
    id: string;
    group: number;
    label: string;
    level: number;
    size?: number;
    type?: 'bridge' | 'standard';
    x?: number;
    y?: number;
    vx?: number;
    vy?: number;
}

export interface GraphLink {
    source: string;
    target: string;
    type: string;
}

export const graphData = {
    nodes: [
        // ZONE 0: ROOTS (Center/Bottom)
        { id: "Z0", group: 0, label: "ROOTS (Axioms)", level: 0 },
        { id: "Z0.1", group: 0, label: "Mathematics", level: 1 },
        { id: "Z0.2", group: 0, label: "Physics", level: 1 },
        { id: "Z0.3", group: 0, label: "Philosophy", level: 1 },

        // ZONE 7: COMPUTER SCIENCE (Axis Mundi - Center)
        { id: "Z7", group: 7, label: "COMPUTER SCIENCE", level: 0, size: 25 },
        { id: "Z7.1", group: 7, label: "Hardware", level: 1 },
        { id: "Z7.2", group: 7, label: "Software", level: 1 },
        { id: "Z7.3", group: 7, label: "AI & Data", level: 1 },
        { id: "Z7.5", group: 7, label: "Simulation", level: 1 },

        // SATELLITES (The Reality)
        { id: "Z1", group: 1, label: "MATTER", level: 0 },
        { id: "Z1.1", group: 1, label: "Chemistry", level: 1 },
        { id: "Z1.2", group: 1, label: "Earth & Space", level: 1 },

        { id: "Z2", group: 2, label: "ENGINEERING", level: 0 },
        { id: "Z2.1", group: 2, label: "Physical Eng", level: 1 },
        { id: "Z2.2", group: 2, label: "Architecture", level: 1 },

        { id: "Z3", group: 3, label: "LIFE", level: 0 },
        { id: "Z3.1", group: 3, label: "Biology", level: 1 },
        { id: "Z3.2", group: 3, label: "Medicine", level: 1 },

        { id: "Z4", group: 4, label: "MIND", level: 0 },
        { id: "Z4.1", group: 4, label: "Psychology", level: 1 },
        { id: "Z4.2", group: 4, label: "Education", level: 1 },

        { id: "Z5", group: 5, label: "SOCIETY", level: 0 },
        { id: "Z5.1", group: 5, label: "Sociology", level: 1 },
        { id: "Z5.2", group: 5, label: "Economics", level: 1 },
        { id: "Z5.3", group: 5, label: "Law", level: 1 },

        { id: "Z6", group: 6, label: "CULTURE", level: 0 },
        { id: "Z6.1", group: 6, label: "History", level: 1 },
        { id: "Z6.3", group: 6, label: "Arts", level: 1 },

        // BRIDGES (The Content Modules)
        { id: "BRIDGE_BIO", group: 7, label: "Bio-Computation", type: "bridge", size: 15 },
        { id: "BRIDGE_TRUST", group: 7, label: "Smart Contracts", type: "bridge", size: 15 },
        { id: "BRIDGE_SIM", group: 7, label: "Game Physics", type: "bridge", size: 15 }
    ] as GraphNode[],
    links: [
        // Roots feeding Axis
        { source: "Z0.1", target: "Z7.2", type: "Foundation" },
        { source: "Z0.2", target: "Z7.1", "type": "Foundation" },
        { source: "Z0.3", target: "Z5.3", "type": "Foundation" },

        // Axis Simulating Reality
        { source: "Z7", target: "Z1", type: "Simulates" },
        { source: "Z7", target: "Z2", type: "Simulates" },
        { source: "Z7", target: "Z3", type: "Simulates" },
        { source: "Z7", target: "Z4", type: "Simulates" },
        { source: "Z7", target: "Z5", type: "Simulates" },
        { source: "Z7", target: "Z6", type: "Simulates" },

        // Internal Group Links (Hierarchies)
        { source: "Z0", target: "Z0.1", type: "Hierarchy" },
        { source: "Z0", target: "Z0.2", type: "Hierarchy" },
        { source: "Z0", target: "Z0.3", type: "Hierarchy" },

        { source: "Z1", target: "Z1.1", type: "Hierarchy" },
        { source: "Z1", target: "Z1.2", type: "Hierarchy" },

        { source: "Z2", target: "Z2.1", type: "Hierarchy" },
        { source: "Z2", target: "Z2.2", type: "Hierarchy" },

        { source: "Z3", target: "Z3.1", type: "Hierarchy" },
        { source: "Z3", target: "Z3.2", type: "Hierarchy" },

        { source: "Z4", target: "Z4.1", type: "Hierarchy" },
        { source: "Z4", target: "Z4.2", type: "Hierarchy" },

        { source: "Z5", target: "Z5.1", type: "Hierarchy" },
        { source: "Z5", target: "Z5.2", type: "Hierarchy" },
        { source: "Z5", target: "Z5.3", type: "Hierarchy" },

        { source: "Z6", target: "Z6.1", type: "Hierarchy" },
        { source: "Z6", target: "Z6.3", type: "Hierarchy" },

        { source: "Z7", target: "Z7.1", type: "Hierarchy" },
        { source: "Z7", target: "Z7.2", type: "Hierarchy" },
        { source: "Z7", target: "Z7.3", type: "Hierarchy" },
        { source: "Z7", target: "Z7.5", type: "Hierarchy" },

        // BRIDGE CONNECTIONS (The Interaction Loops)
        // Bio Loop
        { source: "Z3.1", target: "BRIDGE_BIO", type: "Inspiration" },
        { source: "Z7.3", target: "BRIDGE_BIO", type: "Implementation" },

        // Trust Loop
        { source: "Z5.3", target: "BRIDGE_TRUST", type: "Regulation" },
        { source: "Z7.2", target: "BRIDGE_TRUST", type: "Automation" },

        // Physics Loop
        { source: "Z0.2", target: "BRIDGE_SIM", type: "Laws" },
        { source: "Z7.5", target: "BRIDGE_SIM", type: "Virtualization" }
    ] as GraphLink[]
};
