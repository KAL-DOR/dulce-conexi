import { AppLayout } from "@/components/layout/AppLayout";
import { Plus, Filter, ChevronRight } from "lucide-react";
import { useState } from "react";

const orders = [
  { id: "ORD-4530", tipo: "Corte", toma: "Juárez #118", asignado: "R. Martínez", prioridad: "Alta", status: "En progreso", fecha: "18 Feb 2026" },
  { id: "ORD-4529", tipo: "Reconexión", toma: "Allende #7", asignado: "L. Torres", prioridad: "Media", status: "Pendiente", fecha: "19 Feb 2026" },
  { id: "ORD-4528", tipo: "Instalación medidor", toma: "Reforma #89", asignado: "R. Martínez", prioridad: "Media", status: "Asignada", fecha: "20 Feb 2026" },
  { id: "ORD-4527", tipo: "Inspección", toma: "5 de Mayo #23", asignado: "M. Solis", prioridad: "Baja", status: "Completada", fecha: "15 Feb 2026" },
  { id: "ORD-4526", tipo: "Reparación", toma: "Morelos #56", asignado: "F. Luna", prioridad: "Alta", status: "En progreso", fecha: "17 Feb 2026" },
  { id: "ORD-4525", tipo: "Instalación toma", toma: "Zaragoza #34", asignado: "R. Martínez", prioridad: "Media", status: "Completada", fecha: "14 Feb 2026" },
];

const statusColors: Record<string, string> = {
  Pendiente: "bg-warning/20 text-warning",
  Asignada: "bg-info/20 text-info",
  "En progreso": "bg-primary/20 text-primary",
  Completada: "bg-success/20 text-success",
  Cancelada: "bg-muted text-muted-foreground",
};

const prioridadColors: Record<string, string> = {
  Alta: "text-destructive",
  Media: "text-warning",
  Baja: "text-muted-foreground",
};

const Ordenes = () => {
  const [filterStatus, setFilterStatus] = useState("Todos");

  const filtered = orders.filter(
    (o) => filterStatus === "Todos" || o.status === filterStatus
  );

  return (
    <AppLayout>
      <div className="animate-fade-in space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-foreground">Órdenes de Trabajo</h1>
            <p className="text-sm text-muted-foreground">{filtered.length} órdenes</p>
          </div>
          <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">
            <Plus className="h-4 w-4" />
            Nueva Orden
          </button>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-card border border-border rounded-md p-0.5">
            {["Todos", "Pendiente", "En progreso", "Completada"].map((s) => (
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
          <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <Filter className="h-3.5 w-3.5" />
            Más filtros
          </button>
        </div>

        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/30">
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider"># Orden</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Tipo</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Toma / Dirección</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Asignado a</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Prioridad</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Fecha prog.</th>
                <th className="px-4 py-2.5 w-8" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((o) => (
                <tr key={o.id} className="border-b border-border last:border-0 hover:bg-secondary/20 transition-colors cursor-pointer">
                  <td className="px-4 py-3 text-primary font-medium">{o.id}</td>
                  <td className="px-4 py-3 text-foreground">{o.tipo}</td>
                  <td className="px-4 py-3 text-muted-foreground">{o.toma}</td>
                  <td className="px-4 py-3 text-foreground">{o.asignado}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-medium ${prioridadColors[o.prioridad] || ""}`}>
                      {o.prioridad}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[o.status] || ""}`}>
                      {o.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{o.fecha}</td>
                  <td className="px-4 py-3">
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
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

export default Ordenes;
