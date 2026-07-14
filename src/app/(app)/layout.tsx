import { Sidebar } from "@/components/layout/Sidebar";
import { SidebarProvider } from "@/components/layout/SidebarProvider";
import { TourProvider } from "@/components/tour/TourProvider";
import { GuidedTour } from "@/components/tour/GuidedTour";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <TourProvider>
        <div className="flex min-h-0 flex-1">
          <Sidebar />
          {children}
        </div>
        <GuidedTour />
      </TourProvider>
    </SidebarProvider>
  );
}
