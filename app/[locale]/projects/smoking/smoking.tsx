"use client"

import cn from "classnames"
import { useTranslation } from 'react-i18next';
import { useState, useRef, useEffect } from "react";

import { Icon, IconCopy } from '@/app/[locale]/(utils)/(components)/Icons';
import { Button, Input, ButtonModal } from '@/app/[locale]/(utils)/(components)/Buttons';


import CONFIG from "@/app/[locale]/(utils)/(constants)/configuration";



export function SmokingComponent(){
  const {t} = useTranslation("projects")
  const [holded, setHolded] = useState(0)
  const [holdding, setHolding] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const timerRefParticle = useRef<ReturnType<typeof setTimeout> | null>(null)

  const [resetKey, setResetKey] = useState(0);
  
  useEffect(() => {
    if(holdding){
      timerRef.current = setInterval(() => {
        setHolded(prev => prev+1)
      },1)
      setResetKey(prev => prev+1)
      if (timerRefParticle.current) clearInterval(timerRefParticle.current)
    }else{
      if (timerRef.current) clearInterval(timerRef.current)
        
      timerRefParticle.current = setTimeout(() => {
        setResetKey(prev => prev+1)
      },300)
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
      if (timerRefParticle.current) clearInterval(timerRefParticle.current)
    }
  },[holdding])


  const particlesSoft = useRef(
    Array.from({ length: 5 }, () => ({
      left: Math.random() * 100,
      duration: 4 + Math.random() * 6,
      delay: Math.random() * 2,
    }))
  ).current
  const particlesHard = useRef(
    Array.from({ length: 15 }, () => ({
      left: Math.random() * 100,
      duration: 1 + Math.random() * 2,
      delay: Math.random(),
    }))
  ).current
  // ==========================================================================================
  //                                      COMPONENT
  // ==========================================================================================
  return(
    <section className='min-h-screen max-h-full w-full flex justify-center items-start' 
      onMouseDown={() => setHolding(true)}
      onMouseUp={() => setHolding(false)}
      onKeyDown={() => setHolding(true)}
      onKeyUp={() => setHolding(false)}
    >
      <figure className="w-full flex justify-center">
        <div className=" h-[300px] w-full flex flex-col items-center justify-end">
          <div className="relative w-8 h-full flex flex-col-reverse"> 
            {/* Floating Particle */}
            <div className="absolute inset-0 overflow-hidden">
              {particlesSoft.map(({ left, duration, delay }, i) => (
                <div
                  key={i}
                  className="block w-1 h-1 bg-white rounded-full absolute animate-float particle"
                  style={{
                    left: `${left}%`,
                    bottom: "0",  // start at bottom
                    animationDuration: `${duration}s`,
                    animationDelay: `${delay}s`,
                  }}
                />
              ))}
              {particlesHard.map(({ left, duration, delay }, i) => (
                <div
                  key={`${resetKey}-${i}`}   
                  className={cn("w-1 h-1 bg-white rounded-full absolute miquel-transition animate-float transition-opacity duration-500", {
                    "opacity-0": !holdding,
                  })}
                  style={{
                    left: `${left}%`,
                    bottom: "0",  // start at bottom
                    animationDuration: `${duration}s`,
                    animationDelay: `${delay}s`,
                  }}
                />
              ))}
            </div>

            {/* Red burnig */}
            <div className="relative">
              <div className={
                cn("w-8 h-6 border-2 rounded-t-lg miquel-transition "+
                  "blur-md absolute inset-0 pointer-events-none select-none", 
                  {"bg-red-500 border-red-400 blur-lg": holdding},
                  {"bg-red-800  border-red-700": !holdding}
                )
              }/>
              <div className={
                cn("w-8 h-6 border-2 rounded-t-lg miquel-transition",
                  {"bg-red-500 border-red-400": holdding},
                  {"bg-red-800 border-red-700": !holdding}

                )
              }/>
            </div>
          </div>

          {/* main cigarette */}
          <div className="w-12 bg-gradient-to-b from-miquel-white-100 to-miquel-white-200 rounded-t-lg" style={{height: `${228 - 228*holded/(1000*20)}px`}}/>
          {/* orange bar */}
          <div className={"w-12 h-12 bg-gradient-to-b from-orange-500 to-orange-700 rounded-b-lg"}/>
        </div>
      </figure>
    </section>
  )
}

