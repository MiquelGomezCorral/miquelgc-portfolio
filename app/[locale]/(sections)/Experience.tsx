"use client"

import CardCarousel from '@/app/[locale]/(utils)/(components)/CardCarousel';
import { getExperiences } from "@/app/[locale]/(utils)/(constants)/experience.text.d";

export default function Experience() {
  return <CardCarousel namespace="experiences" getData={getExperiences} />
}
