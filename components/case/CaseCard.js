'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTranslation } from '@/lib/i18n';
import { withBase } from '@/lib/basePath';

// 시안 C의 케이스 스터디 카드: P-A-R 요약 + 트러블슈팅 딥다이브(펼치기) + 상세 페이지 링크
export default function CaseCard({ cs }) {
  const { locale } = useTranslation();
  const L = locale === 'en' ? 'en' : 'ko';
  const pick = (v) => (v && typeof v === 'object' ? v[L] : v);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-ios-gray-800 border border-ios-gray-100 dark:border-ios-gray-700 rounded-2xl p-6 sm:p-8 mb-5"
    >
      {/* 헤더 */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div
            className="w-12 h-12 rounded-xl grid place-items-center text-lg font-extrabold shrink-0"
            style={{ background: cs.icon.bg, color: cs.icon.color }}
            aria-hidden="true"
          >
            {cs.icon.text}
          </div>
          <div>
            <h3 className="text-lg font-extrabold tracking-tight">
              {L === 'en' && cs.nameEn ? cs.nameEn : cs.name}
            </h3>
            <p className="text-xs text-ios-gray-500 dark:text-ios-gray-400">
              {cs.period} · <b className="font-semibold text-ios-gray-600 dark:text-ios-gray-300">{pick(cs.role)}</b> · {cs.platform}
            </p>
          </div>
        </div>
        <div className="flex gap-1.5 flex-wrap">
          <span className="text-[11px] font-bold text-ios-green bg-ios-green/10 rounded-lg px-2.5 py-1">
            {pick(cs.status)}
          </span>
          {cs.badge && (
            <span className="text-[11px] font-bold text-ios-blue bg-ios-blue/10 rounded-lg px-2.5 py-1">
              {pick(cs.badge)}
            </span>
          )}
        </div>
      </div>

      {/* 한 줄 소개 + 스택 */}
      <p className="mt-4 text-[14.5px] text-ios-gray-600 dark:text-ios-gray-300">{pick(cs.oneLiner)}</p>
      <div className="flex flex-wrap gap-1.5 mt-3.5">
        {cs.stack.map((s) => (
          <span
            key={s}
            className="text-xs text-ios-gray-600 dark:text-ios-gray-300 bg-ios-gray-50 dark:bg-ios-gray-700 border border-ios-gray-100 dark:border-ios-gray-600 rounded-full px-3 py-1"
          >
            {s}
          </span>
        ))}
      </div>

      {/* 스크린샷 */}
      {cs.shots.length > 0 && (
        <div className="grid grid-cols-3 gap-2.5 mt-5">
          {cs.shots.map((shot) => (
            <figure key={shot.src} className="rounded-lg overflow-hidden border border-ios-gray-100 dark:border-ios-gray-700">
              <img src={withBase(shot.src)} alt={pick(shot.caption)} className="w-full block" loading="lazy" />
              <figcaption className="hidden sm:block text-[11px] text-ios-gray-500 dark:text-ios-gray-400 px-2.5 py-1.5 bg-ios-gray-50 dark:bg-ios-gray-700 border-t border-ios-gray-100 dark:border-ios-gray-600">
                {pick(shot.caption)}
              </figcaption>
            </figure>
          ))}
        </div>
      )}

      {/* P-A-R */}
      <dl className="mt-5 space-y-2.5 text-sm">
        <ParRow label="PROBLEM" labelClass="text-ios-red">{pick(cs.problem)}</ParRow>
        {pick(cs.actions).length > 0 && (
          <ParRow label="ACTION" labelClass="text-ios-blue">
            <ul className="space-y-1.5">
              {pick(cs.actions).map((a, i) => (
                <li key={i} className="relative pl-3.5 before:content-[''] before:absolute before:left-0 before:top-[9px] before:w-[5px] before:h-[5px] before:rounded-full before:bg-ios-blue/50">
                  {a}
                </li>
              ))}
            </ul>
          </ParRow>
        )}
        <ParRow label="RESULT" labelClass="text-ios-green">{pick(cs.result)}</ParRow>
      </dl>

      {/* 트러블슈팅 딥다이브 */}
      {cs.troubleshooting.length > 0 && (
        <div className="mt-4 space-y-2.5">
          {cs.troubleshooting.map((ts, i) => (
            <details key={i} className="group border border-ios-gray-100 dark:border-ios-gray-700 rounded-xl overflow-hidden">
              <summary className="cursor-pointer list-none flex items-center justify-between gap-3 px-4 py-3 text-[13px] font-bold bg-ios-gray-50 dark:bg-ios-gray-700/60">
                <span>
                  {L === 'en' ? 'Troubleshooting deep-dive — ' : '트러블슈팅 딥다이브 — '}
                  {pick(ts.title)}
                </span>
                <span className="text-[11.5px] font-bold text-ios-blue shrink-0 group-open:hidden">{L === 'en' ? 'Expand +' : '펼치기 +'}</span>
                <span className="text-[11.5px] font-bold text-ios-blue shrink-0 hidden group-open:inline">{L === 'en' ? 'Collapse −' : '접기 −'}</span>
              </summary>
              <div className="px-4 py-3.5 text-[13px] text-ios-gray-600 dark:text-ios-gray-300 border-t border-ios-gray-100 dark:border-ios-gray-700 space-y-1.5">
                <TsStep label={L === 'en' ? 'Found' : '발견'}>{pick(ts.found)}</TsStep>
                <TsStep label={L === 'en' ? 'Analysis' : '분석'}>{pick(ts.analysis)}</TsStep>
                <TsStep label={L === 'en' ? 'Fix' : '해결'}>{pick(ts.fix)}</TsStep>
                <TsStep label={L === 'en' ? 'Learned' : '배움'}>{pick(ts.learned)}</TsStep>
              </div>
            </details>
          ))}
        </div>
      )}

      {/* 링크 */}
      <div className="flex flex-wrap gap-2 mt-5">
        {cs.links.appstore && (
          <a
            href={cs.links.appstore.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[12.5px] font-bold rounded-lg px-4 py-2 bg-ios-gray-900 text-white dark:bg-white dark:text-ios-gray-900"
          >
            {pick(cs.links.appstore.label)} ↗
          </a>
        )}
        {cs.links.intro && (
          <a
            href={cs.links.intro.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[12.5px] font-bold rounded-lg px-4 py-2 border border-ios-gray-200 dark:border-ios-gray-600 text-ios-gray-600 dark:text-ios-gray-300"
          >
            {pick(cs.links.intro.label)} ↗
          </a>
        )}
        {cs.links.github && (
          <a
            href={cs.links.github.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[12.5px] font-bold rounded-lg px-4 py-2 border border-ios-gray-200 dark:border-ios-gray-600 text-ios-gray-600 dark:text-ios-gray-300"
          >
            GitHub ↗
          </a>
        )}
        <Link
          href={`/case/${cs.slug}`}
          className="text-[12.5px] font-bold rounded-lg px-4 py-2 text-ios-blue border border-ios-blue/30 hover:bg-ios-blue/5"
        >
          {L === 'en' ? 'Full case study →' : '케이스 스터디 전체 보기 →'}
        </Link>
      </div>
    </motion.article>
  );
}

function ParRow({ label, labelClass, children }) {
  return (
    <div className="grid grid-cols-[74px_1fr] gap-3">
      <dt className={`text-[11px] font-extrabold tracking-wider pt-0.5 ${labelClass}`}>{label}</dt>
      <dd className="text-ios-gray-600 dark:text-ios-gray-300">{children}</dd>
    </div>
  );
}

function TsStep({ label, children }) {
  return (
    <div className="grid grid-cols-[64px_1fr] gap-2.5 py-1">
      <em className="not-italic text-[11px] font-extrabold text-ios-gray-400 pt-0.5">{label}</em>
      <span>{children}</span>
    </div>
  );
}
