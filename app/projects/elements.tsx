"use client"

import Image from "next/image";
import Link from "next/link";
import cn from 'classnames';
import { IconLink } from "@/app/(utils)/(components)/IconsButtons";
import { ProjectType } from "@/app/(utils)/(constants)/project.text.d";
import { usePageStackStore } from "@/app/(global_state)/state";
import { Technology } from "@/app/(utils)/(constants)/technologies.d";
import GlowingText from "@/app/(utils)/(components)/GlowingText";
import { Marquee } from "@/app/(utils)/(components)/Marquee";
import { TechnologyMarquee } from "@/app/(utils)/(components)/Technologies";


export function Project({ object, disabled }: { object: ProjectType, disabled?: boolean }) {
  const { goToPageFrom } = usePageStackStore()

  return (
    <li
      className={cn("relative grid gird-cols-1 lg:grid-cols-12 gap-4 p-4 rounded-xl transform duration-300 group", { "hover:bg-miquel-black-400/40": !disabled })} // hover:scale-105
    >
      <Link href={object.link} className={
        "group/img relative w-full rounded-xl aspect-video col-span-1 flex justify-end items-center overflow-hidden"+  " " +
        "lg:col-span-5 bg-gradient-to-r from-miquel-blue-400 to-indigo-400 hover:outline hover:outline-miquel-black-100" //from-blue-500 to-orange-500
        }
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

      <article className="flex flex-col gap-2 justify-between col-span-1 lg:col-start-6 lg:col-span-7">
        <span>
          <header className="flex items-end gap-3">
            <h2 className="text-2xl">{object.title}</h2>
            <IconLink
              src="external-link" title={object.title}
              width={25} height={25}
              link={object.link}
              className="opacity-0 group-hover:opacity-100 transform duration-300"
            />
          </header>
          <p className="opacity-50">{object.finished ? "Terminado" : "En progreso"}</p>
        </span>

        <p className="opacity-70 ">{object.descriptionShort}</p>

        <TechnologyMarquee technologies={object.technologies} />
      </article>
    </li>
  )
}

export function SeeMoreProject({ object }: { object: ProjectType }) {
  const { goToPageFrom } = usePageStackStore()

  return (
    <Link 
      onClick={() => goToPageFrom(window.location.pathname, object.link)}

      href="/projects"
      className="relative rounded-xl opacity-70 hover:opacity-100 hover:bg-miquel-black-400/20 transform duration-300 cursor-pointer">
      <span className="absolute left-1/2 transform -translate-x-1/2 top-6 text-2xl">
        Ver más
      </span>

      <figure className="pt-1 h-20 overflow-hidden blur-sm">
        <li
          className="relative grid gird-cols-1 lg:grid-cols-12 gap-4 p-4 rounded-xl transform duration-300"
        >
          <figure className={
            " relative w-full rounded-xl aspect-video col-span-1 flex justify-end items-center overflow-hidden "+  " " +
            "lg:col-span-5 bg-gradient-to-r from-miquel-blue-400 to-indigo-400" 
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

          <article className="flex flex-col gap-2 justify-between col-span-1 lg:col-start-6 lg:col-span-7">
            <span>
              <header className="flex items-center gap-3 text-2xl">
                {object.title}
              </header>
              <p className="opacity-50">{object.finished ? "Terminado" : "En progreso"}</p>
            </span>
            <p className="opacity-70 ">{object.descriptionShort}</p>
          </article>
        </li>
      </figure>
    </Link>
    
  )
}

export function ProjectPageTemplate({object}: {object: ProjectType}) {
  return (
    <main className="w-full flex flex-col justify-center gap-10 rounded-xl">
      <header className="w-full h-full flex justify-center">
        <div className="relative max-w-3xl w-full h-full aspect-video">
          {object.youtube ? 
            <iframe
              // width="560"
              // height="315"
              src={object.youtube} // Replace with your video ID
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-xl w-full h-full"
            ></iframe>
            :
            <Image
              src={`/assets/projects/${object.logo}.webp`}
              alt={object.title}
              fill
              className="rounded-xl"
            /> 
          }
        </div>
      </header>

      <article className="flex flex-col gap-10">
        <section className="flex flex-col gap-6 col-span-7">
          <span>
            <header className="flex items-end gap-3">
              <h2 className="text-5xl">{object.title}</h2>

              {object.github &&
                <IconLink
                  src="external-link" title={object.title}
                  width={40} height={40}
                  link={object.github}
                  blank
                />
              }
            </header>
            <p className="opacity-50 text-xl">{object.finished ? "Terminado" : "En progreso"}</p>
          </span>

          <p className="opacity-70">{object.descriptionLong}</p>

          <GlowingText className="text-xl">Tecnologías</GlowingText>
          <TechnologyMarquee technologies={object.technologies} />
        </section>

        <section className="h-52 sm:h-96 w-full">
          <Marquee pauseOnHover
            className="[--duration:20s] w-full h-full">
            {object.screenShoots.map((screenShoot, idx) =>
              <CarrouselItem key={idx} screenShoot={screenShoot}/>
            )}
          </Marquee>
        </section>

      </article>
    </main>
  )
}



// =============================================
//              IMAGE CARROUSEL 
// =============================================

function CarrouselItem({ screenShoot }: { screenShoot: string}) {
  return (
    <figure className="relative h-full aspect-video" aria-label={screenShoot}>
      <Image
        src={`/assets/projects/${screenShoot}.webp`}
        alt={screenShoot}
        fill
        loading="eager"
        className="rounded-xl"
      />
    </figure>
  );
}