import { CAREER_START_YEAR } from "@/lib/constants";
import { getPrimaryProjects, projects } from "@/data/projects";
import { skills } from "@/data/skills";

// Every number shown in the counters is derived from the site's own data, so
// the figures stay accurate as projects and skills are updated.

/** Years since CAREER_START_YEAR (the "years building" figure). */
export const YEARS_BUILDING = Math.max(1, new Date().getFullYear() - CAREER_START_YEAR);

/** Projects with real work behind them (excludes "Coming soon"). */
export const PROJECTS_WITH_WORK = getPrimaryProjects().length;

/** Distinct technologies listed in data/skills.ts. */
export const TECHNOLOGY_COUNT = new Set(skills.flatMap((group) => group.items)).size;

/** Apps currently "In active development". */
export const APPS_IN_ACTIVE_DEVELOPMENT = projects.filter(
  (project) => project.status === "In active development",
).length;
