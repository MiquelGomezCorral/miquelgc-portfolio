import { TechnologyStrig } from "./project.text.d"

export type ExperienceType = { 
  title: string, 
  date: string, 
  description: string, 
  technologies: TechnologyStrig[], 
  logo: string,
  link: string 
}
// export const ExperienceFolder = "/projects/"

export const SolverAI: ExperienceType = {
  title: "SOLVER AI", 
  date: "Jun 2025 - Actualmente", 
  description: "Desarrollado desde cero, este portafolio personal destaca mis habilidades y experiencia en programación. Incluye una descripción sobre mí, un currículum en línea, información de contacto, una sección de projectos destacados y las tecnologías que uso y con las que estoy familiarizado. Con un diseño responsivo y una experiencia de usuario optimizada, ofrece una presentación profesional y accesible de mi trabajo y logros.", 
  technologies: ["html", "css", "react", "typescript", "next", "tailwind", "github"], 
  logo: "Solver",
  link: "iasolver.es/" 
}

export const Experiences: ExperienceType[] = [
  SolverAI,
  SolverAI,
  SolverAI,
  SolverAI,
]