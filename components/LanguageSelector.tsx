'use client';
import { useLanguage } from './LanguageProvider';
import { LANGUAGE_LABEL, Language } from '../app/lib/language';
import { useId } from 'react';

type Props = {
  variant?: 'primary' | 'compact';
  onChange?: (l: Language) => void;
  className?: string;
};

export default function LanguageSelector({ variant='primary', onChange, className }: Props) {
  const { language, setLanguage } = useLanguage();
  const name = useId();

  const choose = (l: Language) => {
    setLanguage(l);
    onChange?.(l);
  };

  if (variant === 'compact') {
    return (
      <div className={className}>
        <label htmlFor={name} className="sr-only">Language</label>
        <div role="tablist" aria-label="Language" className="inline-flex rounded-xl overflow-hidden border">
          {(['auslan','asl'] as Language[]).map(l => (
            <button
              key={l}
              role="tab"
              aria-selected={language === l}
              onClick={() => choose(l)}
              className={`px-3 py-1 text-sm ${language===l?'bg-black text-white':'bg-white'}`}
            >
              {l==='auslan' ? '🇦🇺 ' : '🇺🇸 '}{LANGUAGE_LABEL[l]}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // primary = big cards (for Home)
  return (
    <div className={`grid grid-cols-2 gap-4 ${className ?? ''}`}>
      {(['auslan','asl'] as Language[]).map(l => (
        <button
          key={l}
          onClick={() => choose(l)}
          className={`p-6 rounded-2xl border text-left hover:shadow transition
                      ${l==='auslan'?'':''} ${/* you can style differently */''}
                      ${/* show selection if needed */''}`}
          aria-pressed={language === l}
        >
          <div className="text-3xl mb-2">{l==='auslan' ? '🇦🇺' : '🇺🇸'}</div>
          <div className="text-xl font-semibold">{LANGUAGE_LABEL[l]}</div>
          <p className="text-sm text-gray-600 mt-1">
            {l==='auslan' ? 'Australian Sign Language' : 'American Sign Language'}
          </p>
        </button>
      ))}
    </div>
  );
}
