"use client"

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { TechnologyString, Technology } from "@/app/(utils)/(constants)/technologies.d";
import { Marquee } from "./Marquee";

export function TechnologyList({technologies}: {technologies: TechnologyString[]}){
  return(
    <div className="flex flex-wrap gap-2 w-full">
      {technologies.map((tech, idx) =>
        <Technology key={idx} src={tech} />
      )}
    </div>
  )
}

export function TechnologyMarquee({technologies}: {technologies: TechnologyString[]}){
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
    <figure ref={containerRef}>
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