import { CardType } from "@/app/[locale]/(utils)/(components)/Card"
import type { TFunction } from "i18next";

// export const ExperienceFolder = "/projects/"
export const getStudies = (t: TFunction): CardType[] => {
  
  const Master: CardType = {
    title: t("master.title"), 
    company: t("master.company"), 
    date: t("master.date"),
    place: t("master.place"),
    description: t("master.description"), 
    technologies: ["ai", "python", "pandas", "pytorch", "pandas", "plotly", "matplot", "jupyter", "c-sharp", "unity", "numpy"], 
    logo: "studies/UPV",
    link: "https://www.upv.es/estudios/master/muiarfid/",
    silly: ">:("
  }
  const Erasmus: CardType = {
    title: t("erasmus.title"), 
    company: t("erasmus.company"), 
    date: t("erasmus.date"),
    place: t("erasmus.place"),
    description: t("erasmus.description"), 
    technologies: ["python", "ai", "pandas", "pytorch", "pandas", "plotly", "matplot", "jupyter"], 
    logo: "studies/EPFL",
    link: "https://www.epfl.ch/en/",
    silly: "^-^"
  }
  const Upv: CardType = {
    title: t("upv.title"), 
    company: t("upv.company"), 
    place: t("upv.place"),
    date: t("upv.date"), 
    description:  t("upv.description"), 
    technologies: ["ai", "java", "sql" , "c", "sklearn", "jupyter" ,"mathematica",  "risc-v" , "java-fx", "haskell", "prolog", "docker"], 
    logo: "studies/UPV",
    link: "https://www.upv.es/titulaciones/GII/",
    silly: ":O"
  }
  const EsoBach: CardType = {
    title: t("eso_bach.title"), 
    company: t("eso_bach.company"), 
    place: t("eso_bach.place"),
    date: t("eso_bach.date"), 
    description:  t("eso_bach.description"), 
    technologies: [], 
    logo: "studies/IES-Almenara",
    link: "https://www.laberit.com/",
    silly: ":·3" 
  }


  return [
    Master,
    Erasmus,
    Upv,
    EsoBach,
  ]
}
