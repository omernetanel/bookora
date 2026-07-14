import Image from "next/image";

export function MarketingFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 py-10 sm:flex-row sm:justify-between sm:px-6 lg:px-8">
        <div dir="ltr">
          <Image src="/lynkologow.png" alt="LYNKO" width={151} height={36} className="h-5 w-auto opacity-80" />
        </div>
        <p className="text-sm text-muted-foreground">
          Book with LYNKO — מערכת ניהול תורים חכמה לעסקים קטנים ובינוניים.
        </p>
      </div>
    </footer>
  );
}
