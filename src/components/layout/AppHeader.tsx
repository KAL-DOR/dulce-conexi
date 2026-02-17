import { Search, Bell, User } from "lucide-react";
import { useState } from "react";

export function AppHeader() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="h-14 border-b border-border bg-card flex items-center justify-between px-6 shrink-0">
      {/* Search */}
      <div className="flex items-center gap-2 bg-secondary rounded-md px-3 py-1.5 w-96">
        <Search className="h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Buscar cuenta, nombre, RFC..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none flex-1"
        />
        <kbd className="text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded font-mono">
          ⌘K
        </kbd>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        <button className="relative text-muted-foreground hover:text-foreground transition-colors">
          <Bell className="h-4.5 w-4.5" />
          <span className="absolute -top-1 -right-1 h-2 w-2 bg-destructive rounded-full" />
        </button>
        <div className="flex items-center gap-2 text-sm">
          <div className="h-7 w-7 rounded-full bg-primary/20 flex items-center justify-center">
            <User className="h-3.5 w-3.5 text-primary" />
          </div>
          <span className="text-foreground font-medium">J. López</span>
        </div>
      </div>
    </header>
  );
}
