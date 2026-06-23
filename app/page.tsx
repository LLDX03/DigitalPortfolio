"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail, ArrowUpRight } from "lucide-react";
import { siteConfig, projects } from "@/data";

/* ── Inline SVG icons (lucide-react doesn't ship Github/Linkedin) ── */
function IconGitHub() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function IconLinkedIn() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function Hl({ children }: { children: React.ReactNode }) {
  return <span style={{ color: "#c9c4bc", fontWeight: 500 }}>{children}</span>;
}

/* ── Data ── */
const NAV = [
  { label: "About", id: "about" },
  { label: "Experience", id: "experience" },
  { label: "Projects", id: "projects" },
];

const sideProjects = projects.filter((p) => p.sideProject);

const work = [
  {
    id: "ns",
    period: "2025 – Present",
    role: "Vehicle Commander, Terrex ICV",
    company: "Singapore Armed Forces",
    url: null as string | null,
    description:
      "Serving as Vehicle Commander on the SAF Terrex ICV, responsible for leading the vehicle crew and dismounted infantry squad during operations. Manages real-time battlefield situational awareness via the Battlefield Management System (BMS), coordinates mission execution, and ensures crew and vehicle readiness.",
  },
  {
    id: "trend-micro",
    period: "Apr 2023 – Sep 2023",
    role: "Technical Intern",
    company: "Trend Micro",
    url: "https://www.trendmicro.com",
    description:
      "Conducted controlled malware and virus injection across isolated VM environments to stress-test Trend Micro's threat detection and remediation capabilities across multiple attack scenarios. Translated findings into POC documentation adopted by Sales Engineers for enterprise client presentations, bridging the gap between technical validation and commercial delivery.",
    tech: ["Cybersecurity", "VM Environments", "Technical Documentation"],
  },
];

const education = [
  {
    id: "tp",
    period: "Apr 2021 – May 2024",
    role: "Diploma in Cybersecurity & Digital Forensics",
    company: "Temasek Polytechnic",
    url: "https://www.tp.edu.sg",
    description:
      "Admitted to the Director's List for AY2021/2022. Achieved Distinctions in Network Technology and Coding & Development Project",
    tech: ["Cybersecurity", "Digital Forensics", "Node.js", "Azure", "IoT"],
  },
  {
    id: "olevel",
    period: "2016 – 2020",
    role: "Cambridge GCE O-Level",
    company: "Pasir Ris Secondary School",
    url: null as string | null,
    description:
      "Edusave Scholarship (2018, 2020). Edusave Certificate of Academic Achievement (2019). Li Kaiyan Progress Award (2020).",
  },
];

/* ── Page ── */
export default function Home() {
  const [active, setActive] = useState("about");
  const [mouse, setMouse] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    const move = (e: MouseEvent) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("section[data-section]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.getAttribute("data-section") ?? "about");
        });
      },
      { rootMargin: "-35% 0px -60% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Cursor spotlight */}
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
        <div className="portfolio-outer">

          {/* ── Left sticky panel ── */}
          <aside className="portfolio-left">
            <div className="portfolio-left-top">
              <div style={{ marginBottom: "1.5rem" }}>
                <h1 style={{
                  fontFamily: "var(--font-serif, Georgia, serif)",
                  fontStyle: "italic",
                  fontWeight: 400,
                  fontSize: "2rem",
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  color: "#f0ece4",
                  marginBottom: "0.5rem",
                }}>
                  Leo Leong
                </h1>
                <p style={{ fontSize: "0.9375rem", fontWeight: 500, color: "#d98e4f", marginBottom: "0.875rem" }}>
                  Software Engineer
                </p>
                <p style={{ fontSize: "0.875rem", lineHeight: 1.75, color: "#7a756e", maxWidth: "26ch" }}>
                  Side projects outside of work and school. Cybersecurity by Training — Software Engineering by Passion.
                </p>
              </div>

              {/* Availability dot */}
              <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", marginBottom: "2.75rem" }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#6fcf7a", flexShrink: 0, boxShadow: "0 0 6px rgba(111,207,122,0.55)" }} />
                <span style={{ fontSize: "0.75rem", color: "#4d4944" }}>Available Aug 2026</span>
              </div>

              {/* Nav */}
              <nav aria-label="Page sections">
                {NAV.map((item) => {
                  const isActive = active === item.id;
                  return (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                        padding: "0.4rem 0",
                        marginBottom: "0.25rem",
                        textDecoration: "none",
                        color: isActive ? "#f0ece4" : "#4d4944",
                        transition: "color 0.2s",
                      }}
                    >
                      <span style={{
                        display: "block",
                        height: "1px",
                        flexShrink: 0,
                        width: isActive ? "2.5rem" : "1.25rem",
                        background: isActive ? "#d98e4f" : "#2a2826",
                        transition: "width 0.2s, background 0.2s",
                      }} />
                      <span style={{ fontSize: "0.6875rem", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600 }}>
                        {item.label}
                      </span>
                    </a>
                  );
                })}
              </nav>
            </div>

            {/* Socials */}
            <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
              {[
                { href: siteConfig.github, icon: <IconGitHub />, label: "GitHub" },
                { href: siteConfig.linkedin, icon: <IconLinkedIn />, label: "LinkedIn" },
                { href: "/contact", icon: <Mail size={17} />, label: "Contact" },
              ].map(({ href, icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  style={{ color: "#38352f", transition: "color 0.15s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#d98e4f")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#38352f")}
                >
                  {icon}
                </a>
              ))}
            </div>
          </aside>

          {/* ── Right scrollable content ── */}
          <main className="portfolio-right">

            {/* ABOUT */}
            <section data-section="about" id="about" className="portfolio-section">
              <p className="section-label">About</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.125rem", marginBottom: "2rem" }}>
                <p style={{ fontSize: "0.9375rem", lineHeight: 1.8, color: "#8a857e" }}>
                  I&apos;m a Cybersecurity &amp; Digital Forensics diploma graduate from{" "}
                  <Hl>Temasek Polytechnic</Hl>, where I graduated on the Director&apos;s List with distinctions in networking and development. I interned at{" "}
                  <Hl>Trend Micro</Hl> as a technical intern, working alongside Sales Engineers and TAMs on client-facing cybersecurity solutions.
                </p>
                <p style={{ fontSize: "0.9375rem", lineHeight: 1.8, color: "#8a857e" }}>
                  I&apos;m currently serving National Service, using my spare time to build production-grade projects — a full-stack café platform with JWT auth and loyalty tiers, and a machine learning model that predicts HDB resale prices across Singapore. My goal is to pursue a{" "}
                  <Hl>Computer Science degree</Hl> and grow into a software engineer who thinks like a security specialist.
                </p>
                <p style={{ fontSize: "0.9375rem", lineHeight: 1.8, color: "#8a857e" }}>
                  When I&apos;m not coding, I&apos;m reading about system design, backend architecture, and the engineering decisions behind the products I use every day.
                </p>
              </div>
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
            </section>

            {/* EXPERIENCE */}
            <section data-section="experience" id="experience" className="portfolio-section">
              <p className="section-label">Experience</p>

              {/* Work */}
              <p style={{ fontSize: "0.6875rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#38352f", fontWeight: 600, marginBottom: "0.75rem" }}>
                Work
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "2rem" }}>
                {work.map((exp) => (
                  <ExperienceCard key={exp.id} exp={exp} />
                ))}
              </div>

              {/* Education */}
              <p style={{ fontSize: "0.6875rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#38352f", fontWeight: 600, marginBottom: "0.75rem" }}>
                Education
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {education.map((exp) => (
                  <ExperienceCard key={exp.id} exp={exp} />
                ))}
              </div>
              <Link
                href="/about"
                style={{
                  marginTop: "2.5rem",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.375rem",
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
                View full timeline <ArrowUpRight size={13} />
              </Link>
            </section>

            {/* PROJECTS */}
            <section data-section="projects" id="projects" className="portfolio-section">
              <p className="section-label">Projects</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {sideProjects.map((project, i) => (
                  <ProjectCard key={project.id} project={project} index={i} />
                ))}
              </div>
              <Link
                href="/projects"
                style={{
                  marginTop: "2.5rem",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.375rem",
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
                View all projects <ArrowUpRight size={13} />
              </Link>
            </section>

          </main>
        </div>
      </div>
    </>
  );
}

/* ── Sub-components ── */
function ExperienceCard({ exp }: { exp: (typeof work)[0] }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="card-grid"
      style={{
        padding: "1.25rem",
        borderRadius: "8px",
        background: hovered ? "rgba(217,142,79,0.04)" : "transparent",
        border: hovered ? "1px solid rgba(217,142,79,0.08)" : "1px solid transparent",
        transition: "background 0.2s, border-color 0.2s",
        cursor: "default",
      }}
    >
      <p className="card-period">{exp.period}</p>
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

function ProjectCard({ project, index }: { project: (typeof projects)[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="card-grid"
      style={{
        padding: "1.25rem",
        borderRadius: "8px",
        background: hovered ? "rgba(217,142,79,0.04)" : "transparent",
        border: hovered ? "1px solid rgba(217,142,79,0.08)" : "1px solid transparent",
        transition: "background 0.2s, border-color 0.2s",
        cursor: "default",
      }}
    >
      <p className="card-period" style={{
        fontFamily: "var(--font-serif, Georgia, serif)",
        fontStyle: "italic",
        fontSize: "0.9375rem",
        color: hovered ? "#d98e4f" : "#2e2c2a",
        transition: "color 0.2s",
      }}>
        {String(index + 1).padStart(2, "0")}
      </p>
      <div>
        {project.imageUrl && (
          <div style={{ marginBottom: "0.875rem", borderRadius: "6px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.05)" }}>
            <Image
              src={project.imageUrl}
              alt={project.title}
              width={600}
              height={338}
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </div>
        )}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap", marginBottom: "0.4rem" }}>
          <span style={{ fontSize: "0.9375rem", fontWeight: 500, color: "#e8e3db" }}>{project.title}</span>
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`GitHub — ${project.title}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                color: hovered ? "#d98e4f" : "#38352f",
                textDecoration: "none",
                transition: "color 0.15s",
              }}
            >
              <ArrowUpRight size={14} />
            </a>
          )}
        </div>
        <p style={{ fontSize: "0.875rem", lineHeight: 1.7, color: "#5c5955", marginBottom: "0.875rem" }}>
          {project.tagline ?? project.description}
        </p>
        <p style={{ fontSize: "0.6875rem", color: "#38352f", letterSpacing: "0.02em" }}>
          {project.techStack.join(" · ")}
        </p>
      </div>
    </div>
  );
}
