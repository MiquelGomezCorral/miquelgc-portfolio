import Image from "next/image"
import { Icon } from "@/app/(utils)/(components)/IconsButtons"

export function Technology({ src }: { src: string }) {
    const Title = (src: string) => {
      switch (src) {
        case "html": return "Html"
        case "html-2": return "Html"
        case "react": return "React"
        case "react-2": return "React"
        case "typescript": return "TypeScript"
        case "next": return "Next.js"
        case "next-2": return "Next.js"
        case "node": return "Node.js"
        case "tailwind": return "Tailwind CSS"
        case "css": return "CSS"
        case "css-2": return "CSS"
        case "zustand": return "Zustand"

        case "c++": return "C ++"
        case "c-sharp": return "C Sharp"
        case "c": return "C"
        case "unity": return "Unity"
        case "java": return "Java"
        case "haskell": return "Haskell"
        case "mathematica": return "Mathematica"
        case "haskell": return "Haskell"
        case "prolog": return "Prolog"
        case "risc-v": return "Risc-V"
        case "sql": return "SQL"
        
        case "python": return "Python"
        case "python-2": return "Python"
        case "pygame": return "Pygame"
        case "fastapi": return "FastAPI"
        case "jupyter": return "Jupyter"
        case "matplot": return "Matplot"
        case "numpy": return "NumPy"
        case "pytorch": return "pytorch"
        case "sklearn": return "Sklearn"
        case "pandas": return "Pandas"
        case "plotly": return "Plotly"
        
        
        case "github": return "GitHub"
        case "ai": return "AI"
        case "photoshop": return "Photoshop"
        default: return "Missing Technology 🚫"
      }
    }
  
    return (
      <section className="rounded-full bg-miquel-black-200 px-4 py-1 flex justify-center items-center gap-2 text-xs">
        <Icon 
          src={src}
          width={20}
          height={20}
          title={Title(src)}
        />
        <p className="opacity-80 text-nowrap">{Title(src)}</p>
      </section>
    )
}

  
export type TechnologyString = (
  "html" | "html-2" |
  "react" | "react-2" |
  "typescript" |
  "next" | "next-2" |
  "node" |
  "tailwind" |
  "css" | "css-2" |
  "zustand" |
  "c++" | "c-sharp" | "c" |
  "unity" |
  "java" |
  "haskell" |
  "mathematica" |
  "prolog" |
  "risc-v" |
  "sql" |
  "python" | "python-2" |
  "pygame" |
  "fastapi" |
  "jupyter" |
  "matplot" |
  "numpy" |
  "pytorch" |
  "sklearn" |
  "pandas" |
  "plotly" |
  "github" |
  "ai" |
  "photoshop"
);
