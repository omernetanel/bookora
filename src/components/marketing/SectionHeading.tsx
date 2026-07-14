"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion-variants";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      variants={fadeUp}
      className="max-w-[62ch]"
    >
      <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-semibold text-muted-foreground">
        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
        {eyebrow}
      </span>
      <h2 className="mt-4 font-heading text-2xl font-bold text-foreground sm:text-3xl">{title}</h2>
      {description ? (
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">{description}</p>
      ) : null}
    </motion.div>
  );
}
