import { CardType } from "@/app/[locale]/(utils)/(components)/Card"
import type { TFunction } from "i18next";

export const getCertifications = (t: TFunction): CardType[] => {
  
  const HF: CardType = {
    title: t("hf.title"), 
    company: t("hf.company"), 
    date: t("hf.date"),
    place: t("hf.place"),
    description: t("hf.description"), 
    technologies: ["python", "pytorch", "reinforcement-learning", 'ai', "numpy"], 
    logo: "certifications/HF-Face",
    link: "https://huggingface.co/learn/deep-rl-course/en/unit0/introduction",
    silly: "🤗"
  }
  const awards: CardType = {
    title: t("awards.title"), 
    company: t("awards.company"), 
    date: t("awards.date"),
    place: t("awards.place"),
    description: t("awards.description"), 
    technologies: [], 
    logo: "certifications/UPV",
    link: "https://huggingface.co/learn/deep-rl-course/en/unit0/introduction",
    silly: "0_o"
  }

  return [
    HF,
    awards
  ]
}
