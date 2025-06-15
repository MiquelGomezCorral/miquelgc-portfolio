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
  const containerRef = useRef<HTMLDivElement>(null);
  const [fits, setFits] = useState(true);

  useLayoutEffect(() => {
    if (containerRef.current) {
      const container = containerRef.current;
      setFits(container.scrollWidth <= container.clientWidth);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const container = containerRef.current;
        setFits(container.scrollWidth <= container.clientWidth);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return(
    <figure ref={containerRef} className={cn("",className)}>
      {fits ? 
        <div className='flex gap-2 flex-wrap w-max'>
          {technologies.map((tech, idx) =>
            <Technology key={idx} src={tech} />
          )}
        </div>
      :
        <Marquee
          className="[--duration:20s] w-full py-0">
          {technologies.map((tech, idx) =>
            <Technology key={idx} src={tech} />
          )}
        </Marquee>
      }
    </figure>
  )
}