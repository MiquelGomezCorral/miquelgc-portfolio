import { GithubLink, YouTubeEmbed } from "./constants.d"

export type ProjectType = { 
  title: string, 
  finished: boolean, 
  descriptionShort: string, 
  descriptionLong: string, 
  technologies: TechnologyStrig[], 
  miniatura: string,
  screenShoots: string[] 
  link: string 
  youtube: string
  github: string
}
export type TechnologyStrig = "html" | "react" | "typescript" | "next" | "tailwind" | "github" | "css" | "java" | "unity" | "python" | "pygame" | "c++" | "c-sharp"
export const ProjectsFolder = "/projects/"


export const Porfolio: ProjectType = {
  title: "Porfolio web personal",
  finished: false,
  descriptionShort: "Desarrollado desde cero, este portafolio personal destaca mis habilidades y experiencia en programación. Incluye una descripción sobre mí, un currículum en línea, información de contacto, una sección de projectos destacados y las tecnologías que uso y con las que estoy familiarizado. Con un diseño responsivo y una experiencia de usuario optimizada, ofrece una presentación profesional y accesible de mi trabajo y logros.",
  descriptionLong: "Desarrollado desde cero, este portafolio personal destaca mis habilidades y experiencia en programación. Incluye una descripción sobre mí, un currículum en línea, información de contacto, una sección de projectos destacados y las tecnologías que uso y con las que estoy familiarizado. Con un diseño responsivo y una experiencia de usuario optimizada, ofrece una presentación profesional y accesible de mi trabajo y logros.",
  technologies: ["html", "css", "react", "typescript", "next", "tailwind", "github"],
  miniatura: "portfolio-miniatura",
  screenShoots: ["Portfolio-miniatura","Portfolio-miniatura","Portfolio-miniatura","Portfolio-miniatura"],
  link: ProjectsFolder+"portfolio",
  youtube: YouTubeEmbed+"", //video id
  github: GithubLink+"miquelgc-portfolio",
}

export const ProceduralAnimations: ProjectType = {
  title: "Procedural Animations",
  finished: true,
  descriptionShort: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  descriptionLong: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  technologies: ["python", "pygame"],
  screenShoots: Array.from({ length: 10 }, (_, i) => `Procedural (${i+1})`),
  miniatura: "Procedural (9)",
  link: ProjectsFolder+"procedural_animations",
  youtube: YouTubeEmbed+"DXGSoyjN9PA", //video id
  github: GithubLink+"Procedural_Animations",
}

export const InverseKinematics: ProjectType = {
  title: "Inverse Kinematics",
  finished: true,
  descriptionShort: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  descriptionLong: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  technologies: ["python", "pygame"],
  miniatura: "Kinematics (4)",
  screenShoots: Array.from({ length: 6 }, (_, i) => `Kinematics (${i+1})`),
  link: ProjectsFolder+"incerse_kinematics",
  youtube: YouTubeEmbed+"fmYzdNtMQSY", //video id
  github: GithubLink+"Inverse_Kinematics",
}

export const DoublePendulum: ProjectType = {
  title: "Double Pendulum",
  finished: true,
  descriptionShort: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  descriptionLong: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  technologies: ["python", "pygame"],
  miniatura: "Pendulum (2)",
  screenShoots: Array.from({ length: 7 }, (_, i) => `Pendulum (${i+1})`),
  link: ProjectsFolder+"double_pendulum",
  youtube: YouTubeEmbed+"Gw-FDuWRabM", //video id
  github: GithubLink+"Double-pendulum",
}

export const BoidsSimulator: ProjectType = {
  title: "Boids Simulator",
  finished: true,
  descriptionShort: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  descriptionLong: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  technologies: ["python", "pygame"],
  miniatura: "Boids (4)",
  screenShoots: Array.from({ length: 9 }, (_, i) => `Boids (${i+1})`),
  link: ProjectsFolder+"boids_simulator",
  youtube: YouTubeEmbed+"ExgxrMtjV3M", //video id
  github:  GithubLink+"Boids-simulator",
}

export const MazeGeneratorSolver: ProjectType = {
  title: "Maze Generator Solver",
  finished: true,
  descriptionShort: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  descriptionLong: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  technologies: ["python", "pygame"],
  miniatura: "MazeSolver (3)",
  screenShoots: Array.from({ length: 8 }, (_, i) => `MazeSolver (${i+1})`),
  link: ProjectsFolder+"maze_generator_solver",
  youtube: YouTubeEmbed+"bZt4bsz9n9Q", //video id
  github:  GithubLink+"Maze-Generator-Solver",
}

export const TheCubeElJueguito: ProjectType = {
  title: "The Cube El Jueguito",
  finished: true,
  descriptionShort: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  descriptionLong: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  technologies: ["c-sharp", "unity"],
  miniatura: "El jueguito (1)",
  screenShoots: Array.from({ length: 7 }, (_, i) => `El jueguito (${i+1})`),
  link: ProjectsFolder+"the_cube_el_jueguito",
  youtube: YouTubeEmbed+"J6wj_w_J8AU", //video id
  github:  GithubLink+"The-Cube-ElJueguito",
}

export const AutoImageToAscii: ProjectType = {
  title: "Auto Image To Ascii",
  finished: true,
  descriptionShort: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  descriptionLong: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  technologies: ["python"],
  miniatura: "Ascci Converter (1)",
  screenShoots: Array.from({ length: 3 }, (_, i) => `Ascci Converter (${i+1})`),
  link: ProjectsFolder+"auto_image_to_ascii",
  youtube: YouTubeEmbed+"ta2pDyuCPKc", //video id
  github:  GithubLink+"Auto-image-to-Ascii",
}

export const TetrisJavaFX: ProjectType = {
  title: "Tetris JavaFX",
  finished: true,
  descriptionShort: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  descriptionLong: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  technologies: ["c++"],
  miniatura: "Captura",
  screenShoots: Array.from({ length: 9 }, (_, i) => `Boids (${i+1})`),
  link: ProjectsFolder+"portfolio",
  youtube: YouTubeEmbed+"", //video id
  github:  GithubLink+"/Tetris-JavaFX",
}

export const OrbitsSimulator: ProjectType = {
  title: "Orbits Simulator",
  finished: true,
  descriptionShort: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  descriptionLong: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  technologies: ["c++"],
  miniatura: "Orbits (1)",
  screenShoots: Array.from({ length: 8 }, (_, i) => `Orbits (${i+1})`),
  link: ProjectsFolder+"portfolio",
  youtube: YouTubeEmbed+"UPl4bBSgKtM", //video id
  github:  GithubLink+"Orbits-Simulator",
}

export const ProjectS: ProjectType[] = [
  ProceduralAnimations,
  DoublePendulum,
  BoidsSimulator,
  MazeGeneratorSolver,
  InverseKinematics,
  TheCubeElJueguito,
  Porfolio,
  // TetrisJavaFX,
  OrbitsSimulator,
  AutoImageToAscii,
]