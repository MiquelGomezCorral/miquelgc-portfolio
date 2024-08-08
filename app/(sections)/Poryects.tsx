import Image from "next/image";
import { IconLink } from "../(components)/IconsButtons";
import Link from "next/link";


const PROYECTS:  {title: string, finished: boolean, description: string, technologies:Technologystrig[], link: string }[] = [
  {
    title: "Porfolio web personal",
    finished: false,
    description: "Desarrollado desde cero, este portafolio personal destaca mis habilidades y experiencia en programación. Incluye una descripción sobre mí, un currículum en línea, información de contacto, una sección de proyectos destacados y las tecnologías que uso y con las que estoy familiarizado. Con un diseño responsivo y una experiencia de usuario optimizada, ofrece una presentación profesional y accesible de mi trabajo y logros.",
    technologies: ["html", "css", "react", "typescript","next", "tailwind", "github"],
    link: "/",
  },
  {
    title: "Hola 2",
    finished: true,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    technologies: ["python", "pygame"],
    link: "/",
  },
  {
    title: "Hola 3",
    finished: true,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    technologies: ["unity", "c-sharp"],
    link: "/",
  },
  {
    title: "Hola 4",
    finished: true,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    technologies: ["java"],
    link: "/",
  },
  {
    title: "Hola 5",
    finished: true,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    technologies: ["c++"],
    link: "/",
  },
  {
    title: "Hola 5",
    finished: true,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    technologies: [],
    link: "/",
  },
  {
    title: "Hola 5",
    finished: true,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    technologies: [],
    link: "/",
  },
  {
    title: "Hola 5",
    finished: true,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    technologies: [],
    link: "/",
  },
  {
    title: "Hola 5", 
    finished: true,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    technologies: [],
    link: "/",
  },
]

export default function Proyects() {
  return (
    <section className="w-full flex flex-col gap-6">
      <header className="w-full py-4 border-b-2 border-b-miquel-white-200/50">
        <h1 className="text-5xl font-bold">Proyectos</h1>
      </header>

      <main className="flex flex-col justify-center gap-6">
        {PROYECTS.map((object, idx) =>
          <Link key={idx}
            href="/"            
            className="relative grid gird-cols-1 lg:grid-cols-12 gap-4 p-4 rounded-xl transform duration-300 hover:scale-105 hover:bg-miquel-black-400/20"
          >
            <div className="relative w-full aspect-video col-span-1 lg:col-span-5">
              <Image 
                src="/assets/proyects/Captura.png"
                alt={object.title}
                fill
                className="border border-miquel-white-200/50 rounded-xl"
              />
            </div>

            <main className="flex flex-col gap-2 justify-between col-span-1 lg:col-start-6 lg:col-span-7">
              <span>
                <header className="flex items-center gap-3">
                  <h2 className="text-2xl">{object.title}</h2>
                  <IconLink 
                    src="external-link" title={object.title}
                    width={20} height={20} 
                    link="/"            
                    blank         
                  />
                </header>
                <p className="opacity-50">{object.finished ? "Terminado" : "En progreso"}</p>
              </span>
              <p className="opacity-70 ">{object.description}</p>
              <footer className="flex gap-2 overflow-x-auto scroll-smooth hide-scrollbar">
                {object.technologies.map((tech, idx) =>
                  <Technology key={idx} src={tech}/>
                )}
              </footer>
            </main>
          </Link>
        )}
      </main>

    </section>
  )
}


type Technologystrig = "html" | "react" | "typescript" | "next" | "tailwind" | "github" | "css" | "java" | "unity" | "python" | "pygame" | "c++" | "c-sharp"

function Technology({src}:{src:string}){
  const Title = (src:string) => {
    switch(src){
      case "html": return "Html"
      case "react": return "React"
      case "typescript": return "TypeScript"
      case "next": return "Next.js"
      case "tailwind": return "Tailwind CSS"
      case "github": return "GitHub"
      case "css": return "CSS"
      case "java": return "Java"
      case "unity": return "Unity"
      case "python": return "Python"
      case "pygame": return "Pygame"
      case "c++": return "C ++"
      case "c-sharp": return "C #"
    }
  }

  return (
    <section className="rounded-full bg-miquel-black-200 px-4 py-1 flex justify-center items-center gap-2 text-xs">
      <Image src={`/assets/icons/${src}.svg`} alt={src}
        width={20}
        height={20}
        title={Title(src)}
      />
      <p className="opacity-80 text-nowrap">{Title(src)}</p>
    </section>
  )
}

