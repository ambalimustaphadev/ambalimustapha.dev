"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";
type FieldName = "name" | "email" | "message";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 5000;

const fieldStyles =
  "w-full rounded-md border border-border bg-transparent px-3.5 py-2.5 text-sm text-foreground placeholder:text-foreground-secondary transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:cursor-not-allowed disabled:opacity-60";

function validate(
  values: { name: string; email: string; message: string },
): { field: FieldName; message: string } | null {
  if (values.name.trim().length < 2) {
    return { field: "name", message: "Please enter your name." };
  }
  if (!EMAIL_REGEX.test(values.email.trim())) {
    return { field: "email", message: "Please enter a valid email address." };
  }
  if (values.message.trim().length < 10) {
    return {
      field: "message",
      message: "Please write a short message (at least 10 characters).",
    };
  }
  return null;
}

export function ContactForm() {
  const formId = useId();
  const errorId = `${formId}-error`;
  const [values, setValues] = useState({ name: "", email: "", message: "", company: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [errorField, setErrorField] = useState<FieldName | null>(null);

  const isSubmitting = status === "submitting";
  // React state updates are async/batched, so `isSubmitting` alone can't stop
  // two near-simultaneous clicks from both slipping through before the first
  // render disables the button. This ref is set synchronously instead.
  const submitLockRef = useRef(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitLockRef.current) return;

    const validationError = validate(values);
    if (validationError) {
      setStatus("error");
      setFeedback(validationError.message);
      setErrorField(validationError.field);
      return;
    }

    submitLockRef.current = true;
    setStatus("submitting");
    setFeedback(null);
    setErrorField(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatus("error");
        setFeedback(
          data.error ||
            "Something went wrong while sending your message. Please try again or email me directly.",
        );
        return;
      }

      setStatus("success");
      setFeedback(null);
      setValues({ name: "", email: "", message: "", company: "" });
    } catch {
      setStatus("error");
      setFeedback(
        "Something went wrong while sending your message. Please try again or email me directly.",
      );
    } finally {
      submitLockRef.current = false;
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="rounded-md border border-border px-5 py-6 text-base text-foreground"
      >
        <p className="font-medium">Message sent. Thanks for reaching out.</p>
        <p className="mt-1 text-sm text-foreground-secondary">
          I&apos;ll get back to you as soon as I can.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-4 text-sm font-medium text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          Send another message
        </button>
      </div>
    );
  }

  const hasError = status === "error" && !!feedback;

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Honeypot field — hidden from real users, catches simple bots */}
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor={`${formId}-company`}>Company</label>
        <input
          id={`${formId}-company`}
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.company}
          onChange={(e) => setValues((v) => ({ ...v, company: e.target.value }))}
        />
      </div>

      <div>
        <label htmlFor={`${formId}-name`} className="mb-2 block text-sm font-medium text-foreground">
          Name
        </label>
        <input
          id={`${formId}-name`}
          name="name"
          type="text"
          required
          maxLength={MAX_NAME_LENGTH}
          autoComplete="name"
          disabled={isSubmitting}
          placeholder="Your name"
          value={values.name}
          onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
          className={fieldStyles}
          aria-invalid={errorField === "name" ? true : undefined}
          aria-describedby={errorField === "name" ? errorId : undefined}
        />
      </div>

      <div>
        <label htmlFor={`${formId}-email`} className="mb-2 block text-sm font-medium text-foreground">
          Email
        </label>
        <input
          id={`${formId}-email`}
          name="email"
          type="email"
          required
          maxLength={MAX_EMAIL_LENGTH}
          autoComplete="email"
          disabled={isSubmitting}
          placeholder="you@example.com"
          value={values.email}
          onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
          className={fieldStyles}
          aria-invalid={errorField === "email" ? true : undefined}
          aria-describedby={errorField === "email" ? errorId : undefined}
        />
      </div>

      <div>
        <label htmlFor={`${formId}-message`} className="mb-2 block text-sm font-medium text-foreground">
          Message
        </label>
        <textarea
          id={`${formId}-message`}
          name="message"
          rows={4}
          required
          maxLength={MAX_MESSAGE_LENGTH}
          disabled={isSubmitting}
          placeholder="What are you working on?"
          value={values.message}
          onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
          className={fieldStyles}
          aria-invalid={errorField === "message" ? true : undefined}
          aria-describedby={errorField === "message" ? errorId : undefined}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={cn(
          "inline-flex w-full items-center justify-center gap-2 rounded-md bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity duration-200 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto",
        )}
      >
        {isSubmitting && <Loader2 size={16} className="animate-spin" aria-hidden="true" />}
        {isSubmitting ? "Sending…" : "Send message"}
      </button>

      <p
        id={errorId}
        role="alert"
        aria-live="polite"
        className="min-h-5 text-sm text-red-600 dark:text-red-400"
      >
        {hasError && feedback}
      </p>
    </form>
  );
}
