"use client"

import cn from 'classnames';
import Image from "next/image";

import Link from "next/link";
import GlowingText from "@/app/(utils)/(components)/GlowingText";
import { IconLink, IconCopy, IconButtonArrow } from "@/app/(utils)/(components)/IconsButtons";

export default function TechnologiesSection() {

  return (
    <section id="technologies" className="w-full flex flex-col gap-6 group">
      <header className="w-full py-4 border-b-2 border-b-miquel-white-200/50 text-5xl font-bold transform duration-300 flex gap-2">
        <GlowingText>
          <Image 
            src={`/assets/icons/terminal-color.svg`} alt={'experiencek'}
            width={50}
            height={50}
            title={'experience'}
          />
        </GlowingText>
        {"Tecnologías"}
      </header>

      <main className="flex relative flex-col xl:flex-row items-center gap-4">
      
      </main>
    
    </section>
  )
}
