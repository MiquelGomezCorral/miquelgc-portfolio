"use client"

import Image from "next/image";
import Link from "next/link";
import cn from 'classnames';


export function showAlertCopy(text:string){
  return () => {
    navigator.clipboard.writeText(text).then(() => {
      alert(`'${text}' has been copied to clipboard!`);
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  };
}


// =================================================================
//                        ICONS GLOW
// =================================================================

// ================== ICONS BUTTONS ==================

interface IconButtonArrow {
  width: number, 
  height: number, 
  src: string, 
  title: string
  solid?: boolean,
  className?: string,
  onClick?: ()=>void,
}
export function IconButtonArrow({ width, height, src, title, solid, className, onClick}: IconButtonArrow){
  return(
    <button className={cn("", className)} onClick={onClick}>
      <div className={cn(`gap-2 text-xs flex items-center rounded-full p-2 transform duration-300`,
      )}>
        <Icon width={width} height={height} src={src} title={title}/>
      </div>
    </button>
  )
}

// ================== ICONS GLOING ==================

interface IconGlowingProps {
  width: number, 
  height: number, 
  src: string, 
  title: string
  text?: string;
  solid?: boolean
}
export function IconGlowing({ width, height, src, title, text, solid}: IconGlowingProps){
  return(
    <button className="relative">
      <div className="absolute rounded-full flex h-full w-full bg-miquel-blue-400/50 blur-md" />
      <div className={cn(`relative gap-2 text-xs flex items-center rounded-full p-2 transform duration-300`,
        {'px-4': text},
        {'border border-miquel-blue-400 bg-miquel-black-500 hover:bg-miquel-black-300': !solid},
        {'bg-miquel-blue-500 hover:bg-miquel-blue-400': solid},
      )}>
        <Image src={`/assets/icons/${src}.svg`} alt={src}
          width={width}
          height={height}
          title={title}
        />
        {text}
      </div>
    </button>
  )
}
// ================== ICONS LINK ==================

interface IconLinkGlowingProps {
  width: number, 
  height: number, 
  src: string, 
  title: string
  link: string,
  blank?: boolean
  text?: string,
  solid?: boolean,
}
export function IconLGlowingLink({ width, height, src, title, link, blank, text, solid}: IconLinkGlowingProps) {
  return (
    <Link 
      className="relative"
      href={link}
      target={blank ? "_blank": ""}
    >
      <IconGlowing
        width={width} height={height} src={src} title={title} text={text} solid={solid}
      />
    </Link>
  )
}
// export function IconLGlowinginkSolid({ width, height, src, title, link, blank, text}


// ================== ICONS COPY ==================
interface IconCopyGlowingProps {
  width: number, 
  height: number, 
  src: string, 
  title: string,
  copyText: string,
  text?: string,
  solid?: boolean
}
export function IconGlowingCopy({ width, height, src, title, copyText, text, solid}:IconCopyGlowingProps) {
  return (
    <nav className="relative flex" onClick={showAlertCopy(copyText)}>
      <IconGlowing
        width={width} height={height} src={src} title={title} text={text} solid={solid}
      />
    </nav>
  )
}

// =================================================================
//                        ICONS NO GLOW
// =================================================================
interface IconLinkProps {
  width: number, 
  height: number, 
  src: string, 
  link: string
  blank?: boolean
  title: string,
  text?: string,
  className?: string,
}
export function IconLink({ link, blank, width, height, src, title, text, className}: IconLinkProps) {
  return (
    <Link 
      className={cn("relative", className)}
      href={link}
      target={blank ? "_blank": ""}
    >
      <Icon width={width} height={height} src={src} title={title} text={text} />
    </Link>
  )
}

interface IconCopyProps {
  width: number, 
  height: number, 
  src: string, 
  title: string,
  copyText: string,
  text?: string,
  className?: string
}
export function IconCopy({width, height, src, title, copyText, text, className}: IconCopyProps) {
  return (
    <button 
      className="relative"
      onClick={showAlertCopy(copyText)}
    >
      <Icon width={width} height={height} src={src} title={title} text={text} className={className} />
    </button>
  )
}

interface IconProps {
  width: number, 
  height: number, 
  src: string, 
  title: string,
  text?: string,
  className?: string,
}
export function Icon({width, height, src, title, text, className}: IconProps){
  return (
    <div className={cn("gap-1 flex items-center rounded-full transform duration-300 opacity-70 hover:opacity-100", className)}>
      <Image src={`/assets/icons/${src}.svg`} alt={src}
        width={width}
        height={height}
        title={title}
      />
      {text}
    </div>
  )
}

