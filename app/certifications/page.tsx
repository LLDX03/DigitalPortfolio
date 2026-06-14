import type { Metadata } from "next";
import { Award, Star, Trophy } from "lucide-react";
import { certifications, achievements } from "@/data";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "Certifications",
  description:
    "Leo Leong's certifications, academic achievements, and awards — AWS, NDG Linux, Temasek Polytechnic Diploma, Trend Micro internship, Director's List.",
};

const typeColor: Record<string, { bg: string; text: string; border: string }> = {
  Certification: {
    bg: "rgba(34,211,238,0.08)",
    text: "var(--ac)",
    border: "var(--ac-border)",
  },
  Academic: {
    bg: "rgba(168,85,247,0.08)",
    text: "#c084fc",
    border: "rgba(168,85,247,0.2)",
  },
  Internship: {
    bg: "rgba(239,68,68,0.07)",
    text: "#fca5a5",
    border: "rgba(239,68,68,0.2)",
  },
  Course: {
    bg: "rgba(251,191,36,0.07)",
    text: "#fcd34d",
    border: "rgba(251,191,36,0.2)",
  },
};

const achievementIcons = [Award, Star, Award, Trophy, Trophy];

export default function CertificationsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <SectionHeader
        title="Certifications & achievements"
        sub="credentials & recognition"
      />

      {/* Cert cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        {certifications.map((cert) => {
          const colors = typeColor[cert.type] ?? typeColor["Certification"];
          return (
            <div
              key={cert.id}
              className="rounded-xl border p-5 transition-colors duration-200"
              style={{
                background: cert.highlight
                  ? colors.bg
                  : "var(--bg3)",
                borderColor: cert.highlight ? colors.border : "var(--b1)",
              }}
            >
              <span
                className="text-xs font-mono inline-block rounded px-2 py-0.5 mb-3"
                style={{
                  background: colors.bg,
                  color: colors.text,
                  border: `0.5px solid ${colors.border}`,
                  fontFamily: "var(--mono)",
                }}
              >
                {cert.type}
              </span>
              <h3
                className="text-sm font-medium mb-1"
                style={{ color: "var(--t1)" }}
              >
                {cert.name}
              </h3>
              <p className="text-xs mb-1" style={{ color: colors.text }}>
                {cert.issuer}
              </p>
              <p
                className="text-xs font-mono"
                style={{ color: "var(--t3)", fontFamily: "var(--mono)" }}
              >
                {cert.date}
              </p>
            </div>
          );
        })}
      </div>

      {/* Academic achievements */}
      <div
        className="rounded-xl border p-5"
        style={{
          background: "rgba(34,211,238,0.03)",
          borderColor: "var(--ac-border)",
        }}
      >
        <h2 className="text-base font-medium mb-4" style={{ color: "var(--t1)" }}>
          Academic achievements
        </h2>
        <ul className="space-y-3">
          {achievements.map((ach, idx) => {
            const Icon = achievementIcons[idx] ?? Award;
            return (
              <li
                key={ach}
                className="flex items-start gap-3 text-sm"
                style={{ color: "var(--t2)" }}
              >
                <Icon
                  size={15}
                  className="shrink-0 mt-0.5"
                  style={{ color: "var(--ac)" }}
                  aria-hidden="true"
                />
                {ach}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
