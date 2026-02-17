import { AppLayout } from "@/components/layout/AppLayout";
import { Link } from "react-router-dom";
import { Plus, Search, Filter, ChevronRight } from "lucide-react";
import { useState } from "react";

const contracts = [
  { id: "12345", titular: "María García López", toma: "Hidalgo #42", tipo: "Doméstico", status: "Activo", saldo: "$1,040.00", ultimaLectura: "1,256 m³" },
  { id: "12346", titular: "Carlos Hernández Ruiz", toma: "Juárez #118", tipo: "Comercial", status: "Activo", saldo: "$0.00", ultimaLectura: "4,892 m³" },
  { id: "12347", titular: "Ana Martínez Soto", toma: "Allende #7", tipo: "Doméstico", status: "Pendiente", saldo: "$542.00", ultimaLectura: "890 m³" },
  { id: "12348", titular: "Roberto López Díaz", toma: "Morelos #56", tipo: "Industrial", status: "Activo", saldo: "$15,200.00", ultimaLectura: "28,340 m³" },
  { id: "12349", titular: "Patricia Vega Luna", toma: "5 de Mayo #23", tipo: "Doméstico", status: "Baja", saldo: "$0.00", ultimaLectura: "2,100 m³" },
  { id: "12350", titular: "José Ramírez Torres", toma: "Reforma #89", tipo: "Doméstico", status: "Activo", saldo: "$498.00", ultimaLectura: "1,102 m³" },
  { id: "12351", titular: "Gobierno del Estado", toma: "Corregidora #1", tipo: "Gobierno", status: "Activo", saldo: "$8,450.00", ultimaLectura: "12,500 m³" },
  { id: "12352", titular: "Laura Sánchez Mora", toma: "Zaragoza #34", tipo: "Doméstico", status: "Activo", saldo: "$320.00", ultimaLectura: "945 m³" },
];

const statusColors: Record<string, string> = {
  Activo: "bg-success/20 text-success",
  Pendiente: "bg-warning/20 text-warning",
  Baja: "bg-muted text-muted-foreground",
};

const Contratos = () => {
  const [filterStatus, setFilterStatus] = useState("Todos");
  const [search, setSearch] = useState("");

  const filtered = contracts.filter((c) => {
    const matchStatus = filterStatus === "Todos" || c.status === filterStatus;
    const matchSearch =
      !search ||
      c.titular.toLowerCase().includes(search.toLowerCase()) ||
      c.id.includes(search);
    return matchStatus && matchSearch;
  });

  return (
    <AppLayout>
      <div className="animate-fade-in space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-foreground">Contratos</h1>
            <p className="text-sm text-muted-foreground">
              {filtered.length} contratos
            </p>
          </div>
          <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">
            <Plus className="h-4 w-4" />
            Nuevo Contrato
          </button>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-card border border-border rounded-md px-3 py-1.5 flex-1 max-w-sm">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar por cuenta o titular..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none flex-1"
            />
          </div>
          <div className="flex items-center gap-1 bg-card border border-border rounded-md p-0.5">
            {["Todos", "Activo", "Pendiente", "Baja"].map((s) => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                  filterStatus === s
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <Filter className="h-3.5 w-3.5" />
            Más filtros
          </button>
        </div>

        {/* Table */}
        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/30">
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  # Cuenta
                </th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Titular
                </th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Toma
                </th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Tipo
                </th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Status
                </th>
                <th className="text-right px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Saldo
                </th>
                <th className="text-right px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Última Lectura
                </th>
                <th className="px-4 py-2.5 w-8" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr
                  key={c.id}
                  className="border-b border-border last:border-0 hover:bg-secondary/20 transition-colors"
                >
                  <td className="px-4 py-3">
                    <Link
                      to={`/contratos/${c.id}`}
                      className="text-primary font-medium hover:underline"
                    >
                      {c.id}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-foreground">{c.titular}</td>
                  <td className="px-4 py-3 text-muted-foreground">{c.toma}</td>
                  <td className="px-4 py-3 text-muted-foreground">{c.tipo}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        statusColors[c.status] || ""
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right text-foreground font-medium">
                    {c.saldo}
                  </td>
                  <td className="px-4 py-3 text-right text-muted-foreground">
                    {c.ultimaLectura}
                  </td>
                  <td className="px-4 py-3">
                    <Link to={`/contratos/${c.id}`}>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppLayout>
  );
};

export default Contratos;
