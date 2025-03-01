"use client"

import Link from "next/link"
import cn from "classnames"
import { usePageStackStore } from "@/app/[locale]/(global_state)/state"

interface HeaderButtonProps  {
  link: string,
  blank?: boolean,
  notAddToStack?:boolean,
  stayPage?:boolean,
  className?: string
  children: React.ReactNode,
  onClick?: ()=>void 
}

export function HeaderButtonLink({link, blank, notAddToStack, stayPage, onClick, className, ...props }: HeaderButtonProps){
  const { goToPageFrom, currentPage } = usePageStackStore()

  return (
    <Link 
      href={
        (stayPage && currentPage !== "") ? `${currentPage}/${link}` : link
      }
      target={blank ? "_blank": ""}
      className="group"
      onClick={() => {        
        if(!notAddToStack)
          goToPageFrom(window.location.pathname, link)
        if(onClick)
          onClick()
      }}
    >
      <button className={cn("text-miquel-white opacity-70 group-hover:opacity-100 transform duration-300 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)]", className)}>
        {props.children}
      </button>
    </Link>
  )
}
export function HeaderButton({...props }: {children: React.ReactNode }) {
  return (
    <button className="w-full text-start text-miquel-white opacity-70 hover:opacity-100 transform duration-300">
      {props.children}
    </button>
  )
}