export type ProyectType = { 
  title: string, 
  finished: boolean, 
  descriptionShort: string, 
  descriptionLong: string, 
  technologies: Technologystrig[], 
  miniatura: string,
  screenShoots: string[] 
  link: string 
  github: string
}
export type Technologystrig = "html" | "react" | "typescript" | "next" | "tailwind" | "github" | "css" | "java" | "unity" | "python" | "pygame" | "c++" | "c-sharp"

export const Porfolio: ProyectType = {
  title: "Porfolio web personal",
  finished: false,
  descriptionShort: "Desarrollado desde cero, este portafolio personal destaca mis habilidades y experiencia en programación. Incluye una descripción sobre mí, un currículum en línea, información de contacto, una sección de proyectos destacados y las tecnologías que uso y con las que estoy familiarizado. Con un diseño responsivo y una experiencia de usuario optimizada, ofrece una presentación profesional y accesible de mi trabajo y logros.",
  descriptionLong: "Desarrollado desde cero, este portafolio personal destaca mis habilidades y experiencia en programación. Incluye una descripción sobre mí, un currículum en línea, información de contacto, una sección de proyectos destacados y las tecnologías que uso y con las que estoy familiarizado. Con un diseño responsivo y una experiencia de usuario optimizada, ofrece una presentación profesional y accesible de mi trabajo y logros.",
  technologies: ["html", "css", "react", "typescript", "next", "tailwind", "github"],
  miniatura: "Portfolio-miniatura",
  screenShoots: ["Portfolio-miniatura","Portfolio-miniatura","Portfolio-miniatura","Portfolio-miniatura"],
  link: "/proyects/portfolio",
  github: "https://github.com/MiquelGomezCorral/miquelgc-portfolio",
}

export const Hola1: ProyectType = {
  title: "Hola 1",
  finished: true,
  descriptionShort: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  descriptionLong: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  technologies: ["python", "pygame"],
  screenShoots: ["Captura","Captura","Captura","Captura"],
  miniatura: "Captura",
  link: "/",
  github:  "",
}

export const Hola2: ProyectType = {
  title: "Hola 2",
  finished: true,
  descriptionShort: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  descriptionLong: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  technologies: ["unity", "c-sharp"],
  miniatura: "Captura",
  screenShoots: ["Captura","Captura","Captura","Captura"],
  link: "/",
  github:  "",
}

export const Hola3: ProyectType =   {
  title: "Hola 3",
  finished: true,
  descriptionShort: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  descriptionLong: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  technologies: ["java"],
  miniatura: "Captura",
  screenShoots: ["Captura","Captura","Captura","Captura"],
  link: "/",
  github:  "",
}

export const Hola4: ProyectType ={
  title: "Hola 4",
  finished: true,
  descriptionShort: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  descriptionLong: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  technologies: ["c++"],
  miniatura: "Captura",
  screenShoots: ["Captura","Captura","Captura","Captura"],
  link: "/",
  github:  "",
}

export const PROYECTS: ProyectType[] = [
  Porfolio,
  Hola1,
  Hola2,
  Hola3,
  Hola4,
  Hola4,
  Hola4,
  Hola4,
]