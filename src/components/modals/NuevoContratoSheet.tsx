import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Search, MapPin, CheckCircle2, ChevronRight, ChevronLeft } from "lucide-react";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const steps = [
  "Buscar Toma",
  "Tipo de Contrato",
  "Personas",
  "Configuración",
  "Relación Padre-Hijo",
  "Resumen",
];

export function NuevoContratoSheet({ open, onOpenChange }: Props) {
  const [step, setStep] = useState(0);
  const [tomaSearch, setTomaSearch] = useState("");
  const [tomaFound, setTomaFound] = useState(false);
  const [servicios, setServicios] = useState<string[]>(["Agua"]);
  const [tipoPunto, setTipoPunto] = useState("Doméstico");
  const [titular, setTitular] = useState({ nombre: "", rfc: "", curp: "", telefono: "", email: "" });
  const [suministro, setSuministro] = useState("Medido");
  const [metodoPago, setMetodoPago] = useState("Ventanilla");
  const [notificacion, setNotificacion] = useState("WhatsApp");
  const [esHijo, setEsHijo] = useState(false);
  const [created, setCreated] = useState(false);

  const next = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  const handleCreate = () => {
    setCreated(true);
  };

  const handleClose = () => {
    setStep(0);
    setTomaSearch("");
    setTomaFound(false);
    setCreated(false);
    setTitular({ nombre: "", rfc: "", curp: "", telefono: "", email: "" });
    onOpenChange(false);
  };

  const toggleServicio = (s: string) => {
    setServicios((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );
  };

  return (
    <Sheet open={open} onOpenChange={handleClose}>
      <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Nuevo Contrato</SheetTitle>
          <SheetDescription>
            Paso {step + 1} de {steps.length}: {steps[step]}
          </SheetDescription>
        </SheetHeader>

        {/* Step indicator */}
        <div className="flex items-center gap-1 mt-4 mb-6">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-colors ${
                i <= step ? "bg-primary" : "bg-secondary"
              }`}
            />
          ))}
        </div>

        {created ? (
          <div className="text-center py-8 space-y-3 animate-fade-in">
            <CheckCircle2 className="h-12 w-12 text-success mx-auto" />
            <h3 className="text-lg font-bold text-foreground">¡Contrato creado!</h3>
            <p className="text-sm text-muted-foreground">
              Contrato #12353 creado. Pendiente de instalación de toma y medidor.
            </p>
            <div className="bg-secondary/50 rounded-md p-3 text-sm space-y-1 text-left">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Factura de contratación</span>
                <span className="text-foreground font-medium">$2,500.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Orden de instalación</span>
                <span className="text-primary font-medium">ORD-4531</span>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="mt-4 px-6 py-2 rounded-md text-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium"
            >
              Cerrar
            </button>
          </div>
        ) : (
          <>
            {/* Step 0: Buscar Toma */}
            {step === 0 && (
              <div className="space-y-4 animate-fade-in">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    value={tomaSearch}
                    onChange={(e) => {
                      setTomaSearch(e.target.value);
                      setTomaFound(e.target.value.length >= 3);
                    }}
                    placeholder="Buscar por # toma, dirección..."
                    className="w-full bg-secondary border border-border rounded-md pl-10 pr-3 py-2.5 text-sm text-foreground outline-none focus:ring-1 focus:ring-ring"
                  />
                </div>
                {tomaFound && (
                  <div className="bg-secondary/50 rounded-lg border border-border p-4 space-y-2 animate-fade-in">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-primary mt-0.5" />
                      <div>
                        <p className="text-foreground font-medium">Toma T-4892</p>
                        <p className="text-sm text-muted-foreground">Av. Constituyentes #156, Col. Centro</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs mt-2">
                      <div>
                        <p className="text-muted-foreground">Sector</p>
                        <p className="text-foreground">Centro-B</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Status</p>
                        <p className="text-success">Disponible</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Medidor</p>
                        <p className="text-muted-foreground">Sin instalar</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 1: Tipo de Contrato */}
            {step === 1 && (
              <div className="space-y-4 animate-fade-in">
                <div>
                  <label className="text-xs font-medium text-muted-foreground block mb-2">Tipo de servicio (multi-select)</label>
                  <div className="flex gap-2">
                    {["Agua", "Saneamiento", "Alcantarillado"].map((s) => (
                      <button
                        key={s}
                        onClick={() => toggleServicio(s)}
                        className={`px-3 py-1.5 rounded-md text-sm font-medium border transition-colors ${
                          servicios.includes(s)
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground block mb-1">Tipo de punto de servicio</label>
                  <select
                    value={tipoPunto}
                    onChange={(e) => setTipoPunto(e.target.value)}
                    className="w-full bg-secondary border border-border rounded-md px-3 py-2 text-sm text-foreground outline-none focus:ring-1 focus:ring-ring"
                  >
                    {["Doméstico", "Comercial", "Industrial", "Gobierno"].map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* Step 2: Personas */}
            {step === 2 && (
              <div className="space-y-3 animate-fade-in">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Titular (Propietario)</p>
                {(["nombre", "rfc", "curp", "telefono", "email"] as const).map((field) => (
                  <div key={field}>
                    <label className="text-xs font-medium text-muted-foreground block mb-1 capitalize">{field === "telefono" ? "Teléfono" : field.toUpperCase()}</label>
                    <input
                      type="text"
                      value={titular[field]}
                      onChange={(e) => setTitular((p) => ({ ...p, [field]: e.target.value }))}
                      className="w-full bg-secondary border border-border rounded-md px-3 py-2 text-sm text-foreground outline-none focus:ring-1 focus:ring-ring"
                    />
                  </div>
                ))}
                <div>
                  <label className="text-xs font-medium text-muted-foreground block mb-1">¿Quién paga?</label>
                  <div className="flex gap-2">
                    {["Propietario", "Inquilino", "Otro"].map((o) => (
                      <button
                        key={o}
                        className="px-3 py-1.5 rounded-md text-sm border border-border text-muted-foreground hover:text-foreground transition-colors first:border-primary first:bg-primary/10 first:text-primary"
                      >
                        {o}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Configuración */}
            {step === 3 && (
              <div className="space-y-3 animate-fade-in">
                <div>
                  <label className="text-xs font-medium text-muted-foreground block mb-1">Tipo de suministro</label>
                  <div className="flex gap-2">
                    {["Medido", "Cuota fija"].map((s) => (
                      <button
                        key={s}
                        onClick={() => setSuministro(s)}
                        className={`px-3 py-1.5 rounded-md text-sm font-medium border transition-colors ${
                          suministro === s ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground block mb-1">Método de pago preferido</label>
                  <select value={metodoPago} onChange={(e) => setMetodoPago(e.target.value)} className="w-full bg-secondary border border-border rounded-md px-3 py-2 text-sm text-foreground outline-none focus:ring-1 focus:ring-ring">
                    {["Ventanilla", "Domiciliación", "Digital"].map((m) => <option key={m}>{m}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground block mb-1">Canal de notificación</label>
                  <select value={notificacion} onChange={(e) => setNotificacion(e.target.value)} className="w-full bg-secondary border border-border rounded-md px-3 py-2 text-sm text-foreground outline-none focus:ring-1 focus:ring-ring">
                    {["WhatsApp", "Email", "SMS"].map((n) => <option key={n}>{n}</option>)}
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="h-4 w-4 rounded border-border accent-primary" />
                  <span className="text-sm text-foreground">Descuento jubilado / pensionado</span>
                </div>
              </div>
            )}

            {/* Step 4: Relación Padre-Hijo */}
            {step === 4 && (
              <div className="space-y-4 animate-fade-in">
                <div className="flex items-center gap-3">
                  <label className="text-sm text-foreground">¿Este contrato es hijo de un macromedidor?</label>
                  <button
                    onClick={() => setEsHijo(!esHijo)}
                    className={`relative w-10 h-5 rounded-full transition-colors ${esHijo ? "bg-primary" : "bg-secondary"}`}
                  >
                    <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-foreground transition-transform ${esHijo ? "left-5.5 translate-x-0" : "left-0.5"}`} />
                  </button>
                </div>
                {esHijo && (
                  <div className="space-y-3 animate-fade-in">
                    <input
                      type="text"
                      placeholder="Buscar contrato padre..."
                      className="w-full bg-secondary border border-border rounded-md px-3 py-2 text-sm text-foreground outline-none focus:ring-1 focus:ring-ring"
                    />
                    <select className="w-full bg-secondary border border-border rounded-md px-3 py-2 text-sm text-foreground outline-none focus:ring-1 focus:ring-ring">
                      <option>Con reparto</option>
                      <option>Sin reparto</option>
                      <option>Proporcional al consumo</option>
                    </select>
                  </div>
                )}
              </div>
            )}

            {/* Step 5: Resumen */}
            {step === 5 && (
              <div className="space-y-3 animate-fade-in">
                <div className="bg-secondary/50 rounded-lg border border-border p-4 space-y-2 text-sm">
                  {[
                    ["Toma", "T-4892 — Av. Constituyentes #156"],
                    ["Servicios", servicios.join(", ")],
                    ["Tipo punto", tipoPunto],
                    ["Titular", titular.nombre || "—"],
                    ["Suministro", suministro],
                    ["Método pago", metodoPago],
                    ["Notificación", notificacion],
                  ].map(([label, value]) => (
                    <div key={label} className="flex justify-between">
                      <span className="text-muted-foreground">{label}</span>
                      <span className="text-foreground font-medium">{value}</span>
                    </div>
                  ))}
                </div>
                <div className="bg-info/10 border border-info/20 rounded-md p-3 text-sm text-info">
                  Se generará factura de contratación por <strong>$2,500.00</strong>
                </div>
                <div className="bg-info/10 border border-info/20 rounded-md p-3 text-sm text-info">
                  Se creará orden de instalación de toma
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
              <button
                onClick={prev}
                disabled={step === 0}
                className="flex items-center gap-1 px-3 py-1.5 rounded-md text-sm text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
                Anterior
              </button>
              {step < steps.length - 1 ? (
                <button
                  onClick={next}
                  className="flex items-center gap-1 px-4 py-2 rounded-md text-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium"
                >
                  Siguiente
                  <ChevronRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  onClick={handleCreate}
                  className="px-4 py-2 rounded-md text-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium"
                >
                  Confirmar Alta
                </button>
              )}
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
