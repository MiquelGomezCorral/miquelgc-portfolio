"use client"

import cn from 'classnames';

import type { TFunction } from 'i18next';
import { useTranslation } from 'react-i18next';

import { Card, type CardType } from '@/app/[locale]/(utils)/(components)/Card';
import { Section } from '@/app/[locale]/(utils)/(components)/Section';
import { IconButtonArrow } from "@/app/[locale]/(utils)/(components)/Icons";
import { useCarrousel } from '@/app/[locale]/(utils)/(components)/Carrousel';

interface CardCarouselProps {
  namespace: string;
  getData: (t: TFunction) => CardType[];
}

export default function CardCarousel({ namespace, getData }: CardCarouselProps) {
  const { t } = useTranslation(namespace)
  const items = getData(t)
  const { scrollContainerRef, scrollOn, scrollLeft, scrollRight, scrollSlider } = useCarrousel({ list: items })

  return (
    <Section id={t("id")} title={t("title")} iconName={t("icon")}>
      <main className="flex relative flex-col xl:flex-row items-center gap-4">
        <div 
          className="grid grid-flow-col md:auto-cols-[minmax(45rem,1fr)] auto-cols-[minmax(25rem,1fr)] gap-2 w-full h-full overflow-x-scroll"
          ref={scrollContainerRef}
          onScroll={scrollSlider}
        >
          {items.map((object, idx) =>
            <Card key={idx} object={object} />
          )}
        </div>

        <div className='flex gap-4'>
          <IconButtonArrow width={20} height={20} src={'chevron-left'} title={'left'}
            disable={scrollOn === 0 || items.length <= 1}
            onClick={scrollLeft}
            className={cn(
              "xl:absolute xl:-left-12 xl:top-1/2 xl:-translate-y-1/2 " +
              "static order-last transform duration-300 xl:group-hover:scale-125 " +
              " xl:py-24 flex justify-center hover:bg-miquel-black-100/20 rounded-md md:opacity-100 opacity-0 xl:animate-pulse hover:animate-none",
              {"xl:hidden hover:bg-miquel-black-100/0 cursor-not-allowed": scrollOn === 0}
            )}
          />
          <IconButtonArrow width={20} height={20} src={'chevron-right'} title={'right'} 
            onClick={scrollRight}
            disable={scrollOn === 2 || items.length <= 1}
            className={cn(
              "xl:absolute xl:-right-12 xl:top-1/2 xl:-translate-y-1/2 " +
              "static order-last transform duration-300 xl:group-hover:scale-125 " +
              " xl:py-24 flex justify-center hover:bg-miquel-black-100/20 rounded-md md:opacity-100 opacity-0 xl:animate-pulse hover:animate-none",
              {"xl:hidden hover:bg-miquel-black-100/0 cursor-not-allowed": scrollOn === 2},
            )}
          />
        </div>
      </main>
    </Section>
  )
}
