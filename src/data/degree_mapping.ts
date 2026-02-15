// Degree Transformation Logic
// Maps "Degrees" (University Structure) to "Tools" (Epistemic Structure)

export type Methodology = 'DEDUCTION' | 'EMPIRICISM' | 'HERMENEUTICS' | 'SYNTHESIS';

export const DEGREE_MAPPING: Record<string, Methodology> = {
    // 1. DEDUCTION (The Formal Method)
    "Matemáticas": "DEDUCTION",
    "Estadística": "DEDUCTION",
    "Informática": "DEDUCTION",
    "Ingeniería Informática": "DEDUCTION", // Special case: Engineering of Logic
    "Lógica": "DEDUCTION",

    // 2. EMPIRICISM (The Scientific Method)
    "Física": "EMPIRICISM",
    "Química": "EMPIRICISM",
    "Biología": "EMPIRICISM",
    "Bioquímica": "EMPIRICISM",
    "Biotecnología": "EMPIRICISM",
    "Ciencias Ambientales": "EMPIRICISM",
    "Geología": "EMPIRICISM",
    "Medicina": "EMPIRICISM",
    "Enfermería": "EMPIRICISM",
    "Farmacia": "EMPIRICISM",
    "Fisioterapia": "EMPIRICISM",
    "Odontología": "EMPIRICISM",
    "Nutrición Humana y Dietética": "EMPIRICISM",
    "Ciencias de la Actividad Física y del Deporte": "EMPIRICISM", // Biomechanics

    // 3. HERMENEUTICS (The Interpretive Method)
    "Filosofía": "HERMENEUTICS",
    "Historia": "HERMENEUTICS",
    "Historia del Arte": "HERMENEUTICS",
    "Filología Hispánica": "HERMENEUTICS",
    "Filología Clásica": "HERMENEUTICS",
    "Estudios Ingleses": "HERMENEUTICS",
    "Estudios Franceses": "HERMENEUTICS",
    "Lenguas Modernas y sus Literaturas": "HERMENEUTICS",
    "Literaturas Comparadas": "HERMENEUTICS",
    "Traducción e Interpretación": "HERMENEUTICS",
    "Derecho": "HERMENEUTICS",
    "Criminología": "HERMENEUTICS",
    "Ciencias Políticas y de la Administración": "HERMENEUTICS",
    "Antropología Social y Cultural": "HERMENEUTICS",
    "Sociología": "HERMENEUTICS",
    "Trabajo Social": "HERMENEUTICS",
    "Geografía y Gestión de Territorio": "HERMENEUTICS", // Human Geography

    // 4. SYNTHESIS (The Design/Engineering Method)
    "Ingeniería Civil": "SYNTHESIS",
    "Ingeniería de Tecnologías de Telecomunicación": "SYNTHESIS",
    "Ingeniería Electrónica Industrial": "SYNTHESIS",
    "Ingeniería Química": "SYNTHESIS",
    "Ingeniería Agrícola": "SYNTHESIS",
    "Ingeniería Forestal y del Medio Natural": "SYNTHESIS",
    "Edificación": "SYNTHESIS",
    "Arquitectura": "SYNTHESIS",
    "Bellas Artes": "SYNTHESIS",
    "Conservación y Restauración de Bienes Culturales": "SYNTHESIS",
    "Diseño": "SYNTHESIS",
    "Administración y Dirección de Empresas": "SYNTHESIS", // Design of Organizations
    "Marketing e Investigación de Mercados": "SYNTHESIS", // Design of Markets
    "Turismo": "SYNTHESIS", // Design of Experience
};

export const METHODOLOGY_COLORS = {
    DEDUCTION: "#0891b2",   // Cyan-600
    EMPIRICISM: "#059669",  // Emerald-600
    HERMENEUTICS: "#7c3aed", // Violet-600
    SYNTHESIS: "#d97706"    // Amber-600
};
