import { CardType } from "@/app/[locale]/(utils)/(components)/Card"
import type { TFunction } from "i18next";
// export const ExperienceFolder = "/projects/"
export const getExperiences = (t: TFunction): CardType[] => {
  const SolverAI: CardType = {
    title: t("solver.title"), 
    company: "Solver AI", 
    date: t("solver.date"),
    place: "Valencia, España",
    description: t("solver.description"),
    technologies: ["python", "ai", "github", "pandas", "numpy", "fastapi", "jupyter", "pytorch", "sklearn", "xg-boost" ,"plotly", "matplot"], 
    logo: "experience/Solver",
    link: "https://www.iasolver.es/",
    silly: ":D"
  }
  const Vidext: CardType = {
    title: t("vidext.title"), 
    company: "Vidext", 
    place: "Valencia, España",
    date: t("vidext.date"), 
    description: t("vidext.description"),  
    technologies: ["html", "css", "react", "typescript", "next", "tailwind", "github"], 
    logo: "experience/Vidext",
    link: "https://www.vidext.io",
    silly: ". _."
  }
  const Laberit: CardType = {
    title: t("laberit.title"), 
    company: "Lãberit Sistemas", 
    place: "Valencia, España",
    date: t("laberit.date"), //
    description: t("laberit.description"),  
    technologies: ["html", "css", "react", "typescript", "next", "tailwind", "github"], 
    logo: "experience/Laberit",
    link: "https://www.laberit.com/",
    silly: "D:" 
  }
  const Fiverr: CardType = {
    title: t("fiverr.title"),
    company: "Fiverr", 
    date: t("fiverr.date"), 
    place: "Almenara, Castellón",
    description: t("fiverr.description"),  
    technologies: ["photoshop"], 
    logo: "experience/Fiverr",
    link: "https://www.fiverr.com/",
    silly: ": /" 
  }
  const PuntISeguit: CardType = {
    title: t("puntiseguit.title"), 
    company: "Punt I Seguit", 
    place: "Almenara, Castellón",
    date: t("puntiseguit.date"), 
    description: t("puntiseguit.description"),  
    technologies: [], 
    logo: "experience/PuntISeguitText",
    link: "https://www.facebook.com/AcademiaDestudisPuntISeguit/?locale=ca_ES",
    silly: "^_^" 
  }
  const Karting: CardType = {
    title: t("karting.title"), 
    company: "Karting ERK", 
    date: t("karting.date"), 
    place: "Almenara, Castellón",
    description: t("karting.description"),
    technologies: [], 
    logo: "experience/EKR",
    link: "http://www.kartingalmenara.com/",
    silly: ":)" 
  }
  const PapiBeach: CardType = {
    title: t("papibeach.title"),
    company: "Papi Beach", 
    date: t("papibeach.date"), 
    place: "Almenara, Castellón",
    description: t("papibeach.description"),  
    technologies: [], 
    logo: "experience/PapiBeach",
    link: "https://www.facebook.com/papibeach/",
    silly: "T-T" 
  }

  return[
    SolverAI,
    Vidext,
    // Laberit,
    Fiverr,
    PuntISeguit,
    Karting,
    PapiBeach,
  ]
}