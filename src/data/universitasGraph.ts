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

        // 1. THE TOOLS OF KNOWLEDGE (The Methodologies - The "How")
        // These are the Central Engines of the Graph
        { id: "TOOL_DEDUCTION", group: 0, label: "DEDUCTION", level: 1, role: "nucleus", size: 35, type: "bridge", description: "The Formal Method. Axioms -> Theorems. (Math, Logic)" },
        { id: "TOOL_EMPIRICISM", group: 3, label: "EMPIRICISM", level: 1, role: "nucleus", size: 35, type: "bridge", description: "The Scientific Method. Observation -> Hypothesis. (Science)" },
        { id: "TOOL_HERMENEUTICS", group: 5, label: "HERMENEUTICS", level: 1, role: "nucleus", size: 35, type: "bridge", description: "The Interpretive Method. Text -> Meaning. (Humanities)" },
        { id: "TOOL_SYNTHESIS", group: 7, label: "SYNTHESIS", level: 1, role: "nucleus", size: 35, type: "bridge", description: "The Design Method. Problem -> Solution. (Engineering/Art)" },

        // 2. THE DOMAINS (Grouped by Method)

        // A. DEDUCTIVE DOMAINS (Logos)
        { id: "LOGOS_MATH", group: 0, label: "Mathematics", level: 0, role: "nucleus" },
        { id: "LOGOS_LOGIC", group: 0, label: "Logic", level: 0, role: "nucleus" },
        { id: "Z7.2", group: 7, label: "Computer Science", level: 2, role: "shell", description: "Applied Deduction (Algorithms)." },

        // B. EMPIRICAL DOMAINS (Nature)
        { id: "DOM_PHYS", group: 1, label: "Physics", level: 2, role: "crust" },
        { id: "DOM_BIO", group: 3, label: "Biology", level: 2, role: "crust" },
        { id: "UGR_MED", group: 3, label: "Medicine (UGR)", level: 2, role: "crust", description: "Applied Empiricism to Body." },
        { id: "UGR_ENV", group: 3, label: "Env. Science (UGR)", level: 2, role: "crust" },

        // C. HERMENEUTIC DOMAINS (Culture)
        { id: "DOM_PHIL", group: 4, label: "Philosophy", level: 0, role: "nucleus", description: "The Origin of Inquiry." },
        { id: "UGR_HIST", group: 6, label: "History (UGR)", level: 2, role: "crust" },
        { id: "UGR_LIT", group: 6, label: "Literature (UGR)", level: 2, role: "crust" },
        { id: "UGR_LAW", group: 5, label: "Law (UGR)", level: 2, role: "crust", description: "Interpretive Normative Systems." },

        // D. SYNTHETIC DOMAINS (Creation)
        { id: "ENG_CORE", group: 2, label: "General Engineering", level: 2, role: "shell" },
        { id: "UGR_ARCH", group: 2, label: "Architecture (UGR)", level: 2, role: "crust" },
        { id: "UGR_ART", group: 6, label: "Fine Arts (UGR)", level: 2, role: "crust" },
        { id: "UHU_AGRO", group: 3, label: "Agro-Engineering", level: 2, role: "crust" },

        // E. THE HYBRIDS (Inter-Method)
        { id: "HYBRID_AI", group: 7, label: "Artificial Intelligence", level: 3, role: "shell", type: "bridge", description: "Deduction simulating Empiricism." },
        { id: "HYBRID_PSYCH", group: 4, label: "Psychology", level: 3, role: "crust", type: "bridge", description: "Empiricism applied to Hermeneutics (Mind)." },

    ] as GraphNode[],
    links: [
        // DEDUCTION CONNECTIONS
        { source: "TOOL_DEDUCTION", target: "LOGOS_MATH", type: "method" },
        { source: "TOOL_DEDUCTION", target: "LOGOS_LOGIC", type: "method" },
        { source: "TOOL_DEDUCTION", target: "Z7.2", type: "foundation" }, // CS uses Deduction

        // EMPIRICISM CONNECTIONS
        { source: "TOOL_EMPIRICISM", target: "DOM_PHYS", type: "method" },
        { source: "TOOL_EMPIRICISM", target: "DOM_BIO", type: "method" },
        { source: "TOOL_EMPIRICISM", target: "UGR_MED", type: "method" },
        { source: "TOOL_EMPIRICISM", target: "UGR_ENV", type: "method" },

        // HERMENEUTICS CONNECTIONS
        { source: "TOOL_HERMENEUTICS", target: "DOM_PHIL", type: "method" },
        { source: "TOOL_HERMENEUTICS", target: "UGR_HIST", type: "method" },
        { source: "TOOL_HERMENEUTICS", target: "UGR_LIT", type: "method" },
        { source: "TOOL_HERMENEUTICS", target: "UGR_LAW", type: "method" },

        // SYNTHESIS CONNECTIONS
        { source: "TOOL_SYNTHESIS", target: "ENG_CORE", type: "method" },
        { source: "TOOL_SYNTHESIS", target: "UGR_ARCH", type: "method" },
        { source: "TOOL_SYNTHESIS", target: "UGR_ART", type: "method" },
        { source: "ENG_CORE", target: "UHU_AGRO", type: "branch" },

        // CROSS-METHOD FLOWS
        // Physics (Empirical) feeds Engineering (Synthetic)
        { source: "DOM_PHYS", target: "TOOL_SYNTHESIS", type: "input" },

        // Math (Deductive) feeds Physics (Empirical)
        { source: "LOGOS_MATH", target: "TOOL_EMPIRICISM", type: "language" },

        // AI (Hybrid)
        { source: "TOOL_DEDUCTION", target: "HYBRID_AI", type: "algorithm" }, // It's code
        { source: "TOOL_EMPIRICISM", target: "HYBRID_AI", type: "data" }, // It learns from data

        // Psychology (Hybrid)
        { source: "TOOL_EMPIRICISM", target: "HYBRID_PSYCH", type: "observation" },
        { source: "TOOL_HERMENEUTICS", target: "HYBRID_PSYCH", type: "meaning" },
    ] as GraphLink[]
};
