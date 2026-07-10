import localFont from "next/font/local";
import { Assistant } from "next/font/google";

export const assistant = Assistant({
  subsets: ["hebrew", "latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-assistant",
  display: "swap",
});

export const googleSans = localFont({
  src: [
    {
      path: "./google-sans/GoogleSans-Variable.ttf",
      weight: "100 900",
      style: "normal",
    },
    {
      path: "./google-sans/GoogleSans-Italic-Variable.ttf",
      weight: "100 900",
      style: "italic",
    },
  ],
  variable: "--font-google-sans",
  display: "swap",
});
