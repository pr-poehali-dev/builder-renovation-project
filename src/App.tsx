
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Roofing from "./pages/services/Roofing";
import Extensions from "./pages/services/Extensions";
import Facade from "./pages/services/Facade";
import Foundation from "./pages/services/Foundation";
import Repair from "./pages/services/Repair";
import Warranty from "./pages/services/Warranty";
import Fences from "./pages/services/Fences";
import Outbuildings from "./pages/services/Outbuildings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/services/roofing" element={<Roofing />} />
          <Route path="/services/extensions" element={<Extensions />} />
          <Route path="/services/facade" element={<Facade />} />
          <Route path="/services/foundation" element={<Foundation />} />
          <Route path="/services/repair" element={<Repair />} />
          <Route path="/services/warranty" element={<Warranty />} />
          <Route path="/services/fences" element={<Fences />} />
          <Route path="/services/outbuildings" element={<Outbuildings />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;