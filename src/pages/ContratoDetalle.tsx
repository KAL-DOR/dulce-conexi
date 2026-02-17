import { AppLayout } from "@/components/layout/AppLayout";
import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, Edit, UserMinus, Pause, FileText, Download } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const tabs = ["General", "Facturas", "Lecturas", "Órdenes", "Timeline"];

const invoices = [
  { periodo: "Feb 2026", consumo: "22 m³", importe: "$498.00", status: "Vigente", cfdi: true },
  { periodo: "Ene 2026", consumo: "24 m³", importe: "$542.00", status: "Vencida", cfdi: true },
  { periodo: "Dic 2025", consumo: "18 m³", importe: "$0.00", status: "Cobrada", cfdi: true },
  { periodo: "Nov 2025", consumo: "20 m³", importe: "$0.00", status: "Cobrada", cfdi: true },
  { periodo: "Oct 2025", consumo: "19 m³", importe: "$0.00", status: "Cobrada", cfdi: true },
];

const readings = [
  { mes: "Mar", consumo: 20, tipo: "real" },
  { mes: "Abr", consumo: 18, tipo: "real" },
  { mes: "May", consumo: 22, tipo: "real" },
  { mes: "Jun", consumo: 25, tipo: "real" },
  { mes: "Jul", consumo: 28, tipo: "real" },
  { mes: "Ago", consumo: 26, tipo: "real" },
  { mes: "Sep", consumo: 21, tipo: "real" },
  { mes: "Oct", consumo: 19, tipo: "estimado" },
  { mes: "Nov", consumo: 20, tipo: "real" },
  { mes: "Dic", consumo: 18, tipo: "real" },
  { mes: "Ene", consumo: 24, tipo: "real" },
  { mes: "Feb", consumo: 22, tipo: "real" },
];

const timeline = [
  { date: "15 Feb 2026", event: "Factura generada", user: "Sistema", detail: "Periodo Feb 2026 — $498.00" },
  { date: "02 Feb 2026", event: "Lectura capturada", user: "J. Pérez", detail: "Lectura: 1,256 m³ — Consumo: 22 m³" },
  { date: "18 Ene 2026", event: "Pago recibido", user: "Ana M. (Caja 03)", detail: "Dic 2025 — $412.00 — Efectivo" },
  { date: "15 Ene 2026", event: "Factura generada", user: "Sistema", detail: "Periodo Ene 2026 — $542.00" },
  { date: "10 Dic 2025", event: "Cambio de titular", user: "L. Torres", detail: "De: Juan García → A: María García López" },
  { date: "01 Mar 2024", event: "Contrato creado", user: "Sistema", detail: "Alta de contrato doméstico" },
];

const orders = [
  { id: "ORD-4521", tipo: "Instalación medidor", status: "Completada", fecha: "15 Mar 2024", asignado: "R. Martínez" },
  { id: "ORD-4520", tipo: "Instalación toma", status: "Completada", fecha: "10 Mar 2024", asignado: "R. Martínez" },
];

const invoiceStatusColors: Record<string, string> = {
  Vigente: "bg-info/20 text-info",
  Vencida: "bg-destructive/20 text-destructive",
  Cobrada: "bg-success/20 text-success",
};

const orderStatusColors: Record<string, string> = {
  Completada: "bg-success/20 text-success",
  "En progreso": "bg-info/20 text-info",
  Pendiente: "bg-warning/20 text-warning",
};

const ContratoDetalle = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("General");

  return (
    <AppLayout>
      <div className="animate-fade-in space-y-5">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm">
          <Link
            to="/contratos"
            className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Contratos
          </Link>
          <span className="text-muted-foreground">/</span>
          <span className="text-foreground font-medium">#{id}</span>
        </div>

        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-bold text-foreground">
                Contrato #{id}
              </h1>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-success/20 text-success">
                <span className="h-1.5 w-1.5 rounded-full bg-success" />
                Activo
              </span>
            </div>
            <p className="text-sm text-muted-foreground mt-0.5">
              Titular: María García López · RFC: GALM850312
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm text-muted-foreground border border-border hover:bg-secondary transition-colors">
              <UserMinus className="h-3.5 w-3.5" />
              Cambio titular
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm text-muted-foreground border border-border hover:bg-secondary transition-colors">
              <Pause className="h-3.5 w-3.5" />
              Suspender
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
              <Edit className="h-3.5 w-3.5" />
              Editar
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-0 border-b border-border">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors -mb-px ${
                activeTab === tab
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {activeTab === "General" && (
          <div className="grid grid-cols-2 gap-4 animate-fade-in">
            {/* Contract data */}
            <div className="bg-card rounded-lg border border-border p-4 space-y-3">
              <h3 className="text-sm font-semibold text-foreground">
                Datos del contrato
              </h3>
              <div className="grid grid-cols-2 gap-y-2.5 text-sm">
                {[
                  ["Tipo servicio", "Agua, Saneamiento, Alcantarillado"],
                  ["Tipo punto", "Doméstico"],
                  ["Suministro", "Medido"],
                  ["Tarifa", "Doméstica vigente Q1-2026"],
                  ["Método pago", "Ventanilla"],
                  ["Notificación", "WhatsApp"],
                  ["Fecha alta", "01 Mar 2024"],
                  ["Descuentos", "Ninguno"],
                ].map(([label, value]) => (
                  <div key={label}>
                    <p className="text-muted-foreground text-xs">{label}</p>
                    <p className="text-foreground">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Toma data */}
            <div className="bg-card rounded-lg border border-border p-4 space-y-3">
              <h3 className="text-sm font-semibold text-foreground">
                Datos de la toma
              </h3>
              <div className="grid grid-cols-2 gap-y-2.5 text-sm">
                {[
                  ["Dirección", "Hidalgo #42, Col. Centro"],
                  ["Sector", "Centro-A"],
                  ["Medidor", "AB-78901"],
                  ["Marca", "IUSA"],
                  ["Diámetro", '½"'],
                  ["Zona facturación", "Centro"],
                ].map(([label, value]) => (
                  <div key={label}>
                    <p className="text-muted-foreground text-xs">{label}</p>
                    <p className="text-foreground">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Persons */}
            <div className="bg-card rounded-lg border border-border p-4 space-y-3 col-span-2">
              <h3 className="text-sm font-semibold text-foreground">
                Personas
              </h3>
              <div className="grid grid-cols-3 gap-4 text-sm">
                {[
                  {
                    role: "Titular (Propietario)",
                    name: "María García López",
                    rfc: "GALM850312",
                    tel: "442 123 4567",
                    email: "maria@email.com",
                  },
                  {
                    role: "Cliente (Paga)",
                    name: "María García López",
                    rfc: "GALM850312",
                    tel: "442 123 4567",
                    email: "maria@email.com",
                  },
                ].map((person) => (
                  <div
                    key={person.role}
                    className="bg-secondary/50 rounded-md p-3 space-y-1.5"
                  >
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      {person.role}
                    </p>
                    <p className="text-foreground font-medium">{person.name}</p>
                    <p className="text-muted-foreground">RFC: {person.rfc}</p>
                    <p className="text-muted-foreground">Tel: {person.tel}</p>
                    <p className="text-muted-foreground">{person.email}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "Facturas" && (
          <div className="animate-fade-in">
            <div className="bg-card rounded-lg border border-border overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-secondary/30">
                    <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Periodo</th>
                    <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Consumo</th>
                    <th className="text-right px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Importe</th>
                    <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                    <th className="text-center px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">CFDI</th>
                    <th className="text-right px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((inv) => (
                    <tr key={inv.periodo} className="border-b border-border last:border-0 hover:bg-secondary/20 transition-colors">
                      <td className="px-4 py-3 text-foreground font-medium">{inv.periodo}</td>
                      <td className="px-4 py-3 text-muted-foreground">{inv.consumo}</td>
                      <td className="px-4 py-3 text-right text-foreground font-medium">{inv.importe}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${invoiceStatusColors[inv.status] || ""}`}>
                          {inv.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center text-success">✓</td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center gap-2 justify-end">
                          <button className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">
                            <FileText className="h-3 w-3" /> PDF
                          </button>
                          <button className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">
                            <Download className="h-3 w-3" /> XML
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "Lecturas" && (
          <div className="animate-fade-in space-y-4">
            <div className="bg-card rounded-lg border border-border p-4">
              <h3 className="text-sm font-semibold text-foreground mb-4">
                Consumo últimos 12 meses (m³)
              </h3>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={readings}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis
                    dataKey="mes"
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                    axisLine={{ stroke: "hsl(var(--border))" }}
                  />
                  <YAxis
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                    axisLine={{ stroke: "hsl(var(--border))" }}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "6px",
                      fontSize: 12,
                      color: "hsl(var(--foreground))",
                    }}
                    formatter={(value: number, _: string, props: any) => [
                      `${value} m³ (${props.payload.tipo})`,
                      "Consumo",
                    ]}
                  />
                  <Bar dataKey="consumo" radius={[3, 3, 0, 0]}>
                    {readings.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.tipo === "real" ? "hsl(var(--primary))" : "hsl(var(--warning))"}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-sm bg-primary" /> Real
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-sm bg-warning" /> Estimado
                </span>
              </div>
            </div>
          </div>
        )}

        {activeTab === "Órdenes" && (
          <div className="animate-fade-in">
            <div className="bg-card rounded-lg border border-border overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-secondary/30">
                    <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider"># Orden</th>
                    <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Tipo</th>
                    <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Asignado</th>
                    <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Fecha</th>
                    <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o) => (
                    <tr key={o.id} className="border-b border-border last:border-0 hover:bg-secondary/20 transition-colors">
                      <td className="px-4 py-3 text-primary font-medium">{o.id}</td>
                      <td className="px-4 py-3 text-foreground">{o.tipo}</td>
                      <td className="px-4 py-3 text-muted-foreground">{o.asignado}</td>
                      <td className="px-4 py-3 text-muted-foreground">{o.fecha}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${orderStatusColors[o.status] || ""}`}>
                          {o.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "Timeline" && (
          <div className="animate-fade-in">
            <div className="space-y-0">
              {timeline.map((event, i) => (
                <div key={i} className="flex gap-4 relative">
                  <div className="flex flex-col items-center">
                    <div className="h-2.5 w-2.5 rounded-full bg-primary mt-1.5 shrink-0 z-10" />
                    {i < timeline.length - 1 && (
                      <div className="w-px flex-1 bg-border" />
                    )}
                  </div>
                  <div className="pb-5">
                    <p className="text-xs text-muted-foreground">{event.date}</p>
                    <p className="text-sm text-foreground font-medium">
                      {event.event}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {event.user} — {event.detail}
                    </p>
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

export default ContratoDetalle;
