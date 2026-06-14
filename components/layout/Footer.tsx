"use client";

import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { siteConfig } from "@/data";

export function Footer() {
  return (
    <footer
      className="border-t mt-24"
      style={{ borderColor: "var(--b1)" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p
          className="text-xs font-mono"
          style={{ color: "var(--t3)", fontFamily: "var(--mono)" }}
        >
          &lt;<span style={{ color: "var(--ac)" }}>LeoLeong</span> /&gt; ·
          Built with Next.js · Deployed on Vercel
        </p>
        <div className="flex items-center gap-4">
          <div
            className="flex items-center gap-1.5 text-xs font-mono"
            style={{ color: "var(--t3)", fontFamily: "var(--mono)" }}
          >
            <ShieldCheck
              size={12}
              style={{ color: "var(--ac)" }}
              aria-hidden="true"
            />
            OWASP-compliant
          </div>
          <Link
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs transition-colors"
            style={{ color: "var(--t3)" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--ac)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--t3)")
            }
          >
            GitHub
          </Link>
          <Link
            href={siteConfig.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs transition-colors"
            style={{ color: "var(--t3)" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--ac)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--t3)")
            }
          >
            LinkedIn
          </Link>
        </div>
      </div>
    </footer>
  );
}
