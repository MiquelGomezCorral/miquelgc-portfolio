import { CardType } from "@/app/[locale]/(utils)/(components)/Card"

// export const ExperienceFolder = "/projects/"

export const Erasmus: CardType = {
  title: "Erasmus: 4rt año del Grado", 
  company: "Ecole polytechnique de Lausanne (EPFL)", 
  date: "Sep 2024 – Ene 2025",
  place: "Lausanne, Suiza",
  description: "En Solver he podido realizar mi TFG, orientado a LLM para el procesado de documentos, además de usar mis conocimientos en Machinelearning e IA para implementar soluciones con el fin de resolver los problemas de los clientes de la empresa", 
  technologies: ["python", "ai", "github"], 
  logo: "studies/EPFL",
  link: "https://www.epfl.ch/en/",
  silly: "^-^"
}
export const Upv: CardType = {
  title: "Grado en Ingeniería informática", 
  company: "Universitat Politècnica de València (UPV) ", 
  place: "Valencia, España",
  date: "Sep 2021 – Actualmente", 
  description: "En Vidext, he aprendido a desarrollar aplicaciones WEB en React y Next.js. Con ello, he creado la landing page de la empresa y una aplicación para uso interno de los empleados. ", 
  technologies: ["html", "css", "react", "typescript", "next", "tailwind", "github"], 
  logo: "studies/UPV",
  link: "https://www.upv.es/",
  silly: ":O"
}
export const EsoBach: CardType = {
  title: "ESO y Bachillerato", 
  company: "IES Almenara", 
  place: "Almenara, Castellón",
  date: "Sep 2015 – Jun 2021", 
  description: "Durante los meses de prácticas he aprendido a manejar y desarrollar extensiones del ERP de Microsoft 'Navision'.", 
  technologies: [], 
  logo: "studies/IES-Almenara",
  link: "https://www.laberit.com/",
  silly: ":·3" 
}


export const Studies: CardType[] = [
  Erasmus,
  Upv,
  EsoBach,
]