import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { AppLayout } from "@/components/layout/AppLayout";
import { ArrowLeft } from "lucide-react";
import { GeneticVisualizer } from "@/components/visualizers/GeneticVisualizer";
import { AStarVisualizer } from "@/components/visualizers/AStarVisualizer";
import { NeuralNetVisualizer } from "@/components/visualizers/NeuralNetVisualizer";
import { SortingVisualizer } from "@/components/visualizers/SortingVisualizer";

export default function MarkdownViewer() {
    const location = useLocation();
    const [content, setContent] = useState<string>("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // location.pathname will be like "/content/courses/z0_math/calculus_master.md"
        // We can just fetch it directly as it should be served by Vite from the public directory
        const fetchMarkdown = async () => {
            setLoading(true);
            try {
                const response = await fetch(location.pathname);
                if (!response.ok) {
                    throw new Error(`Failed to load: ${response.statusText}`);
                }
                const text = await response.text();
                // Check if we accidentally fetched an HTML page (like the index fallback)
                if (text.trim().startsWith("<!DOCTYPE html>")) {
                    throw new Error("File not found in public assets.");
                }
                setContent(text);
                setError(null);
            } catch (err: any) {
                console.error("Error fetching markdown:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMarkdown();
    }, [location.pathname]);

    return (
        <AppLayout>
            <div className="flex-1 w-full bg-slate-950/50 overflow-y-auto">
                <div className="container mx-auto px-4 py-8 max-w-4xl">
                    <div className="mb-6">
                        <Link to="/mbhb" className="inline-flex items-center gap-2 text-sm text-cyan-500 hover:text-cyan-400 border border-cyan-500/30 px-3 py-1.5 rounded-md bg-cyan-500/10 transition-colors">
                            <ArrowLeft className="w-4 h-4" />
                            Volver al Grafo
                        </Link>
                    </div>

                    <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6 md:p-10 shadow-2xl backdrop-blur-sm">
                        {loading ? (
                            <div className="flex justify-center items-center py-20">
                                <div className="w-8 h-8 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        ) : error ? (
                            <div className="py-20 text-center">
                                <h2 className="text-xl text-red-400 mb-2">Error cargando el documento</h2>
                                <p className="text-slate-500 text-sm">{error}</p>
                            </div>
                        ) : (
                            <div className="prose prose-invert prose-slate max-w-none 
                                prose-headings:font-bold prose-h1:text-4xl prose-h1:text-white prose-h1:border-b prose-h1:border-slate-800 prose-h1:pb-4 prose-h1:mb-8
                                prose-h2:text-2xl prose-h2:text-cyan-400 prose-h2:mt-12 prose-h2:mb-4
                                prose-h3:text-xl prose-h3:text-violet-400
                                prose-a:text-cyan-500 hover:prose-a:text-cyan-400
                                prose-pre:bg-slate-950 prose-pre:border prose-pre:border-slate-800
                                prose-code:text-cyan-300 prose-code:bg-slate-900 prose-code:px-1 prose-code:rounded
                                prose-strong:text-amber-100 prose-em:text-slate-300
                                prose-blockquote:border-l-4 prose-blockquote:border-cyan-500/50 prose-blockquote:bg-cyan-500/5 prose-blockquote:px-4 prose-blockquote:py-1 prose-blockquote:not-italic prose-blockquote:text-slate-300
                                prose-li:marker:text-cyan-500">
                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}
                                    components={{
                                        code({ node, inline, className, children, ...props }: any) {
                                            const match = /language-(\w+)/.exec(className || '');
                                            if (!inline && match && match[1] === 'react-component') {
                                                const codeContent = String(children).replace(/\n$/, '');
                                                // Check for "type="Genetic""
                                                if (codeContent.includes('type="Genetic"')) {
                                                    return <GeneticVisualizer />;
                                                }
                                                if (codeContent.includes('type="AStar"')) {
                                                    return <AStarVisualizer />;
                                                }
                                                if (codeContent.includes('type="NeuralNet"')) {
                                                    return <NeuralNetVisualizer />;
                                                }
                                                if (codeContent.includes('type="Sorting"')) {
                                                    return <SortingVisualizer />;
                                                }
                                                return <div className="p-4 bg-red-900/50 text-red-200 rounded border border-red-700">Visualizer unknown: {codeContent}</div>;
                                            }
                                            return (
                                                <code className={className} {...props}>
                                                    {children}
                                                </code>
                                            );
                                        }
                                    }}
                                >
                                    {content}
                                </ReactMarkdown>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
