import type { Variants } from "framer-motion";

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.2, 0.7, 0.2, 1] } },
};

export const staggerChildren = (delayChildren = 0): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren },
  },
});
