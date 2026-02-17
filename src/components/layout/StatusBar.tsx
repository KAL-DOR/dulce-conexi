export function StatusBar() {
  return (
    <div className="h-8 border-t border-border bg-card px-6 flex items-center justify-between text-xs text-muted-foreground shrink-0">
      <div className="flex items-center gap-4">
        <span>tenant: <span className="text-foreground font-medium">CEA Querétaro</span></span>
        <span>·</span>
        <span>zona: <span className="text-foreground font-medium">Centro</span></span>
        <span>·</span>
        <span>usuario: <span className="text-foreground font-medium">J. López</span></span>
      </div>
      <div className="flex items-center gap-2">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-success" />
        <span>Sistema operativo</span>
      </div>
    </div>
  );
}
