"use client";

import { useRef, type MouseEvent } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import { CalendarPreview } from "./CalendarPreview";
import { CtaLink } from "./CtaLink";
import { fadeUp, staggerChildren } from "@/lib/motion-variants";

const HEADLINE_WORDS = [
  "מערכת",
  "ניהול",
  "תורים",
  "שנבנתה",
  "|בעברית|",
  "—",
  "לא",
  "תורגמה",
  "אליה.",
];

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: [0.2, 0.7, 0.2, 1] },
  },
};

export function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const spotlightX = useMotionValue(0);
  const spotlightY = useMotionValue(0);
  const springSpotlightX = useSpring(spotlightX, { stiffness: 80, damping: 20 });
  const springSpotlightY = useSpring(spotlightY, { stiffness: 80, damping: 20 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const mockupY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const mockupOpacity = useTransform(scrollYProgress, [0, 0.85, 1], [1, 1, 0.3]);

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    spotlightX.set(event.clientX - rect.left);
    spotlightY.set(event.clientY - rect.top);
  }

  return (
    <div ref={sectionRef} className="relative overflow-hidden" onMouseMove={handleMouseMove}>
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -z-10 h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--color-primary)_16%,transparent),transparent_72%)] blur-2xl"
        style={{ x: springSpotlightX, y: springSpotlightY, translateX: "-50%", translateY: "-50%" }}
      />

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
            variants={staggerChildren(0.15)}
            className="mt-5 flex flex-wrap gap-x-2.5 font-heading text-4xl font-bold leading-[1.15] text-foreground sm:text-5xl"
          >
            {HEADLINE_WORDS.map((word) => {
              const isAccent = word.startsWith("|") && word.endsWith("|");
              const label = isAccent ? word.slice(1, -1) : word;
              return (
                <motion.span
                  key={word}
                  variants={wordVariants}
                  className={isAccent ? "text-primary" : undefined}
                >
                  {label}
                </motion.span>
              );
            })}
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
          <motion.div style={{ y: mockupY, opacity: mockupOpacity }}>
            <CalendarPreview />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
