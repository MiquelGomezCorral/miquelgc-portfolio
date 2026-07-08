"use client"

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import cn from 'classnames';
import { IconLink } from "@/app/[locale]/(utils)/(components)/Icons";
import { ProjectType } from "@/app/[locale]/(utils)/(constants)/project.text.d";
import GlowingText from "@/app/[locale]/(utils)/(components)/GlowingText";
import { TechnologyMarquee } from "@/app/[locale]/(utils)/(components)/Technologies";

export function Project({ object, disabled, seeMore, descriptionBelow, linkGit = false }: { object: ProjectType, disabled?: boolean, seeMore?: boolean, descriptionBelow?: boolean, linkGit?: boolean }) {
  const pathname = usePathname()
  const fromProjects = pathname === "/projects" || pathname === "/es/projects"
  const projectLink = fromProjects ? `${object.link}?from=projects` : object.link
  const cardLink = linkGit ? object.github : projectLink
  const linkTarget = linkGit ? "_blank" : undefined
  const linkRel = linkGit ? "noopener noreferrer" : undefined
  const [gifKey, setGifKey] = useState(0)

  const image = object.logo && (
    <Link
      href={cardLink}
      target={linkTarget}
      rel={linkRel}
      onMouseEnter={() => setGifKey(key => key + 1)}
      className={
        "group/img relative w-full rounded-xl aspect-video col-span-1 flex justify-center lg:justify-end items-center overflow-hidden miquel-frame-dark " +
        "lg:max-h-64 lg:col-span-4 bg-gradient-to-r from-miquel-blue-400 to-indigo-400"
      }
    >
      <Image
        src={object.logo.startsWith("http") ? object.logo : `/assets/projects/${object.logo}.webp`}
        alt={object.title}
        width={800}
        height={450}
        className={cn("rounded-xl w-[95%] lg:w-10/12 group-hover/img:lg:w-11/12 lg:translate-x-4 transition-[width,transform, opacity] duration-500 aspect-video",{
          'group-hover/img:opacity': object.gif, 
          // '': object.gif === undefined
        }
        )}
      />
      {object.gif && (
        <Image
        key={gifKey}
        src={object.gif.startsWith("http") ? object.gif : `/assets/projects/${object.gif}.webp`}
        alt={object.title}
        width={800}
        height={450}
        className={"absolute rounded-xl w-[95%] lg:w-10/12 group-hover/img:lg:w-11/12 lg:translate-x-4 transition-[width,transform,opacity] duration-500 aspect-video group-hover/img:opacity-100 opacity-0"

        }
        />
      )}
    </Link>
  )

  const title = (
    <header className="flex items-end gap-3">
      <Link
        href={cardLink}
        target={linkTarget}
        rel={linkRel}
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
  )

  const meta = (
    <span className="flex w-full gap-4 opacity-50">
      {object.date && <p>{object.date}</p>}
      <p>{object.finished}</p>
    </span>
  )

  const description = <p className="opacity-70 text-pretty">{object.descriptionShort}</p>
  const technologies = <TechnologyMarquee technologies={object.technologies} />

  if (descriptionBelow) {
    return (
      <li className="relative flex h-full flex-col gap-4 p-4 rounded-xl transition-[background-position,background-color] duration-300 group/proyect hover:bg-miquel-black-500">
        <main className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {image}

          <article className={cn("flex flex-col gap-2 justify-center col-span-1", {
            "lg:col-start-5 lg:col-span-8": object.logo,
            "lg:col-span-12": !object.logo,
          })}>
            {title}
            {meta}
          </article>
        </main>

        <p className="flex-1 opacity-70 text-pretty">{object.descriptionShort}</p>

        {technologies}
      </li>
    )
  }

  return (
    <li
      className={cn(
        "relative grid grid-cols-1 lg:max-h-64 lg:grid-cols-12 gap-4 p-4 rounded-xl transition-[background-position,background-color,height,padding,filter] duration-300 group/proyect",
        {
          "hover:bg-miquel-black-500" : !disabled,
          "pt-1 h-16 overflow-hidden blur-sm": seeMore
      })} // hover:scale-105
    >
      {image}

      <article className={cn("flex flex-col gap-2 justify-between col-span-1", {
        "lg:col-start-5 lg:col-span-8": object.logo,
        "lg:col-span-12": !object.logo,
      })}>
        <span>
          {title}
          {meta}
        </span>

        {description}

        {technologies}
      </article>
    </li>
  )
}

export function SeeMoreProject({ object, text }: { object: ProjectType, text: string }) {
  return (
    <div className="relative rounded-xl miquel-opacity cursor-pointer"> 
      <Link
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

