import { ProjectS } from "@/app/[locale]/(utils)/(constants)/project.text.d";
import { Project } from "./elements";
import Header from "@/app/[locale]/(sections)/Header";
import Footer from "@/app/[locale]/(sections)/Footer";

export default function ProjectsPage() {
  return (
    <>
      <Header />
      <main className="max-w-[110rem] w-full flex flex-col gap-16 px-4 md:px-10 xl:px-48 2xl:px-64">
        <section className="w-full h-full flex flex-col gap-6 bg-miquel-background text-white ">
          <header className="w-full pb-20 flex justify-center">
            <h1 className="text-6xl sm:text-8xl font-bold">Proyectos</h1>
          </header>

          <main className="flex flex-col justify-center gap-6">
            {ProjectS.map((object, idx) =>
              <Project object={object} key={idx}/>
            )}
          </main>
        </section>
      </main>

      <div id="footer" className="w-full bg-gradient-to-b from-miquel-background to-black flex justify-center ">
        <Footer />
      </div>
    </>
  )
}



