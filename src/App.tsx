import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SimulatedAnnealing from "./pages/SimulatedAnnealing";
import {
  TabuSearchPage,
  GRASPPage,
  ILSPage,
  VNSPage,
  MultiStartPage,
  GAPage,
  CHCPage,
  ACOPage,
} from "./pages/algorithms";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/sa" element={<SimulatedAnnealing />} />
          <Route path="/tabu" element={<TabuSearchPage />} />
          <Route path="/grasp" element={<GRASPPage />} />
          <Route path="/ils" element={<ILSPage />} />
          <Route path="/vns" element={<VNSPage />} />
          <Route path="/multistart" element={<MultiStartPage />} />
          <Route path="/ga" element={<GAPage />} />
          <Route path="/chc" element={<CHCPage />} />
          <Route path="/aco" element={<ACOPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
