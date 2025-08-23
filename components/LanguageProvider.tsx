'use client';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { DEFAULT_LANGUAGE, Language } from '../app/lib/language';

type Ctx = {
  language: Language;
  setLanguage: (l: Language) => void;
  ready: boolean;
};

const LanguageContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(DEFAULT_LANGUAGE);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const saved = (typeof window !== 'undefined') ? localStorage.getItem('sign.lang') : null;
    if (saved === 'asl' || saved === 'auslan') setLanguageState(saved);
    setReady(true);
  }, []);

  const setLanguage = (l: Language) => {
    setLanguageState(l);
    try { localStorage.setItem('sign.lang', l); } catch {}
  };

  const value = useMemo(() => ({ language, setLanguage, ready }), [language, ready]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export const useLanguage = () => {
  const v = useContext(LanguageContext);
  if (!v) throw new Error('useLanguage must be used within <LanguageProvider>');
  return v;
};
