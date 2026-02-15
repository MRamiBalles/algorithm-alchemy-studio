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

        { id: "Z7", group: 7, label: "COMPUTER SCIENCE", level: 1, role: "shell", size: 25, description: "The Universal Interface. Translates Truth into Code." },
        { id: "Z7.1", group: 7, label: "Hardware", level: 1, role: "shell", description: "Silicon manifestation of Physics." },
        { id: "Z7.2", group: 7, label: "Software", level: 1, role: "shell", description: "Logical manifestation of Math." },
        { id: "Z7.3", group: 7, label: "AI & Data", level: 1, role: "shell", description: "Operationalized Epistemology." },

        // 1. LOGOS (The Analytical Mode - Truth) - The Roots
        { id: "LOGOS_MATH", group: 0, label: "Mathematics", level: 0, role: "nucleus", size: 30, description: "The Search for Pattern (Structure)." },
        { id: "LOGOS_PHYS", group: 0, label: "Physics", level: 0, role: "nucleus", size: 30, description: "The Search for Law (Nature)." },
        { id: "LOGOS_PHIL", group: 0, label: "Philosophy", level: 0, role: "nucleus", size: 30, description: "The Search for Meaning (Why?)." },

        // ingredients of Logos
        { id: "G_LOGIC", group: 0, label: "Logic", level: 1, role: "nucleus", size: 20 },
        { id: "G_MECH", group: 0, label: "Mechanics", level: 1, role: "nucleus", size: 20 },

        // 2. TECHNE (The Synthetic Mode - Utility) - The Trunk
        // The General Builder (Engineering Core)
        { id: "ENG_CORE", group: 7, label: "General Engineering", level: 1, role: "shell", size: 35, type: "bridge", description: "The Toolkit of Synthesis. Calculus, Systems, Ethics." },

        // The Tools
        { id: "Z7.1", group: 7, label: "Hardware", level: 2, role: "shell", description: "Physical Computing." },
        { id: "Z7.2", group: 7, label: "Software", level: 2, role: "shell", description: "Logical Computing." },
        { id: "Z7.3", group: 7, label: "AI Oracle", level: 2, role: "shell", description: "Automated Cognition." },

        // 3. ETHOS (The Humanistic Mode - Value) - The Crown
        { id: "ETHOS_PSYCH", group: 4, label: "Psychology", level: 1, role: "crust", size: 25, description: "The Human Mind." },
        { id: "ETHOS_EDU", group: 4, label: "Education", level: 1, role: "crust", size: 25, description: "Knowledge Transmission." },
        { id: "ETHOS_SOC", group: 5, label: "Sociology", level: 1, role: "crust", size: 25, description: "Collective Behavior." },

        // 4. THE ALCHEMY (The Reactions / New Fields)

        // Techne + Logos (Bio) = Agro/BioTech
        { id: "ALCH_AGRO", group: 3, label: "Precision Agriculture", level: 3, role: "crust", type: "bridge", description: "Optimization of Life Systems." },
        { id: "Z3.1", group: 3, label: "Biology", level: 2, role: "crust" },

        // Techne + Ethos = HCI / EdTech
        { id: "ALCH_HCI", group: 4, label: "HCI & UX", level: 3, role: "crust", type: "bridge", description: "Designing for the Human Mind." },

        // Techne + Civilization = Architecture
        { id: "Z2", group: 2, label: "Architecture", level: 2, role: "crust" },

    ] as GraphNode[],
    links: [
        // LOGOS Internal Bonds
        { source: "LOGOS_MATH", target: "LOGOS_PHYS", type: "axiom" },
        { source: "LOGOS_PHIL", target: "LOGOS_MATH", type: "axiom" },
        { source: "LOGOS_PHYS", target: "G_MECH", type: "derivation" },
        { source: "LOGOS_MATH", target: "G_LOGIC", type: "derivation" },

        // LOGOS feeds TECHNE (The Foundation of Engineering)
        { source: "LOGOS_MATH", target: "ENG_CORE", type: "foundation" }, // Calculus
        { source: "G_MECH", target: "ENG_CORE", type: "foundation" },     // Physics
        { source: "LOGOS_PHIL", target: "ENG_CORE", type: "foundation" }, // Ethics

        // TECHNE Branches (The Specializations)
        { source: "ENG_CORE", target: "Z7.1", type: "specialization" }, // Hardware
        { source: "ENG_CORE", target: "Z7.2", type: "specialization" }, // Software

        // ETHOS (The Goals)
        { source: "ETHOS_PSYCH", target: "ETHOS_EDU", type: "collaboration" },

        // ALCHEMICAL REACTIONS (The Mix)

        // Agro = Engineering (Tools) + Biology (Subject)
        { source: "ENG_CORE", target: "ALCH_AGRO", type: "application" },
        { source: "Z3.1", target: "ALCH_AGRO", type: "domain" },

        // HCI = Software (Tools) + Psychology (Subject)
        { source: "Z7.2", target: "ALCH_HCI", type: "application" },
        { source: "ETHOS_PSYCH", target: "ALCH_HCI", type: "domain" },

        // AI is the Oracle sitting between Math and Psychology
        { source: "LOGOS_MATH", target: "Z7.3", type: "synthesis" },
        { source: "ETHOS_PSYCH", target: "Z7.3", type: "inspiration" }, // Neural Networks
    ] as GraphLink[]
};
