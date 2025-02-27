"use client"

import cn from 'classnames';

import GlowingText from "@/app/[locale]/(utils)/(components)/GlowingText";
import { getStudies } from "@/app/[locale]/(utils)/(constants)/studies.text.d";
import { IconButtonArrow, Icon } from "@/app/[locale]/(utils)/(components)/IconsButtons";
import { useCarrousel } from '@/app/[locale]/(utils)/(components)/Carrousel';
import { Card } from '@/app/[locale]/(utils)/(components)/Card';
import { useTranslation } from 'react-i18next';

export default function StudiesSection() {
  const {t} = useTranslation("studies")
  const Studies = getStudies(t)
  const  { scrollContainerRef, scrollOn, scrollLeft, scrollRight, scrollSlider } = useCarrousel({list: Studies})

  return (
    <section id="studies" className="w-full flex flex-col gap-6 group">
      <header className="w-full py-4 border-b-2 border-b-miquel-white-200/50 text-5xl font-bold transform duration-300 flex gap-2">
        <GlowingText>
          <Icon 
            src={`miscelanea`}
            width={50}
            height={50}
            type={"color"}
            title={'Studies'}
          />
        </GlowingText>
        {t("title")}
      </header>

      <main className="flex relative flex-col xl:flex-row items-center gap-4">
        <div 
          className="grid grid-flow-col md:auto-cols-[minmax(45rem,1fr)] auto-cols-[minmax(25rem,1fr)] gap-2 w-full h-full overflow-x-scroll"
          ref={scrollContainerRef}
          onScroll={scrollSlider}
        >
          {Studies.map((object, idx) =>
            <Card key={idx} object={object} />
          )}
        </div>

        <div className='flex gap-4'>
          <IconButtonArrow width={20} height={20} src={'chevron-left'} title={'left'}
            disable={scrollOn === 0}
            onClick={scrollLeft}
            className={cn(
              "xl:absolute xl:-left-12 xl:top-1/2 xl:-translate-y-1/2 " + // Large screens
              "static order-last transform duration-300 xl:group-hover:scale-125 " + // Small screens
              " xl:py-24 flex justify-center hover:bg-miquel-black-100/20 rounded-md md:opacity-100 opacity-0 xl:animate-pulse hover:animate-none",
              {"xl:hidden hover:bg-miquel-black-100/0 cursor-not-allowed": scrollOn === 0}
            )}
          />
          <IconButtonArrow width={20} height={20} src={'chevron-right'} title={'right'} 
            onClick={scrollRight}
            disable={scrollOn === 2}
            className={cn(
              "xl:absolute xl:-right-12 xl:top-1/2 xl:-translate-y-1/2 " + // Large screens
              "static order-last transform duration-300 xl:group-hover:scale-125 " + // Small screens
              " xl:py-24 flex justify-center hover:bg-miquel-black-100/20 rounded-md md:opacity-100 opacity-0 xl:animate-pulse hover:animate-none",
              {"xl:hidden hover:bg-miquel-black-100/0 cursor-not-allowed": scrollOn === 2},
            )}
          />
        </div>

      </main>
    
    </section>
  )
}
