'use client';

import Link from 'next/link';
import { useTranslation } from '@/lib/i18n';
import { featuredCaseStudies, getCaseStudy } from '@/data/caseStudies';
import { withBase } from '@/lib/basePath';
import { AppIcon } from './CaseCard';

// 시안 B(테크니컬 딥다이브 문서형): 사이드바 + 개요 표 → 문제 정의 → 아키텍처 → 트러블슈팅 → 성과
export default function CaseDoc({ slug }) {
  const { locale } = useTranslation();
  const L = locale === 'en' ? 'en' : 'ko';
  const ko = L === 'ko';
  const pick = (v) => (v && typeof v === 'object' ? v[L] : v);

  const cs = getCaseStudy(slug);
  if (!cs) return null;

  const idx = featuredCaseStudies.findIndex((c) => c.slug === slug);
  const prev = idx > 0 ? featuredCaseStudies[idx - 1] : null;
  const next = idx < featuredCaseStudies.length - 1 ? featuredCaseStudies[idx + 1] : null;

  let sectionNo = 0;
  const no = () => String(++sectionNo).padStart(2, '0');

  return (
    <div className="pt-16 bg-white dark:bg-ios-gray-900 min-h-screen">
      <div className="container-custom grid lg:grid-cols-[240px_1fr] gap-0">
        {/* ===== 사이드바 ===== */}
        <aside className="hidden lg:block border-r border-ios-gray-100 dark:border-ios-gray-700 py-8 pr-5">
          <div className="pb-4 mb-4 border-b border-ios-gray-100 dark:border-ios-gray-700">
            <Link href="/" className="font-extrabold text-[15px]">{ko ? '정송헌' : 'Dean Jeong'}</Link>
            <p className="text-xs text-ios-gray-400">iOS Developer · {ko ? '완주 7 · 출시 4' : '7 built · 4 shipped'}</p>
          </div>
          <p className="text-[10.5px] font-extrabold tracking-widest text-ios-gray-400 mb-2">CASE STUDIES</p>
          <nav className="space-y-0.5">
            {featuredCaseStudies.map((c) => (
              <Link
                key={c.slug}
                href={`/case/${c.slug}`}
                className={`flex justify-between items-center px-2.5 py-1.5 rounded-lg text-[13px] ${
                  c.slug === slug
                    ? 'bg-ios-gray-100 dark:bg-ios-gray-700 text-ios-gray-900 dark:text-white font-bold'
                    : 'text-ios-gray-600 dark:text-ios-gray-300 hover:bg-ios-gray-50 dark:hover:bg-ios-gray-800'
                }`}
              >
                <span>{L === 'en' && c.nameEn ? c.nameEn : c.name.split(' — ')[0]}</span>
                <span className="text-[10.5px] text-ios-gray-400">{c.platform}</span>
              </Link>
            ))}
          </nav>
          <p className="text-[10.5px] font-extrabold tracking-widest text-ios-gray-400 mt-5 mb-2">DOCS</p>
          <nav className="space-y-0.5">
            <Link href="/resume" className="block px-2.5 py-1.5 rounded-lg text-[13px] text-ios-gray-600 dark:text-ios-gray-300 hover:bg-ios-gray-50 dark:hover:bg-ios-gray-800">
              {ko ? '이력서' : 'Resume'}
            </Link>
            <a href="https://github.com/whatdoIsa" target="_blank" rel="noopener noreferrer" className="block px-2.5 py-1.5 rounded-lg text-[13px] text-ios-gray-600 dark:text-ios-gray-300 hover:bg-ios-gray-50 dark:hover:bg-ios-gray-800">
              GitHub ↗
            </a>
          </nav>
        </aside>

        {/* ===== 본문 ===== */}
        <main className="py-8 lg:pl-10 max-w-3xl">
          <p className="text-xs text-ios-gray-400 mb-2.5">
            <Link href="/" className="hover:text-ios-gray-900 dark:hover:text-white">Case Studies</Link>
            {' / '}
            <b className="text-ios-gray-900 dark:text-white">{L === 'en' && cs.nameEn ? cs.nameEn : cs.name.split(' — ')[0]}</b>
          </p>

          <h1 className="flex items-center gap-3 text-2xl font-extrabold tracking-tight">
            <AppIcon icon={cs.icon} size="w-10 h-10" rounded="rounded-lg" />
            {L === 'en' && cs.nameEn ? cs.nameEn : cs.name}
          </h1>

          {/* 개요 표 */}
          <table className="w-full mt-5 text-[13px]">
            <tbody>
              <MetaRow th={ko ? '역할' : 'Role'}>
                <b className="font-bold">{pick(cs.role)}</b>
              </MetaRow>
              <MetaRow th={ko ? '기간' : 'Period'}>
                {cs.period} · {pick(cs.status)}
              </MetaRow>
              <MetaRow th={ko ? '스택' : 'Stack'}>{cs.stack.join(' · ')}</MetaRow>
              <MetaRow th={ko ? '링크' : 'Links'}>
                <span className="flex flex-wrap gap-x-3 gap-y-1">
                  {Object.values(cs.links).map((link) => (
                    <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer" className="text-ios-gray-700 dark:text-ios-gray-200 font-semibold underline underline-offset-4 decoration-ios-gray-300 hover:text-ios-gray-900">
                      {pick(link.label)} ↗
                    </a>
                  ))}
                </span>
              </MetaRow>
            </tbody>
          </table>

          {/* 스크린샷 */}
          {cs.shots.length > 0 && (
            <div className="grid grid-cols-3 gap-2.5 mt-6">
              {cs.shots.map((shot) => (
                <figure key={shot.src} className="rounded-lg overflow-hidden border border-ios-gray-100 dark:border-ios-gray-700">
                  <img src={withBase(shot.src)} alt={pick(shot.caption)} className="w-full block" loading="lazy" />
                </figure>
              ))}
            </div>
          )}

          {/* 01 문제 정의 */}
          <DocH2 no={no()}>{ko ? '문제 정의' : 'Problem'}</DocH2>
          <p className="text-sm text-ios-gray-600 dark:text-ios-gray-300">{pick(cs.problem)}</p>

          {/* 02 접근 */}
          {pick(cs.actions).length > 0 && (
            <>
              <DocH2 no={no()}>{ko ? '접근' : 'Approach'}</DocH2>
              <ul className="space-y-2 text-sm text-ios-gray-600 dark:text-ios-gray-300">
                {pick(cs.actions).map((a, i) => (
                  <li key={i} className="relative pl-4 before:content-[''] before:absolute before:left-0 before:top-[9px] before:w-[5px] before:h-[5px] before:rounded-full before:bg-ios-gray-300">
                    {a}
                  </li>
                ))}
              </ul>
            </>
          )}

          {/* 03 아키텍처 */}
          {cs.architecture && (
            <>
              <DocH2 no={no()}>{ko ? '아키텍처' : 'Architecture'}</DocH2>
              <div className="border-[1.5px] border-dashed border-ios-gray-200 dark:border-ios-gray-600 rounded-xl p-5 text-center font-mono text-[12px] leading-8 text-ios-gray-500 dark:text-ios-gray-400 bg-ios-gray-50 dark:bg-ios-gray-800 overflow-x-auto">
                {cs.architecture.lines.map((line, i) => (
                  <div key={i} className={i % 2 === 0 ? 'text-ios-gray-700 dark:text-ios-gray-200 font-semibold' : ''}>{line}</div>
                ))}
              </div>
            </>
          )}

          {/* 아키텍처 의사결정 (ADR) */}
          {cs.decision && (
            <>
              <DocH2 no={no()}>{ko ? '아키텍처 의사결정' : 'Architecture decision'}</DocH2>
              <dl className="border border-ios-gray-100 dark:border-ios-gray-700 rounded-xl divide-y divide-ios-gray-100 dark:divide-ios-gray-700 text-[13.5px]">
                {[
                  ['Context', ko ? '맥락' : 'Context', cs.decision.context],
                  ['Decision', ko ? '결정' : 'Decision', cs.decision.decision],
                  ['Alternatives', ko ? '대안' : 'Alternatives', cs.decision.alternatives],
                  ['Trade-off', ko ? '트레이드오프' : 'Trade-off', cs.decision.tradeoff],
                  ['Result', ko ? '결과' : 'Result', cs.decision.result],
                ].map(([key, label, val]) => (
                  <div key={key} className="grid sm:grid-cols-[120px_1fr] gap-1 sm:gap-4 px-4 py-3">
                    <dt className="text-[11.5px] font-extrabold tracking-wide text-ios-gray-400 pt-0.5">{label}</dt>
                    <dd className={`text-ios-gray-600 dark:text-ios-gray-300 ${key === 'Decision' ? 'font-semibold text-ios-gray-900 dark:text-white' : ''}`}>{pick(val)}</dd>
                  </div>
                ))}
              </dl>
            </>
          )}

          {/* 트러블슈팅 */}
          {cs.troubleshooting.map((ts, i) => (
            <div key={i}>
              <DocH2 no={no()}>
                {ko ? '트러블슈팅 — ' : 'Troubleshooting: '}
                {pick(ts.title)}
              </DocH2>
              <Callout label={ko ? '문제 발견' : 'Found'}>{pick(ts.found)}</Callout>
              <Callout label={ko ? '원인 분석' : 'Analysis'}>{pick(ts.analysis)}</Callout>
              <Callout label={ko ? '해결' : 'Fix'}>{pick(ts.fix)}</Callout>
              <Callout label={ko ? '배운 점' : 'Learned'}>{pick(ts.learned)}</Callout>
            </div>
          ))}

          {/* 성과 */}
          <DocH2 no={no()}>{ko ? '성과' : 'Results'}</DocH2>
          <p className="text-sm text-ios-gray-600 dark:text-ios-gray-300 mb-4">{pick(cs.result)}</p>
          {cs.resultTiles.length > 0 && (
            <div className="grid sm:grid-cols-3 gap-2.5">
              {cs.resultTiles.map((tile, i) => (
                <div key={i} className="bg-ios-gray-50 dark:bg-ios-gray-800 border border-ios-gray-100 dark:border-ios-gray-700 rounded-xl px-4 py-3">
                  <b className="block text-lg font-extrabold tabular-nums tracking-tight">{pick(tile.big)}</b>
                  <span className="text-[11.5px] text-ios-gray-500 dark:text-ios-gray-400">{pick(tile.small)}</span>
                </div>
              ))}
            </div>
          )}

          {/* 이전/다음 */}
          <div className="flex justify-between mt-10 pt-4 border-t border-ios-gray-100 dark:border-ios-gray-700 text-[13px] font-bold">
            {prev ? (
              <Link href={`/case/${prev.slug}`} className="text-ios-gray-900 dark:text-white hover:underline underline-offset-4">
                ← {L === 'en' && prev.nameEn ? prev.nameEn : prev.name.split(' — ')[0]}
              </Link>
            ) : <span />}
            {next ? (
              <Link href={`/case/${next.slug}`} className="text-ios-gray-900 dark:text-white hover:underline underline-offset-4">
                {L === 'en' && next.nameEn ? next.nameEn : next.name.split(' — ')[0]} →
              </Link>
            ) : <span />}
          </div>
        </main>
      </div>
    </div>
  );
}

function MetaRow({ th, children }) {
  return (
    <tr className="border-b border-ios-gray-50 dark:border-ios-gray-800">
      <th className="text-left align-top text-ios-gray-400 font-semibold w-24 py-2 pr-3 whitespace-nowrap">{th}</th>
      <td className="py-2 text-ios-gray-700 dark:text-ios-gray-200">{children}</td>
    </tr>
  );
}

function DocH2({ no, children }) {
  return (
    <h2 className="flex items-baseline gap-2 text-base font-extrabold mt-9 mb-3 pt-4 border-t-2 border-ios-gray-900 dark:border-ios-gray-100">
      <span className="font-mono text-xs text-ios-gray-400">{no}</span>
      {children}
    </h2>
  );
}

function Callout({ label, children }) {
  return (
    <div className="border-l-2 border-ios-gray-900 dark:border-ios-gray-100 bg-ios-gray-50 dark:bg-ios-gray-800 rounded-r-xl px-4 py-3.5 mb-3">
      <span className="block text-[11.5px] font-extrabold tracking-wide text-ios-gray-400 mb-1.5">{label}</span>
      <p className="text-[13.5px] text-ios-gray-700 dark:text-ios-gray-200 m-0">{children}</p>
    </div>
  );
}
