import Image from "next/image";
import Link from "next/link";

interface ImageGlowingProps {
  width: number, 
  height: number, 
  src: string, 
  alt: string, 
  title: string
}
export function ImageGlowing({ width, height, src, alt, title}: ImageGlowingProps){
  return(
    <>
      <div className="absolute rounded-full h-full w-full bg-miquel-blue-400/50 blur-md" />
      <div className="relative rounded-full p-2 border border-miquel-blue-400 bg-miquel-black-500 hover:bg-miquel-black-300 transform duration-300">
        <Image src={src} alt={alt}
          width={width}
          height={height}
          title={title}
          />
      </div>
    </>
  )
}

interface IconLinkProps {
  width: number, 
  height: number, 
  src: string, 
  alt: string, 
  title: string
  link: string,
  blank?: boolean
}
export function IconLink({ width, height, src, alt, title, link, blank}: IconLinkProps) {
  return (
    <Link 
      className="relative flex justify-center items-center"
      href={link}
      target={blank ? "_blank": ""}
    >
      <ImageGlowing
        width={width} height={height} src={src} alt={alt} title={title}
      />
    </Link>
  )
}

interface IconCopyProps {
  width: number, 
  height: number, 
  src: string, 
  alt: string, 
  title: string
  copyText: string
}
export function IconCopy({ width, height, src, alt, title, copyText}:IconCopyProps) {
  const handleCopyClick = () => {
    navigator.clipboard.writeText(copyText).then(() => {
      alert('Email copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  };
  return (
    <nav className="relative flex justify-center items-center" onClick={handleCopyClick}>
      <ImageGlowing
        width={width} height={height} src={src} alt={alt} title={title}
      />
    </nav>
  )
}

