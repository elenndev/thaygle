import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

const pageColor = "--devScheme-white"

export const metadata: Metadata = {
  title: "Thaygle - Pré-Moldados",
  description: "Churrasqueiras Pré-moldadas em Itumbiara - Go e proximidades.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`bg-[${pageColor}] h-screen w-screen`}
      >
        {children}
      </body>
    </html>
  );
}
