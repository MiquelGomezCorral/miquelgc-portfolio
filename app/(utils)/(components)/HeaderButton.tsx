"use client"

import Link from "next/link"
import { usePageStackStore } from "@/app/(global_state)/state"

export function HeaderButtonLink({link, blank, ...props }: {link: string, blank?: boolean, children: React.ReactNode }) {
  const { goToPageFrom } = usePageStackStore()

  return (
    <Link 
      href={link}
      target={blank ? "_blank": ""}
      className="group"
      onClick={() => goToPageFrom(window.location.pathname)}
      
    >
      <button className="text-miquel-white opacity-70 group-hover:opacity-100 transform duration-300">
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