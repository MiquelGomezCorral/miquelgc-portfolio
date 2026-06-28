"use client"
import cn from 'classnames';
import { useTranslation } from 'react-i18next';

import { createPortal } from 'react-dom'
import { useEffect, useMemo } from "react"
import { AnimatePresence, motion } from "framer-motion"


export function DownloadCV({ className, ...props }: { className?: string, children: React.ReactNode}) {
  const { i18n } = useTranslation("header")
  const locale = i18n.language

  const handleClick = () => {
    const a = document.createElement('a')
    //a.href = `/assets/miquel/cv_${locale}-2026-06-15.pdf`
    a.href = `https://raw.githubusercontent.com/MiquelGomezCorral/Curriculum/main/cv_${locale}.pdf`
    a.download = ''
    a.click()
  }

  return (
    <div onClick={handleClick} className={cn("", className)}>
      {props.children}
    </div>
  )
}




interface ModalProps {
  children: React.ReactNode
  onClose(): void
}

export function Modal({ children, onClose }: ModalProps) {
  const container = useMemo(() => document.createElement('div'), [])

  useEffect(() => {
    document.body.style.overflow = 'hidden' // disable scroll
    document.body.appendChild(container)
    return () => {
      document.body.style.overflow = '' // re-enable scroll
      document.body.removeChild(container)
    }
  }, [container])


  return createPortal(
    <AnimatePresence>
      <motion.div
        key="backdrop"
        className="fixed inset-0 bg-miquel-black-500-a/40 backdrop-blur-md z-50 cursor-pointer flex items-center justify-center"
        onClick={e => {e.stopPropagation(); onClose()}}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15, ease: "easeOut" }}
      >
        <motion.div
          className="max-w-xl bg-miquel-black-100-a/80 backdrop-blur-md rounded-xl flex flex-col justify-between p-6 gap-4 cursor-default"
          onClick={e => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    container
  )
}