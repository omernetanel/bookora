"use client";

import { motion, useReducedMotion } from "framer-motion";

export function AmbientBackground() {
  const reduceMotion = useReducedMotion();

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <motion.div
        className="absolute -top-40 start-[-10%] h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--color-primary)_28%,transparent),transparent_70%)] blur-3xl"
        animate={reduceMotion ? undefined : { x: [0, 40, 0], y: [0, 30, 0] }}
        transition={{ duration: 22, ease: "easeInOut", repeat: Infinity }}
      />
      <motion.div
        className="absolute top-[40%] end-[-15%] h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--color-service-3)_30%,transparent),transparent_70%)] blur-3xl"
        animate={reduceMotion ? undefined : { x: [0, -30, 0], y: [0, -40, 0] }}
        transition={{ duration: 26, ease: "easeInOut", repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-[-10%] start-[20%] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--color-primary)_18%,transparent),transparent_70%)] blur-3xl"
        animate={reduceMotion ? undefined : { x: [0, 25, 0], y: [0, -20, 0] }}
        transition={{ duration: 19, ease: "easeInOut", repeat: Infinity }}
      />
    </div>
  );
}
