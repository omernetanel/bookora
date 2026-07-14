"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TourCallout } from "./TourCallout";
import type { TourStep } from "./tour-steps";

type Rect = { top: number; left: number; width: number; height: number };

const CUTOUT_PADDING = 8;
const CALLOUT_WIDTH = 320;
const CALLOUT_HEIGHT_ESTIMATE = 200;
const VIEWPORT_MARGIN = 16;

function measureTarget(target: string | null): Rect | null {
  if (!target) return null;
  const element = document.querySelector(`[data-tour="${target}"]`);
  if (!element) return null;

  const rect = element.getBoundingClientRect();
  return {
    top: rect.top - CUTOUT_PADDING,
    left: rect.left - CUTOUT_PADDING,
    width: rect.width + CUTOUT_PADDING * 2,
    height: rect.height + CUTOUT_PADDING * 2,
  };
}

function calloutPosition(cutout: Rect | null): { top: number; left: number } {
  if (!cutout) {
    return {
      top: window.innerHeight / 2 - CALLOUT_HEIGHT_ESTIMATE / 2,
      left: window.innerWidth / 2 - CALLOUT_WIDTH / 2,
    };
  }

  let top = cutout.top + cutout.height + 12;
  if (top + CALLOUT_HEIGHT_ESTIMATE > window.innerHeight - VIEWPORT_MARGIN) {
    top = cutout.top - CALLOUT_HEIGHT_ESTIMATE - 12;
  }
  top = Math.max(
    VIEWPORT_MARGIN,
    Math.min(top, window.innerHeight - CALLOUT_HEIGHT_ESTIMATE - VIEWPORT_MARGIN),
  );

  const left = Math.max(
    VIEWPORT_MARGIN,
    Math.min(cutout.left, window.innerWidth - CALLOUT_WIDTH - VIEWPORT_MARGIN),
  );

  return { top, left };
}

type TourSpotlightProps = {
  step: TourStep;
  stepIndex: number;
  totalSteps: number;
  onNext: () => void;
  onBack: () => void;
  onSkip: () => void;
};

export function TourSpotlight({
  step,
  stepIndex,
  totalSteps,
  onNext,
  onBack,
  onSkip,
}: TourSpotlightProps) {
  const [cutout, setCutout] = useState<Rect | null>(null);

  useEffect(() => {
    function measure() {
      setCutout(measureTarget(step.target));
    }
    measure();

    window.addEventListener("resize", measure);
    window.addEventListener("scroll", measure, true);
    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", measure, true);
    };
  }, [step.target]);

  const callout = calloutPosition(cutout);

  return (
    <div className="fixed inset-0 z-50">
      {cutout ? (
        // Cutout ring: a transparent box exactly over the target with a huge
        // spread box-shadow — the standard spotlight technique. Position/size
        // are runtime-measured (getBoundingClientRect), so — like the rest of
        // this project's Framer Motion elements — they're driven through
        // `animate`, not a static Tailwind class.
        <motion.div
          initial={false}
          animate={{ top: cutout.top, left: cutout.left, width: cutout.width, height: cutout.height }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="pointer-events-none absolute rounded-lg border-2 border-primary"
          style={{
            boxShadow: "0 0 0 9999px color-mix(in srgb, var(--color-background) 82%, transparent)",
          }}
        />
      ) : (
        <div className="absolute inset-0 bg-background/82" />
      )}

      <motion.div
        initial={false}
        animate={{ top: callout.top, left: callout.left }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="absolute"
      >
        <TourCallout
          step={step}
          stepIndex={stepIndex}
          totalSteps={totalSteps}
          onNext={onNext}
          onBack={onBack}
          onSkip={onSkip}
        />
      </motion.div>
    </div>
  );
}
