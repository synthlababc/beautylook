import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./home/navbar/page";
import Footer from "./home/footer/page";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Unleash Your Youthful Glow",
  description: "Our beauty products for your skin care",
  icons: {
    icon: [
      { url: '/logo.png', type: 'image/png' }  // 只保留PNG格式的图标
    ]
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased mx-12`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
