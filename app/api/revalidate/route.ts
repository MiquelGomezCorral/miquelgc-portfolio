import { revalidateTag } from "next/cache"
import { NextRequest } from "next/server"
import { Email, FullName } from "@/app/[locale]/(utils)/(constants)/constants.text.d"
import {
  getGithubProjectRevisions,
  githubProjectTag,
  githubProjectsListTag,
} from "@/app/[locale]/(utils)/(constants)/github-projects"

type RevisionFailure = {
  repo: string
  check: "cached" | "live" | "unknown"
  error: string
}

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : "Unknown error"
}

async function sendFailureEmail(failures: RevisionFailure[], changedRepos: string[] = []): Promise<boolean> {
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY

  if (!serviceId || !templateId || !publicKey) {
    console.error("Portfolio cron email notification is not configured")
    return false
  }

  const message = [
    "Portfolio project refresh completed with failures.",
    "",
    "Failed checks:",
    ...failures.map(failure => `- ${failure.repo} (${failure.check}): ${failure.error}`),
    "",
    changedRepos.length > 0
      ? `Revalidated repositories: ${changedRepos.join(", ")}`
      : "No repositories were revalidated.",
  ].join("\n")

  try {
    const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: AbortSignal.timeout(5000),
      body: JSON.stringify({
        lib_version: "4.4.1",
        user_id: publicKey,
        service_id: serviceId,
        template_id: templateId,
        template_params: {
          from_name: "Portfolio cron",
          from_email: Email,
          to_name: FullName,
          message,
        },
      }),
    })

    if (!response.ok) {
      console.error(`Portfolio cron email notification failed: ${response.status}`)
      return false
    }

    return true
  } catch (error) {
    console.error(`Portfolio cron email notification failed: ${errorMessage(error)}`)
    return false
  }
}

export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization")
  if (!process.env.CRON_SECRET || auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const [cachedResult, currentResult] = await Promise.allSettled([
      getGithubProjectRevisions(),
      getGithubProjectRevisions(false),
    ])
    if (cachedResult.status !== "fulfilled" || currentResult.status !== "fulfilled") {
      const checkFailures: RevisionFailure[] = []
      if (cachedResult.status === "rejected") {
        checkFailures.push({ repo: "all", check: "cached", error: errorMessage(cachedResult.reason) })
      }
      if (currentResult.status === "rejected") {
        checkFailures.push({ repo: "all", check: "live", error: errorMessage(currentResult.reason) })
      }
      const notificationSent = await sendFailureEmail(checkFailures)
      return Response.json({
        error: "GitHub revision check failed",
        failedRepos: ["all"],
        notificationSent,
      }, { status: 502 })
    }

    const cached = cachedResult.value
    const current = currentResult.value
    const failures: RevisionFailure[] = [
      ...cached.failures.map(failure => ({ ...failure, check: "cached" as const })),
      ...current.failures.map(failure => ({ ...failure, check: "live" as const })),
    ]
    const failedRepos = new Set(failures.map(failure => failure.repo))
    const cachedByRepo = new Map(
      cached.revisions
        .filter(revision => !failedRepos.has(revision.repo))
        .map(revision => [revision.repo, revision])
    )
    const currentByRepo = new Map(
      current.revisions
        .filter(revision => !failedRepos.has(revision.repo))
        .map(revision => [revision.repo, revision])
    )
    const repos = new Set([...cachedByRepo.keys(), ...currentByRepo.keys()])
    const changedRepos = [...repos].filter(repo => {
      const previous = cachedByRepo.get(repo)
      const next = currentByRepo.get(repo)
      return !previous || !next || previous.branch !== next.branch || previous.sha !== next.sha
    })
    const listChanged = cachedByRepo.size !== currentByRepo.size || changedRepos.some(repo => {
      const previous = cachedByRepo.get(repo)
      const next = currentByRepo.get(repo)
      return !previous || !next || previous.branch !== next.branch
    })

    changedRepos.forEach(repo => revalidateTag(githubProjectTag(repo)))
    if (listChanged) revalidateTag(githubProjectsListTag)

    const notificationSent = failures.length > 0
      ? await sendFailureEmail(failures, changedRepos)
      : false

    return Response.json({
      revalidated: changedRepos.length > 0,
      changedRepos,
      failedRepos: [...failedRepos],
      notificationSent,
      at: new Date().toISOString(),
    })
  } catch (error) {
    const notificationSent = await sendFailureEmail([{
      repo: "all",
      check: "unknown",
      error: errorMessage(error),
    }])

    return Response.json({ error: "GitHub revision check failed", notificationSent }, { status: 502 })
  }
}
