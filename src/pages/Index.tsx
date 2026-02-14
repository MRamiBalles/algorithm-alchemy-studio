import { AppLayout } from "@/components/layout/AppLayout";
import { VideoPlayer } from "@/components/ui/VideoPlayer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Flame, Route, Search } from "lucide-react";

export default function Index() {
    const trailerSrc = "/content/mbhb/mod1/1.0_trailer.mp4";

    return (
        <AppLayout>
            <div className="flex-1 overflow-y-auto">
                <div className="container mx-auto px-4 py-8 max-w-5xl">

                    {/* Hero Section */}
                    <div className="text-center mb-12 space-y-4">
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                            MBHB Algorithm Academy
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Master Optimization Heuristics through Interactive Visualization and Code.
                        </p>
                    </div>

                    {/* Trailer Section */}
                    <div className="mb-16">
                        <div className="rounded-xl border border-cyan-500/30 bg-black/40 p-1 shadow-2xl shadow-cyan-900/20 max-w-4xl mx-auto">
                            <div className="aspect-video rounded-lg overflow-hidden relative">
                                <VideoPlayer src={trailerSrc} />
                                {/* Overlay Text only if needed, but VideoPlayer handles it */}
                            </div>
                        </div>
                        <div className="text-center mt-6">
                            <p className="text-sm font-mono text-cyan-400 mb-4">
                                &gt; INTRODUCCIÓN: ¿Por qué N! es imposible?
                            </p>
                            <Link to="/mbhb/greedy">
                                <Button size="lg" className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8">
                                    Start Module 1: Trajectories <ArrowRight className="w-4 h-4" />
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Features Grid */}
                    <div className="grid md:grid-cols-3 gap-6 mb-12">
                        <div className="p-6 rounded-lg border border-border bg-card/30 backdrop-blur-sm hover:border-cyan-500/50 transition-colors">
                            <Route className="w-8 h-8 text-cyan-400 mb-4" />
                            <h3 className="text-lg font-semibold mb-2">Greedy & Local Search</h3>
                            <p className="text-sm text-muted-foreground">
                                Understand the basics of constructive algorithms and iterative improvement.
                            </p>
                        </div>
                        <div className="p-6 rounded-lg border border-border bg-card/30 backdrop-blur-sm hover:border-purple-500/50 transition-colors">
                            <Flame className="w-8 h-8 text-purple-400 mb-4" />
                            <h3 className="text-lg font-semibold mb-2">Simulated Annealing</h3>
                            <p className="text-sm text-muted-foreground">
                                Master the art of escaping local optima using thermodynamic probabilistic models.
                            </p>
                        </div>
                        <div className="p-6 rounded-lg border border-border bg-card/30 backdrop-blur-sm hover:border-green-500/50 transition-colors">
                            <Search className="w-8 h-8 text-green-400 mb-4" />
                            <h3 className="text-lg font-semibold mb-2">Tabu Search</h3>
                            <p className="text-sm text-muted-foreground">
                                Implement memory structures to guide the search and prevent cycling.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </AppLayout>
    );
}
