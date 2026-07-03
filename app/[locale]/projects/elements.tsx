"use client"

import Image from "next/image";
import Link from "next/link";
import cn from 'classnames';
import { IconLink } from "@/app/[locale]/(utils)/(components)/Icons";
import { ProjectType } from "@/app/[locale]/(utils)/(constants)/project.text.d";
import { usePageStackStore } from "@/app/[locale]/(global_state)/state";
import GlowingText from "@/app/[locale]/(utils)/(components)/GlowingText";
import { TechnologyMarquee } from "@/app/[locale]/(utils)/(components)/Technologies";

export function Project({ object, disabled, seeMore, descriptionBelow, linkGit = false }: { object: ProjectType, disabled?: boolean, seeMore?: boolean, descriptionBelow?: boolean, linkGit?: boolean }) {
  const { goToPageFrom } = usePageStackStore()

  if (descriptionBelow) {
    return (
      <li className="relative flex flex-col gap-4 p-4 rounded-xl transition-[background-position] duration-300 group/proyect bg-miquel-gradient">
          <main className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {object.logo &&
          <Link href={linkGit ? object.github : object.link} 
            target={linkGit ? "_blank": ""}
            rel={linkGit ? "noopener noreferrer" : undefined}
            
            className={
            "group/img relative w-full rounded-xl aspect-video col-span-1 flex justify-center lg:justify-end items-center overflow-hidden miquel-frame-dark " +
            "lg:max-h-64 lg:col-span-4 bg-gradient-to-r from-miquel-blue-400 to-indigo-400"
            }
            onClick={() =>{if(!linkGit) goToPageFrom(window.location.pathname, object.link)}}
          >
            <Image
              src={object.logo.startsWith("http") ? object.logo : `/assets/projects/${object.logo}.webp`}
              alt={object.title}
              width={800}
              height={450}
              className="rounded-xl w-[95%] lg:w-10/12 group-hover/img:lg:w-11/12 lg:translate-x-4 transition-[width,transform] duration-500 aspect-video"
            />
          </Link>
          }

          <article className={cn("flex flex-col gap-2 justify-center col-span-1", {
            "lg:col-start-5 lg:col-span-8": object.logo,
            "lg:col-span-12": !object.logo,
          })}>
            <header className="flex items-end gap-3">
              <Link
                href={linkGit ? object.github : object.link} 
                target={linkGit ? "_blank": ""}
                rel={linkGit ? "noopener noreferrer" : undefined}
                onClick={() => {if(!linkGit) goToPageFrom(window.location.pathname, object.link)}} 
                className="opacity-90 hover:opacity-100 transition-opacity duration-300"  
              >
                <GlowingText bold className="text-2xl text-balance">{object.title}</GlowingText>
              </Link>
              <IconLink
                src="external-link" title={object.title}
                width={25} height={25}
                link={object.github} blank
                className="opacity-0 group-hover/proyect:opacity-100 transition-opacity duration-300 -translate-y-1"
              />
            </header>
            <span className="flex w-full gap-4 opacity-50">
              {object.date && <p>{object.date}</p>}
              <p>{object.finished}</p>
            </span>
          </article>
        </main>

        <p className="opacity-70 text-pretty">{object.descriptionShort}</p>

        <TechnologyMarquee technologies={object.technologies} />
      </li>
    )
  }

  return (
    <li
      className={cn(
        "relative grid grid-cols-1 lg:max-h-64 lg:grid-cols-12 gap-4 p-4 rounded-xl transition-[background-position,height,padding,filter] duration-300 group/proyect",
        {
          "bg-miquel-gradient" : !disabled, 
          "pt-1 h-16 overflow-hidden blur-sm": seeMore
      })} // hover:scale-105
    >
      <Link href={linkGit ? object.github : object.link}
        target={linkGit ? "_blank": ""}
        rel={linkGit ? "noopener noreferrer" : undefined}
        className={
        "group/img relative w-full rounded-xl aspect-video col-span-1 flex justify-center lg:justify-end items-center overflow-hidden miquel-frame-dark " +
        "lg:max-h-64 lg:col-span-4 bg-gradient-to-r from-miquel-blue-400 to-indigo-400" //from-blue-500 to-orange-500
        } // bg-gradient-to-r from-miquel-blue-400 to-indigo-400
        onClick={() => {if(!linkGit) goToPageFrom(window.location.pathname, object.link)}}
      >
        {object.logo &&
        <Image
          src={object.logo.startsWith("http") ? object.logo : `/assets/projects/${object.logo}.webp`}
          alt={object.title}
          // fill
          width={800}
          height={450}
          className="rounded-xl w-[95%] lg:w-10/12 group-hover/img:lg:w-11/12 lg:translate-x-4 transition-[width,transform] duration-500 aspect-video"
        />
        }
      </Link>

      <article className="flex flex-col gap-2 justify-between col-span-1 lg:col-start-5 lg:col-span-8">
        <span>
          <header className="flex items-end gap-3">
            <Link
              href={linkGit ? object.github : object.link}
              target={linkGit ? "_blank": ""}
              rel={linkGit ? "noopener noreferrer" : undefined}
              onClick={() => {if(!linkGit) goToPageFrom(window.location.pathname, object.link)}} 
              className="opacity-90 hover:opacity-100 transition-opacity duration-300"  
            >
              <GlowingText bold className="text-2xl text-balance">{object.title}</GlowingText>
            </Link>
            <IconLink
              src="external-link" title={object.title}
              width={25} height={25}
              link={object.github} blank
              className="opacity-0 group-hover/proyect:opacity-100 transition-opacity duration-300 -translate-y-1"
            />
          </header>
          <span className="flex w-full gap-4 opacity-50">
            {object.date && <p>{object.date}</p>}
            <p>{object.finished}</p>
          </span>
        </span>

        <p className="opacity-70 text-pretty">{object.descriptionShort}</p>

        <TechnologyMarquee technologies={object.technologies} />
      </article>
    </li>
  )
}

export function SeeMoreProject({ object, text }: { object: ProjectType, text: string }) {
  const { goToPageFrom } = usePageStackStore()

  return (
    <div className="relative rounded-xl miquel-opacity hover:bg-miquel-black-300/20 cursor-pointer"> 
      <Link 
        onClick={() => goToPageFrom(window.location.pathname, object.link)}
        href="/projects"
        className="absolute z-20 inset-0"
      > {/* The link ocupies the whole space, so you DONT click the project. The link is not nesting the project so there are not links inside other links */}
      </Link>
      <span className="z-10 absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2 text-2xl pointer-events-none">
        {text}
      </span>
      <Project object={object} seeMore/>
    </div>

  )
}


