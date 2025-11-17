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
  title: "Weather App",
  description:
    "A modern weather app showing current weather conditions with a minimal and clean interface.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const svgFavicon = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
      <title>Weather App Icon</title>
      <desc>A minimal yellow sun partly covered by a cloud, representing a weather app icon.</desc>
      <style>
        @media (prefers-color-scheme: dark) {
          rect { fill: #1f2937; }
          path { fill: #9ca3af; }
          circle { fill: #facc15; }
        }
        @media (prefers-color-scheme: light) {
          rect { fill: #f9fafb; }
          path { fill: #d1d5db; }
          circle { fill: #facc15; }
        }
      </style>
      <rect width="64" height="64" rx="12" ry="12"/>
      <circle cx="26" cy="26" r="10"/>
      <path d="M42 44a8 8 0 0 0 0-16 10 10 0 0 0-19.5 2.5A6.5 6.5 0 0 0 24 44h18z"/>
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
