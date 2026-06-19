"use client"

import CardCarousel from '@/app/[locale]/(utils)/(components)/CardCarousel';
import { getStudies } from "@/app/[locale]/(utils)/(constants)/studies.text.d";

export default function StudiesSection() {
  return <CardCarousel namespace="studies" getData={getStudies} />
}
