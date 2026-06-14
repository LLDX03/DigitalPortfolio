import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { siteConfig } from "@/data";

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} — Software Engineer & Cybersecurity Specialist`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Leo Leong","Software Engineer","Cybersecurity","Digital Forensics",
    "Node.js","Express","PostgreSQL","Temasek Polytechnic","Singapore",
    "Full Stack Developer","OWASP","Penetration Testing",
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
    <html lang="en">
      <body className="antialiased min-h-screen" style={{ background: "var(--bg)", color: "var(--t1)" }}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
