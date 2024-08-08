"use client"
import { useEffect, useState } from "react";
import GlowingText from "../(components)/GlowingText";
import Image from "next/image";
import { GlowingIconCopySolid, IconLGlowingink, IconCopy, IconGlowingSolid, IconGlowingCopy } from "../(components)/IconsButtons";
import { Location, Email, Github, GithubLink, Linkedin, LinkedinLink, Curriculum, CurriculumSiglas } from "../(constants)/constants.d";
import { DownloadCV } from "../(components)/Utils";

export default function InfoSection() {
  const [quality, setQuality] = useState("Creativo")
  const [indexQuality, setIndexQuality] = useState(0)
  const [isWriting, setIsWriting] = useState(false)
  const qualities = [
    " creativo.",
    " apasionado.",
    " curioso.",
    " aplicado.",
    " hábil programador.",
    " determinado.",
    " trabajador.",
    " guapo? ;)"
  ]
  useEffect(() => {
    const deletingTime = 25
    const writingTime = 150
    if (isWriting) return
    const intervalDel = setInterval(() => {
      if (quality) {
        setQuality(prev => prev.slice(0, -1))
      } else {
        setIsWriting(true)
        const nextIndext = (indexQuality + 1) % qualities.length
        setIndexQuality(nextIndext)

        let i = 0
        const intervalWrite = setInterval(() => {
          if (i < qualities[nextIndext].length - 1) {
            setQuality(prev => prev + qualities[nextIndext][i])
            i++
          } else {
            clearInterval(intervalWrite)
            setTimeout(() => setIsWriting(false), 750);
          }
        }, writingTime)
      }
    }, deletingTime)
    return () => clearInterval(intervalDel)
  }, [quality, isWriting])

  return (
    <section className='w-full flex flex-col xl:flex-row-reverse justify-between items-center gap-24 xl:gap-10'>
      <Foto />
      <aside className="flex flex-col gap-6 max-w-3xl text-center xl:text-start">
        <h1 className='text-5xl flex flex-col md:flex-row justify-center xl:justify-start gap-4 font-bold whitespace-nowrap'>
          ¡Hola, soy <GlowingText>Miquel Gómez!</GlowingText>
        </h1>
        <h2 className="text-2xl flex justify-center xl:justify-start gap-2">
          Soy un estudiante <GlowingText>{quality}<WritingBar /> </GlowingText>
        </h2>
        <p className="text-miquel-white-500 flex flex-col gap-2">
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
            <IconGlowingSolid
              src="download-document" title={Curriculum}
              width={20} height={20}
              text={CurriculumSiglas}
            />
          </DownloadCV> 
          <IconGlowingCopy
            src="email" title={Email}
            width={20} height={20}
            copyText={Email}
            text={Email}
          />
          <IconLGlowingink
            src="linkedin" title={Linkedin}
            width={20} height={20}
            link={LinkedinLink}
            blank
          />
          <IconLGlowingink
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
    <section className="min-w-[400px] min-h-[400px] w-full flex justify-center">
      <div className="absolute bg-miquel-blue-400 rounded-full blur-md w-full h-full max-w-[400px] max-h-[400px] object-cover" />
      <Image src="/yo/DNI-png.png" alt="Miquel Gómez Corral"
        width={400}
        height={400}
        className="rounded-full bg-miquel-blue-400 relative "
      />
    </section>
  )
}
