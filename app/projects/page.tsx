import { ProjectS } from "../(utils)/(constants)/project.text.d";
import { Project } from "./elements";

export default function ProjectsPage() {
  return (
    <section className="w-full h-full flex flex-col gap-6 bg-miquel-background text-white ">
      <header className="w-full pb-20 flex justify-center">
        <h1 className="text-8xl font-bold">Proyectos</h1>
      </header>

      <main className="flex flex-col justify-center gap-6">
        {ProjectS.map((object, idx) =>
          <Project object={object} key={idx}/>
        )}
      </main>

    </section>
  )
}



