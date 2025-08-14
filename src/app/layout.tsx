import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Theme } from "@radix-ui/themes";
import AppSessionProvider from "@/components/SessionProvider";
import Navbar from "@/components/Navbar";
import "@radix-ui/themes/styles.css";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "app_rural",
  description: "Proyecto Next.js + Radix UI + NextAuth",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Radix Themes debe ir dentro de <body> */}
        <Theme accentColor="grass" radius="large">
          <AppSessionProvider>
            <Navbar />
            <main style={{
              padding: "16px",
              paddingTop: "var(--header-height, 64px)",
              maxWidth: "var(--container-max, 1200px)",
              margin: "0 auto"
            }}>{children}</main>
          </AppSessionProvider>
        </Theme>
      </body>
    </html>
  );
}
