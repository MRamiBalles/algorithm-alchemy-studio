import dynamic from "next/dynamic";

// Dynamically import the graph to avoid SSR issues with window/canvas
const GraphContainer = dynamic(() => import("@/components/GraphContainer"), {
    ssr: false,
    loading: () => (
        <div className="flex items-center justify-center h-screen bg-void text-atom-white">
            <p className="animate-pulse">Initializing Atomic Core...</p>
        </div>
    ),
});

export default function Home() {
    return (
        <main className="w-full h-screen overflow-hidden bg-void">
            {/* HUD: Left Panel - System Status */}
            <div className="absolute top-5 left-5 z-50 pointer-events-none">
                <h1 className="text-5xl font-bold text-white tracking-tighter loading-anim">
                    UNIVERSITAS
                </h1>
                <p className="text-xs text-atom-cyan tracking-[0.3em] mt-2 uppercase">
                    Atomic Generator v10.0
                </p>

                <div className="mt-8 space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-atom-white animate-pulse" />
                        <span className="text-atom-white text-sm font-mono">LINGUISTICS [Active]</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-atom-white animate-pulse delay-75" />
                        <span className="text-atom-white text-sm font-mono">ALGEBRA [Active]</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-atom-white animate-pulse delay-150" />
                        <span className="text-atom-white text-sm font-mono">LOGIC [Active]</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-atom-magenta shadow-[0_0_10px_#FF00DD] animate-ping" />
                        <span className="text-atom-magenta text-sm font-bold font-mono">AISTHESIS [Somatic]</span>
                    </div>
                </div>
            </div>

            {/* HUD: Right Panel - Legendary Tracker */}
            <div className="absolute top-5 right-5 z-50 text-right pointer-events-none">
                <div className="border border-atom-legendary/30 bg-atom-legendary/5 p-4 rounded-lg backdrop-blur-sm">
                    <p className="text-xs text-atom-legendary uppercase tracking-widest mb-1">Apex Target</p>
                    <h2 className="text-xl font-bold text-atom-white">MBHB Node</h2>
                    <p className="text-xs text-gray-400 mt-2">Status: <span className="text-red-500">LOCKED</span></p>
                </div>
            </div>

            <GraphContainer />
        </main>
    );
}
