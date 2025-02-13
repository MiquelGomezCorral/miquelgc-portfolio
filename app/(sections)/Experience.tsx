import Image from "next/image";
import Link from "next/link";
import { EmptyProject, Project } from "../projects/elements";
import { ProjectS } from "../(utils)/(constants)/project.text.d";
import GlowingText from "../(utils)/(components)/GlowingText";
import { Experiences, ExperienceType } from "../(utils)/(constants)/experience.text.d";
import { Technology } from "../(utils)/(constants)/technologies.d";

export default function Experience() {
  return (
    <section id="Projects" className="w-full flex flex-col gap-6">
      <header className="w-full py-4 border-b-2 border-b-miquel-white-200/50">
        <Link href="/projects" className="text-5xl font-bold opacity-70 hover:opacity-100 transform duration-300 cursor-pointer flex gap-2">
          <GlowingText>
            <Image 
              src={`/assets/icons/experience-color.svg`} alt={'experiencek'}
              width={50}
              height={50}
              title={'experience'}
              className="cursor-pointer"
            />
          </GlowingText>
          {"Experiencia"}
        </Link>
      </header>

      <main className="flex justify-start gap-2 w-max h-60 overflow-x-scroll">
        {Experiences.map((object, idx) =>
        <ExperienceElement key={idx} object={object} />
        )}
      </main>
    
    </section>
  )
}
function ExperienceElement({ object, disabled }: { object: ExperienceType, disabled?: boolean }) {
  return( 
    <li 
      className={
        "w-[35rem] h-max opacity-70 hover:opacity-100 hover:bg-miquel-black-400/40 rounded-xl transform duration-300 group "+
        "gap-4 p-4 flex "
      }
      >
      <Image 
        src={`/assets/experience/${object.logo}.png`} alt={'Solver'}
        width={200}
        height={50}
        // fill
        title={'Solver'}
        // className="cursor-pointer"
      />
      <aside className="flex flex-col justify-between">

        AAAA AAAAAAAAAAAAAAAAAAAAAAAA

        <footer className="flex gap-2 flex-wrap">
          {object.technologies.map((tech, idx) =>
            <Technology key={idx} src={tech} />
          )}
        </footer>
      </aside>

    </li>
)}
