import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavLink } from "@/components/NavLink";
import {
  Flame,
  Route,
  Search,
  Shuffle,
  Repeat,
  GitBranch,
  Dna,
  Bug,
  Waypoints,
  GraduationCap,
} from "lucide-react";

const modules = [
  {
    label: "Module 1: Trajectories",
    icon: Route,
    items: [
      { title: "Simulated Annealing", url: "/sa", icon: Flame },
      { title: "Tabu Search", url: "/tabu", icon: Search },
      { title: "GRASP", url: "/grasp", icon: Shuffle },
    ],
  },
  {
    label: "Module 2: Multi-start",
    icon: Repeat,
    items: [
      { title: "ILS", url: "/ils", icon: GitBranch },
      { title: "VNS", url: "/vns", icon: Waypoints },
      { title: "Multi-start", url: "/multistart", icon: Repeat },
    ],
  },
  {
    label: "Module 3: Bio-inspired",
    icon: Dna,
    items: [
      { title: "Genetic Algorithm", url: "/ga", icon: Dna },
      { title: "CHC", url: "/chc", icon: Bug },
      { title: "Ant Colony", url: "/aco", icon: Waypoints },
    ],
  },
];

export function AppSidebar() {
  return (
    <Sidebar className="border-r border-border bg-sidebar">
      <SidebarContent>
        <div className="px-4 py-5 border-b border-border">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-primary" />
            <div>
              <h1 className="text-sm font-bold text-foreground tracking-wide">
                MBHB Academy
              </h1>
              <p className="text-[10px] text-muted-foreground font-mono">
                Algorithm Visualizer
              </p>
            </div>
          </div>
        </div>

        {modules.map((mod) => (
          <SidebarGroup key={mod.label}>
            <SidebarGroupLabel className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono px-4">
              <mod.icon className="h-3 w-3 mr-1.5 inline" />
              {mod.label}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {mod.items.map((item) => (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-foreground transition-colors rounded-md"
                        activeClassName="bg-sidebar-accent text-primary neon-text-cyan font-medium"
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
