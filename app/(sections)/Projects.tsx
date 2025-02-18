import Link from "next/link";
import { SeeMoreProject, Project } from "@/app/projects/elements";
import { ProjectS } from "@/app/(utils)/(constants)/project.text.d";
import GlowingText from "@/app/(utils)/(components)/GlowingText";

export default function Projects() {
  return (
    <section id="Projects" className="w-full flex flex-col gap-6 group/proyects">
      <header className="w-full py-4 border-b-2 border-b-miquel-white-200/50">
        <Link href="/projects" className="text-5xl font-bold opacity-70 group-hover/proyects:opacity-100 transform duration-300 flex gap-2">
          <GlowingText className="cursor-pointer">
            {"</>"}
          </GlowingText>
          {"Proyectos"}
        </Link>
      </header>

      <main className="flex flex-col justify-center gap-6">
        {ProjectS.slice(0,4).map((object, idx) =>
          <Project key={idx} object={object}/>
        )}
      </main>
      
      <Link 
        href="/projects"
        className="relative rounded-xl opacity-70 hover:opacity-100 hover:bg-miquel-black-400/20 transform duration-300 cursor-pointer">
        <span className="absolute left-1/2 transform -translate-x-1/2 top-6 text-2xl">
          Ver más
        </span>
        <figure className="pt-1 h-20 overflow-hidden blur-sm">
          <SeeMoreProject object={ProjectS[4]}/>
        </figure>
      </Link>
    </section>
  )
}

