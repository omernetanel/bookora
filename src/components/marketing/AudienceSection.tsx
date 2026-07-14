"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";
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
      <SectionHeading eyebrow="למי זה מתאים" title="עסקי שירות שחיים לפי יומן" />

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
            whileHover={{ scale: 1.05, y: -2 }}
            transition={{ type: "spring", stiffness: 350, damping: 18 }}
            className="rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground transition-colors hover:border-primary"
          >
            {audience}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
}
