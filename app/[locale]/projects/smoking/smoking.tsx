"use client"

import cn from "classnames"
import { useTranslation } from 'react-i18next';
import { useState, useRef, useEffect } from "react";

import { Icon, IconCopy } from '@/app/[locale]/(utils)/(components)/Icons';
import { Button, Input, ButtonModal } from '@/app/[locale]/(utils)/(components)/Buttons';

import CONFIG from "@/app/[locale]/(utils)/(constants)/configuration";
import { SoundPlayer } from "@/app/[locale]/(utils)/(components)/SoundPlayer";



export function SmokingComponent(){
  const {t} = useTranslation("projects")
  const [holding, setHolding] = useState(false)
  const [cigaretteHeight, setCigaretteHeight] = useState(1) 
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    window.scrollBy({ top: 100, behavior: "smooth" });
  }, []);
  
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCigaretteHeight(prev => 
        holding 
          ? prev - (1 / (CONFIG.cigaretteTime * 1000))
          : prev - (1 / (CONFIG.cigaretteTime * 10000))
      )
      },1)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  },[holding])


  const particlesSoft = useRef(
    Array.from({ length: CONFIG.slowSmokeParticles }, () => ({
      left: 20 + Math.random() * 60,
      duration: 2 + Math.random() * 3,
      delay: Math.random() * 2,
    }))
  ).current
  const particlesHard = useRef(
    Array.from({ length: CONFIG.fastSmokeParticles }, () => ({
      left: 15 + Math.random() * 75,
      duration: 1 + Math.random() * 2,
      delay: Math.random() + 0.5,
    }))
  ).current
  // ==========================================================================================
  //                                      COMPONENT
  // ==========================================================================================
  return(
    <>
    <SoundPlayer src="fire-low" play={cigaretteHeight > 0} loop/>
    <SoundPlayer src="fire-high" play={cigaretteHeight > 0 && holding} loop/>
    <SoundPlayer src="ligh-up" play={cigaretteHeight > 0}/>
    <section className='min-h-screen max-h-full w-full flex flex-col justify-start gap-24' 
      onMouseDown={() => setHolding(true)}
      onMouseUp={() => setHolding(false)}
      onKeyDown={() => setHolding(true)}
      onKeyUp={() => setHolding(false)}
    >
      <figure className="w-full h-[400px] flex justify-center items-end">
        <div className=" w-full flex flex-col items-center justify-end">
          {cigaretteHeight > 0 &&
            <>
              <div className="relative">
                {/* Red burnig */}
                <div className={
                  cn("w-12 border-2 rounded-t-lg miquel-transition "+
                    "blur-md absolute inset-0 pointer-events-none select-none", 
                    {"bg-red-500 border-red-400 blur-lg": holding},
                    {"bg-red-800  border-red-700": !holding},
                  )}
                  style={{height: `${Math.max(
                    cigaretteHeight*CONFIG.cigaretteMaxHeight*0.1,
                    CONFIG.cigaretteMaxHeight*0.05)
                  }px`}}
                />

                <div className={
                  cn("w-12 border-2 rounded-t-lg miquel-transition",
                    {"bg-red-500 border-red-400": holding},
                    {"bg-red-800 border-red-700": !holding},
                  )}
                  style={{height: `${Math.max(
                    cigaretteHeight*CONFIG.cigaretteMaxHeight*0.1,
                    CONFIG.cigaretteMaxHeight*0.05)
                  }px`}}
                />
                 {/* Floating Particle */}
                <div className="absolute inset-0 -z-10 -translate-x-1 translate-y-1 overflow-visible pointer-events-none">
                  <Particles particles={particlesSoft} render={cigaretteHeight > 0}/>
                  <Particles particles={particlesHard} render={holding}/>
                </div>
              </div>
            </>
          }
          {/* main cigarette */}
          <div 
            className="w-12 bg-gradient-to-b from-miquel-white-100 to-miquel-white-200 " 
            style={{
              height: `${
                CONFIG.cigaretteMaxHeight*cigaretteHeight
              }px`}}
          />
          {/* orange bar */}
          <div className={"w-12 h-12 bg-gradient-to-b from-orange-500 to-orange-700 rounded-b-lg"}/>
        </div>
      </figure>

      <nav className="w-full flex justify-center">
        {cigaretteHeight <= 0 &&
          <Button icon="fire" iconType="white"
            onClick={(e) =>{
              e.preventDefault()
              setCigaretteHeight(1)
              setHolding(false)
            } }
          >
            {t("smoking.another")}
          </Button>
        }
        <span className="text-miquel-white-500-a/60">
          {(cigaretteHeight > 0 && holding) &&
            <p>{t("smoking.intensive")}</p>
          }
          {(cigaretteHeight > 0 && !holding) &&
            <p>{t("smoking.slow")}</p>
          }
        </span>
      </nav>
    </section>
      </>
  )
}

type ParticleType = {
  left: number,
  duration: number,
  delay: number
}

function Particles({ particles, render }: {particles: ParticleType[], render?: boolean}) {
  const [resetKey, setResetKey] = useState(0);
  const timerRefParticle = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (render)
      setResetKey(prev => prev+1)
    else{
      timerRefParticle.current = setTimeout(() => {
        setResetKey(prev => prev+1)
      },300)
    }
    return (() => {
      if (timerRefParticle.current) clearInterval(timerRefParticle.current)
    })
  }, [render])
  return (
    <div className="absolute inset-0 -z-10 -translate-x-1 translate-y-1 overflow-visible pointer-events-none">
      {particles.map(({ left, duration, delay }, i) => (
        <div
          key={`${resetKey}-${i}`}
          className={cn(
            "block w-3 h-3 bg-miquel-white-500-a/60 rounded-full absolute animate-float transition-opacity duration-500",
            {"opacity-0": !render}
          )}
          style={{
            left: `${left}%`,
            bottom: "0",
            animationDuration: `${duration}s`,
            animationDelay: `${delay}s`,
          }}
        />
      ))}
    </div>
  )
}