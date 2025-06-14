import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./home/navbar/page";
import Footer from "./home/footer/page";
import { Providers } from "./providers";
import PayPalProvider from "@/components/PayPalProviderClient";
import { GoogleAnalytics } from '@next/third-parties/google'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BeautyLook - Professional Skincare & Beauty Products",
  description: "Discover premium skincare solutions and beauty devices. Shop our clinically-proven micro-infusion systems, serums and beauty tools for radiant, youthful skin.",
  keywords: [
    "skincare",
    "beauty devices",
    "micro-infusion",
    "anti-aging",
    "beauty products",
    "professional skincare"
  ],
  openGraph: {
    title: "BeautyLook - Professional Skincare & Beauty Products",
    description: "Discover premium skincare solutions and beauty devices for radiant, youthful skin.",
    url: "https://www.beautylook.top",
    siteName: "BeautyLook",
    images: [
      {
        url: "https://www.beautylook.top/logo.png",
        width: 800,
        height: 600,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BeautyLook - Professional Skincare & Beauty Products",
    description: "Discover premium skincare solutions and beauty devices for radiant, youthful skin.",
    images: ["https://www.beautylook.top/logo.png"],
  },
  icons: {
    icon: [
      { url: '/logo.png', type: 'image/png' }
    ]
  },
  metadataBase: new URL("https://www.beautylook.top")
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased px-12`}
      >

        <Providers>
          <Navbar />
          <PayPalProvider>{children}</PayPalProvider>
          <Footer />
        </Providers>
        <GoogleAnalytics gaId="G-3LYM166ETK" />
      </body>
    </html>
  );
}
