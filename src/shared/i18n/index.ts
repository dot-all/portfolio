import { es } from './locales/es';
import { en } from './locales/en';

export const languages = {
    es: 'Español',
    en: 'English',
};

export const defaultLang = 'es';


export const ui = {
    es,
    en,
} as const;

export type Translations = typeof es;

export function getLangFromUrl(url: URL) {
    const segments = url.pathname.split('/').filter(Boolean);
    if (segments[0] in ui) return segments[0] as keyof typeof ui;
    if (segments[1] in ui) return segments[1] as keyof typeof ui;

    return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
    return function t<K extends keyof Translations>(key: K): Translations[K] {
        return (ui[lang] as Translations)[key] ?? ui[defaultLang][key];
    };
}
