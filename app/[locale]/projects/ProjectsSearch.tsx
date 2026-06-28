"use client"

import { useMemo } from "react"
import { useTranslation } from "react-i18next"
import { AnimatePresence, motion } from "framer-motion"

import CONFIG from "@/app/[locale]/(utils)/(constants)/configuration"
import type { ProjectType } from "@/app/[locale]/(utils)/(constants)/project.text.d"
import { getTechnologyCathegories, getTechTitle, techCategoryStyle, type TechCategoryKey, type TechnologyString } from "@/app/[locale]/(utils)/(constants)/technologies.d"
import { Divider } from "@/app/[locale]/(utils)/(components)/Divider"
import { SearchFilter, type SearchFacet, type SearchField } from "@/app/[locale]/(utils)/(components)/SearchFilter"
import { Project } from "./elements"
import { OthersCarousel } from "./others-carousel"

type Locale = "en" | "es"

const offClass = "bg-transparent border-miquel-black-300 opacity-70 hover:opacity-100"

export function ProjectsSearch({ main, others, locale }: { main: ProjectType[], others: ProjectType[], locale: Locale }) {
  const { t: tProjects } = useTranslation("projects")
  const { t: tTech } = useTranslation("technologies")

  const allProjects = useMemo(() => [...main, ...others], [main, others])

  const { categoryByTech, categoryLabelByTech } = useMemo(() => {
    const byTech = new Map<string, TechCategoryKey>()
    const labelByTech = new Map<string, string>()

    for (const category of getTechnologyCathegories(tTech)) {
      for (const tech of category.techs) {
        if (!byTech.has(tech)) byTech.set(tech, category.key)
        if (!labelByTech.has(tech)) labelByTech.set(tech, category.title)
      }
    }

    return { categoryByTech: byTech, categoryLabelByTech: labelByTech }
  }, [tTech])

  const fields = useMemo<SearchField<ProjectType>[]>(() => {
    const scores = CONFIG.projectSearchScores

    return [
      { key: "titleSame", score: scores.titleSame, text: (project, current) => project._search?.title[current] ?? project.title },
      { key: "titleOther", score: scores.titleOther, text: (project, current) => project._search?.title[otherLocale(current)] ?? "" },
      { key: "keywordSame", score: scores.keywordSame, text: (project, current) => project._search?.keywords[current] ?? "" },
      { key: "keywordOther", score: scores.keywordOther, text: (project, current) => project._search?.keywords[otherLocale(current)] ?? "" },
      { key: "techOrCategory", score: scores.techOrCategory, text: project => project.technologies.map(tech => `${getTechTitle(tech)} ${categoryLabelByTech.get(tech) ?? ""}`).join(" ") },
      { key: "descriptionSame", score: scores.descriptionSame, text: (project, current) => project._search?.description[current] ?? project.descriptionLong },
      { key: "descriptionOther", score: scores.descriptionOther, text: (project, current) => project._search?.description[otherLocale(current)] ?? "" },
    ]
  }, [categoryLabelByTech])

  const facets = useMemo<SearchFacet<ProjectType>[]>(() => {
    const technologies = unique(allProjects.flatMap(project => project.technologies)).sort((a, b) => getTechTitle(a).localeCompare(getTechTitle(b)))
    const tags = unique(allProjects.flatMap(project => project.tags ?? [])).sort()

    return [
      {
        key: "technologies",
        label: tProjects("technologies"),
        values: technologies,
        get: project => project.technologies,
        mode: "and",
        className: (value, on) => on ? techCategoryStyle[categoryByTech.get(value as TechnologyString) ?? "others"] : offClass,
        render: value => getTechTitle(value),
      },
      {
        key: "tags",
        label: tProjects("tags.title"),
        values: tags,
        get: project => project.tags ?? [],
        className: (_value, on) => on ? "bg-miquel-blue-400 border-miquel-blue-300" : offClass,
        render: value => tProjects(`tags.${value}`, { defaultValue: labelize(value) }),
      },
    ]
  }, [allProjects, categoryByTech, tProjects])

  return (
    <SearchFilter
      items={allProjects}
      locale={locale}
      fields={fields}
      facets={facets}
      placeholder={tProjects("search")}
      stopWords={CONFIG.searchStopWords}
      debounceMs={CONFIG.debounceTimeShort}
      render={(projects, filtering) => filtering
        ? <FilteredProjects projects={projects} emptyText={tProjects("no-projects-filter")} />
        : <DefaultProjects main={main} others={others} />
      }
    />
  )
}

function DefaultProjects({ main, others }: { main: ProjectType[], others: ProjectType[] }) {
  return (
    <>
      <div className="flex flex-col justify-center gap-6">
        {main.map((object, idx) =>
          <Project object={object} key={idx}/>
        )}
      </div>

      {others.length > 0 &&
        <div className="mt-16">
          <Divider />

          <OthersCarousel projects={others} />
        </div>
      }
    </>
  )
}

function FilteredProjects({ projects, emptyText }: { projects: ProjectType[], emptyText: string }) {
  return (
    <div className="flex flex-col justify-center gap-6">
      <AnimatePresence mode="popLayout">
        {projects.length > 0 ? projects.map(project =>
          <motion.div
            key={project.link}
            layout
            initial={{ opacity: 0, y: 18, scale: .98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: .98 }}
            transition={{ duration: .25 }}
          >
            <Project object={project}/>
          </motion.div>
        ) :
          <motion.p
            key="empty"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="w-full rounded-xl bg-miquel-black-300/40 p-8 text-center opacity-70"
          >
            {emptyText}
          </motion.p>
        }
      </AnimatePresence>
    </div>
  )
}

function unique<T>(values: T[]) {
  return [...new Set(values)]
}

function otherLocale(locale: Locale) {
  return locale === "en" ? "es" : "en"
}

function labelize(value: string) {
  return value.replace(/[-_]/g, " ").replace(/\b\w/g, letter => letter.toUpperCase())
}
