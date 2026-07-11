"use client";

import { useEffect, useRef } from "react";
import { animate, useMotionValue, useTransform } from "framer-motion";

type AnimatedNumberProps = {
  value: number;
  prefix?: string;
  suffix?: string;
};

export function AnimatedNumber({ value, prefix = "", suffix = "" }: AnimatedNumberProps) {
  const spanRef = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const formatted = useTransform(motionValue, (latest) =>
    `${prefix}${Math.round(latest).toLocaleString("en-US")}${suffix}`,
  );

  useEffect(() => {
    if (spanRef.current) {
      spanRef.current.textContent = formatted.get();
    }

    const controls = animate(motionValue, value, {
      duration: 0.8,
      ease: "easeOut",
    });

    const unsubscribe = formatted.on("change", (latest) => {
      if (spanRef.current) spanRef.current.textContent = latest;
    });

    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [value, motionValue, formatted]);

  return <span ref={spanRef} />;
}
