import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Calculator, Search } from "lucide-react";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const bloques = [
  { from: 0, to: 10, precio: 5.5 },
  { from: 10, to: 20, precio: 8.75 },
  { from: 20, to: 40, precio: 15.3 },
  { from: 40, to: Infinity, precio: 25.0 },
];

function calcular(consumo: number) {
  let total = 0;
  const desglose: { label: string; amount: number }[] = [];

  for (const b of bloques) {
    const from = b.from;
    const to = Math.min(b.to, consumo);
    if (to <= from) break;
    const qty = to - from;
    const amount = qty * b.precio;
    total += amount;
    desglose.push({
      label: `${from}–${b.to === Infinity ? consumo : b.to} m³ × $${b.precio.toFixed(2)}`,
      amount,
    });
  }

  const agua = total;
  const alcantarillado = total * 0.25;
  const saneamiento = 15.0;
  const descJubilado = 0;
  const grandTotal = agua + alcantarillado + saneamiento - descJubilado;

  return { desglose, agua, alcantarillado, saneamiento, descJubilado, grandTotal };
}

export function SimuladorTarifasModal({ open, onOpenChange }: Props) {
  const [contrato, setContrato] = useState("12345");
  const [mesAnio, setMesAnio] = useState("Feb 2026");
  const [consumo, setConsumo] = useState("42");
  const [resultado, setResultado] = useState<ReturnType<typeof calcular> | null>(null);

  const handleCalcular = () => {
    const c = parseInt(consumo) || 0;
    setResultado(calcular(c));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
              <Calculator className="h-4 w-4 text-primary" />
            </div>
            <DialogTitle>Simulador de Facturación</DialogTitle>
          </div>
          <DialogDescription>
            Calcula el monto a facturar para un contrato y consumo dado.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="text-xs font-medium text-muted-foreground block mb-1">Contrato</label>
            <div className="relative">
              <input
                type="text"
                value={contrato}
                onChange={(e) => setContrato(e.target.value)}
                className="w-full bg-secondary border border-border rounded-md px-3 py-2 text-sm text-foreground outline-none focus:ring-1 focus:ring-ring"
              />
              <Search className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground block mb-1">Mes/Año</label>
            <input
              type="text"
              value={mesAnio}
              onChange={(e) => setMesAnio(e.target.value)}
              className="w-full bg-secondary border border-border rounded-md px-3 py-2 text-sm text-foreground outline-none focus:ring-1 focus:ring-ring"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground block mb-1">Consumo (m³)</label>
            <input
              type="number"
              value={consumo}
              onChange={(e) => setConsumo(e.target.value)}
              className="w-full bg-secondary border border-border rounded-md px-3 py-2 text-sm text-foreground outline-none focus:ring-1 focus:ring-ring"
            />
          </div>
        </div>

        <button
          onClick={handleCalcular}
          className="w-full bg-primary text-primary-foreground py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          Calcular
        </button>

        {resultado && (
          <div className="bg-secondary/50 rounded-lg border border-border p-4 space-y-2 text-sm animate-fade-in">
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-2">
              Tarifa: Doméstica vigente Q1-2026
            </p>
            {resultado.desglose.map((d, i) => (
              <div key={i} className="flex justify-between text-muted-foreground">
                <span>{d.label}</span>
                <span className="text-foreground">${d.amount.toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t border-border pt-2 mt-2 space-y-1.5">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Agua</span>
                <span className="text-foreground font-medium">${resultado.agua.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Alcantarillado (25%)</span>
                <span className="text-foreground">${resultado.alcantarillado.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Saneamiento</span>
                <span className="text-foreground">${resultado.saneamiento.toFixed(2)}</span>
              </div>
              {resultado.descJubilado > 0 && (
                <div className="flex justify-between text-success">
                  <span>Desc. jubilado (-15%)</span>
                  <span>-${resultado.descJubilado.toFixed(2)}</span>
                </div>
              )}
              <div className="border-t border-border pt-2 flex justify-between">
                <span className="text-foreground font-semibold">TOTAL</span>
                <span className="text-foreground font-bold text-lg">${resultado.grandTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
