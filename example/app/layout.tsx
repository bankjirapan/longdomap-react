import type { Metadata } from "next";
import { Sarabun } from "next/font/google";

const sarabun = Sarabun({
  subsets: ["latin"],
  variable: "--font-sarabun",
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});


import "./globals.css";

export const metadata: Metadata = {
  title: "Longdo Map React Example",
  description: "A simple example of using Longdo Map with React",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={sarabun.variable}>
      <body
      >
        {children}
      </body>
    </html>
  );
}
