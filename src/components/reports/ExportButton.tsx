import { Download } from "lucide-react";

type ExportButtonProps = {
  label: string;
};

export function ExportButton({ label }: ExportButtonProps) {
  return (
    <button
      type="button"
      disabled
      title="בקרוב"
      className="flex shrink-0 cursor-not-allowed items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-xs font-medium text-muted-foreground opacity-60"
    >
      <Download className="h-3.5 w-3.5" />
      {label}
    </button>
  );
}
