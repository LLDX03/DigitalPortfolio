"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { timeline } from "@/data";
import { PageNav } from "@/components/layout/PageNav";

const experiences = [
  {
    period: "2025 – Present",
    role: "Vehicle Commander, Terrex ICV",
    company: "Singapore Armed Forces",
    url: null as string | null,
    description:
      "Commanding a Terrex Infantry Carrier Vehicle during full-time National Service. Building production-grade projects in spare time — a full-stack café platform and an ML-powered HDB resale price predictor.",
    tech: ["Node.js", "PostgreSQL", "Python", "Machine Learning"],
  },
  {
    period: "Apr 2023 – Sep 2023",
    role: "Technical Intern",
    company: "Trend Micro",
    url: "https://www.trendmicro.com",
    description:
      "Injected controlled malware and viruses into isolated VM environments to validate product detection and remediation behaviour. Developed POC documentation used by Sales Engineers in enterprise client presentations.",
    tech: ["Cybersecurity", "VM Environments", "Technical Documentation"],
  },
];

export default function AboutPage() {
  const [mouse, setMouse] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    const move = (e: MouseEvent) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <>
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          background: `radial-gradient(700px at ${mouse.x}px ${mouse.y}px, rgba(217,142,79,0.07) 0%, transparent 75%)`,
        }}
      />

      <div style={{ background: "#15161A", minHeight: "100vh", fontFamily: "var(--font-sans, system-ui, sans-serif)", position: "relative", zIndex: 1 }}>
        <PageNav />
        <div style={{ maxWidth: "720px", margin: "0 auto", padding: "4rem 1.5rem 6rem" }}>

          {/* Heading */}
          <h1
            style={{
              fontFamily: "var(--font-serif, Georgia, serif)",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(2.25rem, 6vw, 3.5rem)",
              lineHeight: 1.1,
              color: "#f0ece4",
              letterSpacing: "-0.02em",
              marginBottom: "1rem",
            }}
          >
            Experience
          </h1>
          <p style={{ fontSize: "0.9375rem", lineHeight: 1.75, color: "#5c5955", marginBottom: "4rem", maxWidth: "48ch" }}>
            Where I&apos;ve worked and what I&apos;ve studied — the full picture.
          </p>

          {/* Work experience */}
          <section style={{ marginBottom: "5rem" }}>
            <p style={{ fontSize: "0.6875rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#d98e4f", marginBottom: "1.75rem", fontWeight: 600 }}>
              Work
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {experiences.map((exp) => (
                <ExperienceCard key={exp.role} exp={exp} />
              ))}
            </div>
          </section>

          {/* Full timeline */}
          <section>
            <p style={{ fontSize: "0.6875rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#d98e4f", marginBottom: "1.75rem", fontWeight: 600 }}>
              Timeline
            </p>
            <ol style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {timeline.map((item, idx) => (
                <li key={idx} style={{ display: "flex", gap: "1.5rem", marginBottom: idx < timeline.length - 1 ? "0" : "0" }}>
                  {/* Line + dot */}
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                    <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#d98e4f", marginTop: "0.35rem", flexShrink: 0 }} />
                    {idx < timeline.length - 1 && (
                      <div style={{ width: 1, flex: 1, background: "rgba(255,255,255,0.05)", marginTop: "0.4rem", marginBottom: "0.4rem", minHeight: "2rem" }} />
                    )}
                  </div>

                  {/* Content */}
                  <div style={{ paddingBottom: idx < timeline.length - 1 ? "2rem" : 0 }}>
                    <p style={{ fontSize: "0.6875rem", color: "#4d4944", letterSpacing: "0.03em", marginBottom: "0.3rem" }}>
                      {item.year}
                    </p>
                    <p style={{ fontSize: "0.9375rem", fontWeight: 500, color: "#e8e3db", marginBottom: item.org ? "0.2rem" : "0.5rem" }}>
                      {item.title}
                    </p>
                    {item.org && (
                      <p style={{ fontSize: "0.8125rem", color: "#d98e4f", marginBottom: "0.5rem" }}>
                        {item.org}
                      </p>
                    )}
                    <p style={{ fontSize: "0.875rem", lineHeight: 1.7, color: "#5c5955" }}>
                      {item.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* Resume */}
          <div style={{ marginTop: "4rem", paddingTop: "3rem", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
            <a
              href="/Leo_Leong.pdf"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                fontSize: "0.8125rem",
                fontWeight: 500,
                color: "#f0ece4",
                textDecoration: "none",
                letterSpacing: "0.02em",
                transition: "color 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#d98e4f")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#f0ece4")}
            >
              <ArrowUpRight size={13} />
              View Résumé
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

function ExperienceCard({ exp }: { exp: (typeof experiences)[0] }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "grid",
        gridTemplateColumns: "7rem 1fr",
        gap: "1rem",
        padding: "1.25rem",
        borderRadius: "8px",
        background: hovered ? "rgba(217,142,79,0.04)" : "transparent",
        border: hovered ? "1px solid rgba(217,142,79,0.08)" : "1px solid transparent",
        transition: "background 0.2s, border-color 0.2s",
      }}
    >
      <p style={{ fontSize: "0.6875rem", color: "#4d4944", letterSpacing: "0.03em", lineHeight: 1.5, paddingTop: "0.2rem" }}>
        {exp.period}
      </p>
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", flexWrap: "wrap", marginBottom: "0.35rem" }}>
          <span style={{ fontSize: "0.9375rem", fontWeight: 500, color: "#e8e3db" }}>{exp.role}</span>
          {exp.url ? (
            <a
              href={exp.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.2rem",
                fontSize: "0.9375rem",
                color: hovered ? "#d98e4f" : "#6b6660",
                textDecoration: "none",
                transition: "color 0.15s",
              }}
            >
              · {exp.company} <ArrowUpRight size={12} />
            </a>
          ) : (
            <span style={{ fontSize: "0.9375rem", color: "#4d4944" }}>· {exp.company}</span>
          )}
        </div>
        <p style={{ fontSize: "0.875rem", lineHeight: 1.7, color: "#5c5955", marginBottom: "0.875rem" }}>
          {exp.description}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem" }}>
          {exp.tech.map((t) => (
            <span key={t} style={{
              fontSize: "0.6875rem",
              fontWeight: 500,
              color: "#d98e4f",
              background: "rgba(217,142,79,0.08)",
              borderRadius: "4px",
              padding: "0.2rem 0.55rem",
              letterSpacing: "0.02em",
            }}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
