import type { Metadata } from "next";
import { AmbientBackground } from "@/components/marketing/AmbientBackground";
import { MarketingNav } from "@/components/marketing/MarketingNav";
import { Hero } from "@/components/marketing/Hero";
import { ScrollStory } from "@/components/marketing/ScrollStory";
import { SectionHeading } from "@/components/marketing/SectionHeading";
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
      <AmbientBackground />
      <MarketingNav />

      <main className="flex-1">
        <Hero />

        <ScrollStory />

        <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="מה מקבלים"
            title="לא עוד טבלת אקסל עם תורים"
            description="שלושה חלקים שעובדים ביחד, לא שלושה כלים נפרדים שצריך לתאם ביניהם בערב."
          />
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
