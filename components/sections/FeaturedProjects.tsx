import Link from "next/link";
import { ExternalLink, GitBranch, ArrowRight, Lock } from "lucide-react";
import { projects } from "@/data";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Tag } from "@/components/ui/Tag";
import { Badge } from "@/components/ui/Badge";

export function FeaturedProjects() {
  const featured = projects.filter((p) => p.featured);

  return (
    <section className="py-16 px-4 sm:px-6" aria-labelledby="featured-title">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-8">
          <SectionHeader title="Featured projects" sub="selected work" className="mb-0" />
          <Link
            href="/projects"
            className="hidden sm:inline-flex items-center gap-1 text-xs transition-colors"
            style={{ color: "var(--t3)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ac)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--t3)")}
          >
            All projects <ArrowRight size={12} aria-hidden="true" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {featured.map((project) => (
            <article
              key={project.id}
              className="rounded-xl border p-5 transition-all duration-200 group"
              style={{
                background: "var(--bg3)",
                borderColor: "var(--b1)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor =
                  "var(--ac-border)";
                (e.currentTarget as HTMLElement).style.background =
                  "var(--bg4)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor =
                  "var(--b1)";
                (e.currentTarget as HTMLElement).style.background =
                  "var(--bg3)";
              }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <Badge>{project.category}</Badge>
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
                      aria-label={`GitHub: ${project.title}`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <GitBranch size={14} aria-hidden="true" />
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
                      aria-label={`Live demo: ${project.title}`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink size={14} aria-hidden="true" />
                    </Link>
                  )}
                </div>
              </div>

              <h3 className="text-sm font-medium mb-2" style={{ color: "var(--t1)" }}>
                {project.title}
              </h3>
              <p className="text-xs leading-relaxed mb-3" style={{ color: "var(--t2)" }}>
                {project.description}
              </p>

              {/* Security note */}
              {project.securityNotes.length > 0 && (
                <div
                  className="flex items-start gap-1.5 mb-3 text-xs font-mono"
                  style={{ color: "var(--t3)", fontFamily: "var(--mono)" }}
                >
                  <Lock size={10} className="mt-0.5 shrink-0" aria-hidden="true" style={{ color: "var(--ac)" }} />
                  <span>
                    {project.securityNotes.slice(0, 2).join(" · ")}
                  </span>
                </div>
              )}

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {project.techStack.slice(0, 5).map((tech) => (
                  <Tag key={tech}>{tech}</Tag>
                ))}
                {project.techStack.length > 5 && (
                  <Tag>+{project.techStack.length - 5}</Tag>
                )}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-6 sm:hidden">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1 text-xs"
            style={{ color: "var(--ac)" }}
          >
            All projects <ArrowRight size={12} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
