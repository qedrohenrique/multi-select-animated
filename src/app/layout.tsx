import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { Navbar } from "@/components/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Multi Select Animated",
    template: "%s | Multi Select Animated",
  },
  description:
    "Multi-select React component with animations, built with shadcn/ui.",
  keywords: [
    "multi-select",
    "react",
    "component",
    "shadcn",
    "animated",
    "Next.js",
    "TypeScript",
  ],
  authors: [{ name: "Henrique", url: "https://github.com/qedrohenrique" }],
  openGraph: {
    title: "Multi Select Animated",
    description:
      "Multi-select React component with animations, built with shadcn/ui.",
    url: "https://multi-select-animated.vercel.app",
    siteName: "Multi Select Animated",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Multi Select Animated",
    description:
      "Multi-select React component with animations, built with shadcn/ui.",
    creator: "@seu_twitter",
  },
  alternates: {
    canonical: "https://multi-select-animated.vercel.app",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
          <Toaster position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}
