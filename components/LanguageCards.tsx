'use client';

import Link from 'next/link';
import { useLanguage } from '@/components/LanguageProvider';

type Card = { lang: 'auslan' | 'asl'; title: string; subtitle: string; emoji: string };

const CARDS: Card[] = [
  { lang: 'auslan', title: 'Auslan', subtitle: 'Australian Sign Language', emoji: '🇦🇺' },
  { lang: 'asl',    title: 'ASL',    subtitle: 'American Sign Language',  emoji: '🇺🇸' },
];

export default function HomeLanguageCards() {
  const { setLanguage, language } = useLanguage();

  return (
    <section aria-labelledby="lang-heading" className="mt-8 sm:mt-10 lg:mt-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-3 sm:mb-4">
          <h2 id="lang-heading" className="text-lg sm:text-xl lg:text-2xl font-semibold">
            Choose your language
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-gray-600">
            Click a card to start prediction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {CARDS.map(({ lang, title, subtitle, emoji }) => {
            const active = language === lang;
            return (
              <Link
                key={lang}
                href={`/predict?lang=${lang}`}
                onClick={() => setLanguage(lang)}
                className={[
                  'group block h-full rounded-2xl border bg-white shadow-sm',
                  'hover:shadow-md hover:border-gray-300 transition',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-black/50',
                  active ? 'border-black/10' : 'border-gray-200',
                ].join(' ')}
              >
                <div className="p-4 sm:p-5 lg:p-6 min-h-[112px] sm:min-h-[128px] flex items-start gap-4 sm:gap-5">
                  <div className="shrink-0 h-10 w-10 sm:h-12 sm:w-12 rounded-xl grid place-items-center text-xl sm:text-2xl bg-white border border-gray-200 shadow-sm">
                    <span aria-hidden>{emoji}</span>
                    <span className="sr-only">{title} flag</span>
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-base sm:text-lg font-semibold">{title}</h3>
                    <p className="mt-0.5 text-xs sm:text-sm text-gray-600">{subtitle}</p>

                    <div className="mt-3 sm:mt-4 inline-flex items-center text-xs sm:text-sm text-gray-700">
                      Start now 👉
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
