"use client"
import { useEffect, useState } from "react";

export function WritingText({list}: {list: string[]}){
  const [quality, setQuality] = useState("Creativo")
  const [indexQuality, setIndexQuality] = useState(0)
  const [isWriting, setIsWriting] = useState(false)
  useEffect(() => {
    const deletingTime = 25
    const writingTime = 150
    if (isWriting) return
    const intervalDel = setInterval(() => {
      if (quality) {
        setQuality(prev => prev.slice(0, -1))
      } else {
        setIsWriting(true)
        const nextIndext = (indexQuality + 1) % list.length
        setIndexQuality(nextIndext)

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
  }, [quality, isWriting])
  return (
    <>{quality}</>
  )
}