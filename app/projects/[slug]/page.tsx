import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ProjectDetails } from "@/components/project/ProjectDetails";
import { getProjectBySlug, projects } from "@/data/projects";
import { pageMetadata } from "@/lib/metadata";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: "Project not found" };
  }

  return pageMetadata({
    title: project.title,
    description: project.description,
    path: `/projects/${project.slug}`,
    type: "article",
    image: project.image
      ? { url: project.image, alt: project.imageAlt ?? `${project.title} screenshot` }
      : undefined,
  });
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="project-details inner">
      <Breadcrumb title={project.title} trail={[{ label: "Projects", href: "/projects" }]} />
      <ProjectDetails project={project} />
    </div>
  );
}
