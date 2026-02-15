import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Calculator, Code, Cpu, Network, Database, Eye, Shield, ArrowRight, Lock, GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";
import { AppFooter } from "@/components/layout/AppFooter";

const tracks = [
  {
    id: "foundations",
    title: "Foundations",
    subtitle: "Cálculo, Álgebra, Discreta, Física",
    description: "Las raíces matemáticas y físicas que sustentan toda la ingeniería informática.",
    icon: Calculator,
    color: "emerald",
    available: false,
    url: "/track/foundations/algebra",
    zone: "Zone 0",
  },
  {
    id: "core",
    title: "Core Computing",
    subtitle: "Programación, Datos, Algoritmia",
    description: "El tronco de la informática: código, estructuras de datos y eficiencia algorítmica.",
    icon: Code,
    color: "blue",
    available: false,
    url: "/track/core/prog1",
    zone: "Zone 7",
  },
  {
    id: "systems",
    title: "Systems",
    subtitle: "Digital, Arquitectura, OS",
    description: "Del transistor al sistema operativo: entiende la máquina desde sus cimientos.",
    icon: Cpu,
    color: "orange",
    available: false,
    url: "/track/systems/digital",
    zone: "Zone 7",
  },
  {
    id: "networks",
    title: "Networks & Cloud",
    subtitle: "Redes, Sistemas Distribuidos",
    description: "TCP/IP, protocolos y arquitecturas distribuidas que conectan el mundo.",
    icon: Network,
    color: "violet",
    available: false,
    url: "/track/networks/networking",
    zone: "Zone 7",
  },
  {
    id: "software",
    title: "Software & Data",
    subtitle: "BD, Ingeniería SW, Web",
    description: "Persistencia, arquitectura de software y desarrollo full-stack moderno.",
    icon: Database,
    color: "pink",
    available: false,
    url: "/track/software/databases",
    zone: "Zone 7",
  },
  {
    id: "intelligence",
    title: "Intelligence",
    subtitle: "IA, ML, Bio-Inspired (MBHB)",
    description: "Inteligencia artificial clásica, machine learning y algoritmos bioinspirados con visualizadores en tiempo real.",
    icon: Brain,
    color: "cyan",
    available: true,
    url: "/mbhb",
    zone: "Zone 4",
    badges: ["NP-Hard", "TSP/QAP", "IA Clásica"],
  },
  {
    id: "visual",
    title: "Visual & Expert",
    subtitle: "Gráficos, Visión por Computador",
    description: "Renderizado 3D, shaders, procesamiento de imagen y visión artificial.",
    icon: Eye,
    color: "amber",
    available: false,
    url: "/track/visual/graphics",
    zone: "Zone 6",
  },
  {
    id: "security",
    title: "Security",
    subtitle: "Ciberseguridad",
    description: "Criptografía, pentesting, seguridad de redes y sistemas defensivos.",
    icon: Shield,
    color: "red",
    available: false,
    url: "/track/security/cybersec",
    zone: "Zone 5",
  },
];

const colorMap: Record<string, { border: string; badge: string; icon: string; glow: string }> = {
  cyan: { border: "border-cyan-500/30", badge: "bg-cyan-500/20 text-cyan-300 border-cyan-500/50", icon: "text-cyan-400", glow: "hover:shadow-cyan-500/10" },
  emerald: { border: "border-emerald-500/20", badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/50", icon: "text-emerald-400", glow: "hover:shadow-emerald-500/10" },
  blue: { border: "border-blue-500/20", badge: "bg-blue-500/20 text-blue-300 border-blue-500/50", icon: "text-blue-400", glow: "hover:shadow-blue-500/10" },
  orange: { border: "border-orange-500/20", badge: "bg-orange-500/20 text-orange-300 border-orange-500/50", icon: "text-orange-400", glow: "hover:shadow-orange-500/10" },
  violet: { border: "border-violet-500/20", badge: "bg-violet-500/20 text-violet-300 border-violet-500/50", icon: "text-violet-400", glow: "hover:shadow-violet-500/10" },
  pink: { border: "border-pink-500/20", badge: "bg-pink-500/20 text-pink-300 border-pink-500/50", icon: "text-pink-400", glow: "hover:shadow-pink-500/10" },
  amber: { border: "border-amber-500/20", badge: "bg-amber-500/20 text-amber-300 border-amber-500/50", icon: "text-amber-400", glow: "hover:shadow-amber-500/10" },
  red: { border: "border-red-500/20", badge: "bg-red-500/20 text-red-300 border-red-500/50", icon: "text-red-400", glow: "hover:shadow-red-500/10" },
};

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

      <main className="flex-1 container mx-auto px-4 py-12 md:py-20">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground">
            Ingeniería{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">Visual</span>.
          </h1>
          <p className="text-xl text-muted-foreground">
            8 tracks · 35 asignaturas · Un grado completo en CS, filtrado y visualizado.
          </p>
          <p className="text-sm text-muted-foreground/70 font-mono">
            De las raíces (Matemáticas) al fruto (IA) — El Cono Epistémico
          </p>
        </div>

        {/* Track Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-7xl mx-auto">
          {tracks.map((track) => {
            const colors = colorMap[track.color];
            const Wrapper = track.available ? Link : "div";
            const wrapperProps = track.available ? { to: track.url, className: "block" } : { className: "block" };

            return (
              <Wrapper key={track.id} {...wrapperProps as any}>
                <Card className={`group relative overflow-hidden ${colors.border} bg-card/40 transition-all h-full ${
                  track.available 
                    ? `hover:bg-card/60 hover:shadow-2xl ${colors.glow} cursor-pointer` 
                    : "opacity-60 grayscale hover:grayscale-0 hover:opacity-80"
                }`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-white/[0.00] opacity-0 group-hover:opacity-100 transition-opacity" />
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant={track.available ? "default" : "secondary"} className={track.available ? colors.badge : "gap-1"}>
                        {track.available ? "Disponible" : <><Lock className="w-3 h-3" /> Próximamente</>}
                      </Badge>
                      <track.icon className={`w-7 h-7 ${colors.icon}`} />
                    </div>
                    <CardTitle className="text-lg leading-tight">{track.title}</CardTitle>
                    <CardDescription className="text-xs">{track.subtitle}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <p className="text-xs text-muted-foreground leading-relaxed">{track.description}</p>
                    {track.badges && (
                      <div className="flex gap-1.5 flex-wrap mt-3">
                        {track.badges.map((b) => (
                          <Badge key={b} variant="outline" className="text-[10px]">{b}</Badge>
                        ))}
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="pt-0">
                    <div className="text-[10px] font-mono text-muted-foreground">{track.zone}</div>
                    {track.available && (
                      <div className="ml-auto text-xs font-medium text-primary flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        Entrar <ArrowRight className="w-3 h-3" />
                      </div>
                    )}
                  </CardFooter>
                </Card>
              </Wrapper>
            );
          })}
        </div>
      </main>

      <AppFooter />
    </div>
  );
}
