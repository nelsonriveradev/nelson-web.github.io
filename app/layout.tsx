import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";

import { ClerkProvider } from "@clerk/nextjs";

// @next-codemod-ignore Cache Components adoption: this segment temporarily allows blocking.
// Remove this opt-out after verifying the segment passes validation without it.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Nelson Rivera | Desarrollador Web",
    template: "%s | Nelson Rivera",
  },
  description:
    "Desarrollador web enfocado en crear sitios y aplicaciones que aportan valor a tu negocio con Next.js, React, Tailwind CSS y Supabase.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Nelson Rivera | Desarrollador Web",
    description:
      "Desarrollador web enfocado en crear sitios y aplicaciones que aportan valor a tu negocio.",
    type: "website",
    locale: "es_ES",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#E7F6F2" },
    { media: "(prefers-color-scheme: dark)", color: "#1C2222" },
  ],
};

const themeScript = `(function(){try{var stored=localStorage.getItem("theme");var dark=stored==="dark"||(!stored&&window.matchMedia("(prefers-color-scheme: dark)").matches);var root=document.documentElement;root.classList.toggle("dark",dark);root.style.colorScheme=dark?"dark":"light";}catch(e){}})();`;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "var(--brand)",
          colorPrimaryForeground: "var(--on-brand)",
          colorBackground: "var(--surface)",
          colorForeground: "var(--ink)",
          colorMuted: "var(--surface-alt)",
          colorMutedForeground: "var(--muted-ink)",
          colorInput: "var(--surface-alt)",
          colorInputForeground: "var(--ink)",
          colorBorder: "var(--line)",
          colorNeutral: "var(--ink)",
          borderRadius: "0.75rem",
        },
      }}
    >
      <html lang="es" suppressHydrationWarning>
        <head>
          <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background font-sans text-foreground antialiased`}
        >
          <a
            href="#contenido"
            className="sr-only rounded-lg bg-primary px-4 py-2 text-primary-foreground focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100]"
          >
            Saltar al contenido
          </a>
          <NavBar />
          <main id="contenido">{children}</main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
