import GlowingText from "./GlowingText"

export function Divider() {
  return (
    <figure className="my-4 flex gap-2">
      <div className="h-2 w-2 bg-indigo-300/40 rounded-full"/>
      <div className="h-2 w-2 bg-indigo-300/40 rounded-full"/>
      <div className="h-2 w-full bg-indigo-300/40 rounded-full"/>
    </figure>
  )
}

export function YearDivider({ year }: { year: string }) {
  return (
    <figure className="flex items-center gap-2 py-1">
      <div className="h-px w-4 rounded-full bg-indigo-300/40" />
      <GlowingText bold nowrap className="text-sm">{year}</GlowingText>
      <div className="h-px w-full rounded-full bg-indigo-300/40" />
    </figure>
  )
}
