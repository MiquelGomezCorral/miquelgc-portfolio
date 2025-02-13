import Image from "next/image"

export function Technology({ src }: { src: string }) {
    const Title = (src: string) => {
      switch (src) {
        case "html": return "Html"
        case "react": return "React"
        case "typescript": return "TypeScript"
        case "next": return "Next.js"
        case "tailwind": return "Tailwind CSS"
        case "github": return "GitHub"
        case "css": return "CSS"
        case "java": return "Java"
        case "unity": return "Unity"
        case "python": return "Python"
        case "pygame": return "Pygame"
        case "c++": return "C ++"
        case "c-sharp": return "C Sharp"
      }
    }
  
    return (
      <section className="rounded-full bg-miquel-black-200 px-4 py-1 flex justify-center items-center gap-2 text-xs">
        <Image src={`/assets/icons/${src}.svg`} alt={src}
          width={20}
          height={20}
          title={Title(src)}
        />
        <p className="opacity-80 text-nowrap">{Title(src)}</p>
      </section>
    )
}

  
export type TechnologyStrig = (
    "html" | 
    "react" | 
    "typescript" | 
    "next" | 
    "tailwind" | 
    "github" | 
    "css" | 
    "java" | 
    "unity" | 
    "python" | 
    "pygame" | 
    "c++" | 
    "c-sharp" 
)