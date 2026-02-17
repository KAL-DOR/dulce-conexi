import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Upload, FileUp, CheckCircle2 } from "lucide-react";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RecibirArchivoModal({ open, onOpenChange }: Props) {
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [done, setDone] = useState(false);

  const handleFile = () => {
    setFile("lecturas_ruta14_feb2026.xml");
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setDone(true);
    }, 1500);
  };

  const handleClose = () => {
    setFile(null);
    setProcessing(false);
    setDone(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
              <Upload className="h-4 w-4 text-primary" />
            </div>
            <DialogTitle>Recibir archivo de lecturas</DialogTitle>
          </div>
          <DialogDescription>
            Sube el archivo XML o CSV exportado desde la app de campo.
          </DialogDescription>
        </DialogHeader>

        {!done ? (
          <div
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => { e.preventDefault(); setDragging(false); handleFile(); }}
            onClick={handleFile}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              dragging ? "border-primary bg-primary/5" : "border-border hover:border-muted-foreground"
            }`}
          >
            {processing ? (
              <div className="space-y-2">
                <div className="h-8 w-8 mx-auto rounded-full border-2 border-primary border-t-transparent animate-spin" />
                <p className="text-sm text-foreground font-medium">Procesando {file}...</p>
                <p className="text-xs text-muted-foreground">Validando formato y lecturas</p>
              </div>
            ) : file ? (
              <div className="space-y-2">
                <FileUp className="h-8 w-8 mx-auto text-primary" />
                <p className="text-sm text-foreground font-medium">{file}</p>
              </div>
            ) : (
              <div className="space-y-2">
                <FileUp className="h-8 w-8 mx-auto text-muted-foreground" />
                <p className="text-sm text-foreground font-medium">
                  Arrastra tu archivo aquí o haz clic
                </p>
                <p className="text-xs text-muted-foreground">
                  Formatos: .xml, .csv — Máx 10 MB
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-4 space-y-2 animate-fade-in">
            <CheckCircle2 className="h-10 w-10 text-success mx-auto" />
            <p className="text-foreground font-medium">Archivo procesado</p>
            <div className="bg-secondary/50 rounded-md p-3 text-sm space-y-1">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Lecturas importadas</span>
                <span className="text-foreground font-medium">342</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Incidencias detectadas</span>
                <span className="text-warning font-medium">12</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Lecturas sospechosas</span>
                <span className="text-warning font-medium">8</span>
              </div>
            </div>
          </div>
        )}

        <DialogFooter>
          <button
            onClick={handleClose}
            className="px-4 py-2 rounded-md text-sm border border-border text-foreground hover:bg-secondary transition-colors"
          >
            {done ? "Cerrar" : "Cancelar"}
          </button>
          {done && (
            <button
              onClick={handleClose}
              className="px-4 py-2 rounded-md text-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium"
            >
              Ir a validación
            </button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
