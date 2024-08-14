import Link from "next/link";
import { EmptyProyect, Proyect } from "../proyects/elements";
import { PROYECTS } from "../(utils)/(constants)/proyect.text.d";

export default function Proyects() {
  return (
    <section id="Proyects" className="w-full flex flex-col gap-6">
      <header className="w-full py-4 border-b-2 border-b-miquel-white-200/50">
        <h1 className="text-5xl font-bold">Proyectos</h1>
      </header>

      <main className="flex flex-col justify-center gap-6">
        {PROYECTS.slice(0,4).map((object, idx) =>
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
          <EmptyProyect object={PROYECTS[4]}/>
        </figure>
      </Link>
    </section>
  )
}

