import Image from "next/image";
import Link from "next/link";
import { SeeMoreProject, Project } from "@/app/projects/elements";
import { ProjectS } from "@/app/(utils)/(constants)/project.text.d";
import GlowingText from "@/app/(utils)/(components)/GlowingText";

export default function Projects() {
  return (
    <section id="Projects" className="w-full flex flex-col gap-6 group/proyects">
      <header className="w-full py-4 border-b-2 border-b-miquel-white-200/50">
        <Link href="/projects" className="text-5xl font-bold opacity-70 group-hover/proyects:opacity-100 transform duration-300 flex gap-2">
          <Image 
            src={`/assets/icons/html-color.svg`} alt={'experiencek'}
            width={50}
            height={50}
            title={'experience'}
          />
          {"Proyectos"}
        </Link>
      </header>

      <main className="flex flex-col justify-center gap-6">
        {ProjectS.slice(0,4).map((object, idx) =>
          <Project key={idx} object={object}/>
        )}
      </main>
      
      <SeeMoreProject object={ProjectS[4]}/>

    </section>
  )
}

