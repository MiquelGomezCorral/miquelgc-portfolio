import { CardType } from "@/app/[locale]/(utils)/(components)/Card"
import type { TFunction } from "i18next";
// export const ExperienceFolder = "/projects/"
export const getExperiences = (t: TFunction): CardType[] => {
  const SolverAI: CardType = {
    title: t("solver.title"), 
    company: "Solver AI", 
    date: t("solver.date"), // "Jun 2025 - Actualmente",
    place: "Valencia, España",
    description: t("solver.description"), //"En Solver he podido realizar mi TFG, orientado a LLM para el procesado de documentos, además de usar mis conocimientos en Machinelearning e IA para implementar soluciones con el fin de resolver los problemas de los clientes de la empresa", 
    technologies: ["python", "ai", "github"], 
    logo: "experience/Solver",
    link: "https://www.iasolver.es/",
    silly: ":D"
  }
  const Vidext: CardType = {
    title: t("vidext.tittle"), 
    company: "Vidext", 
    place: "Valencia, España",
    date: t("vidext.date"), //"Jun 2024 – Sep 2024", 
    description: t("vidext.description"), //"En Vidext, he aprendido a desarrollar aplicaciones WEB en React y Next.js. Con ello, he creado la landing page de la empresa y una aplicación para uso interno de los empleados. ", 
    technologies: ["html", "css", "react", "typescript", "next", "tailwind", "github"], 
    logo: "experience/Vidext",
    link: "https://www.vidext.io",
    silly: ". _."
  }
  const Laberit: CardType = {
    title: t("laberit.tittle"), 
    company: "Lãberit Sistemas", 
    place: "Valencia, España",
    date: t("laberit.date"), //"Sep 2022 – Mar 2023 ", 
    description: t("laberit.description"), //"Durante los meses de prácticas he aprendido a manejar y desarrollar extensiones del ERP de Microsoft 'Navision'.", 
    technologies: ["html", "css", "react", "typescript", "next", "tailwind", "github"], 
    logo: "experience/Laberit",
    link: "https://www.laberit.com/",
    silly: "D:" 
  }
  const Fiverr: CardType = {
    title: t("fiverr.tittle"),//"Editor de Imágenes, Freelance", 
    company: "Fiverr", 
    date: t("fiverr.date"), //"Ene 2022 – Jun 2024", 
    place: "Almenara, Castellón",
    description: t("fiverr.description"), //"En esta página he puesto a disposición de diversos clientes mis habilidades en la edición de imágenes.", 
    technologies: ["photoshop"], 
    logo: "experience/Fiverr",
    link: "https://www.fiverr.com/",
    silly: ": /" 
  }
  const PuntISeguit: CardType = {
    title: t("puntiseguit.tittle"), //"Profesor de repaso", 
    company: "Punt I Seguit", 
    place: "Almenara, Castellón",
    date: t("puntiseguit.date"), //"Sep 2023 – Jun 2024", 
    description: t("puntiseguit.description"), //"En Punt I Seguit, he tenido la oportunidad de enseñar a laumnos desde 1 de la ESO, hasta 2nd de Bachillerato, y reforzar lo aprendido durante las clases para mejorar sus calificaciones.", 
    technologies: [], 
    logo: "experience/PuntISeguitText",
    link: "https://www.facebook.com/AcademiaDestudisPuntISeguit/?locale=ca_ES",
    silly: "^_^" 
  }
  const Karting: CardType = {
    title: t("karting.tittle"), //"Camarero", 
    company: "Karting ERK", 
    date: t("karting.date"), //"Jun 2022 – Sep 2022", 
    place: "Almenara, Castellón",
    description: t("karting.description"), //"Durante los meses de verano, serví como camarero en el restaurante del Karting de mi pueblo.", 
    technologies: [], 
    logo: "experience/EKR",
    link: "http://www.kartingalmenara.com/",
    silly: ":)" 
  }
  const PapiBeach: CardType = {
    title: t("papibeach.tittle"), //"Pinche de cocina", 
    company: "Papi Beach", 
    date: t("papibeach.date"), //"Jun 2021 – Sep 2021 ", 
    place: "Almenara, Castellón",
    description: t("papibeach.description"), //"Durante los meses de verano, serví como ayudante de cocina en el merendero Papi Beach de mi pueblo.", 
    technologies: [], 
    logo: "experience/PapiBeach",
    link: "https://www.facebook.com/papibeach/",
    silly: "T-T" 
  }

  return[
    SolverAI,
    Vidext,
    Laberit,
    Fiverr,
    PuntISeguit,
    Karting,
    PapiBeach,
  ]
}