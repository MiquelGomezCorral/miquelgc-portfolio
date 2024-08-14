import Image from "next/image";
import { Icon, IconLink } from "../(utils)/(components)/IconsButtons";
import Link from "next/link";
import cn from 'classnames';
import { PROYECTS } from "./proyect.text.d"

export default function ProyectsPage() {
  return (
    <section className="w-full h-full flex flex-col gap-6 bg-miquel-background text-white ">
      <header className="w-full py-4 border-b-2 border-b-miquel-white-200/50">
        <h1 className="text-5xl font-bold">Proyectos</h1>
      </header>

      <main className="flex flex-col justify-center gap-6">
        {PROYECTS.map((object, idx) =>
          <li key={idx}
            className="relative grid gird-cols-1 lg:grid-cols-12 gap-4 p-4 rounded-xl transform duration-300 hover:scale-105 hover:bg-miquel-black-400/20"
          >
            <Link href={object.link} target="_blank" className="relative w-full aspect-video col-span-1 lg:col-span-5">
              <Image
                src={`/assets/proyects/${object.miniatura}.webp`}
                alt={object.title}
                fill
                className="ring ring-miquel-white-200/20 hover:ring-miquel-white-200/50 rounded-xl hover:-translate-y-2 transform duration-300"
              />
            </Link>

            <article className="flex flex-col gap-2 justify-between col-span-1 lg:col-start-6 lg:col-span-7">
              <span>
                <header className="flex items-center gap-3">
                  <h2 className="text-2xl">{object.title}</h2>
                  <IconLink
                    src="external-link" title={object.title}
                    width={20} height={20}
                    link={object.link}
                    blank
                  />
                </header>
                <p className="opacity-50">{object.finished ? "Terminado" : "En progreso"}</p>
              </span>

              <p className="opacity-70 ">{object.descriptionShort}</p>

              <footer className="flex gap-2 flex-wrap">
                {object.technologies.map((tech, idx) =>
                  <Technology key={idx} src={tech} />
                )}
              </footer>
            </article>
          </li>
        )}
      </main>

    </section>
  )
}

export function Proyect({object, disabled}:{object: typeof PROYECTS[0], disabled?: boolean}) {
  return (
    <li 
      className={cn("relative grid gird-cols-1 lg:grid-cols-12 gap-4 p-4 rounded-xl transform duration-300",{" hover:scale-105 hover:bg-miquel-black-400/20": !disabled})}
    >
      <Link href={object.link} target="_blank" className="relative w-full aspect-video col-span-1 lg:col-span-5">
        <Image
          src={`/assets/proyects/${object.miniatura}.webp`}
          alt={object.title}
          fill
          className="hover:ring hover:ring-miquel-white-200/20 rounded-xl hover:-translate-y-2 transform duration-300"
        />
      </Link>

      <article className="flex flex-col gap-2 justify-between col-span-1 lg:col-start-6 lg:col-span-7">
        <span>
          <header className="flex items-center gap-3">
            <h2 className="text-2xl">{object.title}</h2>
            <IconLink
              src="external-link" title={object.title}
              width={20} height={20}
              link={object.link}
              blank
            />
          </header>
          <p className="opacity-50">{object.finished ? "Terminado" : "En progreso"}</p>
        </span>

        <p className="opacity-70 ">{object.descriptionShort}</p>

        <footer className="flex gap-2 flex-wrap">
          {object.technologies.map((tech, idx) =>
            <Technology key={idx} src={tech} />
          )}
        </footer>
      </article>
    </li>
  )
}

export function EmptyProyect({object}:{object: typeof PROYECTS[0]}) {
  return (
    <li 
      className="relative grid gird-cols-1 lg:grid-cols-12 gap-4 p-4 rounded-xl transform duration-300"
    >
      <div className="relative w-full aspect-video col-span-1 lg:col-span-5">
        <Image
          src="/assets/proyects/Captura.png"
          alt={object.title}
          fill
          className="ring ring-miquel-white-200/20 hover:ring-miquel-white-200/50 rounded-xl hover:-translate-y-2 transform duration-300"
        />
      </div>

      <article className="flex flex-col gap-2 justify-between col-span-1 lg:col-start-6 lg:col-span-7">
        <span>
          <header className="flex items-center gap-3">
            <h2 className="text-2xl">{object.title}</h2>
            <Icon
              src="external-link" title={object.title}
              width={20} height={20}
            />
          </header>
          <p className="opacity-50">{object.finished ? "Terminado" : "En progreso"}</p>
        </span>
        <p className="opacity-70 ">{object.descriptionShort}</p>
      </article>
    </li>
  )
}

export function Technology({ src }: { src: string }) {
  const Title = (src: string) => {
    switch (src) {
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

