import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Brain, Calculator, Atom, ArrowRight, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { AppFooter } from "@/components/layout/AppFooter";

export default function Landing() {
  

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-cyan-500/30">
      {/* Hero Section */}
      <header className="border-b border-border/40 bg-card/10 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tighter">
            <Brain className="w-6 h-6 text-primary" />
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Academy Studio
            </span>
          </div>
          <nav className="flex gap-4 text-sm font-medium text-muted-foreground">
            <a
              href="https://github.com/MRamiBalles"
              target="_blank"
              className="hover:text-foreground transition-colors"
            >
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
            Ingeniería para{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">Humanos</span>.
          </h1>
          <p className="text-xl text-muted-foreground">
            Plataforma de aprendizaje visual interactiva. Olvida las fórmulas áridas; toca, juega y entiende la
            complejidad.
          </p>
        </div>

        {/* Course Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Active Course: MBHB */}
          <Link to="/mbhb" className="block">
            <Card className="group relative overflow-hidden border-cyan-500/30 bg-card/40 hover:bg-card/60 transition-all hover:shadow-2xl hover:shadow-cyan-500/10 cursor-pointer h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge
                    variant="default"
                    className="bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 border-cyan-500/50"
                  >
                    Disponible
                  </Badge>
                  <Brain className="w-8 h-8 text-cyan-400" />
                </div>
                <CardTitle className="text-2xl">Modelos Bioinspirados y Heurísticas de Búsqueda</CardTitle>
                <CardDescription>Optimización Combinatoria Avanzada</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Domina algoritmos genéticos, enfriamiento simulado, búsquedas tabú y colonias de hormigas con
                  visualizadores en tiempo real.
                </p>
                <div className="flex gap-2 flex-wrap">
                  <Badge variant="outline" className="text-xs">
                    NP-Hard
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    TSP/QAP
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    IA Clásica
                  </Badge>
                </div>
              </CardContent>
              <CardFooter>
                <div className="w-full gap-2 group-hover:bg-cyan-500 group-hover:text-black transition-all inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground h-10 px-4 py-2 text-sm font-medium">
                  Entrar al Curso <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </CardFooter>
            </Card>
          </Link>

          {/* Coming Soon: Calculus */}
          <Card className="group border-border/50 bg-card/20 opacity-75 grayscale hover:grayscale-0 transition-all">
            <CardHeader>
              <div className="flex justify-between items-start mb-2">
                <Badge variant="secondary" className="gap-1">
                  <Lock className="w-3 h-3" /> Próximamente
                </Badge>
                <Calculator className="w-8 h-8 text-emerald-400" />
              </div>
              <CardTitle className="text-2xl">Cálculo Infinitesimal</CardTitle>
              <CardDescription>Matemáticas para Ingeniería</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Visualización geométrica de derivadas, integrales y series. Entiende el cambio continuo sin perderte en
                el álgebra.
              </p>
            </CardContent>
            <CardFooter>
              <Button disabled variant="outline" className="w-full">
                En Desarrollo
              </Button>
            </CardFooter>
          </Card>

          {/* Coming Soon: Physics */}
          <Card className="group border-border/50 bg-card/20 opacity-75 grayscale hover:grayscale-0 transition-all">
            <CardHeader>
              <div className="flex justify-between items-start mb-2">
                <Badge variant="secondary" className="gap-1">
                  <Lock className="w-3 h-3" /> Próximamente
                </Badge>
                <Atom className="w-8 h-8 text-amber-400" />
              </div>
              <CardTitle className="text-2xl">Física de Campos</CardTitle>
              <CardDescription>Electromagnetismo y Ondas</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Simulaciones interactivas de campos eléctricos, magnéticos y ecuaciones de Maxwell.
              </p>
            </CardContent>
            <CardFooter>
              <Button disabled variant="outline" className="w-full">
                En Desarrollo
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>

      <AppFooter />
    </div>
  );
}
