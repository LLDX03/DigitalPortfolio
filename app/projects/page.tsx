"use client";

import { useState } from "react";
import Link from "next/link";
import { GitBranch, ExternalLink, Lock, ChevronDown, ChevronUp } from "lucide-react";
import { projects, type ProjectCategory } from "@/data";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Tag } from "@/components/ui/Tag";
import { Badge } from "@/components/ui/Badge";

const CATEGORIES: ProjectCategory[] = [
  "All",
  "Full Stack",
  "Cybersecurity",
  "IoT / Cloud",
  "Networking",
  "Data",
];

function CodeBlock({ code }: { code: string }) {
  const tokens = code.split(/(\b(?:const|async|await|return|new|try|catch|if)\b|\/\/[^\n]*|'[^']*'|"[^"]*"|\d+)/g);
  return (
    <pre className="code-block text-xs overflow-x-auto" tabIndex={0} aria-label="Code snippet">
      {tokens.map((token, i) => {
        if (/^(const|async|await|return|new|try|catch|if)$/.test(token))
          return <span key={i} className="code-kw">{token}</span>;
        if (token.startsWith("//"))
          return <span key={i} className="code-cm">{token}</span>;
        if (/^['"]/.test(token))
          return <span key={i} className="code-st">{token}</span>;
        if (/^\d+$/.test(token))
          return <span key={i} className="code-nu">{token}</span>;
        return token;
      })}
    </pre>
  );
}

function ProjectCard({ project }: { project: (typeof projects)[0] }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article
      className="rounded-xl border overflow-hidden transition-colors duration-200"
      style={{ background: "var(--bg3)", borderColor: "var(--b1)" }}
    >
      {/* Card header */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div>
            <Badge>{project.category}</Badge>
            <p
              className="text-xs font-mono mt-1.5"
              style={{ color: "var(--t3)", fontFamily: "var(--mono)" }}
            >
              {project.badge}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {project.githubUrl && (
              <Link
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded transition-colors"
                style={{ color: "var(--t3)" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--ac)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--t3)")
                }
                aria-label={`GitHub repository for ${project.title}`}
              >
                <GitBranch size={15} aria-hidden="true" />
              </Link>
            )}
            {project.liveUrl && (
              <Link
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded transition-colors"
                style={{ color: "var(--t3)" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--ac)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--t3)")
                }
                aria-label={`Live demo for ${project.title}`}
              >
                <ExternalLink size={15} aria-hidden="true" />
              </Link>
            )}
          </div>
        </div>

        <h3 className="text-base font-medium mb-2" style={{ color: "var(--t1)" }}>
          {project.title}
        </h3>
        <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--t2)" }}>
          {project.description}
        </p>

        {/* Security notes */}
        {project.securityNotes.length > 0 && (
          <div
            className="flex items-start gap-2 mb-3 p-2.5 rounded-lg text-xs font-mono"
            style={{
              background: "rgba(34,211,238,0.04)",
              borderLeft: "2px solid var(--ac)",
              color: "var(--t3)",
              fontFamily: "var(--mono)",
            }}
          >
            <Lock size={10} className="mt-0.5 shrink-0" style={{ color: "var(--ac)" }} aria-hidden="true" />
            <span>{project.securityNotes.slice(0, 2).join(" · ")}</span>
          </div>
        )}

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.techStack.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>

        {/* Code snippet preview */}
        {project.codeSnippet && (
          <div className="mb-3">
            <CodeBlock code={project.codeSnippet.code} />
          </div>
        )}

        {/* Expand toggle */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="inline-flex items-center gap-1 text-xs transition-colors"
          style={{ color: "var(--t3)" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ac)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--t3)")}
          aria-expanded={expanded}
          aria-controls={`case-study-${project.id}`}
        >
          {expanded ? (
            <>
              Hide case study <ChevronUp size={12} aria-hidden="true" />
            </>
          ) : (
            <>
              View full case study <ChevronDown size={12} aria-hidden="true" />
            </>
          )}
        </button>
      </div>

      {/* Expanded case study */}
      {expanded && (
        <div
          id={`case-study-${project.id}`}
          className="border-t px-5 py-5 space-y-5"
          style={{ borderColor: "var(--b1)" }}
        >
          {[
            { label: "Overview", content: project.overview },
            { label: "Problem statement", content: project.problem },
            { label: "Technical architecture", content: project.architecture },
          ].map(({ label, content }) => (
            <div key={label}>
              <p
                className="text-xs font-mono mb-1.5"
                style={{ color: "var(--ac)", fontFamily: "var(--mono)" }}
              >
                // {label.toLowerCase()}
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "var(--t2)" }}>
                {content}
              </p>
            </div>
          ))}

          {/* All security notes */}
          <div>
            <p
              className="text-xs font-mono mb-2"
              style={{ color: "var(--ac)", fontFamily: "var(--mono)" }}
            >
              // security considerations
            </p>
            <ul className="space-y-1">
              {project.securityNotes.map((note) => (
                <li
                  key={note}
                  className="flex items-start gap-2 text-xs"
                  style={{ color: "var(--t2)" }}
                >
                  <Lock size={10} className="mt-0.5 shrink-0" style={{ color: "var(--ac)" }} aria-hidden="true" />
                  {note}
                </li>
              ))}
            </ul>
          </div>

          {/* Challenges */}
          <div>
            <p
              className="text-xs font-mono mb-2"
              style={{ color: "var(--ac)", fontFamily: "var(--mono)" }}
            >
              // challenges faced
            </p>
            <ul className="space-y-1">
              {project.challenges.map((c) => (
                <li key={c} className="text-xs flex items-start gap-2" style={{ color: "var(--t2)" }}>
                  <span style={{ color: "var(--t3)" }}>→</span> {c}
                </li>
              ))}
            </ul>
          </div>

          {/* Lessons */}
          <div>
            <p
              className="text-xs font-mono mb-2"
              style={{ color: "var(--ac)", fontFamily: "var(--mono)" }}
            >
              // lessons learned
            </p>
            <ul className="space-y-1">
              {project.lessons.map((l) => (
                <li key={l} className="text-xs flex items-start gap-2" style={{ color: "var(--t2)" }}>
                  <span style={{ color: "var(--t3)" }}>→</span> {l}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </article>
  );
}

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("All");

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <SectionHeader title="Projects" sub="case studies & builds" />

      {/* Filter row */}
      <div className="flex flex-wrap gap-2 mb-8" role="group" aria-label="Filter projects by category">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className="text-xs font-mono rounded px-3 py-1.5 border transition-all duration-150"
            style={{
              fontFamily: "var(--mono)",
              color: activeCategory === cat ? "var(--ac)" : "var(--t3)",
              borderColor: activeCategory === cat ? "var(--ac-border)" : "var(--b1)",
              background: activeCategory === cat ? "var(--ac-glow)" : "var(--bg3)",
            }}
            aria-pressed={activeCategory === cat}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Project grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {filtered.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-sm text-center py-16" style={{ color: "var(--t3)" }}>
          No projects in this category yet.
        </p>
      )}
    </div>
  );
}
