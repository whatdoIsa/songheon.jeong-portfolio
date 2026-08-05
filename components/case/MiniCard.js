'use client';

import { motion } from 'framer-motion';
import { useTranslation } from '@/lib/i18n';

// 보조 프로젝트용 컴팩트 카드 (Rootrip · DisplayCut)
export default function MiniCard({ cs }) {
  const { locale } = useTranslation();
  const L = locale === 'en' ? 'en' : 'ko';
  const pick = (v) => (v && typeof v === 'object' ? v[L] : v);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-ios-gray-800 border border-ios-gray-100 dark:border-ios-gray-700 rounded-2xl p-6 flex flex-col gap-3"
    >
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-lg grid place-items-center text-base font-extrabold shrink-0"
          style={{ background: cs.icon.bg, color: cs.icon.color }}
          aria-hidden="true"
        >
          {cs.icon.text}
        </div>
        <div>
          <h3 className="text-base font-extrabold tracking-tight">{cs.name}</h3>
          <p className="text-xs text-ios-gray-500 dark:text-ios-gray-400">
            {cs.period} · <b className="font-semibold">{pick(cs.role)}</b> · {cs.platform}
          </p>
        </div>
      </div>
      <p className="text-[13.5px] text-ios-gray-600 dark:text-ios-gray-300 flex-1">{pick(cs.oneLiner)}</p>
      <div className="flex flex-wrap gap-1.5">
        {cs.stack.map((s) => (
          <span
            key={s}
            className="text-xs text-ios-gray-600 dark:text-ios-gray-300 bg-ios-gray-50 dark:bg-ios-gray-700 border border-ios-gray-100 dark:border-ios-gray-600 rounded-full px-3 py-1"
          >
            {s}
          </span>
        ))}
      </div>
      <div className="text-[12.5px] font-bold text-ios-green bg-ios-green/10 rounded-lg px-3 py-2">
        {pick(cs.result)}
      </div>
      <div className="flex flex-wrap gap-2">
        {cs.links.github && (
          <a href={cs.links.github.url} target="_blank" rel="noopener noreferrer" className="text-[12px] font-bold text-ios-gray-600 dark:text-ios-gray-300 border border-ios-gray-200 dark:border-ios-gray-600 rounded-lg px-3 py-1.5">
            GitHub ↗
          </a>
        )}
        {cs.links.intro && (
          <a href={cs.links.intro.url} target="_blank" rel="noopener noreferrer" className="text-[12px] font-bold text-ios-gray-600 dark:text-ios-gray-300 border border-ios-gray-200 dark:border-ios-gray-600 rounded-lg px-3 py-1.5">
            {pick(cs.links.intro.label)} ↗
          </a>
        )}
      </div>
    </motion.article>
  );
}
