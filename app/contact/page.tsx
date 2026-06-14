"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Mail,
  GitBranch,
  Link2,
  Send,
  Lock,
  CheckCircle2,
  AlertCircle,
  CalendarCheck2,
} from "lucide-react";
import { siteConfig } from "@/data";
import { SectionHeader } from "@/components/ui/SectionHeader";

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

export default function ContactPage() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FieldError>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [serverMessage, setServerMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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

  const inputStyle = (hasError: boolean) => ({
    width: "100%",
    background: "var(--bg3)",
    border: `0.5px solid ${hasError ? "rgba(239,68,68,0.5)" : "var(--b1)"}`,
    borderRadius: "8px",
    padding: "9px 12px",
    fontSize: "13px",
    color: "var(--t1)",
    fontFamily: "inherit",
    outline: "none",
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <SectionHeader title="Get in touch" sub="open to roles from August 2026" />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
        {/* Left — contact info */}
        <div className="lg:col-span-2 space-y-4">
          {[
            {
              icon: Link2,
              label: "LinkedIn",
              value: "leoleongdingxuan",
              href: siteConfig.linkedin,
            },
            {
              icon: GitBranch,
              label: "GitHub",
              value: "LLDX03",
              href: siteConfig.github,
            },
            {
              icon: Mail,
              label: "Email",
              value: siteConfig.email,
              href: `mailto:${siteConfig.email}`,
            },
          ].map(({ icon: Icon, label, value, href }) => (
            <Link
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="flex items-center gap-3 rounded-xl border p-4 transition-colors duration-150 group"
              style={{ background: "var(--bg3)", borderColor: "var(--b1)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor = "var(--ac-border)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = "var(--b1)")
              }
            >
              <Icon size={18} style={{ color: "var(--ac)" }} aria-hidden="true" />
              <div>
                <p className="text-xs" style={{ color: "var(--t3)" }}>
                  {label}
                </p>
                <p className="text-sm" style={{ color: "var(--t1)" }}>
                  {value}
                </p>
              </div>
            </Link>
          ))}

          {/* Availability card */}
          <div
            className="rounded-xl border p-4"
            style={{
              background: "rgba(34,211,238,0.04)",
              borderColor: "var(--ac-border)",
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <CalendarCheck2 size={15} style={{ color: "var(--ac)" }} aria-hidden="true" />
              <p className="text-xs font-mono" style={{ color: "var(--ac)", fontFamily: "var(--mono)" }}>
                // availability
              </p>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "var(--t2)" }}>
              Currently serving NS. Available for full-time software engineering
              roles from{" "}
              <span style={{ color: "var(--t1)", fontWeight: 500 }}>
                2nd August 2026
              </span>
              . Open to internships and project collaborations now.
            </p>
          </div>
        </div>

        {/* Right — contact form */}
        <div className="lg:col-span-3">
          {status === "success" ? (
            <div
              className="rounded-xl border p-8 flex flex-col items-center text-center gap-3"
              style={{ background: "var(--bg3)", borderColor: "var(--ac-border)" }}
            >
              <CheckCircle2 size={32} style={{ color: "var(--ac)" }} aria-hidden="true" />
              <h3 className="text-base font-medium" style={{ color: "var(--t1)" }}>
                Message sent!
              </h3>
              <p className="text-sm" style={{ color: "var(--t2)" }}>
                {serverMessage}
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-2 text-xs border rounded-md px-4 py-2 transition-colors"
                style={{ color: "var(--ac)", borderColor: "var(--ac-border)" }}
              >
                Send another message
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              noValidate
              className="space-y-4"
              aria-label="Contact form"
            >
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-xs font-mono mb-1.5"
                  style={{ color: "var(--t3)", fontFamily: "var(--mono)" }}
                >
                  name *
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  style={inputStyle(!!errors.name)}
                  autoComplete="name"
                  aria-describedby={errors.name ? "name-error" : undefined}
                  aria-invalid={!!errors.name}
                />
                {errors.name && (
                  <p id="name-error" className="text-xs mt-1" style={{ color: "#f87171" }} role="alert">
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-mono mb-1.5"
                  style={{ color: "var(--t3)", fontFamily: "var(--mono)" }}
                >
                  email *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  style={inputStyle(!!errors.email)}
                  autoComplete="email"
                  aria-describedby={errors.email ? "email-error" : undefined}
                  aria-invalid={!!errors.email}
                />
                {errors.email && (
                  <p id="email-error" className="text-xs mt-1" style={{ color: "#f87171" }} role="alert">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Subject */}
              <div>
                <label
                  htmlFor="subject"
                  className="block text-xs font-mono mb-1.5"
                  style={{ color: "var(--t3)", fontFamily: "var(--mono)" }}
                >
                  subject *
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="What's this about?"
                  style={inputStyle(!!errors.subject)}
                  aria-describedby={errors.subject ? "subject-error" : undefined}
                  aria-invalid={!!errors.subject}
                />
                {errors.subject && (
                  <p id="subject-error" className="text-xs mt-1" style={{ color: "#f87171" }} role="alert">
                    {errors.subject}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-xs font-mono mb-1.5"
                  style={{ color: "var(--t3)", fontFamily: "var(--mono)" }}
                >
                  message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="What's on your mind?"
                  rows={5}
                  style={{ ...inputStyle(!!errors.message), resize: "vertical" }}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  aria-invalid={!!errors.message}
                />
                {errors.message && (
                  <p id="message-error" className="text-xs mt-1" style={{ color: "#f87171" }} role="alert">
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Server error */}
              {status === "error" && (
                <div
                  className="flex items-center gap-2 p-3 rounded-lg border text-xs"
                  style={{
                    background: "rgba(239,68,68,0.06)",
                    borderColor: "rgba(239,68,68,0.2)",
                    color: "#f87171",
                  }}
                  role="alert"
                >
                  <AlertCircle size={14} aria-hidden="true" />
                  {serverMessage}
                </div>
              )}

              {/* Submit */}
              <div className="flex items-center justify-between gap-4 pt-1">
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="inline-flex items-center gap-2 text-sm font-medium px-5 py-2.5 rounded-lg transition-opacity disabled:opacity-60"
                  style={{ background: "var(--ac)", color: "var(--bg)" }}
                >
                  {status === "loading" ? (
                    "Sending..."
                  ) : (
                    <>
                      Send message
                      <Send size={13} aria-hidden="true" />
                    </>
                  )}
                </button>

                <p
                  className="flex items-center gap-1.5 text-xs font-mono"
                  style={{ color: "var(--t3)", fontFamily: "var(--mono)" }}
                >
                  <Lock size={10} style={{ color: "var(--ac)" }} aria-hidden="true" />
                  Server-validated · rate-limited
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
