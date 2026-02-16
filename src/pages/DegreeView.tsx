import { AppLayout } from "@/components/layout/AppLayout";
import { useParams, Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, BookOpen, Brain, ChevronLeft, Network, Sparkles } from "lucide-react";

// Degree data - maps URL slugs to degree content
const degreeData: Record<string, {
    title: string;
    university: string;
    color: string;
    atom: string;
    description: string;
    subjects: Array<{
        id: string;
        name: string;
        course: number;
        semester: string;
        route?: string;
        hasContent: boolean;
        tags?: string[];
    }>;
}> = {
    "ingenieria-datos-ia": {
        title: "Ingeniería de Datos e Inteligencia Artificial",
        university: "UCM",
        color: "#8B5CF6",
        atom: "ÁLGEBRA (Número)",
        description: "El grado que fusiona la ciencia de datos con la inteligencia artificial. De las matemáticas puras al aprendizaje automático.",
        subjects: [
            // Curso 1
            { id: "calculo", name: "Cálculo", course: 1, semester: "S1", hasContent: true },
            { id: "algebra-lineal", name: "Álgebra Lineal", course: 1, semester: "S1", hasContent: true },
            { id: "fund-prog-1", name: "Fundamentos de la Programación I", course: 1, semester: "S1", hasContent: true },
            { id: "logica-matematica", name: "Lógica Matemática", course: 1, semester: "S1", hasContent: true },
            { id: "fund-prog-2", name: "Fundamentos de la Programación II", course: 1, semester: "S2", hasContent: true },
            { id: "matematica-discreta", name: "Matemática Discreta", course: 1, semester: "S2", hasContent: true },
            { id: "prob-estadistica", name: "Probabilidad y Estadística", course: 1, semester: "S2", hasContent: true },
            { id: "estructura-computadores-1", name: "Estructura de Computadores I", course: 1, semester: "S2", hasContent: true },

            // Curso 2
            { id: "estructura-datos-algoritmos", name: "Estructuras de Datos y Algoritmos", course: 2, semester: "S1", hasContent: true },
            { id: "bases-datos-relacionales", name: "Bases de Datos Relacionales", course: 2, semester: "S1", hasContent: true },
            { id: "metodos-estadisticos", name: "Métodos Estadísticos para Ing. Datos", course: 2, semester: "S1", hasContent: true },
            { id: "estructura-computadores-2", name: "Estructura de Computadores II", course: 2, semester: "S1", hasContent: true },
            { id: "fundamentos-ia", name: "Fundamentos de Inteligencia Artificial", course: 2, semester: "S2", hasContent: true, tags: ["IA", "Core"], route: "/subject/ucm/ingenieria-datos-ia/fundamentos-ia" },
            { id: "bases-datos-nosql", name: "Bases de Datos noSQL", course: 2, semester: "S2", hasContent: true },
            { id: "tecnologia-programacion", name: "Tecnología de la Programación", course: 2, semester: "S2", hasContent: true },
            { id: "optimizacion", name: "Optimización", course: 2, semester: "S2", hasContent: true },

            // Curso 3
            { id: "aprendizaje-automatico-1", name: "Aprendizaje Automático I", course: 3, semester: "S1", hasContent: true, tags: ["ML", "Neural Path"], route: "/subject/ucm/ingenieria-datos-ia/aprendizaje-automatico-1" },
            { id: "sistemas-basados-conocimiento", name: "Sistemas Basados en Conocimiento", course: 3, semester: "S1", hasContent: true },
            { id: "redes-sistemas-operativos", name: "Redes y Sistemas Operativos", course: 3, semester: "S1", hasContent: true },
            { id: "adquisicion-preprocesamiento", name: "Adquisición y Preprocesamiento de Datos", course: 3, semester: "S1", hasContent: true },
            { id: "aprendizaje-automatico-2", name: "Aprendizaje Automático II", course: 3, semester: "S2", hasContent: true, tags: ["ML", "Neural Path"], route: "/subject/ucm/ingenieria-datos-ia/aprendizaje-automatico-2" },
            { id: "tratamiento-datos-complejos", name: "Tratamiento de Datos Complejos", course: 3, semester: "S2", hasContent: true },
            { id: "visualizacion-datos", name: "Visualización de Datos", course: 3, semester: "S2", hasContent: true },
            { id: "gestion-proyectos", name: "Gestión de Proyectos Software", course: 3, semester: "S2", hasContent: true },

            // Curso 4
            { id: "deep-learning", name: "Redes Neuronales y Deep Learning", course: 4, semester: "S1", hasContent: true, tags: ["DL", "Neural Path", "→ MBHB"], route: "/subject/ucm/ingenieria-datos-ia/deep-learning" },
            { id: "pln", name: "Procesamiento de Lenguaje Natural", course: 4, semester: "S1", hasContent: true, tags: ["NLP"] },
            { id: "sistemas-autonomos", name: "Sistemas Autónomos", course: 4, semester: "S1", hasContent: true },
            { id: "analisis-senal", name: "Análisis de Señal", course: 4, semester: "S1", hasContent: true },
            { id: "tratamiento-datos-masivos", name: "Tratamiento de Datos Masivos", course: 4, semester: "S1", hasContent: true, tags: ["Big Data"] },
            { id: "paralelismo", name: "Paralelismo y Sistemas Distribuidos", course: 4, semester: "S1", hasContent: true },
            { id: "arquitecturas-procesamiento", name: "Arquitecturas de Procesamiento", course: 4, semester: "S1", hasContent: true },
            { id: "seguridad-privacidad", name: "Seguridad y Privacidad", course: 4, semester: "S2", hasContent: true },
            { id: "etica-datos-ia", name: "Ética de Datos e IA", course: 4, semester: "S2", hasContent: true },
            { id: "empresa-emprendimiento", name: "Empresa y Emprendimiento", course: 4, semester: "S2", hasContent: true },
        ],
    },
};

const courseColors: Record<number, string> = {
    1: "border-emerald-500/30",
    2: "border-blue-500/30",
    3: "border-violet-500/30",
    4: "border-red-500/30",
};

const courseBadgeColors: Record<number, string> = {
    1: "bg-emerald-500/20 text-emerald-300",
    2: "bg-blue-500/20 text-blue-300",
    3: "bg-violet-500/20 text-violet-300",
    4: "bg-red-500/20 text-red-300",
};

export default function DegreeView() {
    const { degreeId } = useParams();
    const degree = degreeData[degreeId || ""];

    if (!degree) {
        return (
            <AppLayout>
                <div className="flex-1 flex items-center justify-center">
                    <p className="text-muted-foreground">Grado no encontrado.</p>
                </div>
            </AppLayout>
        );
    }

    const courses = [1, 2, 3, 4];

    return (
        <AppLayout>
            <div className="flex-1 overflow-auto">
                <div className="container mx-auto px-4 py-8 max-w-6xl">

                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                        <Link to="/" className="hover:text-foreground transition-colors">Academy</Link>
                        <span>/</span>
                        <Link to="/mbhb" className="hover:text-foreground transition-colors">Universitas</Link>
                        <span>/</span>
                        <span className="text-foreground">{degree.title}</span>
                    </div>

                    {/* Header */}
                    <div className="mb-10">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: degree.color, boxShadow: `0 0 12px ${degree.color}40` }} />
                            <Badge variant="outline" className="font-mono text-xs">{degree.university}</Badge>
                            <Badge variant="outline" className="text-xs text-muted-foreground">Átomo: {degree.atom}</Badge>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-2">
                            {degree.title}
                        </h1>
                        <p className="text-muted-foreground max-w-2xl">{degree.description}</p>
                        <p className="text-xs text-muted-foreground/60 font-mono mt-2">
                            {degree.subjects.length} asignaturas · {courses.length} cursos
                        </p>
                    </div>

                    {/* Neural Path Highlight */}
                    <div className="mb-8 p-4 rounded-lg border border-violet-500/20 bg-violet-500/5">
                        <div className="flex items-center gap-2 mb-2">
                            <Brain className="w-4 h-4 text-violet-400" />
                            <span className="text-sm font-medium text-violet-300">The Neural Path → MBHB</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-400 flex-wrap">
                            {["Fund. IA", "ML I", "ML II", "Deep Learning"].map((step, i) => (
                                <span key={step} className="flex items-center gap-1">
                                    {i > 0 && <ArrowRight className="w-3 h-3 text-violet-500" />}
                                    <span className="px-2 py-0.5 rounded bg-violet-500/10 border border-violet-500/20 text-violet-300">
                                        {step}
                                    </span>
                                </span>
                            ))}
                            <ArrowRight className="w-3 h-3 text-red-500" />
                            <span className="px-2 py-0.5 rounded bg-red-500/10 border border-red-500/20 text-red-400 font-bold">
                                <Sparkles className="w-3 h-3 inline mr-1" />MBHB
                            </span>
                        </div>
                    </div>

                    {/* Courses Grid */}
                    {courses.map(courseNum => {
                        const courseSubjects = degree.subjects.filter(s => s.course === courseNum);
                        if (courseSubjects.length === 0) return null;

                        return (
                            <div key={courseNum} className="mb-8">
                                <div className="flex items-center gap-3 mb-4">
                                    <Badge className={`${courseBadgeColors[courseNum]} border-0 font-mono`}>
                                        Curso {courseNum}
                                    </Badge>
                                    <div className="flex-1 h-px bg-border/30" />
                                </div>

                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                                    {courseSubjects.map(subject => {
                                        const isNeuralPath = subject.tags?.includes("Neural Path");
                                        const isMBHBLink = subject.tags?.includes("→ MBHB");
                                        const hasRoute = !!subject.route;

                                        const cardContent = (
                                            <Card className={`group transition-all h-full ${courseColors[courseNum]} bg-card/30 ${hasRoute ? 'hover:bg-card/60 hover:shadow-lg cursor-pointer' : ''
                                                } ${isNeuralPath ? 'border-violet-500/30 bg-violet-500/5' : ''} ${isMBHBLink ? 'border-red-500/30 bg-red-500/5' : ''
                                                }`}>
                                                <CardHeader className="pb-2">
                                                    <div className="flex items-start justify-between">
                                                        <CardTitle className="text-sm leading-tight">{subject.name}</CardTitle>
                                                        <span className="text-[10px] font-mono text-muted-foreground">{subject.semester}</span>
                                                    </div>
                                                </CardHeader>
                                                <CardContent className="pb-3">
                                                    <div className="flex items-center gap-1.5 flex-wrap">
                                                        {subject.tags?.map(tag => (
                                                            <Badge key={tag} variant="outline" className={`text-[9px] ${tag === 'Neural Path' ? 'border-violet-500/40 text-violet-300' :
                                                                    tag === '→ MBHB' ? 'border-red-500/40 text-red-400' :
                                                                        ''
                                                                }`}>
                                                                {tag}
                                                            </Badge>
                                                        ))}
                                                        {subject.hasContent && (
                                                            <BookOpen className="w-3 h-3 text-muted-foreground/50 ml-auto" />
                                                        )}
                                                        {hasRoute && (
                                                            <ArrowRight className="w-3 h-3 text-muted-foreground/50 group-hover:text-foreground transition-colors" />
                                                        )}
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        );

                                        return hasRoute ? (
                                            <Link key={subject.id} to={subject.route!} className="block">
                                                {cardContent}
                                            </Link>
                                        ) : (
                                            <div key={subject.id}>{cardContent}</div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </AppLayout>
    );
}
