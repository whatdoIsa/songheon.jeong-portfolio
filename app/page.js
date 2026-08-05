'use client';

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

  const facts = [
    { big: ko ? '11개 출시' : '11 shipped', small: ko ? 'App Store (기획~운영)' : 'App Store (plan → ops)', accent: true },
    { big: ko ? '국내 최초' : 'Korea-first', small: ko ? 'Apple Indoor Map 승인' : 'Apple Indoor Map approval', accent: false },
    { big: '#37 · #66', small: ko ? '내비게이션 · 생산성 차트' : 'Navigation · productivity charts', accent: true },
    { big: ko ? '지속률 70%' : '70% retention', small: ko ? 'ReToU 30일 (기존 대비 3배)' : 'ReToU 30-day (3× typical)', accent: false },
  ];

  const skillCols = [
    {
      title: 'iOS · macOS',
      items: ko
        ? [
            ['SwiftUI', '앱 6개 출시 경험'],
            ['UIKit · AppKit', '메뉴바 앱, 윈도우 레벨 제어'],
            ['App Sandbox · TCC 권한', '시스템 제약 로그 기반 디버깅'],
            ['MapKit', 'Indoor Positioning, GeoJSON'],
            ['PencilKit', '좌표계 변환, 드로잉 영속성'],
            ['Apple Intelligence · Vision', '온디바이스 분류 파이프라인'],
            ['SwiftData · CloudKit · StoreKit 2', '로컬 우선 저장·백업·수익화'],
          ]
        : [
            ['SwiftUI', 'shipped 6 apps'],
            ['UIKit · AppKit', 'menu-bar apps, window-level control'],
            ['App Sandbox · TCC', 'log-driven debugging of system constraints'],
            ['MapKit', 'Indoor Positioning, GeoJSON'],
            ['PencilKit', 'coordinate conversion, drawing persistence'],
            ['Apple Intelligence · Vision', 'on-device classification pipeline'],
            ['SwiftData · CloudKit · StoreKit 2', 'local-first storage, backup, monetization'],
          ],
    },
    {
      title: 'Web Frontend',
      items: ko
        ? [
            ['React · TypeScript', '풀스택 프로젝트 완성'],
            ['Vue.js · Next.js · Remix.js', ''],
            ['Tailwind CSS · CSS/Sass', ''],
            ['선언형 UI 경험', 'SwiftUI 빠른 전환의 기반'],
          ]
        : [
            ['React · TypeScript', 'completed full-stack projects'],
            ['Vue.js · Next.js · Remix.js', ''],
            ['Tailwind CSS · CSS/Sass', ''],
            ['Declarative UI background', 'the basis of a fast SwiftUI transition'],
          ],
    },
    {
      title: 'Product · Ops',
      items: ko
        ? [
            ['App Store 심사·출시 11회', '리젝 대응 경험'],
            ['사용자 인터뷰·피드백 반복 개선', '5회+ 반영'],
            ['StoreKit 2 수익화 · ASO', ''],
            ['Git · GitHub Actions · Firebase', ''],
            ['Figma 기반 디자이너 협업', ''],
            ['KO·EN 로컬라이제이션', '영어 회화 가능'],
          ]
        : [
            ['11 App Store releases', 'incl. rejection handling'],
            ['User-interview-driven iteration', '5+ feedback rounds shipped'],
            ['StoreKit 2 monetization · ASO', ''],
            ['Git · GitHub Actions · Firebase', ''],
            ['Designer collaboration in Figma', ''],
            ['KO·EN localization', 'conversational English'],
          ],
    },
  ];

  const education = ko
    ? [
        ['2025.03 – 2025.12', 'Apple Developer Academy 4기 @ POSTECH', 'Apple 생태계 집중 교육 — 개발·디자인·커뮤니케이션·기획. 6개 Challenge 프로젝트 완성 (Show(X), kip!, Rootrip, WAY GYM 등). 쇼케이스 현장 운영(200+명 응대)까지 담당.'],
        ['2024.02 – 2024.09', 'Zerobase 프론트엔드 스쿨', 'React·TypeScript 기반 웹 개발 교육. 컴포넌트 아키텍처, 타입 안정성, 팀 프로젝트 협업.'],
        ['2019.03 – 2025.02', '신라대학교 컴퓨터교육과', '학사 졸업 (3.46/4.5) · 사범대 학생회 홍보부장 — 콘텐츠·이벤트 기획으로 SNS 팔로워 1만 명 성장.'],
        ['2019.12 – 2020.02', '캐나다 빅토리아대학교 어학연수', '장학생 선발 · 영어 회화 가능.'],
        ['2021.03 – 2022.09', '병역', '대한민국 육군 병장 만기제대.'],
      ]
    : [
        ['2025.03 – 2025.12', 'Apple Developer Academy 4th @ POSTECH', 'Intensive Apple-ecosystem program — development, design, communication and planning. Completed 6 challenge projects (Show(X), kip!, Rootrip, WAY GYM and more) and ran on-site showcase operations for 200+ attendees.'],
        ['2024.02 – 2024.09', 'Zerobase Frontend School', 'React/TypeScript web development — component architecture, type safety, team collaboration.'],
        ['2019.03 – 2025.02', 'Silla University, Computer Education', 'B.S. (GPA 3.46/4.5) · led college PR — grew SNS followers to 10k through content and events.'],
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
            className="grid sm:grid-cols-[1fr_auto] gap-6 pt-12 pb-8 items-start"
          >
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                {ko ? '정송헌' : 'Songheon Jeong (Dean)'}
                <span className="text-sm font-semibold text-ios-gray-400 ml-2.5">iOS Developer</span>
              </h1>
              <p className="mt-2.5 text-[14.5px] text-ios-gray-600 dark:text-ios-gray-300 max-w-xl">
                {ko ? (
                  <>2년간 <b className="text-ios-gray-900 dark:text-white">11개 앱을 App Store에 출시</b>하고 SmartEdge·ReToU를 운영 중입니다. 시스템 제약(샌드박스·TCC·윈도우 레벨)을 분석해 해결하는 macOS/iOS 개발자입니다.</>
                ) : (
                  <>Shipped <b className="text-ios-gray-900 dark:text-white">11 apps to the App Store in 2 years</b>, currently operating SmartEdge and ReToU. A macOS/iOS developer who digs into system constraints — sandbox, TCC, window levels — and resolves them.</>
                )}
              </p>
              <div className="flex flex-wrap gap-x-5 gap-y-1.5 mt-4 text-[13px] text-ios-gray-500 dark:text-ios-gray-400">
                <span>📍 {ko ? '포항, 대한민국' : 'Pohang, South Korea'}</span>
                <a href="mailto:gmlwns5504@naver.com" className="border-b border-ios-gray-200 hover:text-ios-blue hover:border-ios-blue">gmlwns5504@naver.com</a>
                <a href="https://github.com/whatdoIsa" target="_blank" rel="noopener noreferrer" className="border-b border-ios-gray-200 hover:text-ios-blue hover:border-ios-blue">github.com/whatdoIsa</a>
              </div>
            </div>
            <div className="flex sm:flex-col gap-2">
              <Link href="/resume" className="text-[13px] font-bold rounded-xl px-5 py-2.5 bg-ios-blue text-white text-center hover:bg-blue-600 transition-colors">
                {ko ? '이력서 보기 ↓' : 'Resume ↓'}
              </Link>
              <a href="https://github.com/whatdoIsa" target="_blank" rel="noopener noreferrer" className="text-[13px] font-bold rounded-xl px-5 py-2.5 border border-ios-gray-200 dark:border-ios-gray-600 text-ios-gray-600 dark:text-ios-gray-300 text-center">
                GitHub ↗
              </a>
            </div>
          </motion.div>

          {/* 팩트 스트립 */}
          <div className="grid grid-cols-2 lg:grid-cols-4 border-t border-ios-gray-100 dark:border-ios-gray-700">
            {facts.map((f, i) => (
              <div key={i} className={`py-3.5 px-1 sm:px-4 ${i > 0 ? 'lg:border-l border-ios-gray-100 dark:border-ios-gray-700' : ''}`}>
                <b className={`block text-base font-extrabold tabular-nums ${f.accent ? 'text-ios-blue' : 'text-ios-gray-900 dark:text-white'}`}>
                  {f.big}
                </b>
                <span className="text-[11.5px] text-ios-gray-400">{f.small}</span>
              </div>
            ))}
          </div>
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

      {/* ===== Skills ===== */}
      <section id="skills" className="py-14 bg-white dark:bg-ios-gray-800 border-y border-ios-gray-100 dark:border-ios-gray-700">
        <div className="container-custom max-w-4xl">
          <SectionLabel>Skills</SectionLabel>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight mb-7">
            {ko ? '기술 스택 — 나열이 아니라 근거와 함께' : 'Tech stack — with evidence, not lists'}
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {skillCols.map((col) => (
              <div key={col.title} className="bg-ios-gray-50 dark:bg-ios-gray-700/50 rounded-2xl p-5">
                <h3 className="text-[12px] font-extrabold tracking-widest uppercase text-ios-gray-400 mb-3.5">{col.title}</h3>
                <ul className="space-y-2 text-[13.5px] text-ios-gray-600 dark:text-ios-gray-300">
                  {col.items.filter(([name]) => name).map(([name, why]) => (
                    <li key={name}>
                      <b className="font-bold text-ios-gray-900 dark:text-white">{name}</b>
                      {why && <span className="text-ios-gray-500 dark:text-ios-gray-400"> — {why}</span>}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
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
            {ko ? '채용·협업 문의는 이메일로 편하게 연락 주세요. 24시간 내 회신드립니다.' : 'For hiring or collaboration, email me — I reply within 24 hours.'}
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-7">
            <a href="mailto:gmlwns5504@naver.com" className="text-sm font-bold rounded-xl px-6 py-3 bg-ios-blue text-white hover:bg-blue-600 transition-colors">
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
    <div className="text-[12px] font-extrabold tracking-[0.14em] uppercase text-ios-blue mb-2.5">{children}</div>
  );
}
