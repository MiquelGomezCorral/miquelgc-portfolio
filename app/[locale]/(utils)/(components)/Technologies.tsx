"use client"
import cn from "classnames"
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { TechnologyString, Technology } from "@/app/[locale]/(utils)/(constants)/technologies.d";
import { Marquee } from "./Marquee";

export function TechnologyList({technologies, className}: {technologies: TechnologyString[], className?: string}){
  return(
    <div className={cn("flex flex-wrap gap-2 w-full h-full items-center", className)}>
      {technologies.map((tech, idx) =>
        <Technology key={idx} src={tech} />
      )}
    </div>
  )
}

export function TechnologyMarquee({technologies, className}: {technologies: TechnologyString[], className?: string}){
  const containerRef = useRef<HTMLDivElement>(null)
  const measureRef = useRef<HTMLDivElement>(null)
  const [fits, setFits] = useState(true)

  useLayoutEffect(() => {
    if (containerRef.current && measureRef.current) {
      setFits(measureRef.current.scrollWidth <= containerRef.current.clientWidth)
    }
  }, [technologies])

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current && measureRef.current) {
        setFits(measureRef.current.scrollWidth <= containerRef.current.clientWidth)
      }
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [technologies])

  const pills = technologies.map((tech, idx) =>
    <Technology key={idx} src={tech} />
  )

  return(
    <figure ref={containerRef} className={cn("relative w-full overflow-hidden", className)}>
      <div ref={measureRef} className="absolute flex gap-2 w-full invisible pointer-events-none overflow-hidden" aria-hidden>
        {pills}
      </div>
      {fits ?
        <div className='flex gap-2 flex-wrap w-max'>
          {pills}
        </div>
      :
        <Marquee className="[--duration:20s] w-full py-0">
          {pills}
        </Marquee>
      }
    </figure>
  )
}
