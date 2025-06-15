
import { getProjects } from "@/app/[locale]/(utils)/(constants)/project.text.d"
import initTranslations from "@/app/i18n"
import TranslationsProvider from "@/app/[locale]/(utils)/TranslationsProvider"
import Header from "@/app/[locale]/(sections)/Header";
import Footer from "@/app/[locale]/(sections)/Footer";
import { IconLink } from "@/app/[locale]/(utils)/(components)/IconsButtons";
import GlowingText from "@/app/[locale]/(utils)/(components)/GlowingText";
import { TechnologyMarquee } from "@/app/[locale]/(utils)/(components)/Technologies";
import { Marquee } from "@/app/[locale]/(utils)/(components)/Marquee";
import { CarrouselItem } from "../project_template";
import { StringArtComponent } from "./string_art";

const i18nNamespaces = ['projects', 'header', 'footer']
export default async function ProjectPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const { t, resources } = await initTranslations(locale, i18nNamespaces);
  const {StringArt} = getProjects(t)



  return (
    <TranslationsProvider
      namespaces={i18nNamespaces}
      locale={locale}
      resources={resources}
    >
      <Header />
        <main className="max-w-[110rem] -mt-24 w-full flex flex-col gap-16 px-4 md:px-10 xl:px-48 2xl:px-64">
          <div className="w-full flex flex-col justify-center gap-10 rounded-xl">
            <header className="w-full h-full flex justify-center">
              {
              /* <div className="relative max-w-3xl w-full h-full aspect-video">
                {StringArt.youtube ? 
                  <iframe
                    // width="560"
                    // height="315"
                    src={StringArt.youtube} // Replace with your video ID
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded-xl w-full h-full"
                  ></iframe>
                  :
                  <Image
                    src={`/assets/projects/${StringArt.logo}.webp`}
                    alt={StringArt.title}
                    fill
                    className="rounded-xl"
                  /> 
                }
              </div> */
              }

              <StringArtComponent/>
            </header>
  
            <article className="flex flex-col gap-10">
              <section className="flex flex-col gap-6 col-span-7">
                <span>
                  <header className="flex items-end gap-3">
                    <h2 className="text-5xl">{StringArt.title}</h2>
  
                    {StringArt.github &&
                      <IconLink
                        src="external-link" title={StringArt.title}
                        width={40} height={40}
                        link={StringArt.github}
                        blank
                      />
                    }
                  </header>
                  <p className="opacity-50 text-xl">{StringArt.finished}</p>
                </span>
  
                <p className="opacity-70">{StringArt.descriptionLong}</p>
  
                <GlowingText className="text-2xl">{t("technologies")}</GlowingText>
                <TechnologyMarquee technologies={StringArt.technologies} />
              </section>
  
              <section className="h-52 sm:h-96 w-full">
                <Marquee pauseOnHover
                  className="[--duration:20s] w-full h-full">
                  {StringArt.screenShoots.map((screenShoot, idx) =>
                    <CarrouselItem key={idx} screenShoot={screenShoot}/>
                  )}
                </Marquee>
              </section>
  
            </article>
          </div>
        </main>
  
        <div id="footer" className="w-full bg-gradient-to-b from-miquel-background to-black flex justify-center ">
          <Footer params={{locale: params.locale}}/>
        </div>
    </TranslationsProvider>
  )
}

