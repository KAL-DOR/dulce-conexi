import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Contratos from "./pages/Contratos";
import ContratoDetalle from "./pages/ContratoDetalle";
import Cobro from "./pages/Cobro";
import Lecturas from "./pages/Lecturas";
import Facturacion from "./pages/Facturacion";
import Ordenes from "./pages/Ordenes";
import Factibilidades from "./pages/Factibilidades";
import ValidacionLecturas from "./pages/ValidacionLecturas";
import Timbrado from "./pages/Timbrado";
import Ajustes from "./pages/Ajustes";
import Cartera from "./pages/Cartera";
import Impresion from "./pages/Impresion";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/factibilidades" element={<Factibilidades />} />
          <Route path="/contratos" element={<Contratos />} />
          <Route path="/contratos/:id" element={<ContratoDetalle />} />
          <Route path="/cobro" element={<Cobro />} />
          <Route path="/lecturas" element={<Lecturas />} />
          <Route path="/validacion-lecturas" element={<ValidacionLecturas />} />
          <Route path="/facturacion" element={<Facturacion />} />
          <Route path="/timbrado" element={<Timbrado />} />
          <Route path="/impresion" element={<Impresion />} />
          <Route path="/ajustes" element={<Ajustes />} />
          <Route path="/cartera" element={<Cartera />} />
          <Route path="/ordenes" element={<Ordenes />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
