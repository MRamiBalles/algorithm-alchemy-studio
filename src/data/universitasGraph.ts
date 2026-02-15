export interface GraphNode {
    id: string;
    group: number;
    label: string;
    level: number;
    size?: number;
    type?: 'bridge' | 'standard';
    role?: 'nucleus' | 'shell' | 'crust' | 'void'; // Atomic Model Roles
    description?: string; // Content placeholder
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
        // 1. THE NUCLEUS (The Truth / Fundamentals) - Center
        { id: "Z0.3", group: 0, label: "Philosophy", level: 0, role: "nucleus", size: 30, description: "The Why. Ethics, Metaphysics, Epistemology." },
        { id: "Z0.1", group: 0, label: "Mathematics", level: 0, role: "nucleus", size: 30, description: "The Abstract How. Logic, Algebra, Calculus." },
        { id: "Z0.2", group: 0, label: "Physics", level: 0, role: "nucleus", size: 30, description: "The Material What. Laws of Thermodynamics, Electromagnetism." },

        // 2. THE SHELL (The Interface / CS) - Orbiting the Nucleus
        { id: "Z7", group: 7, label: "COMPUTER SCIENCE", level: 1, role: "shell", size: 25, description: "The Universal Interface. Translates Truth into Code." },
        { id: "Z7.1", group: 7, label: "Hardware", level: 1, role: "shell", description: "Silicon manifestation of Physics." },
        { id: "Z7.2", group: 7, label: "Software", level: 1, role: "shell", description: "Logical manifestation of Math." },
        { id: "Z7.3", group: 7, label: "AI & Data", level: 1, role: "shell", description: "Operationalized Epistemology." },

        // 3. THE GENEALOGY (Intermediate Concepts - The Ingredients)
        // Born from Nucleus
        { id: "G_LOGIC", group: 0, label: "Boolean Logic", level: 1, role: "nucleus", size: 22, description: "True/False. The bridge between Math and Philosophy." },
        { id: "G_ELEC", group: 0, label: "Electromagnetism", level: 1, role: "nucleus", size: 22, description: "Flow of Electrons. The physical carrier of information." },
        { id: "G_LANG", group: 0, label: "Semantics", level: 1, role: "nucleus", size: 22, description: "Meaning & Syntax. The structure of communication." },

        // 4. THE CRUST (The Applications / Reality Domains) - Bonded to the Shell
        // Life
        { id: "Z3", group: 3, label: "LIFE", level: 2, role: "crust", size: 20 },
        { id: "Z3.1", group: 3, label: "Biology", level: 2, role: "crust" },
        // Replaced UHU_AGRO with the Concept
        { id: "CON_AGRO", group: 3, label: "Precision Agriculture", level: 2, role: "crust", type: "bridge", description: "Algorithmically optimized growth." },
        { id: "BRIDGE_BIO", group: 7, label: "Bio-Computation", level: 2, type: "bridge", role: "crust", size: 18, description: "Decoding the Genome." },

        // Matter
        { id: "Z1", group: 1, label: "MATTER", level: 2, role: "crust", size: 20 },
        { id: "Z1.1", group: 1, label: "Chemistry", level: 2, role: "crust" },

        // Engineering
        { id: "Z2", group: 2, label: "ENGINEERING", level: 2, role: "crust", size: 20 },

        // Mind
        { id: "Z4", group: 4, label: "MIND", level: 2, role: "crust", size: 20 },
        { id: "Z4.1", group: 4, label: "Psychology", level: 2, role: "crust" },

        // Society
        { id: "Z5", group: 5, label: "SOCIETY", level: 2, role: "crust", size: 20 },
        { id: "Z5.3", group: 5, label: "Law", level: 2, role: "crust" },
        { id: "BRIDGE_TRUST", group: 7, label: "Smart Contracts", level: 2, type: "bridge", role: "crust", size: 18, description: "Immutable Rules." },

        // Culture
        { id: "Z6", group: 6, label: "CULTURE", level: 2, role: "crust", size: 20 },
        { id: "Z6.3", group: 6, label: "Arts", level: 2, role: "crust" },
        { id: "BRIDGE_SIM", group: 7, label: "Game Physics", level: 2, type: "bridge", role: "crust", size: 18, description: "Simulated Reality." }

    ] as GraphNode[],
    links: [
        // 1. GENESIS (Roots -> Ingredients)
        { source: "Z0.1", target: "G_LOGIC", type: "derivation" }, // Math -> Logic
        { source: "Z0.3", target: "G_LOGIC", type: "derivation" }, // Phil -> Logic
        { source: "Z0.2", target: "G_ELEC", type: "derivation" },  // Phys -> Electricity
        { source: "Z0.3", target: "G_LANG", type: "derivation" },  // Phil -> Semantics

        // 2. SYNTHESIS (Ingredients -> Shell/Interface)
        // Hardware is born from Logic + Electricity
        { source: "G_LOGIC", target: "Z7.1", type: "synthesis" },
        { source: "G_ELEC", target: "Z7.1", type: "synthesis" },

        // Software is born from Logic + Semantics
        { source: "G_LOGIC", target: "Z7.2", type: "synthesis" },
        { source: "G_LANG", target: "Z7.2", type: "synthesis" },

        // AI is born from Math + Software + Epistemology (Phil)
        { source: "Z0.1", target: "Z7.3", type: "synthesis" },
        { source: "Z7.2", target: "Z7.3", type: "evolution" },

        // 3. INTERNAL BONDING (Shell Stability)
        { source: "Z7", target: "Z7.1", type: "bus" },
        { source: "Z7", target: "Z7.2", type: "bus" },
        { source: "Z7", target: "Z7.3", type: "bus" },

        // 4. CRYSTALLIZATION (Shell -> Crust/Applications)
        // Bio-Computation
        { source: "Z7.3", target: "BRIDGE_BIO", type: "application" },
        { source: "Z3.1", target: "BRIDGE_BIO", type: "domain" },

        // Smart Contracts
        { source: "Z7.2", target: "BRIDGE_TRUST", type: "application" },
        { source: "Z5.3", target: "BRIDGE_TRUST", type: "domain" },

        // Game Physics
        { source: "Z7.1", target: "BRIDGE_SIM", type: "application" },
        { source: "Z0.2", target: "BRIDGE_SIM", type: "simulation" }, // Physics simulates Physics

        // Agricultural Tech (The new UHU branch as a concept)
        { source: "Z7.3", target: "CON_AGRO", type: "optimization" }, // AI optimizations
        { source: "Z3.1", target: "CON_AGRO", type: "bio-systems" },  // Biology base
        { source: "Z1.1", target: "CON_AGRO", type: "chemistry" },    // Chemistry base
    ] as GraphLink[]
};
