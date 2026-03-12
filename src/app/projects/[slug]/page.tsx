import { redirect } from "next/navigation";
import { ProjectDetailPage } from "@/components/portfolio/project-detail-page";
import { isProjectSlug, projectSlugs } from "@/data/portfolio";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return projectSlugs.map((slug) => ({ slug }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;

  if (!isProjectSlug(slug)) {
    redirect("/");
  }

  return <ProjectDetailPage slug={slug} />;
}
