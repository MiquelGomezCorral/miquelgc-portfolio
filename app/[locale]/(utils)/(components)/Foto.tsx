"use client"

import { useRef } from "react";
import Image from "next/image";
import confetti from 'canvas-confetti';
import CONFIG from "@/app/[locale]/(utils)/(constants)/configuration";

export function Foto() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      const x = (rect.left + rect.right) / 2;
      const y = (rect.top + rect.bottom) / 2;

      confetti({
        particleCount: 100,
        spread: 80,
        origin: {
          x: x / window.innerWidth, // X position in relative percentage
          y: (rect.top + rect.bottom + 400) / 2 / window.innerHeight  // Y position in relative percentage
        }
      });
      window.dispatchEvent(new CustomEvent(CONFIG.physicsBallsCreateEvent, { detail: { x, y } }));
    }
  };

  return (
    <section 
      ref={sectionRef} 
      className="relative flex justify-center w-full max-w-[400px] lg:min-w-[300px] aspect-square hover:cursor-pointer"
      onClick={handleClick}
    >
      <div className="absolute bg-miquel-blue-400 rounded-full blur-md w-full h-full" />
      <Image
        src="/assets/miquel/Vidext_cutout.webp"
        alt="Miquel Gómez Corral"
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="rounded-full bg-miquel-blue-400 object-cover"
      />
    </section>
  );
}
