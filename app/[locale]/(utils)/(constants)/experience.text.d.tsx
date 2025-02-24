import { CardType } from "@/app/[locale]/(utils)/(components)/Card"

// export const ExperienceFolder = "/projects/"

export const SolverAI: CardType = {
  title: "Prácticas universitarias", 
  company: "Solver AI", 
  date: "Jun 2025 - Actualmente",
  place: "Valencia, España",
  description: "En Solver he podido realizar mi TFG, orientado a LLM para el procesado de documentos, además de usar mis conocimientos en Machinelearning e IA para implementar soluciones con el fin de resolver los problemas de los clientes de la empresa", 
  technologies: ["python", "ai", "github"], 
  logo: "experience/Solver",
  link: "https://www.iasolver.es/",
  silly: ":D"
}
export const Vidext: CardType = {
  title: "Prácticas universitarias", 
  company: "Vidext", 
  place: "Valencia, España",
  date: "Jun 2024 – Sep 2024", 
  description: "En Vidext, he aprendido a desarrollar aplicaciones WEB en React y Next.js. Con ello, he creado la landing page de la empresa y una aplicación para uso interno de los empleados. ", 
  technologies: ["html", "css", "react", "typescript", "next", "tailwind", "github"], 
  logo: "experience/Vidext",
  link: "https://www.vidext.io",
  silly: ". _."
}
export const Laberit: CardType = {
  title: "Prácticas universitarias", 
  company: "Lãberit Sistemas", 
  place: "Valencia, España",
  date: "Sep 2022 – Mar 2023 ", 
  description: "Durante los meses de prácticas he aprendido a manejar y desarrollar extensiones del ERP de Microsoft 'Navision'.", 
  technologies: ["html", "css", "react", "typescript", "next", "tailwind", "github"], 
  logo: "experience/Laberit",
  link: "https://www.laberit.com/",
  silly: "D:" 
}
export const Fiverr: CardType = {
  title: "Editor de Imágenes, Freelance", 
  company: "Fiverr", 
  date: "Ene 2022 – Jun 2024", 
  place: "Almenara, Castellón",
  description: "En esta página he puesto a disposición de diversos clientes mis habilidades en la edición de imágenes.", 
  technologies: ["photoshop"], 
  logo: "experience/Fiverr",
  link: "https://www.fiverr.com/",
  silly: ": /" 
}
export const PuntISeguit: CardType = {
  title: "Profesor de repaso", 
  company: "Punt I Seguit", 
  place: "Almenara, Castellón",
  date: "Sep 2023 – Jun 2024", 
  description: "En Punt I Seguit, he tenido la oportunidad de enseñar a laumnos desde 1 de la ESO, hasta 2nd de Bachillerato, y reforzar lo aprendido durante las clases para mejorar sus calificaciones.", 
  technologies: [], 
  logo: "experience/PuntISeguitText",
  link: "https://www.facebook.com/AcademiaDestudisPuntISeguit/?locale=ca_ES",
  silly: "^_^" 
}
export const Karting: CardType = {
  title: "Camarero", 
  company: "Karting ERK", 
  date: "Jun 2022 – Sep 2022", 
  place: "Almenara, Castellón",
  description: "Durante los meses de verano, serví como camarero en el restaurante del Karting de mi pueblo.", 
  technologies: [], 
  logo: "experience/EKR",
  link: "http://www.kartingalmenara.com/",
  silly: ":)" 
}
export const PapiBeach: CardType = {
  title: "Pinche de cocina", 
  company: "Papi Beach", 
  date: "Jun 2021 – Sep 2021 ", 
  place: "Almenara, Castellón",
  description: "Durante los meses de verano, serví como ayudante de cocina en el merendero Papi Beach de mi pueblo.", 
  technologies: [], 
  logo: "experience/PapiBeach",
  link: "https://www.facebook.com/papibeach/",
  silly: "T-T" 
}

export const Experiences: CardType[] = [
  SolverAI,
  Vidext,
  Laberit,
  Fiverr,
  PuntISeguit,
  Karting,
  PapiBeach,
]