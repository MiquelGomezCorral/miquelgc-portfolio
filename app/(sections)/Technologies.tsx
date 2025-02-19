
import cn from 'classnames';
import Image from "next/image";

import Link from "next/link";
import GlowingText from "@/app/(utils)/(components)/GlowingText";
import { IconLink, IconCopy, Icon } from "@/app/(utils)/(components)/IconsButtons";
import { TechnologyString } from '@/app/(utils)/(constants)/technologies.d';
import { TechnologyMarquee } from '@/app/(utils)/(components)/Technologies';

type TechnologyCathegoryType = {
  title: string,
  description: string,
  techStars45: TechnologyString[],
  tehcStars34: TechnologyString[],
}
const TechnologyCathegories: TechnologyCathegoryType[] = [
  {
    title: "Lenguajes de Progaramación", 
    description: "Lenguajes de Progaramación para desarrollo. Desde aplicaciones de escritorio o web hasta moviles",
    techStars45: ["python", "typescript", "react", "css", "java"], 
    tehcStars34:["c", "c++", "c-sharp", "risc-v", "haskell", "prolog"]
  }
]

export default function TechnologiesSection() {

  return (
    <section id="technologies" className="w-full flex flex-col gap-6 group">
      <header className="w-full py-4 border-b-2 border-b-miquel-white-200/50 text-5xl font-bold transform duration-300 flex gap-2">
        <GlowingText>
          <Icon 
            src={`terminal`}
            width={50}
            height={50}
            color
            title={'technologies'}
          />
        </GlowingText>
        {"Tecnologías"}
      </header>

      <main className="grid grid-cols-2 gap-4">
        {TechnologyCathegories.map((object, idx) => 
          <ExperienceCard key={idx} object={object} />
        )}
      </main>
    
    </section>
  )
}

function ExperienceCard({ object }: { object: TechnologyCathegoryType }) {
  return( 
    <li 
      className={
        "md:w-[45rem] w-[25rem] h-full hover:bg-miquel-black-400/40 rounded-xl transform duration-300 group/li "+
        "gap-4 p-4 flex flex-col justify-between list-none"
    }>
      <main className="flex flex-col gap-4">
        <header className="w-full h-full flex md:flex-row flex-col md:justify-start justify-center md:items-start items-center gap-4">
          <figure></figure>

          <aside className="flex flex-col justify-between"> 
            <header className="flex flex-col">
              <h2 className="text-2xl flex items-end md:justify-start justify-center gap-3">
                <GlowingText bold>{object.title}</GlowingText>
              </h2>
            </header>
            <span className=" flex justify-between w-full gap-6">
              AAAAAAA
            </span>
          </aside>
        </header>

        <TechnologyMarquee technologies={object.techStars45}/>
        <TechnologyMarquee technologies={object.tehcStars34}/>
      
      </main>
      
      <footer className='flex flex-col gap-4'>
          
        <p className="opacity-70">{object.description}</p>
      </footer>

    </li>
)}