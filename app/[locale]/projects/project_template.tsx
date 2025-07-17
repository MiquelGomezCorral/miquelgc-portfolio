
import Image from "next/image";
import { IconLink } from "@/app/[locale]/(utils)/(components)/Icons";
import { ProjectType } from "@/app/[locale]/(utils)/(constants)/project.text.d";
import GlowingText from "@/app/[locale]/(utils)/(components)/GlowingText";
import { TechnologyMarquee } from "@/app/[locale]/(utils)/(components)/Technologies";

import { Marquee } from "@/app/[locale]/(utils)/(components)/Marquee";
import Header from "@/app/[locale]/(sections)/Header";
import Footer from "@/app/[locale]/(sections)/Footer";
import type { TFunction } from "i18next";


export function ProjectPageTemplate({object,  t, params, headerDisplay}: {object: ProjectType, t: TFunction,  params:{locale: string}, headerDisplay?: React.ReactNode}) {
  return (
    <>
      <Header />
      
      <main className="max-w-[110rem] w-full flex flex-col gap-16 px-4 md:px-10 xl:px-48 2xl:px-64">
        <div className="w-full flex flex-col justify-center gap-10 rounded-xl">
          <header className="w-full h-full flex justify-center">
            {headerDisplay ||
              <div className="relative max-w-3xl w-full h-full aspect-video">
                {object.youtube ? 
                  <iframe
                  // width="560"
                  // height="315"
                  src={object.youtube} // Replace with your video ID
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-xl w-full h-full"
                  ></iframe>
                  :
                  <Image
                  src={`/assets/projects/${object.logo}.webp`}
                  alt={object.title}
                  fill
                  className="rounded-xl"
                  /> 
                }
              </div>
            }
          </header>

          <article className="flex flex-col gap-10">
            <section className="flex flex-col gap-6 col-span-7">
              <span>
                <header className="flex items-end gap-3">
                  <h2 className="text-5xl">{object.title}</h2>

                  {object.github &&
                    <IconLink
                      src="external-link" title={object.title}
                      width={40} height={40}
                      link={object.github}
                      blank
                    />
                  }
                </header>
                <p className="opacity-50 text-xl">{object.finished}</p>
              </span>

              <p className="opacity-70">{object.descriptionLong}</p>

              <GlowingText className="text-2xl">{t("technologies")}</GlowingText>
              <TechnologyMarquee technologies={object.technologies} />
            </section>
            
            {object.screenShoots?.length > 0  &&
            <section className="h-52 sm:h-96 w-full">
              <Marquee pauseOnHover
                className="[--duration:20s] w-full h-full">
                {object.screenShoots.map((screenShoot, idx) =>
                  <CarrouselItem key={idx} screenShoot={screenShoot}/>
                )}
              </Marquee>
            </section>
            }

          </article>
        </div>
      </main>

      <div id="footer" className="w-full bg-gradient-to-b from-miquel-background to-black flex justify-center ">
        <Footer params={{locale: params.locale}}/>
      </div>
    </>
  )
}

// =============================================
//              IMAGE CARROUSEL 
// =============================================

export function CarrouselItem({ screenShoot }: { screenShoot: string}) {
  return (
    <figure className="relative h-full aspect-video" aria-label={screenShoot}>
      <Image
        src={`/assets/projects/${screenShoot}.webp`}
        alt={screenShoot}
        fill
        loading="eager"
        className="rounded-xl"
      />
    </figure>
  );
}