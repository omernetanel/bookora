import type { Metadata } from "next";
import { Sidebar } from "@/components/layout/Sidebar";
import { SidebarProvider } from "@/components/layout/SidebarProvider";
import { TourProvider } from "@/components/tour/TourProvider";
import { GuidedTour } from "@/components/tour/GuidedTour";

// The live product demo, not the marketing site — keep it out of search
// results (the landing page at "/" is what should get indexed).
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-dvh flex-col">
      <SidebarProvider>
        <TourProvider>
          <div className="flex min-h-0 flex-1">
            <Sidebar />
            {children}
          </div>
          <GuidedTour />
        </TourProvider>
      </SidebarProvider>
    </div>
  );
}
