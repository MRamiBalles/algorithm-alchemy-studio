```
import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { greedyConstructive, calculateCost } from "@/lib/algorithms/greedy";
import { localSearchBestImprovement } from "@/lib/algorithms/ls";
import { tabuSearch } from "@/lib/algorithms/tabu";
import { Play, Loader2 } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

export default function Comparison() {
    const [running, setRunning] = useState(false);
    const [data, setData] = useState<any[]>([]);
    const [selectedFile, setSelectedFile] = useState("nug5.dat");
    const [instance, setInstance] = useState<any>(NUG5);
    const [loading, setLoading] = useState(false);

    // QAP Parser
    const parseQAP = (text: string) => {
        const tokens = text.trim().split(/\s+/).map(Number);
        let ptr = 0;
        const n = tokens[ptr++];

        // Skip empty/0 if any (some formats have n n)
        if (tokens[ptr] === n) ptr++;

        const flow: number[][] = [];
        for (let i = 0; i < n; i++) {
            flow.push(tokens.slice(ptr, ptr + n));
            ptr += n;
        }

        const dist: number[][] = [];
        for (let i = 0; i < n; i++) {
            dist.push(tokens.slice(ptr, ptr + n));
            ptr += n;
        }

        return { n, flow, dist, optimal: 0 }; // optimal unknown from dat
    };

    const loadInstance = async (filename: string) => {
        setLoading(true);
        try {
            const res = await fetch(`/ datasets / ${ filename } `);
            if (!res.ok) throw new Error("Failed to load dataset");
            const text = await res.text();
            const parsed = parseQAP(text);
            setInstance(parsed);
            setData([]); // Reset chart
            toast.success(`Cargado ${ filename } (N = ${ parsed.n })`);
        } catch (e) {
            toast.error("Error cargando el dataset");
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    // Load on select change
    const handleSelectChange = (val: string) => {
        setSelectedFile(val);
        loadInstance(val);
    };

    const runBenchmark = async () => {
        if (!instance) return;
        setRunning(true);
        setData([]);

        // Wait a frame to render loading state
        await new Promise(r => setTimeout(r, 100));

        const maxIter = instance.n > 50 ? 20 : 50; // Fewer iters for big instances

        // 1. Greedy
        const greedySol = greedyConstructive(instance);
        const greedyCost = calculateCost(instance, greedySol);

        // Initialize chart data with 0-50 iterations
        const chartData = Array.from({ length: maxIter + 1 }, (_, i) => ({
            iteration: i,
            Greedy: greedyCost, // Greedy is constant line
            LocalSearch: null as number | null,
            Tabu: null as number | null,
            // SA: null // We can add SA later
        }));

        // 2. Local Search (Best Improvement)
        // LS typically stops early, so we extend the final cost
        const lsResult = localSearchBestImprovement(instance, greedySol);
        lsResult.history.forEach(step => {
            if (step.iteration <= maxIter) {
                chartData[step.iteration].LocalSearch = step.cost;
            }
        });
        // Fill remaining LS steps with final cost
        let lastLSCost = lsResult.cost;
        for (let i = 0; i <= maxIter; i++) {
            if (chartData[i].LocalSearch === null) {
                chartData[i].LocalSearch = lastLSCost;
            } else {
                lastLSCost = chartData[i].LocalSearch!;
            }
        }

        // 3. Tabu Search
        const tabuResult = tabuSearch(instance, greedySol, maxIter, 7);
        tabuResult.history.forEach(step => {
            if (step.iteration <= maxIter) {
                chartData[step.iteration].Tabu = step.cost;
            }
        });

        // Artificial delay for effect?? No, let's just show it.
        setData(chartData);
        setRunning(false);
    };

    return (
        <AppLayout>
            <div className="flex-1 flex flex-col p-6 gap-6 overflow-y-auto">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                            Arena de Algoritmos
                        </h1>
                        <p className="text-muted-foreground mt-1">
                            Comparativa de rendimiento en tiempo real (Nug12)
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <Select value={selectedFile} onValueChange={handleSelectChange}>
                            <SelectTrigger className="w-[180px] bg-slate-900 border-slate-700">
                                <SelectValue placeholder="Dataset" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="nug5.dat">Nug5 (Test)</SelectItem>
                                <SelectItem value="tai25b.dat">Tai25b (Práctica)</SelectItem>
                                <SelectItem value="sko90.dat">Sko90 (Big)</SelectItem>
                            </SelectContent>
                        </Select>

                        <Button onClick={runBenchmark} disabled={running || loading} className="gap-2 min-w-[140px]">
                            {running || loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
                            {running ? "Calculando..." : "Ejecutar"}
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Stats Cards */}
                    <Card className="bg-slate-900/50 border-slate-800">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-mono text-cyan-400">Greedy (Constructivo)</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {data.length > 0 ? data[0].Greedy : "--"}
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">Coste Inicial</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-slate-900/50 border-slate-800">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-mono text-orange-400">Local Search</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {data.length > 0 ? data[data.length - 1].LocalSearch : "--"}
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">Óptimo Local</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-slate-900/50 border-slate-800">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-mono text-pink-400">Tabu Search</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {data.length > 0 ? data[data.length - 1].Tabu : "--"}
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">Mejor Encontrado</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Chart */}
                <Card className="flex-1 min-h-[400px] bg-slate-900/50 border-slate-800 flex flex-col">
                    <CardHeader>
                        <CardTitle className="text-lg">Convergencia de Costes</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 min-h-0">
                        {data.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                                    <XAxis dataKey="iteration" stroke="#666" />
                                    <YAxis stroke="#666" domain={['auto', 'auto']} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155' }}
                                        itemStyle={{ color: '#e2e8f0' }}
                                    />
                                    <Legend />
                                    <Line type="monotone" dataKey="Greedy" stroke="#22d3ee" strokeWidth={2} dot={false} />
                                    <Line type="stepAfter" dataKey="LocalSearch" stroke="#fb923c" strokeWidth={2} dot={false} />
                                    <Line type="monotone" dataKey="Tabu" stroke="#f472b6" strokeWidth={2} dot={false} />
                                </LineChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="h-full flex items-center justify-center text-muted-foreground">
                                Haz clic en "Ejecutar Benchmark" para ver la simulación.
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
