import type { Metadata } from "next";
import "./globals.css";



const pageColor = "--devScheme-white"

export const metadata: Metadata = {
  title: "Thaygle - Pré-Moldados",
  description: "Churrasqueiras Pré-moldadas em Itumbiara - Go e proximidades.",
  robots:{
    follow: true,
    index: true
  }
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
