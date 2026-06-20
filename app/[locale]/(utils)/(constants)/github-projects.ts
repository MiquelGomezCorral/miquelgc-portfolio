import { load } from "js-yaml"
import type { ProjectType } from "./project.text.d"
import { TechnologyString } from "./technologies.d"
import { GithubUser, YouTubeEmbed, Seconds24h} from "./constants.text.d"

const GH_TOKEN = process.env.GITHUB_TOKEN  // fine-grained PAT, public repo read

type Locale = "en" | "es"
type I18nField = string | { en: string; es: string }

type PortfolioYml = {
  title: I18nField
  finished: string
  descriptionShort: I18nField
  descriptionLong: I18nField
  technologies: TechnologyString[]
  logo?: string
  screenShoots?: string[]
  youtube?: string
  slug: string
  order?: number
  featured?: boolean
}

type GhRepo = {
  name: string
  html_url: string
  default_branch: string
  pushed_at: string
  private: boolean
  fork: boolean
}

const authHeaders: Record<string, string> = { Accept: "application/vnd.github+json" }
if (GH_TOKEN) authHeaders.Authorization = `Bearer ${GH_TOKEN}`

function pick(f: I18nField, locale: Locale): string {
  return typeof f === "string" ? f : f[locale] ?? f.en
}

function rawUrl(repo: string, branch: string, path: string): string {
  return `https://raw.githubusercontent.com/${GithubUser}/${repo}/${branch}/${path.replace(/^\.?\//, "")}`
}

async function fetchRepos(): Promise<GhRepo[]> {
  const res = await fetch(
    `https://api.github.com/users/${GithubUser}/repos?per_page=100&sort=pushed`,
    { headers: authHeaders, next: { revalidate: Seconds24h } }
  )
  if (!res.ok) throw new Error(`GitHub repos: ${res.status}`)
  const repos: GhRepo[] = await res.json()
  return repos.filter(r => !r.private && !r.fork)
}

async function fetchPortfolioYml(repo: GhRepo): Promise<PortfolioYml | null> {
  const url = rawUrl(repo.name, repo.default_branch, ".portfolio.yml")
  const res = await fetch(url, { next: { revalidate: Seconds24h } })
  if (!res.ok) return null
  try {
    return load(await res.text()) as PortfolioYml
  } catch {
    return null
  }
}

export async function getGithubProjects(locale: Locale): Promise<ProjectType[]> {
  const repos = await fetchRepos()

  const settled = await Promise.all(
    repos.map(async repo => {
      const yml = await fetchPortfolioYml(repo)
      if (!yml) return null

      const branch = repo.default_branch

      const project: ProjectType & { _order: number; _featured: boolean } = {
        title: pick(yml.title, locale),
        finished: yml.finished,
        descriptionShort: pick(yml.descriptionShort, locale),
        descriptionLong: pick(yml.descriptionLong, locale),
        technologies: yml.technologies ?? [],
        logo: yml.logo ? rawUrl(repo.name, branch, yml.logo) : "",
        screenShoots: (yml.screenShoots ?? []).map(p => rawUrl(repo.name, branch, p)),
        link: `/projects/${yml.slug}`,
        youtube: yml.youtube ? YouTubeEmbed + yml.youtube : "",
        github: repo.html_url,
        _order: yml.order ?? 999,
        _featured: yml.featured ?? false,
      }

      return project
    })
  )

  return settled
    .filter((p): p is NonNullable<typeof p> => p !== null)
    .sort((a, b) => a._order - b._order)
}