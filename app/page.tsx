import Header from "./sections/Header"
import InfoSection from "./sections/InfoSection"
import Footer from "./sections/Footer"
import Poryects from "./sections/Poryects"

export default function App() {
  return (
    <main className='h-full w-full px-20 md:px-32 py-5 flex flex-col justify-center items-center gap-20 bg-miquel-background text-miquel-white-200 pt-60'>
      <Header />

      <InfoSection />
      <Poryects />

      <Footer />
      <div className="h-screen"></div> 
    </main>
  )
}

