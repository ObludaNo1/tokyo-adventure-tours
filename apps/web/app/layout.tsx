import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/app/header";
import "./globals.css";
import Footer from "./footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tokyo Adventure Tours",
  description:
    "Discover the best tours in Tokyo with Tokyo Adventure Tours. Explore the city's vibrant culture, iconic landmarks, and hidden gems with our expert guides. Book your unforgettable Tokyo adventure today!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full w-full flex flex-col">
        <Header />
        <main className="w-full flex-1 px-24">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
