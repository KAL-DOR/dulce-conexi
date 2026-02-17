import { AppLayout } from "@/components/layout/AppLayout";
import { Upload, Lock, ChevronRight, CheckCircle2, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { RecibirArchivoModal } from "@/components/modals/RecibirArchivoModal";
import { CerrarCicloModal } from "@/components/modals/CerrarCicloModal";

const routes = [
  { ruta: 14, lecturista: "J. Pérez", leidas: 342, pendientes: 58, incidencias: 12, complete: false },
  { ruta: 17, lecturista: "R. López", leidas: 289, pendientes: 111, incidencias: 23, complete: false },
  { ruta: 22, lecturista: "A. Ruiz", leidas: 400, pendientes: 0, incidencias: 8, complete: true },
  { ruta: 25, lecturista: "M. Solis", leidas: 198, pendientes: 202, incidencias: 5, complete: false },
  { ruta: 31, lecturista: "F. Luna", leidas: 0, pendientes: 380, incidencias: 0, complete: false },
];

const totalLeidas = routes.reduce((s, r) => s + r.leidas, 0);
const totalTotal = routes.reduce((s, r) => s + r.leidas + r.pendientes, 0);
const progress = Math.round((totalLeidas / totalTotal) * 100);
const allComplete = routes.every((r) => r.complete);

const Lecturas = () => {
  const [archivoOpen, setArchivoOpen] = useState(false);
  const [cerrarCicloOpen, setCerrarCicloOpen] = useState(false);

  return (
    <AppLayout>
      <div className="animate-fade-in space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-foreground">Ciclo de Lectura</h1>
            <p className="text-sm text-muted-foreground">Febrero 2026 · Zona Centro</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setArchivoOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-md text-sm border border-border text-foreground hover:bg-secondary transition-colors"
            >
              <Upload className="h-4 w-4" />
              Recibir archivo lecturas
            </button>
            <button
              onClick={() => setCerrarCicloOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-md text-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Lock className="h-4 w-4" />
              Cerrar ciclo
            </button>
          </div>
        </div>

        {/* Progress */}
        <div className="bg-card rounded-lg border border-border p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-foreground font-medium">Progreso del ciclo</span>
            <span className="text-sm text-foreground font-bold">{progress}% completado</span>
          </div>
          <div className="h-3 bg-secondary rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full transition-all duration-700" style={{ width: `${progress}%` }} />
          </div>
          <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
            <span>{totalLeidas.toLocaleString()} leídas</span>
            <span>·</span>
            <span>{(totalTotal - totalLeidas).toLocaleString()} pendientes</span>
            <span>·</span>
            <span>{routes.reduce((s, r) => s + r.incidencias, 0)} incidencias</span>
          </div>
        </div>

        {/* Routes table */}
        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/30">
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Ruta</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Lecturista</th>
                <th className="text-right px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Leídas</th>
                <th className="text-right px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Pendientes</th>
                <th className="text-right px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Incidencias</th>
                <th className="text-center px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="px-4 py-2.5 w-8" />
              </tr>
            </thead>
            <tbody>
              {routes.map((r) => (
                <tr key={r.ruta} className="border-b border-border last:border-0 hover:bg-secondary/20 transition-colors cursor-pointer">
                  <td className="px-4 py-3 text-primary font-medium">Ruta {r.ruta}</td>
                  <td className="px-4 py-3 text-foreground">{r.lecturista}</td>
                  <td className="px-4 py-3 text-right text-foreground font-medium">{r.leidas}</td>
                  <td className="px-4 py-3 text-right text-muted-foreground">{r.pendientes}</td>
                  <td className="px-4 py-3 text-right">
                    {r.incidencias > 0 ? (
                      <span className="inline-flex items-center gap-1 text-warning">
                        <AlertTriangle className="h-3 w-3" />
                        {r.incidencias}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">0</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {r.complete ? (
                      <CheckCircle2 className="h-4 w-4 text-success inline" />
                    ) : r.leidas === 0 ? (
                      <span className="text-xs text-muted-foreground">Sin iniciar</span>
                    ) : (
                      <span className="text-xs text-info font-medium">En progreso</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <RecibirArchivoModal open={archivoOpen} onOpenChange={setArchivoOpen} />
      <CerrarCicloModal open={cerrarCicloOpen} onOpenChange={setCerrarCicloOpen} onConfirm={() => setCerrarCicloOpen(false)} />
    </AppLayout>
  );
};

export default Lecturas;
