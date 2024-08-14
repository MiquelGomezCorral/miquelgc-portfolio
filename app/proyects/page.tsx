import Image from "next/image";
import { IconLink } from "../(utils)/(components)/IconsButtons";
import Link from "next/link";
import { PROYECTS } from "../(utils)/(constants)/proyect.text.d";
import { Technology } from "./elements";

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
            <Link href={object.link} className="relative w-full aspect-video col-span-1 lg:col-span-5">
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



