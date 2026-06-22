"use client";

import Link from "next/link";

export function PageNav() {
  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "rgba(21,22,26,0.85)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "0 1.5rem",
          height: "52px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-serif, Georgia, serif)",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "1.125rem",
            color: "#f0ece4",
            textDecoration: "none",
            letterSpacing: "-0.01em",
            transition: "color 0.15s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#d98e4f")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#f0ece4")}
        >
          Leo Leong
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: "1.75rem" }}>
          {[
            { label: "About", href: "/about" },
            { label: "Projects", href: "/projects" },
            { label: "Contact", href: "/contact" },
          ].map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              style={{
                fontSize: "0.8125rem",
                color: "#4d4944",
                textDecoration: "none",
                transition: "color 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#f0ece4")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#4d4944")}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
