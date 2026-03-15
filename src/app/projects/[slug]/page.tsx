import { notFound, redirect } from "next/navigation";
import { isProjectSlug } from "@/data/portfolio";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;

  if (!isProjectSlug(slug)) {
    notFound();
  }

  redirect(`/pt/projects/${slug}`);
}
