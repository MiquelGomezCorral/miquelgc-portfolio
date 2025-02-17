import { TechnologyString } from "./technologies.d"

export type ExperienceType = { 
  title: string, 
  company: string,
  place: string,
  date: string, 
  description: string, 
  technologies: TechnologyString[], 
  logo: string,
  link: string 
}
// export const ExperienceFolder = "/projects/"

export const SolverAI: ExperienceType = {
  title: "Prácticas universitarias", 
  company: "Solver AI", 
  date: "Jun 2025 - Actualmente",
  place: "Valencia, España",
  description: "En Solver he podido realizar mi TFG, orientado a LLM para el procesado de documentos, además de usar mis conocimientos en Machinelearning e IA para implementar soluciones con el fin de resolver los problemas de los clientes de la empresa", 
  technologies: ["python", "ai", "github"], 
  logo: "Solver",
  link: "https://www.iasolver.es/" 
}
export const Vidext: ExperienceType = {
  title: "Prácticas universitarias", 
  company: "Vidext", 
  place: "Valencia, España",
  date: "Jun 2024 – Sep 2024", 
  description: "En Vidext, he aprendido a desarrollar aplicaciones WEB en React y Next.js. Con ello, he creado la landing page de la empresa y una aplicación para uso interno de los empleados. ", 
  technologies: ["html", "css", "react", "typescript", "next", "tailwind", "github"], 
  logo: "Vidext",
  link: "https://www.vidext.io" 
}
export const Laberit: ExperienceType = {
  title: "Prácticas universitarias", 
  company: "Lãberit Sistemas", 
  place: "Valencia, España",
  date: "Sep 2022 – Mar 2023 ", 
  description: "Durante los meses de prácticas he aprendido a manejar y desarrollar extensiones del ERP de Microsoft 'Navision'.", 
  technologies: ["html", "css", "react", "typescript", "next", "tailwind", "github"], 
  logo: "Laberit",
  link: "https://www.laberit.com/" 
}
export const Fiverr: ExperienceType = {
  title: "Editor de Imágenes, Freelance", 
  company: "Fiverr", 
  date: "Ene 2022 – Jun 2024", 
  place: "Almenara, Castellón, España",
  description: "En esta página he puesto a disposición de diversos clientes mis habilidades en la edición de imágenes.", 
  technologies: ["photoshop"], 
  logo: "Fiverr",
  link: "https://www.fiverr.com/" 
}
export const PuntISeguit: ExperienceType = {
  title: "Profesor de repaso", 
  company: "Punt I Seguit", 
  place: "Almenara, Castellón, España",
  date: "Sep 2023 – Jun 2024", 
  description: "En Punt I Seguit, he tenido la oportunidad de enseñar a laumnos desde 1 de la ESO, hasta 2nd de Bachillerato, y reforzar lo aprendido durante las clases para mejorar sus calificaciones.", 
  technologies: [], 
  logo: "PuntISeguitText",
  link: "https://www.facebook.com/AcademiaDestudisPuntISeguit/?locale=ca_ES" 
}
export const Karting: ExperienceType = {
  title: "Camarero", 
  company: "Karting ERK", 
  date: "Jun 2022 – Sep 2022", 
  place: "Almenara, Castellón, España",
  description: "Durante los meses de verano, serví como camarero en el restaurante del Karting de mi pueblo.", 
  technologies: [], 
  logo: "EKR",
  link: "http://www.kartingalmenara.com/" 
}
export const PapiBeach: ExperienceType = {
  title: "Pinche de cocina", 
  company: "Papi Beach", 
  date: "Jun 2021 – Sep 2021 ", 
  place: "Almenara, Castellón, España",
  description: "Durante los meses de verano, serví como ayudante de cocina en el merendero Papi Beach de mi pueblo.", 
  technologies: [], 
  logo: "PapiBeach",
  link: "https://www.facebook.com/papibeach/" 
}

export const Experiences: ExperienceType[] = [
  SolverAI,
  Vidext,
  Laberit,
  Fiverr,
  PuntISeguit,
  Karting,
  PapiBeach,
]