import type { Metadata, Viewport } from "next";
import Script from "next/script";
import localFont from "next/font/local";
import "./globals.css";
import { siteConfig } from "@/data/site";
import { ThemeProvider, THEME_INIT_SCRIPT } from "@/components/theme/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LoadingScreen } from "@/components/layout/LoadingScreen";
import { BrandedCursor } from "@/components/ui/BrandedCursor";
import { AmbientAtmosphere } from "@/components/ui/AmbientAtmosphere";
import {
  JsonLd,
  getOrganizationSchema,
  getWebsiteSchema,
} from "@/components/seo/JsonLd";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#080c14" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Setsuzoku LLP — We Connect Ideas to Technology",
    template: "%s | Setsuzoku LLP",
  },
  description: siteConfig.description,
  applicationName: "Setsuzoku",
  keywords: [
    "Setsuzoku LLP",
    "Setsuzoku",
    "Edu Alt Tech Company",
    "Connect Create Grow",
    "Software Company in Kakinada",
    "Tech Company in Kakinada",
    "Web Development Company in Kakinada",
    "IT Company in Kakinada",
    "Website Design in Kakinada",
    "Web Developers in Kakinada",
    "Software Company Andhra Pradesh",
    "Custom Software Development India",
    "Software Engineering Company",
    "Web Applications",
    "Mobile Applications",
    "UI/UX Design Systems",
    "Brand Identity Design",
    "Business Automation",
    "Digital Solutions",
    "Cloud Architecture",
    "Full-Stack Development",
    "Next.js Development",
    "Website Development Pricing 2026",
    "E-Commerce Website Development",
    "Enterprise Software Solutions",
    "Uma Krishna Kanth Chokkapu",
  ],
  authors: [{ name: "Setsuzoku LLP", url: siteConfig.url }],
  creator: "Setsuzoku LLP",
  publisher: "Setsuzoku LLP",
  category: "Technology & Software Engineering",
  alternates: {
    canonical: "/",
  },
  other: {
    "geo.region": "IN-AP",
    "geo.placename": "Kakinada",
    "geo.position": "16.9891;82.2475",
    "ICBM": "16.9891, 82.2475",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "Setsuzoku LLP — We Connect Ideas to Technology",
    description: siteConfig.description,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Setsuzoku LLP — Connect • Create • Grow",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Setsuzoku LLP — We Connect Ideas to Technology",
    description: siteConfig.description,
    images: ["/og.png"],
    creator: "@setsuzoku",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/brand/setsuzoku-icon.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: "/brand/setsuzoku-logo.png",
    apple: "/brand/setsuzoku-logo.png",
  },
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const globalSchemas = [getOrganizationSchema(), getWebsiteSchema()];

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <JsonLd data={globalSchemas} />
      </head>
      <body className="antialiased selection:bg-brand-blue/20 selection:text-brand-blue dark:selection:bg-blue-500/30 dark:selection:text-blue-200 min-h-screen flex flex-col bg-white dark:bg-[#080C14] text-[#0B1220] dark:text-slate-100">
        {/* Google Tag Manager */}
        <Script
          src="https://www.googletagmanager.com/gtm.js?id=GTM-WDJ9FZ3X"
          strategy="afterInteractive"
        />
        <Script id="gtm-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          `}
        </Script>
        <ThemeProvider>
          <AmbientAtmosphere />
          <BrandedCursor />
          <LoadingScreen />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WDJ9FZ3X"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
      </body>
    </html>
  );
}
