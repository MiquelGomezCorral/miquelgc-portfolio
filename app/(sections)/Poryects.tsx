import Link from "next/link";
import { Proyect, ProyectType, Technology, Technologystrig } from "../proyects/page";


const PROYECTS: ProyectType[] = [
  {
    title: "Porfolio web personal",
    finished: false,
    description: "Desarrollado desde cero, este portafolio personal destaca mis habilidades y experiencia en programación. Incluye una descripción sobre mí, un currículum en línea, información de contacto, una sección de proyectos destacados y las tecnologías que uso y con las que estoy familiarizado. Con un diseño responsivo y una experiencia de usuario optimizada, ofrece una presentación profesional y accesible de mi trabajo y logros.",
    technologies: ["html", "css", "react", "typescript", "next", "tailwind", "github"],
    src: "Captura",
    link: "/proyects/portfolio",
  },
  {
    title: "Hola 1",
    finished: true,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    technologies: ["python", "pygame"],
    src: "Captura",
    link: "/",
  },
  {
    title: "Hola 2",
    finished: true,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    technologies: ["unity", "c-sharp"],
    src: "Captura",
    link: "/",
  },
  {
    title: "Hola 3",
    finished: true,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    technologies: ["java"],
    src: "Captura",
    link: "/",
  },
  {
    title: "Hola 4",
    finished: true,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    technologies: ["c++"],
    src: "Captura",
    link: "/",
  },
]

export default function Proyects() {
  return (
    <section id="Proyects" className="w-full flex flex-col gap-6">
      <header className="w-full py-4 border-b-2 border-b-miquel-white-200/50">
        <h1 className="text-5xl font-bold">Proyectos</h1>
      </header>

      <main className="flex flex-col justify-center gap-6">
        {PROYECTS.slice(0,-1).map((object, idx) =>
          <Proyect key={idx} object={object}/>
        )}
      </main>
      
      <Link 
        href="/proyects"
        className="relative rounded-xl opacity-70 hover:opacity-100 hover:bg-miquel-black-400/20 transform duration-300 ">
        <span className="absolute left-1/2 transform -translate-x-1/2 top-6 text-2xl">
          Ver más
        </span>
        <figure className="pt-1 h-20 overflow-hidden blur-sm">
          <Proyect object={PROYECTS[4]} disabled/>
        </figure>
      </Link>
    </section>
  )
}

