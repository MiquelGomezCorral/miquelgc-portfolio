import Image from "next/image";
import Link from "next/link";
import { EmptyProject, Project } from "../projects/elements";
import { ProjectS } from "../(utils)/(constants)/project.text.d";
import GlowingText from "../(utils)/(components)/GlowingText";
import { Experiences, ExperienceType } from "../(utils)/(constants)/experience.text.d";
import { Technology } from "../(utils)/(constants)/technologies.d";
import { IconLink } from "../(utils)/(components)/IconsButtons";

export default function Experience() {
  return (
    <section id="Projects" className="w-full flex flex-col gap-6">
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

      <main className="grid grid-flow-col auto-cols-[minmax(45rem,1fr)] gap-2 w-full h-full overflow-x-scroll">
        {Experiences.map((object, idx) =>
          <ExperienceCard key={idx} object={object} />
        )}
      </main>
    
    </section>
  )
}
function ExperienceCard({ object, disabled }: { object: ExperienceType, disabled?: boolean }) {
  return( 
    <li 
      className={
        "w-[45rem] h-full hover:bg-miquel-black-400/40 rounded-xl transform duration-300 group "+
        "gap-4 p-4 flex flex-col justify-between list-none"
    }>
      <main className="flex flex-col gap-4">
        <header className="w-[50rem] h-full flex gap-4">
          <Link href={object.link} target="_blank" className={
            "group/img relative w-1/3 h-16 rounded-xl aspect-video col-span-1 flex justify-center items-center overflow-hidden p-6 py-10"
            +" lg:col-span-5 bg-gradient-to-r from-miquel-white-200 to-miquel-white-100 hover:outline hover:outline-miquel-black-100" 
            }
            // onClick={() => goToPageFrom(window.location.pathname, object.link)}
          >
            <Image 
              src={`/assets/experience/${object.logo}.svg`} alt={object.logo}
              width={200}
              height={200}
              title={object.logo}
              // className="cursor-pointer"
            />
          </Link>

          <aside className="flex flex-col gap-2 justify-between col-span-1 lg:col-start-6 lg:col-span-7 "> 
            <span>
              <header className="flex text-nowrap items-end gap-3">
                <h2 className="text-2xl">
                  <GlowingText bold>{object.title}</GlowingText>{/*: <i>{object.company}</i>*/}
                </h2>
                <IconLink
                  src="external-link" title={object.title}
                  width={25} height={25}
                  link={object.link}
                  blank
                  className="opacity-0 group-hover:opacity-100 transform duration-300"
                />
              </header>
              <p className="opacity-50">{object.date}</p>
            </span>
          </aside>
        </header>

        <p className="opacity-70 ">{object.description}</p>

        <footer className="flex gap-2 flex-wrap">
          {object.technologies.map((tech, idx) =>
            <Technology key={idx} src={tech} />
          )}
        </footer>
      </main>

      <figure className="w-full flex items-center">
        <div className="h-10 w-10 rounded-full bg-miquel-white-100 border-miquel-blue-200 border-4 z-20 group-hover:-translate-y-1 transition duration-300"/>
        <div className="h-2 w-full -translate-x-2 rounded-md bg-miquel-white-100 border-miquel-blue-200 border-2 z-10" />
      </figure>

    </li>
)}
