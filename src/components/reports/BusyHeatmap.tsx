import { heatmapClasses } from "@/lib/chart-colors";
import { heatmapData, heatmapDays, heatmapHours } from "@/lib/mock-reports";

const INTENSITY_LABEL = ["שקט", "רגוע", "בינוני", "עמוס", "עמוס מאוד"];

export function BusyHeatmap() {
  const intensityByCell = new Map(
    heatmapData.map((cell) => [`${cell.day}-${cell.hour}`, cell.intensity]),
  );

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-1.5">
        <div className="grid grid-cols-10 gap-1.5">
          <div />
          {heatmapHours.map((hour) => (
            <div key={hour} dir="ltr" className="text-center text-[11px] text-muted-foreground">
              {hour}:00
            </div>
          ))}
        </div>

        {heatmapDays.map((day) => (
          <div key={day} className="grid grid-cols-10 gap-1.5">
            <div className="flex items-center justify-center text-xs font-medium text-muted-foreground">
              {day}
            </div>
            {heatmapHours.map((hour) => {
              const intensity = intensityByCell.get(`${day}-${hour}`) ?? 0;
              return (
                <div key={hour} className="group relative aspect-square">
                  <div className={`h-full w-full rounded-md ${heatmapClasses[intensity]}`} />
                  <div className="pointer-events-none absolute inset-x-0 bottom-full z-10 mb-1.5 hidden justify-center group-hover:flex">
                    <div className="whitespace-nowrap rounded-lg border border-border bg-card px-2.5 py-1.5 text-xs text-foreground shadow-card">
                      <span dir="ltr">{hour}:00</span> · {day} · {INTENSITY_LABEL[intensity]}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-end gap-2 text-xs text-muted-foreground">
        <span>פחות עמוס</span>
        <div className="flex gap-1">
          {heatmapClasses.map((cls) => (
            <div key={cls} className={`h-3 w-3 rounded-sm ${cls}`} />
          ))}
        </div>
        <span>עמוס יותר</span>
      </div>
    </div>
  );
}
