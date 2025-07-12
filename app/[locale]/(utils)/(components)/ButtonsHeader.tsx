"use client"


import cn from "classnames"
import Link from "next/link"
import { useState } from "react"
import { useTranslation } from 'react-i18next';

import { Icon } from "@/app/[locale]/(utils)/(components)/Icons"
import { Button } from '@/app/[locale]/(utils)/(components)/Buttons';
import { Modal } from '@/app/[locale]/(utils)/(components)/Utils';
import { usePageStackStore } from "@/app/[locale]/(global_state)/state"


interface HeaderButtonProps  {
  className?: string,
  disabled?: boolean,
  children?: React.ReactNode,
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void,
}
export function HeaderButton({className, disabled, onClick, ...props}: HeaderButtonProps) {
  return (
    <button className={
      cn(
        "text-miquel-white text-start text-nowrap miquel-opacity flex items-center drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)]", 
        {"hover:opacity-70 cursor-not-allowed": disabled},
        className
      )}
      onClick={(e: any) => {
        e.preventDefault()
        if(!disabled && onClick) 
          onClick(e)
      }}
    >
      {props.children}
    </button>
  )
}



interface HeaderButtonIconProps extends HeaderButtonProps {
  icon: string,
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void,
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
export function ButtonHeaderModal({icon, text, className, ...props }: HeaderButtonModalProps){
  const [ showModal, setShowModal ] = useState(false)
  const {t} = useTranslation("general");
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
          <Button
            text={t("close")}
            onClick={() => setShowModal(false)} 
            className="max-w-min"
          />
        </div>
      </Modal>
      }
    </>
  )
}

