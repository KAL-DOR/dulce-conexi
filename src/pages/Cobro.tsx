import { AppLayout } from "@/components/layout/AppLayout";
import { useState } from "react";
import { Search, CreditCard, Banknote, ArrowRightLeft, CheckCircle2, Printer } from "lucide-react";

interface Adeudo {
  id: string;
  periodo: string;
  status: string;
  importe: number;
  cfdi: boolean;
  selected: boolean;
}

const initialAdeudos: Adeudo[] = [
  { id: "1", periodo: "Ene 2026", status: "Vencida", importe: 542.0, cfdi: true, selected: true },
  { id: "2", periodo: "Feb 2026", status: "Vigente", importe: 498.0, cfdi: true, selected: true },
  { id: "3", periodo: "Convenio", status: "Parc 3/6", importe: 450.0, cfdi: false, selected: false },
];

const statusColors: Record<string, string> = {
  Vencida: "text-destructive",
  Vigente: "text-info",
  "Parc 3/6": "text-warning",
};

const Cobro = () => {
  const [searchQuery, setSearchQuery] = useState("12345");
  const [accountFound, setAccountFound] = useState(true);
  const [adeudos, setAdeudos] = useState(initialAdeudos);
  const [paymentMethod, setPaymentMethod] = useState<"efectivo" | "tarjeta" | "transferencia">("efectivo");
  const [montoRecibido, setMontoRecibido] = useState("1000.00");
  const [paid, setPaid] = useState(false);

  const selected = adeudos.filter((a) => a.selected);
  const subtotal = selected.reduce((sum, a) => sum + a.importe, 0);
  const anticipado = selected.length >= 2 ? subtotal * 0.05 : 0;
  const total = subtotal - anticipado;
  const cambio = Math.max(0, parseFloat(montoRecibido || "0") - total);

  const toggleAdeudo = (id: string) => {
    setAdeudos((prev) =>
      prev.map((a) => (a.id === id ? { ...a, selected: !a.selected } : a))
    );
  };

  return (
    <AppLayout>
      <div className="animate-fade-in max-w-3xl mx-auto space-y-5">
        {/* Header */}
        <div>
          <h1 className="text-xl font-bold text-foreground">Cobro en Ventanilla</h1>
          <p className="text-sm text-muted-foreground">
            Caja 03 — Cajero: Ana M.
          </p>
        </div>

        {/* Search */}
        <div className="flex items-center gap-2 bg-card border border-border rounded-md px-4 py-2.5">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar por # cuenta, nombre o RFC..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setAccountFound(e.target.value === "12345");
              setPaid(false);
            }}
            className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none flex-1"
          />
        </div>

        {accountFound && !paid && (
          <>
            {/* Account card */}
            <div className="bg-card rounded-lg border border-border p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                    Cuenta {searchQuery}
                  </p>
                  <p className="text-foreground font-semibold mt-1">
                    María García López
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Hidalgo #42, Col. Centro
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="bg-success/20 text-success px-2 py-0.5 rounded-full font-medium">Activo</span>
                  <span className="text-muted-foreground">Medido</span>
                  <span className="text-muted-foreground">Doméstico</span>
                </div>
              </div>
            </div>

            {/* Adeudos */}
            <div className="bg-card rounded-lg border border-border overflow-hidden">
              <div className="px-4 py-2.5 border-b border-border">
                <h3 className="text-sm font-semibold text-foreground">Adeudos</h3>
              </div>
              <table className="w-full text-sm">
                <tbody>
                  {adeudos.map((a) => (
                    <tr
                      key={a.id}
                      className="border-b border-border last:border-0 hover:bg-secondary/20 transition-colors"
                    >
                      <td className="px-4 py-3 w-10">
                        <input
                          type="checkbox"
                          checked={a.selected}
                          onChange={() => toggleAdeudo(a.id)}
                          className="h-4 w-4 rounded border-border accent-primary"
                        />
                      </td>
                      <td className="px-4 py-3 text-foreground font-medium">
                        {a.periodo}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-medium ${statusColors[a.status] || "text-muted-foreground"}`}>
                          {a.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right text-foreground font-medium">
                        ${a.importe.toFixed(2)}
                      </td>
                      <td className="px-4 py-3 text-center text-xs text-muted-foreground">
                        {a.cfdi && <span className="text-success">CFDI ✓</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Summary & Payment */}
            <div className="bg-card rounded-lg border border-border p-4 space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal seleccionado</span>
                  <span className="text-foreground font-medium">${subtotal.toFixed(2)}</span>
                </div>
                {anticipado > 0 && (
                  <div className="flex justify-between text-success">
                    <span>Pago anticipado 6m (5%)</span>
                    <span>-${anticipado.toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t border-border pt-2 flex justify-between">
                  <span className="text-foreground font-semibold">Total a cobrar</span>
                  <span className="text-foreground font-bold text-lg">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Payment method */}
              <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Método de pago
                </p>
                <div className="flex gap-2">
                  {[
                    { id: "efectivo" as const, icon: Banknote, label: "Efectivo" },
                    { id: "tarjeta" as const, icon: CreditCard, label: "Tarjeta" },
                    { id: "transferencia" as const, icon: ArrowRightLeft, label: "Transferencia" },
                  ].map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium border transition-colors ${
                        paymentMethod === method.id
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <method.icon className="h-4 w-4" />
                      {method.label}
                    </button>
                  ))}
                </div>
              </div>

              {paymentMethod === "efectivo" && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-muted-foreground block mb-1">
                      Monto recibido
                    </label>
                    <input
                      type="text"
                      value={montoRecibido}
                      onChange={(e) => setMontoRecibido(e.target.value)}
                      className="w-full bg-secondary border border-border rounded-md px-3 py-2 text-sm text-foreground outline-none focus:ring-1 focus:ring-ring"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground block mb-1">
                      Cambio
                    </label>
                    <div className="w-full bg-secondary/50 border border-border rounded-md px-3 py-2 text-sm text-foreground font-semibold">
                      ${cambio.toFixed(2)}
                    </div>
                  </div>
                </div>
              )}

              <button
                onClick={() => setPaid(true)}
                disabled={selected.length === 0}
                className="w-full bg-primary text-primary-foreground py-2.5 rounded-md text-sm font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cobrar y generar recibo
              </button>
            </div>
          </>
        )}

        {paid && (
          <div className="bg-card rounded-lg border border-border p-8 text-center animate-fade-in">
            <CheckCircle2 className="h-12 w-12 text-success mx-auto mb-3" />
            <h2 className="text-lg font-bold text-foreground">¡Pago registrado!</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Se cobró ${total.toFixed(2)} a la cuenta {searchQuery}
            </p>
            <div className="flex items-center justify-center gap-3 mt-4">
              <button className="flex items-center gap-2 px-4 py-2 rounded-md text-sm bg-secondary text-foreground border border-border hover:bg-secondary/80 transition-colors">
                <Printer className="h-4 w-4" />
                Imprimir recibo
              </button>
              <button
                onClick={() => {
                  setPaid(false);
                  setSearchQuery("");
                  setAccountFound(false);
                  setAdeudos(initialAdeudos);
                }}
                className="px-4 py-2 rounded-md text-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Nuevo cobro
              </button>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Cobro;
