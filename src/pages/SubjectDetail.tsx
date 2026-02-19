import { useEffect, useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { useParams, Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, BookOpen, Brain, ChevronLeft, ExternalLink, FileText, Sparkles, Video, Library } from "lucide-react";
import { graphData } from "@/data/universitasGraph";

// Subject data — keyed by route slug
const subjectData: Record<string, {
    title: string;
    degree: string;
    degreeRoute: string;
    university: string;
    course: number;
    semester: string;
    atom: string;
    description: string;
    topics: string[];
    bibliography: Array<{ title: string; url: string }>;
    prereqs: string[];
    leadsTo: string[];
    neuralPathPosition?: number; // 1-4 if part of the neural path
    canonIndex?: Array<{ part: string; chapters: string[] }>; // The "Skeleton" from the Canon Method
}> = {
    "fundamentos-ia": {
        title: "Fundamentos de Inteligencia Artificial",
        degree: "Ing. Datos e IA",
        degreeRoute: "/degree/ingenieria-datos-ia",
        university: "UCM",
        course: 2,
        semester: "S2",
        atom: "ÁLGEBRA → LÓGICA",
        description: "La puerta de entrada a la Inteligencia Artificial. Agentes, búsqueda, representación del conocimiento, y aprendizaje. Russell & Norvig como biblia.",
        topics: [
            "Agentes inteligentes y entornos",
            "Búsqueda no informada e informada",
            "Búsqueda adversarial (juegos)",
            "Satisfacción de restricciones (CSP)",
            "Representación del conocimiento",
            "Lógica proposicional y de primer orden",
            "Planificación automática",
            "Incertidumbre y redes bayesianas",
            "Introducción al aprendizaje automático",
        ],
        bibliography: [
            { title: "Russell, S.J., Norvig, P. — Artificial Intelligence: A Modern Approach, 4th Ed.", url: "https://es.annas-archive.li/md5/796cf33cc3c505f55b183b1b47e4c8ae" },
            { title: "Nilsson, N.J. — Inteligencia Artificial: Una nueva síntesis", url: "https://es.annas-archive.li/md5/8b13abc6c38703fdfeaca80a7d2a668e" },
            { title: "Palma Méndez, J.T. — IA: Técnicas, métodos y aplicaciones", url: "https://es.annas-archive.li/md5/05370d5929e8fc9aa7f33e954c000e65" },
            { title: "García Serrano, A. — IA: Fundamentos, práctica y aplicaciones", url: "https://es.annas-archive.li/md5/d877118195e05dd6d279de5463a339df" },
        ],
        prereqs: ["Lógica Matemática", "Fundamentos de la Programación II", "Estructuras de Datos y Algoritmos"],
        leadsTo: ["Aprendizaje Automático I", "Sistemas Basados en Conocimiento"],
        neuralPathPosition: 1,
        canonIndex: [
            { part: "I. Artificial Intelligence", chapters: ["1. Introduction", "2. Intelligent Agents"] },
            { part: "II. Problem Solving", chapters: ["3. Solving Problems by Searching", "4. Search in Complex Environments", "5. Adversarial Search and Games", "6. Constraint Satisfaction Problems"] },
            { part: "III. Knowledge and Reasoning", chapters: ["7. Logical Agents", "8. First-Order Logic", "9. Inference in First-Order Logic", "10. Knowledge Representation", "11. Automated Planning", "12. Quantifying Uncertainty"] },
            { part: "IV. Learning", chapters: ["19. Learning from Examples", "20. Learning Probabilistic Models", "21. Deep Learning"] }
        ]
    },
    "aprendizaje-automatico-1": {
        title: "Aprendizaje Automático I",
        degree: "Ing. Datos e IA",
        degreeRoute: "/degree/ingenieria-datos-ia",
        university: "UCM",
        course: 3,
        semester: "S1",
        atom: "ÁLGEBRA",
        description: "Statistical Learning de los maestros: Hastie, Tibshirani, Witten. Regresión, clasificación, validación cruzada, árboles de decisión, y ensemble methods.",
        topics: [
            "Aprendizaje supervisado vs no supervisado",
            "Regresión lineal y logística",
            "Validación cruzada y selección de modelos",
            "Árboles de decisión (CART)",
            "Bagging, Random Forests, Boosting",
            "Support Vector Machines (SVM)",
            "Clustering: K-means, jerárquico",
            "Reducción de dimensionalidad (PCA)",
            "Evaluación de modelos: bias-variance tradeoff",
        ],
        bibliography: [
            { title: "James, Witten, Hastie, Tibshirani — An Introduction to Statistical Learning", url: "https://es.annas-archive.li/md5/d1a935b5e45a2aa5fcf81df4da2d063c" },
            { title: "Witten, Frank, Hall, Pal — Data Mining: Practical Machine Learning", url: "https://es.annas-archive.li/md5/25141d646d8dd20f63e662b77d51ccc4" },
            { title: "Hastie, Tibshirani, Friedman — The Elements of Statistical Learning, 2nd Ed.", url: "https://es.annas-archive.li/md5/db72168a61c5416c523be55cc968474a" },
        ],
        prereqs: ["Fundamentos de Inteligencia Artificial", "Probabilidad y Estadística", "Álgebra Lineal"],
        leadsTo: ["Aprendizaje Automático II"],
        neuralPathPosition: 2,
        canonIndex: [
            { part: "I. Fundamentals", chapters: ["1. Introduction", "2. Statistical Learning"] },
            { part: "II. Regression & Classification", chapters: ["3. Linear Regression", "4. Classification"] },
            { part: "III. Model Selection", chapters: ["5. Resampling Methods", "6. Linear Model Selection and Regularization"] },
            { part: "IV. Beyond Linearity", chapters: ["7. Moving Beyond Linearity", "8. Tree-Based Methods", "9. Support Vector Machines"] },
            { part: "V. Unsupervised", chapters: ["10. Deep Learning (Intro)", "12. Unsupervised Learning"] }
        ]
    },
    "aprendizaje-automatico-2": {
        title: "Aprendizaje Automático II",
        degree: "Ing. Datos e IA",
        degreeRoute: "/degree/ingenieria-datos-ia",
        university: "UCM",
        course: 3,
        semester: "S2",
        atom: "ÁLGEBRA",
        description: "ML avanzado: feature engineering, ensemble methods sofisticados, aprendizaje semi-supervisado, y la frontera con deep learning.",
        topics: [
            "Feature Engineering avanzado",
            "Gradient Boosting (XGBoost, LightGBM)",
            "Aprendizaje semi-supervisado",
            "Aprendizaje por refuerzo (intro)",
            "Métodos kernel avanzados",
            "Modelos generativos vs discriminativos",
            "Selección de características",
            "Optimización de hiperparámetros",
            "Interpretabilidad de modelos (LIME, SHAP)",
        ],
        bibliography: [
            { title: "Hastie, Tibshirani, Friedman — The Elements of Statistical Learning, 2nd Ed.", url: "https://es.annas-archive.li/md5/db72168a61c5416c523be55cc968474a" },
        ],
        prereqs: ["Aprendizaje Automático I"],
        leadsTo: ["Redes Neuronales y Deep Learning", "Procesamiento de Lenguaje Natural", "Sistemas Autónomos"],
        neuralPathPosition: 3,
    },
    "deep-learning": {
        title: "Redes Neuronales y Deep Learning",
        degree: "Ing. Datos e IA",
        degreeRoute: "/degree/ingenieria-datos-ia",
        university: "UCM",
        course: 4,
        semester: "S1",
        atom: "ÁLGEBRA → AISTHESIS",
        description: "El puente neural. Perceptrones, CNNs, RNNs, Transformers, GANs. Donde la máquina aprende a ver, oír y generar. El último paso antes de MBHB.",
        topics: [
            "Perceptrón multicapa y backpropagation",
            "Redes Convolucionales (CNN)",
            "Redes Recurrentes (RNN, LSTM, GRU)",
            "Mecanismos de Atención y Transformers",
            "Redes Generativas Adversariales (GAN)",
            "Autoencoders y VAEs",
            "Transfer Learning y Fine-tuning",
            "Aplicaciones: visión, NLP, generación",
            "Frameworks: PyTorch, TensorFlow",
        ],
        bibliography: [
            { title: "Goodfellow, Bengio, Courville — Deep Learning (MIT Press)", url: "https://es.annas-archive.li/search?q=Deep+Learning+Goodfellow+Bengio" },
            { title: "Chollet, F. — Deep Learning with Python (Manning)", url: "https://es.annas-archive.li/md5/279efb97779de07999de07999de07999" },
            { title: "Bishop, C.M. — Pattern Recognition and Machine Learning", url: "https://es.annas-archive.li/md5/8825e347db779de07999de07999de07999" },
        ],
        prereqs: ["Aprendizaje Automático II", "Álgebra Lineal", "Cálculo"],
        leadsTo: ["MBHB (Modelos Bioinspirados y Heurísticas de Búsqueda)"],
        neuralPathPosition: 4,
        canonIndex: [
            { part: "I. Applied Math and Foundations", chapters: ["2. Linear Algebra", "3. Probability and Information Theory", "4. Numerical Optimization", "5. Machine Learning Basics"] },
            { part: "II. Deep Networks: Modern Practices", chapters: ["6. Deep Feedforward Networks", "7. Regularization for Deep Learning", "8. Optimization for Training Deep Models", "9. Convolutional Networks (CNN)", "10. Sequence Modeling (RNN/LSTM)"] },
            { part: "III. Deep Learning Research", chapters: ["13. Linear Factor Models", "14. Autoencoders", "15. Representation Learning", "20. Generative Models (GAN/VAE)"] }
        ]
    },
    "mbhb": {
        title: "Modelos Bioinspirados y Heurísticas de Búsqueda",
        degree: "Máster Ing. Informática",
        degreeRoute: "/track/intelligence/intro",
        university: "UHU / UGR / UCM",
        course: 1,
        semester: "S1",
        atom: "AISTHESIS → LÓGICA",
        description: "El Nodo Legendario. La síntesis final entre la optimización matemática (UCM), las metaheurísticas tácticas (UGR) y la inspiración biológica (UHU). El fin del Neural Path.",
        topics: [
            "Optimización Combinatoria y Complejidad",
            "Búsqueda Local y Trayectorias (SA, Tabu)",
            "Metaheurísticas Multi-arranque (GRASP, ILS, VNS)",
            "Algoritmos Evolutivos (GA, CHC, Meméticos)",
            "Inteligencia Colectiva (PSO, Colonias de Hormigas)",
            "Optimización Multiobjetivo (NSGA-II)",
            "Hibridación y Meta-optimización",
        ],
        bibliography: [
            { title: "Talbi, E-G. — Metaheuristics: From Design to Implementation (Wiley)", url: "https://es.annas-archive.li/md5/796cf33cc3c505f55b183b1b47e4c8ae" },
            { title: "Luke, S. — Essentials of Metaheuristics", url: "https://es.annas-archive.li/md5/8b13abc6c38703fdfeaca80a7d2a668e" },
            { title: "Kochendefer, M.J. — Algorithms for Optimization (MIT Press)", url: "https://es.annas-archive.li/md5/f76053253fb490e7d1758a18e92218da" },
            { title: "Bazaraa, M.S. — Programación lineal y flujo en redes (UCM Ref)", url: "https://es.annas-archive.li/md5/756477a506e6676e4be15707e906d355" },
            { title: "Hillier, F.S. — Introduction to Operations Research (UCM Ref)", url: "https://es.annas-archive.li/md5/a0c5a5e34492ffd46c6ca7684c450f97" },
            { title: "Nocedal, J. — Numerical Optimization (Springer)", url: "https://es.annas-archive.li/md5/e43b0bf6c031c016e223ef66255a298e" },
            { title: "Taha, H.A. — Investigación de Operaciones (Pearson)", url: "https://es.annas-archive.li/md5/22c22e454dd10d4d12d9b39519a6b082" },
        ],
        prereqs: ["Redes Neuronales", "Algoritmia", "Optimización"],
        leadsTo: ["Doctorado en IA / Sistemas Inteligentes"],
        canonIndex: [
            { part: "I. Single-Solution Metaheuristics", chapters: ["1. Common Concepts", "2. Local Search", "3. Simulated Annealing", "4. Tabu Search", "5. Variable Neighborhood Search (VNS)"] },
            { part: "II. Population-Based Metaheuristics", chapters: ["6. Evolutionary Algorithms (GA, CHC)", "7. Ant Colony Optimization", "8. Particle Swarm Optimization", "9. Artificial Immune Systems"] },
            { part: "III. Advanced & Multiobjective", chapters: ["10. Multiobjective Optimization (NSGA-II)", "11. Multimodal Optimization", "12. Parallel & Distributed Metaheuristics"] },
            { part: "IV. Integration & Hybridization", chapters: ["13. Hybrid Metaheuristics", "14. Parameter Tuning (CALS)", "15. Frameworks: Metco, Paradiseo"] }
        ]
    },
    "algoritmia": {
        title: "Algoritmia",
        degree: "Ingeniería Informática",
        degreeRoute: "/track/intelligence/intro",
        university: "UCM / UGR",
        course: 2,
        semester: "S1",
        atom: "LÓGICA",
        description: "El estudio de la eficiencia y corrección. Desde la complejidad asintótica hasta grafos y programación dinámica. Basado en el CLRS (Cormen), el estándar de oro de la computación.",
        topics: [
            "Análisis de Complejidad Asintótica",
            "Divide y Vencerás (D&C)",
            "Algoritmos Voraces (Greedy)",
            "Programación Dinámica",
            "Algoritmos sobre Grafos (BFS, DFS, Dijkstra)",
            "Flujo Máximo y Emparejamiento",
            "NP-Completitud y Aproximación",
        ],
        bibliography: [
            { title: "Cormen, Leiserson, Rivest, Stein — Introduction to Algorithms (MIT Press)", url: "https://es.annas-archive.li/md5/af6be65d586ed2ec5636579fcddbba78" },
            { title: "Martí Oliet, Ortega Mallén, Verdejo López — Estructuras de Datos y Métodos Algorítmicos (UCM Ref)", url: "https://es.annas-archive.li/md5/c30968a541f60af73c6d77c9ecab5996" },
            { title: "Ricardo Peña — Diseño de programas: Formalismo y abstracción (Pearson)", url: "https://es.annas-archive.li/md5/49dd7af2dc22ff7621760357b0b8e01c" },
            { title: "Brassard, Bradley — Fundamentos de Algoritmia (Prentice Hall)", url: "https://es.annas-archive.li/md5/6e16f75f280c3b2a0d2afba5abcc2783" },
            { title: "Neapolitan, R. — Foundations of Algorithms", url: "https://es.annas-archive.li/md5/56b4a7b013b6294cda05a57419d4a18b" },
        ],
        prereqs: ["Estructuras de Datos", "Matemática Discreta", "Fundamentos de Programación"],
        leadsTo: ["Aprendizaje Automático I", "MBHB", "Optimización"],
        canonIndex: [
            { part: "I. Foundations", chapters: ["1. The Role of Algorithms", "2. Getting Started", "3. Characterizing Running Times", "4. Divide-and-Conquer", "5. Probabilistic Analysis"] },
            { part: "II. Sorting and Order Statistics", chapters: ["6. Heapsort", "7. Quicksort", "8. Sorting in Linear Time", "9. Medians and Order Statistics"] },
            { part: "III. Advanced Design and Analysis", chapters: ["14. Greedy Algorithms", "15. Dynamic Programming", "16. Amortized Analysis"] },
            { part: "IV. Graph Algorithms", chapters: ["20. Elementary Graph Algorithms", "21. Minimum Spanning Trees", "22. Single-Source Shortest Paths", "24. Maximum Flow"] },
            { part: "V. Special Topics", chapters: ["34. NP-Completeness", "35. Approximation Algorithms"] }
        ]
    },
    "algebra-lineal": {
        title: "Álgebra Lineal",
        degree: "Ing. Datos e IA",
        degreeRoute: "/degree/ingenieria-datos-ia",
        university: "UCM / MIT",
        course: 1,
        semester: "S1",
        atom: "ÁLGEBRA",
        description: "El lenguaje de la IA. Desde sistemas de ecuaciones hasta la Descomposición en Valores Singulares (SVD). La base matemática indispensable para entender ML y Redes Neuronales.",
        topics: [
            "Sistemas de Ecuaciones Lineales y Matrices",
            "Espacios Vectoriales y Subespacios",
            "Ortogonalidad y Mínimos Cuadrados",
            "Determinantes y Autovalores/Autovectores",
            "SVD (Singular Value Decomposition)",
            "Transformaciones Lineales",
        ],
        bibliography: [
            { title: "Strang, G. — Introduction to Linear Algebra (Wellesley-Cambridge Press)", url: "https://es.annas-archive.li/md5/03c29fe29bcf4b819254084c1fa3e2e3" },
            { title: "Baro, E. y Tomeo, V. — Introducción al Álgebra Lineal (Garceta)", url: "https://es.annas-archive.li/md5/eae5376b905b3dc0686165c5154e25e9" },
            { title: "De Burgos, J. — Álgebra lineal y geometría cartesiana (McGraw-Hill)", url: "https://es.annas-archive.li/md5/8f0f0ec277a1081831846977e78b0a40" },
            { title: "Axler, S. — Linear Algebra Done Right", url: "https://es.annas-archive.li/md5/c673d3a0e69b936d07e606a59868e4de" },
        ],
        prereqs: ["Bachillerato Científico-Tecnológico"],
        leadsTo: ["Aprendizaje Automático I", "Cálculo II", "Redes Neuronales"],
        canonIndex: [
            { part: "I. Vectors and Matrices", chapters: ["1. Introduction to Vectors", "2. Solving Linear Equations", "3. Vector Spaces and Subspaces"] },
            { part: "II. Orthogonality", chapters: ["4. Orthogonality", "5. Determinants"] },
            { part: "III. Eigenvalues and SVD", chapters: ["6. Eigenvalues and Eigenvectors", "7. The Singular Value Decomposition (SVD)"] },
            { part: "IV. Applications", chapters: ["10. Applications (Graphs, Networks)", "11. Numerical Linear Algebra"] }
        ]
    },
    "estructuras-de-datos": {
        title: "Estructuras de Datos y Algoritmos",
        degree: "Ing. Datos e IA",
        degreeRoute: "/degree/ingenieria-datos-ia",
        university: "UCM",
        course: 1,
        semester: "S2",
        atom: "LÓGICA → ÁLGEBRA",
        description: "Cómo organizar la información para procesarla eficientemente. Tipos Abstractos de Datos, estructuras lineales y no lineales, y análisis de algoritmos básicos.",
        topics: [
            "Tipos Abstractos de Datos (TADs)",
            "Listas, Pilas y Colas",
            "Árboles Binarios y de Búsqueda (BST)",
            "Tablas de Hash y Diccionarios",
            "Heaps y Colas de Prioridad",
            "Grafos: Representación y Recorridos básicos",
        ],
        bibliography: [
            { title: "Nyhoff, L. — ADTs, Data Structures, and Problem Solving with C++", url: "https://es.annas-archive.li/md5/907fa318c7639ae7b118224a3fc5d0a7" },
            { title: "Martí Oliet, Ortega Mallén — Estructuras de Datos y Métodos Algorítmicos", url: "https://es.annas-archive.li/md5/c30968a541f60af73c6d77c9ecab5996" },
            { title: "Goodrich, Tamassia — Data Structures and Algorithms in Java/Python", url: "https://es.annas-archive.li/md5/e9b8f0ca431e7cc4db17ee869fc6509b" },
            { title: "Sedgewick, R. — Algorithms (Foundations)", url: "https://es.annas-archive.li/md5/9f50fbd779e5e7df2277db63b77ba22c" },
        ],
        prereqs: ["Fundamentos de Programación", "Álgebra Lineal"],
        leadsTo: ["Algoritmia", "Bases de Datos", "Sistemas Inteligentes"],
        canonIndex: [
            { part: "I. Linear Structures", chapters: ["1. Abstract Data Types", "2. Stacks", "3. Queues", "4. Linked Lists"] },
            { part: "II. Non-Linear Structures", chapters: ["5. Binary Trees", "6. Advanced Tree Structures (AVL, Red-Black)"] },
            { part: "III. Searching and Hashing", chapters: ["7. Hashing Techniques", "8. Set and Map ADTs"] },
            { part: "IV. Algorithmic Toolbox", chapters: ["9. Sorting (Basic)", "10. Priority Queues and Heaps"] }
        ]
    },
    "calculo": {
        title: "Cálculo",
        degree: "Ing. Datos e IA",
        degreeRoute: "/degree/ingenieria-datos-ia",
        university: "UCM",
        course: 1,
        semester: "S1",
        atom: "ÁLGEBRA",
        description: "El estudio del cambio continuo. Indispensable para entender la optimización (Gradient Descent) en redes neuronales. Desde límites hasta integrales de varias variables.",
        topics: [
            "Límites y Continuidad",
            "Derivada y Aplicaciones (Optimización)",
            "Integración: Técnicas y Teorema Fundamental",
            "Sucesiones y Series de Potencias",
            "Funciones de Varias Variables: Derivadas Parciales",
            "Gradiente y Optimización Multivariable",
        ],
        bibliography: [
            { title: "Stewart, J. — Calculus: Early Transcendentals (Thomson)", url: "https://es.annas-archive.li/md5/c9ed5767a9b6da8734acd0e68f772a49" },
            { title: "Larson, Edwards — Cálculo (Pirámide)", url: "https://es.annas-archive.li/md5/305fb5840593b26a3deb32a45e188f1e" },
            { title: "Spivak, M. — Calculus (Foundations)", url: "https://es.annas-archive.li/md5/5e9de07999de07999de07999de07999" },
        ],
        prereqs: ["Bachillerato Científico-Tecnológico"],
        leadsTo: ["Aprendizaje Automático I", "Redes Neuronales"],
        canonIndex: [
            { part: "I. Functions and Limits", chapters: ["1. Functions and Models", "2. Limits and Derivatives"] },
            { part: "II. Differentiation Rules", chapters: ["3. Differentiation", "4. Applications of Differentiation (Min/Max)"] },
            { part: "III. Integration", chapters: ["5. Integrals", "6. Applications of Integration"] },
            { part: "IV. Multivariable", chapters: ["14. Partial Derivatives", "15. Multiple Integrals"] }
        ]
    },
    "matematica-discreta": {
        title: "Matemática Discreta y Lógica",
        degree: "Ingeniería Informática / Datos",
        degreeRoute: "/degree/ingenieria-datos-ia",
        university: "UCM",
        course: 1,
        semester: "S1",
        atom: "LÓGICA",
        description: "El lenguaje de los objetos discretos. La base de la computación teórica y la algoritmia. Lógica, conjuntos, inducción y teoría de grafos.",
        topics: [
            "Lógica Proposicional y de Primer Orden",
            "Conjuntos, Funciones y Relaciones",
            "Inducción Matemática y Recurrencia",
            "Teoría de Grafos y Árboles",
            "Combinatoria y Probabilidad Discreta",
            "Álgebra de Boole y Retículos",
        ],
        bibliography: [
            { title: "Rosen, K.H. — Discrete Mathematics and Its Applications (McGraw-Hill)", url: "https://es.annas-archive.li/md5/d8d4f0c8797f09e4e92df720772add50" },
            { title: "Grimaldi, R.P. — Matemáticas Discreta y Combinatoria (Pearson)", url: "https://es.annas-archive.li/md5/08f8db33c15bedca5b6c6fa36f8c856a" },
            { title: "Hortalá, Rodríguez Artalejo — Matemática Discreta y Lógica (UCM Ref)", url: "https://es.annas-archive.li/md5/a42daa7cd23c81a3062b844250affc47" },
        ],
        prereqs: ["Bachillerato Científico-Tecnológico"],
        leadsTo: ["Algoritmia", "Lógica Matemática", "Criptografía"],
        canonIndex: [
            { part: "I. The Foundations", chapters: ["1. Logic and Proofs", "2. Basic Structures: Sets, Functions, Summations"] },
            { part: "II. Induction and Recursion", chapters: ["5. Induction and Recursion", "6. Counting"] },
            { part: "III. Discrete Probability", chapters: ["7. Discrete Probability"] },
            { part: "IV. Graphs and Trees", chapters: ["10. Graphs", "11. Trees", "12. Boolean Algebra"] }
        ]
    },
};

const neuralPathSteps = ["Fund. IA", "ML I", "ML II", "Deep Learning", "MBHB"];

export default function SubjectDetail() {
    const { subjectId } = useParams();
    const subject = subjectData[subjectId || ""];

    // Find the corresponding node in the graph to get the canonical text if available
    // We try to match by route or ID strategies if needed, but for now we look up by route
    // Since subjectData keys aren't directly in the graph, we might need a mapping or just look for the node that links here.
    // Actually, looking at graphData, routes are like "/subject/ucm/ingenieria-datos-ia/fundamentos-ia"
    const graphNode = graphData.nodes.find(n => n.route?.endsWith(subjectId || "xyz"));
    const canonicalText = graphNode?.canonicalText;

    const [fetchedBiblio, setFetchedBiblio] = useState<Array<{ title: string; url: string }>>([]);

    useEffect(() => {
        if (!subject) return;

        // Fetch global bibliography data
        fetch('/data/bibliographyData.json')
            .then(res => res.json())
            .then(data => {
                // Normalize subject title to match keys in JSON
                // The script normalizes as: NFD decompose, remove accents, lowercase, remove non-alphanumeric
                const normalize = (str: string) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]/g, "");

                const key = normalize(subject.title);
                console.log(`Looking for bibliography key: ${key}`);

                if (data[key]) {
                    setFetchedBiblio(data[key]);
                } else {
                    // Fallback: try to match partials or logs if needed
                    console.log(`Key ${key} not found in bibliography database.`);
                }
            })
            .catch(err => console.error("Failed to load bibliography data", err));
    }, [subject]);

    const allBibliography = [...subject.bibliography, ...fetchedBiblio];

    if (!subject) {
        return (
            <AppLayout>
                <div className="flex-1 flex items-center justify-center">
                    <p className="text-muted-foreground">Asignatura no encontrada.</p>
                </div>
            </AppLayout>
        );
    }

    return (
        <AppLayout>
            <div className="flex-1 overflow-auto">
                <div className="container mx-auto px-4 py-8 max-w-4xl">

                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6 flex-wrap">
                        <Link to="/" className="hover:text-foreground transition-colors">Academy</Link>
                        <span>/</span>
                        <Link to="/mbhb" className="hover:text-foreground transition-colors">Universitas</Link>
                        <span>/</span>
                        <Link to={subject.degreeRoute} className="hover:text-foreground transition-colors">{subject.degree}</Link>
                        <span>/</span>
                        <span className="text-foreground">{subject.title}</span>
                    </div>

                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex items-center gap-2 mb-3 flex-wrap">
                            <Badge variant="outline" className="font-mono text-xs">{subject.university}</Badge>
                            <Badge variant="outline" className="text-xs">Curso {subject.course} · {subject.semester}</Badge>
                            <Badge variant="outline" className="text-xs text-muted-foreground">Átomo: {subject.atom}</Badge>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-2">
                            {subject.title}
                        </h1>
                        <p className="text-muted-foreground">{subject.description}</p>
                    </div>

                    {/* Canon Method: The Single Source of Truth */}
                    {canonicalText && (
                        <div className="mb-8 p-6 rounded-xl border border-amber-500/30 bg-amber-500/10 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Library className="w-32 h-32" />
                            </div>
                            <div className="relative z-10">
                                <div className="flex items-center gap-2 mb-2 text-amber-400 font-mono text-xs uppercase tracking-widest">
                                    <Sparkles className="w-3 h-3" />
                                    <span>Texto Canónico (Fuente Única)</span>
                                </div>
                                <h3 className="text-xl md:text-2xl font-serif font-bold text-amber-100 mb-2">
                                    {canonicalText}
                                </h3>
                                <p className="text-sm text-amber-200/60 max-w-2xl">
                                    Siguiendo el principio de Pareto (80/20), este es el único texto que necesitas dominar para comprender la esencia de esta materia. Todo el contenido generado se basa en su estructura.
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Neural Path Progress */}
                    {subject.neuralPathPosition && (
                        <div className="mb-8 p-4 rounded-lg border border-violet-500/20 bg-violet-500/5">
                            <div className="flex items-center gap-2 mb-3">
                                <Brain className="w-4 h-4 text-violet-400" />
                                <span className="text-sm font-medium text-violet-300">
                                    Neural Path — Paso {subject.neuralPathPosition} de {neuralPathSteps.length}
                                </span>
                            </div>
                            <div className="flex items-center gap-1 text-xs flex-wrap">
                                {neuralPathSteps.map((step, i) => (
                                    <span key={step} className="flex items-center gap-1">
                                        {i > 0 && <ArrowRight className="w-3 h-3 text-violet-500/50" />}
                                        <span className={`px-2 py-0.5 rounded text-xs ${i + 1 === subject.neuralPathPosition
                                            ? 'bg-violet-500/30 border border-violet-400 text-white font-bold'
                                            : i + 1 < subject.neuralPathPosition!
                                                ? 'bg-violet-500/10 border border-violet-500/20 text-violet-400'
                                                : step === 'MBHB'
                                                    ? 'bg-red-500/10 border border-red-500/20 text-red-400'
                                                    : 'bg-gray-800 border border-gray-700 text-gray-500'
                                            }`}>
                                            {step === 'MBHB' && <Sparkles className="w-3 h-3 inline mr-1" />}
                                            {step}
                                        </span>
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="grid md:grid-cols-3 gap-6">
                        {/* Main Content (2 cols) */}
                        <div className="md:col-span-2 space-y-6">

                            {/* Temario (Canon Index if available, otherwise flat topics) */}
                            <Card className="border-border/40 bg-card/30">
                                <CardHeader>
                                    <CardTitle className="text-lg flex items-center gap-2">
                                        <FileText className="w-4 h-4 text-cyan-400" />
                                        {subject.canonIndex
                                            ? `Índice Canónico (${subject.title.includes('IA') ? 'Russell & Norvig' : 'ISLR / Hastie'})`
                                            : "Temario"}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {subject.canonIndex ? (
                                        <div className="space-y-4">
                                            {subject.canonIndex.map((part, i) => (
                                                <div key={i}>
                                                    <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 border-b border-border/30 pb-1">
                                                        {part.part}
                                                    </h4>
                                                    <ul className="space-y-1.5 pl-2">
                                                        {part.chapters.map((chap, j) => (
                                                            <li key={j} className="text-sm text-foreground/80 flex items-center gap-2">
                                                                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/30"></span>
                                                                {chap}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <ol className="space-y-2">
                                            {subject.topics.map((topic, i) => (
                                                <li key={i} className="flex items-start gap-3 text-sm">
                                                    <span className="text-xs font-mono text-muted-foreground/60 mt-0.5 w-5 shrink-0">{i + 1}.</span>
                                                    <span className="text-foreground/80">{topic}</span>
                                                </li>
                                            ))}
                                        </ol>
                                    )}
                                </CardContent>
                            </Card>

                            {/* Bibliografía */}
                            <Card className="border-border/40 bg-card/30">
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="text-lg flex items-center gap-2">
                                            <BookOpen className="w-4 h-4 text-violet-400" />
                                            Bibliografía ({allBibliography.length})
                                        </CardTitle>
                                        <Badge variant="outline" className="text-[10px] bg-violet-500/10 text-violet-300 border-violet-500/20">
                                            {fetchedBiblio.length > 0 ? "Fuente: Anna's Archive + Manual" : "Fuente: Manual"}
                                        </Badge>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                        {allBibliography.map((book, i) => (
                                            <a
                                                key={i}
                                                href={book.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-start gap-3 p-3 rounded-md border border-border/30 bg-card/20 hover:bg-card/50 hover:border-violet-500/30 transition-all group"
                                            >
                                                <BookOpen className="w-4 h-4 text-muted-foreground/50 mt-0.5 shrink-0 group-hover:text-violet-400 transition-colors" />
                                                <span className="text-sm text-foreground/80 group-hover:text-foreground transition-colors flex-1">{book.title}</span>
                                                <ExternalLink className="w-3 h-3 text-muted-foreground/30 shrink-0 group-hover:text-violet-400 transition-colors" />
                                            </a>
                                        ))}
                                    </div>
                                    <p className="text-[10px] text-muted-foreground/40 mt-3 font-mono">
                                        Links directos a Anna's Archive · Usa "Descarga Lenta" para acceso gratuito
                                    </p>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Sidebar (1 col) */}
                        <div className="space-y-4">

                            {/* Prerequisites */}
                            <Card className="border-border/40 bg-card/30">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm text-muted-foreground">Prerequisitos</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-1.5">
                                        {subject.prereqs.map((prereq, i) => (
                                            <div key={i} className="flex items-center gap-2 text-xs">
                                                <ChevronLeft className="w-3 h-3 text-cyan-500/50" />
                                                <span className="text-foreground/70">{prereq}</span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Leads To */}
                            <Card className="border-border/40 bg-card/30">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm text-muted-foreground">Da paso a</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-1.5">
                                        {subject.leadsTo.map((next, i) => (
                                            <div key={i} className="flex items-center gap-2 text-xs">
                                                <ArrowRight className="w-3 h-3 text-violet-500/50" />
                                                <span className={`${next.includes('MBHB') ? 'text-red-400 font-bold' : 'text-foreground/70'}`}>{next}</span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Videos Placeholder */}
                            <Card className="border-border/40 bg-card/20 border-dashed">
                                <CardContent className="py-6 text-center">
                                    <Video className="w-8 h-8 text-muted-foreground/30 mx-auto mb-2" />
                                    <p className="text-xs text-muted-foreground/50">Videos en desarrollo</p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
