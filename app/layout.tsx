import type { Metadata } from "next";
import localFont from "next/font/local";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import ViewCanvas from "@/components/ViewCanvas";

const alpino = localFont({
  src: "../public/font/Alpino-Variable.woff2",
  display: "swap",
  weight: "100 900",
  variable: "--font-alpino",
});

export const metadata: Metadata = {
  title: "Dizzy - More Than Drinks",
  description: "Suprise your tastebuds ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${alpino.variable} antialiased !overflow-x-hidedn bg-yellow-300`}>
        <Header />
        <main>
          <ViewCanvas />
          {children}</main>

      </body>
    </html>
  );
}
