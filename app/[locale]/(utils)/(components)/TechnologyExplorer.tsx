"use client"
import { useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { AnimatePresence, motion } from "framer-motion"
import cn from "classnames"
import { Technology, getTechIndex, techCategoryStyle, TechCategoryKey } from "@/app/[locale]/(utils)/(constants)/technologies.d"
import { Icon } from "./Icons"

const KEYS: TechCategoryKey[] = [ "ai", 'data', "tools", "languages", "others"]

export function TechnologyExplorer() {
  const { t } = useTranslation("technologies")
  const items = useMemo(() => getTechIndex(t), [t])
  const [active, setActive] = useState<TechCategoryKey | "all">("all")
  const [query, setQuery] = useState("")
  const q = query.trim().toLowerCase()

  const shown = items.filter(it => {
    const inCat = active === "all" || it.cats.includes(active)
    const inQ = !q || it.src.toLowerCase().includes(q)
      || it.cats.some(c => t(`${c}.title`).toLowerCase().includes(q))
    return inCat && inQ
  })

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        <Tab label={t("all")} on={active === "all"} onClick={() => setActive("all")} />
        {KEYS.map(k =>
          <Tab key={k} label={t(`${k}.title`)} catKey={k} on={active === k}
              onClick={() => setActive(active === k ? "all" : k)} />
        )}
      </div>
      <div className="relative w-full flex items-center">
        <Icon src="clue" type="white" width={18} height={18} title="search" className="absolute left-4 opacity-50 pointer-events-none" />
        <input value={query} onChange={e => setQuery(e.target.value)} placeholder={t("search")} className="w-full rounded-full bg-miquel-black-300 -ml-4 pl-10 pr-4 py-2 text-sm outline-none" />
      </div>
      <motion.div layout className="flex flex-wrap gap-2">
        <AnimatePresence>
          {shown.map(it =>
            <motion.div key={it.src} layout
              initial={{ opacity: 0, scale: .9 }} animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: .9 }} transition={{ duration: .25 }}>
              <Technology src={it.src} category={it.primary} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

function Tab({ label, catKey, on, onClick }:
  { label: string, catKey?: TechCategoryKey, on: boolean, onClick: () => void }) {
  return (
    <button onClick={onClick} className={cn(
      "rounded-full px-4 py-1 text-xs border transition-colors",
      on ? (catKey ? techCategoryStyle[catKey] : "bg-miquel-black-100 border-transparent")
        : "bg-transparent border-miquel-black-300 opacity-70 hover:opacity-100"
    )}>{label}</button>
  )
}
