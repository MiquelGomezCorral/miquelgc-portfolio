import { TFunction } from "i18next";

export type localesType = 
    "en" | 
    "es"

export type langauges = {
    locale: localesType, 
    label: string, 
    iconSrc: string
}

export const getLanguages = (t: TFunction) => {
    const languages: langauges[] = [
        { locale: 'en', label: t('english'), iconSrc: 'uk' },
        { locale: 'es', label: t('spanish'), iconSrc: 'spain' },
    ];

    const fallbackLanguage = { locale: 'en', label: t('english'), iconSrc: 'uk' }

    return {fallbackLanguage, languages}
}