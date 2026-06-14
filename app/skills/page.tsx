import type { Metadata } from "next";
import { Code2, Shield, Layers, Bug, Cloud, BarChart2 } from "lucide-react";
import { skillCategories } from "@/data";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SkillBar } from "@/components/ui/SkillBar";
import { Tag } from "@/components/ui/Tag";

export const metadata: Metadata = {
  title: "Skills",
  description:
    "Leo Leong's technical skills — software engineering, cybersecurity, penetration testing, cloud infrastructure, and digital forensics.",
};

const iconMap: Record<string, React.ElementType> = {
  code: Code2,
  shield: Shield,
  layers: Layers,
  bug: Bug,
  cloud: Cloud,
  "bar-chart": BarChart2,
};

const owasp = [
  "A01 – Broken Access Control",
  "A02 – Cryptographic Failures",
  "A03 – Injection",
  "A05 – Security Misconfiguration",
  "A06 – Vulnerable Components",
  "A07 – Auth Failures",
  "A09 – Logging Failures",
  "A10 – SSRF",
];

const secPractices = [
  "HTTPS / SSL",
  "Secure HTTP Headers",
  "Content Security Policy",
  "Input Validation",
  "Output Sanitisation",
  "CSRF Protection",
  "Rate Limiting",
  "JWT (httpOnly cookies)",
  "bcrypt Hashing",
  "Environment Secrets",
  ".env Management",
  "Principle of Least Privilege",
];

export default function SkillsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <SectionHeader title="Skills & technologies" sub="tools of the trade" />

      {/* Main skill grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
        {skillCategories.map((cat) => {
          const Icon = iconMap[cat.icon] ?? Code2;
          return (
            <div
              key={cat.id}
              className="rounded-xl border p-5"
              style={{ background: "var(--bg3)", borderColor: "var(--b1)" }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Icon size={17} style={{ color: "var(--ac)" }} aria-hidden="true" />
                <h2 className="text-sm font-medium" style={{ color: "var(--t1)" }}>
                  {cat.label}
                </h2>
              </div>

              {cat.skills && cat.skills.map((s) => (
                <SkillBar key={s.name} name={s.name} level={s.level} />
              ))}

              {cat.tags && (
                <div className="flex flex-wrap gap-2">
                  {cat.tags.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* OWASP Top 10 */}
      <div
        className="rounded-xl border p-5 mb-5"
        style={{
          background: "rgba(34,211,238,0.03)",
          borderColor: "var(--ac-border)",
        }}
      >
        <div className="flex items-center gap-2 mb-3">
          <Shield size={16} style={{ color: "var(--ac)" }} aria-hidden="true" />
          <h2 className="text-sm font-medium" style={{ color: "var(--t1)" }}>
            OWASP Top 10 — Awareness &amp; Application
          </h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {owasp.map((o) => (
            <Tag key={o}>{o}</Tag>
          ))}
        </div>
      </div>

      {/* Secure development practices */}
      <div
        className="rounded-xl border p-5"
        style={{ background: "var(--bg3)", borderColor: "var(--b1)" }}
      >
        <div className="flex items-center gap-2 mb-3">
          <Shield size={16} style={{ color: "var(--ac)" }} aria-hidden="true" />
          <h2 className="text-sm font-medium" style={{ color: "var(--t1)" }}>
            Secure Development Practices
          </h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {secPractices.map((s) => (
            <Tag key={s}>{s}</Tag>
          ))}
        </div>
      </div>
    </div>
  );
}
