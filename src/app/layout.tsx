import PageLoader from "@/components/PageLoader";
import SmoothScroll from "@/components/SmoothScroll";
import type { Metadata } from "next";
import { JetBrains_Mono, Syne } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wilie Effendi | Portfolio & Store",
  description: "Photographer and Content Creator. Capturing life's most beautiful moments.",
  icons: {
    icon: [
      { url: "/favicon.ico?v=2" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${syne.variable} ${jetbrainsMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <PageLoader />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
