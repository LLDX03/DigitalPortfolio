import { NextRequest, NextResponse } from "next/server";

// ── In-memory rate limiter (per IP, resets on restart) ──────────────────────
// For production, replace with Redis-backed store (e.g. Upstash)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

const RATE_LIMIT = 5;           // max requests
const RATE_WINDOW_MS = 15 * 60 * 1000; // 15 minutes

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return true;
  }

  if (entry.count >= RATE_LIMIT) return false;

  entry.count += 1;
  return true;
}

// ── Input sanitiser — strip HTML tags ────────────────────────────────────────
function sanitise(input: string): string {
  return input
    .replace(/<[^>]*>/g, "")     // strip HTML
    .replace(/[<>'"]/g, "")     // strip remaining dangerous chars
    .trim()
    .slice(0, 2000);             // hard length cap
}

// ── Validation ────────────────────────────────────────────────────────────────
function validate(body: Record<string, unknown>) {
  const errors: Record<string, string> = {};

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const subject = typeof body.subject === "string" ? body.subject.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!name || name.length < 2) errors.name = "Name must be at least 2 characters.";
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Invalid email address.";
  if (!subject || subject.length < 3) errors.subject = "Subject must be at least 3 characters.";
  if (!message || message.length < 20) errors.message = "Message must be at least 20 characters.";

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
    sanitised: {
      name: sanitise(name),
      email: sanitise(email),
      subject: sanitise(subject),
      message: sanitise(message),
    },
  };
}

// ── Honeypot check ────────────────────────────────────────────────────────────
// If a bot fills the hidden "website" field, silently discard
function isBot(body: Record<string, unknown>): boolean {
  return typeof body.website === "string" && body.website.length > 0;
}

// ── POST /api/contact ─────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  // Get IP
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  // Rate limit
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please wait before trying again." },
      {
        status: 429,
        headers: { "Retry-After": "900" },
      }
    );
  }

  // Parse body
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }

  // Honeypot
  if (isBot(body)) {
    // Silently return success to confuse bots
    return NextResponse.json({ message: "Message sent successfully." });
  }

  // Validate + sanitise
  const { errors, isValid, sanitised } = validate(body);
  if (!isValid) {
    return NextResponse.json({ error: "Validation failed.", errors }, { status: 422 });
  }

  // ── Send email ────────────────────────────────────────────────────────────
  // Requires SENDGRID_API_KEY + CONTACT_TO_EMAIL in .env
  // Uncomment when you add your SendGrid key:
  //
  // try {
  //   const sgMail = (await import("@sendgrid/mail")).default;
  //   sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
  //   await sgMail.send({
  //     to: process.env.CONTACT_TO_EMAIL!,
  //     from: { email: process.env.SENDGRID_FROM_EMAIL!, name: "Portfolio Contact" },
  //     replyTo: sanitised.email,
  //     subject: `[Portfolio] ${sanitised.subject}`,
  //     text: `Name: ${sanitised.name}\nEmail: ${sanitised.email}\n\n${sanitised.message}`,
  //     html: `<p><strong>Name:</strong> ${sanitised.name}</p>
  //            <p><strong>Email:</strong> ${sanitised.email}</p>
  //            <p><strong>Message:</strong></p>
  //            <p>${sanitised.message.replace(/\n/g, "<br>")}</p>`,
  //   });
  // } catch (err) {
  //   console.error("SendGrid error:", err);
  //   return NextResponse.json({ error: "Failed to send message." }, { status: 500 });
  // }

  // Log to console until SendGrid is configured
  console.info("[contact]", {
    timestamp: new Date().toISOString(),
    ip,
    name: sanitised.name,
    email: sanitised.email,
    subject: sanitised.subject,
  });

  return NextResponse.json(
    { message: "Thanks for reaching out! I'll get back to you soon." },
    { status: 200 }
  );
}

// Only allow POST
export async function GET() {
  return NextResponse.json({ error: "Method not allowed." }, { status: 405 });
}
