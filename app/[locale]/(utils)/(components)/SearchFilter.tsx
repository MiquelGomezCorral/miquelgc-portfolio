"use client"

import type { ReactNode } from "react"
import { useEffect, useMemo, useState } from "react"
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
  debounceMs?: number
  fuzzyWeight?: number
  fuzzyDistance?: number
  controls?: ReactNode
  render: (items: T[], filtering: boolean) => ReactNode
}

const buttonBase = "rounded-full px-4 py-1 text-xs border transition-colors"

export function SearchFilter<T>({ items, locale, fields, facets, placeholder, stopWords = [], debounceMs = 0, fuzzyWeight = 0, fuzzyDistance = 1, controls, render }: SearchFilterProps<T>) {
  const [query, setQuery] = useState("")
  const [debouncedQuery, setDebouncedQuery] = useState("")
  const [selected, setSelected] = useState<Record<string, string[]>>({})

  useEffect(() => {
    if (debounceMs <= 0) { setDebouncedQuery(query); return }
    const id = setTimeout(() => setDebouncedQuery(query), debounceMs)
    return () => clearTimeout(id)
  }, [query, debounceMs])

  const stopWordSet = useMemo(() => new Set(stopWords.map(normalizeText)), [stopWords])
  const tokens = useMemo(() => tokenize(debouncedQuery, stopWordSet), [debouncedQuery, stopWordSet])

  const filtering = tokens.length > 0 || facets.some(facet => (selected[facet.key] ?? []).length > 0)

  const shown = useMemo(() => items
    .map((item, index) => ({ item, index, ...evaluateItem(item, locale, tokens, fields, fuzzyWeight, fuzzyDistance) }))
    .filter(({ item, passes }) => passesFacets(item, facets, selected) && (tokens.length === 0 || passes))
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .map(({ item }) => item), [items, locale, fields, facets, selected, tokens, fuzzyWeight, fuzzyDistance])

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
        <div className="flex items-center gap-3">
          <div className="relative flex-1 flex items-center">
            <Icon src="clue" type="white" width={18} height={18} title="search" className="absolute left-4 opacity-50 pointer-events-none" />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder={placeholder}
              className="w-full rounded-full bg-miquel-black-300 -ml-4 pl-10 pr-4 py-2 text-sm outline-none"
            />
          </div>
          {controls}
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

function evaluateItem<T>(item: T, locale: SearchLocale, tokens: string[], fields: SearchField<T>[], fuzzyWeight: number, fuzzyDistance: number) {
  if (tokens.length === 0) return { score: 0, passes: true }

  const tokenPassed = new Array<boolean>(tokens.length).fill(false)
  let score = 0

  for (let t = 0; t < tokens.length; t++) {
    const token = tokens[t]
    for (const field of fields) {
      const normalized = normalizeText(field.text(item, locale))
      if (normalized.includes(token)) {
        score += field.score
        tokenPassed[t] = true
        continue
      }
      if (fuzzyWeight <= 0) continue
      const words = splitWords(normalized)
      for (const word of words) {
        if (levenshtein(token, word, fuzzyDistance)) {
          score += field.score * fuzzyWeight
          tokenPassed[t] = true
          break
        }
      }
    }
  }

  return { score, passes: tokenPassed.every(Boolean) }
}

function levenshtein(a: string, b: string, maxDistance: number): boolean {
  if (Math.abs(a.length - b.length) > maxDistance) return false
  if (a === b) return true
  if (maxDistance === 1) return levenshtein1(a, b)
  return levenshteinDP(a, b, maxDistance)
}

function levenshtein1(a: string, b: string): boolean {
  const la = a.length, lb = b.length
  if (la === lb) {
    let diffs = 0
    for (let i = 0; i < la; i++) { if (a[i] !== b[i] && ++diffs > 1) return false }
    return diffs === 1
  }
  const longer = la > lb ? a : b
  const shorter = la > lb ? b : a
  let i = 0, j = 0, skipped = false
  while (i < longer.length && j < shorter.length) {
    if (longer[i] !== shorter[j]) {
      if (skipped) return false
      skipped = true
      i++
    } else { i++; j++ }
  }
  return true
}

function levenshteinDP(a: string, b: string, maxDistance: number): boolean {
  const la = a.length, lb = b.length
  let prev = new Uint8Array(lb + 1)
  for (let j = 0; j <= lb; j++) prev[j] = j
  for (let i = 1; i <= la; i++) {
    let prevDiag = prev[0]
    prev[0] = i
    let rowMin = i
    for (let j = 1; j <= lb; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1
      const entry = Math.min(prevDiag + cost, prev[j] + 1, prev[j - 1] + 1)
      prevDiag = prev[j]
      prev[j] = entry
      if (entry < rowMin) rowMin = entry
    }
    if (rowMin > maxDistance) return false
  }
  return prev[lb] <= maxDistance
}

const WORD_SPLIT_RE = /[^\p{L}\p{N}+#.-]+/u

function splitWords(text: string): string[] {
  return text.split(WORD_SPLIT_RE).filter(Boolean)
}

function tokenize(query: string, stopWords: Set<string>) {
  return normalizeText(query)
    .split(WORD_SPLIT_RE)
    .filter(token => token && !stopWords.has(token))
}

function normalizeText(value: unknown): string {
  if (typeof value !== "string") return ""
  return value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
}
