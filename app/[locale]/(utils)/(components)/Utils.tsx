"use client"
import cn from 'classnames';
import { useTranslation } from 'react-i18next';

import { createPortal } from 'react-dom'
import { useEffect, useMemo } from "react"


export function DownloadCV({ className, ...props }: { className?: string, children: React.ReactNode}) {
  const { i18n } = useTranslation("header")
  const locale = i18n.language
  
  return (
    <a
      href={`assets/miquel/curriculum-${locale}-2025-03-01.pdf`}
      download={`assets/miquel/curriculum-${locale}-2025-03-01.pdf`}
      className={cn("", className)}
    >
      {props.children}
    </a>
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
    <div
      className="fixed inset-0 bg-miquel-black-500-a/40 backdrop-blur-md z-50 cursor-pointer flex items-center justify-center"
      onClick={e => {e.stopPropagation(); onClose()}}
    >
      <div 
        className="max-w-md bg-miquel-black-100-a/80 backdrop-blur-md rounded-xl flex flex-col justify-between p-6 gap-4 cursor-default"
        onClick={e => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    container
  )
}