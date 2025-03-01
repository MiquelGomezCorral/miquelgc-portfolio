"use client"
import cn from 'classnames';
import { useTranslation } from 'react-i18next';

export function DownloadCV({ className, ...props }: { className?: string, children: React.ReactNode}) {
  const { i18n } = useTranslation("header")
  const locale = i18n.language
  
  return (
    <a
      href={`assets/miquel/curriculum-${locale}-2025-03-01.pdf`}
      download={`assets/miquel/curriculum-${locale}-2025-03-01.pdf`}
      className={cn("", className)}
    >
      {props.children}
    </a>
  )
}