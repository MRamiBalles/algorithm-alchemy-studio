import { AppLayout } from "@/components/layout/AppLayout";
import { useParams, Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, BookOpen, Brain, ChevronLeft, ExternalLink, FileText, Sparkles, Video } from "lucide-react";

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
        ],
        prereqs: ["Aprendizaje Automático II", "Álgebra Lineal", "Cálculo"],
        leadsTo: ["MBHB (Master Biological Human Body)"],
        neuralPathPosition: 4,
    },
};

const neuralPathSteps = ["Fund. IA", "ML I", "ML II", "Deep Learning", "MBHB"];

export default function SubjectDetail() {
    const { subjectId } = useParams();
    const subject = subjectData[subjectId || ""];

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

                            {/* Temario */}
                            <Card className="border-border/40 bg-card/30">
                                <CardHeader>
                                    <CardTitle className="text-lg flex items-center gap-2">
                                        <FileText className="w-4 h-4 text-cyan-400" />
                                        Temario
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ol className="space-y-2">
                                        {subject.topics.map((topic, i) => (
                                            <li key={i} className="flex items-start gap-3 text-sm">
                                                <span className="text-xs font-mono text-muted-foreground/60 mt-0.5 w-5 shrink-0">{i + 1}.</span>
                                                <span className="text-foreground/80">{topic}</span>
                                            </li>
                                        ))}
                                    </ol>
                                </CardContent>
                            </Card>

                            {/* Bibliografía */}
                            <Card className="border-border/40 bg-card/30">
                                <CardHeader>
                                    <CardTitle className="text-lg flex items-center gap-2">
                                        <BookOpen className="w-4 h-4 text-violet-400" />
                                        Bibliografía
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        {subject.bibliography.map((book, i) => (
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
