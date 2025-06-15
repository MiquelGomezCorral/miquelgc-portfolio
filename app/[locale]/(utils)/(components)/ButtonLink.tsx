"use client"

import cn from "classnames"
import Link from "next/link"
import { usePageStackStore } from "@/app/[locale]/(global_state)/state"
import { Icon } from "@/app/[locale]/(utils)/(components)/IconsButtons"


interface HeaderButtonProps  {
  className?: string,
  children?: React.ReactNode
}
export function HeaderButton({className, ...props}: HeaderButtonProps) {
  return (
    <button className={cn("w-full text-miquel-white text-start text-nowrap opacity-70 hover:opacity-100 transform duration-300  drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)]", className)}>
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
