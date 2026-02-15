import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SimulatedAnnealing from "./pages/SimulatedAnnealing";
import Greedy from "./pages/Greedy";
import LocalSearch from "./pages/LocalSearch";
import TabuSearch from "./pages/TabuSearch";
import Comparison from "./pages/Comparison";
import GRASPPage from "./pages/GRASP";
import ILSPage from "./pages/ILS";
import VNSPage from "./pages/VNS";
import GAPage from "./pages/GA";
import CHCPage from "./pages/CHC";
import MultimodalPage from "./pages/Multimodal";
import MemeticPage from "./pages/Memetic";
import NSGA2Page from "./pages/NSGA2";
import TrackPlaceholder from "./pages/TrackPlaceholder";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Main Landing Page */}
          <Route path="/" element={<Landing />} />

          {/* MBHB Course Routes */}
          <Route path="/mbhb" element={<Index />} />
          <Route path="/mbhb/greedy" element={<Greedy />} />
          <Route path="/mbhb/localsearch" element={<LocalSearch />} />
          <Route path="/mbhb/sa" element={<SimulatedAnnealing />} />
          <Route path="/mbhb/tabu" element={<TabuSearch />} />
          <Route path="/mbhb/compare" element={<Comparison />} />

          {/* Practice 2a: Multi-Start */}
          <Route path="/mbhb/ils" element={<ILSPage />} />
          <Route path="/mbhb/vns" element={<VNSPage />} />
          <Route path="/mbhb/grasp" element={<GRASPPage />} />

          {/* Practice 2b: Evolutionary */}
          <Route path="/mbhb/ga" element={<GAPage />} />
          <Route path="/mbhb/chc" element={<CHCPage />} />
          <Route path="/mbhb/multimodal" element={<MultimodalPage />} />

          {/* Practice 2c: Advanced */}
          <Route path="/mbhb/memetic" element={<MemeticPage />} />
          <Route path="/mbhb/nsga2" element={<NSGA2Page />} />

          {/* Track Placeholder Routes */}
          <Route path="/track/:track/:subject" element={<TrackPlaceholder />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
