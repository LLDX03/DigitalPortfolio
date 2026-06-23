"use client";

import { useState, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { PageNav } from "@/components/layout/PageNav";

const work = [
  {
    period: "2025 – Present",
    role: "Vehicle Commander, Terrex ICV",
    company: "Singapore Armed Forces",
    url: null as string | null,
    description:
      "Commands a Terrex ICV independently, using the Battlefield Management System's live camera and map to direct the operator through each mission. When recon falls short and unexpected obstacles emerge on the ground, the decision falls on me alone in real time.",
  },
  {
    period: "Apr 2023 – Sep 2023",
    role: "Technical Intern",
    company: "Trend Micro",
    url: "https://www.trendmicro.com",
    description:
      "Conducted controlled malware and virus injection across isolated VM environments to stress-test Trend Micro's threat detection and remediation capabilities across multiple attack scenarios. Translated findings into POC documentation adopted by Sales Engineers for enterprise client presentations, bridging the gap between technical validation and commercial delivery. Independently built a Python script that automated client email outreach, reducing manual effort for the Sales Engineering team.",
    tech: ["Cybersecurity", "VM Environments", "Python", "Technical Documentation"],
  },
  {
    period: "2019 – 2024",
    role: "Part-Time Roles",
    company: "Retail · Banquet · F&B · Warehouse",
    url: null as string | null,
    description:
      "Worked across retail, banquet, F&B, and warehouse environments simultaneously with studies. Handled customer escalations, managed high-volume service under time pressure, and coordinated logistics in fast-paced operations. Developed the reliability and composure that formal education doesn't teach.",
  },
];

const education = [
  {
    period: "Apr 2021 – May 2024",
    role: "Diploma in Cybersecurity & Digital Forensics",
    company: "Temasek Polytechnic",
    url: "https://www.tp.edu.sg",
    description:
      "Admitted to the Director's List for AY2021/2022. Achieved Distinctions in Network Technology and Coding & Development Project",
  },
  {
    period: "2016 – 2020",
    role: "Cambridge GCE O-Level",
    company: "Pasir Ris Secondary School",
    url: null as string | null,
    description:
      "Edusave Scholarship (2018, 2020). Edusave Certificate of Academic Achievement (2019). Li Kaiyan Progress Award (2020).",
  },
  {
    period: "Upcoming",
    role: "Bachelor of Computer Science",
    company: "",
    url: null as string | null,
    description:
      "Pursuing a Bachelor of Computer Science from August 2026 to deepen software engineering foundations and complement cybersecurity expertise.",
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

          {/* Work */}
          <section style={{ marginBottom: "3.5rem" }}>
            <p style={{ fontSize: "0.6875rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#d98e4f", marginBottom: "1.25rem", fontWeight: 600 }}>
              Work
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {work.map((exp) => (
                <ExperienceCard key={exp.role} exp={exp} />
              ))}
            </div>
          </section>

          {/* Education */}
          <section style={{ marginBottom: "4rem" }}>
            <p style={{ fontSize: "0.6875rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#d98e4f", marginBottom: "1.25rem", fontWeight: 600 }}>
              Education
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {education.map((exp) => (
                <ExperienceCard key={exp.role} exp={exp} />
              ))}
            </div>
          </section>

          {/* Resume */}
          <div style={{ paddingTop: "3rem", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
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

function ExperienceCard({ exp }: { exp: (typeof work)[0] }) {
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
          ) : exp.company ? (
            <span style={{ fontSize: "0.9375rem", color: "#4d4944" }}>· {exp.company}</span>
          ) : null}
        </div>
        <p style={{ fontSize: "0.875rem", lineHeight: 1.7, color: "#5c5955", marginBottom: exp.tech?.length ? "0.875rem" : 0 }}>
          {exp.description}
        </p>
        {exp.tech && exp.tech.length > 0 && (
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
        )}
      </div>
    </div>
  );
}
