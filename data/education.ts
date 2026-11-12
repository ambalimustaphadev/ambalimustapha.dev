export type EducationItem = {
  qualification: string;
  institution: string;
  detail?: string;
  description: string;
};

// Previously hard-coded in the old Education section.
export const education: EducationItem[] = [
  {
    qualification: "B.Sc. Mass Communication",
    institution: "Adekunle Ajasin University",
    detail: "Second Class Upper Division",
    description: "Studied Mass Communication with a focus on writing, media, and communication.",
  },
];
