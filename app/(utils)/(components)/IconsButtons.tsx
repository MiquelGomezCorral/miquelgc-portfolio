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
  disable?: boolean,
  className?: string,
  color?: boolean
  onClick?: ()=>void,
}
export function IconButtonArrow({ width, height, src, title, disable, className, color, onClick}: IconButtonArrow){
  return(
    <button className={cn("", className)} onClick={onClick}>
      <div className={cn(`gap-2 text-xs flex items-center rounded-full p-2`,
      )}>
        <Icon width={width} height={height} src={src} title={title} disable={disable} color={color}/>
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
  color?: boolean
  hover?: boolean
}
export function IconGlowing({ width, height, src, title, text, solid, color, hover}: IconGlowingProps){
  return(
    <button className="relative">
      <div className="absolute rounded-full flex h-full w-full bg-miquel-blue-400/50 blur-md" />
      <div className={cn(`relative gap-2 text-xs flex items-center rounded-full p-2 transform duration-300`,
        {'px-4': text},
        {'border border-miquel-blue-400 bg-miquel-black-500 hover:bg-miquel-black-300': !solid},
        {'bg-miquel-blue-500 hover:bg-miquel-blue-400': solid},
      )}>
        <Icon src={src} width={width} height={height} title={title} color={color} hover={hover}/>
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
  color?: boolean
}
export function IconLGlowingLink({ width, height, src, title, link, blank, text, solid, color}: IconLinkGlowingProps) {
  return (
    <Link 
      className="relative"
      href={link}
      target={blank ? "_blank": ""}
    >
      <IconGlowing
        width={width} height={height} src={src} title={title} text={text} solid={solid} color={color} hover
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
  color?: boolean
}
export function IconGlowingCopy({ width, height, src, title, copyText, text, solid, color}:IconCopyGlowingProps) {
  return (
    <nav className="relative flex" onClick={showAlertCopy(copyText)}>
      <IconGlowing
        width={width} height={height} src={src} title={title} text={text} solid={solid} color={color} hover
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
  color?: boolean,
}
export function IconLink({ link, blank, width, height, src, title, text, color, className}: IconLinkProps) {
  return (
    <Link 
      className={cn("relative", className)}
      href={link}
      target={blank ? "_blank": ""}
    >
      <Icon width={width} height={height} src={src} title={title} text={text} color={color} hover/>
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
  className?: string,
  color?: boolean,
}
export function IconCopy({width, height, src, title, copyText, text, color, className}: IconCopyProps) {
  return (
    <button 
      className="relative"
      onClick={showAlertCopy(copyText)}
    >
      <Icon width={width} height={height} src={src} title={title} text={text} className={className} color={color} hover/>
    </button>
  )
}

interface IconProps {
  width?: number, 
  height?: number, 
  fill?: boolean, 
  src: string, 
  title: string,
  text?: string,
  disable?: boolean
  hover?: boolean
  color?: boolean
  className?: string,
}
export function Icon({width, height, fill, src, title, text, hover, disable, color, className}: IconProps){
  return (
    <figure className={
      cn("relative flex items-center justify-center rounded-full transform duration-300 gap-1", 
      className, 
      {"hover:opacity-100": !disable},
      {"opacity-70": hover},
    )}>
      {fill ? 
      <Image src={`/assets/icons/${color ? 'color' : 'white'}/${src}.svg`} alt={src}
        fill
        title={title}
      />
      :
      <Image src={`/assets/icons/${color ? 'color' : 'white'}/${src}.svg`} alt={src}
        width={width}
        height={height}
        title={title}
      />
      }
      {text}
    </figure>
  )
}

