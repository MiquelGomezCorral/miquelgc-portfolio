"use client"

import cn from "classnames"
import Link from "next/link"
import { usePageStackStore } from "@/app/[locale]/(global_state)/state"
import { Icon } from "@/app/[locale]/(utils)/(components)/Icons"
import { Button } from '@/app/[locale]/(utils)/(components)/Buttons';
import { t } from "i18next"


interface HeaderButtonProps  {
  className?: string,
  children?: React.ReactNode
}
export function HeaderButton({className, ...props}: HeaderButtonProps) {
  return (
    <button className={cn("w-full text-miquel-white text-start text-nowrap opacity-70 hover:opacity-100 transform duration-300 flex items-center drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)]", className)}>
      {props.children}
    </button>
  )
}

interface HeaderButtonIconProps extends HeaderButtonProps {
  icon: string,
}
export function HeaderButtonIcon({icon, className, ...props}: HeaderButtonIconProps) {
  return (
    <HeaderButton {...props} className={cn("flex gap-2", className)}>
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
  
  className?: string
  children?: React.ReactNode,
}
export function ButtonModal({icon, className, ...props }: HeaderButtonModalProps){

  return(
    <div className="z-30 absolute h-full w-full top-0 left-0 flex justify-center items-center bg-miquel-black-500-a/40 backdrop-blur-md">
      <div className={cn("z-30 h-32 w-32 absolute left-1/2 top-1/2 rounded-md")}>
        {icon ?
          <HeaderButtonIcon icon={icon} className={cn("",className)}>
            {props.children}
          </HeaderButtonIcon>
          :
          <HeaderButton className={cn("",className)}>
            {props.children}
          </HeaderButton>
        }
        <Button>{t("close")}</Button>
      </div>
    </div>
  )
}