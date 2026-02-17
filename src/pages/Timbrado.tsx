import { AppLayout } from "@/components/layout/AppLayout";
import { useState } from "react";
import {
  CheckCircle2,
  XCircle,
  RefreshCw,
  FileText,
  Download,
  AlertTriangle,
  Clock,
  Send,
  Lock,
  Eye,
} from "lucide-react";

type TimbradoStatus = "pendiente" | "aceptada" | "enviada" | "timbrada" | "error" | "reintento";

interface FacturaTimbrado {
  id: string;
  cuenta: string;
  titular: string;
  zona: string;
  periodo: string;
  importe: string;
  uuid?: string;
  status: TimbradoStatus;
  error?: string;
  intentos: number;
  fechaEmision?: string;
  fechaVencimiento?: string;
}

const initialFacturas: FacturaTimbrado[] = [
  { id: "FAC-26020001", cuenta: "12345", titular: "María García López", zona: "Centro", periodo: "Feb 2026", importe: "$498.00", status: "timbrada", uuid: "A1B2C3D4-E5F6-...", intentos: 1, fechaEmision: "15 Feb 2026", fechaVencimiento: "15 Mar 2026" },
  { id: "FAC-26020002", cuenta: "12346", titular: "Carlos Hernández Ruiz", zona: "Centro", periodo: "Feb 2026", importe: "$2,340.00", status: "timbrada", uuid: "F7G8H9I0-J1K2-...", intentos: 1, fechaEmision: "15 Feb 2026", fechaVencimiento: "15 Mar 2026" },
  { id: "FAC-26020003", cuenta: "12348", titular: "Roberto López Díaz", zona: "Centro", periodo: "Feb 2026", importe: "$15,200.00", status: "error", error: "CFDI33106 - RFC del receptor no encontrado en lista del SAT", intentos: 2 },
  { id: "FAC-26020004", cuenta: "12350", titular: "José Ramírez Torres", zona: "Centro", periodo: "Feb 2026", importe: "$498.00", status: "enviada", intentos: 1 },
  { id: "FAC-26020005", cuenta: "12351", titular: "Gobierno del Estado", zona: "Centro", periodo: "Feb 2026", importe: "$8,450.00", status: "error", error: "CFDI40003 - Sello del emisor inválido. Verificar certificado", intentos: 3 },
  { id: "FAC-26020006", cuenta: "12352", titular: "Laura Sánchez Mora", zona: "Centro", periodo: "Feb 2026", importe: "$320.00", status: "aceptada", intentos: 0 },
  { id: "FAC-26020007", cuenta: "8832", titular: "Comercial El Sol SA", zona: "Centro", periodo: "Feb 2026", importe: "$1,850.00", status: "pendiente", intentos: 0 },
];

const statusConfig: Record<TimbradoStatus, { label: string; color: string; icon: typeof Clock }> = {
  pendiente: { label: "Pendiente", color: "bg-muted text-muted-foreground", icon: Clock },
  aceptada: { label: "Aceptada", color: "bg-info/20 text-info", icon: Lock },
  enviada: { label: "Enviada PAC", color: "bg-warning/20 text-warning", icon: Send },
  timbrada: { label: "Timbrada OK", color: "bg-success/20 text-success", icon: CheckCircle2 },
  error: { label: "Error", color: "bg-destructive/20 text-destructive", icon: XCircle },
  reintento: { label: "Reintento", color: "bg-warning/20 text-warning", icon: RefreshCw },
};

const Timbrado = () => {
  const [facturas, setFacturas] = useState(initialFacturas);
  const [filterStatus, setFilterStatus] = useState("Todos");
  const [selectedError, setSelectedError] = useState<FacturaTimbrado | null>(null);

  const filtered = facturas.filter(
    (f) => filterStatus === "Todos" || statusConfig[f.status]?.label === filterStatus
  );

  const summary = {
    total: facturas.length,
    timbradas: facturas.filter((f) => f.status === "timbrada").length,
    errores: facturas.filter((f) => f.status === "error").length,
    pendientes: facturas.filter((f) => ["pendiente", "aceptada", "enviada"].includes(f.status)).length,
  };

  const handleRetry = (id: string) => {
    setFacturas((prev) =>
      prev.map((f) =>
        f.id === id ? { ...f, status: "enviada" as TimbradoStatus, intentos: f.intentos + 1, error: undefined } : f
      )
    );
  };

  return (
    <AppLayout>
      <div className="animate-fade-in space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-foreground">Timbrado CFDI</h1>
            <p className="text-sm text-muted-foreground">
              Pasos 16–18 — Aceptación → PAC → Timbrado · Febrero 2026
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 rounded-md text-sm border border-border text-foreground hover:bg-secondary transition-colors">
              <RefreshCw className="h-4 w-4" />
              Reintentar errores
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-md text-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
              <Send className="h-4 w-4" />
              Enviar lote al PAC
            </button>
          </div>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: "Total facturas", value: summary.total, color: "text-foreground" },
            { label: "Timbradas OK", value: summary.timbradas, color: "text-success" },
            { label: "Con error", value: summary.errores, color: "text-destructive" },
            { label: "En proceso", value: summary.pendientes, color: "text-warning" },
          ].map((s) => (
            <div key={s.label} className="bg-card rounded-lg border border-border p-4">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{s.label}</p>
              <p className={`text-2xl font-bold mt-1 ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex items-center gap-1 bg-card border border-border rounded-md p-0.5 w-fit">
          {["Todos", "Pendiente", "Aceptada", "Enviada PAC", "Timbrada OK", "Error"].map((s) => (
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

        {/* Table */}
        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/30">
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider"># Factura</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Cuenta</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Titular</th>
                <th className="text-right px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Importe</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">UUID</th>
                <th className="text-center px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Intentos</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="text-right px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((f) => {
                const cfg = statusConfig[f.status];
                return (
                  <tr key={f.id} className="border-b border-border last:border-0 hover:bg-secondary/20 transition-colors">
                    <td className="px-4 py-3 text-primary font-medium">{f.id}</td>
                    <td className="px-4 py-3 text-muted-foreground">{f.cuenta}</td>
                    <td className="px-4 py-3 text-foreground">{f.titular}</td>
                    <td className="px-4 py-3 text-right text-foreground font-medium">{f.importe}</td>
                    <td className="px-4 py-3 text-xs text-muted-foreground font-mono">
                      {f.uuid || "—"}
                    </td>
                    <td className="px-4 py-3 text-center text-muted-foreground">{f.intentos}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${cfg.color}`}>
                        {cfg.label}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center gap-1 justify-end">
                        {f.status === "timbrada" && (
                          <>
                            <button className="p-1.5 rounded hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors" title="Descargar XML">
                              <Download className="h-3.5 w-3.5" />
                            </button>
                            <button className="p-1.5 rounded hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors" title="Ver PDF">
                              <FileText className="h-3.5 w-3.5" />
                            </button>
                          </>
                        )}
                        {f.status === "error" && (
                          <>
                            <button
                              onClick={() => setSelectedError(f)}
                              className="p-1.5 rounded hover:bg-destructive/20 text-destructive transition-colors"
                              title="Ver error"
                            >
                              <Eye className="h-3.5 w-3.5" />
                            </button>
                            <button
                              onClick={() => handleRetry(f.id)}
                              className="p-1.5 rounded hover:bg-warning/20 text-warning transition-colors"
                              title="Reintentar"
                            >
                              <RefreshCw className="h-3.5 w-3.5" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Error detail panel */}
        {selectedError && (
          <div className="bg-card rounded-lg border border-destructive/30 p-5 space-y-3 animate-fade-in">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-destructive" />
                  Error de timbrado — {selectedError.id}
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {selectedError.titular} · Cuenta {selectedError.cuenta} · {selectedError.intentos} intentos
                </p>
              </div>
              <button onClick={() => setSelectedError(null)} className="text-muted-foreground hover:text-foreground">
                <XCircle className="h-4 w-4" />
              </button>
            </div>
            <div className="bg-destructive/10 rounded-md p-3">
              <p className="text-sm text-destructive font-mono">{selectedError.error}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  handleRetry(selectedError.id);
                  setSelectedError(null);
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-md text-sm bg-warning text-warning-foreground hover:bg-warning/90 transition-colors"
              >
                <RefreshCw className="h-4 w-4" />
                Reintentar envío
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-md text-sm border border-border text-foreground hover:bg-secondary transition-colors">
                Corregir datos fiscales
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-md text-sm border border-destructive/30 text-destructive hover:bg-destructive/10 transition-colors">
                Cancelar y refacturar
              </button>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Timbrado;
