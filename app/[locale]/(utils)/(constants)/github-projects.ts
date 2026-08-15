import { load } from "js-yaml"
import type { TFunction } from "i18next";
import type { LocaleText, ProjectType } from "./project.text.d"
import { TechnologyString } from "./technologies.d"
import { GithubUser, YoutubeEmbed, ProjectsFolder} from "./constants.text.d"
import CONFIG from "./configuration"

const GH_TOKEN = process.env.GITHUB_TOKEN  // fine-grained PAT, public repo read

type Locale = "en" | "es"
type I18nField = string | { en: string; es: string }
type ProjectFilter = "all" | "main" | (typeof CONFIG.projectTags)[number]

type PortfolioYml = {
  title: I18nField
  finished: string
  date?: I18nField
  keywords?: I18nField
  descriptionShort: I18nField
  descriptionLong: I18nField
  technologies: TechnologyString[]
  gif?: string
  logo?: string
  screenShoots?: string[]
  youtube?: string
  slug: string
  relevancy?: number
  featured?: boolean
  tags?: string[]
  hide?: boolean
}

type GhRepo = {
  name: string
  html_url: string
  default_branch: string
  pushed_at: string
  private: boolean
  fork: boolean
}

type GithubFile = {
  content: string
  sha: string
}

type GithubTree = {
  truncated?: boolean
  tree: Array<{
    path: string
    type: string
    sha: string
  }>
}

type PortfolioFile = {
  sha: string
  yaml: PortfolioYml | null
}

type MediaShas = Record<string, string>

type GithubProjectRevision = {
  repo: string
  branch: string
  sha: string
}

type GithubProjectRevisionResult = {
  revisions: GithubProjectRevision[]
  failures: Array<{ repo: string; error: string }>
}

export const githubProjectsListTag = "github-projects-list"

export function githubProjectTag(repo: string): string {
  return `github-project:${repo}`
}

const authHeaders: Record<string, string> = { Accept: "application/vnd.github+json" }
if (GH_TOKEN) authHeaders.Authorization = `Bearer ${GH_TOKEN}`

function pick(f: I18nField, locale: Locale): string {
  return typeof f === "string" ? f : f[locale] ?? f.en
}

function toPair(f?: I18nField): LocaleText {
  if (!f) return { en: "", es: "" }
  if (typeof f === "string") return { en: f, es: f }
  return { en: f.en ?? f.es ?? "", es: f.es ?? f.en ?? "" }
}

function normalizeTags(tags: string[] | string | undefined): string[] {
  return Array.isArray(tags) ? tags : tags ? [tags] : []
}

function normalizePath(path: string): string {
  return path.replace(/^\.?\//, "")
}

function portfolioMediaPaths(yaml: PortfolioYml): string[] {
  return [...new Set([
    yaml.logo,
    yaml.gif,
    ...(yaml.screenShoots ?? []),
  ].filter((path): path is string => Boolean(path)).map(normalizePath))].sort()
}

function rawUrl(repo: string, branch: string, path: string, version?: string): string {
  const url = `https://raw.githubusercontent.com/${GithubUser}/${repo}/${branch}/${normalizePath(path)}`
  return version ? `${url}?v=${encodeURIComponent(version)}` : url
}

function githubFetchOptions(cached: boolean, tags: string[] = []): RequestInit & { next?: { tags: string[] } } {
  if (!cached) return { headers: authHeaders, cache: "no-store" }

  return {
    headers: authHeaders,
    cache: "force-cache",
    next: { tags },
  }
}

async function fetchRepos(cached = true): Promise<GhRepo[]> {
  const res = await fetch(
    `https://api.github.com/users/${GithubUser}/repos?per_page=100&sort=pushed`,
    githubFetchOptions(cached, [githubProjectsListTag])
  )
  if (!res.ok) throw new Error(`GitHub repos: ${res.status}`)
  const repos: GhRepo[] = await res.json()
  return repos.filter(r => !r.private && !r.fork)
}

async function fetchPortfolioFile(repo: GhRepo, cached = true): Promise<PortfolioFile | null> {
  const url = `https://api.github.com/repos/${GithubUser}/${encodeURIComponent(repo.name)}/contents/.portfolio.yaml?ref=${encodeURIComponent(repo.default_branch)}`
  const res = await fetch(url, githubFetchOptions(cached, [githubProjectTag(repo.name)]))
  if (res.status === 404) return null
  if (!res.ok) throw new Error(`GitHub ${repo.name} .portfolio.yaml: ${res.status}`)

  const file: GithubFile = await res.json()
  try {
    const content = Buffer.from(file.content.replace(/\s/g, ""), "base64").toString("utf8")
    return { sha: file.sha, yaml: load(content) as PortfolioYml }
  } catch {
    return { sha: file.sha, yaml: null }
  }
}

async function fetchPortfolioMedia(repo: GhRepo, yaml: PortfolioYml, cached = true): Promise<MediaShas> {
  const paths = portfolioMediaPaths(yaml)
  if (paths.length === 0 || yaml.hide) return {}

  const url = `https://api.github.com/repos/${GithubUser}/${encodeURIComponent(repo.name)}/git/trees/${encodeURIComponent(repo.default_branch)}?recursive=1`
  const res = await fetch(url, githubFetchOptions(cached, [githubProjectTag(repo.name)]))
  if (!res.ok) throw new Error(`GitHub ${repo.name} tree: ${res.status}`)

  const tree: GithubTree = await res.json()
  if (tree.truncated) throw new Error(`GitHub ${repo.name} tree was truncated`)

  const files = new Map(
    tree.tree
      .filter(entry => entry.type === "blob")
      .map(entry => [normalizePath(entry.path), entry.sha])
  )

  return Object.fromEntries(paths.map(path => [path, files.get(path) ?? "missing"]))
}

function projectRevision(yamlSha: string, mediaShas: MediaShas): string {
  return JSON.stringify({
    yaml: yamlSha,
    media: Object.entries(mediaShas).sort(([a], [b]) => a.localeCompare(b)),
  })
}

export async function getGithubProjects(locale: Locale, t: TFunction, filter: ProjectFilter = "all"): Promise<ProjectType[]> {
  const repos = await fetchRepos()

  const settled = await Promise.all(
    repos.map(async repo => {
      const file = await fetchPortfolioFile(repo).catch(() => null)
      if (!file?.yaml || file.yaml.hide) return null
      const yaml = file.yaml
      const mediaShas = await fetchPortfolioMedia(repo, yaml).catch(() => null)
      const mediaVersion = (path: string) => mediaShas?.[normalizePath(path)] ?? file.sha

      const tags = normalizeTags(yaml.tags)
      if (filter === "main" && tags.includes(CONFIG.projectOtherTag)) return null
      if (filter !== "all" && filter !== "main" && !tags.includes(filter)) return null

      const branch = repo.default_branch

      const project: ProjectType & { _order: number; _featured: boolean } = {
        title: pick(yaml.title, locale),
        finished: yaml.finished == 'progress' ? t("progress") : t("finished"),
        date: yaml.date ? pick(yaml.date, locale) : '',
        descriptionShort: pick(yaml.descriptionShort, locale),
        descriptionLong: pick(yaml.descriptionLong, locale),
        technologies: yaml.technologies ?? [],
        gif: yaml.gif ? rawUrl(repo.name, branch, yaml.gif, mediaVersion(yaml.gif)) : "",
        logo: yaml.logo ? rawUrl(repo.name, branch, yaml.logo, mediaVersion(yaml.logo)) : "",
        screenShoots: (yaml.screenShoots ?? []).map(p => rawUrl(repo.name, branch, p, mediaVersion(p))),
        link: `${ProjectsFolder}${yaml.slug}`,
        youtube: yaml.youtube ? YoutubeEmbed + yaml.youtube : "",
        github: repo.html_url,
        relevancy: yaml.relevancy ?? -1,
        tags,
        search: {
          title: toPair(yaml.title),
          description: toPair(yaml.descriptionLong),
          keywords: toPair(yaml.keywords),

        },
        _order: yaml.relevancy ?? 999,
        _featured: yaml.featured ?? false,
      }

      return project
    })
  )


  return settled
    .filter((p): p is NonNullable<typeof p> => p !== null)
    .sort((a, b) => b._order - a._order)
}

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : "Unknown GitHub error"
}

export async function getGithubProjectRevisions(cached = true): Promise<GithubProjectRevisionResult> {
  const repos = await fetchRepos(cached)
  const results = await Promise.allSettled(
    repos.map(async repo => {
      const file = await fetchPortfolioFile(repo, cached)
      if (!file) return null
      const mediaShas = file.yaml && !file.yaml.hide
        ? await fetchPortfolioMedia(repo, file.yaml, cached)
        : {}

      return {
        repo: repo.name,
        branch: repo.default_branch,
        sha: projectRevision(file.sha, mediaShas),
      }
    })
  )

  const revisions: GithubProjectRevision[] = []
  const failures: GithubProjectRevisionResult["failures"] = []

  results.forEach((result, index) => {
    if (result.status === "fulfilled") {
      if (result.value) revisions.push(result.value)
      return
    }

    failures.push({
      repo: repos[index].name,
      error: errorMessage(result.reason),
    })
  })

  return { revisions, failures }
}
