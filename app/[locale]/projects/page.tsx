
import Image from "next/image"
import { getProjects, ProjectType } from "@/app/[locale]/(utils)/(constants)/project.text.d";
import { Project } from "./elements";
import Header from "@/app/[locale]/(sections)/Header";
import Footer from "@/app/[locale]/(sections)/Footer";
import initTranslations from "@/app/i18n"
import TranslationsProvider from "@/app/[locale]/(utils)/TranslationsProvider"
import { IconLink } from "@/app/[locale]/(utils)/(components)/IconsButtons";
import { TechnologyMarquee } from "@/app/[locale]/(utils)/(components)/Technologies";
import GlowingText from "@/app/[locale]/(utils)/(components)/GlowingText";
import { Marquee } from "@/app/[locale]/(utils)/(components)/Marquee";

export default async function ProjectsPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const { t, resources } = await initTranslations(locale, i18nNamespaces);
  const ProjectS = Object.values(getProjects(t))
  return (
    <TranslationsProvider
      namespaces={i18nNamespaces}
      locale={locale}
      resources={resources}
    >
      <Header />
      <main className="max-w-[110rem] w-full flex flex-col gap-16 px-4 md:px-10 xl:px-48 2xl:px-64">
        <section className="w-full h-full flex flex-col gap-6 bg-miquel-background text-white ">
          <header className="w-full pb-20 flex justify-center">
            <h1 className="text-6xl sm:text-8xl font-bold">Proyectos</h1>
          </header>

          <main className="flex flex-col justify-center gap-6">
            {ProjectS.map((object, idx) =>
              <Project object={object} key={idx}/>
            )}
          </main>
        </section>
      </main>

      <div id="footer" className="w-full bg-gradient-to-b from-miquel-background to-black flex justify-center ">
        <Footer />
      </div>
    </TranslationsProvider>
  )
}


// =============================================
//              TEMPLATE FOR ALL THE OTHER PROJECT SUBPAGE 
// =============================================

const i18nNamespaces = ['header', 'projects']
export async function ProjectPageTemplate({object,  params }: {object: ProjectType, params: { locale: string } }) {
  const { locale } = params;
  const { resources } = await initTranslations(locale, i18nNamespaces);
  return (
    <TranslationsProvider
      namespaces={i18nNamespaces}
      locale={locale}
      resources={resources}
    >
      <Header />
      <main className="max-w-[110rem] w-full flex flex-col gap-16 px-4 md:px-10 xl:px-48 2xl:px-64">
        <div className="w-full flex flex-col justify-center gap-10 rounded-xl">
          <header className="w-full h-full flex justify-center">
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
                <p className="opacity-50 text-xl">{object.finished ? "Terminado" : "En progreso"}</p>
              </span>

              <p className="opacity-70">{object.descriptionLong}</p>

              <GlowingText className="text-xl">Tecnologías</GlowingText>
              <TechnologyMarquee technologies={object.technologies} />
            </section>

            <section className="h-52 sm:h-96 w-full">
              <Marquee pauseOnHover
                className="[--duration:20s] w-full h-full">
                {object.screenShoots.map((screenShoot, idx) =>
                  <CarrouselItem key={idx} screenShoot={screenShoot}/>
                )}
              </Marquee>
            </section>

          </article>
        </div>
      </main>

      <div id="footer" className="w-full bg-gradient-to-b from-miquel-background to-black flex justify-center ">
        <Footer />
      </div>
    </TranslationsProvider>
  )
}

// =============================================
//              IMAGE CARROUSEL 
// =============================================

function CarrouselItem({ screenShoot }: { screenShoot: string}) {
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