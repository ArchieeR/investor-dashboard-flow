
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import News from "./pages/News";
import AssetDetail from "./pages/AssetDetail";
import Community from "./pages/Community";
import Events from "./pages/Events";
import ETFScreener from "./pages/ETFScreener";
import BrokerComparer from "./pages/BrokerComparer";
import Broker from "./pages/Broker";
import Comparer from "./pages/Comparer";
import Learn from "./pages/Learn";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/news" element={<News />} />
          <Route path="/events" element={<Events />} />
          <Route path="/screener" element={<ETFScreener />} />
          <Route path="/broker-comparer" element={<BrokerComparer />} />
          <Route path="/broker" element={<Broker />} />
          <Route path="/comparer" element={<Comparer />} />
          <Route path="/asset/:ticker" element={<AssetDetail />} />
          <Route path="/community" element={<Community />} />
          <Route path="/learn" element={<Learn />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
