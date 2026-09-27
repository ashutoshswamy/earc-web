import type { Metadata } from "next";
import { Fraunces, DM_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { SITE_NAME, SITE_URL, pageMetadata } from "@/lib/seo";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const description =
  "Jnana Prabodhini's Educational Activity Research Centre (EARC), Pune - teacher training, science and maths enrichment, Homi Bhabha and Ganit Prabhutwa exam guidance, and community education projects across India.";

export const metadata: Metadata = {
  ...pageMetadata(
    "/",
    "EARC - Jnana Prabodhini's Educational Activity Research Centre",
    description,
  ),
  metadataBase: new URL(SITE_URL),
  title: {
    default: "EARC - Jnana Prabodhini's Educational Activity Research Centre",
    template: "%s | EARC - Jnana Prabodhini",
  },
  applicationName: SITE_NAME,
  keywords: [
    "EARC",
    "Jnana Prabodhini",
    "Educational Activity Research Centre",
    "Pune",
    "teacher training",
    "Homi Bhabha Balvaidnyanik Spardha",
    "Ganit Prabhutwa Pariksha",
    "science education",
    "NGO education India",
  ],
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "Educational Activity Research Centre (EARC)",
  alternateName: "Jnana Prabodhini EARC",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  description,
  email: "contact.earc@jnanaprabodhini.org",
  telephone: "+91-20-24207231",
  address: {
    "@type": "PostalAddress",
    streetAddress: "510, Sadashiv Peth",
    addressLocality: "Pune",
    addressRegion: "Maharashtra",
    postalCode: "411030",
    addressCountry: "IN",
  },
  parentOrganization: {
    "@type": "Organization",
    name: "Jnana Prabodhini",
    url: "https://www.jnanaprabodhini.org",
  },
  sameAs: [
    "https://youtube.com/@jpearc7032",
    "https://www.facebook.com/share/1GSJYNe61R/",
    "https://www.instagram.com/earc.jp",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${dmSans.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
