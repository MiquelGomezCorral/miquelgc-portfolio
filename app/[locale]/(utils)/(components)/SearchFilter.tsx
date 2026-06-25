"use client"

import type { ReactNode } from "react"
import { useMemo, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import cn from "classnames"
import { Icon } from "./Icons"

type SearchLocale = "en" | "es"

export type SearchField<T> = {
  key: string
  score: number
  text: (item: T, locale: SearchLocale) => string
}

export type SearchFacet<T> = {
  key: string
  label: string
  values: string[]
  get: (item: T) => string[]
  className: (value: string, on: boolean) => string
  render?: (value: string) => ReactNode
  mode?: "and" | "or"
}

type SearchFilterProps<T> = {
  items: T[]
  locale: SearchLocale
  fields: SearchField<T>[]
  facets: SearchFacet<T>[]
  placeholder: string
  stopWords?: string[]
  render: (items: T[], filtering: boolean) => ReactNode
}

const buttonBase = "rounded-full px-4 py-1 text-xs border transition-colors"

export function SearchFilter<T>({ items, locale, fields, facets, placeholder, stopWords = [], render }: SearchFilterProps<T>) {
  const [query, setQuery] = useState("")
  const [selected, setSelected] = useState<Record<string, string[]>>({})

  const stopWordSet = useMemo(() => new Set(stopWords.map(normalizeText)), [stopWords])
  const tokens = useMemo(() => tokenize(query, stopWordSet), [query, stopWordSet])

  const filtering = tokens.length > 0 || facets.some(facet => (selected[facet.key] ?? []).length > 0)

  const shown = useMemo(() => items
    .map((item, index) => ({ item, index, score: scoreItem(item, locale, tokens, fields) }))
    .filter(({ item }) => passesFacets(item, facets, selected) && (tokens.length === 0 || passesTokens(item, locale, tokens, fields)))
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .map(({ item }) => item), [items, locale, fields, facets, selected, tokens])

  function toggle(facetKey: string, value: string) {
    setSelected(current => {
      const values = current[facetKey] ?? []
      return {
        ...current,
        [facetKey]: values.includes(value) ? values.filter(v => v !== value) : [...values, value],
      }
    })
  }

  return (
    <>
      <section className="w-full flex flex-col gap-4">
        <div className="relative w-full flex items-center">
          <Icon src="clue" type="white" width={18} height={18} title="search" className="absolute left-4 opacity-50 pointer-events-none" />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={placeholder}
            className="w-full rounded-full bg-miquel-black-300 -ml-4 pl-10 pr-4 py-2 text-sm outline-none"
          />
        </div>

        {facets.map(facet =>
          facet.values.length > 0 &&
          <div key={facet.key} className="flex flex-col gap-2">
            <p className="text-xs uppercase tracking-[0.2em] opacity-40">{facet.label}</p>
            <motion.div layout className="flex flex-wrap gap-2">
              <AnimatePresence initial={false}>
                {facet.values.map(value => {
                  const on = (selected[facet.key] ?? []).includes(value)
                  return (
                    <motion.button
                      type="button"
                      key={value}
                      layout
                      initial={{ opacity: 0, scale: .9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: .9 }}
                      transition={{ duration: .2 }}
                      onClick={() => toggle(facet.key, value)}
                      className={cn(buttonBase, facet.className(value, on))}
                    >
                      {facet.render ? facet.render(value) : value}
                    </motion.button>
                  )
                })}
              </AnimatePresence>
            </motion.div>
          </div>
        )}
      </section>

      {render(shown, filtering)}
    </>
  )
}

function passesFacets<T>(item: T, facets: SearchFacet<T>[], selected: Record<string, string[]>) {
  return facets.every(facet => {
    const selectedValues = selected[facet.key] ?? []
    if (selectedValues.length === 0) return true
    const itemValues = facet.get(item)
    return selectedValues[facet.mode === "and" ? "every" : "some"](value => itemValues.includes(value))
  })
}

function passesTokens<T>(item: T, locale: SearchLocale, tokens: string[], fields: SearchField<T>[]) {
  return tokens.every(token =>
    fields.some(field => normalizeText(field.text(item, locale)).includes(token))
  )
}

function scoreItem<T>(item: T, locale: SearchLocale, tokens: string[], fields: SearchField<T>[]) {
  if (tokens.length === 0) return 0

  return tokens.reduce((score, token) => score + fields.reduce((fieldScore, field) => {
    return normalizeText(field.text(item, locale)).includes(token) ? fieldScore + field.score : fieldScore
  }, 0), 0)
}

function tokenize(query: string, stopWords: Set<string>) {
  return normalizeText(query)
    .split(/[^\p{L}\p{N}+#.-]+/u)
    .filter(token => token && !stopWords.has(token))
}

function normalizeText(value: unknown): string {
  if (typeof value !== "string") return ""
  return value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
}
