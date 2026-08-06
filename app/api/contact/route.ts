import { NextResponse } from "next/server";
import { Resend } from "resend";
import { CONTACT_EMAIL } from "@/lib/constants";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  company?: unknown; // honeypot field — real visitors never fill this in
};

export async function POST(request: Request) {
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

  if (typeof email !== "string" || !EMAIL_REGEX.test(email.trim())) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  if (typeof message !== "string" || message.trim().length < 10) {
    return NextResponse.json(
      { error: "Please write a short message (at least 10 characters)." },
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

  const fromAddress = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from: `Portfolio contact form <${fromAddress}>`,
      to: CONTACT_EMAIL,
      replyTo: email.trim(),
      subject: `New message from ${name.trim()}`,
      text: `From: ${name.trim()} <${email.trim()}>\n\n${message.trim()}`,
    });

    if (error) {
      console.error("Contact form: Resend error", error);
      return NextResponse.json(
        {
          error:
            "Something went wrong sending your message. Please try again or email me directly.",
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
          "Something went wrong sending your message. Please try again or email me directly.",
      },
      { status: 500 },
    );
  }
}
