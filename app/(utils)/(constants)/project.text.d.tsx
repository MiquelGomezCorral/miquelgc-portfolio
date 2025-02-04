export type ProjectType = { 
  title: string, 
  finished: boolean, 
  descriptionShort: string, 
  descriptionLong: string, 
  technologies: TechnologyStrig[], 
  miniatura: string,
  screenShoots: string[] 
  link: string 
  github: string
}
export type TechnologyStrig = "html" | "react" | "typescript" | "next" | "tailwind" | "github" | "css" | "java" | "unity" | "python" | "pygame" | "c++" | "c-sharp"

export const PoryectsFolder = "/projects/"
export const Porfolio: ProjectType = {
  title: "Porfolio web personal",
  finished: false,
  descriptionShort: "Desarrollado desde cero, este portafolio personal destaca mis habilidades y experiencia en programación. Incluye una descripción sobre mí, un currículum en línea, información de contacto, una sección de projectos destacados y las tecnologías que uso y con las que estoy familiarizado. Con un diseño responsivo y una experiencia de usuario optimizada, ofrece una presentación profesional y accesible de mi trabajo y logros.",
  descriptionLong: "Desarrollado desde cero, este portafolio personal destaca mis habilidades y experiencia en programación. Incluye una descripción sobre mí, un currículum en línea, información de contacto, una sección de projectos destacados y las tecnologías que uso y con las que estoy familiarizado. Con un diseño responsivo y una experiencia de usuario optimizada, ofrece una presentación profesional y accesible de mi trabajo y logros.",
  technologies: ["html", "css", "react", "typescript", "next", "tailwind", "github"],
  miniatura: "portfolio-miniatura",
  screenShoots: ["Portfolio-miniatura","Portfolio-miniatura","Portfolio-miniatura","Portfolio-miniatura"],
  link: "/projects/portfolio",
  github: "https://github.com/MiquelGomezCorral/miquelgc-portfolio",
}

export const ProceduralAnimations: ProjectType = {
  title: "Procedural Animations",
  finished: true,
  descriptionShort: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  descriptionLong: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  technologies: ["python", "pygame"],
  screenShoots: ["Captura","Captura","Captura","Captura"],
  miniatura: "Captura",
  link: "/",
  github:  "",
}

export const InverseKinematics: ProjectType = {
  title: "Inverse Kinematics",
  finished: true,
  descriptionShort: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  descriptionLong: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  technologies: ["unity", "c-sharp"],
  miniatura: "Captura",
  screenShoots: ["Captura","Captura","Captura","Captura"],
  link: "/",
  github:  "",
}

export const DoublePendulum: ProjectType =   {
  title: "Double Pendulum",
  finished: true,
  descriptionShort: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  descriptionLong: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  technologies: ["java"],
  miniatura: "Captura",
  screenShoots: ["Captura","Captura","Captura","Captura"],
  link: "/",
  github:  "",
}

export const BoidsSimulator: ProjectType ={
  title: "Boids Simulator",
  finished: true,
  descriptionShort: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  descriptionLong: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  technologies: ["c++"],
  miniatura: "Captura",
  screenShoots: ["Captura","Captura","Captura","Captura"],
  link: "/",
  github:  "",
}

export const MazeGeneratorSolver: ProjectType ={
  title: "Maze Generator Solver",
  finished: true,
  descriptionShort: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  descriptionLong: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  technologies: ["c++"],
  miniatura: "Captura",
  screenShoots: ["Captura","Captura","Captura","Captura"],
  link: "/",
  github:  "",
}

export const TheCubeElJueguito: ProjectType ={
  title: "The Cube El Jueguito",
  finished: true,
  descriptionShort: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  descriptionLong: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  technologies: ["c++"],
  miniatura: "Captura",
  screenShoots: ["Captura","Captura","Captura","Captura"],
  link: "/",
  github:  "",
}

export const AutoImageToAscii: ProjectType ={
  title: "Auto Image To Ascii",
  finished: true,
  descriptionShort: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  descriptionLong: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  technologies: ["c++"],
  miniatura: "Captura",
  screenShoots: ["Captura","Captura","Captura","Captura"],
  link: "/",
  github:  "",
}

export const TetrisJavaFX: ProjectType ={
  title: "Tetris JavaFX",
  finished: true,
  descriptionShort: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  descriptionLong: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  technologies: ["c++"],
  miniatura: "Captura",
  screenShoots: ["Captura","Captura","Captura","Captura"],
  link: "/",
  github:  "",
}

export const OrbitsSimulator: ProjectType ={
  title: "Orbits Simulator",
  finished: true,
  descriptionShort: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  descriptionLong: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  technologies: ["c++"],
  miniatura: "Captura",
  screenShoots: ["Captura","Captura","Captura","Captura"],
  link: "/",
  github:  "",
}

export const ProjectS: ProjectType[] = [
  Porfolio,
  ProceduralAnimations,
  InverseKinematics,
  DoublePendulum,
  BoidsSimulator,
  MazeGeneratorSolver,
  TheCubeElJueguito,
  AutoImageToAscii,
  TetrisJavaFX,
  OrbitsSimulator,
]