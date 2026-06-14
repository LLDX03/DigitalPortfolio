"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/data";

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 50,
      background: "rgba(10,14,23,0.97)",
      backdropFilter: "blur(12px)",
      borderBottom: "0.5px solid var(--ac-border)",
    }}>
      <nav style={{
        maxWidth: "72rem", margin: "0 auto",
        padding: "0 1.5rem",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: "56px",
      }}>
        {/* Logo */}
        <Link href="/" style={{
          color: "var(--ac)", fontFamily: "var(--mono)",
          fontSize: "13px", flexShrink: 0, textDecoration: "none",
        }}>
          &lt;<span style={{ color: "var(--t2)" }}>Leo</span>Leong /&gt;
        </Link>

        {/* Desktop links */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          {navLinks.map((link) => {
            const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link key={link.href} href={link.href} style={{
                color: isActive ? "var(--ac)" : "var(--t2)",
                fontSize: "13px",
                padding: "5px 12px",
                borderRadius: "6px",
                borderBottom: isActive ? "1.5px solid var(--ac)" : "1.5px solid transparent",
                transition: "color 0.15s, border-color 0.15s",
                whiteSpace: "nowrap",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--ac)"; }}
              onMouseLeave={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.color = "var(--t2)"; }}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* CTA */}
        <Link href="/contact" style={{
          color: "var(--ac)", fontSize: "12px", fontWeight: 500,
          border: "1px solid var(--ac-border)", borderRadius: "6px",
          padding: "5px 14px", flexShrink: 0, textDecoration: "none",
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--ac-glow)"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
        >
          Hire Me
        </Link>
      </nav>

      {/* Mobile menu — hidden on desktop via inline style logic if needed */}
      {mobileOpen && (
        <div style={{
          background: "var(--bg2)", borderTop: "0.5px solid var(--b1)",
          padding: "0.75rem 1.5rem", display: "flex", flexDirection: "column", gap: "0.25rem",
        }}>
          {navLinks.map((link) => {
            const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link key={link.href} href={link.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  color: isActive ? "var(--ac)" : "var(--t2)",
                  fontSize: "14px", padding: "8px 12px", borderRadius: "6px",
                  background: isActive ? "var(--ac-glow)" : "transparent",
                  textDecoration: "none",
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
