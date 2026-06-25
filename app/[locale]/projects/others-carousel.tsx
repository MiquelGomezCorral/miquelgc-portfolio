"use client"

import cn from "classnames"

import { Carrousel, useCarrousel } from "@/app/[locale]/(utils)/(components)/Carrousel"
import { IconButtonArrow } from "@/app/[locale]/(utils)/(components)/Icons"
import type { ProjectType } from "@/app/[locale]/(utils)/(constants)/project.text.d"
import { Project } from "./elements"

export function OthersCarousel({ projects }: { projects: ProjectType[] }) {
  const { scrollContainerRef, scrollOn, scrollLeft, scrollRight, scrollSlider } = useCarrousel({ list: projects })

  if (projects.length === 0) return null

  return (
    <main className="flex relative flex-col xl:flex-row items-center gap-4 group">
      <Carrousel scrollContainerRef={scrollContainerRef} scrollSlider={scrollSlider}>
        {projects.map((object, idx) =>
          <Project key={idx} object={object} descriptionBelow/>
        )}
      </Carrousel>

      <div className="flex gap-4">
        <IconButtonArrow width={20} height={20} src="chevron-left" title="left"
          disable={scrollOn === 0 || projects.length <= 1}
          onClick={scrollLeft}
          className={cn(
            "xl:absolute xl:-left-12 xl:top-1/2 xl:-translate-y-1/2 " +
            "static order-last transform duration-300 xl:group-hover:scale-125 " +
            " xl:py-24 flex justify-center hover:bg-miquel-black-100/20 rounded-md md:opacity-100 opacity-0 xl:animate-pulse hover:animate-none",
            {"xl:hidden hover:bg-miquel-black-100/0 cursor-not-allowed": scrollOn === 0}
          )}
        />
        <IconButtonArrow width={20} height={20} src="chevron-right" title="right"
          onClick={scrollRight}
          disable={scrollOn === 2 || projects.length <= 1}
          className={cn(
            "xl:absolute xl:-right-12 xl:top-1/2 xl:-translate-y-1/2 " +
            "static order-last transform duration-300 xl:group-hover:scale-125 " +
            " xl:py-24 flex justify-center hover:bg-miquel-black-100/20 rounded-md md:opacity-100 opacity-0 xl:animate-pulse hover:animate-none",
            {"xl:hidden hover:bg-miquel-black-100/0 cursor-not-allowed": scrollOn === 2},
          )}
        />
      </div>
    </main>
  )
}
