import cn from "classnames"
import { Icon } from "@/app/[locale]/(utils)/(components)/Icons"
import type { TFunction } from "i18next";

export type TechCategoryKey = "languages" | "tools" | "data" | "ai" | "others"

export function getTechTitle(src: string) {
  switch (src) {
    case "html": case "html-2": return "Html"
    case "react": case "react-2": return "React"
    case "typescript": return "TypeScript"
    case "next": case "next-2": return "Next.js"
    case "node": return "Node.js"
    case "tailwind": return "Tailwind CSS"
    case "css": case "css-2": return "CSS"
    case "zustand": return "Zustand"
    case "c++": return "C ++"
    case "c-sharp": return "C Sharp"
    case "c": return "C"
    case "unity": return "Unity"
    case "java": case "java-fx": return "Java"
    case "docker": return "Docker"
    case "haskell": return "Haskell"
    case "mathematica": return "Mathematica"
    case "prolog": return "Prolog"
    case "risc-v": return "Risc-V"
    case "sql": return "SQL"
    case "python": case "python-2": return "Python"
    case "pygame": return "Pygame"
    case "fastapi": return "FastAPI"
    case "jupyter": return "Jupyter"
    case "matplot": return "Matplot"
    case "numpy": return "NumPy"
    case "pytorch": return "PyTorch"
    case "reinforcement-learning": return "Reinforcement Learning"
    case "sklearn": return "Sklearn"
    case "xg-boost": return "XG Boost"
    case "pandas": return "Pandas"
    case "plotly": return "Plotly"
    case "github": return "GitHub"
    case "git": return "Git"
    case "ai": return "AI"
    case "photoshop": return "Photoshop"
    case "premiere": return "Premiere"
    case "javascript": return "JavaScript"
    case "linux": return "Linux"
    case "huggingface": return "HuggingFace"
    case "langchain": return "LangChain"
    case "opencv": return "OpenCV"
    case "rag": return "RAG"
    case "vercel-ai": return "Vercel AI SDK"
    case "prompt-engineering": return "Prompt Engineering"
    case "braintrust": return "Braintrust"
    case "agents": return "Agents"
    case "latex": return "LaTeX"
    case "mcp": return "MCP"
    default: return "Missing Technology 🚫"
  }
}

export function Technology({ src, category }: { src: string, category?: TechCategoryKey }) {
  return (
    <section className={cn(
      "rounded-full px-4 py-1 flex justify-center items-center gap-2 text-xs h-min",
      category ? techCategoryStyle[category] : "bg-miquel-black-300"
    )}>
      <Icon 
        src={src}
        width={20}
        height={20}
        title={getTechTitle(src)}
        type="tech-white"
      />
      <p className="opacity-80 text-nowrap">{getTechTitle(src)}</p>
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
  "docker" |
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
  "git" |
  "ai" |
  "photoshop" |
  "premiere" |
  "reinforcement-learning" |
  "javascript" |
  "linux" |
  "huggingface" |
  "langchain" |
  "opencv" |
  "rag" |
  "vercel-ai" |
  "prompt-engineering" |
  "braintrust" |
  "agents" |
  "mcp" |
  "latex"
);


export type TechnologyCathegoryType = {
  key: TechCategoryKey,
  title: string,
  techs: TechnologyString[],
}

export function getTechnologyCathegories(t: TFunction): TechnologyCathegoryType[]{
  return [
  {
    key: "ai",
    title: t("ai.title"), 
    techs: ["python", "numpy", "sklearn", "pytorch", "xg-boost", "reinforcement-learning", "huggingface", "langchain", "opencv", "rag", "vercel-ai", "prompt-engineering", "braintrust", "ai", "agents", "mcp"],
  },
  {
    key: "data",
    title: t("data.title"), 
    techs: ["python", "numpy", "pandas", "matplot", "plotly", "sklearn", "fastapi", "sql"],
  },
  {
    key: "languages",
    title: t("languages.title"), 
    techs: ["python", "typescript", "javascript", "java", "c", "c++", "c-sharp", "sql", "react", "css", "html"],
  },
  {
    key: "tools",
    title: t("tools.title"), 
    techs: ["react", "css", "html", "tailwind", "zustand", "next", "node", "docker", "github", "linux", "jupyter"],
  },
  {
    key: "others",
    title: t("others.title"),
    techs: ["haskell", "prolog", "risc-v", "unity", "pygame", "java-fx", "photoshop", "premiere", "mathematica", "latex"],
  }
]
}

export const techCategoryStyle: Record<TechCategoryKey, string> = {
  ai:        "bg-miquel-amber-900 border border-miquel-amber-700",
  data:      "bg-miquel-green-900 border border-miquel-green-700",
  languages: "bg-miquel-blue-900 border border-miquel-blue-700",
  tools:     "bg-miquel-purple-900 border border-miquel-purple-700",
  others:    "bg-miquel-black-150 border border-miquel-black-200",
}

export type TechIndexItem = { src: TechnologyString, primary: TechCategoryKey, cats: TechCategoryKey[] }

export function getTechIndex(t: TFunction): TechIndexItem[] {
  const map = new Map<string, TechIndexItem>()
  for (const c of getTechnologyCathegories(t))
    for (const src of c.techs) {
      const title = getTechTitle(src)
      const ex = map.get(title)
      if (ex) { if (!ex.cats.includes(c.key)) ex.cats.push(c.key) }
      else map.set(title, { src, primary: c.key, cats: [c.key] })
    }
  return [...map.values()]
}