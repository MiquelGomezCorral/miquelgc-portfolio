"use client"

import Image from "next/image";
import Link from "next/link";
import cn from 'classnames';
import { IconLink } from "@/app/[locale]/(utils)/(components)/Icons";
import { ProjectType } from "@/app/[locale]/(utils)/(constants)/project.text.d";
import { usePageStackStore } from "@/app/[locale]/(global_state)/state";
import GlowingText from "@/app/[locale]/(utils)/(components)/GlowingText";
import { TechnologyMarquee } from "@/app/[locale]/(utils)/(components)/Technologies";

export function Project({ object, disabled }: { object: ProjectType, disabled?: boolean }) {
  const { goToPageFrom } = usePageStackStore()

  return (
    <li
      className={cn("relative grid gird-cols-1 lg:max-h-64 lg:grid-cols-12 gap-4 p-4 rounded-xl transform duration-300 group/proyect", { "hover:bg-miquel-black-400/40": !disabled })} // hover:scale-105
    >
      <Link href={object.link} className={
        "group/img relative w-full rounded-xl aspect-video col-span-1 flex justify-end items-center overflow-hidden " +
        "lg:max-h-64 lg:col-span-4 bg-gradient-to-r from-miquel-blue-400 to-indigo-400 hover:outline-miquel-black-100" //from-blue-500 to-orange-500
        } // bg-gradient-to-r from-miquel-blue-400 to-indigo-400
        onClick={() => goToPageFrom(window.location.pathname, object.link)}
      >
        <Image
          src={`/assets/projects/${object.logo}.webp`}
          alt={object.title}
          // fill
          width={800}
          height={450}
          className="rounded-xl w-10/12 group-hover/img:w-11/12 translate-x-4 transform duration-500 aspect-video outline outline-miquel-white-500/40"
        />
      </Link>

      <article className="flex flex-col gap-2 justify-between col-span-1 lg:col-start-5 lg:col-span-8">
        <span>
          <header className="flex items-end gap-3">
            <Link
              href={object.link} onClick={() => goToPageFrom(window.location.pathname, object.link)} 
              className="opacity-90 hover:opacity-100 transform duration-300"  
            >
              <GlowingText bold className="text-2xl">{object.title}</GlowingText>
            </Link>
            <IconLink
              src="external-link" title={object.title}
              width={25} height={25}
              link={object.github} blank
              className="opacity-0 group-hover/proyect:opacity-100 transform duration-300"
            />
          </header>
          <p className="opacity-50">{object.finished}</p>
        </span>

        <p className="opacity-70 ">{object.descriptionShort}</p>

        <TechnologyMarquee technologies={object.technologies} />
      </article>
    </li>
  )
}

export function SeeMoreProject({ object, text }: { object: ProjectType, text: string }) {
  const { goToPageFrom } = usePageStackStore()

  return (
    <Link 
      onClick={() => goToPageFrom(window.location.pathname, object.link)}
      href="/projects"
      className="relative rounded-xl opacity-70 hover:opacity-100 hover:bg-miquel-black-400/20 transform duration-300 cursor-pointer"
    >
      <span className="z-10 absolute left-1/2 transform -translate-x-1/2 top-6 text-2xl">
        {text}
      </span>

      <figure className="pt-1 h-20 overflow-hidden blur-sm">
        <li
          className="relative grid gird-cols-1 lg:max-h-64 lg:grid-cols-12 gap-4 p-4 rounded-xl transform duration-300 group"
        >
          <figure className={
            " relative w-full rounded-xl aspect-video col-span-1 flex justify-end items-center overflow-hidden "+  " " +
            "lg:max-h-64 lg:col-span-4 bg-gradient-to-r from-miquel-blue-400 to-indigo-400" 
            }
          >
            <Image
              src={`/assets/projects/${object.logo}.webp`}
              alt={object.title}
              // fill
              width={800}
              height={450}
              className="rounded-xl w-10/12 translate-x-4 transform duration-500 aspect-video outline outline-miquel-white-500/40"
            />
          </figure>

          <article className="flex flex-col gap-2 justify-between col-span-1 lg:col-start-5 lg:col-span-8">
            <span>
              <header className="flex items-center gap-3 text-2xl opacity-70">
                <GlowingText className="text-2xl">{object.title}</GlowingText>
              </header>
              <p className="opacity-50">{object.finished}</p>
            </span>
            <p className="opacity-70 ">{object.descriptionShort}</p>
          </article>
        </li>
      </figure>
    </Link>
    
  )
}


