"use client";

import { useEffect, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTour } from "./TourProvider";
import { TOUR_STEPS } from "./tour-steps";
import { TourSpotlight } from "./TourSpotlight";
import { TourCallout } from "./TourCallout";

const DESKTOP_QUERY = "(min-width: 1024px)";

function subscribeToViewport(callback: () => void) {
  const query = window.matchMedia(DESKTOP_QUERY);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

function getIsDesktop() {
  return window.matchMedia(DESKTOP_QUERY).matches;
}

function getIsDesktopServerSnapshot() {
  return false;
}

function useIsDesktop(): boolean {
  return useSyncExternalStore(subscribeToViewport, getIsDesktop, getIsDesktopServerSnapshot);
}

export function GuidedTour() {
  const { isOpen, stepIndex, totalSteps, next, back, skip } = useTour();
  const isDesktop = useIsDesktop();
  const step = TOUR_STEPS[stepIndex];

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") skip();
    }

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, skip]);

  if (!isOpen) return null;

  if (isDesktop) {
    return (
      <TourSpotlight
        step={step}
        stepIndex={stepIndex}
        totalSteps={totalSteps}
        onNext={next}
        onBack={back}
        onSkip={skip}
      />
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/82 p-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={step.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.15 }}
        >
          <TourCallout
            step={step}
            stepIndex={stepIndex}
            totalSteps={totalSteps}
            onNext={next}
            onBack={back}
            onSkip={skip}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
