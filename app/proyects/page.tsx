import { PROYECTS } from "../(utils)/(constants)/proyect.text.d";
import { Proyect } from "./elements";

export default function ProyectsPage() {
  return (
    <section className="w-full h-full flex flex-col gap-6 bg-miquel-background text-white ">
      <header className="w-full py-4 border-b-2 border-b-miquel-white-200/50">
        <h1 className="text-5xl font-bold">Proyectos</h1>
      </header>

      <main className="flex flex-col justify-center gap-6">
        {PROYECTS.map((object, idx) =>
          <Proyect object={object} key={idx}/>
        )}
      </main>

    </section>
  )
}



