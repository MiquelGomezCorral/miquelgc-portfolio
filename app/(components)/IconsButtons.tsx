"use client"

import Image from "next/image";
import Link from "next/link";
import cn from 'classnames';


// =================================================================
//                        ICONS GLOW
// =================================================================

// ================== ICONS ==================

interface IconGlowingProps {
  width: number, 
  height: number, 
  src: string, 
  title: string
  text?: string;
}
export function IconGlowing({ width, height, src, title, text}: IconGlowingProps){
  return(
    <button className="relative">
      <div className="absolute rounded-full flex h-full w-full bg-miquel-blue-400/50 blur-md" />
      <div className={cn(`relative gap-2 text-xs flex items-center rounded-full p-2 border border-miquel-blue-400 bg-miquel-black-500 hover:bg-miquel-black-300 transform duration-300`,
        {'px-4': text}
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

interface IconGlowingProps {
  width: number, 
  height: number, 
  src: string, 
  title: string
  text?: string;
}
export function IconGlowingSolid({ width, height, src, title, text}: IconGlowingProps){
  return(
    <button className="relative">
      <div className="absolute rounded-full h-full w-full bg-miquel-blue-400/50 blur-md" />
      <div className={cn(`relative gap-2 text-xs flex items-center rounded-full p-2 bg-miquel-blue-500 hover:bg-miquel-blue-400  transform duration-300`,
        {'px-4': text}
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
}
export function IconLGlowingLink({ width, height, src, title, link, blank, text}: IconLinkGlowingProps) {
  return (
    <Link 
      className="relative"
      href={link}
      target={blank ? "_blank": ""}
    >
      <IconGlowing
        width={width} height={height} src={src} title={title} text={text}
      />
    </Link>
  )
}
export function IconLGlowinginkSolid({ width, height, src, title, link, blank, text}: IconLinkGlowingProps) {
  return (
    <Link 
      className="relative"
      href={link}
      target={blank ? "_blank": ""}
    >
      <IconGlowingSolid
        width={width} height={height} src={src} title={title} text={text}
      />
    </Link>
  )
}

// ================== ICONS COPY ==================
interface IconCopyGlowingProps {
  width: number, 
  height: number, 
  src: string, 
  title: string,
  copyText: string,
  text?: string,
}
export function IconGlowingCopy({ width, height, src, title, copyText, text}:IconCopyGlowingProps) {
  const handleCopyClick = () => {
    navigator.clipboard.writeText(copyText).then(() => {
      alert(`${copyText} copied to clipboard!`);
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  };
  return (
    <nav className="relative flex" onClick={handleCopyClick}>
      <IconGlowing
        width={width} height={height} src={src} title={title} text={text}
      />
    </nav>
  )
}
export function GlowingIconCopySolid({ width, height, src, title, copyText, text}:IconCopyGlowingProps) {
  const handleCopyClick = () => {
    navigator.clipboard.writeText(copyText).then(() => {
      alert(`${copyText} copied to clipboard!`);
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  };
  return (
    <nav className="relative flex" onClick={handleCopyClick}>
      <IconGlowingSolid
        width={width} height={height} src={src} title={title} text={text}
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
  blank: boolean
  title: string,
  text?: string,
}
export function IconLink({ link, blank, width, height, src, title, text}: IconLinkProps) {
  return (
    <Link 
      className="relative"
      href={link}
      target={blank ? "_blank": ""}
    >
      <IconText width={width} height={height} src={src} title={title} text={text} />
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
}
export function IconCopy({ width, height, src, title, copyText, text}: IconCopyProps) {
  const handleCopyClick = () => {
    navigator.clipboard.writeText(copyText).then(() => {
      alert(`${copyText} copied to clipboard!`);
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  };
  return (
    <button 
      className="relative"
      onClick={handleCopyClick}
    >
      <IconText width={width} height={height} src={src} title={title} text={text} />
    </button>
  )
}

interface IconTextProps {
  width: number, 
  height: number, 
  src: string, 
  title: string,
  text?: string,
  className?: string,
}
export function IconText({width, height, src, title, text, className}: IconTextProps){
  return (
    <div className={cn("gap-2 flex items-center rounded-full transform duration-300 opacity-70 hover:opacity-100", className)}>
      <Image src={`/assets/icons/${src}.svg`} alt={src}
        width={width}
        height={height}
        title={title}
      />
      {text}
    </div>
  )
}