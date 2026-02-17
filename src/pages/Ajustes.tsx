import { AppLayout } from "@/components/layout/AppLayout";
import { useState } from "react";
import {
  Plus,
  Search,
  FileText,
  CreditCard,
  RefreshCw,
  ChevronRight,
  CheckCircle2,
  Clock,
  AlertTriangle,
} from "lucide-react";

type AjusteType = "Nota de crédito" | "Refacturación" | "Bonificación" | "Cancelación CFDI";
type AjusteStatus = "Pendiente" | "Aprobado" | "Aplicado" | "Rechazado";

interface Ajuste {
  id: string;
  factura: string;
  cuenta: string;
  titular: string;
  tipo: AjusteType;
  motivo: string;
  importeOriginal: string;
  importeAjuste: string;
  status: AjusteStatus;
  fecha: string;
  solicitadoPor: string;
}

const ajustes: Ajuste[] = [
  { id: "AJ-0112", factura: "FAC-26020003", cuenta: "12348", titular: "Roberto López Díaz", tipo: "Refacturación", motivo: "RFC incorrecto en CFDI", importeOriginal: "$15,200.00", importeAjuste: "$15,200.00", status: "Pendiente", fecha: "17 Feb 2026", solicitadoPor: "L. Torres" },
  { id: "AJ-0111", factura: "FAC-26010045", cuenta: "12345", titular: "María García López", tipo: "Nota de crédito", motivo: "Cobro doble periodo Ene 2026", importeOriginal: "$542.00", importeAjuste: "-$542.00", status: "Aprobado", fecha: "15 Feb 2026", solicitadoPor: "Ana M." },
  { id: "AJ-0110", factura: "FAC-26010102", cuenta: "8832", titular: "Comercial El Sol SA", tipo: "Bonificación", motivo: "Fuga en red externa — no imputable", importeOriginal: "$3,400.00", importeAjuste: "-$1,700.00", status: "Aplicado", fecha: "12 Feb 2026", solicitadoPor: "M. Solis" },
  { id: "AJ-0109", factura: "FAC-26010088", cuenta: "12351", titular: "Gobierno del Estado", tipo: "Cancelación CFDI", motivo: "Solicitud formal de cancelación", importeOriginal: "$8,450.00", importeAjuste: "-$8,450.00", status: "Aplicado", fecha: "10 Feb 2026", solicitadoPor: "Director Comercial" },
  { id: "AJ-0108", factura: "FAC-25120034", cuenta: "4521", titular: "Autoservicio Plaza", tipo: "Nota de crédito", motivo: "Lectura estimada incorrecta — consumo real menor", importeOriginal: "$2,100.00", importeAjuste: "-$850.00", status: "Rechazado", fecha: "08 Feb 2026", solicitadoPor: "J. Pérez" },
];

const tipoConfig: Record<AjusteType, { color: string; icon: typeof FileText }> = {
  "Nota de crédito": { color: "text-info", icon: CreditCard },
  "Refacturación": { color: "text-warning", icon: RefreshCw },
  "Bonificación": { color: "text-success", icon: CheckCircle2 },
  "Cancelación CFDI": { color: "text-destructive", icon: AlertTriangle },
};

const statusColors: Record<AjusteStatus, string> = {
  Pendiente: "bg-warning/20 text-warning",
  Aprobado: "bg-info/20 text-info",
  Aplicado: "bg-success/20 text-success",
  Rechazado: "bg-destructive/20 text-destructive",
};

const Ajustes = () => {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("Todos");

  const filtered = ajustes.filter((a) => {
    const matchSearch = !search || a.titular.toLowerCase().includes(search.toLowerCase()) || a.id.toLowerCase().includes(search.toLowerCase()) || a.factura.toLowerCase().includes(search.toLowerCase());
    const matchType = filterType === "Todos" || a.tipo === filterType;
    return matchSearch && matchType;
  });

  return (
    <AppLayout>
      <div className="animate-fade-in space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-foreground">Ajustes a Facturas</h1>
            <p className="text-sm text-muted-foreground">
              Notas de crédito, refacturaciones, bonificaciones y cancelaciones
            </p>
          </div>
          <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">
            <Plus className="h-4 w-4" />
            Nuevo ajuste
          </button>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: "Total ajustes", value: ajustes.length },
            { label: "Pendientes", value: ajustes.filter((a) => a.status === "Pendiente").length },
            { label: "Aplicados", value: ajustes.filter((a) => a.status === "Aplicado").length },
            { label: "Monto ajustado", value: "$11,542.00" },
          ].map((s) => (
            <div key={s.label} className="bg-card rounded-lg border border-border p-4">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{s.label}</p>
              <p className="text-2xl font-bold text-foreground mt-1">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-card border border-border rounded-md px-3 py-1.5 flex-1 max-w-sm">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar por ajuste, factura o titular..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none flex-1"
            />
          </div>
          <div className="flex items-center gap-1 bg-card border border-border rounded-md p-0.5">
            {["Todos", "Nota de crédito", "Refacturación", "Bonificación", "Cancelación CFDI"].map((t) => (
              <button
                key={t}
                onClick={() => setFilterType(t)}
                className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                  filterType === t
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t === "Cancelación CFDI" ? "Cancelación" : t}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/30">
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider"># Ajuste</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Factura</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Titular</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Tipo</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Motivo</th>
                <th className="text-right px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Ajuste</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="px-4 py-2.5 w-8" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((a) => {
                const tipoCfg = tipoConfig[a.tipo];
                return (
                  <tr key={a.id} className="border-b border-border last:border-0 hover:bg-secondary/20 transition-colors cursor-pointer">
                    <td className="px-4 py-3 text-primary font-medium">{a.id}</td>
                    <td className="px-4 py-3 text-muted-foreground font-mono text-xs">{a.factura}</td>
                    <td className="px-4 py-3 text-foreground">{a.titular}</td>
                    <td className="px-4 py-3">
                      <span className={`flex items-center gap-1 text-xs font-medium ${tipoCfg.color}`}>
                        <tipoCfg.icon className="h-3 w-3" />
                        {a.tipo}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground text-xs max-w-[200px] truncate">{a.motivo}</td>
                    <td className="px-4 py-3 text-right">
                      <span className={a.importeAjuste.startsWith("-") ? "text-success font-medium" : "text-foreground font-medium"}>
                        {a.importeAjuste}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[a.status]}`}>
                        {a.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Rules callout */}
        <div className="bg-card rounded-lg border border-border p-4">
          <h3 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-warning" />
            Reglas de ajuste (RF-AJ.2)
          </h3>
          <div className="grid grid-cols-2 gap-3 text-xs text-muted-foreground">
            <div>• Factura <span className="text-foreground">emitida/timbrada</span>: solo nota de crédito o cancelación + refactura</div>
            <div>• Factura <span className="text-foreground">preliminar</span>: permite corrección directa</div>
            <div>• CFDI timbrado: cancelación requiere <span className="text-foreground">procedimiento fiscal SAT</span></div>
            <div>• Bloqueo post-aceptación: <span className="text-foreground">no se edita la factura original</span></div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Ajustes;
