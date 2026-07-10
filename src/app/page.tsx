import { Sidebar } from "@/components/layout/Sidebar";

export default function Home() {
  return (
    <div className="flex flex-1">
      <Sidebar />
      <main className="flex flex-1 items-center justify-center">
        <p className="text-muted-foreground">אזור התוכן — יבנה בשלבים הבאים</p>
      </main>
    </div>
  );
}
