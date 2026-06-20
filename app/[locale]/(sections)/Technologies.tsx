
import initTranslations from "@/app/i18n"
import { technologiesNameSpaces } from "@/app/[locale]/(utils)/(constants)/nameSpaces.d"

import { Section } from '@/app/[locale]/(utils)/(components)/Section';
import { TechnologyExplorer } from '@/app/[locale]/(utils)/(components)/TechnologyExplorer';

const i18nNamespaces = technologiesNameSpaces
export default async function TechnologiesSection({ params }: { params: { locale: string } }) {
  const {t} = await initTranslations(params.locale, i18nNamespaces)
  
  return (
    <Section id={t("id")} title={t("title")} iconName={t("icon")}>
      <TechnologyExplorer />
    </Section>
  )
}
