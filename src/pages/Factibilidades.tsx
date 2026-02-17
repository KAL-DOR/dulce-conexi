import { AppLayout } from "@/components/layout/AppLayout";
import { useState } from "react";
import {
  Plus,
  Search,
  ChevronRight,
  CheckCircle2,
  Clock,
  XCircle,
  FileText,
  Users,
  HardHat,
  MapPin,
} from "lucide-react";

type FactibilidadStatus = "Pre-factibilidad" | "En comité" | "Aprobada" | "En construcción" | "Tomas creadas" | "Rechazada";

interface Factibilidad {
  id: string;
  solicitante: string;
  ubicacion: string;
  tipoServicio: string;
  capacidad: string;
  fecha: string;
  status: FactibilidadStatus;
  tomas: number;
  tomasCreadas: number;
}

const factibilidades: Factibilidad[] = [
  { id: "FAC-0045", solicitante: "Desarrolladora Norte SA", ubicacion: "Fracc. Residencial del Lago", tipoServicio: "Doméstico", capacidad: "120 viviendas", fecha: "05 Feb 2026", status: "En construcción", tomas: 120, tomasCreadas: 0 },
  { id: "FAC-0044", solicitante: "IMSS Delegación Qro", ubicacion: "Blvd. Bernardo Quintana #200", tipoServicio: "Gobierno", capacidad: "1 toma industrial", fecha: "28 Ene 2026", status: "En comité", tomas: 1, tomasCreadas: 0 },
  { id: "FAC-0043", solicitante: "Grupo Comercial Hidalgo", ubicacion: "Av. Constituyentes #450", tipoServicio: "Comercial", capacidad: "8 locales", fecha: "20 Ene 2026", status: "Aprobada", tomas: 8, tomasCreadas: 0 },
  { id: "FAC-0042", solicitante: "Inmobiliaria Querétaro", ubicacion: "Fracc. Los Cipreses Etapa 3", tipoServicio: "Doméstico", capacidad: "85 viviendas", fecha: "10 Ene 2026", status: "Tomas creadas", tomas: 85, tomasCreadas: 85 },
  { id: "FAC-0041", solicitante: "Particular — Juan Méndez", ubicacion: "Priv. San Miguel #12", tipoServicio: "Doméstico", capacidad: "1 vivienda", fecha: "05 Ene 2026", status: "Rechazada", tomas: 1, tomasCreadas: 0 },
  { id: "FAC-0040", solicitante: "Constructora Vial SA", ubicacion: "Fracc. Mirador del Valle", tipoServicio: "Doméstico", capacidad: "200 viviendas", fecha: "18 Dic 2025", status: "Tomas creadas", tomas: 200, tomasCreadas: 200 },
];

const statusConfig: Record<FactibilidadStatus, { color: string; icon: typeof Clock }> = {
  "Pre-factibilidad": { color: "bg-muted text-muted-foreground", icon: FileText },
  "En comité": { color: "bg-warning/20 text-warning", icon: Users },
  "Aprobada": { color: "bg-info/20 text-info", icon: CheckCircle2 },
  "En construcción": { color: "bg-primary/20 text-primary", icon: HardHat },
  "Tomas creadas": { color: "bg-success/20 text-success", icon: CheckCircle2 },
  "Rechazada": { color: "bg-destructive/20 text-destructive", icon: XCircle },
};

const steps: { label: string; icon: typeof FileText }[] = [
  { label: "Pre-factibilidad", icon: FileText },
  { label: "Comité", icon: Users },
  { label: "Aprobación", icon: CheckCircle2 },
  { label: "Construcción", icon: HardHat },
  { label: "Tomas/PS", icon: MapPin },
];

function getStepIndex(status: FactibilidadStatus): number {
  switch (status) {
    case "Pre-factibilidad": return 0;
    case "En comité": return 1;
    case "Aprobada": return 2;
    case "En construcción": return 3;
    case "Tomas creadas": return 4;
    case "Rechazada": return -1;
  }
}

const Factibilidades = () => {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Factibilidad | null>(null);

  const filtered = factibilidades.filter(
    (f) =>
      !search ||
      f.solicitante.toLowerCase().includes(search.toLowerCase()) ||
      f.id.toLowerCase().includes(search.toLowerCase()) ||
      f.ubicacion.toLowerCase().includes(search.toLowerCase())
  );

  const summary = {
    total: factibilidades.length,
    enProceso: factibilidades.filter((f) => !["Tomas creadas", "Rechazada"].includes(f.status)).length,
    completadas: factibilidades.filter((f) => f.status === "Tomas creadas").length,
    tomasGeneradas: factibilidades.reduce((s, f) => s + f.tomasCreadas, 0),
  };

  return (
    <AppLayout>
      <div className="animate-fade-in space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-foreground">Factibilidades</h1>
            <p className="text-sm text-muted-foreground">
              Paso 0 — Pre-factibilidad → Comité → Construcción → Alta de tomas
            </p>
          </div>
          <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">
            <Plus className="h-4 w-4" />
            Nueva solicitud
          </button>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: "Total solicitudes", value: summary.total },
            { label: "En proceso", value: summary.enProceso },
            { label: "Completadas", value: summary.completadas },
            { label: "Tomas generadas", value: summary.tomasGeneradas.toLocaleString() },
          ].map((s) => (
            <div key={s.label} className="bg-card rounded-lg border border-border p-4">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{s.label}</p>
              <p className="text-2xl font-bold text-foreground mt-1">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Search */}
        <div className="flex items-center gap-2 bg-card border border-border rounded-md px-3 py-1.5 max-w-sm">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar solicitud..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none flex-1"
          />
        </div>

        {/* Table */}
        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/30">
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider"># Solicitud</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Solicitante</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Ubicación</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Tipo</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Capacidad</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="px-4 py-2.5 w-8" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((f) => {
                const cfg = statusConfig[f.status];
                return (
                  <tr
                    key={f.id}
                    onClick={() => setSelected(selected?.id === f.id ? null : f)}
                    className="border-b border-border last:border-0 hover:bg-secondary/20 transition-colors cursor-pointer"
                  >
                    <td className="px-4 py-3 text-primary font-medium">{f.id}</td>
                    <td className="px-4 py-3 text-foreground">{f.solicitante}</td>
                    <td className="px-4 py-3 text-muted-foreground">{f.ubicacion}</td>
                    <td className="px-4 py-3 text-muted-foreground">{f.tipoServicio}</td>
                    <td className="px-4 py-3 text-muted-foreground">{f.capacidad}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${cfg.color}`}>
                        {f.status}
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

        {/* Detail panel */}
        {selected && (
          <div className="bg-card rounded-lg border border-border p-5 space-y-5 animate-fade-in">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-sm font-semibold text-foreground">{selected.id} — {selected.solicitante}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{selected.ubicacion} · {selected.fecha}</p>
              </div>
              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${statusConfig[selected.status].color}`}>
                {selected.status}
              </span>
            </div>

            {/* Step tracker */}
            <div className="flex items-center gap-0">
              {steps.map((step, i) => {
                const currentStep = getStepIndex(selected.status);
                const isRejected = selected.status === "Rechazada";
                const isDone = !isRejected && i <= currentStep;
                const isCurrent = !isRejected && i === currentStep;
                return (
                  <div key={step.label} className="flex items-center flex-1">
                    <div className="flex flex-col items-center flex-1">
                      <div
                        className={`h-8 w-8 rounded-full flex items-center justify-center border-2 transition-colors ${
                          isRejected
                            ? "border-destructive/30 bg-destructive/10"
                            : isDone
                            ? "border-primary bg-primary/20"
                            : "border-border bg-secondary/30"
                        }`}
                      >
                        <step.icon className={`h-3.5 w-3.5 ${
                          isRejected ? "text-destructive" : isDone ? "text-primary" : "text-muted-foreground"
                        }`} />
                      </div>
                      <span className={`text-[10px] mt-1 font-medium ${
                        isCurrent ? "text-primary" : isDone ? "text-foreground" : "text-muted-foreground"
                      }`}>
                        {step.label}
                      </span>
                    </div>
                    {i < steps.length - 1 && (
                      <div className={`h-0.5 w-full -mt-4 ${
                        !isRejected && i < currentStep ? "bg-primary" : "bg-border"
                      }`} />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Info grid */}
            <div className="grid grid-cols-4 gap-4 text-sm">
              {[
                ["Tipo servicio", selected.tipoServicio],
                ["Capacidad", selected.capacidad],
                ["Tomas planificadas", String(selected.tomas)],
                ["Tomas creadas", `${selected.tomasCreadas} / ${selected.tomas}`],
              ].map(([label, value]) => (
                <div key={label}>
                  <p className="text-xs text-muted-foreground">{label}</p>
                  <p className="text-foreground font-medium">{value}</p>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {selected.status === "Pre-factibilidad" && (
                <button className="px-4 py-2 rounded-md text-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                  Enviar a comité
                </button>
              )}
              {selected.status === "En comité" && (
                <>
                  <button className="px-4 py-2 rounded-md text-sm bg-success text-success-foreground hover:bg-success/90 transition-colors">
                    Aprobar
                  </button>
                  <button className="px-4 py-2 rounded-md text-sm bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors">
                    Rechazar
                  </button>
                </>
              )}
              {selected.status === "Aprobada" && (
                <button className="px-4 py-2 rounded-md text-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                  Iniciar construcción
                </button>
              )}
              {selected.status === "En construcción" && (
                <button className="px-4 py-2 rounded-md text-sm bg-success text-success-foreground hover:bg-success/90 transition-colors">
                  Cierre de obra → Crear tomas
                </button>
              )}
              {selected.status === "Tomas creadas" && (
                <span className="text-xs text-success flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Listo para contratación (Paso 1)
                </span>
              )}
              <button className="px-4 py-2 rounded-md text-sm border border-border text-foreground hover:bg-secondary transition-colors ml-auto">
                Ver documentos
              </button>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Factibilidades;
