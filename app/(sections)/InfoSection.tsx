
import GlowingText from "@/app/(utils)/(components)/GlowingText";
import Image from "next/image";
import { IconLGlowingLink, IconCopy, IconGlowingCopy, IconGlowing } from "@/app/(utils)/(components)/IconsButtons";
import { Location, Email, Github, GithubLink, Linkedin, LinkedinLink, Curriculum, CurriculumSiglas } from "@/app/(utils)/(constants)/constants.d"
import { DownloadCV } from "@/app/(utils)/(components)/Utils";
import { WritingText } from "@/app/(utils)/(components)/TypingText";

const qualities = [
  " creativo.",
  " apasionado.",
  " curioso.",
  " aplicado.",
  " determinado.",
  " trabajador.",
  " guapo? ;)"
]
export default function InfoSection() {
  return (
    <section id="Info-Section" className='w-full flex flex-col xl:flex-row-reverse justify-between items-center gap-24 xl:gap-10'>
      <Foto />

      <aside className="flex flex-col gap-6 max-w-3xl text-center xl:text-start">
        <h1 className='text-3xl sm:text-5xl flex flex-col md:flex-row justify-center xl:justify-start gap-4 font-bold whitespace-nowrap'>
          ¡Hola, soy <GlowingText>Miquel Gómez!</GlowingText>
        </h1>
        <h2 className="text-lg sm:text-2xl flex justify-center items-center xl:justify-start gap-2 text-nowrap overflow-hidden">
          Soy un estudiante <GlowingText> <WritingText list={qualities}/> <WritingBar /> </GlowingText>
        </h2>
        <p className="text-sm sm:text-base text-miquel-white-500 flex flex-col gap-2">
          <span >
            <IconCopy
              src="location-pin" title={Location}
              width={20} height={20}
              copyText={Location}
              text={Location}
            />
          </span>

          En mi grado, estoy estudiando la rama de computación: Optimización, aprendizaje automático etc. Mis competencias Informáticas son de calidad,
          desenvolviéndome sin problemas en diferentes lenguajes y entornos de trabajo. A lo largo de mi carrera he destaco en los estudios y he obtenido reconocimientos.
          Por mi cuenta, he desarrollado pequeños proyectos con lo aprendido en mis estudios, al igual  que he ampliado mis habilidades en la edición de imágenes, hasta el punto de trabajar con
          diversos clientes de todo el mundo. Actualmente, busco integrarme como informático en el sector de la IA y de la Ciberseguridad.
        </p>


        <footer className="flex flex-wrap justify-center xl:justify-start gap-4">
          <DownloadCV>
            <IconGlowing
              src="download-document" title={Curriculum}
              width={20} height={20}
              text={CurriculumSiglas}
              solid
            />
          </DownloadCV>
          <IconGlowingCopy
            src="email" title={Email}
            width={20} height={20}
            copyText={Email}
            text={Email}
          />
          <IconLGlowingLink
            src="linkedin" title={Linkedin}
            width={20} height={20}
            link={LinkedinLink}
            blank
          />
          <IconLGlowingLink
            src="github" title={Github}
            width={20} height={20}
            link={GithubLink}
            blank
          />
        </footer>
      </aside>
    </section>
  )
}

function WritingBar() {
  return (
    <span className="duration-200 animate-fade-in-out">
      |
    </span>
  )
}

function Foto() {
  return (
    <section className="relative flex justify-center w-full max-w-[400px] lg:min-w-[300px] aspect-square">
      <div className="absolute bg-miquel-blue-400 rounded-full blur-md w-full h-full" />
      <Image
        src="/miquel/DNI-png@0.75x.webp"
        alt="Miquel Gómez Corral"
        layout="fill"
        className="rounded-full bg-miquel-blue-400 object-cover"
      />
    </section>
  )
}
