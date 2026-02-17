import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Search, FileText, User, Droplets, ClipboardList, CreditCard } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface SearchResult {
  type: "contrato" | "persona" | "toma" | "orden" | "factura";
  icon: typeof FileText;
  label: string;
  detail: string;
  route: string;
}

const allResults: SearchResult[] = [
  { type: "contrato", icon: FileText, label: "Contrato #12345", detail: "María García López — Hidalgo #42", route: "/contratos/12345" },
  { type: "contrato", icon: FileText, label: "Contrato #12346", detail: "Carlos Hernández Ruiz — Juárez #118", route: "/contratos/12346" },
  { type: "contrato", icon: FileText, label: "Contrato #12348", detail: "Roberto López Díaz — Morelos #56", route: "/contratos/12348" },
  { type: "persona", icon: User, label: "María García López", detail: "RFC: GALM850312 — Cta #12345", route: "/contratos/12345" },
  { type: "persona", icon: User, label: "Carlos Hernández Ruiz", detail: "RFC: HERC900115 — Cta #12346", route: "/contratos/12346" },
  { type: "toma", icon: Droplets, label: "Toma Hidalgo #42", detail: "Medidor AB-78901 — Centro-A", route: "/contratos/12345" },
  { type: "toma", icon: Droplets, label: "Toma Juárez #118", detail: "Medidor CD-45678 — Centro-B", route: "/contratos/12346" },
  { type: "orden", icon: ClipboardList, label: "ORD-4530", detail: "Corte — Juárez #118 — En progreso", route: "/ordenes" },
  { type: "orden", icon: ClipboardList, label: "ORD-4529", detail: "Reconexión — Allende #7 — Pendiente", route: "/ordenes" },
  { type: "factura", icon: CreditCard, label: "Factura Feb 2026 — Cta #12345", detail: "$498.00 — Vigente — CFDI ✓", route: "/contratos/12345" },
];

const typeLabels: Record<string, string> = {
  contrato: "Contratos",
  persona: "Personas",
  toma: "Tomas",
  orden: "Órdenes",
  factura: "Facturas",
};

export function GlobalSearchModal({ open, onOpenChange }: Props) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();

  const filtered = query.length > 0
    ? allResults.filter(
        (r) =>
          r.label.toLowerCase().includes(query.toLowerCase()) ||
          r.detail.toLowerCase().includes(query.toLowerCase())
      )
    : allResults.slice(0, 6);

  // Group by type
  const grouped = filtered.reduce<Record<string, SearchResult[]>>((acc, r) => {
    if (!acc[r.type]) acc[r.type] = [];
    acc[r.type].push(r);
    return acc;
  }, {});

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleSelect = (result: SearchResult) => {
    navigate(result.route);
    onOpenChange(false);
    setQuery("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && filtered[selectedIndex]) {
      handleSelect(filtered[selectedIndex]);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { onOpenChange(v); if (!v) setQuery(""); }}>
      <DialogContent className="max-w-lg p-0 gap-0 overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
          <Search className="h-4 w-4 text-muted-foreground shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Buscar cuenta, nombre, RFC, dirección, toma..."
            className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none flex-1"
            autoFocus
          />
          <kbd className="text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded font-mono">ESC</kbd>
        </div>

        <div className="max-h-80 overflow-y-auto">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-sm text-muted-foreground">
              Sin resultados para "{query}"
            </div>
          ) : (
            <>
              {Object.entries(grouped).map(([type, results]) => {
                return (
                  <div key={type}>
                    <div className="px-4 py-1.5 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider bg-secondary/30">
                      {typeLabels[type] || type}
                    </div>
                    {results.map((result) => {
                      const globalIdx = filtered.indexOf(result);
                      return (
                        <button
                          key={result.label}
                          onClick={() => handleSelect(result)}
                          className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                            globalIdx === selectedIndex ? "bg-secondary" : "hover:bg-secondary/50"
                          }`}
                        >
                          <result.icon className="h-4 w-4 text-muted-foreground shrink-0" />
                          <div className="min-w-0 flex-1">
                            <p className="text-sm text-foreground font-medium truncate">{result.label}</p>
                            <p className="text-xs text-muted-foreground truncate">{result.detail}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                );
              })}
            </>
          )}
        </div>

        <div className="px-4 py-2 border-t border-border flex items-center gap-3 text-[10px] text-muted-foreground">
          <span>↑↓ navegar</span>
          <span>↵ seleccionar</span>
          <span>esc cerrar</span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
