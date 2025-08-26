"use client";
import { Geist } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import { Navbar } from "@/components/Navbar";
import { QueryProvider } from "@/providers/QueryProvider";
import { FeatureBinder } from "@/features/FeatureBinder";
import Image from "next/image";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.className} antialiased bg-background text-white min-h-screen font-sans`}>
        <NextTopLoader color="#0095ff" showSpinner={false} />
        <Toaster
          toastOptions={{
            style: {
              backgroundColor: "var(--c-box)",
              color: "var(--color-slate-100)",
            },
          }}
        />
        <div className="relative z-10">
          <QueryProvider>
            <FeatureBinder />
            <Navbar />
            <Sidebar />
            <main className="ml-[224px] mt-[72px] p-5 min-h-screen mb-[40px]">{children}</main>
            <Footer />
          </QueryProvider>
        </div>
        <div className="fixed inset-0 z-50 pointer-events-none select-none opacity-85">
          <Image src={"./assets/background/blur-pink.png"} fill alt="blur1" />
        </div>
        <div
          className="fixed inset-0 w-full h-full -translate-x-[50%]
        translate-y-[50%] pointer-events-none select-none opacity-85"
        >
          <Image src="./assets/background/blur-blue.png" fill alt="blur1" />
        </div>
        <div
          className="fixed inset-0 w-full h-full translate-x-[50%]
        translate-y-[50%] z-50 pointer-events-none select-none opacity-85"
        >
          <Image src="./assets/background/blur-red.png" fill alt="blur1" />
        </div>
      </body>
    </html>
  );
}
