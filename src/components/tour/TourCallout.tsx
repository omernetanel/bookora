import { Button } from "@/components/ui/Button";
import type { TourStep } from "./tour-steps";

type TourCalloutProps = {
  step: TourStep;
  stepIndex: number;
  totalSteps: number;
  onNext: () => void;
  onBack: () => void;
  onSkip: () => void;
};

export function TourCallout({ step, stepIndex, totalSteps, onNext, onBack, onSkip }: TourCalloutProps) {
  const isFirst = stepIndex === 0;
  const isLast = stepIndex === totalSteps - 1;

  return (
    <div
      data-testid="tour-callout"
      className="flex w-80 max-w-[calc(100vw-2rem)] flex-col gap-4 rounded-xl border border-border bg-card p-5 shadow-card"
    >
      <h3 className="font-heading text-base font-semibold text-foreground">{step.title}</h3>

      <p className="text-sm leading-relaxed text-muted-foreground">{step.description}</p>

      <div className="flex items-center justify-between pt-1">
        <button
          type="button"
          onClick={onSkip}
          className="text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          דלג על הסיור
        </button>

        <div className="flex items-center gap-2">
          <span dir="ltr" className="ms-1 text-xs text-muted-foreground">
            {stepIndex + 1}/{totalSteps}
          </span>
          {!isFirst ? (
            <Button variant="secondary" onClick={onBack} className="px-3 py-1.5 text-xs">
              הקודם
            </Button>
          ) : null}
          <Button onClick={onNext} className="px-3 py-1.5 text-xs">
            {isLast ? "סיום" : "הבא"}
          </Button>
        </div>
      </div>
    </div>
  );
}
