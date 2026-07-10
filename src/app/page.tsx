const colorTokens = [
  { name: "background", className: "bg-background" },
  { name: "card", className: "bg-card" },
  { name: "border", className: "bg-border" },
  { name: "primary", className: "bg-primary" },
  { name: "success", className: "bg-success" },
  { name: "warning", className: "bg-warning" },
  { name: "destructive", className: "bg-destructive" },
] as const;

const serviceTokens = [
  { name: "service-1", className: "bg-service-1" },
  { name: "service-2", className: "bg-service-2" },
  { name: "service-3", className: "bg-service-3" },
  { name: "service-4", className: "bg-service-4" },
  { name: "service-5", className: "bg-service-5" },
] as const;

export default function Home() {
  return (
    <main className="flex flex-1 flex-col gap-12 p-12">
      <header>
        <h1 className="font-heading text-3xl font-bold text-foreground">
          Bookora — בדיקת Design Tokens
        </h1>
        <p className="mt-2 text-muted-foreground">
          עמוד זמני לאימות חזותי של הטוקנים. יימחק לפני בניית הדאשבורד האמיתי.
        </p>
      </header>

      <section>
        <h2 className="mb-4 font-heading text-xl font-semibold text-foreground">
          צבעי בסיס
        </h2>
        <div className="flex flex-wrap gap-4">
          {colorTokens.map((token) => (
            <div key={token.name} className="flex flex-col items-center gap-2">
              <div
                className={`h-16 w-16 rounded-lg border border-border ${token.className}`}
              />
              <span className="text-sm text-muted-foreground">{token.name}</span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 font-heading text-xl font-semibold text-foreground">
          צבעי שירות (Appointment Cards)
        </h2>
        <div className="flex flex-wrap gap-4">
          {serviceTokens.map((token) => (
            <div key={token.name} className="flex flex-col items-center gap-2">
              <div className={`h-16 w-16 rounded-lg ${token.className}`} />
              <span className="text-sm text-muted-foreground">{token.name}</span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 font-heading text-xl font-semibold text-foreground">
          פונטים
        </h2>
        <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-6 shadow-card">
          <p className="font-heading text-2xl font-bold text-foreground">
            Google Sans — כותרת לדוגמה 12:30, ₪2,450
          </p>
          <p className="font-heading text-2xl italic font-bold text-foreground">
            Google Sans Italic — לדוגמה
          </p>
          <p className="font-sans text-base text-foreground">
            Assistant — טקסט גוף רגיל לדוגמה. תור הבא ב-09:00 עם שרה לוי, תספורת,
            מחיר ₪120.
          </p>
          <p className="font-sans text-base font-semibold text-foreground">
            Assistant Semibold — טקסט מודגש לדוגמה.
          </p>
        </div>
      </section>

      <section>
        <h2 className="mb-4 font-heading text-xl font-semibold text-foreground">
          Shadow ו-Radius
        </h2>
        <div className="flex gap-6">
          <div className="flex h-24 w-40 items-center justify-center rounded-lg bg-card shadow-sm">
            <span className="text-sm text-muted-foreground">shadow-sm</span>
          </div>
          <div className="flex h-24 w-40 items-center justify-center rounded-xl bg-card shadow-card">
            <span className="text-sm text-muted-foreground">shadow-card</span>
          </div>
        </div>
      </section>
    </main>
  );
}
