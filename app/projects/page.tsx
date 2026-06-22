"use client";

import Link from "next/link";
import { projects } from "@/data";
import { PageNav } from "@/components/layout/PageNav";

const sideProjects = projects.filter((p) => p.sideProject);

export default function ProjectsPage() {
  return (
    <div
      style={{
        background: "#15161A",
        minHeight: "100vh",
        fontFamily: "var(--font-sans, system-ui, sans-serif)",
      }}
    >
      <PageNav />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        {/* Page heading */}
        <div style={{ marginBottom: "5rem" }}>
          <p
            style={{
              fontSize: "0.75rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#d98e4f",
              marginBottom: "1rem",
              fontFamily: "var(--font-sans, system-ui, sans-serif)",
            }}
          >
            Selected work
          </p>
          <h1
            style={{
              fontFamily: "var(--font-serif, Georgia, serif)",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(2.5rem, 6vw, 4rem)",
              lineHeight: 1.1,
              color: "#f0ece4",
              letterSpacing: "-0.02em",
            }}
          >
            Projects
          </h1>
        </div>

        {/* Project list */}
        <div style={{ display: "flex", flexDirection: "column", gap: "6rem" }}>
          {sideProjects.map((project, i) => (
            <article key={project.id}>
              {/* Number + title row */}
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "1.5rem",
                  marginBottom: "1.5rem",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-serif, Georgia, serif)",
                    fontStyle: "italic",
                    fontSize: "0.875rem",
                    color: "#d98e4f",
                    flexShrink: 0,
                    lineHeight: 1,
                    paddingTop: "0.2em",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2
                  style={{
                    fontFamily: "var(--font-serif, Georgia, serif)",
                    fontWeight: 400,
                    fontStyle: "italic",
                    fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                    lineHeight: 1.1,
                    color: "#f0ece4",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {project.title}
                </h2>
              </div>

              {/* Description */}
              <p
                style={{
                  fontSize: "1rem",
                  lineHeight: 1.75,
                  color: "#9a9690",
                  maxWidth: "56ch",
                  marginBottom: "1.5rem",
                  marginLeft: "3.25rem",
                }}
              >
                {project.tagline ?? project.description}
              </p>

              {/* Tech stack */}
              <p
                style={{
                  fontSize: "0.75rem",
                  letterSpacing: "0.04em",
                  color: "#5c5955",
                  marginBottom: "1.5rem",
                  marginLeft: "3.25rem",
                }}
              >
                {project.techStack.join(" · ")}
              </p>

              {/* Links */}
              <div
                style={{
                  display: "flex",
                  gap: "1.5rem",
                  marginLeft: "3.25rem",
                }}
              >
                {project.githubUrl && (
                  <Link
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: "0.8125rem",
                      color: "#d98e4f",
                      textDecoration: "none",
                      borderBottom: "1px solid rgba(217,142,79,0.3)",
                      paddingBottom: "1px",
                      transition: "border-color 0.15s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.borderBottomColor = "#d98e4f")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.borderBottomColor =
                        "rgba(217,142,79,0.3)")
                    }
                  >
                    View code →
                  </Link>
                )}
                {project.liveUrl && (
                  <Link
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: "0.8125rem",
                      color: "#d98e4f",
                      textDecoration: "none",
                      borderBottom: "1px solid rgba(217,142,79,0.3)",
                      paddingBottom: "1px",
                      transition: "border-color 0.15s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.borderBottomColor = "#d98e4f")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.borderBottomColor =
                        "rgba(217,142,79,0.3)")
                    }
                  >
                    Live demo →
                  </Link>
                )}
              </div>

              {/* Divider */}
              {i < sideProjects.length - 1 && (
                <div
                  style={{
                    marginTop: "6rem",
                    height: "1px",
                    background: "rgba(255,255,255,0.06)",
                  }}
                />
              )}
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
