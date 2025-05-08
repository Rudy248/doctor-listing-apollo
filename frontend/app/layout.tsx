import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title:
    "Find General Physicians & Internal Medicine Specialists | Apollo 247 Clone",
  description:
    "Book appointments with the best General Physicians and Internal Medicine specialists. Consult with experienced doctors online or in-person.",
  keywords:
    "general physician, internal medicine, doctor appointment, online consultation, apollo 247",
  openGraph: {
    title:
      "Find General Physicians & Internal Medicine Specialists | Apollo 247 Clone",
    description:
      "Book appointments with the best General Physicians and Internal Medicine specialists. Consult with experienced doctors online or in-person.",
    url: "https://doctor-listing-apollo-mtte.vercel.app/",
    siteName: "Apollo 247 Clone",

    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Find General Physicians & Internal Medicine Specialists | Apollo 247 Clone",
    description:
      "Book appointments with the best General Physicians and Internal Medicine specialists. Consult with experienced doctors online or in-person.",
  },
  alternates: {
    canonical: "https://doctor-listing-apollo-mtte.vercel.app/",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
