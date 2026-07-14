import type { Metadata } from "next";
import { MarketingNav } from "@/components/marketing/MarketingNav";
import { Hero } from "@/components/marketing/Hero";
import { FeatureGrid } from "@/components/marketing/FeatureGrid";
import { AudienceSection } from "@/components/marketing/AudienceSection";
import { CtaBand } from "@/components/marketing/CtaBand";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";

export const metadata: Metadata = {
  title: "LYNKO — ניהול תורים שנבנה בעברית",
};

export default function LandingPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <MarketingNav />

      <main className="flex-1">
        <Hero />

        <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-[62ch]">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-semibold text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              מה מקבלים
            </span>
            <h2 className="mt-4 font-heading text-2xl font-bold text-foreground sm:text-3xl">
              לא עוד טבלת אקסל עם תורים
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              שלושה חלקים שעובדים ביחד, לא שלושה כלים נפרדים שצריך לתאם ביניהם בערב.
            </p>
          </div>
          <div className="mt-10">
            <FeatureGrid />
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
          <AudienceSection />
        </section>

        <CtaBand />
      </main>

      <MarketingFooter />
    </div>
  );
}
