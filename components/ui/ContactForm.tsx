"use client";

import { useId, useRef, useState, type FormEvent } from "react";

type Status = "idle" | "submitting" | "success" | "error";
type FieldName = "name" | "email" | "message";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 5000;

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

/** `initialMessage` prefills the message, e.g. from a services CTA (?service=…). */
export function ContactForm({ initialMessage = "" }: { initialMessage?: string }) {
  const formId = useId();
  const errorId = `${formId}-error`;
  const [values, setValues] = useState({
    name: "",
    email: "",
    message: initialMessage,
    company: "",
  });
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
      <div className="ambali-form-success" role="status">
        <p className="ambali-form-success__title">Message sent. Thanks for reaching out.</p>
        <p className="ambali-form-success__text">I&apos;ll get back to you as soon as I can.</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="tmp-btn hover-icon-reverse radius-round btn-border btn-md"
        >
          <span className="icon-reverse-wrapper">
            <span className="btn-text">Send another message</span>
            <span className="btn-icon" aria-hidden="true">
              <i className="fa-sharp fa-regular fa-arrow-right" />
            </span>
            <span className="btn-icon" aria-hidden="true">
              <i className="fa-sharp fa-regular fa-arrow-right" />
            </span>
          </span>
        </button>
      </div>
    );
  }

  const hasError = status === "error" && !!feedback;

  return (
    <div className="contact-form">
      <form className="tmp-dynamic-form" onSubmit={handleSubmit} noValidate>
        {/* Honeypot field — hidden from real users, catches simple bots */}
        <div className="ambali-honeypot" aria-hidden="true">
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

        <div className="contact-form-wrapper row">
          <div className="col-lg-6">
            <div className="form-group">
              <label htmlFor={`${formId}-name`} className="visually-hidden">
                Your Name
              </label>
              <input
                className="input-field"
                id={`${formId}-name`}
                name="name"
                type="text"
                required
                maxLength={MAX_NAME_LENGTH}
                autoComplete="name"
                disabled={isSubmitting}
                placeholder="Your Name"
                value={values.name}
                onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
                aria-invalid={errorField === "name" ? true : undefined}
                aria-describedby={errorField === "name" ? errorId : undefined}
              />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="form-group">
              <label htmlFor={`${formId}-email`} className="visually-hidden">
                Your Email
              </label>
              <input
                className="input-field"
                id={`${formId}-email`}
                name="email"
                type="email"
                required
                maxLength={MAX_EMAIL_LENGTH}
                autoComplete="email"
                disabled={isSubmitting}
                placeholder="Your Email"
                value={values.email}
                onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
                aria-invalid={errorField === "email" ? true : undefined}
                aria-describedby={errorField === "email" ? errorId : undefined}
              />
            </div>
          </div>
          <div className="col-lg-12">
            <div className="form-group">
              <label htmlFor={`${formId}-message`} className="visually-hidden">
                Your Message
              </label>
              <textarea
                className="input-field"
                id={`${formId}-message`}
                name="message"
                required
                maxLength={MAX_MESSAGE_LENGTH}
                disabled={isSubmitting}
                placeholder="Your Message"
                value={values.message}
                onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
                aria-invalid={errorField === "message" ? true : undefined}
                aria-describedby={errorField === "message" ? errorId : undefined}
              />
            </div>
          </div>
          <div className="col-lg-12">
            <div className="tmp-button-here">
              <button
                className="tmp-btn hover-icon-reverse radius-round w-100"
                type="submit"
                disabled={isSubmitting}
              >
                <span className="icon-reverse-wrapper">
                  <span className="btn-text">{isSubmitting ? "Sending…" : "Send Message"}</span>
                  <span className="btn-icon" aria-hidden="true">
                    <i
                      className={
                        isSubmitting
                          ? "fa-sharp fa-regular fa-spinner fa-spin"
                          : "fa-sharp fa-regular fa-arrow-right"
                      }
                    />
                  </span>
                  <span className="btn-icon" aria-hidden="true">
                    <i className="fa-sharp fa-regular fa-arrow-right" />
                  </span>
                </span>
              </button>
            </div>
          </div>
        </div>

        <p id={errorId} role="alert" aria-live="polite" className="ambali-form-error">
          {hasError && feedback}
        </p>
      </form>
    </div>
  );
}
