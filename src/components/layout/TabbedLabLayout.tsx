import { ReactNode } from 'react';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Code, MonitorPlay } from "lucide-react";

interface TabbedLabLayoutProps {
    video: ReactNode;
    theory?: ReactNode;
    code?: ReactNode;
    visualizer: ReactNode;
}

export function TabbedLabLayout({ video, theory, code, visualizer }: TabbedLabLayoutProps) {
    return (
        <div className="h-[calc(100vh-4rem)] w-full bg-slate-950 text-slate-100 overflow-hidden">
            <ResizablePanelGroup direction="horizontal">
                <ResizablePanel defaultSize={40} minSize={30} maxSize={60} className="border-r border-slate-800 flex flex-col">
                    <Tabs defaultValue="video" className="flex-1 flex flex-col min-h-0">
                        <div className="border-b border-slate-800 px-4 bg-slate-900/50">
                            <TabsList className="bg-transparent h-12 w-full justify-start gap-6">
                                <TabsTrigger value="video" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-cyan-500 data-[state=active]:shadow-none rounded-none px-0 pb-2 pt-3">
                                    <MonitorPlay className="w-4 h-4 mr-2" />
                                    Clase
                                </TabsTrigger>
                                {theory && (
                                    <TabsTrigger value="theory" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-cyan-500 data-[state=active]:shadow-none rounded-none px-0 pb-2 pt-3">
                                        <BookOpen className="w-4 h-4 mr-2" />
                                        Apuntes
                                    </TabsTrigger>
                                )}
                                {code && (
                                    <TabsTrigger value="code" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-cyan-500 data-[state=active]:shadow-none rounded-none px-0 pb-2 pt-3">
                                        <Code className="w-4 h-4 mr-2" />
                                        Código
                                    </TabsTrigger>
                                )}
                            </TabsList>
                        </div>

                        <div className="flex-1 overflow-y-auto bg-slate-950/50 relative">
                            <TabsContent value="video" className="m-0 h-full p-4 space-y-4">
                                {video}
                            </TabsContent>

                            {theory && (
                                <TabsContent value="theory" className="m-0 h-full p-0">
                                    {theory}
                                </TabsContent>
                            )}

                            {code && (
                                <TabsContent value="code" className="m-0 h-full p-4">
                                    {code}
                                </TabsContent>
                            )}
                        </div>
                    </Tabs>
                </ResizablePanel>

                <ResizableHandle withHandle className="bg-slate-800 hover:bg-cyan-500/50 transition-colors" />

                <ResizablePanel defaultSize={60}>
                    <div className="h-full w-full relative">
                        {visualizer}
                    </div>
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    );
}
