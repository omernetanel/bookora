"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { STORY_SCENES, type StoryScene } from "./story-scenes";

const SCENE_COUNT = STORY_SCENES.length;

// Each scene's fade-in window shares its exact positions with the previous
// scene's fade-out window (both centered on the boundary between them), so
// one scene is still fading out while the next is already fading in — a true
// crossfade. (An earlier version had each scene fade out fully *before* the
// next started fading in, meeting edge-to-edge instead of overlapping, which
// left a brief blank flash at every boundary — confirmed via a screenshot at
// the scene-1/scene-2 seam showing neither scene visible.)
const BOUNDARY_OVERLAP = 0.05;

function sceneKeyframes(index: number): { positions: number[]; opacity: number[]; scale: number[] } {
  const leftBoundary = index / SCENE_COUNT;
  const rightBoundary = (index + 1) / SCENE_COUNT;

  const isFirst = index === 0;
  const isLast = index === SCENE_COUNT - 1;

  const positions = [
    Math.max(0, leftBoundary - BOUNDARY_OVERLAP),
    Math.min(1, leftBoundary + BOUNDARY_OVERLAP),
    Math.max(0, rightBoundary - BOUNDARY_OVERLAP),
    Math.min(1, rightBoundary + BOUNDARY_OVERLAP),
  ];

  return {
    positions,
    opacity: [isFirst ? 1 : 0, 1, 1, isLast ? 1 : 0],
    scale: [isFirst ? 1 : 0.92, 1, 1, isLast ? 1 : 1.06],
  };
}

// Framer Motion's array-shorthand useTransform(value, positions, output) hands
// scroll-linked transforms off to a native WAAPI scroll-timeline "acceleration"
// path that — at least in this version — fails to clamp the very first scene's
// descending range (progress values past its band kept climbing back toward 1
// instead of holding at 0). Using the explicit-function form of useTransform
// skips that path entirely and always does plain, correctly-clamped JS math.
function clampedInterpolate(value: number, positions: number[], outputs: number[]): number {
  if (value <= positions[0]) return outputs[0];
  const lastIndex = positions.length - 1;
  if (value >= positions[lastIndex]) return outputs[lastIndex];

  for (let i = 0; i < lastIndex; i++) {
    if (value >= positions[i] && value <= positions[i + 1]) {
      const t = (value - positions[i]) / (positions[i + 1] - positions[i]);
      return outputs[i] + t * (outputs[i + 1] - outputs[i]);
    }
  }
  return outputs[lastIndex];
}

type SceneLayerProps = {
  scene: StoryScene;
  index: number;
  progress: MotionValue<number>;
};

function SceneText({ scene, index, progress }: SceneLayerProps) {
  const { positions, opacity } = sceneKeyframes(index);
  const yPositions = [16, 0, 0, -16];
  const layerOpacity = useTransform(progress, (value) => clampedInterpolate(value, positions, opacity));
  const y = useTransform(progress, (value) => clampedInterpolate(value, positions, yPositions));

  return (
    <motion.div style={{ opacity: layerOpacity, y }} className="absolute inset-0 flex flex-col justify-center">
      <h3 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">{scene.title}</h3>
      <p className="mt-4 max-w-[40ch] text-base leading-relaxed text-muted-foreground">
        {scene.description}
      </p>
    </motion.div>
  );
}

function SceneVisual({ scene, index, progress }: SceneLayerProps) {
  const { positions, opacity, scale } = sceneKeyframes(index);
  const layerOpacity = useTransform(progress, (value) => clampedInterpolate(value, positions, opacity));
  const layerScale = useTransform(progress, (value) => clampedInterpolate(value, positions, scale));

  return (
    <motion.div
      style={{ opacity: layerOpacity, scale: layerScale }}
      className="absolute inset-0 flex items-center justify-center"
    >
      {scene.visual}
    </motion.div>
  );
}

function ProgressDot({ index, progress }: { index: number; progress: MotionValue<number> }) {
  const { positions, opacity } = sceneKeyframes(index);
  const dotOutputs = opacity.map((o) => 0.3 + o * 0.7);
  const dotOpacity = useTransform(progress, (value) => clampedInterpolate(value, positions, dotOutputs));

  return <motion.span style={{ opacity: dotOpacity }} className="h-1.5 w-6 rounded-full bg-primary" />;
}

function ProgressDots({ progress }: { progress: MotionValue<number> }) {
  return (
    <div className="absolute bottom-10 start-1/2 flex -translate-x-1/2 items-center gap-2">
      {STORY_SCENES.map((scene, index) => (
        <ProgressDot key={scene.id} index={index} progress={progress} />
      ))}
    </div>
  );
}

function MobileScene({ scene }: { scene: StoryScene }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: [0.2, 0.7, 0.2, 1] }}
      className="flex flex-col items-center gap-6 text-center"
    >
      {scene.visual}
      <div>
        <h3 className="font-heading text-xl font-bold text-foreground">{scene.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{scene.description}</p>
      </div>
    </motion.div>
  );
}

export function ScrollStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section aria-label="איך המערכת עובדת">
      <div
        ref={containerRef}
        className="relative hidden lg:block"
        style={{ height: `${SCENE_COUNT * 100}vh` }}
      >
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <div className="mx-auto grid w-full max-w-6xl grid-cols-2 items-center gap-20 px-8">
            <div className="relative h-56">
              {STORY_SCENES.map((scene, index) => (
                <SceneText key={scene.id} scene={scene} index={index} progress={scrollYProgress} />
              ))}
            </div>
            <div className="relative h-[26rem]">
              {STORY_SCENES.map((scene, index) => (
                <SceneVisual key={scene.id} scene={scene} index={index} progress={scrollYProgress} />
              ))}
            </div>
          </div>

          <ProgressDots progress={scrollYProgress} />
        </div>
      </div>

      <div className="flex flex-col gap-16 px-4 py-20 sm:px-6 lg:hidden">
        {STORY_SCENES.map((scene) => (
          <MobileScene key={scene.id} scene={scene} />
        ))}
      </div>
    </section>
  );
}
