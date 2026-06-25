import { load } from "js-yaml"
import type { TFunction } from "i18next";
import type { ProjectType } from "./project.text.d"
import { TechnologyString } from "./technologies.d"
import { GithubUser, YouTubeEmbed, Seconds24h, ProjectsFolder} from "./constants.text.d"
import CONFIG from "./configuration"

const GH_TOKEN = process.env.GITHUB_TOKEN  // fine-grained PAT, public repo read

type Locale = "en" | "es"
type I18nField = string | { en: string; es: string }
type ProjectFilter = "all" | "main" | (typeof CONFIG.projectTags)[number]

type PortfolioYml = {
  title: I18nField
  finished: string
  date?: I18nField
  descriptionShort: I18nField
  descriptionLong: I18nField
  technologies: TechnologyString[]
  logo?: string
  screenShoots?: string[]
  youtube?: string
  slug: string
  order?: number
  featured?: boolean
  tags?: string[]
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

function normalizeTags(tags: string[] | string | undefined): string[] {
  return Array.isArray(tags) ? tags : tags ? [tags] : []
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
  const url = rawUrl(repo.name, repo.default_branch, ".portfolio.yaml")
  const res = await fetch(url, { next: { revalidate: Seconds24h } })
  if (!res.ok) return null
  try {
    return load(await res.text()) as PortfolioYml
  } catch {
    return null
  }
}

export async function getGithubProjects(locale: Locale, t: TFunction, filter: ProjectFilter = "all"): Promise<ProjectType[]> {
  const repos = await fetchRepos()

  const settled = await Promise.all(
    repos.map(async repo => {
      const yaml = await fetchPortfolioYml(repo)
      if (!yaml) return null

      const tags = normalizeTags(yaml.tags)
      if (filter === "main" && tags.includes(CONFIG.projectOtherTag)) return null
      if (filter !== "all" && filter !== "main" && !tags.includes(filter)) return null

      const branch = repo.default_branch

      const project: ProjectType & { _order: number; _featured: boolean } = {
        title: pick(yaml.title, locale),
        finished: yaml.finished == 'progress' ? t("progress") : t("finished"),
        date: yaml.date ? pick(yaml.date, locale) : undefined,
        descriptionShort: pick(yaml.descriptionShort, locale),
        descriptionLong: pick(yaml.descriptionLong, locale),
        technologies: yaml.technologies ?? [],
        logo: yaml.logo ? rawUrl(repo.name, branch, yaml.logo) : "",
        screenShoots: (yaml.screenShoots ?? []).map(p => rawUrl(repo.name, branch, p)),
        link: `${ProjectsFolder}${yaml.slug}`,
        youtube: yaml.youtube ? YouTubeEmbed + yaml.youtube : "",
        github: repo.html_url,
        _order: yaml.order ?? 999,
        _featured: yaml.featured ?? false,
      }

      return project
    })
  )

  
  return settled
    .filter((p): p is NonNullable<typeof p> => p !== null)
    .sort((a, b) => b._order - a._order)
}
