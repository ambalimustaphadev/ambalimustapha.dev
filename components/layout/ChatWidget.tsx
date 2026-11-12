"use client";

import { useState, type FormEvent } from "react";
import { useScrolledPast } from "@/lib/hooks";

type Status = "idle" | "sending" | "sent" | "error";

/**
 * Reeni floating chat button (components/common/Chat.jsx), kept in the
 * template's markup so its styles apply unchanged. The template's form only
 * called preventDefault(); here it sends through the site's existing
 * /api/contact route (Resend), so messages actually arrive by email.
 */
export function ChatWidget() {
  // Like the template, the button lifts once the back-to-top button appears.
  const lifted = useScrolledPast(100);
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    setFeedback(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
          company: data.get("company"),
        }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus("error");
        setFeedback(
          body.error ||
            "Something went wrong while sending your message. Please try again or email me directly.",
        );
        return;
      }
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
      setFeedback(
        "Something went wrong while sending your message. Please try again or email me directly.",
      );
    }
  }

  return (
    <div className={`ready-chatting-option tmp-ready-chat${lifted ? " chat-visible" : ""}`}>
      <input type="checkbox" id="click" aria-label="Chat with me" />
      <label htmlFor="click" aria-hidden="true">
        <i className="fab fa-facebook-messenger" />
        <i className="fas fa-times" />
      </label>
      <div className="wrapper">
        <div className="head-text">Let&apos;s chat with me?</div>
        <div className="chat-box">
          <div className="desc-text" role="status" aria-live="polite">
            {status === "sent"
              ? "Thanks — your message is on its way. I'll reply by email."
              : (feedback ?? "Leave a message below and I'll get back to you by email.")}
          </div>
          {status !== "sent" && (
            <form className="tmp-dynamic-form" onSubmit={handleSubmit}>
              {/* Honeypot — same field the contact form uses. No <label>: the
                  template styles every label in this widget as the round button. */}
              <div className="ambali-honeypot" aria-hidden="true">
                <input name="company" type="text" tabIndex={-1} autoComplete="off" aria-label="Company" />
              </div>
              <div className="field">
                <input
                  className="input-field"
                  name="name"
                  placeholder="Your Name"
                  type="text"
                  autoComplete="name"
                  aria-label="Your Name"
                  maxLength={100}
                  required
                />
              </div>
              <div className="field">
                <input
                  className="input-field"
                  name="email"
                  placeholder="Your Email"
                  type="email"
                  autoComplete="email"
                  aria-label="Your Email"
                  maxLength={254}
                  required
                />
              </div>
              <div className="field textarea">
                <textarea
                  className="input-field"
                  placeholder="Your Message"
                  name="message"
                  aria-label="Your Message"
                  minLength={10}
                  maxLength={5000}
                  required
                />
              </div>
              <div className="field">
                <button name="submit" type="submit" disabled={status === "sending"}>
                  {status === "sending" ? "Sending…" : "Send Message"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
