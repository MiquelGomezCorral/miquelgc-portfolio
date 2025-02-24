import Image from "next/image";
import Link from "next/link";
import { TechnologyMarquee } from '@/app/[locale]/(utils)/(components)/Technologies';
import GlowingText from "./GlowingText";
import { IconCopy, IconLink } from "./IconsButtons";
import { TechnologyString } from "@/app/[locale]/(utils)/(constants)/technologies.d";

export type CardType = { 
    title: string, 
    company: string,
    place: string,
    date: string, 
    description: string, 
    technologies: TechnologyString[], 
    logo: string,
    link: string,
    silly: string,
  }

export function Card({ object }: { object: CardType }) {
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
                src={`/assets/${object.logo}.svg`} alt={object.logo}
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
              <span className="flex w-full gap-4">
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
            
          <TechnologyMarquee technologies={object.technologies}/>
  
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
  
  