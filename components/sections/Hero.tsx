"use client";

import Link from "next/link";
import { ArrowRight, GitBranch, Link2 } from "lucide-react";
import { siteConfig } from "@/data";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-20 pb-16 px-4 sm:px-6">
      {/* Grid background */}
      <div
        className="absolute inset-0 line-grid pointer-events-none"
        aria-hidden="true"
      />
      {/* Radial fade overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(34,211,238,0.05) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-6xl mx-auto">
        {/* Availability badge */}
        <div className="inline-flex items-center gap-2 mb-6 max-w-full">
          <div
            className="inline-flex items-center gap-2 rounded px-3 py-1.5 border text-xs font-mono max-w-full"
            style={{
              background: "var(--ac-glow)",
              borderColor: "var(--ac-border)",
              color: "var(--ac)",
              fontFamily: "var(--mono)",
              lineHeight: 1.35,
              maxWidth: "100%",
              padding: "0.375rem 0.875rem",
            }}
          >
            <span className="pulse-dot shrink-0" aria-hidden="true" />
            <span className="min-w-0 ">
              {siteConfig.availability}</span>
          </div>
        </div>

        {/* Name + headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-medium leading-tight mb-4">
          Leo Leong
          <br />
          <span style={{ color: "var(--ac)" }}>Software Engineer </span>
          <br />
        </h1>

        <p className="text-base sm:text-lg mb-1" style={{ color: "var(--t2)" }}>
          {siteConfig.tagline}
        </p>
        <p
          className="text-xs font-mono mb-6"
          style={{ color: "var(--t3)", fontFamily: "var(--mono)" }}
        >
          {/* // Cybersecurity &amp; Digital Forensics Graduate ·{" "}
          <span style={{ color: "var(--ac)" }}>
            Aspiring Computer Science Student
          </span> */}
        </p>

        <p
          className="text-sm leading-relaxed max-w-xl mb-8"
          style={{ color: "var(--t2)" }}
        >
          Cybersecurity & Digital forensic Diploma graduate from Temasek Polytechnic with hands-on experience
          building secure, full-stack applications. Interned at{" "}
          <span style={{ color: "var(--t1)", fontWeight: 500 }}>
            Trend Micro
          </span>
          . Currently serving NS and building projects in my own time.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-3 mb-10">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-medium px-5 py-2.5 rounded-lg transition-opacity hover:opacity-85"
            style={{ background: "var(--ac)", color: "var(--bg)" }}
          >
            View Projects
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-sm px-5 py-2.5 rounded-lg border transition-colors hover:opacity-80"
            style={{
              color: "var(--t1)",
              borderColor: "var(--b2)",
              background: "transparent",
            }}
          >
            Get in Touch
          </Link>
        </div>

        {/* Social links */}
        <div className="flex items-center gap-4">
          <Link
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs transition-colors"
            style={{ color: "var(--t3)" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--ac)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--t3)")
            }
            aria-label="GitHub profile"
          >
            <GitBranch size={14} aria-hidden="true" />
            GitHub
          </Link>
          <Link
            href={siteConfig.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs transition-colors"
            style={{ color: "var(--t3)" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--ac)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--t3)")
            }
            aria-label="LinkedIn profile"
          >
            <Link2 size={14} aria-hidden="true" />
            LinkedIn
          </Link>
        </div>
      </div>
    </section>
  );
}
