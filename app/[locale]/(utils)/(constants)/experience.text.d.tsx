import { CardType } from "@/app/[locale]/(utils)/(components)/Card"
import type { TFunction } from "i18next";
// export const ExperienceFolder = "/projects/"
export const getExperiences = (t: TFunction): CardType[] => {
  const VidextAuto: CardType = {
    title: t("vidext_auto.title"), 
    company: t("vidext_auto.company"), 
    date: t("vidext_auto.date"),
    place: t("vidext_auto.place"),
    description: t("vidext_auto.description"),
    technologies: ["ai", 'react', 'typescript', 'next', 'tailwind', 'github', 'vercel-ai', 'prompt-engineering', 'braintrust', 'agents', 'mcp'], 
    logo: "experience/Vidext",
    link: "https://www.vidext.io",
    silly: "._."
  }
  const SolverAI: CardType = {
    title: t("solver.title"), 
    company: t("solver.company"), 
    date: t("solver.date"),
    place: t("solver.place"),
    description: t("solver.description"),
    technologies: ["python", "ai", "github", "pandas", "numpy", "fastapi", "jupyter", "pytorch", "sklearn", "xg-boost" ,"plotly", "matplot", "docker"], 
    logo: "experience/Solver",
    link: "https://www.iasolver.es/",
    silly: ":D"
  }
  const Vidext: CardType = {
    title: t("vidext.title"), 
    company: t("vidext.company"), 
    place: t("vidext.place"),
    date: t("vidext.date"), 
    description: t("vidext.description"),  
    technologies: ["html", "css", "react", "typescript", "next", "tailwind", "github"], 
    logo: "experience/Vidext",
    link: "https://www.vidext.io",
    silly: ". _."
  }
  const Laberit: CardType = {
    title: t("laberit.title"), 
    company: t("laberit.company"), 
    place: t("laberit.place"),
    date: t("laberit.date"), //
    description: t("laberit.description"),  
    technologies: ["html", "css", "react", "typescript", "next", "tailwind", "github"], 
    logo: "experience/Laberit",
    link: "https://www.laberit.com/",
    silly: "D:" 
  }
  const Fiverr: CardType = {
    title: t("fiverr.title"),
    company: t("fiverr.company"), 
    date: t("fiverr.date"), 
    place: t("fiverr.place"),
    description: t("fiverr.description"),  
    technologies: ["photoshop"], 
    logo: "experience/Fiverr",
    link: "https://www.fiverr.com/",
    silly: ": /" 
  }
  const PuntISeguit: CardType = {
    title: t("puntiseguit.title"), 
    company: t("puntiseguit.company"), 
    place: t("puntiseguit.place"),
    date: t("puntiseguit.date"), 
    description: t("puntiseguit.description"),  
    technologies: [], 
    logo: "experience/PuntISeguitText",
    link: "https://www.facebook.com/AcademiaDestudisPuntISeguit/?locale=ca_ES",
    silly: "^_^" 
  }
  const Karting: CardType = {
    title: t("karting.title"), 
    company: t("karting.company"), 
    date: t("karting.date"), 
    place: t("karting.place"),
    description: t("karting.description"),
    technologies: [], 
    logo: "experience/EKR",
    link: "http://www.kartingalmenara.com/",
    silly: ":)" 
  }
  const PapiBeach: CardType = {
    title: t("papibeach.title"),
    company: t("papibeach.company"), 
    date: t("papibeach.date"), 
    place: t("papibeach.place"),
    description: t("papibeach.description"),  
    technologies: [], 
    logo: "experience/PapiBeach",
    link: "https://www.facebook.com/papibeach/",
    silly: "T-T" 
  }

  return[
    VidextAuto,
    SolverAI,
    Vidext,
    Laberit,
    Fiverr,
    PuntISeguit,
    Karting,
    PapiBeach,
  ]
}
