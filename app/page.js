'use client';

import { Fragment } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useTranslation } from '@/lib/i18n';
import { featuredCaseStudies, miniCaseStudies } from '@/data/caseStudies';
import CaseCard from '@/components/case/CaseCard';
import MiniCard from '@/components/case/MiniCard';

// 시안 C(하이브리드): 10초 스캔 헤더 → 케이스 스터디(P-A-R + 딥다이브) → Skills → Education → Contact
export default function Home() {
  const { locale } = useTranslation();
  const L = locale === 'en' ? 'en' : 'ko';
  const ko = L === 'ko';

  // 채용공고 요건을 첫 화면에서 10초 안에 보여주는 증거 5종 (기술명만이 아니라 실제 프로젝트로 연결)
  const evidence = ko
    ? [
        ['SwiftUI 제품 개발', 'SmartEdge·Show(X)·kip!·ReToU를 SwiftUI로 설계. macOS는 AppKit 결합.'],
        ['App Store 출시·업데이트', 'SmartEdge v1.1 · ReToU v2.0 · Show(X) · kip! 심사 통과·운영. 리젝 대응 경험.'],
        ['QA·현장 안정화', 'Show(X) 행사 중 5회 반복 업데이트, SmartEdge 실기기 QA·시스템 제약 진단.'],
        ['Claude Code 개발·검증', '요구사항→구현→빌드/테스트→diff 직접 리뷰까지 AI 도구를 검증과 함께 사용.'],
        ['Firebase·로컬 우선 아키텍처', 'Rootrip Firestore 동기화, ReToU·kip! SwiftData 로컬 우선 저장.'],
      ]
    : [
        ['SwiftUI product work', 'SmartEdge, Show(X), kip!, ReToU designed in SwiftUI; AppKit for macOS.'],
        ['App Store ship & update', 'SmartEdge v1.1, ReToU v2.0, Show(X), kip! reviewed and operated; rejection handling.'],
        ['QA & field stabilization', '5 in-event updates on Show(X); on-device QA and system-constraint diagnosis on SmartEdge.'],
        ['Claude Code + verification', 'AI used with checks: requirements → build → run tests → review every diff myself.'],
        ['Firebase / local-first', 'Firestore sync in Rootrip; SwiftData local-first storage in ReToU and kip!.'],
      ];

  const facts = [
    { big: ko ? '7개' : '7', small: ko ? '완주한 앱 (App Store 출시 5 포함)' : 'apps finished (5 on the App Store)', accent: true },
    { big: ko ? '국내 최초¹' : 'Korea-first¹', small: ko ? 'Apple Indoor Map 승인 (Show(X))' : 'Apple Indoor Map approval (Show(X))', accent: false },
    { big: '#37 · #66²', small: ko ? '내비게이션·생산성 차트' : 'Navigation · productivity charts', accent: true },
    { big: ko ? '3개 라이브' : '3 live', small: ko ? '직접 운영 중 (SmartEdge·ReToU·SEED)' : 'in live operation (SmartEdge·ReToU·SEED)', accent: false },
  ];

  const skillCols = [
    {
      title: 'iOS · macOS',
      items: ko
        ? [
            ['SwiftUI', '앱 7개 완주 (App Store 출시 5)'],
            ['UIKit · AppKit', '메뉴바 앱, 윈도우 레벨 제어'],
            ['App Sandbox · TCC 권한', '샌드박스·권한 제약 대응 (SmartEdge)'],
            ['MapKit', 'Indoor Positioning, GeoJSON'],
            ['PencilKit', '좌표계 변환, 드로잉 영속성'],
            ['Apple Intelligence · Vision', '온디바이스 분류 파이프라인'],
            ['SwiftData · CloudKit · StoreKit 2', '로컬 우선 저장·백업·수익화'],
          ]
        : [
            ['SwiftUI', '7 apps built (5 on the App Store)'],
            ['UIKit · AppKit', 'menu-bar apps, window-level control'],
            ['App Sandbox · TCC', 'shipping within sandbox/permission constraints'],
            ['MapKit', 'Indoor Positioning, GeoJSON'],
            ['PencilKit', 'coordinate conversion, drawing persistence'],
            ['Apple Intelligence · Vision', 'on-device classification pipeline'],
            ['SwiftData · CloudKit · StoreKit 2', 'local-first storage, backup, monetization'],
          ],
    },
    {
      title: 'Quality · AI Workflow',
      items: ko
        ? [
            ['QA·안정화 사이클', '실기기 QA, 현장 관찰 기반 5회 업데이트'],
            ['시스템 제약 해결 경험', '샌드박스·TCC·윈도우 레벨 (SmartEdge)'],
            ['AI 개발 도구 워크플로우', 'Claude Code 기반 개발·검증 자동화'],
            ['버전 운영·유지보수', 'SmartEdge v1.1 · ReToU v2.0 라이브 운영'],
          ]
        : [
            ['QA & stabilization cycles', 'device QA, 5 field-driven updates'],
            ['System-constraint problem solving', 'sandbox · TCC · window levels (SmartEdge)'],
            ['AI-assisted dev workflow', 'build & verify pipeline on Claude Code'],
            ['Version ops & maintenance', 'SmartEdge v1.1 · ReToU v2.0 live'],
          ],
    },
    {
      title: 'Product · Ops',
      items: ko
        ? [
            ['앱 7개 완주 · App Store 출시 5', '심사·리젝 대응·유지보수 경험'],
            ['사용자 인터뷰·피드백 반복 개선', '5회+ 반영'],
            ['StoreKit 2 수익화 · ASO', ''],
            ['GitHub · GitHub Actions (CI)', ''],
            ['Firebase', ''],
            ['Figma 기반 디자이너 협업', ''],
            ['KO·EN 로컬라이제이션', '영어 회화 가능'],
          ]
        : [
            ['7 apps built · 5 shipped', 'incl. review, rejection handling & maintenance'],
            ['User-interview-driven iteration', '5+ feedback rounds shipped'],
            ['StoreKit 2 monetization · ASO', ''],
            ['GitHub · GitHub Actions (CI)', ''],
            ['Firebase', ''],
            ['Designer collaboration in Figma', ''],
            ['KO·EN localization', 'conversational English'],
          ],
    },
  ];

  // 출시·운영 현황 (G) — 출시 여부·운영 여부·담당 범위를 사실대로. 링크는 유효한 것만.
  const operations = [
    { name: 'SmartEdge', platform: 'macOS', scopeKo: '개인 100%', scopeEn: 'Solo 100%', released: true, operating: true, appstore: 'https://apps.apple.com/kr/app/smartedge/id6787634027?mt=12', github: null },
    { name: 'ReToU', platform: 'iOS', scopeKo: '개인 100%', scopeEn: 'Solo 100%', released: true, operating: true, appstore: 'https://apps.apple.com/kr/app/re-tou/id6745058969', github: 'https://github.com/whatdoIsa/ReToU' },
    { name: 'SEED', platform: 'iOS', scopeKo: '개인 100%', scopeEn: 'Solo 100%', released: true, operating: true, appstore: 'https://apps.apple.com/kr/app/seed-%ED%88%AC%EC%9E%90-%EC%97%B0%EC%8A%B5%EC%9E%A5/id6789554674', github: null },
    { name: 'Show(X)', platform: 'iOS', scopeKo: '팀 6인 · 개발 리드(50%)', scopeEn: 'Team of 6 · lead (50%)', released: true, operating: false, appstore: 'https://apps.apple.com/kr/app/showx/id6755496321', github: null },
    { name: 'kip!', platform: 'iOS', scopeKo: '팀 6인 · 개발 40%', scopeEn: 'Team of 6 · 40% of dev', released: true, operating: false, appstore: 'https://apps.apple.com/kr/app/kip/id6754709167', github: null },
    { name: 'Rootrip', platform: 'iPadOS', scopeKo: '팀 6인 · PencilKit 전담', scopeEn: 'Team of 6 · owned PencilKit', released: false, operating: false, appstore: null, github: null },
  ];

  // 일하는 방식 — 출시 품질(QA)과 AI 검증 워크플로. 회사 무관한 일반 강점.
  const qaFlow = ko
    ? ['요구사항·실패 조건 정의', '구현 단위 분리', '빌드·정적 오류 확인', '정상·예외·경계 점검', '실기기 테스트', 'App Store 심사 대응', '운영 피드백 → 수정·버전 업데이트']
    : ['Define requirements & failure cases', 'Split into small units', 'Build & static-error check', 'Normal/exception/boundary checks', 'Real-device testing', 'App Store review handling', 'Feedback → fix & version update'];
  const qaBasis = ko
    ? '실제 근거: SmartEdge 실기기 QA·심사 대응, Show(X) 현장 관찰 5회 업데이트, ReToU 피드백 3회 반영.'
    : 'From real work: SmartEdge device QA & review, 5 in-event Show(X) updates, 3 ReToU feedback rounds.';
  const aiFlow = ko
    ? ['요구사항 정리', '범위·영향 파일 분석', '작은 단위 구현', 'build/test 실행', 'diff 직접 검토', '아키텍처·예외 검증', '실기기 QA', '커밋/PR']
    : ['Frame requirements', 'Scope & impacted files', 'Implement in small units', 'Run build/test', 'Review the diff myself', 'Verify architecture & edge cases', 'On-device QA', 'Commit/PR'];
  const aiPrinciples = ko
    ? ['생성 코드를 이해하지 못한 채 병합하지 않는다.', '빌드 성공만으로 완료 처리하지 않는다.', '개인정보·인증키·환경변수는 AI 문맥에 넣지 않는다.', '최종 품질 책임은 개발자에게 있다.']
    : ['Never merge generated code I don\'t understand.', 'A passing build alone is not "done".', 'Keep personal data, secrets and env vars out of the AI context.', 'Final quality is the developer\'s responsibility.'];

  const education = ko
    ? [
        ['2025.03 – 2025.12', 'Apple Developer Academy 4기 @ POSTECH', 'Apple 생태계 집중 교육 — 개발·디자인·커뮤니케이션·기획. 6개 Challenge 프로젝트 완성 (Show(X), kip!, Rootrip, WAY GYM 등). 쇼케이스 현장 운영(200+명 응대)까지 담당.'],
        ['2024.02 – 2024.09', 'Zerobase 프론트엔드 스쿨', 'React·TypeScript 기반 웹 개발 교육. 컴포넌트 아키텍처, 타입 안정성, 팀 프로젝트 협업.'],
        ['2019.03 – 2025.02', '신라대학교 컴퓨터교육과', '학사 졸업 (3.46/4.5) · 사범대 학생회 홍보부장 — 콘텐츠·이벤트 기획으로 SNS 팔로워 1만 명 성장.'],
        ['2019.12 – 2020.02', '캐나다 빅토리아대학교 어학연수', '장학생 선발 · 영어 회화 가능.'],
        ['2021.03 – 2022.09', '병역', '대한민국 육군 병장 만기제대.'],
      ]
    : [
        ['2025.03 – 2025.12', 'Apple Developer Academy 4th @ POSTECH', 'Intensive Apple-ecosystem program covering development, design, communication and planning. Completed 6 challenge projects (Show(X), kip!, Rootrip, WAY GYM and more) and ran on-site showcase operations for 200+ attendees.'],
        ['2024.02 – 2024.09', 'Zerobase Frontend School', 'React/TypeScript web development: component architecture, type safety, team collaboration.'],
        ['2019.03 – 2025.02', 'Silla University, Computer Education', 'B.S. (GPA 3.46/4.5) · led college PR, growing SNS followers to 10k through content and events.'],
        ['2019.12 – 2020.02', 'University of Victoria, Canada (language program)', 'Selected on scholarship · conversational English.'],
        ['2021.03 – 2022.09', 'Military service', 'Republic of Korea Army, honorably discharged as sergeant.'],
      ];

  return (
    <div className="pt-16 bg-ios-gray-50 dark:bg-ios-gray-900 min-h-screen">
      {/* ===== 10초 스캔 헤더 ===== */}
      <header id="about" className="bg-white dark:bg-ios-gray-800 border-b border-ios-gray-100 dark:border-ios-gray-700">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid sm:grid-cols-[auto_1fr] gap-6 pt-12 pb-8 items-start"
          >
            <img
              src={`${process.env.NODE_ENV === 'production' ? '/iOS-Portfolio' : ''}/images/profile.jpg`}
              alt={ko ? '정송헌 프로필 사진' : 'Portrait of Songheon Jeong'}
              className="hidden sm:block w-32 h-32 rounded-2xl object-cover object-top border border-ios-gray-100 dark:border-ios-gray-700"
            />
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                {ko ? '정송헌' : 'Songheon Jeong (Dean)'}
                <span className="text-sm font-semibold text-ios-gray-400 ml-2.5">iOS·macOS Developer</span>
              </h1>
              <p className="mt-2.5 text-[15px] font-semibold text-ios-gray-800 dark:text-ios-gray-100 max-w-xl">
                {ko
                  ? 'SwiftUI로 앱을 설계하고, App Store에 출시하고, 운영까지 책임져 온 iOS 개발자입니다.'
                  : 'An iOS developer who designs apps in SwiftUI, ships them to the App Store, and owns them through operations.'}
              </p>
              <p className="mt-2 text-[14px] text-ios-gray-600 dark:text-ios-gray-300 max-w-xl">
                {ko ? (
                  <>개인·팀 프로젝트에서 <b className="text-ios-gray-900 dark:text-white">여러 앱을 출시</b>했고, 지금도 SmartEdge와 ReToU를 직접 업데이트하고 있습니다. 빠른 구현뿐 아니라 <b className="text-ios-gray-900 dark:text-white">심사·사용자 피드백·버전 업데이트·제품 안정성</b>까지 개발자의 책임이라고 생각합니다. 화려하게 타오르기보다 은근하게 오래 끓는 편이라, 맡은 일은 수단과 방법을 가리지 않고 끝을 봅니다.</>
                ) : (
                  <>I have <b className="text-ios-gray-900 dark:text-white">shipped several apps</b> across solo and team projects, and I still update SmartEdge and ReToU myself. I treat not just fast implementation but <b className="text-ios-gray-900 dark:text-white">App Store review, user feedback, version updates and product stability</b> as the developer&apos;s responsibility. I run slow and steady rather than flashy, and I find whatever it takes to finish what I take on.</>
                )}
              </p>
              <div className="flex flex-wrap gap-x-5 gap-y-1.5 mt-4 text-[13px] text-ios-gray-500 dark:text-ios-gray-400">
                <span>{ko ? '양주, 대한민국' : 'Yangju, South Korea'}</span>
                <a href="mailto:gmlwns5504@naver.com" className="border-b border-ios-gray-200 hover:text-ios-gray-900 dark:hover:text-white hover:border-ios-gray-400">gmlwns5504@naver.com</a>
                <a href="https://github.com/whatdoIsa" target="_blank" rel="noopener noreferrer" className="border-b border-ios-gray-200 hover:text-ios-gray-900 dark:hover:text-white hover:border-ios-gray-400">github.com/whatdoIsa</a>
              </div>
            </div>
          </motion.div>

          {/* 증거 5종 — 채용 요건 10초 스캔 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-px bg-ios-gray-100 dark:bg-ios-gray-700 border-y border-ios-gray-100 dark:border-ios-gray-700 rounded-xl overflow-hidden">
            {evidence.map(([label, detail]) => (
              <div key={label} className="bg-white dark:bg-ios-gray-800 p-4">
                <b className="block text-[13px] font-bold text-ios-gray-900 dark:text-white">{label}</b>
                <span className="block mt-1 text-[12px] leading-snug text-ios-gray-500 dark:text-ios-gray-400">{detail}</span>
              </div>
            ))}
          </div>

          {/* 팩트 스트립 */}
          <div className="grid grid-cols-2 lg:grid-cols-4 border-t border-ios-gray-100 dark:border-ios-gray-700 mt-6">
            {facts.map((f, i) => (
              <div key={i} className={`py-3.5 px-1 sm:px-4 ${i > 0 ? 'lg:border-l border-ios-gray-100 dark:border-ios-gray-700' : ''}`}>
                <b className="block text-base font-extrabold tabular-nums text-ios-gray-900 dark:text-white">
                  {f.big}
                </b>
                <span className="text-[11.5px] text-ios-gray-400">{f.small}</span>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-ios-gray-400 pb-6 pt-2 leading-relaxed">
            {ko
              ? '¹ Apple Indoor Map 국내 최초 승인 — 아카데미 개발 당시 Apple Korea 확인. ² App Store 카테고리 차트 — 내비게이션 #37, 생산성 #66(2025년 12월 기준). 표본·측정 방법은 각 케이스 스터디에 표기.'
              : '¹ First Apple Indoor Map approval in Korea (confirmed by Apple Korea during the academy). ² App Store category charts — Navigation #37, Productivity #66 (as of December 2025). Sample sizes and measurement are noted in the case studies.'}
          </p>
        </div>
      </header>

      {/* ===== 케이스 스터디 ===== */}
      <section id="cases" className="py-14">
        <div className="container-custom max-w-4xl">
          <SectionLabel>Case Studies</SectionLabel>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight mb-1.5">
            {ko ? '문제를 정의하고, 만들고, 검증한 프로젝트' : 'Projects: problem defined, built, validated'}
          </h2>
          <p className="text-[13.5px] text-ios-gray-500 dark:text-ios-gray-400 mb-7">
            {ko
              ? '요약은 Problem → Action → Result, 깊이는 트러블슈팅 딥다이브로. 수치는 실제 테스트/운영 데이터 기준입니다.'
              : 'Skim with Problem → Action → Result; go deep with the troubleshooting sections. Figures come from real test/operations data.'}
          </p>

          {featuredCaseStudies.map((cs) => (
            <CaseCard key={cs.slug} cs={cs} />
          ))}

          <div className="grid sm:grid-cols-2 gap-4 mt-6">
            {miniCaseStudies.map((cs) => (
              <MiniCard key={cs.slug} cs={cs} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== 출시·운영 현황 (G) ===== */}
      <section id="operations" className="py-14 bg-white dark:bg-ios-gray-800 border-y border-ios-gray-100 dark:border-ios-gray-700">
        <div className="container-custom max-w-4xl">
          <SectionLabel>Ship & Operate</SectionLabel>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight mb-1.5">
            {ko ? '출시 이후가 제품의 시작이라고 생각합니다' : 'Shipping is where the product begins'}
          </h2>
          <p className="text-[13.5px] text-ios-gray-500 dark:text-ios-gray-400 mb-6">
            {ko ? '담당 범위·출시·현재 운영 여부를 한눈에. 출시되지 않은 프로젝트는 별도 표기합니다.'
                : 'Scope, release and current operation at a glance. Unreleased projects are marked separately.'}
          </p>
          <div className="overflow-x-auto -mx-1 px-1">
            <table className="w-full text-[13px] border-collapse min-w-[640px]">
              <thead>
                <tr className="text-left text-ios-gray-400 border-b border-ios-gray-200 dark:border-ios-gray-600">
                  <th className="py-2 pr-3 font-semibold">{ko ? '앱' : 'App'}</th>
                  <th className="py-2 pr-3 font-semibold">{ko ? '플랫폼' : 'Platform'}</th>
                  <th className="py-2 pr-3 font-semibold">{ko ? '담당' : 'Scope'}</th>
                  <th className="py-2 pr-3 font-semibold">{ko ? '출시' : 'Released'}</th>
                  <th className="py-2 pr-3 font-semibold">{ko ? '운영' : 'Operating'}</th>
                  <th className="py-2 font-semibold">{ko ? '링크' : 'Links'}</th>
                </tr>
              </thead>
              <tbody>
                {operations.map((r) => (
                  <tr key={r.name} className="border-b border-ios-gray-100 dark:border-ios-gray-700 align-top">
                    <td className="py-2.5 pr-3 font-bold text-ios-gray-900 dark:text-white whitespace-nowrap">{r.name}</td>
                    <td className="py-2.5 pr-3 text-ios-gray-500 dark:text-ios-gray-400 whitespace-nowrap">{r.platform}</td>
                    <td className="py-2.5 pr-3 text-ios-gray-600 dark:text-ios-gray-300">{ko ? r.scopeKo : r.scopeEn}</td>
                    <td className="py-2.5 pr-3 whitespace-nowrap">{r.released
                      ? <span className="text-ios-green font-semibold">{ko ? '출시' : 'Yes'}</span>
                      : <span className="text-ios-gray-400">{ko ? '미출시' : 'No'}</span>}</td>
                    <td className="py-2.5 pr-3 whitespace-nowrap">{r.operating
                      ? <span className="inline-flex items-center gap-1.5 font-semibold text-ios-gray-800 dark:text-ios-gray-100"><span className="w-1.5 h-1.5 rounded-full bg-ios-green" aria-hidden="true" />{ko ? '운영 중' : 'Live'}</span>
                      : <span className="text-ios-gray-300" aria-hidden="true">·</span>}</td>
                    <td className="py-2.5">
                      <span className="flex flex-wrap gap-x-3 gap-y-0.5">
                        {r.appstore && <a href={r.appstore} target="_blank" rel="noopener noreferrer" className="text-ios-gray-700 dark:text-ios-gray-200 underline underline-offset-2 decoration-ios-gray-300 hover:text-ios-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ios-blue">App Store</a>}
                        {r.github && <a href={r.github} target="_blank" rel="noopener noreferrer" className="text-ios-gray-700 dark:text-ios-gray-200 underline underline-offset-2 decoration-ios-gray-300 hover:text-ios-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ios-blue">GitHub</a>}
                        {!r.appstore && !r.github && <span className="text-ios-gray-300" aria-hidden="true">·</span>}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ===== Skills ===== */}
      <section id="skills" className="py-14 bg-ios-gray-50 dark:bg-ios-gray-900">
        <div className="container-custom max-w-4xl">
          <SectionLabel>Skills</SectionLabel>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight mb-7">
            {ko ? '기술 스택 — 나열이 아니라 근거와 함께' : 'Tech stack, with evidence not lists'}
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {skillCols.map((col) => (
              <div key={col.title} className="bg-white dark:bg-ios-gray-800 border border-ios-gray-100 dark:border-ios-gray-700 rounded-2xl p-5">
                <h3 className="text-[12px] font-extrabold tracking-widest uppercase text-ios-gray-400 mb-3.5">{col.title}</h3>
                <ul className="space-y-2 text-[13.5px] text-ios-gray-600 dark:text-ios-gray-300">
                  {col.items.filter(([name]) => name).map(([name, why]) => (
                    <li key={name}>
                      <b className="font-bold text-ios-gray-900 dark:text-white">{name}</b>
                      {why && <span className="text-ios-gray-500 dark:text-ios-gray-400">: {why}</span>}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 일하는 방식 (QA + AI 검증) ===== */}
      <section id="process" className="py-14 bg-white dark:bg-ios-gray-800 border-y border-ios-gray-100 dark:border-ios-gray-700">
        <div className="container-custom max-w-4xl">
          <SectionLabel>How I work</SectionLabel>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight mb-1.5">
            {ko ? '구현으로 끝내지 않고, 출시 가능한 상태까지' : 'Not just implemented — ready to ship'}
          </h2>
          <p className="text-[13.5px] text-ios-gray-500 dark:text-ios-gray-400 mb-7">
            {ko ? '심사·안정화·운영을 개발의 일부로 봅니다. AI 도구는 쓰되 품질 책임은 직접 집니다.'
                : 'Review, stabilization and operations are part of development. I use AI tools but own the quality.'}
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {/* QA·릴리스 */}
            <div className="bg-ios-gray-50 dark:bg-ios-gray-900/40 rounded-2xl p-5">
              <h3 className="text-[12px] font-extrabold tracking-widest uppercase text-ios-gray-400 mb-3">
                {ko ? '출시 품질을 만드는 과정' : 'Getting a build ready to ship'}
              </h3>
              <ol className="space-y-1.5">
                {qaFlow.map((s, i) => (
                  <li key={i} className="text-[13.5px] text-ios-gray-600 dark:text-ios-gray-300 flex gap-2.5">
                    <span className="text-ios-gray-300 tabular-nums shrink-0">{i + 1}</span>{s}
                  </li>
                ))}
              </ol>
              <p className="mt-3.5 text-[12px] text-ios-gray-400">{qaBasis}</p>
            </div>
            {/* AI 워크플로 */}
            <div className="bg-ios-gray-50 dark:bg-ios-gray-900/40 rounded-2xl p-5">
              <h3 className="text-[12px] font-extrabold tracking-widest uppercase text-ios-gray-400 mb-3">
                {ko ? 'AI를 쓰되 검증은 직접' : 'AI, but I verify'}
              </h3>
              <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1.5 mb-3.5">
                {aiFlow.map((s, i) => (
                  <Fragment key={i}>
                    <span className="text-[12px] text-ios-gray-600 dark:text-ios-gray-300 bg-white dark:bg-ios-gray-800 border border-ios-gray-100 dark:border-ios-gray-700 rounded-full px-2.5 py-1">
                      {s}
                    </span>
                    {i < aiFlow.length - 1 && <span className="text-ios-gray-300 shrink-0" aria-hidden="true">→</span>}
                  </Fragment>
                ))}
              </div>
              <ul className="space-y-1.5">
                {aiPrinciples.map((p, i) => (
                  <li key={i} className="text-[13px] text-ios-gray-600 dark:text-ios-gray-300 relative pl-4 before:content-['·'] before:absolute before:left-0 before:text-ios-gray-400">{p}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Education ===== */}
      <section id="education" className="py-14">
        <div className="container-custom max-w-4xl">
          <SectionLabel>Education & Training</SectionLabel>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight mb-5">{ko ? '교육 · 기타' : 'Education & more'}</h2>
          <div className="bg-white dark:bg-ios-gray-800 border border-ios-gray-100 dark:border-ios-gray-700 rounded-2xl px-6 divide-y divide-ios-gray-100 dark:divide-ios-gray-700">
            {education.map(([time, title, desc]) => (
              <div key={title} className="grid sm:grid-cols-[170px_1fr] gap-1 sm:gap-4 py-5">
                <time className="text-[12.5px] text-ios-gray-400 tabular-nums pt-0.5">{time}</time>
                <div>
                  <h3 className="text-[15px] font-bold">{title}</h3>
                  <p className="text-[13px] text-ios-gray-500 dark:text-ios-gray-400 mt-1">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Contact ===== */}
      <section id="contact" className="py-16 bg-white dark:bg-ios-gray-800 border-t border-ios-gray-100 dark:border-ios-gray-700">
        <div className="container-custom text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {ko ? '함께 일할 준비가 되어 있습니다' : 'Ready to work together'}
          </h2>
          <p className="text-[14.5px] text-ios-gray-500 dark:text-ios-gray-400 mt-3">
            {ko ? '채용·협업 문의는 이메일로 편하게 연락 주세요. 24시간 내 회신드립니다.' : 'For hiring or collaboration, email me. I reply within 24 hours.'}
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-7">
            <a href="mailto:gmlwns5504@naver.com" className="text-sm font-bold rounded-xl px-6 py-3 bg-ios-gray-900 text-white dark:bg-white dark:text-ios-gray-900 hover:opacity-85 transition-opacity">
              {ko ? '이메일 보내기' : 'Send email'}
            </a>
            <a href="https://github.com/whatdoIsa" target="_blank" rel="noopener noreferrer" className="text-sm font-bold rounded-xl px-6 py-3 border border-ios-gray-200 dark:border-ios-gray-600 text-ios-gray-600 dark:text-ios-gray-300">
              GitHub ↗
            </a>
            <Link href="/resume" className="text-sm font-bold rounded-xl px-6 py-3 border border-ios-gray-200 dark:border-ios-gray-600 text-ios-gray-600 dark:text-ios-gray-300">
              {ko ? '이력서' : 'Resume'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <div className="text-[12px] font-bold tracking-[0.14em] uppercase text-ios-gray-400 mb-2.5">{children}</div>
  );
}
