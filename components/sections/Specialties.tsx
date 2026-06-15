"use client";

import {
  Shield,
  SquareCode,
  Bug,
  Cloud,
  Fingerprint,
  Layers,
} from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";

const specialties = [
  {
    icon: SquareCode,
    name: "Backend & APIs",
    detail: "Node.js, Express, REST APIs, Prisma, Sequelize",
  },
  {
    icon: Shield,
    name: "Digital Forensics",
    detail: "FTK Imager, Autopsy, evidence handling",
  },
  {
    icon: Bug,
    name: "Penetration Testing",
    detail: "Nmap, Burp Suite, Metasploit, Kali Linux",
  },
  {
    icon: Cloud,
    name: "Cloud, IoT & DevOps",
    detail: "Azure, MQTT, Docker, Nginx, systemd, deployment",
  },
  {
    icon: Fingerprint,
    name: "Data & Machine Learning",
    detail: "Python, pandas, scikit-learn, Streamlit, visualisation",
  },
  {
    icon: Layers,
    name: "Programming Languages",
    detail: "TypeScript, JavaScript, Python, Java, PHP, SQL",
  },
];

export function Specialties() {
  return (
    <section
      className="py-16 px-4 sm:px-6"
      style={{ borderTop: "0.5px solid var(--b1)" }}
      aria-labelledby="specialties-title"
    >
      <div className="max-w-6xl mx-auto">
        <SectionHeader title="Technical specialties" sub="core focus areas" />

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {specialties.map(({ icon: Icon, name, detail }) => (
            <div
              key={name}
              className="rounded-xl border p-4 transition-colors duration-200"
              style={{
                background: "var(--bg3)",
                borderColor: "var(--b1)",
              }}
            >
              <Icon
                size={20}
                className="mb-2"
                style={{ color: "var(--ac)" }}
                aria-hidden="true"
              />
              <p className="text-sm font-medium mb-1" style={{ color: "var(--t1)" }}>
                {name}
              </p>
              <p className="text-xs leading-relaxed" style={{ color: "var(--t3)" }}>
                {detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}