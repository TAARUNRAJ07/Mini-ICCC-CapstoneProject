import { Header } from '@/components/layout/header';
import { AppSidebar } from '@/components/layout/sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppProvider } from '@/context/AppContext';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppProvider>
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <AppSidebar />
          <div className="flex flex-1 flex-col">
            <Header />
            <main className="flex-1 overflow-y-auto bg-background p-4 md:p-6 lg:p-8">
              {children}
            </main>
          </div>
        </div>
      </SidebarProvider>
    </AppProvider>
  );
}
