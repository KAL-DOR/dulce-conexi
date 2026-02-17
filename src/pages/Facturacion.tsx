import { AppLayout } from "@/components/layout/AppLayout";
import { AlertTriangle, CheckCircle2, FileDown, Calculator } from "lucide-react";
import { useState } from "react";
import { AprobarTimbradoModal } from "@/components/modals/AprobarTimbradoModal";
import { SimuladorTarifasModal } from "@/components/modals/SimuladorTarifasModal";

const summary = {
  facturas: 4200,
  importe: "$3.2M MXN",
  alertas: 12,
};

const desglose = [
  { tipo: "Doméstico", facturas: 3800, importe: "$2.1M" },
  { tipo: "Comercial", facturas: 320, importe: "$0.9M" },
  { tipo: "Gobierno", facturas: 80, importe: "$0.2M" },
];

const alertas = [
  { cuenta: "4521", msg: "Consumo 5x promedio — revisar" },
  { cuenta: "8832", msg: "Tarifa comercial sin IVA — verificar" },
  { cuenta: "2190", msg: "Lectura estimada 3 meses consecutivos" },
  { cuenta: "7743", msg: "Saldo negativo por bonificación" },
];

const Facturacion = () => {
  const [timbradoOpen, setTimbradoOpen] = useState(false);
  const [simuladorOpen, setSimuladorOpen] = useState(false);

  return (
    <AppLayout>
      <div className="animate-fade-in space-y-5">
        <div>
          <h1 className="text-xl font-bold text-foreground">Pre-facturación</h1>
          <p className="text-sm text-muted-foreground">
            Zona Centro · Febrero 2026
          </p>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-card rounded-lg border border-border p-4">
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Facturas</p>
            <p className="text-2xl font-bold text-foreground mt-1">{summary.facturas.toLocaleString()}</p>
          </div>
          <div className="bg-card rounded-lg border border-border p-4">
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Importe total</p>
            <p className="text-2xl font-bold text-foreground mt-1">{summary.importe}</p>
          </div>
          <div className="bg-card rounded-lg border border-border p-4">
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Con alertas</p>
            <p className="text-2xl font-bold text-warning mt-1">{summary.alertas}</p>
          </div>
        </div>

        {/* Alerts */}
        <div className="bg-card rounded-lg border border-border p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-foreground">
              Alertas ({alertas.length})
            </h3>
            <button className="text-xs text-primary hover:underline">ver todas</button>
          </div>
          <div className="space-y-2">
            {alertas.map((a, i) => (
              <div key={i} className="flex items-start gap-2 text-sm p-2 rounded-md bg-secondary/50 hover:bg-secondary/80 transition-colors cursor-pointer">
                <AlertTriangle className="h-4 w-4 text-warning shrink-0 mt-0.5" />
                <span className="text-foreground">
                  <span className="text-primary font-medium">Cta {a.cuenta}:</span>{" "}
                  {a.msg}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Breakdown */}
        <div className="bg-card rounded-lg border border-border p-4">
          <h3 className="text-sm font-semibold text-foreground mb-3">
            Desglose por tipo
          </h3>
          <div className="space-y-2">
            {desglose.map((d) => (
              <div key={d.tipo} className="flex items-center justify-between text-sm py-1.5 border-b border-border last:border-0">
                <span className="text-foreground">{d.tipo}</span>
                <div className="flex items-center gap-6 text-muted-foreground">
                  <span>{d.facturas.toLocaleString()} facturas</span>
                  <span className="text-foreground font-medium w-20 text-right">{d.importe}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSimuladorOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-md text-sm border border-border text-foreground hover:bg-secondary transition-colors"
          >
            <Calculator className="h-4 w-4" />
            Simulador
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-md text-sm border border-border text-foreground hover:bg-secondary transition-colors">
            <FileDown className="h-4 w-4" />
            Exportar
          </button>
          <button
            onClick={() => setTimbradoOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-md text-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-colors ml-auto"
          >
            <CheckCircle2 className="h-4 w-4" />
            Aprobar timbrado
          </button>
        </div>
      </div>

      <AprobarTimbradoModal
        open={timbradoOpen}
        onOpenChange={setTimbradoOpen}
        facturas={summary.facturas}
        onConfirm={() => {}}
      />
      <SimuladorTarifasModal
        open={simuladorOpen}
        onOpenChange={setSimuladorOpen}
      />
    </AppLayout>
  );
};

export default Facturacion;
