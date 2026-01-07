import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
    default: "Skylytics – Real-Time Weather App",
    template: "%s | Skylytics",
  },
  description:
    "Skylytics is a modern, real-time weather app that provides accurate weather details using geolocation or manual city search. Clean UI, smooth animations, and fast performance.",
  applicationName: "Skylytics",
  authors: [{ name: "Aryan Vaish" }],
  generator: "Next.js",
  keywords: [
    "weather app",
    "real time weather",
    "Skylytics",
    "weather by location",
    "weather forecast",
    "Next.js weather app",
    "geolocation weather",
    "modern weather UI",
  ],
  metadataBase: new URL("https://aryanvaish-skylytics.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Skylytics – Real-Time Weather App",
    description:
      "Check real-time weather using geolocation or manual search with Skylytics. Fast, minimal, and beautifully designed.",
    url: "https://aryanvaish-skylytics.vercel.app",
    siteName: "Skylytics",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Skylytics – Real-Time Weather App",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Skylytics – Real-Time Weather App",
    description:
      "A sleek weather app with real-time data, geolocation support, and smooth animations.",
    images: ["/og-image.svg"],
    creator: "@aryanvaish",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const svgFavicon = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
      <rect width="64" height="64" rx="12" ry="12" fill="#0f172a"/>
      <circle cx="26" cy="26" r="10" fill="#facc15"/>
      <path
        d="M42 44a8 8 0 0 0 0-16 10 10 0 0 0-19.5 2.5A6.5 6.5 0 0 0 24 44h18z"
        fill="#e5e7eb"
      />
    </svg>
  `;

  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          type="image/svg+xml"
          href={`data:image/svg+xml;base64,${btoa(svgFavicon)}`}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
