import HeaderButton from "../components/HeaderButton";

export default function Header() {
    return (
      <header className='z-50 px-20 py-5 w-full flex fixed justify-between gap-10 top-0 backdrop-blur-md border-b-2 border-b-miquel-white-200/50'>
        <aside>
          Miquel Gómez
        </aside>
        <main className='flex gap-5'>
          <HeaderButton>Inicio</HeaderButton>
          <HeaderButton>Sobre mí</HeaderButton>
          <HeaderButton>Proyectos</HeaderButton>
          <HeaderButton>CV</HeaderButton>
          <HeaderButton>ES ^</HeaderButton>
        </main>
      </header>
    )
  }
  