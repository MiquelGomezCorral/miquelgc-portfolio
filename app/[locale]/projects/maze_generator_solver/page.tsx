import { getProjects } from "@/app/[locale]/(utils)/(constants)/project.text.d"
import { ProjectPageTemplate } from "@/app/[locale]/projects/page"
import { getFixedT } from 'i18next';

export default async function ProjectsPage({ params }: { params: { locale: string } }) {
  const t = getFixedT(params.locale, "experiences")
  const [MazeGeneratorSolver] = getProjects(t)
  return (
    <ProjectPageTemplate params={params} object={MazeGeneratorSolver} />
  )
}