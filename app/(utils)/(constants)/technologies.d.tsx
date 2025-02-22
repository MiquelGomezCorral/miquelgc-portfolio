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
        case "java-fx": return "Java"
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
        case "xg-boost": return "XG Boost"
        case "pandas": return "Pandas"
        case "plotly": return "Plotly"
        
        
        case "github": return "GitHub"
        case "ai": return "AI"
        case "photoshop": return "Photoshop"
        default: return "Missing Technology 🚫"
      }
    }
  
    return (
      <section className="rounded-full bg-miquel-black-200 px-4 py-1 flex justify-center items-center gap-2 text-xs h-min">
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
  "java" | "java-fx" |
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
  "xg-boost" |
  "pandas" |
  "plotly" |
  "github" |
  "ai" |
  "photoshop"
);


export type TechnologyCathegoryType = {
  title: string,
  description: string,
  techStars45: TechnologyString[],
  techStars34: TechnologyString[],
  startsUp: number,
  startsDown: number,
}

export const TechnologyCathegories: TechnologyCathegoryType[] = [
  {
    title: "Lenguajes de Programación", 
    description: "Lenguajes para desarrollo web, móvil y sistemas, abarcando paradigmas altos y funcionales",
    techStars45: ["python", "typescript", "react", "css", "java"], 
    techStars34: ["c", "c++", "c-sharp", "risc-v", "haskell", "prolog"],
    startsUp: 5,
    startsDown: 3,
  },
  {
    title: "Entornos y Herramientas de Desarrollo", 
    description: "Herramientas modernas para desarrollo ágil, diseño e implementación, de Tailwind a Node.",
    techStars45: ["tailwind", "pygame", "zustand", "node", "jupyter"], 
    techStars34: ["unity", "java-fx"],
    startsUp: 5,
    startsDown: 3,
  },
  {
    title: "Análisis y Tratamiento de Datos", 
    description: "Soluciones para manipular, analizar y visualizar datos con Python y frameworks backend.",
    techStars45: ["pandas", "sklearn", "matplot", "plotly", "numpy"], 
    techStars34: ["sql", "fastapi", "mathematica"],
    startsUp: 5,
    startsDown: 3,
  },
  {
    title: "Inteligencia Artificial y Modelos", 
    description: "Frameworks para construir y entrenar modelos de IA, de ML tradicional a deep learning.",
    techStars45: ["sklearn", "numpy"], 
    techStars34: ["pytorch", "xg-boost"],
    startsUp: 5,
    startsDown: 4,
  }
]