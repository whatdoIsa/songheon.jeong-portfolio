'use client';

import { useTranslation } from '@/lib/i18n';
import { AppIcon } from './CaseCard';

// 보조 프로젝트용 컴팩트 카드 (SEED · Rootrip)
export default function MiniCard({ cs }) {
  const { locale } = useTranslation();
  const L = locale === 'en' ? 'en' : 'ko';
  const pick = (v) => (v && typeof v === 'object' ? v[L] : v);

  return (
    <article className="bg-white dark:bg-ios-gray-800 border border-ios-gray-100 dark:border-ios-gray-700 rounded-2xl p-6 flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <AppIcon icon={cs.icon} size="w-10 h-10" rounded="rounded-lg" />
        <div>
          <h3 className="text-base font-extrabold tracking-tight">{cs.name}</h3>
          <p className="text-xs text-ios-gray-500 dark:text-ios-gray-400">
            {cs.period} · <b className="font-semibold">{pick(cs.role)}</b> · {cs.platform}
          </p>
        </div>
      </div>
      <p className="text-[13.5px] text-ios-gray-600 dark:text-ios-gray-300 flex-1">{pick(cs.oneLiner)}</p>
      <p className="text-[12.5px] text-ios-gray-400">{cs.stack.join(' · ')}</p>
      <p className="text-[13px] text-ios-gray-700 dark:text-ios-gray-200 border-t border-ios-gray-100 dark:border-ios-gray-700 pt-3">
        <b className="font-bold text-ios-gray-400 mr-2">{L === 'en' ? 'Result' : '성과'}</b>
        {pick(cs.result)}
      </p>
      <div className="flex flex-wrap gap-x-5 gap-y-1.5">
        {cs.links.github && (
          <a
            href={cs.links.github.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] font-semibold text-ios-gray-600 dark:text-ios-gray-300 underline underline-offset-4 decoration-ios-gray-300 hover:text-ios-gray-900 dark:hover:text-white"
          >
            GitHub
          </a>
        )}
        {cs.links.intro && (
          <a
            href={cs.links.intro.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] font-semibold text-ios-gray-600 dark:text-ios-gray-300 underline underline-offset-4 decoration-ios-gray-300 hover:text-ios-gray-900 dark:hover:text-white"
          >
            {pick(cs.links.intro.label)}
          </a>
        )}
      </div>
    </article>
  );
}
