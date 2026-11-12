"use client";

import { useSearchParams } from "next/navigation";
import { ContactForm } from "@/components/ui/ContactForm";
import { enquiryMessageFor } from "@/data/servicePricing";

/**
 * The contact form, prefilled when the URL carries ?service=<slug> (set by the
 * services CTAs). Must be rendered inside <Suspense> — useSearchParams.
 */
export function ServiceContactForm() {
  const service = useSearchParams().get("service");
  // Remount on a new service so the prefill applies to a fresh form.
  return <ContactForm key={service ?? "none"} initialMessage={enquiryMessageFor(service)} />;
}
