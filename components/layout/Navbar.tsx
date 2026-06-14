"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { navLinks, siteConfig } from "@/data";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 border-b"
      style={{
        background: "rgba(10,14,23,0.97)",
        backdropFilter: "blur(12px)",
        borderColor: "var(--ac-border)",
      }}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
        {/* Logo */}
        <Link
          href="/"
          className="font-mono text-sm shrink-0 transition-opacity hover:opacity-80"
          style={{ color: "var(--ac)", fontFamily: "var(--mono)" }}
          aria-label="Leo Leong — home"
        >
          &lt;<span style={{ color: "var(--t2)" }}>Leo</span>Leong /&gt;
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-xs px-3 py-1.5 rounded-md border-b border-transparent transition-all duration-150",
                  isActive
                    ? "border-b-[var(--ac)]"
                    : "hover:border-b-[var(--ac)]"
                )}
                style={{
                  color: isActive ? "var(--ac)" : "var(--t2)",
                  borderBottomColor: isActive ? "var(--ac)" : "transparent",
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/contact"
            className="text-xs font-medium border rounded-md px-3 py-1.5 transition-colors duration-150"
            style={{
              color: "var(--ac)",
              borderColor: "var(--ac-border)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "var(--ac-glow)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "transparent")
            }
          >
            Hire Me
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 rounded-md transition-colors"
          style={{ color: "var(--t2)" }}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="md:hidden border-t px-4 py-3 flex flex-col gap-1"
          style={{
            background: "var(--bg2)",
            borderColor: "var(--b1)",
          }}
        >
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm py-2 px-3 rounded-md transition-colors"
                style={{
                  color: isActive ? "var(--ac)" : "var(--t2)",
                  background: isActive ? "var(--ac-glow)" : "transparent",
                }}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/contact"
            onClick={() => setMobileOpen(false)}
            className="mt-2 text-sm font-medium text-center border rounded-md py-2 px-3"
            style={{ color: "var(--ac)", borderColor: "var(--ac-border)" }}
          >
            Hire Me
          </Link>
        </div>
      )}
    </header>
  );
}
