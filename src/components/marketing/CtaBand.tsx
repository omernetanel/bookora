"use client";

import { motion } from "framer-motion";
import { CtaLink } from "./CtaLink";
import { fadeUp } from "@/lib/motion-variants";

export function CtaBand() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      variants={fadeUp}
      className="border-y border-border bg-card"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-4 py-14 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <h2 className="font-heading text-2xl font-bold text-foreground sm:text-3xl lg:max-w-[30ch]">
          מוכנים לראות איך זה עובד?
        </h2>
        <div className="flex flex-col items-start gap-3">
          <CtaLink>נסו את הדמו החי</CtaLink>
          <p className="max-w-[34ch] text-sm text-muted-foreground">
            זה עדיין דמו חי בפיתוח פעיל — ותוכלו לגעת בו עכשיו, בלי לחכות להשקה.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
