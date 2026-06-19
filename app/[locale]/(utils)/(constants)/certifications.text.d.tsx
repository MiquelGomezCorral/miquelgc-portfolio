import { CardType } from "@/app/[locale]/(utils)/(components)/Card"
import type { TFunction } from "i18next";

export const getCertifications = (t: TFunction): CardType[] => {
  
  const HF: CardType = {
    title: t("master.title"), 
    company: "HuggingFace", 
    date: t("master.date"),
    place: "Online",
    description: t("master.description"), 
    technologies: ["python", "pytorch", "reinforcement-learning", 'ai', "numpy"], 
    logo: "certifications/HF-Face",
    link: "https://huggingface.co/learn/deep-rl-course/en/unit0/introduction",
    silly: "🤗"
  }


  return [
    HF,
  ]
}