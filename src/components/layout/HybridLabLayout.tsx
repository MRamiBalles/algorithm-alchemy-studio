
import { ReactNode } from 'react';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";

interface HybridLabLayoutProps {
    leftPanel: ReactNode; // Video + Code
    rightPanel: ReactNode; // Visualizer
}

export function HybridLabLayout({ leftPanel, rightPanel }: HybridLabLayoutProps) {
    return (
        <div className="h-[calc(100vh-4rem)] w-full bg-slate-950 text-slate-100 overflow-hidden">
            <ResizablePanelGroup direction="horizontal">
                <ResizablePanel defaultSize={35} minSize={25} maxSize={50} className="border-r border-slate-800">
                    <div className="h-full overflow-y-auto p-4 flex flex-col gap-4">
                        {leftPanel}
                    </div>
                </ResizablePanel>

                <ResizableHandle withHandle className="bg-slate-800 hover:bg-cyan-500/50 transition-colors" />

                <ResizablePanel defaultSize={65}>
                    <div className="h-full w-full relative">
                        {rightPanel}
                    </div>
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    );
}
