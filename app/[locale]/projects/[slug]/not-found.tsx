'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'

const texts = {
  en: { title: 'Project Not Found', link: '← Back to Projects' },
  es: { title: 'Proyecto no encontrado', link: '← Volver a Proyectos' },
}

export default function NotFound() {
  const params = useParams<{ locale: string }>()
  const t = texts[params?.locale === 'es' ? 'es' : 'en']

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-lg text-miquel-white-100">{t.title}</p>
      <Link href="/projects" className="text-miquel-blue-200 hover:underline">
        {t.link}
      </Link>
    </div>
  )
}
