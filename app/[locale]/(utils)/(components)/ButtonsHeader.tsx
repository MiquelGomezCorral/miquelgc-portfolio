"use client"

import { t } from "i18next"

import cn from "classnames"
import Link from "next/link"
import { useState, useEffect, useMemo } from "react"
import { createPortal } from 'react-dom'

import { Icon } from "@/app/[locale]/(utils)/(components)/Icons"
import { Button } from '@/app/[locale]/(utils)/(components)/Buttons';
import { usePageStackStore } from "@/app/[locale]/(global_state)/state"


interface HeaderButtonProps  {
  className?: string,
  children?: React.ReactNode,
  onClick?: () => void,
}
export function HeaderButton({className, onClick, ...props}: HeaderButtonProps) {
  return (
    <button className={
      cn(
        "text-miquel-white text-start text-nowrap opacity-70 hover:opacity-100 transform duration-300 flex items-center drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)]", 
        className
      )}
      onClick={onClick}
    >
      {props.children}
    </button>
  )
}

interface HeaderButtonIconProps extends HeaderButtonProps {
  icon: string,
  onClick?: () => void,
}
export function HeaderButtonIcon({icon, className, onClick, ...props}: HeaderButtonIconProps) {
  return (
    <HeaderButton {...props} className={cn("flex gap-2", className)} onClick={onClick}>
      <Icon
        src={icon} title={icon}
        type={"white"}
        glowing
        hover 
        width={20} height={20}  
      />
      {props.children}
    </HeaderButton>
  )
}


interface HeaderButtonLinkProps  {
  icon?: string,
  
  link: string,
  blank?: boolean,
  notAddToStack?: boolean,
  stayPage?: boolean,

  className?: string
  children?: React.ReactNode,
  onClick?: () => void,
}
export function ButtonLink({icon, link, blank, notAddToStack, stayPage, onClick, className, ...props }: HeaderButtonLinkProps){
  const { goToPageFrom, currentPage } = usePageStackStore()

  return (
    <Link 
      href={
        (stayPage && currentPage !== "") ? `${currentPage}/${link}` : link
      }
      target={blank ? "_blank": ""}
      className="group"
      onClick={() => {        
        console.log("link: " + link)
        console.log("currentPage: " + currentPage)
        if(!notAddToStack)
          if(
            ((currentPage === "/es" || currentPage === "/en" || currentPage === "/") && !link.startsWith("/#")) ||
            ( currentPage !== "/es" && currentPage !== "/en" && currentPage !== "/") 
          ){
            goToPageFrom(window.location.pathname, link)
          }
        if(onClick)
          onClick()
      }}
    >
      {icon ?
        <HeaderButtonIcon icon={icon} className={cn("",className)}>
          {props.children}
        </HeaderButtonIcon>
        :
        <HeaderButton className={cn("",className)}>
          {props.children}
        </HeaderButton>
      }
    </Link>
  )
}


interface HeaderButtonModalProps  {
  icon?: string,
  text?: string,

  className?: string
  children?: React.ReactNode,
}
export function ButtonModal({icon, text, className, ...props }: HeaderButtonModalProps){
  const [ showModal, setShowModal ] = useState(false)
  
  return(
    <>
      {icon ?
        <HeaderButtonIcon icon={icon} className={cn("",className)} onClick={() => setShowModal(true)}>
          {text}
        </HeaderButtonIcon>
        :
        <HeaderButton className={cn("",className)} onClick={() => setShowModal(true)}>
          {text}
        </HeaderButton>
      }
      {showModal &&
      <Modal onClose={() => setShowModal(false)}>
        <div className="flex flex-col items-center gap-2 justify-center flex-grow">
          {props.children}
        </div>
        <div className="flex justify-end w-full">
          <Button onClick={() => setShowModal(false)} className="max-w-min">{t("close")} Close</Button>
        </div>
      </Modal>
      }
    </>
  )
}

interface ModalProps {
  children: React.ReactNode
  onClose(): void
}

export function Modal({ children, onClose }: ModalProps) {
  const container = useMemo(() => document.createElement('div'), [])

  useEffect(() => {
    document.body.appendChild(container)
    return () => {
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