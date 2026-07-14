"use client";

import { createContext, useContext, useState, useSyncExternalStore, type ReactNode } from "react";
import { TOUR_STEPS } from "./tour-steps";

const TOUR_STORAGE_KEY = "lynko-tour-seen";

function subscribeToStorage(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getHasSeenTour() {
  return window.localStorage.getItem(TOUR_STORAGE_KEY) !== null;
}

function getHasSeenTourServerSnapshot() {
  // SSR-safe default: never assume the tour should auto-open before the
  // client has had a chance to check localStorage.
  return true;
}

type TourContextValue = {
  isOpen: boolean;
  stepIndex: number;
  totalSteps: number;
  start: () => void;
  next: () => void;
  back: () => void;
  skip: () => void;
};

const TourContext = createContext<TourContextValue | null>(null);

export function TourProvider({ children }: { children: ReactNode }) {
  const hasSeenTour = useSyncExternalStore(
    subscribeToStorage,
    getHasSeenTour,
    getHasSeenTourServerSnapshot,
  );
  const [override, setOverride] = useState<"open" | "closed" | null>(null);
  const [stepIndex, setStepIndex] = useState(0);

  const isOpen = override === null ? !hasSeenTour : override === "open";

  function start() {
    setStepIndex(0);
    setOverride("open");
  }

  function finish() {
    window.localStorage.setItem(TOUR_STORAGE_KEY, "1");
    setOverride("closed");
  }

  function next() {
    setStepIndex((current) => {
      if (current >= TOUR_STEPS.length - 1) {
        finish();
        return current;
      }
      return current + 1;
    });
  }

  function back() {
    setStepIndex((current) => Math.max(0, current - 1));
  }

  const value: TourContextValue = {
    isOpen,
    stepIndex,
    totalSteps: TOUR_STEPS.length,
    start,
    next,
    back,
    skip: finish,
  };

  return <TourContext.Provider value={value}>{children}</TourContext.Provider>;
}

export function useTour(): TourContextValue {
  const context = useContext(TourContext);
  if (!context) {
    throw new Error("useTour must be used within a TourProvider");
  }
  return context;
}
