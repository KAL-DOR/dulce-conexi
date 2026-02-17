import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { ClipboardList } from "lucide-react";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const tiposOrden = ["Corte", "Reconexión", "Instalación medidor", "Instalación toma", "Inspección", "Reparación"];
const prioridades = ["Baja", "Media", "Alta"];
const tecnicos = ["R. Martínez", "L. Torres", "M. Solis", "F. Luna"];

export function NuevaOrdenModal({ open, onOpenChange }: Props) {
  const [tipo, setTipo] = useState("");
  const [prioridad, setPrioridad] = useState("Media");
  const [tecnico, setTecnico] = useState("");
  const [toma, setToma] = useState("");
  const [fecha, setFecha] = useState("");
  const [notas, setNotas] = useState("");

  const handleSubmit = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
              <ClipboardList className="h-4 w-4 text-primary" />
            </div>
            <DialogTitle>Nueva Orden de Trabajo</DialogTitle>
          </div>
          <DialogDescription>
            Crear una nueva orden de trabajo asignada a un técnico.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          <div>
            <label className="text-xs font-medium text-muted-foreground block mb-1">Tipo de orden</label>
            <select
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              className="w-full bg-secondary border border-border rounded-md px-3 py-2 text-sm text-foreground outline-none focus:ring-1 focus:ring-ring"
            >
              <option value="">Seleccionar...</option>
              {tiposOrden.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          <div>
            <label className="text-xs font-medium text-muted-foreground block mb-1">Toma / Dirección</label>
            <input
              type="text"
              value={toma}
              onChange={(e) => setToma(e.target.value)}
              placeholder="Buscar toma..."
              className="w-full bg-secondary border border-border rounded-md px-3 py-2 text-sm text-foreground outline-none focus:ring-1 focus:ring-ring"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-muted-foreground block mb-1">Prioridad</label>
              <select
                value={prioridad}
                onChange={(e) => setPrioridad(e.target.value)}
                className="w-full bg-secondary border border-border rounded-md px-3 py-2 text-sm text-foreground outline-none focus:ring-1 focus:ring-ring"
              >
                {prioridades.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground block mb-1">Asignar a</label>
              <select
                value={tecnico}
                onChange={(e) => setTecnico(e.target.value)}
                className="w-full bg-secondary border border-border rounded-md px-3 py-2 text-sm text-foreground outline-none focus:ring-1 focus:ring-ring"
              >
                <option value="">Seleccionar...</option>
                {tecnicos.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-muted-foreground block mb-1">Fecha programada</label>
            <input
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              className="w-full bg-secondary border border-border rounded-md px-3 py-2 text-sm text-foreground outline-none focus:ring-1 focus:ring-ring"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-muted-foreground block mb-1">Notas</label>
            <textarea
              value={notas}
              onChange={(e) => setNotas(e.target.value)}
              rows={2}
              placeholder="Observaciones adicionales..."
              className="w-full bg-secondary border border-border rounded-md px-3 py-2 text-sm text-foreground outline-none focus:ring-1 focus:ring-ring resize-none"
            />
          </div>
        </div>

        <DialogFooter>
          <button
            onClick={() => onOpenChange(false)}
            className="px-4 py-2 rounded-md text-sm border border-border text-foreground hover:bg-secondary transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-md text-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium"
          >
            Crear orden
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
