"use client"

import cn from 'classnames';
import Image from "next/image";

import Link from "next/link";
import GlowingText from "../(utils)/(components)/GlowingText";
import { Experiences, ExperienceType } from "../(utils)/(constants)/experience.text.d";
import { Technology } from "../(utils)/(constants)/technologies.d";
import { IconLink, IconCopy, IconButtonArrow } from "../(utils)/(components)/IconsButtons";
import { useCarrousel } from '../(utils)/(components)/Carrousel';
import { Marquee } from '../(utils)/(components)/Marquee';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';


export default function Experience() {
  const  { scrollContainerRef, scrollOn, scrollLeft, scrollRight, scrollSlider } = useCarrousel({list: Experiences})

  return (
    <section id="experiences" className="w-full flex flex-col gap-6 group">
      <header className="w-full py-4 border-b-2 border-b-miquel-white-200/50 text-5xl font-bold transform duration-300 flex gap-2">
        <GlowingText>
          <Image 
            src={`/assets/icons/experience-color.svg`} alt={'experiencek'}
            width={50}
            height={50}
            title={'experience'}
          />
        </GlowingText>
        {"Experiencia"}
      </header>

      <main className="flex relative flex-col xl:flex-row items-center gap-4">
        <div 
          className="grid grid-flow-col md:auto-cols-[minmax(45rem,1fr)] auto-cols-[minmax(25rem,1fr)] gap-2 w-full h-full overflow-x-scroll"
          ref={scrollContainerRef}
          onScroll={scrollSlider}
        >
          {Experiences.map((object, idx) =>
            <ExperienceCard key={idx} object={object} />
          )}
        </div>

        <div className='flex gap-4'>
          <IconButtonArrow width={20} height={20} src={'chevron-left'} title={'left'}
            disable={scrollOn === 0}
            onClick={scrollLeft}
            className={cn(
              "xl:absolute xl:-left-12 xl:top-1/2 xl:-translate-y-1/2 " + // Large screens
              "static order-last transform duration-300 xl:group-hover:scale-125 " + // Small screens
              " xl:py-24 flex justify-center hover:bg-miquel-black-100/20 rounded-md md:opacity-100 opacity-0 xl:animate-pulse hover:animate-none",
              {"xl:hidden hover:bg-miquel-black-100/0 cursor-not-allowed": scrollOn === 0}
            )}
          />
          <IconButtonArrow width={20} height={20} src={'chevron-right'} title={'right'} 
            onClick={scrollRight}
            disable={scrollOn === 2}
            className={cn(
              "xl:absolute xl:-right-12 xl:top-1/2 xl:-translate-y-1/2 " + // Large screens
              "static order-last transform duration-300 xl:group-hover:scale-125 " + // Small screens
              " xl:py-24 flex justify-center hover:bg-miquel-black-100/20 rounded-md md:opacity-100 opacity-0 xl:animate-pulse hover:animate-none",
              {"xl:hidden hover:bg-miquel-black-100/0 cursor-not-allowed": scrollOn === 2},
            )}
          />
        </div>

      </main>
    
    </section>
  )
}
function ExperienceCard({ object }: { object: ExperienceType }) {
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
    <li 
      className={
        "md:w-[45rem] w-[25rem] h-full hover:bg-miquel-black-400/40 rounded-xl transform duration-300 group/li "+
        "gap-4 p-4 flex flex-col justify-between list-none"
    }>
      <main className="flex flex-col gap-4">
        <header className="w-full h-full flex md:flex-row flex-col md:justify-start justify-center md:items-start items-center gap-4">
          <Link href={object.link} target="_blank" className={
            "group/img relative md:w-1/3 md:h-[6rem] w-full rounded-xl aspect-video col-span-1 flex justify-center items-center overflow-hidden p-6 py-10"
            +" lg:col-span-5 bg-gradient-to-r from-miquel-white-200 to-miquel-white-100 hover:outline hover:outline-miquel-black-100" 
            }
          >
            <Image 
              src={`/assets/experience/${object.logo}.svg`} alt={object.logo}
              width={200}
              height={200}
              title={object.logo}
              className="w-10/12 group-hover/img:w-11/12 transform duration-500"
            />
          </Link>

          <aside className="flex flex-col justify-between"> 
            <header className="flex flex-col">
              <h2 className="text-2xl flex items-end md:justify-start justify-center gap-3">
                <GlowingText bold>{object.title}</GlowingText>
                <IconLink
                  src="external-link" title={object.title}
                  width={25} height={25}
                  link={object.link}
                  blank
                  className="opacity-0 group-hover:opacity-100 transform duration-300 md:block hidden"
                />
              </h2>
              <i className="text-2xl flex md:justify-start justify-center">{object.company}</i>
            </header>
            <span className=" flex justify-between w-full gap-6">
              <p className="opacity-50">{object.date} </p>
              <IconCopy
                src="location-pin" title={object.place}
                width={20} height={20}
                copyText={object.place}
                text={object.place}
                className="!opacity-50 hover:!opacity-100"
              />
            </span>
          </aside>
        </header>

        <p className="opacity-70">{object.description}</p>
      
      </main>
      
      <footer className='flex flex-col gap-4'>
        <figure ref={containerRef}>
          {fits ? 
            <div className='flex gap-2 flex-wrap w-max'>
              {object.technologies.map((tech, idx) =>
                <Technology key={idx} src={tech} />
              )}
            </div>
          :
            <Marquee
              className="[--duration:20s] w-full py-0">
              {object.technologies.map((tech, idx) =>
                <Technology key={idx} src={tech} />
              )}
            </Marquee>
          }
        </figure>

        <figure className="w-full flex items-center opacity-80 group-hover/li:opacity-100 transition duration-300">
          <div className={
            "h-8 w-8 rounded-full bg-miquel-blue-100 border-miquel-blue-400 border-4 z-20 group-hover/li:animate-spin-slow transition duration-1000"+ 
            " text-transparent group-hover/li:text-black/70 hover:cursor-pointer flex justify-center items-center text-xs "}
            onClick={() => alert(`YOU FOUND ME! ${object.silly}`)}
            >
            {object.silly}
          </div>
          <div className="h-1 w-full -translate-x-2 rounded-md bg-miquel-white-100 border-miquel-blue-400 border-[2.5px] z-10" />
        </figure>
      </footer>

    </li>
)}
