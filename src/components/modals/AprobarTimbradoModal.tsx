import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { AlertTriangle, Lock } from "lucide-react";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  facturas: number;
  onConfirm: () => void;
}

export function AprobarTimbradoModal({ open, onOpenChange, facturas, onConfirm }: Props) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleConfirm = () => {
    if (password.length < 4) {
      setError(true);
      return;
    }
    setPassword("");
    setError(false);
    onConfirm();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-warning/20 flex items-center justify-center">
              <AlertTriangle className="h-4 w-4 text-warning" />
            </div>
            <DialogTitle>Aprobar timbrado</DialogTitle>
          </div>
          <DialogDescription className="pt-2">
            Se enviarán <strong className="text-foreground">{facturas.toLocaleString()} facturas</strong> al PAC para timbrado CFDI. Esta acción no tiene retorno.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground block">
            Contraseña de supervisor
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(false); }}
              placeholder="Ingresa tu contraseña"
              className="w-full bg-secondary border border-border rounded-md pl-10 pr-3 py-2 text-sm text-foreground outline-none focus:ring-1 focus:ring-ring"
            />
          </div>
          {error && (
            <p className="text-xs text-destructive">Contraseña requerida</p>
          )}
        </div>

        <DialogFooter>
          <button
            onClick={() => onOpenChange(false)}
            className="px-4 py-2 rounded-md text-sm border border-border text-foreground hover:bg-secondary transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 rounded-md text-sm bg-warning text-warning-foreground hover:bg-warning/90 transition-colors font-medium"
          >
            Confirmar timbrado
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
