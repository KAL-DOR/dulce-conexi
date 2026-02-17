import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Lock } from "lucide-react";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export function CerrarCicloModal({ open, onOpenChange, onConfirm }: Props) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
              <Lock className="h-4 w-4 text-primary" />
            </div>
            <AlertDialogTitle>Cerrar ciclo de lectura</AlertDialogTitle>
          </div>
          <AlertDialogDescription className="pt-2">
            Al cerrar el ciclo se dispararán las validaciones de todas las lecturas recibidas. Las rutas pendientes serán estimadas automáticamente. ¿Deseas continuar?
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="bg-secondary/50 rounded-md p-3 text-sm space-y-1">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Rutas completadas</span>
            <span className="text-foreground font-medium">1 / 5</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Lecturas recibidas</span>
            <span className="text-foreground font-medium">1,229</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Pendientes (serán estimadas)</span>
            <span className="text-warning font-medium">751</span>
          </div>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>
            Cerrar ciclo
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
