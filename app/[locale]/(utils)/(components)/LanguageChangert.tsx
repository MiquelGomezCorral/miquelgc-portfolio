'use client';

import cn from "classnames"
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { Icon } from "./IconsButtons";
import { localesType, getLanguages } from '@/app/[locale]/(utils)/(constants)/languages.text.d';
import i18nConfig from '@/i18nConfig';

export default function LanguageChanger({movile}: {movile: boolean}) {
  const {t, i18n } = useTranslation("languages");
  
  const currentLocale = i18n.language;
  const router = useRouter();
  const currentPathname = usePathname();

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const {languages, fallbackLanguage} = getLanguages(t)
  
  const handleChange = (newLocale: localesType) => {
    if (newLocale === currentLocale) return;

    // set cookie for next-i18n-router
    const days = 30;
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = date.toUTCString();
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${expires};path=/`;

    // redirect to the new locale path
    if (currentLocale === i18nConfig.defaultLocale && !i18nConfig.prefixDefault) {
      router.push('/' + newLocale + currentPathname);
    } else {
      router.push(
        currentPathname.replace(`/${currentLocale}`, `/${newLocale}`)
      );
    }

    router.refresh();
    setOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentLang = languages.find(lang => lang.locale === currentLocale) || fallbackLanguage;

  return (
    <div ref={dropdownRef} className="relative inline-block ">
      <button
        onClick={() => setOpen(!open)}
        className={
          cn("flex items-center px-5 gap-2 opacity-70 hover:opacity-100 transform duration-300",
            {"px-0":movile}
      )}>
        <Icon 
          src={currentLang.iconSrc} 
          width={15} height={15} 
          type="country" title={currentLang.label} 
        />
        <span className="">{currentLang.label}</span>
      </button>
      {open && (
        <div className={
          cn("absolute mt-2 bg-miquel-background shadow-md z-10 w-full border border-b-2 border-b-miquel-white-200/50 border-t-0 rounded-md rounder-t rounded-t-none",
          {"bg-transparent -translate-x-5":movile}
        )}>
          {languages.map(lang => (
            <div
              key={lang.locale}
              onClick={() => handleChange(lang.locale)}
              className={
              cn("flex items-center cursor-pointer px-4 py-2 gap-2 hover:bg-miquel-black-100 w-full",
              {"hover:bg-miquel-black-100/40 opacity-70 hover:opacity-100":movile}
            )}>
              <Icon src={lang.iconSrc} 
                width={15} height={15} 
                type="country" title={lang.label} 
              />
              <span className="">{lang.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}