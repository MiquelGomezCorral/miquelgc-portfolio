import { revalidateTag } from "next/cache"
import { NextRequest } from "next/server"

export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization")
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  revalidateTag("github-projects")
  return Response.json({ revalidated: true, at: new Date().toISOString() })
}
