import type { Metadata } from "next";
import { Newsreader, Inter } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/data";

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} — Software Engineer & Cybersecurity Specialist`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Leo Leong", "Software Engineer", "Cybersecurity", "Digital Forensics",
    "Node.js", "Express", "PostgreSQL", "Temasek Polytechnic", "Singapore",
    "Full Stack Developer", "OWASP", "Penetration Testing",
  ],
  authors: [{ name: siteConfig.fullName }],
  creator: siteConfig.fullName,
  openGraph: {
    type: "website",
    locale: "en_SG",
    url: "https://leoleong.dev",
    title: `${siteConfig.name} — Software Engineer & Cybersecurity Specialist`,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${newsreader.variable} ${inter.variable}`}>
      <body className="antialiased min-h-screen" style={{ background: "#15161A", color: "#f0ece4" }}>
        {children}
      </body>
    </html>
  );
}
