import { GraduationCap } from "lucide-react";
import { AppFooter } from "@/components/layout/AppFooter";
import UniversitasGraph from "@/components/UniversitasGraph";

// Tracks data temporarily removed as we switched to Graph View
// const tracks = [
//   {
//     id: "foundations",
//     title: "Foundations",
//     subtitle: "Cálculo, Álgebra, Discreta, Física",
//     description: "Las raíces matemáticas y físicas que sustentan toda la ingeniería informática.",
//     icon: Calculator,
//     color: "emerald",
//     available: false,
//     url: "/track/foundations/algebra",
//     zone: "Zone 0",
//   },
//   {
//     id: "core",
//     title: "Core Computing",
//     subtitle: "Programación, Datos, Algoritmia",
//     description: "El tronco de la informática: código, estructuras de datos y eficiencia algorítmica.",
//     icon: Code,
//     color: "blue",
//     available: false,
//     url: "/track/core/prog1",
//     zone: "Zone 7",
//   },
//   {
//     id: "systems",
//     title: "Systems",
//     subtitle: "Digital, Arquitectura, OS",
//     description: "Del transistor al sistema operativo: entiende la máquina desde sus cimientos.",
//     icon: Cpu,
//     color: "orange",
//     available: false,
//     url: "/track/systems/digital",
//     zone: "Zone 7",
//   },
//   {
//     id: "networks",
//     title: "Networks & Cloud",
//     subtitle: "Redes, Sistemas Distribuidos",
//     description: "TCP/IP, protocolos y arquitecturas distribuidas que conectan el mundo.",
//     icon: Network,
//     color: "violet",
//     available: false,
//     url: "/track/networks/networking",
//     zone: "Zone 7",
//   },
//   {
//     id: "software",
//     title: "Software & Data",
//     subtitle: "BD, Ingeniería SW, Web",
//     description: "Persistencia, arquitectura de software y desarrollo full-stack moderno.",
//     icon: Database,
//     color: "pink",
//     available: false,
//     url: "/track/software/databases",
//     zone: "Zone 7",
//   },
//   {
//     id: "intelligence",
//     title: "Intelligence",
//     subtitle: "Metaheurísticas, Bio-Inspired (MBHB)",
//     description: "Algoritmos bioinspirados y metaheurísticas con visualizadores en tiempo real. El Nodo Legendario.",
//     icon: Brain,
//     color: "cyan",
//     available: true,
//     url: "/mbhb",
//     zone: "Zone 4",
//     badges: ["NP-Hard", "TSP/QAP", "MBHB"],
//   },
//   {
//     id: "ia-data",
//     title: "IA & Data Science",
//     subtitle: "ML, Deep Learning, NLP",
//     description: "De los fundamentos de IA a Redes Neuronales. El Neural Path completo: Fund. IA → ML I → ML II → Deep Learning → MBHB.",
//     icon: Brain,
//     color: "violet",
//     available: true,
//     url: "/degree/ingenieria-datos-ia",
//     zone: "Neural Path",
//     badges: ["ML", "Deep Learning", "→ MBHB"],
//   },
//   {
//     id: "visual",
//     title: "Visual & Expert",
//     subtitle: "Gráficos, Visión por Computador",
//     description: "Renderizado 3D, shaders, procesamiento de imagen y visión artificial.",
//     icon: Eye,
//     color: "amber",
//     available: false,
//     url: "/track/visual/graphics",
//     zone: "Zone 6",
//   },
//   {
//     id: "security",
//     title: "Security",
//     subtitle: "Ciberseguridad",
//     description: "Criptografía, pentesting, seguridad de redes y sistemas defensivos.",
//     icon: Shield,
//     color: "red",
//     available: false,
//     url: "/track/security/cybersec",
//     zone: "Zone 5",
//   },
// ];

// const colorMap: Record<string, { border: string; badge: string; icon: string; glow: string }> = {
//   cyan: { border: "border-cyan-500/30", badge: "bg-cyan-500/20 text-cyan-300 border-cyan-500/50", icon: "text-cyan-400", glow: "hover:shadow-cyan-500/10" },
//   emerald: { border: "border-emerald-500/20", badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/50", icon: "text-emerald-400", glow: "hover:shadow-emerald-500/10" },
//   blue: { border: "border-blue-500/20", badge: "bg-blue-500/20 text-blue-300 border-blue-500/50", icon: "text-blue-400", glow: "hover:shadow-blue-500/10" },
//   orange: { border: "border-orange-500/20", badge: "bg-orange-500/20 text-orange-300 border-orange-500/50", icon: "text-orange-400", glow: "hover:shadow-orange-500/10" },
//   violet: { border: "border-violet-500/20", badge: "bg-violet-500/20 text-violet-300 border-violet-500/50", icon: "text-violet-400", glow: "hover:shadow-violet-500/10" },
//   pink: { border: "border-pink-500/20", badge: "bg-pink-500/20 text-pink-300 border-pink-500/50", icon: "text-pink-400", glow: "hover:shadow-pink-500/10" },
//   amber: { border: "border-amber-500/20", badge: "bg-amber-500/20 text-amber-300 border-amber-500/50", icon: "text-amber-400", glow: "hover:shadow-amber-500/10" },
//   red: { border: "border-red-500/20", badge: "bg-red-500/20 text-red-300 border-red-500/50", icon: "text-red-400", glow: "hover:shadow-red-500/10" },
// };

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-cyan-500/30">
      {/* Header */}
      <header className="border-b border-border/40 bg-card/10 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tighter">
            <GraduationCap className="w-6 h-6 text-primary" />
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Academy Studio
            </span>
          </div>
          <nav className="flex gap-4 text-sm font-medium text-muted-foreground">
            <a href="https://github.com/MRamiBalles" target="_blank" className="hover:text-foreground transition-colors">
              GitHub
            </a>
            <a href="mailto:ramiballes96@gmail.com" className="hover:text-foreground transition-colors">
              Contact
            </a>
          </nav>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[calc(100vh-8rem)]">
        <div className="text-center max-w-4xl mx-auto mb-8 space-y-4">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground">
            El <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">Grafo Epistémico</span>.
          </h1>
          <p className="text-xl text-muted-foreground">
            Explora las conexiones del conocimiento humano. De los Átomos a la IA.
          </p>
        </div>

        {/* Graph Container */}
        <div className="w-full max-w-6xl aspect-[4/3] md:aspect-[16/9] lg:h-[700px]">
          <UniversitasGraph />
        </div>

        {/* Optional: Link to old grid view if needed later */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground/50">
            Navega por los nodos para acceder a las asignaturas.
          </p>
        </div>
      </main>

      <AppFooter />
    </div>
  );
}
