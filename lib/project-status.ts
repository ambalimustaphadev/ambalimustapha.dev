import type { Project, ProjectStatus } from "@/types";

// In-progress statuses aren't shown on project cards (homepage and /projects);
// "Live" and "Coming soon" still are. Detail pages always show the status.
// Kept out of data/projects.ts so client components don't bundle all project data.
const STATUSES_HIDDEN_ON_CARDS: ProjectStatus[] = ["In active development", "In development"];

/** The status label for a project card, or undefined when it isn't shown. */
export function getCardStatus(project: Project): ProjectStatus | undefined {
  return STATUSES_HIDDEN_ON_CARDS.includes(project.status) ? undefined : project.status;
}
