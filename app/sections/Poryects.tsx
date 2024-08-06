

const PROYECTS = [
  {
    title: "Hola 1",
    description: "AWDDDDDDDDDDDDDDDDAWDAWDAWDAWDAWD",
    content: <Proyect/>
  },
  {
    title: "Hola 2",
    description: "AWDDDDDDDDDDDDDDDDAWDAWDAWDAWDAWD",
    content: <Proyect/>
  },
  {
    title: "Hola 3",
    description: "AWDDDDDDDDDDDDDDDDAWDAWDAWDAWDAWD",
    content: <Proyect/>
  },
  {
    title: "Hola 4",
    description: "AWDDDDDDDDDDDDDDDDAWDAWDAWDAWDAWD",
    content: <Proyect/>
  },
  {
    title: "Hola 5",
    description: "AWDDDDDDDDDDDDDDDDAWDAWDAWDAWDAWD",
    content: <Proyect/>
  },
]

export default function Proyects() {
  return (
    <section className="w-full flex flex-col gap-4">
      <header className="w-full py-4 border-b-2 border-b-miquel-white-200/50">
        <h1 className="text-5xl font-bold">Proyectos</h1>
      </header>

      <main className="grid grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] gap-10">
        {PROYECTS.map((object, idx) =>
          <section key={idx}
            className="border border-miquel-white-200/50 rounded-xl p-4 gap-2"
          >
            <h3>{object.title}</h3>
            <p>{object.description}</p>
            {object.content}
          </section>
        )}
      </main>

    </section>
  )
}

function Proyect(){
  return(
    <div className="w-96 h-24 border border-miquel-white-200/50 rounded-xl">

    </div>
  )
}