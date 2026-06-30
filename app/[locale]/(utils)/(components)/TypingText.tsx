"use client"
import { useEffect, useRef, useState } from "react";

export function WritingText({list}: {list: string[]}){
  const [quality, setQuality] = useState("Creativo")
  const [isWriting, setIsWriting] = useState(false)
  const indexQualityRef = useRef(0)
  useEffect(() => {
    const deletingTime = 25
    const writingTime = 150
    if (isWriting) return
    const intervalDel = setInterval(() => {
      if (quality) {
        setQuality(prev => prev.slice(0, -1))
      } else {
        setIsWriting(true)
        const nextIndext = (indexQualityRef.current + 1) % list.length
        indexQualityRef.current = nextIndext

        let i = 0
        const intervalWrite = setInterval(() => {
          if (i < list[nextIndext].length - 1) {
            setQuality(prev => prev + list[nextIndext][i])
            i++
          } else {
            clearInterval(intervalWrite)
            setTimeout(() => setIsWriting(false), 750);
          }
        }, writingTime)
      }
    }, deletingTime)
    return () => clearInterval(intervalDel)
  }, [quality, isWriting, list])
  return (
    <>{quality}</>
  )
}