"use client";

import { motion } from "framer-motion";
import { CalendarPreview } from "./CalendarPreview";
import { CtaLink } from "./CtaLink";
import { fadeUp, staggerChildren } from "@/lib/motion-variants";

export function Hero() {
  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 px-4 pb-16 pt-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-8 lg:pt-24">
      <motion.div initial="hidden" animate="visible" variants={staggerChildren()}>
        <motion.span
          variants={fadeUp}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-semibold text-muted-foreground"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          ניהול תורים חכם לעסקים קטנים ובינוניים
        </motion.span>

        <motion.h1
          variants={fadeUp}
          className="mt-5 text-balance font-heading text-4xl font-bold leading-[1.15] text-foreground sm:text-5xl"
        >
          מערכת ניהול תורים שנבנתה <span className="text-primary">בעברית</span> — לא תורגמה
          אליה.
        </motion.h1>

        <motion.p variants={fadeUp} className="mt-5 max-w-[46ch] text-lg leading-relaxed text-muted-foreground">
          יומן, לקוחות, שירותים, צוות ודוחות — בממשק RTL מלא שמרגיש נכון מהרגע הראשון. לא עוד
          מוצר שהופך ימין לשמאל בדיעבד.
        </motion.p>

        <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-4">
          <CtaLink>נסו את הדמו החי</CtaLink>
          <span className="text-sm text-muted-foreground">בלי הרשמה. בלי כרטיס אשראי.</span>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.2, 0.7, 0.2, 1] }}
      >
        <CalendarPreview />
      </motion.div>
    </div>
  );
}
