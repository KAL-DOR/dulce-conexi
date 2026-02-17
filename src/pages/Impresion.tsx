import { AppLayout } from "@/components/layout/AppLayout";
import { useState } from "react";
import {
  Printer,
  Send,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Eye,
  FileText,
  MessageSquare,
  Calendar,
  Package,
} from "lucide-react";

type PaqueteStatus = "preparando" | "enviado" | "imprimiendo" | "distribuido" | "error";

interface PaqueteImpresion {
  id: string;
  zona: string;
  periodo: string;
  facturas: number;
  conMensaje: number;
  fechaVencimiento: string;
  status: PaqueteStatus;
  enviado?: string;
  distribuido?: string;
}

const paquetes: PaqueteImpresion[] = [
  { id: "PKT-2602-01", zona: "Centro", periodo: "Feb 2026", facturas: 4200, conMensaje: 320, fechaVencimiento: "15 Mar 2026", status: "distribuido", enviado: "16 Feb 2026", distribuido: "18 Feb 2026" },
  { id: "PKT-2602-02", zona: "Norte", periodo: "Feb 2026", facturas: 2800, conMensaje: 180, fechaVencimiento: "15 Mar 2026", status: "imprimiendo", enviado: "17 Feb 2026" },
  { id: "PKT-2602-03", zona: "Sur", periodo: "Feb 2026", facturas: 1500, conMensaje: 95, fechaVencimiento: "20 Mar 2026", status: "enviado", enviado: "17 Feb 2026" },
  { id: "PKT-2602-04", zona: "Rural", periodo: "Feb 2026", facturas: 890, conMensaje: 45, fechaVencimiento: "20 Mar 2026", status: "preparando" },
  { id: "PKT-2601-01", zona: "Centro", periodo: "Ene 2026", facturas: 4180, conMensaje: 290, fechaVencimiento: "15 Feb 2026", status: "distribuido", enviado: "16 Ene 2026", distribuido: "18 Ene 2026" },
];

const statusConfig: Record<PaqueteStatus, { label: string; color: string; icon: typeof Clock }> = {
  preparando: { label: "Preparando", color: "bg-muted text-muted-foreground", icon: Clock },
  enviado: { label: "Enviado", color: "bg-info/20 text-info", icon: Send },
  imprimiendo: { label: "Imprimiendo", color: "bg-warning/20 text-warning", icon: Printer },
  distribuido: { label: "Distribuido", color: "bg-success/20 text-success", icon: CheckCircle2 },
  error: { label: "Error", color: "bg-destructive/20 text-destructive", icon: AlertTriangle },
};

const mensajes = [
  { id: 1, texto: "Aviso: nueva tarifa vigente a partir de Marzo 2026", canal: "Impreso", vigencia: "Mar 2026", filtro: "Todas las zonas", prioridad: "Alta" },
  { id: 2, texto: "Programa de descuento por pago adelantado — 5% dto.", canal: "Impreso + SMS", vigencia: "Feb-Mar 2026", filtro: "Doméstico", prioridad: "Media" },
  { id: 3, texto: "Mantenimiento programado Zona Norte — 25 Feb 2026", canal: "Encarte", vigencia: "Feb 2026", filtro: "Zona Norte", prioridad: "Alta" },
];

const Impresion = () => {
  const [activeTab, setActiveTab] = useState<"paquetes" | "mensajes">("paquetes");

  return (
    <AppLayout>
      <div className="animate-fade-in space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-foreground">Impresión y Mensajes</h1>
            <p className="text-sm text-muted-foreground">
              Pasos 19–21 — Mensajes en recibos · Vencimiento · Envío a impresión
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-0 border-b border-border">
          {[
            { id: "paquetes" as const, label: "Paquetes de impresión", icon: Package },
            { id: "mensajes" as const, label: "Catálogo de mensajes", icon: MessageSquare },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 transition-colors -mb-px ${
                activeTab === tab.id
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "paquetes" && (
          <div className="space-y-5 animate-fade-in">
            {/* Summary */}
            <div className="grid grid-cols-4 gap-4">
              {[
                { label: "Total paquetes", value: paquetes.length },
                { label: "Facturas en proceso", value: paquetes.filter((p) => p.status !== "distribuido").reduce((s, p) => s + p.facturas, 0).toLocaleString() },
                { label: "Distribuidos", value: paquetes.filter((p) => p.status === "distribuido").length },
                { label: "Con mensajes", value: paquetes.reduce((s, p) => s + p.conMensaje, 0).toLocaleString() },
              ].map((s) => (
                <div key={s.label} className="bg-card rounded-lg border border-border p-4">
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{s.label}</p>
                  <p className="text-2xl font-bold text-foreground mt-1">{s.value}</p>
                </div>
              ))}
            </div>

            {/* Table */}
            <div className="bg-card rounded-lg border border-border overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-secondary/30">
                    <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider"># Paquete</th>
                    <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Zona</th>
                    <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Periodo</th>
                    <th className="text-right px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Facturas</th>
                    <th className="text-right px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Con mensaje</th>
                    <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Vencimiento</th>
                    <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                    <th className="text-right px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {paquetes.map((p) => {
                    const cfg = statusConfig[p.status];
                    return (
                      <tr key={p.id} className="border-b border-border last:border-0 hover:bg-secondary/20 transition-colors">
                        <td className="px-4 py-3 text-primary font-medium">{p.id}</td>
                        <td className="px-4 py-3 text-foreground">{p.zona}</td>
                        <td className="px-4 py-3 text-muted-foreground">{p.periodo}</td>
                        <td className="px-4 py-3 text-right text-foreground font-medium">{p.facturas.toLocaleString()}</td>
                        <td className="px-4 py-3 text-right text-muted-foreground">{p.conMensaje}</td>
                        <td className="px-4 py-3 text-muted-foreground flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {p.fechaVencimiento}
                        </td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${cfg.color}`}>
                            {cfg.label}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center gap-1 justify-end">
                            <button className="p-1.5 rounded hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors" title="Preview">
                              <Eye className="h-3.5 w-3.5" />
                            </button>
                            {p.status === "preparando" && (
                              <button className="p-1.5 rounded hover:bg-primary/20 text-primary transition-colors" title="Enviar a impresión">
                                <Send className="h-3.5 w-3.5" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* XML payload info */}
            <div className="bg-card rounded-lg border border-border p-4">
              <h3 className="text-sm font-semibold text-foreground mb-2">Contenido XML de impresión (RF-21.1)</h3>
              <div className="grid grid-cols-5 gap-3 text-xs text-muted-foreground">
                <div className="bg-secondary/50 rounded p-2 text-center">
                  <p className="font-medium text-foreground">Saldo timbrado</p>
                  <p>CFDI vigente</p>
                </div>
                <div className="bg-secondary/50 rounded p-2 text-center">
                  <p className="font-medium text-foreground">Saldo vencido</p>
                  <p>XML pasados impagos</p>
                </div>
                <div className="bg-secondary/50 rounded p-2 text-center">
                  <p className="font-medium text-foreground">Parcialidades</p>
                  <p>Medidores/convenios</p>
                </div>
                <div className="bg-secondary/50 rounded p-2 text-center">
                  <p className="font-medium text-foreground">Mensaje</p>
                  <p>Catálogo aplicado</p>
                </div>
                <div className="bg-secondary/50 rounded p-2 text-center">
                  <p className="font-medium text-foreground">Vencimiento</p>
                  <p>Fecha calculada</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "mensajes" && (
          <div className="space-y-5 animate-fade-in">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Paso 19 — Catálogo de mensajes para recibos</p>
              <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">
                <MessageSquare className="h-4 w-4" />
                Nuevo mensaje
              </button>
            </div>

            <div className="space-y-3">
              {mensajes.map((m) => (
                <div key={m.id} className="bg-card rounded-lg border border-border p-4 hover:bg-secondary/20 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1 flex-1">
                      <p className="text-sm text-foreground font-medium">{m.texto}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>Canal: <span className="text-foreground">{m.canal}</span></span>
                        <span>Vigencia: <span className="text-foreground">{m.vigencia}</span></span>
                        <span>Filtro: <span className="text-foreground">{m.filtro}</span></span>
                        <span>Prioridad: <span className={m.prioridad === "Alta" ? "text-warning" : "text-foreground"}>{m.prioridad}</span></span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 rounded hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors" title="Preview">
                        <Eye className="h-3.5 w-3.5" />
                      </button>
                      <button className="p-1.5 rounded hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors" title="Editar">
                        <FileText className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Impresion;
