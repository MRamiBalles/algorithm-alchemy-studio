import { AppLayout } from "@/components/layout/AppLayout";
import UniversitasGraph from "@/components/UniversitasGraph";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Index() {
    return (
        <AppLayout>
            <div className="flex-1 overflow-hidden flex flex-col">
                <div className="container mx-auto px-4 py-6 max-w-7xl flex-1 flex flex-col">

                    {/* Header */}
                    <div className="text-center mb-6 space-y-2 z-10 relative">
                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                            Universitas Rhizome
                        </h1>
                        <p className="text-sm text-muted-foreground mx-auto max-w-2xl">
                            The Map of Human Knowledge. Computer Science (Zone 7) is your tool to simulate the rest.
                        </p>
                    </div>

                    {/* The Rhizome Graph */}
                    <div className="flex-1 relative min-h-[500px]">
                        <UniversitasGraph />

                        {/* Quick Access Overlay */}
                        <div className="absolute bottom-4 left-4 right-4 flex justify-center pointer-events-none">
                            <div className="bg-black/80 backdrop-blur border border-white/10 rounded-full px-6 py-2 flex items-center gap-4 pointer-events-auto">
                                <span className="text-xs text-gray-400">Current Focus:</span>
                                <Link to="/mbhb/greedy">
                                    <Button variant="ghost" size="sm" className="h-8 text-cyan-400 hover:text-cyan-300 hover:bg-cyan-950/50">
                                        Module 1: MBHB <ArrowRight className="w-3 h-3 ml-1" />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </AppLayout>
    );
}
