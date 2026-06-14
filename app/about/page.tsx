import type { Metadata } from "next";
import Link from "next/link";
import { Download, MapPin, Building2 } from "lucide-react";
import { siteConfig, timeline } from "@/data";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Tag } from "@/components/ui/Tag";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Leo Leong — Cybersecurity & Digital Forensics graduate from Temasek Polytechnic, former Trend Micro intern, aspiring software engineer.",
};

const interests = [
  "Secure Software Development",
  "Backend Systems",
  "Digital Forensics",
  "Cloud Security",
  "Penetration Testing",
  "System Design",
  "Computer Science",
];

export default function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <SectionHeader title="About me" sub="background & journey" />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
        {/* Left — profile card */}
        <div className="lg:col-span-2">
          {/* Avatar */}
          <div
            className="w-16 h-16 rounded-xl flex items-center justify-center text-xl font-mono font-medium mb-4 border"
            style={{
              background: "var(--ac-glow)",
              borderColor: "var(--ac-border)",
              color: "var(--ac)",
              fontFamily: "var(--mono)",
            }}
            aria-hidden="true"
          >
            LL
          </div>

          <h2 className="text-lg font-medium mb-0.5" style={{ color: "var(--t1)" }}>
            {siteConfig.fullName}
          </h2>
          <p className="text-xs font-mono mb-4" style={{ color: "var(--ac)", fontFamily: "var(--mono)" }}>
            Software Engineer // Cybersecurity Specialist
          </p>

          <div className="flex items-center gap-2 mb-4 text-xs" style={{ color: "var(--t3)" }}>
            <MapPin size={12} aria-hidden="true" />
            Singapore
          </div>

          {/* Trend Micro badge */}
          <div
            className="inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-xs mb-5"
            style={{
              background: "rgba(239,68,68,0.07)",
              borderColor: "rgba(239,68,68,0.2)",
              color: "#fca5a5",
            }}
          >
            <Building2 size={12} aria-hidden="true" />
            Former Technical Intern · Trend Micro
          </div>

          <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--t2)" }}>
            Diploma graduate in Cybersecurity &amp; Digital Forensics from
            Temasek Polytechnic, with real-world experience at Trend Micro and a
            strong drive to build practical, secure software.
          </p>
          <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--t2)" }}>
            Currently serving NS, I build production-grade projects in my own
            time to stay sharp. My goal: pursue a Computer Science degree and
            grow into a software engineer who thinks like a security specialist.
          </p>

          {/* Interests */}
          <div
            className="rounded-xl border p-4 mb-5"
            style={{ background: "var(--bg3)", borderColor: "var(--b1)" }}
          >
            <p
              className="text-xs font-mono mb-3"
              style={{ color: "var(--t3)", fontFamily: "var(--mono)" }}
            >
              // <span style={{ color: "var(--ac)" }}>interests</span>
            </p>
            <div className="flex flex-wrap gap-2">
              {interests.map((i) => (
                <Tag key={i}>{i}</Tag>
              ))}
            </div>
          </div>

          {/* Resume download */}
          <a
            href="/Leo_Leong_Resume.pdf"
            download
            className="inline-flex items-center gap-2 text-sm border rounded-lg px-4 py-2.5 transition-colors"
            style={{
              color: "var(--ac)",
              borderColor: "var(--ac-border)",
              background: "var(--ac-glow)",
            }}
          >
            <Download size={14} aria-hidden="true" />
            Download Résumé
          </a>
        </div>

        {/* Right — timeline */}
        <div className="lg:col-span-3">
          <p
            className="text-xs font-mono mb-6"
            style={{ color: "var(--t3)", fontFamily: "var(--mono)" }}
          >
            // <span style={{ color: "var(--ac)" }}>career journey</span>
          </p>

          <ol className="relative">
            {timeline.map((item, idx) => (
              <li key={idx} className="flex gap-4 mb-7 last:mb-0">
                {/* Timeline dot + line */}
                <div className="flex flex-col items-center">
                  <div
                    className="w-2 h-2 rounded-full shrink-0 mt-1"
                    style={{ background: "var(--ac)" }}
                    aria-hidden="true"
                  />
                  {idx < timeline.length - 1 && (
                    <div
                      className="w-px flex-1 mt-1.5"
                      style={{ background: "var(--b1)" }}
                      aria-hidden="true"
                    />
                  )}
                </div>

                {/* Content */}
                <div className="pb-2">
                  <p
                    className="text-xs font-mono mb-1"
                    style={{ color: "var(--ac)", fontFamily: "var(--mono)" }}
                  >
                    {item.year}
                  </p>
                  <p className="text-sm font-medium mb-0.5" style={{ color: "var(--t1)" }}>
                    {item.title}
                  </p>
                  {item.org && (
                    <p
                      className="text-xs mb-1.5"
                      style={{ color: "var(--ac)" }}
                    >
                      {item.org}
                    </p>
                  )}
                  <p className="text-xs leading-relaxed" style={{ color: "var(--t2)" }}>
                    {item.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
