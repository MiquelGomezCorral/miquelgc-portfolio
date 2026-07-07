import type { TFunction } from "i18next";
import { GithubLink, YouTubeEmbed, ProjectsFolder } from "./constants.text.d"
import { TechnologyString } from "./technologies.d"

export type LocaleText = { en: string; es: string }

export type ProjectType = { 
  title: string, 
  finished: string, 
  date: string,
  descriptionShort: string, 
  descriptionLong: string, 
  technologies: TechnologyString[], 
  gif?: string,
  logo: string,
  screenShoots: string[] 
  link: string 
  youtube: string
  github: string
  relevancy: number
  tags: string[]
  search: {
    title: LocaleText
    description: LocaleText
    keywords: LocaleText
  },
  id?: string
}

export const getProjects = (t: TFunction):  ProjectType[] => {
  // const Porfolio: ProjectType = {
  //   title: t("portfolio.title"),
  //   finished: t("progress"),
  //   descriptionShort: t("portfolio.description_short"),
  //   descriptionLong:t("portfolio.description_long"),
  //   technologies: ["html", "css", "react", "typescript", "next", "tailwind", "github"],
  //   screenShoots:Array.from({ length: 6 }, (_, i) => `Portfolio (${i+1})`),
  //   logo: "Portfolio (6)",
  //   link: ProjectsFolder+"portfolio",
  //   youtube: "", //video id
  //   github: GithubLink+"miquelgc-portfolio",
  //   relevancy: 1,
  // }

  // const ProceduralAnimations: ProjectType = {
  //   title: t("procedural.title"),
  //   finished: t("finished"),
  //   descriptionShort: t("procedural.description_short"),
  //   descriptionLong:t("procedural.description_long"),
  //   technologies: ["python", "pygame", "numpy"],
  //   screenShoots: Array.from({ length: 10 }, (_, i) => `Procedural (${i+1})`),
  //   logo: "Procedural (6)",
  //   link: ProjectsFolder+"procedural_animations",
  //   youtube: YouTubeEmbed+"DXGSoyjN9PA", //video id
  //   github: GithubLink+"Procedural_Animations",
  //   relevancy: 2,
  // }

  // const InverseKinematics: ProjectType = {
  //   title: t("kinematics.title"),
  //   finished: t("finished"),
  //   descriptionShort: t("kinematics.description_short"),
  //   descriptionLong:t("kinematics.description_long"),
  //   technologies: ["python", "pygame", "numpy"],
  //   logo: "Kinematics (4)",
  //   screenShoots: Array.from({ length: 6 }, (_, i) => `Kinematics (${i+1})`),
  //   link: ProjectsFolder+"incerse_kinematics",
  //   youtube: YouTubeEmbed+"fmYzdNtMQSY", //video id
  //   github: GithubLink+"Inverse_Kinematics",
  //   relevancy: 2,
  // }

  // const DoublePendulum: ProjectType = {
  //   title: t("pendulum.title"),
  //   finished: t("finished"),
  //   descriptionShort: t("pendulum.description_short"),
  //   descriptionLong:t("pendulum.description_long"),
  //   technologies: ["python", "pygame", "numpy"],
  //   logo: "Pendulum (2)",
  //   screenShoots: Array.from({ length: 7 }, (_, i) => `Pendulum (${i+1})`),
  //   link: ProjectsFolder+"double_pendulum",
  //   youtube: YouTubeEmbed+"Gw-FDuWRabM", //video id
  //   github: GithubLink+"Double-pendulum",
  //   relevancy: 2,
  // }

  // const BoidsSimulator: ProjectType = {
  //   title: t("boids.title"),
  //   finished: t("finished"),
  //   descriptionShort: t("boids.description_short"),
  //   descriptionLong:t("boids.description_long"),
  //   technologies: ["python", "pygame"],
  //   logo: "Boids (4)",
  //   screenShoots: Array.from({ length: 9 }, (_, i) => `Boids (${i+1})`),
  //   link: ProjectsFolder+"boids_simulator",
  //   youtube: YouTubeEmbed+"ExgxrMtjV3M", //video id
  //   github:  GithubLink+"Boids-simulator",
  //   relevancy: 2,
  // }

  // const MazeGeneratorSolver: ProjectType = {
  //   title: t("maze.title"),
  //   finished: t("finished"),
  //   descriptionShort: t("maze.description_short"),
  //   descriptionLong:t("maze.description_long"),
  //   technologies: ["python", "pygame"],
  //   logo: "MazeSolver (3)",
  //   screenShoots: Array.from({ length: 8 }, (_, i) => `MazeSolver (${i+1})`),
  //   link: ProjectsFolder+"maze_generator_solver",
  //   youtube: YouTubeEmbed+"bZt4bsz9n9Q", //video id
  //   github:  GithubLink+"Maze-Generator-Solver",
  //   relevancy: 2,
  // }

  // const TheCubeElJueguito: ProjectType = {
  //   title: t("the_cube.title"),
  //   finished: t("finished"),
  //   descriptionShort: t("the_cube.description_short"),
  //   descriptionLong:t("the_cube.description_long"),
  //   technologies: ["c-sharp", "unity"],
  //   logo: "El jueguito (1)",
  //   screenShoots: Array.from({ length: 7 }, (_, i) => `El jueguito (${i+1})`),
  //   link: ProjectsFolder+"the_cube_el_jueguito",
  //   youtube: YouTubeEmbed+"J6wj_w_J8AU", //video id
  //   github:  GithubLink+"The-Cube-ElJueguito",
  //   relevancy: 2,
  // }

  // const AutoImageToAscii: ProjectType = {
  //   title: t("ascii.title"),
  //   finished: t("finished"),
  //   descriptionShort: t("ascii.description_short"),
  //   descriptionLong:t("ascii.description_long"),
  //   technologies: ["python"],
  //   logo: "Ascci Converter (1)",
  //   screenShoots: Array.from({ length: 3 }, (_, i) => `Ascci Converter (${i+1})`),
  //   link: ProjectsFolder+"auto_image_to_ascii",
  //   youtube: YouTubeEmbed+"ta2pDyuCPKc", //video id
  //   github:  GithubLink+"Auto-image-to-Ascii",
  //   relevancy: 2,
  // }

  // const TetrisJavaFX: ProjectType = {
  //   title: t("portfolio.title"),
  //   finished: t("finished"),
  //   descriptionShort: t("portfolio.description_short"),
  //   descriptionLong:t("portfolio.description_long"),
  //   technologies: ["c++"],
  //   logo: "Captura",
  //   screenShoots: Array.from({ length: 9 }, (_, i) => `Boids (${i+1})`),
  //   link: ProjectsFolder+"portfolio",
  //   youtube: YouTubeEmbed+"", //video id
  //   github:  GithubLink+"Tetris-JavaFX",
  //   relevancy: 2,
  // }

  // const OrbitsSimulator: ProjectType = {
  //   title: t("orbits.title"),
  //   finished: t("finished"),
  //   descriptionShort: t("orbits.description_short"),
  //   descriptionLong:t("orbits.description_long"),
  //   technologies: ["c++"],
  //   logo: "Orbits (1)",
  //   screenShoots: Array.from({ length: 8 }, (_, i) => `Orbits (${i+1})`),
  //   link: ProjectsFolder+"orbits",
  //   youtube: YouTubeEmbed+"UPl4bBSgKtM", //video id
  //   github:  GithubLink+"Orbits-Simulator",
  //   relevancy: 2,
  // }

  const StringArt: ProjectType = {
    id: "string-art",
    title: t("string.title"),
    finished: t("finished"),
    descriptionShort: t("string.description_short"),
    date: t("string.date"),
    descriptionLong:t("string.description_long"),
    logo: "String Art (1)",
    screenShoots: Array.from({ length: 4 }, (_, i) => `String Art (${i+1})`),
    link: ProjectsFolder+"string_art",
    youtube: YouTubeEmbed+"", //video id
    github:  GithubLink+"miquelgc-portfolio/tree/main/app/%5Blocale%5D/projects/string_art",
    relevancy: 90,
    technologies: ["git", "javascript", "next", "react", "tailwind", "typescript"],
    tags: ["interactive", "personal"],
    search: {
        title: {
            en: "String Art",
            es: "Hiloramas"
        },
        description: {
            en: "From pixels to lines. Transform images into beautiful string art using an iterative algorithm that picks the best thread from each pin until a full portrait emerges.",
            es: "De píxeles a líneas. Convierte imágenes en arte con hilos usando un algoritmo iterativo que elige el mejor hilo desde cada pin hasta que el retrato emerge por completo."
        },
        keywords: {
            en: ["string art", "thread art", "image to lines", "generative art", "pixel to string", "portrait", "pin art", "line algorithm", "creative coding", "canvas"].join(", "),
            es: ["arte con hilos", "hilorama", "imagen a líneas", "arte generativo", "retrato", "pines", "algoritmo de líneas", "creative coding", "canvas"].join(", ")
        }
    },
  }

  const Smoking: ProjectType = {
    id: "smoking",
    title: t("smoking.title"),
    finished: t("progress"),
    descriptionShort: t("smoking.description_short"),
    date: t("smoking.date"),
    descriptionLong:t("smoking.description_long"),
    logo: "Smoking",
    screenShoots: [], // Array.from({ length: 0 }, (_, i) => `Smoking (${i+1})`),
    link: ProjectsFolder+"smoking",
    youtube: YouTubeEmbed+"", //video id
    github:  GithubLink+"miquelgc-portfolio/tree/main/app/%5Blocale%5D/projects/smoking",
    relevancy: 25,
    technologies: ["git", "javascript", "next", "react", "tailwind", "typescript"],
    tags: ["interactive", "personal"],
    search: {
        title: {
            en: "A Cigarette?",
            es: "¿Un cigarro?"
        },
        description: {
            en: "Take a break. A virtual cigarette that burns slowly on your screen — click to smoke, watch it fade, then light another one.",
            es: "Tómate un descanso. Un cigarro virtual que se quema lentamente en tu pantalla — haz clic para fumar, míralo consumirse, y enciende otro."
        },
        keywords: {
            en: ["cigarette", "smoke", "interactive", "relaxing", "animation", "chill", "fun", "virtual", "web toy"].join(", "),
            es: ["cigarro", "humo", "interactivo", "relajante", "animación", "chill", "diversión", "virtual", "web toy"].join(", ")
        }
      },
  }

  return [
    StringArt,
    // ProceduralAnimations,
    // DoublePendulum,
    // BoidsSimulator,
    Smoking,
    // TheCubeElJueguito,
    // MazeGeneratorSolver,
    // InverseKinematics,
    // Porfolio,
    // TetrisJavaFX,
    // OrbitsSimulator,
    // AutoImageToAscii,
  ]
}
