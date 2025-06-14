import initTranslations from "@/app/i18n";

import { Section } from '@/app/[locale]/(utils)/(components)/Section';
import { Icon } from "@/app/[locale]/(utils)/(components)/IconsButtons";
import GlowingText from "@/app/[locale]/(utils)/(components)/GlowingText";
import { SeeMoreProject, Project } from "@/app/[locale]/projects/elements";
import { getProjects } from "@/app/[locale]/(utils)/(constants)/project.text.d";
import { HeaderButtonLink } from "@/app/[locale]/(utils)/(components)/HeaderButton";

const i18nNamespaces = ["projects"]
export default async function Projects({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const { t } = await initTranslations(locale, i18nNamespaces);
  const ProjectS = Object.values(getProjects(t))

  return (
    <Section id={t("id")} title={t("title")} iconName={t("icon")} link="/projects" classname="group/proyects">
    
    {/* <section id="projects" className="w-full flex flex-col gap-6 group/proyects">
      <header className="w-full py-4 border-b-2 border-b-miquel-white-200/50">
        <HeaderButtonLink link="/projects" className="text-5xl font-bold opacity-70 group-hover/proyects:opacity-100 transform duration-300 flex gap-2">
            <GlowingText className="flex">
              <Icon 
                src={`html`}
                width={50}
                height={50}
                type="color"
                title={'Projects'}
                />
            </GlowingText>
          {t("title")}
        </HeaderButtonLink>
      </header> */}

      <main className="flex flex-col justify-center gap-6">
        {ProjectS.slice(0,4).map((object, idx) =>
          <Project key={idx} object={object}/>
        )}
      </main>
      
      <SeeMoreProject object={ProjectS[4]}/>

    </Section>
  )
}

