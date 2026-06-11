import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { geistMono, geistSans } from "@/config/fonts";

export const metadata: Metadata = {
  title: "Teslo | Shop",
  description: "Una tienda virtual de productos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      // No colocar la clase 'h-full' porque aplica un color de fondo tipo 'mosaico'
      className={`${geistSans.variable} ${geistMono.variable}  antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
