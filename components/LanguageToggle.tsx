'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export function LanguageToggle() {
  const t = useTranslations('LanguageToggle');
  const router = useRouter();
  const [currentLocale, setCurrentLocale] = useState('en');

  useEffect(() => {
    // Get current locale from cookie
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(';').shift();
      return undefined;
    };
    
    const locale = getCookie('locale') || 'en';
    setCurrentLocale(locale);
  }, []);

  const setLocale = (locale: string) => {
    // Set cookie with locale
    document.cookie = `locale=${locale}; path=/; max-age=31536000`; // 1 year
    setCurrentLocale(locale);
    // Refresh the page to apply the new locale
    router.refresh();
  };

  return (
    <div className="flex items-center gap-1 p-1 bg-muted rounded-lg">
      <button
        onClick={() => setLocale('en')}
        className={`px-3 py-1.5 text-sm rounded-md transition-all duration-200 ${
          currentLocale === 'en'
            ? 'bg-background text-foreground shadow-sm border border-border'
            : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
        }`}
      >
        {t('english')}
      </button>
      <button
        onClick={() => setLocale('es')}
        className={`px-3 py-1.5 text-sm rounded-md transition-all duration-200 ${
          currentLocale === 'es'
            ? 'bg-background text-foreground shadow-sm border border-border'
            : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
        }`}
      >
        {t('spanish')}
      </button>
    </div>
  );
}
