"use client"

import Image from "next/image";
import Link from "next/link";
import cn from 'classnames';
import GlowingText from "./GlowingText";


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

interface IconButtonArrow extends IconProps{
  disable?: boolean,
  onClick?: ()=>void,
}
export function IconButtonArrow({ color, onClick, className, ...props}: IconButtonArrow){
  return(
    <button className={cn("", className)} onClick={onClick}>
      <div className={cn(`gap-2 text-xs flex items-center rounded-full p-2`,
      )}>
        <Icon {...props} color={color}/>
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
      <div className={cn(`relative gap-2 text-xs flex items-center rounded-full p-2 transform duration-300`,
        {'px-4': props.text},
        {'border border-miquel-blue-400 bg-miquel-black-500 hover:bg-miquel-black-300': !solid},
        {'bg-miquel-blue-500 hover:bg-miquel-blue-400': solid},
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
export function IconLGlowingLink({ link, blank, text, solid, ...props}: IconLinkGlowingProps) {
  return (
    <Link 
      className="relative"
      href={link}
      target={blank ? "_blank": ""}
    >
      <IconGlowingButton
        {...props} hover
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
    <nav className="relative flex" onClick={showAlertCopy(copyText)}>
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
}
export function IconLink({ link, blank, className, ...props}: IconLinkProps) {
  return (
    <Link 
      className={cn("relative", className)}
      href={link}
      target={blank ? "_blank": ""}
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
      className="relative"
      onClick={showAlertCopy(copyText)}
    >
      <Icon {...props} hover/>
    </button>
  )
}

interface IconProps {
  width?: number, 
  height?: number, 
  src: string, 
  title: string,
  text?: string,
  disable?: boolean
  hover?: boolean
  color?: boolean
  glowing?: boolean
  className?: string,
}
export function Icon({width, height, src, title, text, hover, disable, color, glowing, className}: IconProps){
  return (
    <figure className={
      cn("relative flex items-center justify-center rounded-full transform duration-300 gap-2", 
      className, 
      {"hover:opacity-100": !disable},
      {"opacity-70": hover},
    )}>
      {glowing ? 
      <GlowingText>
        <Image src={`/assets/icons/${color ? 'color' : 'white'}/${src}.svg`} alt={src}
          width={width}
          height={height}
          title={title}
        />
      </GlowingText>
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

