import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/greedy" element={<Greedy />} />
          <Route path="/localsearch" element={<LocalSearch />} />
          <Route path="/sa" element={<SimulatedAnnealing />} />
          <Route path="/tabu" element={<TabuSearch />} />
          <Route path="/compare" element={<Comparison />} />

          {/* Practice 2a: Multi-Start */}
          <Route path="/vns" element={<VNSPage />} />

          {/* Practice 2b: Evolutionary */}
          <Route path="/ga" element={<GAPage />} />
          <Route path="/chc" element={<CHCPage />} />
          <Route path="/multimodal" element={<MultimodalPage />} />

          {/* Practice 2c: Advanced */}
          <Route path="/memetic" element={<MemeticPage />} />
          <Route path="/nsga2" element={<NSGA2Page />} />



          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
