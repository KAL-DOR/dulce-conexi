import { AppLayout } from "@/components/layout/AppLayout";
import { useState } from "react";
import {
  Search,
  AlertTriangle,
  ChevronRight,
  FileText,
  Phone,
  Mail,
  Scissors,
  Handshake,
  DollarSign,
  TrendingUp,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type ProcedimientoStep = "Recordatorio" | "Aviso suspensión" | "Recargo" | "Orden de corte" | "Convenio" | "Juicio";

interface CuentaMorosa {
  id: string;
  cuenta: string;
  titular: string;
  direccion: string;
  tipo: string;
  mesesVencidos: number;
  saldoVencido: string;
  ultimoPago: string;
  paso: ProcedimientoStep;
  convenio: boolean;
}

const morosos: CuentaMorosa[] = [
  { id: "1", cuenta: "7743", titular: "Fernando Ruiz Castro", direccion: "Prol. Pasteur #78", tipo: "Doméstico", mesesVencidos: 8, saldoVencido: "$4,120.00", ultimoPago: "Jun 2025", paso: "Orden de corte", convenio: false },
  { id: "2", cuenta: "2190", titular: "Industrias del Bajío SA", direccion: "Carr. a Celaya Km 12", tipo: "Industrial", mesesVencidos: 4, saldoVencido: "$45,800.00", ultimoPago: "Oct 2025", paso: "Aviso suspensión", convenio: false },
  { id: "3", cuenta: "9912", titular: "Rosa Elena Vega", direccion: "Av. Universidad #34", tipo: "Doméstico", mesesVencidos: 12, saldoVencido: "$6,240.00", ultimoPago: "Feb 2025", paso: "Convenio", convenio: true },
  { id: "4", cuenta: "3345", titular: "Rest. La Mariposa", direccion: "Andador del Vergel #5", tipo: "Comercial", mesesVencidos: 3, saldoVencido: "$8,900.00", ultimoPago: "Nov 2025", paso: "Recargo", convenio: false },
  { id: "5", cuenta: "1120", titular: "Marcos Delgado Ríos", direccion: "Priv. San Sebastián #19", tipo: "Doméstico", mesesVencidos: 6, saldoVencido: "$3,060.00", ultimoPago: "Ago 2025", paso: "Recordatorio", convenio: false },
  { id: "6", cuenta: "5567", titular: "Escuela Primaria Benito Juárez", direccion: "Calle Libertad #100", tipo: "Gobierno", mesesVencidos: 15, saldoVencido: "$22,400.00", ultimoPago: "Nov 2024", paso: "Juicio", convenio: false },
];

const pasoColors: Record<ProcedimientoStep, string> = {
  "Recordatorio": "bg-info/20 text-info",
  "Aviso suspensión": "bg-warning/20 text-warning",
  "Recargo": "bg-warning/20 text-warning",
  "Orden de corte": "bg-destructive/20 text-destructive",
  "Convenio": "bg-primary/20 text-primary",
  "Juicio": "bg-destructive/20 text-destructive",
};

const agingData = [
  { rango: "1-3 meses", cuentas: 142, monto: 280 },
  { rango: "4-6 meses", cuentas: 67, monto: 450 },
  { rango: "7-12 meses", cuentas: 34, monto: 320 },
  { rango: ">12 meses", cuentas: 12, monto: 180 },
];

const Cartera = () => {
  const [search, setSearch] = useState("");
  const [selectedConvenio, setSelectedConvenio] = useState<CuentaMorosa | null>(null);

  const filtered = morosos.filter(
    (m) =>
      !search ||
      m.titular.toLowerCase().includes(search.toLowerCase()) ||
      m.cuenta.includes(search)
  );

  const totalVencido = "$1.23M";
  const totalCuentas = 255;
  const conveniosActivos = 18;

  return (
    <AppLayout>
      <div className="animate-fade-in space-y-5">
        {/* Header */}
        <div>
          <h1 className="text-xl font-bold text-foreground">Cartera Vencida</h1>
          <p className="text-sm text-muted-foreground">
            Impagados · Procedimientos de reclamación · Convenios
          </p>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: "Saldo vencido total", value: totalVencido, icon: DollarSign, color: "text-destructive" },
            { label: "Cuentas morosas", value: totalCuentas, icon: AlertTriangle, color: "text-warning" },
            { label: "Convenios activos", value: conveniosActivos, icon: Handshake, color: "text-primary" },
            { label: "Recuperación mes", value: "$245K", icon: TrendingUp, color: "text-success" },
          ].map((s) => (
            <div key={s.label} className="bg-card rounded-lg border border-border p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{s.label}</p>
                  <p className={`text-2xl font-bold mt-1 ${s.color}`}>{s.value}</p>
                </div>
                <s.icon className={`h-5 w-5 ${s.color} opacity-50`} />
              </div>
            </div>
          ))}
        </div>

        {/* Aging chart */}
        <div className="bg-card rounded-lg border border-border p-4">
          <h3 className="text-sm font-semibold text-foreground mb-4">Antigüedad de saldos vencidos</h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={agingData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="rango" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} axisLine={{ stroke: "hsl(var(--border))" }} />
              <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} axisLine={{ stroke: "hsl(var(--border))" }} tickFormatter={(v) => `$${v}K`} />
              <Tooltip
                contentStyle={{
                  background: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "6px",
                  fontSize: 12,
                  color: "hsl(var(--foreground))",
                }}
                formatter={(value: number) => [`$${value}K`, "Monto vencido"]}
              />
              <Bar dataKey="monto" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} opacity={0.8} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Search */}
        <div className="flex items-center gap-2 bg-card border border-border rounded-md px-3 py-1.5 max-w-sm">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar cuenta morosa..."
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
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Cuenta</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Titular</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Tipo</th>
                <th className="text-center px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Meses</th>
                <th className="text-right px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Saldo vencido</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Último pago</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Paso actual</th>
                <th className="text-right px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((m) => (
                <tr key={m.id} className="border-b border-border last:border-0 hover:bg-secondary/20 transition-colors">
                  <td className="px-4 py-3 text-primary font-medium">{m.cuenta}</td>
                  <td className="px-4 py-3 text-foreground">{m.titular}</td>
                  <td className="px-4 py-3 text-muted-foreground">{m.tipo}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`font-medium ${m.mesesVencidos > 6 ? "text-destructive" : m.mesesVencidos > 3 ? "text-warning" : "text-foreground"}`}>
                      {m.mesesVencidos}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right text-foreground font-medium">{m.saldoVencido}</td>
                  <td className="px-4 py-3 text-muted-foreground">{m.ultimoPago}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${pasoColors[m.paso]}`}>
                      {m.paso}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center gap-1 justify-end">
                      <button className="p-1.5 rounded hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors" title="Enviar recordatorio">
                        <Mail className="h-3.5 w-3.5" />
                      </button>
                      <button className="p-1.5 rounded hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors" title="Llamar">
                        <Phone className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => setSelectedConvenio(m)}
                        className="p-1.5 rounded hover:bg-primary/20 text-primary transition-colors"
                        title="Crear convenio"
                      >
                        <Handshake className="h-3.5 w-3.5" />
                      </button>
                      {m.paso !== "Orden de corte" && m.paso !== "Juicio" && (
                        <button className="p-1.5 rounded hover:bg-destructive/20 text-destructive transition-colors" title="Orden de corte">
                          <Scissors className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Convenio panel */}
        {selectedConvenio && (
          <div className="bg-card rounded-lg border border-primary/30 p-5 space-y-4 animate-fade-in">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <Handshake className="h-4 w-4 text-primary" />
                  Crear convenio — Cuenta {selectedConvenio.cuenta}
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {selectedConvenio.titular} · Saldo: {selectedConvenio.saldoVencido} · {selectedConvenio.mesesVencidos} meses vencidos
                </p>
              </div>
              <button onClick={() => setSelectedConvenio(null)} className="text-muted-foreground hover:text-foreground text-xs">
                Cerrar
              </button>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground block mb-1">Parcialidades</label>
                <select className="w-full bg-secondary border border-border rounded-md px-3 py-2 text-sm text-foreground outline-none">
                  <option>3 meses</option>
                  <option>6 meses</option>
                  <option>12 meses</option>
                  <option>18 meses</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground block mb-1">Enganche</label>
                <input
                  type="text"
                  defaultValue="20%"
                  className="w-full bg-secondary border border-border rounded-md px-3 py-2 text-sm text-foreground outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground block mb-1">Pago mensual estimado</label>
                <div className="w-full bg-secondary/50 border border-border rounded-md px-3 py-2 text-sm text-foreground font-semibold">
                  $549.00
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 rounded-md text-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                Generar convenio
              </button>
              <button className="px-4 py-2 rounded-md text-sm border border-border text-foreground hover:bg-secondary transition-colors">
                Vista previa PDF
              </button>
            </div>
          </div>
        )}

        {/* Procedure workflow */}
        <div className="bg-card rounded-lg border border-border p-4">
          <h3 className="text-sm font-semibold text-foreground mb-3">Flujo de reclamación (RF-CAR.1)</h3>
          <div className="flex items-center gap-0">
            {(["Recordatorio", "Aviso suspensión", "Recargo", "Orden de corte", "Convenio / Juicio"] as const).map((step, i) => (
              <div key={step} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div className="h-7 w-7 rounded-full bg-secondary flex items-center justify-center border border-border">
                    <span className="text-[10px] font-bold text-foreground">{i + 1}</span>
                  </div>
                  <span className="text-[10px] mt-1 text-muted-foreground text-center">{step}</span>
                </div>
                {i < 4 && <div className="h-0.5 w-full -mt-4 bg-border" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Cartera;
