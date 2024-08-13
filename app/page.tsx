import Header from "./(sections)/Header"
import InfoSection from "./(sections)/InfoSection"
import Footer from "./(sections)/Footer"
import Poryects from "./(sections)/Poryects"

export default function App() {
  return (
    <main className='h-full w-full px-4 md:px-10 xl:px-48 2xl:px-64 py-5 pt-20 sm:pt-60 flex flex-col justify-center items-center gap-20 
      bg-radient bg-miquel-background text-miquel-white-200'>

      <InfoSection/>
      <Poryects />

      <Footer />
      <div className="h-screen"></div> 
    </main>
  )
}

