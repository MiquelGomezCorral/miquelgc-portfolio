"use client"

import { useRef } from "react";
import Image from "next/image";
import confetti from 'canvas-confetti';

export function Foto() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      confetti({
        particleCount: 100,
        spread: 80,
        origin: {
          x: (rect.left + rect.right) / 2 / window.innerWidth, // X position in relative percentage
          y: (rect.top + rect.bottom + 400) / 2 / window.innerHeight  // Y position in relative percentage
        }
      });
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
        src="/assets/miquel/DNI-png@0.75x.webp"
        alt="Miquel Gómez Corral"
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="rounded-full bg-miquel-blue-400 object-cover"
      />
    </section>
  );
}
