"use client"

import { useTranslation } from 'react-i18next';
import Image from "next/image";
import Link from "next/link";
import cn from 'classnames';
import { TechnologyMarquee } from '@/app/[locale]/(utils)/(components)/Technologies';
import GlowingText from "./GlowingText";
import { IconCopy, IconLink } from "./Icons";
import { useToastStore } from "./Toast";
import { TechnologyString } from "@/app/[locale]/(utils)/(constants)/technologies.d";
import CONFIG from "@/app/[locale]/(utils)/(constants)/configuration";

export type CardType = { 
    title: string, 
    company: string,
    place: string,
    date: string, 
    description: string, 
    technologies: TechnologyString[], 
    logo: string,
    link: string,
    silly: string,
}

export function Card({ object }: { object: CardType }) {
    const { t } = useTranslation("general")
    const current = CONFIG.currentDateWords.some(word => object.date.toLowerCase().includes(word.toLowerCase()))

    return(
      <li className={cn(
        "group/li md:w-[45rem] w-[25rem] h-full rounded-xl gap-4 p-4 flex flex-col justify-between list-none transition-[background-color] duration-300",
        current ? "hover:bg-miquel-green-900-a/20" : "hover:bg-miquel-black-500"
      )}>
        <main className="flex flex-col gap-4">
          <header className="w-full h-full flex md:flex-row flex-col md:justify-start justify-center md:items-start items-center gap-4">
            <Link href={object.link} target="_blank" className={
              "group/img relative md:w-1/3 md:h-[6rem] w-full rounded-xl aspect-video col-span-1 flex justify-center items-center overflow-hidden p-6 py-10"
              +" lg:col-span-5 bg-gradient-to-r from-miquel-white-200 to-miquel-white-100 miquel-frame-light" 
            }>
              <Image 
                src={`/assets/${object.logo}.svg`} alt={object.logo}
                width={200}
                height={200}
                title={object.logo}
                className="w-10/12 group-hover/img:w-11/12 transition-[width] duration-500 object-contain"
              />
            </Link>
  
            <aside className="flex flex-col justify-between"> 
              <header className="flex flex-col">
                <h2 className="text-2xl text-balance flex items-end md:justify-start justify-center gap-3">
                  <Link href={object.link} target="_blank" className="opacity-90 hover:opacity-100 transition-opacity duration-300">
                    <GlowingText bold nowrap color={current ? "green" : "blue"}>{object.title}</GlowingText>
                  </Link>
                  <IconLink
                    src="external-link" title={object.title}
                    width={25} height={25}
                    link={object.link}
                    blank
                    className="opacity-0 group-hover/li:opacity-100 transition-opacity duration-300 md:block hidden -translate-y-1"
                  />
                </h2>
                <i className="text-xl flex md:justify-start justify-center">{object.company}</i>
              </header>
              <span className="flex w-full gap-4">
                <p className="opacity-50">{object.date} </p>
                <IconCopy
                  src="location-pin" title={object.place}
                  width={20} height={20}
                  copyText={object.place}
                  text={object.place}
                  className="!opacity-50 hover:!opacity-100"
                />
              </span>
            </aside>
          </header>
  
              <div className="opacity-70 text-pretty"><BoldText text={object.description} /></div>
        
        </main>
        
        <footer className='flex flex-col gap-4'>
            
          <TechnologyMarquee technologies={object.technologies}/>
  
          <figure className="w-full flex items-center opacity-80 group-hover/li:opacity-100 transition duration-300">
            <div className={
              cn("h-8 w-8 rounded-full border-4 z-20 group-hover/li:animate-spin-slow transition duration-1000",
              current ? "bg-miquel-green-100 border-miquel-green-400" : "bg-miquel-blue-100 border-miquel-blue-400")+
              " text-transparent group-hover/li:text-black/70 hover:cursor-pointer flex justify-center items-center text-xs "}
              onClick={() => useToastStore.getState().addToast(`${t("youFoundMe")} ${object.silly}`, 'info')}
              >
              {object.silly}
            </div>
            <div className={cn(
              "h-1 w-full -ml-1 rounded-md bg-miquel-white-100 border-[2.5px] z-10",
              current ? "border-miquel-green-400" : "border-miquel-blue-400"
            )} />
          </figure>
        </footer>
  
      </li>
  )}

function formatBold(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/).map((part, i) =>
    part.startsWith('**') && part.endsWith('**')
      ? <span key={i} className="font-bold text-white">{part.slice(2, -2)}</span>
      : <span key={i}>{part}</span>
  );
}

function BoldText({ text }: { text: string }) {
  const lines = text.split('\n');
  const groups: { type: 'text' | 'bullet', lines: string[] }[] = [];
  for (const line of lines) {
    const isBullet = line.startsWith('- ');
    const content = isBullet ? line.slice(2) : line;
    const prev = groups[groups.length - 1];
    if (prev && prev.type === (isBullet ? 'bullet' : 'text')) {
      prev.lines.push(content);
    } else {
      groups.push({ type: isBullet ? 'bullet' : 'text', lines: [content] });
    }
  }
  return <>{groups.map((g, gi) =>
    g.type === 'bullet'
      ? <ul key={gi} className="list-disc list-inside">{g.lines.map((l, li) => <li key={li}>{formatBold(l)}</li>)}</ul>
      : <div key={gi}>{g.lines.map((l, li) => <span key={li}>{li > 0 && <br />}{formatBold(l)}</span>)}</div>
  )}</>;
}
  
  
