import { ProjectS } from "../(utils)/(constants)/project.text.d";
import { Project } from "./elements";

export default function ProjectsPage() {
  return (
    <section className="w-full h-full flex flex-col gap-6 bg-miquel-background text-white ">
      <header className="w-full py-4 border-b-2 border-b-miquel-white-200/50">
        <h1 className="text-5xl font-bold">Projectos</h1>
      </header>

      <main className="flex flex-col justify-center gap-6">
        {ProjectS.map((object, idx) =>
          <Project object={object} key={idx}/>
        )}
      </main>

    </section>
  )
}



