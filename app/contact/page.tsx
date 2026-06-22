"use client";

import { useState, useEffect } from "react";
import { Send, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/data";
import { PageNav } from "@/components/layout/PageNav";

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FieldError {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

function validate(form: FormState): FieldError {
  const errors: FieldError = {};
  if (!form.name.trim() || form.name.trim().length < 2)
    errors.name = "Name must be at least 2 characters.";
  if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
    errors.email = "Please enter a valid email address.";
  if (!form.subject.trim() || form.subject.trim().length < 3)
    errors.subject = "Subject must be at least 3 characters.";
  if (!form.message.trim() || form.message.trim().length < 20)
    errors.message = "Message must be at least 20 characters.";
  return errors;
}

const inputBase: React.CSSProperties = {
  width: "100%",
  background: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(255,255,255,0.07)",
  borderRadius: "6px",
  padding: "10px 14px",
  fontSize: "0.9375rem",
  color: "#f0ece4",
  fontFamily: "inherit",
  outline: "none",
  transition: "border-color 0.15s",
};

const inputError: React.CSSProperties = {
  ...inputBase,
  borderColor: "rgba(239,68,68,0.4)",
};

function IconGitHub() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function IconLinkedIn() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 23.2 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export default function ContactPage() {
  const [mouse, setMouse] = useState({ x: -1000, y: -1000 });
  const [form, setForm] = useState<FormState>({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<FieldError>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [serverMessage, setServerMessage] = useState("");

  useEffect(() => {
    const move = (e: MouseEvent) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FieldError]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setServerMessage(data.message || "Message sent successfully.");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
        setServerMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setServerMessage("Network error. Please try again.");
    }
  };

  return (
    <>
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
        <PageNav />

        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "4rem 1.5rem 6rem" }}>
          {/* Heading */}
          <h1
            style={{
              fontFamily: "var(--font-serif, Georgia, serif)",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(2.25rem, 6vw, 3.5rem)",
              lineHeight: 1.1,
              color: "#f0ece4",
              letterSpacing: "-0.02em",
              marginBottom: "1rem",
            }}
          >
            Get in touch
          </h1>
          <p style={{ fontSize: "0.9375rem", lineHeight: 1.75, color: "#5c5955", marginBottom: "4rem", maxWidth: "48ch" }}>
            Open to software engineering roles from August 2026. Happy to chat about internships or project collaborations now.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "4rem" }}>
            {/* Social links row */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem" }}>
              {[
                { icon: <IconLinkedIn />, label: "LinkedIn", value: "leoleongdingxuan", href: siteConfig.linkedin },
                { icon: <IconGitHub />, label: "GitHub", value: "LLDX03", href: siteConfig.github },
                { icon: null, label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
              ].map(({ icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    textDecoration: "none",
                    color: "#5c5955",
                    fontSize: "0.875rem",
                    transition: "color 0.15s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#d98e4f")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#5c5955")}
                >
                  {icon}
                  <span style={{ fontWeight: 400, color: "inherit" }}>{value}</span>
                  <ArrowUpRight size={12} />
                </a>
              ))}
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: "rgba(255,255,255,0.05)", margin: "-2rem 0" }} />

            {/* Form */}
            {status === "success" ? (
              <div style={{ paddingTop: "1rem" }}>
                <p style={{
                  fontFamily: "var(--font-serif, Georgia, serif)",
                  fontStyle: "italic",
                  fontSize: "1.5rem",
                  color: "#f0ece4",
                  marginBottom: "0.75rem",
                }}>
                  Message sent.
                </p>
                <p style={{ fontSize: "0.875rem", color: "#5c5955", marginBottom: "2rem" }}>
                  {serverMessage} I&apos;ll get back to you soon.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  style={{
                    fontSize: "0.8125rem",
                    color: "#d98e4f",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                    textDecoration: "underline",
                    textUnderlineOffset: "3px",
                  }}
                >
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate aria-label="Contact form" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <Field label="Name" id="name" error={errors.name}>
                    <input
                      id="name" name="name" type="text"
                      value={form.name} onChange={handleChange}
                      placeholder="Your name"
                      style={errors.name ? inputError : inputBase}
                      autoComplete="name"
                    />
                  </Field>
                  <Field label="Email" id="email" error={errors.email}>
                    <input
                      id="email" name="email" type="email"
                      value={form.email} onChange={handleChange}
                      placeholder="your@email.com"
                      style={errors.email ? inputError : inputBase}
                      autoComplete="email"
                    />
                  </Field>
                </div>

                <Field label="Subject" id="subject" error={errors.subject}>
                  <input
                    id="subject" name="subject" type="text"
                    value={form.subject} onChange={handleChange}
                    placeholder="What's this about?"
                    style={errors.subject ? inputError : inputBase}
                  />
                </Field>

                <Field label="Message" id="message" error={errors.message}>
                  <textarea
                    id="message" name="message"
                    value={form.message} onChange={handleChange}
                    placeholder="What's on your mind?"
                    rows={6}
                    style={{ ...(errors.message ? inputError : inputBase), resize: "vertical" }}
                  />
                </Field>

                {status === "error" && (
                  <p style={{ fontSize: "0.8125rem", color: "#f87171" }}>{serverMessage}</p>
                )}

                <div>
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      fontSize: "0.875rem",
                      fontWeight: 500,
                      color: "#15161A",
                      background: "#d98e4f",
                      border: "none",
                      borderRadius: "6px",
                      padding: "0.625rem 1.5rem",
                      cursor: status === "loading" ? "not-allowed" : "pointer",
                      opacity: status === "loading" ? 0.6 : 1,
                      transition: "opacity 0.15s",
                    }}
                  >
                    {status === "loading" ? "Sending…" : <><Send size={13} /> Send message</>}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function Field({ label, id, error, children }: { label: string; id: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label
        htmlFor={id}
        style={{ display: "block", fontSize: "0.75rem", letterSpacing: "0.06em", textTransform: "uppercase", color: "#4d4944", marginBottom: "0.5rem", fontWeight: 500 }}
      >
        {label}
      </label>
      {children}
      {error && (
        <p style={{ fontSize: "0.75rem", color: "#f87171", marginTop: "0.375rem" }} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
