import { AppLayout } from "@/components/layout/AppLayout";
import { useState } from "react";
import {
  CheckCircle2,
  XCircle,
  Calculator,
  AlertTriangle,
  Filter,
  ArrowUpDown,
} from "lucide-react";

type LecturaStatus = "pendiente" | "aceptada" | "estimada" | "rechazada";

interface LecturaSospechosa {
  id: string;
  cuenta: string;
  titular: string;
  ruta: number;
  lecturaAnterior: number;
  lecturaActual: number;
  consumo: number;
  promedioHistorico: number;
  desviacion: string;
  motivo: string;
  status: LecturaStatus;
  metodoEstimacion?: string;
}

const initialLecturas: LecturaSospechosa[] = [
  { id: "L001", cuenta: "12345", titular: "María García López", ruta: 14, lecturaAnterior: 1234, lecturaActual: 1390, consumo: 156, promedioHistorico: 22, desviacion: "+609%", motivo: "Consumo 7x promedio", status: "pendiente" },
  { id: "L002", cuenta: "12348", titular: "Roberto López Díaz", ruta: 14, lecturaAnterior: 28300, lecturaActual: 28302, consumo: 2, promedioHistorico: 340, desviacion: "-99%", motivo: "Consumo muy bajo (industrial)", status: "pendiente" },
  { id: "L003", cuenta: "12350", titular: "José Ramírez Torres", ruta: 17, lecturaAnterior: 1080, lecturaActual: 1075, consumo: -5, promedioHistorico: 18, desviacion: "Negativo", motivo: "Lectura menor a anterior", status: "pendiente" },
  { id: "L004", cuenta: "12352", titular: "Laura Sánchez Mora", ruta: 17, lecturaAnterior: 920, lecturaActual: 920, consumo: 0, promedioHistorico: 16, desviacion: "-100%", motivo: "Consumo cero", status: "pendiente" },
  { id: "L005", cuenta: "8832", titular: "Comercial El Sol SA", ruta: 22, lecturaAnterior: 5600, lecturaActual: 5780, consumo: 180, promedioHistorico: 85, desviacion: "+112%", motivo: "Consumo 2x promedio", status: "pendiente" },
  { id: "L006", cuenta: "4521", titular: "Autoservicio Plaza", ruta: 22, lecturaAnterior: 12400, lecturaActual: 0, consumo: -12400, promedioHistorico: 450, desviacion: "Reset", motivo: "Posible cambio/reset medidor", status: "pendiente" },
];

const estimationMethods = [
  "Promedio 12 meses reales",
  "Estadística mixta (reales + estimados)",
  "Mínimo de zona",
];

const statusConfig: Record<LecturaStatus, { label: string; color: string }> = {
  pendiente: { label: "Pendiente", color: "bg-warning/20 text-warning" },
  aceptada: { label: "Aceptada", color: "bg-success/20 text-success" },
  estimada: { label: "Estimada", color: "bg-info/20 text-info" },
  rechazada: { label: "Rechazada", color: "bg-destructive/20 text-destructive" },
};

const ValidacionLecturas = () => {
  const [lecturas, setLecturas] = useState(initialLecturas);
  const [filterStatus, setFilterStatus] = useState("Todas");

  const handleAccept = (id: string) => {
    setLecturas((prev) => prev.map((l) => l.id === id ? { ...l, status: "aceptada" as LecturaStatus } : l));
  };

  const handleEstimate = (id: string, method: number) => {
    setLecturas((prev) =>
      prev.map((l) =>
        l.id === id
          ? { ...l, status: "estimada" as LecturaStatus, consumo: l.promedioHistorico, metodoEstimacion: estimationMethods[method] }
          : l
      )
    );
  };

  const handleReject = (id: string) => {
    setLecturas((prev) => prev.map((l) => l.id === id ? { ...l, status: "rechazada" as LecturaStatus } : l));
  };

  const filtered = lecturas.filter(
    (l) => filterStatus === "Todas" || l.status === filterStatus.toLowerCase()
  );

  const summary = {
    total: lecturas.length,
    pendientes: lecturas.filter((l) => l.status === "pendiente").length,
    aceptadas: lecturas.filter((l) => l.status === "aceptada").length,
    estimadas: lecturas.filter((l) => l.status === "estimada").length,
  };

  return (
    <AppLayout>
      <div className="animate-fade-in space-y-5">
        {/* Header */}
        <div>
          <h1 className="text-xl font-bold text-foreground">Validación de Lecturas</h1>
          <p className="text-sm text-muted-foreground">
            Paso 11 — Confirmar consumos facturables · Febrero 2026 · Zona Centro
          </p>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: "Total sospechosas", value: summary.total, color: "text-foreground" },
            { label: "Pendientes", value: summary.pendientes, color: "text-warning" },
            { label: "Aceptadas", value: summary.aceptadas, color: "text-success" },
            { label: "Estimadas", value: summary.estimadas, color: "text-info" },
          ].map((s) => (
            <div key={s.label} className="bg-card rounded-lg border border-border p-4">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{s.label}</p>
              <p className={`text-2xl font-bold mt-1 ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Estimation algorithm reference */}
        <div className="bg-card rounded-lg border border-border p-4">
          <h3 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
            <Calculator className="h-4 w-4 text-primary" />
            Algoritmo de estimación HYDRA (prioridades)
          </h3>
          <div className="flex items-center gap-6 text-xs text-muted-foreground">
            {estimationMethods.map((m, i) => (
              <span key={i} className="flex items-center gap-1.5">
                <span className="h-5 w-5 rounded-full bg-secondary flex items-center justify-center text-foreground font-bold text-[10px]">{i + 1}</span>
                {m}
              </span>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-card border border-border rounded-md p-0.5">
            {["Todas", "Pendiente", "Aceptada", "Estimada", "Rechazada"].map((s) => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                  filterStatus === s
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/30">
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Cuenta</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Titular</th>
                <th className="text-right px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">L. Anterior</th>
                <th className="text-right px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">L. Actual</th>
                <th className="text-right px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Consumo</th>
                <th className="text-right px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Promedio</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Motivo</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="text-right px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((l) => (
                <tr key={l.id} className="border-b border-border last:border-0 hover:bg-secondary/20 transition-colors">
                  <td className="px-4 py-3 text-primary font-medium">{l.cuenta}</td>
                  <td className="px-4 py-3 text-foreground">{l.titular}</td>
                  <td className="px-4 py-3 text-right text-muted-foreground">{l.lecturaAnterior.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right text-foreground font-medium">{l.lecturaActual.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right">
                    <span className={l.consumo < 0 ? "text-destructive font-medium" : l.consumo > l.promedioHistorico * 3 ? "text-warning font-medium" : "text-foreground"}>
                      {l.consumo} m³
                    </span>
                    <span className="text-xs text-muted-foreground ml-1">({l.desviacion})</span>
                  </td>
                  <td className="px-4 py-3 text-right text-muted-foreground">{l.promedioHistorico} m³</td>
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-1 text-xs text-warning">
                      <AlertTriangle className="h-3 w-3" />
                      {l.motivo}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${statusConfig[l.status].color}`}>
                      {l.metodoEstimacion ? `Est: ${l.metodoEstimacion.split(" ")[0]}` : statusConfig[l.status].label}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    {l.status === "pendiente" ? (
                      <div className="flex items-center gap-1 justify-end">
                        <button
                          onClick={() => handleAccept(l.id)}
                          className="p-1.5 rounded hover:bg-success/20 text-success transition-colors"
                          title="Aceptar lectura"
                        >
                          <CheckCircle2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleEstimate(l.id, 0)}
                          className="p-1.5 rounded hover:bg-info/20 text-info transition-colors"
                          title="Estimar (Prom. 12m)"
                        >
                          <Calculator className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleReject(l.id)}
                          className="p-1.5 rounded hover:bg-destructive/20 text-destructive transition-colors"
                          title="Rechazar"
                        >
                          <XCircle className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <span className="text-xs text-muted-foreground">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppLayout>
  );
};

export default ValidacionLecturas;
