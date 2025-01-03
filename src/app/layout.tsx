import type { Metadata } from "next";
import "./globals.css";



const pageColor = "--devScheme-white"

export const metadata: Metadata = {
  title: "Thaygle - Pré-Moldados",
  description: "Thaygle Pré-Moldados - Churrasqueiras Pré-moldadas em Itumbiara - Go dos mais diversos modelos e cores.",
  robots:{
    follow: true,
    index: true
  },
  icons: {icon : '/favicon.icon'}
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`bg-[${pageColor}] h-screen w-screen max-w-[100vw] overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
