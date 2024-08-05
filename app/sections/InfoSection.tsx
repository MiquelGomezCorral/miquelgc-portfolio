"use client"
import { useEffect, useState } from "react";
import GlowingText from "../components/GlowingText";
import Image from "next/image";
import { IconCopy, IconLink } from "../components/GlowingButton";
import { Email, Github, GithubLink, Linkedin, LinkedinLink } from "../constants/constants.d";

export default function InfoSection() {
  const [quality, setQuality] = useState("Creativo")
  const [indexQuality, setIndexQuality] = useState(0)
  const [isWriting, setIsWriting] = useState(false)
  const qualities = [
    " Creativo",
    " Apasionado",
    " Curioso",
    " Estudiante",
    " Aplicado",
    " Determinado",
    " Trabajador",
    " Guapo?"
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
    <section className='w-full flex justify-between items-center pr-64'>
      <aside className="flex flex-col gap-6 max-w-3xl">
        <h1 className='text-5xl flex gap-4 font-bold'>
          ¡Hola, soy <GlowingText>Miquel Gómez!</GlowingText>
        </h1>
        <h2 className="text-2xl flex gap-2">Soy <GlowingText>{quality}<WritingBar /> </GlowingText></h2>
        <p className="text-miquel-white-500 ">
          En mi grado, estoy estudiando la rama de computación: Optimización, aprendizaje automático etc. Mis competencias Informáticas son de calidad,
          desenvolviéndome sin problemas en diferentes lenguajes y entornos de trabajo. A lo largo de mi carrera he destaco en los estudios y he obtenido reconocimientos.
          Por mi cuenta, he desarrollado pequeños proyectos con lo aprendido en mis estudios, al igual  que he ampliado mis habilidades en la edición de imágenes, hasta el punto de trabajar con
          diversos clientes de todo el mundo. Actualmente, busco integrarme como informático en el sector de la IA y de la Ciberseguridad.
        </p>
        <footer className="flex gap-4">
          <IconLink 
            src="/assets/linkedin.svg" alt={Linkedin} title={Linkedin}
            width={20} height={20}  
            link={LinkedinLink}
            blank         
          />
          <IconLink 
            src="/assets/github.svg" alt={Github}title={Github}
            width={20} height={20} 
            link={GithubLink}            
            blank         
          />
          <IconCopy 
            src="/assets/email.svg" alt={Email} title={Email}
            width={20} height={20} 
            copyText={Email}
            />
      </footer>
      </aside>
      <aside className="">
        <div className="w-[400px] h-[400px] bg-miquel-blue-400 rounded-full absolute blur-md" />
        <Image src="/yo/DNI-png.png" alt="Miquel Gómez Corral"
          width={400}
          height={400}
          className="rounded-full bg-miquel-blue-400 relative"
        />
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

