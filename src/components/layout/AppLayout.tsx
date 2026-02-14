import { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { AppFooter } from "./AppFooter";
import { Menu } from "lucide-react";

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top bar */}
          <header className="h-10 flex items-center border-b border-border bg-card/50 backdrop-blur-sm px-3 shrink-0">
            <SidebarTrigger className="text-muted-foreground hover:text-foreground">
              <Menu className="h-4 w-4" />
            </SidebarTrigger>
          </header>
          {/* Main content */}
          <div className="flex-1 flex flex-col min-h-0">
            {children}
          </div>
          <AppFooter />
        </div>
      </div>
    </SidebarProvider>
  );
}
