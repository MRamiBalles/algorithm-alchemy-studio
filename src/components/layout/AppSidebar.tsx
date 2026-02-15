import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
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
  Calculator,
  Code,
  Cpu,
  Globe,
  Database,
  Brain,
  Eye,
  Shield,
  BookOpen,
  Binary,
  Network,
  Server,
  MonitorSmartphone,
  Braces,
  ScanEye,
  Lock
} from "lucide-react";

const tracks = [
  {
    label: "Track 1: Foundations",
    icon: Calculator,
    items: [
      { title: "Álgebra Lineal", url: "/track/foundations/algebra", icon: Calculator },
      { title: "Cálculo", url: "/track/foundations/calculus", icon: Binary },
      { title: "Matemática Discreta", url: "/track/foundations/discrete", icon: Braces },
      { title: "Estadística", url: "/track/foundations/statistics", icon: BookOpen },
      { title: "Física", url: "/track/foundations/physics", icon: Globe },
    ]
  },
  {
    label: "Track 2: Core Computing",
    icon: Code,
    items: [
      { title: "Programación I", url: "/track/core/prog1", icon: Code },
      { title: "Estructura de Datos", url: "/track/core/datastructures", icon: Braces },
      { title: "Algoritmia", url: "/track/core/algorithms", icon: Route },
    ]
  },
  {
    label: "Track 3: Systems",
    icon: Cpu,
    items: [
      { title: "Lógica Digital", url: "/track/systems/digital", icon: Binary },
      { title: "Arquitectura", url: "/track/systems/architecture", icon: Cpu },
      { title: "Sistemas Operativos", url: "/track/systems/os", icon: Server },
    ]
  },
  {
    label: "Track 4: Networks & Cloud",
    icon: Network,
    items: [
      { title: "Redes", url: "/track/networks/networking", icon: Network },
      { title: "Sistemas Distribuidos", url: "/track/networks/distributed", icon: Globe },
    ]
  },
  {
    label: "Track 5: Software & Data",
    icon: Database,
    items: [
      { title: "Bases de Datos", url: "/track/software/databases", icon: Database },
      { title: "Ingeniería del Software", url: "/track/software/engineering", icon: MonitorSmartphone },
      { title: "Desarrollo Web", url: "/track/software/webdev", icon: Code },
    ]
  },
  {
    label: "Track 6: Intelligence",
    icon: Brain,
    items: [
      { title: "IA Básica", url: "/track/intelligence/ai", icon: Brain },
      { title: "Machine Learning", url: "/track/intelligence/ml", icon: ScanEye },
      { title: "MBHB (Bio-Inspired)", url: "/mbhb", icon: Dna },
    ]
  },
  {
    label: "Track 7: Visual & Expert",
    icon: Eye,
    items: [
      { title: "Gráficos por Computador", url: "/track/visual/graphics", icon: Eye },
      { title: "Visión por Computador", url: "/track/visual/vision", icon: ScanEye },
    ]
  },
  {
    label: "Track 8: Security",
    icon: Shield,
    items: [
      { title: "Ciberseguridad", url: "/track/security/cybersec", icon: Lock },
    ]
  },
];

// MBHB sub-navigation (shown when inside /mbhb)
const mbhbModules = [
  {
    label: "Mod 1: Trajectories",
    icon: Route,
    items: [
      { title: "Greedy / Intro", url: "/mbhb/greedy", icon: Route },
      { title: "Local Search", url: "/mbhb/localsearch", icon: Waypoints },
      { title: "Simulated Annealing", url: "/mbhb/sa", icon: Flame },
      { title: "Tabu Search", url: "/mbhb/tabu", icon: Search },
      { title: "GRASP", url: "/mbhb/grasp", icon: Shuffle },
    ]
  },
  {
    label: "Mod 2: Multi-start",
    icon: Repeat,
    items: [
      { title: "ILS", url: "/mbhb/ils", icon: GitBranch },
      { title: "VNS", url: "/mbhb/vns", icon: Waypoints },
    ]
  },
  {
    label: "Mod 3: Bio-inspired",
    icon: Dna,
    items: [
      { title: "Genetic Algorithm", url: "/mbhb/ga", icon: Dna },
      { title: "CHC", url: "/mbhb/chc", icon: Bug },
    ]
  },
];

export function AppSidebar() {
  const pathname = typeof window !== "undefined" ? window.location.pathname : "";
  const isInsideMBHB = pathname.startsWith("/mbhb");

  const menuData = isInsideMBHB ? mbhbModules : tracks;

  return (
    <Sidebar className="border-r border-border bg-sidebar">
      <SidebarContent>
        <div className="px-4 py-5 border-b border-border">
          <NavLink to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity" activeClassName="">
            <GraduationCap className="h-6 w-6 text-primary" />
            <div>
              <h1 className="text-sm font-bold text-foreground tracking-wide">Academy Studio</h1>
              <p className="text-[10px] text-muted-foreground font-mono">
                {isInsideMBHB ? "MBHB · Bio-Inspired" : "Visual Engineering Degree"}
              </p>
            </div>
          </NavLink>
        </div>

        {isInsideMBHB && (
          <div className="px-4 pt-3 pb-1">
            <NavLink
              to="/"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors font-mono flex items-center gap-1"
              activeClassName=""
            >
              ← Volver al Mapa
            </NavLink>
          </div>
        )}

        {menuData.map((mod) => (
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
