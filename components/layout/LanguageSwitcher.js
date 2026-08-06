'use client';

import { useTranslation } from '@/lib/i18n';

const LanguageSwitcher = () => {
  const { locale, changeLanguage } = useTranslation();

  return (
    <div className="flex items-center border border-ios-gray-200 dark:border-ios-gray-600 rounded-full overflow-hidden text-xs">
      {[
        { code: 'ko', label: 'KO' },
        { code: 'en', label: 'EN' },
      ].map((lang) => (
        <button
          key={lang.code}
          onClick={() => changeLanguage(lang.code)}
          className={`px-2.5 py-1 font-semibold transition-colors ${
            (locale || 'ko') === lang.code
              ? 'bg-ios-gray-900 text-white dark:bg-white dark:text-ios-gray-900'
              : 'text-ios-gray-500 hover:text-ios-gray-900 dark:hover:text-white'
          }`}
          aria-pressed={(locale || 'ko') === lang.code}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
