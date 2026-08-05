import type { Metadata } from "next";
import { Writing } from "@/components/sections/Writing";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Notes and writing from Mustapha Ambali on backend development, mobile applications, and building software.",
};

export default function WritingPage() {
  return (
    <div className="pt-8">
      <Writing headingLevel="h1" />
    </div>
  );
}
