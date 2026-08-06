import { NextResponse } from "next/server";
import { Resend } from "resend";
import { CONTACT_EMAIL } from "@/lib/constants";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254; // RFC 5321 maximum mailbox length
const MIN_MESSAGE_LENGTH = 10;
const MAX_MESSAGE_LENGTH = 5000;

// Lightweight in-memory rate limit: a few requests per IP per window. This
// resets on cold start and isn't shared across serverless instances, but for
// a low-traffic personal site it meaningfully slows down casual abuse of the
// endpoint without needing an external service.
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const submissionsByIp = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (submissionsByIp.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS,
  );

  if (recent.length >= RATE_LIMIT_MAX) {
    submissionsByIp.set(ip, recent);
    return true;
  }

  recent.push(now);
  submissionsByIp.set(ip, recent);

  // Opportunistic cleanup so this map doesn't grow unbounded on a long-lived instance.
  if (submissionsByIp.size > 500) {
    for (const [key, timestamps] of submissionsByIp) {
      if (timestamps.every((t) => now - t >= RATE_LIMIT_WINDOW_MS)) {
        submissionsByIp.delete(key);
      }
    }
  }

  return false;
}

function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

/** Strips control/newline characters so user input can't inject extra email headers or lines. */
function sanitizeForHeader(value: string): string {
  // eslint-disable-next-line no-control-regex
  return value.replace(/[\r\n\t\x00-\x1f]+/g, " ").trim();
}

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  company?: unknown; // honeypot field — real visitors never fill this in
};

export async function POST(request: Request) {
  const ip = getClientIp(request);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many messages sent recently. Please try again later." },
      { status: 429 },
    );
  }

  let body: ContactPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const { name, email, message, company } = body;

  // Honeypot: bots fill every field, real users never see this one.
  if (typeof company === "string" && company.trim().length > 0) {
    return NextResponse.json({ success: true });
  }

  if (typeof name !== "string" || name.trim().length < 2) {
    return NextResponse.json(
      { error: "Please enter your name." },
      { status: 400 },
    );
  }
  if (name.trim().length > MAX_NAME_LENGTH) {
    return NextResponse.json(
      { error: "Your name is too long." },
      { status: 400 },
    );
  }

  if (typeof email !== "string" || !EMAIL_REGEX.test(email.trim())) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }
  if (email.trim().length > MAX_EMAIL_LENGTH) {
    return NextResponse.json(
      { error: "That email address is too long." },
      { status: 400 },
    );
  }

  if (typeof message !== "string" || message.trim().length < MIN_MESSAGE_LENGTH) {
    return NextResponse.json(
      { error: "Please write a short message (at least 10 characters)." },
      { status: 400 },
    );
  }
  if (message.trim().length > MAX_MESSAGE_LENGTH) {
    return NextResponse.json(
      { error: "Your message is too long." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("Contact form: RESEND_API_KEY is not configured.");
    return NextResponse.json(
      {
        error:
          "The contact form isn't fully set up yet. Please email me directly instead.",
      },
      { status: 503 },
    );
  }

  // Defense in depth: email is already validated against a regex with no
  // whitespace allowed, but the name is free text, so strip anything that
  // could otherwise inject extra lines into the subject or email body.
  const trimmedName = sanitizeForHeader(name);
  const trimmedEmail = email.trim();
  const trimmedMessage = message.trim();

  // Sender must be a verified Resend domain/address. Falls back to Resend's
  // shared sandbox address until a custom domain is verified.
  const fromAddress = process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev";
  // Recipient defaults to the site's public contact address (hello@ambalimustapha.dev),
  // overridable via env if ever needed.
  const toAddress = process.env.CONTACT_TO_EMAIL || CONTACT_EMAIL;

  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from: `Portfolio contact form <${fromAddress}>`,
      to: toAddress,
      replyTo: trimmedEmail,
      subject: `New message from your portfolio — ${trimmedName}`,
      text: [
        "New message from your portfolio",
        "",
        "Name:",
        trimmedName,
        "",
        "Email:",
        trimmedEmail,
        "",
        "Message:",
        trimmedMessage,
      ].join("\n"),
    });

    if (error) {
      console.error("Contact form: Resend error", error);
      return NextResponse.json(
        {
          error:
            "Something went wrong while sending your message. Please try again or email me directly.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form: unexpected error", err);
    return NextResponse.json(
      {
        error:
          "Something went wrong while sending your message. Please try again or email me directly.",
      },
      { status: 500 },
    );
  }
}
