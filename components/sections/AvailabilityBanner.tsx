"use client";

import Link from "next/link";
import { CalendarCheck2, ArrowRight } from "lucide-react";

export function AvailabilityBanner() {
  return (
    <section className="px-4 sm:px-6 pb-4" aria-label="Availability">
      <div className="max-w-6xl mx-auto">
        <div
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 rounded-xl border px-5 py-4"
          style={{
            background: "rgba(34,211,238,0.04)",
            borderColor: "var(--ac-border)",
          }}
        >
          <div className="flex items-start gap-3">
            <CalendarCheck2
              size={18}
              className="shrink-0 mt-0.5"
              style={{ color: "var(--ac)" }}
              aria-hidden="true"
            />
            <p className="text-sm" style={{ color: "var(--t2)" }}>
              <span style={{ color: "var(--t1)", fontWeight: 500 }}>
                Currently serving National Service.
              </span>{" "}
              Available for full-time roles from{" "}
              <span style={{ color: "var(--ac)", fontWeight: 500 }}>
                2nd August 2026
              </span>
              . Open to internships and collaborations now.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-1 text-xs font-medium shrink-0 transition-opacity hover:opacity-80"
            style={{ color: "var(--ac)" }}
          >
            Get in touch
            <ArrowRight size={12} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
