import Header from "./sections/Header"
import InfoSection from "./sections/InfoSection"

export default function App() {
  return (
    <main className='h-full w-full px-20 py-5 flex flex-col justify-center items-center gap-20 bg-miquel-black-500 text-miquel-white-200 pt-60'>
      <Header />
      <InfoSection />
      <div className="h-screen"></div>
    </main>
  )
}

