import type { TFunction } from "i18next";
import { GithubLink, YouTubeEmbed, ProjectsFolder } from "./constants.text.d"
import { TechnologyString } from "./technologies.d"

export type LocaleText = { en: string; es: string }

export type ProjectType = { 
  title: string, 
  finished: string, 
  date?: string,
  descriptionShort: string, 
  descriptionLong: string, 
  technologies: TechnologyString[], 
  logo: string,
  screenShoots: string[] 
  link: string 
  youtube: string
  github: string
  tags?: string[]
  _search?: {
    title: LocaleText
    description: LocaleText
    keywords: LocaleText
    rawDate?: string
  }
}
type ProjectsObject = {
  DoublePendulum: ProjectType;
  ProceduralAnimations: ProjectType;
  BoidsSimulator: ProjectType;
  TheCubeElJueguito: ProjectType;
  MazeGeneratorSolver: ProjectType;
  InverseKinematics: ProjectType;
  Porfolio: ProjectType;
  OrbitsSimulator: ProjectType;
  AutoImageToAscii: ProjectType;
  StringArt: ProjectType;
  Smoking: ProjectType
};
export const getProjects = (t: TFunction):  ProjectsObject => {
  const Porfolio: ProjectType = {
    title: t("portfolio.title"),
    finished: t("progress"),
    descriptionShort: t("portfolio.description_short"),
    descriptionLong:t("portfolio.description_long"),
    technologies: ["html", "css", "react", "typescript", "next", "tailwind", "github"],
    screenShoots:Array.from({ length: 6 }, (_, i) => `Portfolio (${i+1})`),
    logo: "Portfolio (6)",
    link: ProjectsFolder+"portfolio",
    youtube: "", //video id
    github: GithubLink+"miquelgc-portfolio",
  }

  const ProceduralAnimations: ProjectType = {
    title: t("procedural.title"),
    finished: t("finished"),
    descriptionShort: t("procedural.description_short"),
    descriptionLong:t("procedural.description_long"),
    technologies: ["python", "pygame", "numpy"],
    screenShoots: Array.from({ length: 10 }, (_, i) => `Procedural (${i+1})`),
    logo: "Procedural (6)",
    link: ProjectsFolder+"procedural_animations",
    youtube: YouTubeEmbed+"DXGSoyjN9PA", //video id
    github: GithubLink+"Procedural_Animations",
  }

  const InverseKinematics: ProjectType = {
    title: t("kinematics.title"),
    finished: t("finished"),
    descriptionShort: t("kinematics.description_short"),
    descriptionLong:t("kinematics.description_long"),
    technologies: ["python", "pygame", "numpy"],
    logo: "Kinematics (4)",
    screenShoots: Array.from({ length: 6 }, (_, i) => `Kinematics (${i+1})`),
    link: ProjectsFolder+"incerse_kinematics",
    youtube: YouTubeEmbed+"fmYzdNtMQSY", //video id
    github: GithubLink+"Inverse_Kinematics",
  }

  const DoublePendulum: ProjectType = {
    title: t("pendulum.title"),
    finished: t("finished"),
    descriptionShort: t("pendulum.description_short"),
    descriptionLong:t("pendulum.description_long"),
    technologies: ["python", "pygame", "numpy"],
    logo: "Pendulum (2)",
    screenShoots: Array.from({ length: 7 }, (_, i) => `Pendulum (${i+1})`),
    link: ProjectsFolder+"double_pendulum",
    youtube: YouTubeEmbed+"Gw-FDuWRabM", //video id
    github: GithubLink+"Double-pendulum",
  }

  const BoidsSimulator: ProjectType = {
    title: t("boids.title"),
    finished: t("finished"),
    descriptionShort: t("boids.description_short"),
    descriptionLong:t("boids.description_long"),
    technologies: ["python", "pygame"],
    logo: "Boids (4)",
    screenShoots: Array.from({ length: 9 }, (_, i) => `Boids (${i+1})`),
    link: ProjectsFolder+"boids_simulator",
    youtube: YouTubeEmbed+"ExgxrMtjV3M", //video id
    github:  GithubLink+"Boids-simulator",
  }

  const MazeGeneratorSolver: ProjectType = {
    title: t("maze.title"),
    finished: t("finished"),
    descriptionShort: t("maze.description_short"),
    descriptionLong:t("maze.description_long"),
    technologies: ["python", "pygame"],
    logo: "MazeSolver (3)",
    screenShoots: Array.from({ length: 8 }, (_, i) => `MazeSolver (${i+1})`),
    link: ProjectsFolder+"maze_generator_solver",
    youtube: YouTubeEmbed+"bZt4bsz9n9Q", //video id
    github:  GithubLink+"Maze-Generator-Solver",
  }

  const TheCubeElJueguito: ProjectType = {
    title: t("the_cube.title"),
    finished: t("finished"),
    descriptionShort: t("the_cube.description_short"),
    descriptionLong:t("the_cube.description_long"),
    technologies: ["c-sharp", "unity"],
    logo: "El jueguito (1)",
    screenShoots: Array.from({ length: 7 }, (_, i) => `El jueguito (${i+1})`),
    link: ProjectsFolder+"the_cube_el_jueguito",
    youtube: YouTubeEmbed+"J6wj_w_J8AU", //video id
    github:  GithubLink+"The-Cube-ElJueguito",
  }

  const AutoImageToAscii: ProjectType = {
    title: t("ascii.title"),
    finished: t("finished"),
    descriptionShort: t("ascii.description_short"),
    descriptionLong:t("ascii.description_long"),
    technologies: ["python"],
    logo: "Ascci Converter (1)",
    screenShoots: Array.from({ length: 3 }, (_, i) => `Ascci Converter (${i+1})`),
    link: ProjectsFolder+"auto_image_to_ascii",
    youtube: YouTubeEmbed+"ta2pDyuCPKc", //video id
    github:  GithubLink+"Auto-image-to-Ascii",
  }

  const TetrisJavaFX: ProjectType = {
    title: t("portfolio.title"),
    finished: t("finished"),
    descriptionShort: t("portfolio.description_short"),
    descriptionLong:t("portfolio.description_long"),
    technologies: ["c++"],
    logo: "Captura",
    screenShoots: Array.from({ length: 9 }, (_, i) => `Boids (${i+1})`),
    link: ProjectsFolder+"portfolio",
    youtube: YouTubeEmbed+"", //video id
    github:  GithubLink+"Tetris-JavaFX",
  }

  const OrbitsSimulator: ProjectType = {
    title: t("orbits.title"),
    finished: t("finished"),
    descriptionShort: t("orbits.description_short"),
    descriptionLong:t("orbits.description_long"),
    technologies: ["c++"],
    logo: "Orbits (1)",
    screenShoots: Array.from({ length: 8 }, (_, i) => `Orbits (${i+1})`),
    link: ProjectsFolder+"orbits",
    youtube: YouTubeEmbed+"UPl4bBSgKtM", //video id
    github:  GithubLink+"Orbits-Simulator",
  }

  const StringArt: ProjectType = {
    title: t("string.title"),
    finished: t("finished"),
    descriptionShort: t("string.description_short"),
    descriptionLong:t("string.description_long"),
    technologies: ["html", "css", "react", "typescript", "next", "tailwind", "github"],
    logo: "String Art (1)",
    screenShoots: Array.from({ length: 4 }, (_, i) => `String Art (${i+1})`),
    link: ProjectsFolder+"string_art",
    youtube: YouTubeEmbed+"", //video id
    github:  GithubLink+"miquelgc-portfolio/tree/main/app/%5Blocale%5D/projects/string_art",
  }

  const Smoking: ProjectType = {
    title: t("smoking.title"),
    finished: t("progress"),
    descriptionShort: t("smoking.description_short"),
    descriptionLong:t("smoking.description_long"),
    technologies: ["html", "css", "react", "typescript", "next", "tailwind", "github"],
    logo: "Smoking",
    screenShoots: [], // Array.from({ length: 0 }, (_, i) => `Smoking (${i+1})`),
    link: ProjectsFolder+"smoking",
    youtube: YouTubeEmbed+"", //video id
    github:  GithubLink+"miquelgc-portfolio/tree/main/app/%5Blocale%5D/projects/smoking",
  }

  return {
    StringArt,
    ProceduralAnimations,
    DoublePendulum,
    BoidsSimulator,
    Smoking,
    TheCubeElJueguito,
    MazeGeneratorSolver,
    InverseKinematics,
    Porfolio,
    // TetrisJavaFX,
    OrbitsSimulator,
    AutoImageToAscii,
  }
}
