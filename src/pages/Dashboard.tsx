import { AppLayout } from "@/components/layout/AppLayout";
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

const kpis = [
  {
    label: "Facturado este mes",
    value: "$12.4M",
    change: "+8.2%",
    trend: "up" as const,
  },
  {
    label: "Tasa de cobranza",
    value: "87.3%",
    change: "+2.1%",
    trend: "up" as const,
  },
  {
    label: "Cuentas con adeudo",
    value: "4,521",
    change: "-3.4%",
    trend: "down" as const,
  },
  {
    label: "Órdenes abiertas",
    value: "23",
    change: "+5",
    trend: "neutral" as const,
  },
];

const billingByZone = [
  { zona: "Centro", amount: 5.2 },
  { zona: "Norte", amount: 3.5 },
  { zona: "Sur", amount: 2.2 },
  { zona: "Rural", amount: 1.5 },
];

const collectionTrend = [
  { mes: "Sep", meta: 10.2, actual: 9.8 },
  { mes: "Oct", meta: 10.5, actual: 10.1 },
  { mes: "Nov", meta: 11.0, actual: 10.8 },
  { mes: "Dic", meta: 11.2, actual: 10.5 },
  { mes: "Ene", meta: 11.8, actual: 11.2 },
  { mes: "Feb", meta: 12.4, actual: 10.8 },
];

const cycleStatus = [
  { zona: "Centro", progress: 100, status: "done" },
  { zona: "Norte", progress: 78, status: "progress" },
  { zona: "Sur", progress: 0, status: "pending" },
];

const alerts = [
  { type: "warning", text: "3 errores de timbrado pendientes" },
  { type: "warning", text: "Ruta 17 con retraso — 111 lecturas pendientes" },
  { type: "error", text: "PAC no responde — último intento hace 15 min" },
];

const Dashboard = () => {
  return (
    <AppLayout>
      <div className="animate-fade-in space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-xl font-bold text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            CEA Querétaro · Febrero 2026
          </p>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-4 gap-4">
          {kpis.map((kpi) => (
            <div
              key={kpi.label}
              className="bg-card rounded-lg border border-border p-4"
            >
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                {kpi.label}
              </p>
              <div className="mt-2 flex items-end gap-2">
                <span className="text-2xl font-bold text-foreground">
                  {kpi.value}
                </span>
                <span
                  className={`text-xs font-medium flex items-center gap-0.5 ${
                    kpi.trend === "up"
                      ? "text-success"
                      : kpi.trend === "down"
                      ? "text-success"
                      : "text-muted-foreground"
                  }`}
                >
                  {kpi.trend === "up" && (
                    <TrendingUp className="h-3 w-3" />
                  )}
                  {kpi.trend === "down" && (
                    <TrendingDown className="h-3 w-3" />
                  )}
                  {kpi.change}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-2 gap-4">
          {/* Billing by zone */}
          <div className="bg-card rounded-lg border border-border p-4">
            <h3 className="text-sm font-semibold text-foreground mb-4">
              Facturación por zona
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={billingByZone}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--border))"
                />
                <XAxis
                  dataKey="zona"
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                  axisLine={{ stroke: "hsl(var(--border))" }}
                />
                <YAxis
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                  axisLine={{ stroke: "hsl(var(--border))" }}
                  tickFormatter={(v) => `$${v}M`}
                />
                <Tooltip
                  contentStyle={{
                    background: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "6px",
                    fontSize: 12,
                    color: "hsl(var(--foreground))",
                  }}
                  formatter={(value: number) => [`$${value}M`, "Monto"]}
                />
                <Bar
                  dataKey="amount"
                  fill="hsl(var(--primary))"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Collection trend */}
          <div className="bg-card rounded-lg border border-border p-4">
            <h3 className="text-sm font-semibold text-foreground mb-4">
              Cobranza acumulada — Meta vs Actual
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={collectionTrend}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--border))"
                />
                <XAxis
                  dataKey="mes"
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                  axisLine={{ stroke: "hsl(var(--border))" }}
                />
                <YAxis
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                  axisLine={{ stroke: "hsl(var(--border))" }}
                  tickFormatter={(v) => `$${v}M`}
                />
                <Tooltip
                  contentStyle={{
                    background: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "6px",
                    fontSize: 12,
                    color: "hsl(var(--foreground))",
                  }}
                  formatter={(value: number) => [`$${value}M`]}
                />
                <Line
                  type="monotone"
                  dataKey="meta"
                  stroke="hsl(var(--muted-foreground))"
                  strokeDasharray="5 5"
                  strokeWidth={2}
                  dot={false}
                  name="Meta"
                />
                <Line
                  type="monotone"
                  dataKey="actual"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={{ r: 3, fill: "hsl(var(--primary))" }}
                  name="Actual"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bottom row */}
        <div className="grid grid-cols-2 gap-4">
          {/* Cycle status */}
          <div className="bg-card rounded-lg border border-border p-4">
            <h3 className="text-sm font-semibold text-foreground mb-3">
              Ciclo actual de lecturas
            </h3>
            <div className="space-y-3">
              {cycleStatus.map((zone) => (
                <div key={zone.zona} className="flex items-center gap-3">
                  <span className="text-sm text-foreground w-16">
                    {zone.zona}
                  </span>
                  <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${zone.progress}%`,
                        backgroundColor:
                          zone.status === "done"
                            ? "hsl(var(--success))"
                            : "hsl(var(--primary))",
                      }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground w-12 text-right">
                    {zone.status === "done" ? (
                      <CheckCircle2 className="h-4 w-4 text-success inline" />
                    ) : zone.progress === 0 ? (
                      "Pendiente"
                    ) : (
                      `${zone.progress}%`
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Alerts */}
          <div className="bg-card rounded-lg border border-border p-4">
            <h3 className="text-sm font-semibold text-foreground mb-3">
              Alertas recientes
            </h3>
            <div className="space-y-2">
              {alerts.map((alert, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2 text-sm p-2 rounded-md bg-secondary/50"
                >
                  <AlertTriangle
                    className={`h-4 w-4 shrink-0 mt-0.5 ${
                      alert.type === "error"
                        ? "text-destructive"
                        : "text-warning"
                    }`}
                  />
                  <span className="text-foreground">{alert.text}</span>
                  <ArrowRight className="h-3.5 w-3.5 text-muted-foreground ml-auto shrink-0 mt-0.5" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
