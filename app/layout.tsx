import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Loading from "@/components/Loading";

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
      <body className={`${alpino.variable} antialiased !overflow-x-hidden bg-gradient-to-br from-amber-400 via-orange-300 to-rose-400`}>
        <Loading />
        <Header />
        <main className="pt-16">
          {children}
        </main>
      </body>
    </html>
  );
}
