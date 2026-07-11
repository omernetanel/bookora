import type { Metadata } from "next";
import { assistant, googleSans } from "@/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "LYNKO",
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
      <body className="flex h-dvh flex-col bg-background font-sans text-foreground">
        {children}
      </body>
    </html>
  );
}
