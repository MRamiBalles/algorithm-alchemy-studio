
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Copy, Check } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

export interface CodeSnippet {
    language: 'cpp' | 'python' | 'typescript' | 'processing';
    label: string;
    code: string;
}

interface CodeDeckProps {
    snippets: CodeSnippet[];
}

export function CodeDeck({ snippets }: CodeDeckProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [copied, setCopied] = useState(false);

    if (!snippets || snippets.length === 0) return null;

    const currentSnippet = snippets[currentIndex];

    const handleCopy = () => {
        navigator.clipboard.writeText(currentSnippet.code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const nextSnippet = () => {
        setCurrentIndex((prev) => (prev + 1) % snippets.length);
    };

    const prevSnippet = () => {
        setCurrentIndex((prev) => (prev - 1 + snippets.length) % snippets.length);
    };

    return (
        <Card className="w-full h-full flex flex-col border-slate-800 bg-slate-950">
            <CardHeader className="flex flex-row items-center justify-between py-2 border-b border-slate-800">
                <div className="flex items-center gap-2">
                    <CardTitle className="text-sm font-mono text-cyan-400">
                        {currentSnippet.label}
                    </CardTitle>
                    <span className="text-xs text-slate-500 bg-slate-900 px-2 py-0.5 rounded">
                        {currentSnippet.language}
                    </span>
                </div>
                <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={handleCopy}>
                        {copied ? <Check className="h-3 w-3 text-green-500" /> : <Copy className="h-3 w-3" />}
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="flex-1 p-0 relative group">
                <ScrollArea className="h-[200px] w-full bg-[#0d1117] p-4 font-mono text-xs text-slate-300">
                    <pre>{currentSnippet.code}</pre>
                </ScrollArea>

                {snippets.length > 1 && (
                    <div className="absolute bottom-2 right-2 flex gap-1 opacity-100 transition-opacity">
                        <Button variant="secondary" size="icon" className="h-6 w-6 bg-slate-800/80 hover:bg-slate-700" onClick={prevSnippet}>
                            <ChevronLeft className="h-3 w-3" />
                        </Button>
                        <Button variant="secondary" size="icon" className="h-6 w-6 bg-slate-800/80 hover:bg-slate-700" onClick={nextSnippet}>
                            <ChevronRight className="h-3 w-3" />
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
