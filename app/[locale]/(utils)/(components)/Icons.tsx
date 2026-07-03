"use client"

import Image from "next/image";
import Link from "next/link";
import cn from 'classnames';
import GlowingText from "./GlowingText";

import { usePageStackStore } from "@/app/[locale]/(global_state)/state";
import {ShowAlertCopy} from "@/app/[locale]/(utils)/(functions)/functionUtils"


// =================================================================
//                        ICONS GLOW
// =================================================================

// ================== ICONS BUTTONS ==================

interface IconButtonArrow extends IconProps{
  disable?: boolean,
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void,
}
export function IconButtonArrow({ type, onClick, className, ...props}: IconButtonArrow){
  return(
    <button className={cn("", className)} onClick={onClick}>
      <div className={cn(`gap-2 text-xs flex items-center rounded-full p-2`,
      )}>
        <Icon {...props} type={type}/>
      </div>
    </button>
  )
}

// ================== ICONS GLOING ==================

interface IconGlowingProps extends IconProps{
  solid?: boolean
}
export function IconGlowingButton({ solid, ...props}: IconGlowingProps){
  return(
    <button className="relative">
      <div className="absolute rounded-full flex h-full w-full bg-miquel-blue-400/50 blur-md" />
      <div className={cn(`relative gap-2 text-xs flex items-center rounded-full p-2 transform duration-300 active:scale-95 active:duration-75`,
        {'px-4': props.text},
        {'border border-miquel-blue-400 bg-miquel-black-500 hover:bg-miquel-black-300 group-hover:bg-miquel-black-300 active:bg-miquel-black-700': !solid},
        {'bg-miquel-blue-400 hover:bg-miquel-blue-500 group-hover:bg-miquel-blue-500 active:bg-miquel-blue-700': solid},
      )}>
        <Icon {...props}/>
      </div>
    </button>
  )
}
// ================== ICONS LINK ==================

interface IconLinkGlowingProps extends IconProps{
  link: string,
  blank?: boolean
  solid?: boolean
}
export function IconGlowingLink({ link, blank, text, solid, ...props}: IconLinkGlowingProps) {
  return (
    <Link 
      className="relative group"
      href={link}
      target={blank ? "_blank": ""}
    >
      <IconGlowingButton
        {...props} text={text} solid={solid} hover
      />
    </Link>
  )
}
// export function IconLGlowinginkSolid({ width, height, src, title, link, blank, text}


// ================== ICONS COPY ==================
interface IconCopyGlowingProps extends IconProps{
  copyText: string,
  solid?: boolean
}
export function IconGlowingCopy({ solid, copyText, ...props}:IconCopyGlowingProps) {
  return (
    <nav className="relative flex" onClick={ShowAlertCopy(copyText)}>
      <IconGlowingButton
        {...props} solid={solid} hover
      />
    </nav>
  )
}

// =================================================================
//                        ICONS NO GLOW
// =================================================================
interface IconLinkProps extends IconProps{
  link: string
  blank?: boolean
  stayPage?: boolean
  notAddToStack?: boolean
  onClick?: () => void
}
export function IconLink({ link, blank, notAddToStack, stayPage, onClick, className, ...props}: IconLinkProps) {
  const { goToPageFrom, currentPage } = usePageStackStore()
  
  return (
    <Link 
      href={
        (stayPage && currentPage !== "") ? `${currentPage}/${link}` : link
      }
      target={blank ? "_blank": ""}
      className={cn("relative group", className)}
      onClick={() => {
        if(!notAddToStack)
          goToPageFrom(window.location.pathname, link)
        if(onClick)
          onClick()
      }}
    >
      <Icon {...props} hover/>
    </Link>
  )
}

interface IconCopyProps extends IconProps{
  copyText: string,
}
export function IconCopy({ copyText, ...props}: IconCopyProps) {
  return (
    <button 
      className="relative group"
      onClick={ShowAlertCopy(copyText)}
    >
      <Icon {...props} hover/>
    </button>
  )
}

export interface IconProps {
  width?: number, 
  height?: number, 
  src: string, 
  title?: string,
  text?: string,
  disable?: boolean
  hover?: boolean
  type?: "white" | "color" | "country" | "tech-white"
  glowing?: boolean
  className?: string,
}
export function Icon({width, height, src, title, text, hover, disable, type = "white", glowing, className}: IconProps){
  return (
    <figure className={
      cn("relative flex items-center justify-center rounded-full transform duration-300 gap-2 active:duration-75 active:scale-95", 
      className, 
      {"hover:opacity-100 group-hover:opacity-100": !disable},
      {"opacity-70": hover},
    )}>
      {glowing ? 
      <GlowingText>
        <Image src={`/assets/icons/${type}/${src}.svg`} alt={src}
          width={width}
          height={height}
          title={title}
        />
      </GlowingText>
      :
      <Image src={`/assets/icons/${type}/${src}.svg`} alt={src}
        width={width}
        height={height}
        title={title}
      />
      }
      {text}
    </figure>
  )
}

