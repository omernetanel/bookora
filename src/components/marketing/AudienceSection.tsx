"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerChildren } from "@/lib/motion-variants";

const AUDIENCES = [
  "קליניקות ופרא-רפואה",
  "מספרות ומכוני יופי",
  "יועצים ורואי חשבון",
  "מאמנים אישיים וסטודיו",
  "עורכי דין",
  "ועוד עסקי שירות קטנים",
];

export function AudienceSection() {
  return (
    <div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={fadeUp}
        className="max-w-[62ch]"
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-semibold text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          למי זה מתאים
        </span>
        <h2 className="mt-4 font-heading text-2xl font-bold text-foreground sm:text-3xl">
          עסקי שירות שחיים לפי יומן
        </h2>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerChildren(0.1)}
        className="mt-8 flex flex-wrap gap-2.5"
      >
        {AUDIENCES.map((audience) => (
          <motion.span
            key={audience}
            variants={fadeUp}
            className="rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground transition-colors hover:border-primary"
          >
            {audience}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
}
