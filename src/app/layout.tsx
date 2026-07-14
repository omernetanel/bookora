import type { Metadata } from "next";
import { assistant, googleSans } from "@/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "LYNKO — ניהול תורים שנבנה בעברית",
  description: "Book with LYNKO — מערכת ניהול תורים חכמה לעסקים קטנים ובינוניים",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="he"
      dir="rtl"
      className={`${assistant.variable} ${googleSans.variable} h-full antialiased`}
    >
      <body className="bg-background font-sans text-foreground">{children}</body>
    </html>
  );
}
