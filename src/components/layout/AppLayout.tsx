import { AppSidebar } from "./AppSidebar";
import { AppHeader } from "./AppHeader";
import { StatusBar } from "./StatusBar";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden dark bg-background text-foreground">
      <AppSidebar />
      <div className="flex flex-col flex-1 min-w-0">
        <AppHeader />
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
        <StatusBar />
      </div>
    </div>
  );
}
