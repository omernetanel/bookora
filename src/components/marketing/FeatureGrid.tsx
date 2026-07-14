"use client";

import { motion } from "framer-motion";
import { CalendarRange, BarChart3, Smartphone, type LucideIcon } from "lucide-react";
import { fadeUp, staggerChildren } from "@/lib/motion-variants";

type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const FEATURES: Feature[] = [
  {
    icon: CalendarRange,
    title: "יומן שבאמת גמיש",
    description: "תצוגת יום, שבוע וחודש בלחיצה אחת — ובלי לאבד התמצאות באמצע השבוע העמוס.",
  },
  {
    icon: BarChart3,
    title: "תמונת מצב אמיתית",
    description:
      "הכנסות, תפוסת צוות ושיעורי ביטולים שמתעדכנים לפי מה שקורה ביומן בפועל — לא הערכה.",
  },
  {
    icon: Smartphone,
    title: "בנוי לנייד, לא מצטמצם אליו",
    description: "כל מסך עוצב מחדש לטלפון — לא עוד טבלת דסקטופ שנדחסה למסך קטן.",
  },
];

export function FeatureGrid() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={staggerChildren()}
      className="grid grid-cols-1 gap-5 md:grid-cols-3"
    >
      {FEATURES.map((feature) => {
        const Icon = feature.icon;
        return (
          <motion.div
            key={feature.title}
            variants={fadeUp}
            className="rounded-xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/40"
          >
            <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/15 text-primary">
              <Icon className="h-5 w-5" />
            </span>
            <h3 className="font-heading text-base font-bold text-foreground">{feature.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {feature.description}
            </p>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
