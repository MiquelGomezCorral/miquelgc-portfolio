"use client"


import GlowingText from "@/app/[locale]/(utils)/(components)/GlowingText";
import { Icon } from "@/app/[locale]/(utils)/(components)/IconsButtons";

export default function Skills() {

  return (
    <section id="skills" className="w-full flex flex-col gap-6 group">
      <header className="w-full py-4 border-b-2 border-b-miquel-white-200/50 text-5xl font-bold transform duration-300 flex gap-2">
        <GlowingText>
          <Icon 
            src={`miscelanea`}
            width={50}
            height={50}
            type={"color"}
            title={'skills'}
          />
        </GlowingText>
        {"Habilidades"}
      </header>

      <main className="flex relative flex-col xl:flex-row items-center gap-4">
      
      </main>
    
    </section>
  )
}
