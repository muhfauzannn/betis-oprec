import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const nunito = localFont({
  src: "./fonts/Nunito-VariableFont_wght.ttf",
  variable: "--font-nunito",
  weight: "100 900",
})
const spartan = localFont({
  src: "./fonts/LeagueSpartan-VariableFont_wght.ttf",
  variable: "--font-spartan",
  weight: "100 900",
})
const poppins = localFont({
  src: "./fonts/Poppins-Regular.ttf",
  variable: "--font-poppins",
  weight: "100 900",
})

export const metadata: Metadata = {
  title: "Betis",
  description: "Tugas Khusus Front End",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`text-white ${geistSans.variable} ${poppins.variable} ${spartan.variable} ${nunito.variable} ${geistMono.variable} antialiased h-screen w-full  bg-[url('/background.jpg')] bg-cover bg-center bg-no-repeat`}
        >
        {children}
      </body>
    </html>
  );
}
