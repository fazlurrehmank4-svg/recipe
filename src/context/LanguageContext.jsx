import React, { createContext, useContext, useState, useEffect } from 'react';
import { LANGUAGES, TRANSLATIONS } from '../i18n/translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('app_language') || 'en';
  });

  const currentLangObj = LANGUAGES.find(l => l.code === lang) || LANGUAGES[0];
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  useEffect(() => {
    localStorage.setItem('app_language', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = currentLangObj.dir || 'ltr';
  }, [lang, currentLangObj]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, currentLangObj, LANGUAGES }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
