"use client"

import CardCarousel from '@/app/[locale]/(utils)/(components)/CardCarousel';
import { getCertifications } from "@/app/[locale]/(utils)/(constants)/certifications.text.d";

export default function CertificationsSection() {
  return <CardCarousel namespace="certifications" getData={getCertifications} />
}
