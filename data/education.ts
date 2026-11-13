export type EducationItem = {
  qualification: string;
  institution: string;
  detail?: string;
  description: string;
};

// Degree and certifications, shown under "Education & Certifications". The
// Pediforte certificate is listed here once; the related training/internship
// is in data/experience.ts. No award date is recorded, so none is shown.
export const education: EducationItem[] = [
  {
    qualification: "B.Sc. Mass Communication",
    institution: "Adekunle Ajasin University",
    detail: "Second Class Upper Division",
    description:
      "Studied writing, research and communication — the skills I now use to scope products, document systems and explain technical decisions clearly.",
  },
  {
    qualification: "Android & iOS App Development Certificate",
    institution: "Pediforte Coding Academy",
    description:
      "Awarded on completing Pediforte's mobile app development training and internship, covering Flutter and Dart for Android and iOS.",
  },
];
