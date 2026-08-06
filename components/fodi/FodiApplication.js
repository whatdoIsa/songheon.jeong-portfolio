'use client';

import Link from 'next/link';
import { useTranslation } from '@/lib/i18n';

// FODI(새흐름) iOS Developer 맞춤 지원 페이지. 채용공고 요건을 저장소에서 확인되는 사실에만 매핑한다.
// 검증되지 않은 주장은 넣지 않는다 (docs/VERIFICATION_CHECKLIST.md 참조).
export default function FodiApplication() {
  const { locale } = useTranslation();
  const ko = (locale || 'ko') === 'ko';
  const tt = (k, e) => (ko ? k : e);

  const fit = [
    tt(
      '여러 앱을 출시까지 완주했고, 그중 SmartEdge(macOS)와 ReToU(iOS)를 지금도 직접 업데이트하며 운영합니다.',
      'I have finished several apps through release, and I still update and operate SmartEdge (macOS) and ReToU (iOS) myself.'
    ),
    tt(
      '1인 스튜디오와 팀 프로젝트 양쪽에서 기획 → 개발 → 심사 → 수익화 → 운영의 전 과정을 돌려봤습니다.',
      'Across a solo studio and team projects I have run the full cycle: planning → development → review → monetization → operations.'
    ),
    tt(
      '"동작하지 않는다"를 앱 코드·샌드박스·TCC로 나눠 로그로 진단하고(SmartEdge), 프라이버시를 정책이 아닌 아키텍처로 보장하는(kip!) 결정을 내려봤습니다.',
      'I diagnose "it doesn\'t work" by separating app code, sandbox and TCC via logs (SmartEdge), and I decide architecture that guarantees privacy structurally, not by policy (kip!).'
    ),
    tt(
      'Claude Code를 요구사항 분석부터 빌드 검증·diff 리뷰까지 검증과 함께 사용합니다. 빌드 성공만으로 완료 처리하지 않습니다.',
      'I use Claude Code from requirements to build verification and diff review — always with checks. A passing build alone is never "done".'
    ),
  ];

  // 공고 요건 ↔ 실제 경험 (저장소·App Store에서 확인되는 사실만)
  const mapping = [
    {
      req: tt('앱 설계·개발·배포·운영 전 과정', 'Design, build, ship, operate — end to end'),
      ev: tt(
        'SmartEdge: 기획 → SwiftUI/AppKit 개발 → App Store 심사 → StoreKit 2 수익화 → v1.1 업데이트·운영을 혼자 담당.',
        'SmartEdge: planning → SwiftUI/AppKit → App Store review → StoreKit 2 monetization → v1.1 updates and operations, solo.'
      ),
    },
    {
      req: tt('앱스토어 출시·유지보수', 'App Store release & maintenance'),
      ev: tt(
        'SmartEdge v1.1 · ReToU v2.0 · Show(X) · kip! 출시. 심사 리젝 대응과 버전 업데이트 경험.',
        'Shipped SmartEdge v1.1, ReToU v2.0, Show(X), kip!. Handled rejections and version updates.'
      ),
    },
    {
      req: tt('QA 프로세스 설계·실행', 'Designing & running QA'),
      ev: tt(
        'Show(X): 행사 현장에서 참가자 동선을 관찰하며 5회 반복 업데이트. SmartEdge: 실기기 QA로 샌드박스·TCC·윈도우 레벨 문제를 진단.',
        'Show(X): observed attendee flow on-site and shipped 5 iterative updates. SmartEdge: on-device QA to diagnose sandbox, TCC and window-level issues.'
      ),
    },
    {
      req: tt('AI 개발도구 워크플로 구축', 'Building an AI dev-tool workflow'),
      ev: tt(
        'Claude Code를 요구사항 분석 → 구현 계획 → 코드 작성 → 빌드/테스트 → diff 리뷰에 활용. 생성 코드를 이해한 뒤에만 병합.',
        'Use Claude Code for requirements → plan → code → build/test → diff review. Merge only after understanding generated code.'
      ),
    },
    {
      req: tt('기술 스택·아키텍처 의사결정', 'Stack & architecture decisions'),
      ev: tt(
        'SmartEdge에서 SwiftUI에 AppKit을 결합, kip!에서 온디바이스 우선, Show(X)에서 Indoor Positioning+GeoJSON을 선택한 근거를 기록.',
        'Documented why: AppKit alongside SwiftUI (SmartEdge), on-device first (kip!), Indoor Positioning + GeoJSON (Show(X)).'
      ),
    },
    {
      req: tt('SwiftUI · GitHub · Firebase', 'SwiftUI · GitHub · Firebase'),
      ev: tt(
        '전 프로젝트 SwiftUI, 저장소·배포는 GitHub, Rootrip에서 Firebase Firestore로 지도·일정·사용자 데이터 동기화.',
        'SwiftUI throughout; GitHub for repos and deploy; Firestore for map/schedule/user-data sync in Rootrip.'
      ),
    },
    {
      req: tt('Cloudflare (우대)', 'Cloudflare (preferred)'),
      ev: tt(
        'SEED의 튜터 프록시를 Cloudflare Workers로 구성한 프로토타입 경험 (학습·개발 수준).',
        'Prototyped SEED\'s tutor proxy on Cloudflare Workers (learning/dev level).'
      ),
    },
    {
      req: tt('스타트업형 문제 해결 (우대)', 'Startup-style problem solving (preferred)'),
      ev: tt(
        '1인 스튜디오로 2년간 7개 제품을 완주하고 2개를 라이브로 운영 — 좁은 범위를 빠르게 출시하고 운영으로 검증.',
        'As a solo studio, finished 7 products in two years and keep 2 live — ship a narrow scope fast and validate through operation.'
      ),
    },
    {
      req: tt('공연·행사 도메인 (우대)', 'Live-event domain (preferred)'),
      ev: tt(
        'Show(X)를 개발하고 200+명 규모 행사 현장에서 운영 — 오프라인 공간의 동선과 참가자 경험을 직접 관찰.',
        'Built Show(X) and operated it at a 200+ attendee event — observed offline flow and attendee experience first-hand.'
      ),
    },
  ];

  const projects = [
    { slug: 'smartedge', name: 'SmartEdge', platform: 'macOS',
      line: tt('노치를 워크스페이스로. SwiftUI+AppKit, StoreKit 2 수익화, App Store 출시·운영.',
               'The notch as a workspace. SwiftUI+AppKit, StoreKit 2, shipped and operated on the App Store.') },
    { slug: 'showx', name: 'Show(X)', platform: 'iOS',
      line: tt('실내 행사 내비게이션. Apple Indoor Map 국내 최초 승인, 개발 리드(50%).',
               'Indoor event navigation. Korea-first Apple Indoor Map approval; dev lead (50%).') },
    { slug: 'kip', name: 'kip!', platform: 'iOS',
      line: tt('온디바이스 AI 스크린샷 정리. 프라이버시를 아키텍처로 보장, 개발 40%.',
               'On-device AI screenshot organizer. Privacy by architecture; 40% of dev.') },
  ];

  // QA·릴리스 프로세스 — 실제 수행 vs 도입할 것 구분 (D)
  const qaDone = [
    tt('요구사항과 실패 조건 정의', 'Define requirements and failure conditions'),
    tt('구현 단위 분리', 'Split into small units'),
    tt('빌드 및 정적 오류 확인', 'Build and static-error check'),
    tt('정상·예외·경계 조건 점검', 'Check normal, exception and boundary cases'),
    tt('실기기 테스트', 'Real-device testing'),
    tt('App Store 심사 대응', 'App Store review handling'),
    tt('운영 피드백 수집 → 수정·버전 업데이트', 'Collect operational feedback → fix and version update'),
  ];
  const qaAdopt = [
    tt('회귀 점검 체크리스트 문서화', 'Document a regression checklist'),
    tt('TestFlight 배포 후보 단계 표준화', 'Standardize a TestFlight release-candidate stage'),
    tt('릴리스 노트·롤백 기준 정리', 'Define release notes and rollback criteria'),
  ];

  // AI 워크플로 (E)
  const aiFlow = [
    tt('요구사항 정리', 'Frame requirements'),
    tt('작업 범위·영향 파일 분석', 'Scope and impacted files'),
    tt('구현 계획 검토', 'Review the plan'),
    tt('작은 단위 구현', 'Implement in small units'),
    tt('build/test 실행', 'Run build/test'),
    tt('생성된 diff 직접 검토', 'Review the diff myself'),
    tt('아키텍처·예외 처리 검증', 'Verify architecture and edge cases'),
    tt('실기기 QA', 'On-device QA'),
    tt('커밋 또는 PR', 'Commit or PR'),
  ];
  const aiPrinciples = [
    tt('비즈니스 규칙과 아키텍처 결정은 직접 검토한다.', 'I review business rules and architecture decisions myself.'),
    tt('이해하지 못한 생성 코드는 병합하지 않는다.', 'I never merge generated code I don\'t understand.'),
    tt('한 번에 큰 변경보다 검증 가능한 작은 작업 단위를 쓴다.', 'I prefer small, verifiable units over large changes.'),
    tt('오류 로그와 재현 절차를 AI에 제공한다.', 'I give the AI error logs and reproduction steps.'),
    tt('빌드 성공만으로 완료 처리하지 않는다.', 'A passing build alone is not "done".'),
    tt('개인정보·인증키·환경변수는 AI 문맥에 넣지 않는다.', 'I keep personal data, secrets and env vars out of the AI context.'),
    tt('최종 품질 책임은 개발자에게 있다.', 'Final quality is the developer\'s responsibility.'),
  ];

  // 아키텍처 의사결정 요약 (F) — 상세는 케이스 페이지의 ADR로
  const decisions = [
    { slug: 'smartedge', q: tt('SwiftUI만으로 해결하지 않고 AppKit을 함께 쓴 이유', 'Why AppKit alongside SwiftUI'),
      a: tt('윈도우 레벨·드래그 대상 등록 같은 저수준 제어가 필요해, 화면은 SwiftUI·시스템 계층은 AppKit으로 분리.',
            'Low-level control (window levels, drag targets) was needed, so UI in SwiftUI and the system layer in AppKit.') },
    { slug: 'kip', q: tt('클라우드 AI보다 온디바이스 처리를 우선한 이유', 'Why on-device over cloud AI'),
      a: tt('사용자 70%가 클라우드 업로드를 기피 — 프라이버시를 정책이 아닌 구조로 보장하기 위해 온디바이스 우선.',
            '70% rejected cloud upload — on-device first to guarantee privacy structurally, not by policy.') },
    { slug: 'showx', q: tt('일반 위치 정보가 아닌 Indoor Positioning·GeoJSON을 쓴 이유', 'Why Indoor Positioning + GeoJSON, not plain location'),
      a: tt('실내에서 GPS가 무력 — 부스 단위 정밀 안내를 위해 IMDF 실내 지도와 Indoor Positioning 채택.',
            'GPS fails indoors — adopted IMDF indoor maps and Indoor Positioning for booth-level guidance.') },
    { slug: null, q: tt('Rootrip: 드로잉 데이터와 화면 좌표를 지도 좌표로 분리한 이유', 'Rootrip: separating drawing/screen coords from map coords'),
      a: tt('화면 좌표로 저장하면 확대·이동 시 어긋남 — 캔버스 좌표를 MapKit 좌표로 변환해 지도에 고정.',
            'Screen coords drift on zoom/pan — convert canvas coords to MapKit coords to pin strokes to the map.') },
  ];

  const plan = [
    { d: '30', items: [
      tt('현재 앱과 사용자 흐름 파악', 'Learn the current apps and user flows'),
      tt('코드베이스·배포 방식·장애 이력 분석', 'Study the codebase, deploy process and incident history'),
      tt('주요 사용자 시나리오와 QA 기준 정리', 'Map key user scenarios and QA criteria'),
      tt('기존 팀의 개발 방식 존중', 'Respect the team\'s existing way of working'),
    ]},
    { d: '60', items: [
      tt('우선순위 높은 기능·개선 출시', 'Ship a high-priority feature or improvement'),
      tt('회귀 테스트·릴리스 체크리스트 적용', 'Apply regression tests and a release checklist'),
      tt('AI 개발도구 사용 규칙·검증 단계 정리', 'Set AI-tool usage rules and verification steps'),
      tt('Firebase 등 데이터 흐름·오류 처리 개선 제안', 'Propose data-flow and error-handling improvements (Firebase, etc.)'),
    ]},
    { d: '90', items: [
      tt('반복 가능한 개발·QA·배포 프로세스 정착', 'Establish a repeatable dev/QA/release process'),
      tt('아키텍처 의사결정 기록 도입', 'Introduce architecture decision records'),
      tt('크래시·성능·피드백 기반 개선 사이클 운영', 'Run a crash/performance/feedback improvement cycle'),
      tt('팀 공용 Claude Code 워크플로 문서화', 'Document a shared Claude Code workflow'),
    ]},
  ];

  return (
    <div className="pt-16 bg-ios-gray-50 dark:bg-ios-gray-900 min-h-screen">
      {/* Hero / 지원 직무 요약 */}
      <header className="bg-white dark:bg-ios-gray-800 border-b border-ios-gray-100 dark:border-ios-gray-700">
        <div className="container-custom max-w-3xl py-12">
          <p className="text-[12px] font-extrabold tracking-[0.14em] uppercase text-ios-gray-400 mb-2.5">
            Application · FODI (새흐름)
          </p>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {tt('FODI iOS Developer 포지션 지원', 'Applying for the FODI iOS Developer role')}
          </h1>
          <p className="mt-3 text-[15px] text-ios-gray-600 dark:text-ios-gray-300">
            {tt(
              'SwiftUI로 앱을 설계하고 App Store 출시와 운영까지 책임져 온 iOS 개발자 정송헌입니다. 아래는 채용공고 요건을 제 실제 프로젝트에 매핑한 문서입니다.',
              'I\'m Songheon Jeong, an iOS developer who designs apps in SwiftUI and owns them through App Store release and operations. Below I map the job requirements to my actual projects.'
            )}
          </p>
          <div className="flex flex-wrap gap-2 mt-6">
            <Link href="/resume?profile=fodi-ios" className="text-[13px] font-bold rounded-xl px-5 py-2.5 bg-ios-gray-900 text-white dark:bg-white dark:text-ios-gray-900 hover:opacity-85 transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-ios-blue">
              {tt('이력서 ↓', 'Resume ↓')}
            </Link>
            <a href="mailto:gmlwns5504@naver.com" className="text-[13px] font-bold rounded-xl px-5 py-2.5 border border-ios-gray-200 dark:border-ios-gray-600 text-ios-gray-600 dark:text-ios-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ios-blue">
              gmlwns5504@naver.com
            </a>
            <a href="https://github.com/whatdoIsa" target="_blank" rel="noopener noreferrer" className="text-[13px] font-bold rounded-xl px-5 py-2.5 border border-ios-gray-200 dark:border-ios-gray-600 text-ios-gray-600 dark:text-ios-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ios-blue">
              GitHub ↗
            </a>
            <Link href="/" className="text-[13px] font-bold rounded-xl px-5 py-2.5 border border-ios-gray-200 dark:border-ios-gray-600 text-ios-gray-600 dark:text-ios-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ios-blue">
              {tt('전체 포트폴리오', 'Full portfolio')}
            </Link>
          </div>
        </div>
      </header>

      <main className="container-custom max-w-3xl py-12 space-y-14">
        {/* 적합한 이유 */}
        <Section label="Why me" title={tt('제가 이 역할에 적합한 이유', 'Why I fit this role')}>
          <ul className="space-y-2.5">
            {fit.map((f, i) => (
              <li key={i} className="relative pl-5 text-[14px] text-ios-gray-600 dark:text-ios-gray-300 before:content-[''] before:absolute before:left-0 before:top-[9px] before:w-[5px] before:h-[5px] before:rounded-full before:bg-ios-gray-400">
                {f}
              </li>
            ))}
          </ul>
        </Section>

        {/* 요건 매핑 */}
        <Section label="Requirements → Evidence" title={tt('공고 요건과 실제 경험 매핑', 'Requirements mapped to real experience')}>
          <div className="grid sm:grid-cols-2 gap-3">
            {mapping.map((m, i) => (
              <div key={i} className="bg-white dark:bg-ios-gray-800 border border-ios-gray-100 dark:border-ios-gray-700 rounded-xl p-4">
                <p className="text-[13px] font-bold text-ios-gray-900 dark:text-white">{m.req}</p>
                <p className="mt-1.5 text-[13px] text-ios-gray-600 dark:text-ios-gray-300">{m.ev}</p>
              </div>
            ))}
          </div>
          <p className="mt-3 text-[12px] text-ios-gray-400">
            {tt('※ Supabase는 사용 경험이 없어 표기하지 않았습니다. Cloudflare는 학습·프로토타입 수준으로만 적었습니다.',
                '※ No Supabase experience, so it is not listed. Cloudflare is noted only at a learning/prototype level.')}
          </p>
        </Section>

        {/* 대표 프로젝트 3 */}
        <Section label="Selected work" title={tt('대표 프로젝트', 'Representative projects')}>
          <div className="space-y-3">
            {projects.map((p) => (
              <Link key={p.slug} href={`/case/${p.slug}`} className="block bg-white dark:bg-ios-gray-800 border border-ios-gray-100 dark:border-ios-gray-700 rounded-xl p-4 hover:border-ios-gray-300 dark:hover:border-ios-gray-500 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-ios-blue">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-ios-gray-900 dark:text-white">{p.name} <span className="text-[12px] font-medium text-ios-gray-400 ml-1">{p.platform}</span></span>
                  <span className="text-[12px] font-bold text-ios-gray-500">{tt('케이스 스터디 →', 'Case study →')}</span>
                </div>
                <p className="mt-1 text-[13px] text-ios-gray-600 dark:text-ios-gray-300">{p.line}</p>
              </Link>
            ))}
          </div>
        </Section>

        {/* QA·릴리스 프로세스 (D) */}
        <Section label="Quality" title={tt('제품을 출시 가능한 상태로 만드는 방법', 'How I get a product ready to ship')}>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-ios-gray-800 border border-ios-gray-100 dark:border-ios-gray-700 rounded-xl p-4">
              <p className="text-[12px] font-extrabold text-ios-green mb-2.5">{tt('실제 수행 경험', 'Actually done')}</p>
              <ol className="space-y-1.5">
                {qaDone.map((s, i) => (
                  <li key={i} className="text-[13px] text-ios-gray-600 dark:text-ios-gray-300 flex gap-2">
                    <span className="text-ios-gray-300 tabular-nums">{i + 1}</span>{s}
                  </li>
                ))}
              </ol>
              <p className="mt-3 text-[12px] text-ios-gray-400">
                {tt('근거: SmartEdge 실기기 QA·심사 대응, Show(X) 현장 5회 업데이트, ReToU 피드백 3회 반영.',
                    'Basis: SmartEdge device QA and review handling, 5 in-event Show(X) updates, 3 ReToU feedback rounds.')}
              </p>
            </div>
            <div className="bg-white dark:bg-ios-gray-800 border border-ios-gray-100 dark:border-ios-gray-700 rounded-xl p-4">
              <p className="text-[12px] font-extrabold text-ios-gray-400 mb-2.5">{tt('팀에 도입할 프로세스', 'To bring to the team')}</p>
              <ul className="space-y-1.5">
                {qaAdopt.map((s, i) => (
                  <li key={i} className="text-[13px] text-ios-gray-600 dark:text-ios-gray-300 relative pl-4 before:content-['+'] before:absolute before:left-0 before:text-ios-gray-300">{s}</li>
                ))}
              </ul>
              <p className="mt-3 text-[12px] text-ios-gray-400">
                {tt('아직 팀 규모로 운영해보지 않은 항목은 "도입할 것"으로 구분해 정직하게 표기했습니다.',
                    'Items I have not yet run at team scale are honestly marked as "to adopt".')}
              </p>
            </div>
          </div>
        </Section>

        {/* AI 워크플로 (E) */}
        <Section label="AI workflow" title={tt('AI를 사용하지만 품질 책임은 개발자가 집니다', 'I use AI, but the developer owns quality')}>
          <div className="flex flex-wrap gap-1.5 mb-4">
            {aiFlow.map((s, i) => (
              <span key={i} className="inline-flex items-center gap-1.5 text-[12.5px] text-ios-gray-600 dark:text-ios-gray-300 bg-white dark:bg-ios-gray-800 border border-ios-gray-100 dark:border-ios-gray-700 rounded-full px-3 py-1">
                {s}{i < aiFlow.length - 1 && <span className="text-ios-gray-300" aria-hidden="true">→</span>}
              </span>
            ))}
          </div>
          <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5">
            {aiPrinciples.map((p, i) => (
              <li key={i} className="text-[13px] text-ios-gray-600 dark:text-ios-gray-300 relative pl-4 before:content-['·'] before:absolute before:left-0 before:text-ios-gray-400">{p}</li>
            ))}
          </ul>
        </Section>

        {/* 아키텍처 의사결정 (F) */}
        <Section label="Architecture decisions" title={tt('왜 그렇게 만들었는가', 'Why I built it that way')}>
          <div className="grid sm:grid-cols-2 gap-3">
            {decisions.map((d, i) => (
              <div key={i} className="bg-white dark:bg-ios-gray-800 border border-ios-gray-100 dark:border-ios-gray-700 rounded-xl p-4">
                <p className="text-[13px] font-bold text-ios-gray-900 dark:text-white">{d.q}</p>
                <p className="mt-1.5 text-[13px] text-ios-gray-600 dark:text-ios-gray-300">{d.a}</p>
                {d.slug && (
                  <Link href={`/case/${d.slug}`} className="inline-block mt-2 text-[12px] font-bold text-ios-gray-500 hover:text-ios-gray-900 dark:hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-ios-blue">
                    {tt('전체 의사결정 기록 →', 'Full decision record →')}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </Section>

        {/* 공연·행사 도메인 (K) */}
        <Section label="Live-event domain" title={tt('기술이 오프라인 경험으로 이어질 때', 'When software reaches an offline experience')}>
          <p className="text-[14px] text-ios-gray-600 dark:text-ios-gray-300 leading-relaxed">
            {tt(
              'Show(X)를 개발하고 행사 현장에서 운영하며, 기술이 오프라인 공간의 동선과 참가자 경험에 직접 영향을 준다는 것을 배웠습니다. 200명 이상이 오가는 공간에서 어떤 화면이 실제로 도움이 되고 어떤 안내가 혼란을 주는지를 직접 관찰했고, 운영자와 참가자의 요구를 동시에 고려해 5회 업데이트로 반영했습니다. FODI에서도 기능 구현 자체보다, 사용자의 실제 연습과 퍼포먼스 경험으로 이어지는 제품을 만들고 싶습니다.',
              'Building and operating Show(X) at a live event taught me that software directly shapes offline flow and attendee experience. In a space with 200+ people, I observed which screens actually helped and which guidance caused confusion, and folded that into 5 updates that balanced operators\' and attendees\' needs. At FODI I want to build products that reach real practice and performance, not just feature implementation.'
            )}
          </p>
        </Section>

        {/* 90일 계획 (L) */}
        <Section label="First 90 days" title={tt('입사 후 30 · 60 · 90일 계획', 'A 30 / 60 / 90 day plan')}>
          <div className="grid sm:grid-cols-3 gap-3">
            {plan.map((col) => (
              <div key={col.d} className="bg-white dark:bg-ios-gray-800 border border-ios-gray-100 dark:border-ios-gray-700 rounded-xl p-4">
                <p className="text-lg font-extrabold text-ios-gray-900 dark:text-white">{col.d}<span className="text-[12px] font-semibold text-ios-gray-400 ml-1">{tt('일', 'days')}</span></p>
                <ul className="mt-2.5 space-y-1.5">
                  {col.items.map((it, i) => (
                    <li key={i} className="text-[12.5px] text-ios-gray-600 dark:text-ios-gray-300 relative pl-3.5 before:content-[''] before:absolute before:left-0 before:top-[8px] before:w-[4px] before:h-[4px] before:rounded-full before:bg-ios-gray-300">{it}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-3 text-[12px] text-ios-gray-400">
            {tt('초기 스타트업 규모에 맞춰, 거창한 조직 개편이 아니라 반복 가능한 실무 프로세스에 초점을 맞췄습니다.',
                'Sized for an early startup: not a big reorg, but repeatable, practical process.')}
          </p>
        </Section>

        {/* 이력서·연락처 */}
        <Section label="Contact" title={tt('이력서와 연락처', 'Resume & contact')}>
          <div className="flex flex-wrap gap-2">
            <Link href="/resume?profile=fodi-ios" className="text-[13px] font-bold rounded-xl px-5 py-2.5 bg-ios-gray-900 text-white dark:bg-white dark:text-ios-gray-900 hover:opacity-85 transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-ios-blue">
              {tt('이력서 열기', 'Open resume')}
            </Link>
            <a href="mailto:gmlwns5504@naver.com" className="text-[13px] font-bold rounded-xl px-5 py-2.5 border border-ios-gray-200 dark:border-ios-gray-600 text-ios-gray-600 dark:text-ios-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ios-blue">
              {tt('이메일 보내기', 'Send email')}
            </a>
          </div>
          <p className="mt-3 text-[12px] text-ios-gray-400">
            {tt('전화번호는 이력서를 PDF로 저장하면 포함됩니다 (공개 웹에는 노출하지 않습니다).',
                'The phone number is included when you save the resume as PDF (not exposed on the public web).')}
          </p>
        </Section>
      </main>
    </div>
  );
}

function Section({ label, title, children }) {
  return (
    <section>
      <p className="text-[12px] font-extrabold tracking-[0.14em] uppercase text-ios-gray-400 mb-2">{label}</p>
      <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight mb-5">{title}</h2>
      {children}
    </section>
  );
}
