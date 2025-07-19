"use client"

import { useEffect, useRef } from "react"


export function SoundPlayer({src, play, loop}:{src: string, play: boolean, loop?: boolean}) {
    const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    audioRef.current = new Audio(`/assets/sound/${src}.mp3`)
    audioRef.current.loop = loop || false 
    return () => {
      audioRef.current?.pause()
      audioRef.current = null
    }
  }, [src])

  useEffect(() => {
    if (!audioRef.current) return

    if (play) {
        audioRef.current.play()
    } else {
        audioRef.current.pause()
        audioRef.current.currentTime = 0 // reset time
    }
  }, [play])

  return null // empty component
}