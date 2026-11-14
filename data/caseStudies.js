// 케이스 스터디 데이터 — 메인 페이지(P-A-R 카드)와 상세 페이지(문서형)가 공유하는 단일 소스.
// 텍스트 필드는 { ko, en } 이중언어 객체. 수치는 실제 테스트/운영 데이터 기준.

export const caseStudies = [
  {
    slug: 'chatbot',
    name: '자연어 질의 챗봇',
    nameEn: 'Natural-Language Query Chatbot',
    icon: { text: 'SQL', bg: '#111827', color: '#FFFFFF' },
    platform: 'Web · AI',
    featured: true,
    period: '2026.11',
    status: { ko: 'PoC · 연구', en: 'PoC · study' },
    badge: { ko: '정확도 개선 연구', en: 'Accuracy study' },
    role: {
      ko: '개인 프로젝트 — 기획·백엔드·프론트·평가 100%',
      en: 'Solo project. Planning, backend, frontend and evaluation, 100%.',
    },
    oneLiner: {
      ko: '한국어 질문을 로컬 LLM이 SQL로 바꿔 답하는 풀스택 챗봇. 핵심은 "정확도를 측정하고 단계적으로 끌어올린 과정"이다.',
      en: 'A full-stack chatbot where a local LLM turns Korean questions into SQL. The core is measuring accuracy and raising it step by step.',
    },
    stack: ['Java 21', 'Spring Boot 3.5', 'PostgreSQL 16', 'MyBatis', 'React · TypeScript · Vite', '로컬 LLM(Ollama)'],
    shots: [],
    links: {},
    problem: {
      ko: 'LLM이 한국어 질문을 SQL로 바꿀 때 정확도가 낮았고, 더 큰 문제는 "무엇이 맞는지"조차 측정되지 않아 개선의 기준이 없었다는 점이다.',
      en: 'The LLM was inaccurate at turning Korean questions into SQL, and the bigger problem was that "what counts as correct" was never measured, so there was no baseline to improve against.',
    },
    actions: {
      ko: [
        '정답을 값으로 채점하는 평가 체계부터 구축 — 질문 세트를 SHA-256으로 동결하고 SQL 문자열이 아닌 실행 결과값으로 채점(temperature 0·seed 42로 재현성 확보). 스키마만 준 기준선은 30문항 중 7문항 정답이었다.',
        '오답을 원인별로 분류해 가장 많던 날짜 해석·지표 정의 오류에 기준일·지표 사전·예시를 주입 — 기본 세트가 7 → 22/30으로 올랐다(기간 집계 유형 0/8 → 7/8).',
        '프롬프트로는 고쳐지지 않던 지표 계산을 서버 고정 쿼리(도구)+라우터로 이관 — 모델은 도구와 인자만 고르고 계산은 서버가 수행. 구현 전 동결한 홀드아웃 20문항이 13 → 16, 도구 경로로 간 지표 질문은 전수 정답(7/7)이었다.',
      ],
      en: [
        'Built a result-value grader first: froze the question set with SHA-256 and graded by execution result value, not SQL text (reproducible at temperature 0 / seed 42). A schema-only baseline scored 7 of 30.',
        'Classified wrong answers by cause and injected a reference date, metric dictionary and examples for the most common date/metric errors — the basic set rose 7 → 22/30 (period-aggregation type 0/8 → 7/8).',
        'Moved metric calculations that prompting could not fix into server fixed-queries (tools) + a router — the model only picks the tool and arguments while the server computes. A holdout of 20 questions frozen before implementation went 13 → 16, with every tool-routed metric question correct (7/7).',
      ],
    },
    result: {
      ko: '정확도를 감이 아니라 숫자로 끌어올린 과정을 남겼다. 오히려 점수가 떨어진 변경(SQL 검증·재시도)과 "숫자 후검증 통과율 100%가 정답을 뜻하지 않는다"는 것까지 그대로 기록해, 성능 개선과 한계를 함께 증거로 보유한다.',
      en: 'The accuracy gains are documented as numbers, not hunches. Even the change that lowered scores (SQL validation + retry) and the finding that "100% number-post-check pass does not mean correct" are recorded as-is, so the improvements and their limits are both evidenced.',
    },
    architecture: {
      lines: [
        '한국어 질문',
        '↓ 라우터 (SQL 생성 · 되묻기 · 거부 · 지표 도구)',
        'SQL 경로: 생성 → 검증 → 읽기 전용 실행   |   지표 경로: 서버 고정 쿼리',
        '↓',
        '실행 결과값 채점 (동결 골든셋 · temp0 · seed42)',
      ],
    },
    decision: {
      context: { ko: '"일평균 = 기간 합 ÷ 일수"라고 프롬프트에 적어도 모델이 계속 AVG(qty)로 계산해 틀렸다.', en: 'Even with "daily average = period sum ÷ days" in the prompt, the model kept computing AVG(qty) and getting it wrong.' },
      decision: { ko: '지표 계산을 모델에서 떼어내 서버의 고정 쿼리(도구)로 옮기고, 모델은 도구 선택과 인자만 담당하게 했다.', en: 'Pulled metric computation out of the model into server-side fixed queries (tools); the model only chooses the tool and its arguments.' },
      alternatives: { ko: '지표 정의를 더 자세히 적기 / 더 큰 모델로 교체 / RAG 도입.', en: 'Write metric definitions in more detail, swap in a larger model, or add RAG.' },
      tradeoff: { ko: '질문당 LLM 호출이 1~4회로 늘어 응답이 1.1~1.7배 느려지지만, 틀리던 계산이 정확해진다.', en: 'LLM calls per question rise to 1–4, making responses 1.1–1.7× slower, but the previously wrong calculations become correct.' },
      result: { ko: '동결 홀드아웃 13 → 16, 도구 경로 지표 질문 전수 정답(7/7).', en: 'Frozen holdout 13 → 16, every tool-routed metric question correct (7/7).' },
    },
    troubleshooting: [
      {
        title: { ko: '프롬프트로 안 되던 계산을 아키텍처로 옮기다', en: 'Solving in architecture what prompting could not' },
        found: { ko: '"일평균을 AVG(qty)로 쓰지 말라"고 프롬프트에 적어도 세 버전 모두 AVG(qty)를 썼다.', en: 'Despite "do not use AVG(qty) for the daily average" in the prompt, all three versions used AVG(qty).' },
        analysis: { ko: '틀리는 지점이 계산식 자체였고, 틀린 계산은 오류 없이 실행되므로 재시도로도 잡히지 않았다.', en: 'The error was in the formula itself, and a wrong calculation runs without error, so retries never caught it.' },
        fix: { ko: '지표 계산을 서버 고정 쿼리(도구)로 이관하고 모델은 도구·인자만 선택하게 했다. 지표 정의는 회사마다 고정이라 코드로 두는 것이 맞다는 판단.', en: 'Moved metric computation to server fixed-queries (tools) with the model only selecting tool and arguments — metric definitions are company-fixed, so they belong in code.' },
        learned: { ko: '프롬프트로 안 되는 건 아키텍처로 푼다. 단, 도구 경로에서 "재주문점 질문을 재주문-필요 도구로 보내는" 새 오답도 생겨, 측정 없이는 개선을 확신할 수 없음을 확인했다.', en: 'What prompting cannot fix, architecture can — but new errors appeared too (routing a "reorder point" question to the "needs reorder" tool), confirming you cannot be sure of an improvement without measuring it.' },
      },
    ],
    resultTiles: [
      { big: { ko: '7 → 22', en: '7 → 22' }, small: { ko: '기본 세트(30문항) 정답 · 지식 주입 후', en: 'Basic set (30) correct · after knowledge injection' } },
      { big: { ko: '13 → 16', en: '13 → 16' }, small: { ko: '동결 홀드아웃 20문항 · 지표 도구화 후', en: 'Frozen holdout (20) · after tool routing' } },
      { big: { ko: '7/7', en: '7/7' }, small: { ko: '도구 경로 지표 질문 전수 정답', en: 'All tool-routed metric questions correct' } },
    ],
  },
  {
    slug: 'seed',
    name: 'SEED',
    icon: { img: '/images/icons/seed.png', text: 'S', bg: '#6B4EFF', color: '#FFFFFF' },
    platform: 'iOS',
    featured: true,
    period: '2026 –',
    status: { ko: '출시 · 운영 중', en: 'Live' },
    badge: { ko: '엔진 단위 테스트 102', en: '102 engine unit tests' },
    role: {
      ko: '개인 프로젝트 — 기획·개발·디자인 100%',
      en: 'Solo project. Planning, development and design, 100%.',
    },
    oneLiner: {
      ko: '가상 합성 시장에서 투자 습관을 훈련하는 주식 학습 앱. 종목 추천·수익 보장 없이, 광고·가입 없이 — "연습으로 지표를 보는 눈을 기른다"는 철학을 제품 전체에 관철.',
      en: 'A stock-learning app that trains investing habits in a fully synthetic market with no stock picks, no profit promises, no ads and no sign-up — practice builds the eye for the numbers.',
    },
    stack: ['SwiftUI', 'Swift Package (엔진 분리)', 'SwiftData · CloudKit', 'WidgetKit', 'StoreKit 2'],
    shots: [
      { src: '/images/projects/seed/market.png', caption: { ko: '시장 — 진짜 돈 0원으로 매매 연습', en: 'Market: practice trading with zero real money' } },
      { src: '/images/projects/seed/lesson.png', caption: { ko: '레슨 — 직접 해보는 12편 커리큘럼', en: 'Lessons: a hands-on 12-part curriculum' } },
      { src: '/images/projects/seed/review.png', caption: { ko: '복기 — 나쁜 습관을 짚어주는 피드백', en: 'Review: feedback that flags bad habits' } },
    ],
    links: {
      appstore: { url: 'https://apps.apple.com/kr/app/seed-%ED%88%AC%EC%9E%90-%EC%97%B0%EC%8A%B5%EC%9E%A5/id6789554674', label: { ko: 'App Store', en: 'App Store' } },
      github: { url: 'https://github.com/whatdoIsa/SEED', label: { ko: 'GitHub', en: 'GitHub' } },
    },
    problem: {
      ko: '초보자가 실제 돈을 걸지 않고 호가·수수료·상하한가 같은 매매 규칙을 안전하게 연습할 곳이 없다. 추천과 수익을 약속하는 앱들은 학습보다 투기를 부추긴다.',
      en: 'Beginners have nowhere safe to practice trading rules — order books, fees, price limits — without risking real money, and apps that promise picks and profits push speculation over learning.',
    },
    actions: {
      ko: [
        "'종목 추천·수익 약속·광고·가입 없음, 완전한 가상 시장'이라는 원칙을 기획 단계에서 못 박고, 12편 학습 커리큘럼과 연습 흐름을 설계했다.",
        '호가창 매칭·수수료·상하한가 같은 거래 제도 로직을 별도 Swift 패키지 엔진으로 분리하고, 단위 테스트 102개로 회귀 안정성을 확보했다.',
        'SwiftData·CloudKit 로컬 우선 저장과 iCloud 백업, WidgetKit 위젯, StoreKit 2까지 1인으로 설계·출시·운영했다.',
      ],
      en: [
        'Fixed the principles up front — no picks, no profit promises, no ads, no sign-up, a fully synthetic market — and designed a 12-lesson curriculum and practice flow around them.',
        'Isolated the trading-rule logic (order-book matching, fees, price limits) into a separate Swift package engine, with 102 unit tests for regression stability.',
        'Built local-first SwiftData/CloudKit storage with iCloud backup, WidgetKit widgets and StoreKit 2 — designed, shipped and operated solo.',
      ],
    },
    result: {
      ko: '제약 규칙을 테스트 가능한 엔진으로 분리해 풀 사이즈 프로덕트를 1인으로 완주·운영 중. 규칙·제약을 모델링하고 검증으로 지키는, 규칙·제약이 많은 최적화에 가장 가까운 사고방식을 담았다.',
      en: 'A full-size product shipped and operated solo by isolating the constraint rules into a testable engine — modeling rules and holding them with tests, the mindset closest to rule-and-constraint-heavy optimization.',
    },
    architecture: {
      lines: [
        'SwiftUI 뷰 (시장 · 레슨 · 복기)',
        '↓',
        '거래 엔진 (Swift Package) — 호가 매칭 · 수수료 · 상하한가',
        '↓ 단위 테스트 102',
        'SwiftData · CloudKit 로컬 저장 / iCloud 백업',
      ],
    },
    decision: {
      context: { ko: '거래 제도 로직이 뷰에 섞이면 수수료·상하한가 규칙을 바꿀 때마다 회귀가 터졌다.', en: 'With trading-rule logic mixed into the views, every change to fees or price limits risked regressions.' },
      decision: { ko: '거래 규칙을 별도 Swift 패키지 엔진으로 분리하고 단위 테스트로 고정했다.', en: 'Isolated the trading rules into a separate Swift package engine, pinned by unit tests.' },
      alternatives: { ko: '뷰모델에 로직 유지 / 서버에서 계산.', en: 'Keep the logic in view models, or compute it on a server.' },
      tradeoff: { ko: '패키지 분리와 테스트 작성 비용이 들지만, 규칙 변경 회귀를 테스트로 차단한다.', en: 'Splitting the package and writing tests costs effort, but regressions from rule changes are caught by tests.' },
      result: { ko: '단위 테스트 102개로 거래 엔진 회귀 안정성을 확보하고 1인으로 완주했다.', en: '102 unit tests secured regression stability for the trading engine, completed solo.' },
    },
    troubleshooting: [
      {
        title: { ko: '거래 제도 로직을 UI에서 떼어내다', en: 'Separating trading rules from the UI' },
        found: { ko: '호가 매칭·수수료·상하한가 규칙이 뷰 코드에 섞여 있어 변경할 때마다 예기치 못한 회귀가 발생했다.', en: 'Order-book, fee and price-limit rules were tangled into view code, so each change caused unexpected regressions.' },
        analysis: { ko: '제약 로직은 입력→출력이 결정적이라 UI와 분리해 단위 테스트로 고정할 수 있는 영역이었다.', en: 'The constraint logic is deterministic input→output, so it could be separated from the UI and pinned with unit tests.' },
        fix: { ko: '거래 엔진을 별도 Swift 패키지로 분리하고 호가·수수료·상하한가 규칙에 단위 테스트 102개를 붙여 회귀를 잡았다.', en: 'Moved the trading engine into a separate Swift package and added 102 unit tests over the order-book/fee/price-limit rules to catch regressions.' },
        learned: { ko: '규칙이 많은 도메인일수록 로직을 UI에서 떼어 테스트 가능한 모듈로 두는 것이 안정성의 핵심이다.', en: 'The more rule-heavy the domain, the more stability comes from pulling logic out of the UI into a testable module.' },
      },
    ],
    resultTiles: [
      { big: { ko: '102', en: '102' }, small: { ko: '거래 엔진 단위 테스트', en: 'Trading-engine unit tests' } },
      { big: { ko: '12편', en: '12' }, small: { ko: '학습 커리큘럼', en: 'Lesson curriculum' } },
      { big: { ko: '1인', en: 'Solo' }, small: { ko: '기획·개발·디자인·출시 완주', en: 'Planned, built, designed, shipped' } },
    ],
  },
  {
    slug: 'showx',
    name: 'Show(X)',
    icon: { img: '/images/icons/showx.png', text: 'X', bg: '#3182F6', color: '#FFFFFF' },
    platform: 'iOS',
    featured: true,
    period: '2025.09 – 2025.11',
    status: { ko: '출시', en: 'Live' },
    badge: { ko: '내비게이션 차트 #37', en: 'Navigation chart #37' },
    role: {
      ko: '팀 6인 / 개발 리드 (전체 개발의 50% 담당)',
      en: 'Team of 6 / development lead (50% of total development)',
    },
    oneLiner: {
      ko: '쇼케이스 2025 전용 실내지도 내비게이션 앱. 행사 참가자에게 부스 위치·동선·일정 정보를 제공. Apple Indoor Map 국내 최초 승인.',
      en: 'An indoor-map navigation app for Showcase 2025, guiding attendees to booths, routes and schedules. Korea\'s first approved Apple Indoor Map.',
    },
    stack: ['SwiftUI', 'MapKit', 'Indoor Positioning', 'GeoJSON', 'SwiftData', 'Localization'],
    shots: [],
    links: {
      appstore: { url: 'https://apps.apple.com/kr/app/showx/id6755496321', label: { ko: 'App Store', en: 'App Store' } },
    },
    problem: {
      ko: '실내 행사장에서 GPS 무력화 — 참가자 200+명이 부스 위치를 못 찾고 안내 인력에 문의가 몰려 행사 운영이 병목. 실내 지도는 Apple 승인 절차부터 국내 선례가 없어 참고할 레퍼런스 자체가 없는 도메인.',
      en: 'GPS is useless indoors, so 200+ attendees couldn\'t find booths, and inquiries overwhelmed the guidance staff. Indoor maps had no Korean precedent, from Apple\'s approval process on down; there was no reference to follow.',
    },
    actions: {
      ko: [
        'Apple의 실내 지도 데이터 규격에 맞춰 행사장을 층/구역/부스 단위로 GeoJSON 데이터 모델링하고, 제출부터 승인까지의 프로세스를 직접 뚫어 Apple Indoor Map 국내 최초 승인 획득.',
        'MapKit Indoor Positioning API + 커스텀 오버레이 렌더링으로 실내 지도 모듈을 SwiftUI로 단독 개발. 카테고리 필터 검색·일정·팀 정보 연동.',
        '행사 현장에서 참가자 동선을 직접 관찰하며 운영 기간 중 5회 업데이트로 반복 개선. 기획·디자이너 6인과 Figma 협업, 한/영 로컬라이제이션 완료.',
      ],
      en: [
        'Modeled the venue as floor/zone/booth GeoJSON to Apple\'s indoor-map data spec and drove the submission-to-approval process myself, earning Korea\'s first Apple Indoor Map approval.',
        'Single-handedly built the indoor map module in SwiftUI on MapKit\'s Indoor Positioning API with custom overlay rendering; wired up category-filtered search, schedules and team info.',
        'Observed attendee movement on site and shipped 5 iterative updates during the event; collaborated with 6 planners/designers via Figma and completed KO/EN localization.',
      ],
    },
    result: {
      ko: '행사 기간 현장 안내 문의 40% 감소 — 운영 병목을 앱으로 직접 해소. App Store 내비게이션 차트 #37. 선례 없는 도메인을 조사→모델링→승인→운영까지 완주한 경험.',
      en: 'On-site guidance inquiries dropped 40% during the event; the app itself relieved the operational bottleneck. Reached #37 on the App Store navigation chart. Took an unprecedented domain from research → modeling → approval → operations.',
    },
    architecture: {
      lines: [
        'IMDF/GeoJSON venue data (floor · zone · booth)',
        '↓ decode & validate',
        'IndoorMapService: overlay build / level switch / positioning',
        '↓',
        'SwiftUI MapView (custom overlays · search · schedule)',
      ],
    },
    decision: {
      context: { ko: '실내 행사장은 GPS가 무력하고, 부스 단위의 정밀한 위치 안내가 필요했다.', en: 'GPS is useless indoors, and the venue needed booth-level precise guidance.' },
      decision: { ko: '일반 CLLocation 대신 MapKit Indoor Positioning과 GeoJSON(IMDF) 기반 실내 지도를 채택했다.', en: 'Chose MapKit Indoor Positioning with a GeoJSON (IMDF) indoor map instead of plain CLLocation.' },
      alternatives: { ko: 'GPS + 수동 보정 / 별도 비콘 하드웨어 설치.', en: 'GPS with manual correction, or installing separate beacon hardware.' },
      tradeoff: { ko: 'Apple 승인 절차와 데이터 모델링 비용이 크지만, 정밀한 실내 안내와 표준 지도 경험을 얻는다.', en: 'Apple\'s approval process and data modeling cost more, but you get precise indoor guidance and a standard map experience.' },
      result: { ko: '국내 최초 Apple Indoor Map 승인을 받았고, 현장 안내 문의가 40% 줄었다.', en: 'Earned Korea\'s first Apple Indoor Map approval and cut on-site guidance inquiries by 40%.' },
    },

    troubleshooting: [
      {
        title: { ko: '선례 없는 Indoor Map 승인 프로세스', en: 'An approval process with no precedent' },
        found: {
          ko: '국내 승인 사례가 없어 데이터 규격 해석부터 검증 실패 원인까지 모든 것을 직접 확인해야 했다.',
          en: 'With no prior Korean approval, everything from interpreting the data spec to debugging validation failures had to be figured out first-hand.',
        },
        analysis: {
          ko: '실내 지도 데이터의 좌표계 정합과 층/구역/부스 계층 구조가 Apple 검증기의 요구사항과 어긋나는 지점을 반복 제출로 좁혀 나갔다.',
          en: 'Narrowed down where our coordinate alignment and floor/zone/booth hierarchy diverged from Apple\'s validator through repeated submissions.',
        },
        fix: {
          ko: 'GeoJSON 데이터 모델을 규격에 맞게 재설계하고 검증-수정 사이클을 짧게 돌려 승인 획득. 이후 운영 중 5회 업데이트로 현장 데이터를 반영.',
          en: 'Redesigned the GeoJSON model to spec and ran tight validate-fix cycles until approval; five in-event updates then folded in real-world data.',
        },
        learned: {
          ko: '레퍼런스가 없는 도메인은 공식 규격 문서와 검증기의 피드백이 유일한 나침반 — 제출 사이클을 짧게 가져가는 것이 답이다.',
          en: 'In a domain without references, the official spec and validator feedback are the only compass; short submission cycles are the answer.',
        },
      },
    ],
    resultTiles: [
      { big: { ko: '-40%', en: '-40%' }, small: { ko: '현장 안내 문의 (참가자 200+명)', en: 'On-site inquiries (200+ attendees)' } },
      { big: { ko: '국내 최초', en: 'Korea-first' }, small: { ko: 'Apple Indoor Map 승인', en: 'Apple Indoor Map approval' } },
      { big: { ko: '#37', en: '#37' }, small: { ko: 'App Store 내비게이션 차트', en: 'App Store navigation chart' } },
    ],
  },

  {
    slug: 'kip',
    name: 'kip!',
    icon: { img: '/images/icons/kip.png', text: 'k!', bg: '#F5B301', color: '#191F28' },
    platform: 'iOS',
    featured: true,
    period: '2025.09 – 2025.11',
    status: { ko: '출시', en: 'Live' },
    badge: { ko: '생산성 차트 #66', en: 'Productivity chart #66' },
    role: {
      ko: '팀 6인 / 개발 3인 중 1인 (전체 개발의 40% 담당)',
      en: 'Team of 6 / 1 of 3 developers (40% of total development)',
    },
    oneLiner: {
      ko: '온디바이스 AI 기반 스크린샷 자동 정리 생산성 앱. 서버 전송 없는 로컬 처리로 프라이버시를 보장.',
      en: 'An on-device-AI productivity app that auto-organizes screenshots with fully local processing, nothing sent to a server.',
    },
    stack: ['SwiftUI', 'Apple Intelligence', 'Foundation Model', 'Vision', 'SwiftData', 'Combine'],
    shots: [],
    links: {
      appstore: { url: 'https://apps.apple.com/kr/app/kip/id6754709167', label: { ko: 'App Store', en: 'App Store' } },
    },
    problem: {
      ko: '테스트 사용자 15명의 평균 스크린샷 보관량 300+장 — 필요한 정보를 다시 찾는 데 평균 5분. 기존 클라우드 AI 정리 앱은 "내 스크린샷이 서버로 올라간다"는 우려로 기피율 70%. 정확도와 프라이버시를 동시에 만족해야 사용되는 문제.',
      en: '15 test users kept 300+ screenshots on average and spent ~5 minutes re-finding information. Cloud-AI organizers were rejected by 70% over "my screenshots leave my phone" concerns. The product had to satisfy accuracy and privacy at once.',
    },
    actions: {
      ko: [
        'Vision 프레임워크로 스크린샷의 텍스트·객체를 인식하고 Apple Intelligence Writing Tools API로 분류하는 온디바이스 파이프라인 구현 — 분류 정확도 85%. 날짜·시간·메모 자동 추출과 위치 기반 리마인더 알림까지 연결.',
        'SwiftData 로컬 저장 기반으로 서버 전송이 물리적으로 없는 아키텍처를 설계해 프라이버시 우려를 구조적으로 제거.',
        'Apple Intelligence 미지원 기기를 위해 Gemini·GPT 선택형 폴백 경로를 도입, 지원 기기 격차 문제 해결. Combine으로 대량 이미지 비동기 처리 최적화.',
      ],
      en: [
        'Built an on-device pipeline (Vision recognizes text/objects, Apple Intelligence Writing Tools classifies) reaching 85% accuracy, with automatic date/time/memo extraction and location-based reminders.',
        'Designed a SwiftData-local architecture where server transmission is physically absent, structurally removing the privacy concern.',
        'Added an opt-in Gemini/GPT fallback for devices without Apple Intelligence, closing the device-support gap; optimized bulk-image async processing with Combine.',
      ],
    },
    result: {
      ko: '스크린샷 정리 시간 60% 단축 (5분 → 2분). "서버 전송이 없어 안심된다" 만족도 95% — 프라이버시가 실제 선택 이유가 됨을 검증. App Store 생산성 차트 #66.',
      en: 'Cut organizing time 60% (5 → 2 min). 95% satisfaction on "no server upload feels safe", validating privacy as a real purchase reason. Reached #66 on the App Store productivity chart.',
    },
    architecture: {
      lines: [
        'PhotoKit screenshots',
        '↓ Vision (text · object recognition)',
        'Apple Intelligence classification, fallback: Gemini / GPT (opt-in)',
        '↓',
        'SwiftData local store → notifications · search · collections',
      ],
    },
    decision: {
      context: { ko: '스크린샷 분류 정확도가 필요했지만, 사용자의 70%가 스크린샷의 클라우드 업로드를 강하게 기피했다.', en: 'Classification accuracy was needed, but 70% of users strongly rejected uploading screenshots to the cloud.' },
      decision: { ko: '클라우드 모델 대신 온디바이스(Vision + Apple Intelligence)를 우선하고, 미지원 기기에서만 사용자가 명시적으로 선택할 때 외부 모델을 쓰게 했다.', en: 'Prioritized on-device (Vision + Apple Intelligence) over cloud models, using external models only as an explicit opt-in on unsupported devices.' },
      alternatives: { ko: '클라우드 API 단일 구성 / 온디바이스 단일 구성.', en: 'A cloud-API-only design, or an on-device-only design.' },
      tradeoff: { ko: '온디바이스는 기기별 편차와 정확도 상한이 있지만, 프라이버시를 정책이 아닌 아키텍처로 보장한다.', en: 'On-device has device variance and an accuracy ceiling, but it guarantees privacy through architecture, not policy.' },
      result: { ko: '분류 정확도 85%를 확보했고 "서버 전송 없음" 만족도가 95%였다.', en: 'Reached 85% classification accuracy with 95% satisfaction on "nothing sent to a server."' },
    },

    troubleshooting: [
      {
        title: { ko: '정확도와 프라이버시는 트레이드오프가 아니다', en: 'Accuracy vs privacy is a false trade-off' },
        found: {
          ko: '클라우드 모델을 쓰면 정확도는 오르지만 기피율 70%의 원인이 그대로 남는다. 온디바이스만으로 사용 가능한 정확도가 나오는지가 관건이었다.',
          en: 'Cloud models raise accuracy but keep the very reason 70% of users refused. The question was whether on-device alone could reach usable accuracy.',
        },
        analysis: {
          ko: 'Vision의 인식 결과를 그대로 분류에 쓰면 노이즈가 많았다. 인식 → 정제 → 분류 단계를 분리하고 각 단계를 측정하며 병목을 찾았다.',
          en: 'Feeding raw Vision output into classification was noisy. Splitting recognize → refine → classify and measuring each stage exposed the bottleneck.',
        },
        fix: {
          ko: 'Writing Tools API 기반 분류 전 정제 단계를 넣어 정확도 85%를 달성. 미지원 기기는 사용자가 명시적으로 선택할 때만 외부 모델(Gemini/GPT)을 쓰도록 경계를 그었다.',
          en: 'A refinement pass before Writing-Tools classification lifted accuracy to 85%. External models (Gemini/GPT) run only when users explicitly opt in on unsupported devices.',
        },
        learned: {
          ko: '프라이버시는 정책이 아니라 아키텍처로 보장할 때 사용자 신뢰(만족도 95%)로 돌아온다.',
          en: 'Privacy guaranteed by architecture, not policy, comes back as user trust (95% satisfaction).',
        },
      },
    ],
    resultTiles: [
      { big: { ko: '-60%', en: '-60%' }, small: { ko: '정리 시간 (5분 → 2분)', en: 'Organizing time (5 → 2 min)' } },
      { big: { ko: '95%', en: '95%' }, small: { ko: '"안심된다" 만족도 (테스트 15명)', en: '"Feels safe" (15 testers)' } },
      { big: { ko: '#66', en: '#66' }, small: { ko: 'App Store 생산성 차트', en: 'App Store productivity chart' } },
    ],
  },

  {
    slug: 'retou',
    name: 'ReToU — 오늘의 넌',
    nameEn: 'ReToU',
    icon: { img: '/images/icons/retou.png', text: '乚', bg: '#8B6F52', color: '#FFFFFF' },
    platform: 'iOS',
    featured: false,
    period: '2025.04 –',
    status: { ko: '출시 · v2.0 운영 중', en: 'Live · v2.0' },
    badge: { ko: '30일 지속률 70%', en: '70% 30-day retention' },
    role: {
      ko: '개인 프로젝트 — 기획·개발·디자인 100%',
      en: 'Solo project. Planning, development and design, 100%.',
    },
    oneLiner: {
      ko: '하루 한 번, 한지 위에 도장을 새기듯 30초 만에 감정을 기록하는 감정 일기. 서버 없는 온디바이스 구조로 "일기는 완전히 사적이어야 한다"는 원칙을 아키텍처로 구현.',
      en: 'A once-a-day emotion diary: 30 seconds to press your feeling like a seal on hanji paper. A serverless, on-device architecture embodies the principle that a diary must be completely private.',
    },
    stack: ['SwiftUI', 'SwiftData', 'CloudKit', 'Swift Charts', 'Face ID · Keychain', '커스텀 Shape 드로잉'],
    shots: [
      { src: '/images/projects/retou/2-today.jpg', caption: { ko: '오늘 — 1질문 + 감정 인장 선택', en: 'Today: one question + an emotion seal' } },
      { src: '/images/projects/retou/3-records.jpg', caption: { ko: '자취 — 한지 위에 쌓이는 기록', en: 'Traces: records layered on hanji' } },
      { src: '/images/projects/retou/4-mind.jpg', caption: { ko: '마음결 — 조각보 감정 통계', en: 'Mind: patchwork emotion stats' } },
    ],
    links: {
      appstore: { url: 'https://apps.apple.com/kr/app/re-tou/id6745058969', label: { ko: 'App Store', en: 'App Store' } },
      intro: { url: 'https://www.arcseed.kr/ko/products/retou', label: { ko: '소개 페이지', en: 'Product page' } },
      github: { url: 'https://github.com/whatdoIsa/ReToU', label: { ko: 'GitHub', en: 'GitHub' } },
    },
    problem: {
      ko: '테스트 사용자 10명 중 8명이 "일기는 부담스러워 3일을 못 넘긴다"고 답했고, 기존 감정 체크 앱은 30일 뒤 "그때 왜 그랬는지"를 떠올리지 못해 이탈. 입력 부담과 회고 가치가 반비례하는 구조적 문제.',
      en: '8 of 10 test users said journaling feels like a chore they drop within 3 days, while check-in style apps lose users because 30 days later nothing explains "why I felt that way." Input burden and reflective value were structurally at odds.',
    },
    actions: {
      ko: [
        '"하루 1질문 + 감정 선택" 평균 30초 입력 구조로 UX를 설계하고, 사용자 피드백을 3회 반영해 개선. Swift Charts로 날짜·감정별 회고 통계를 시각화.',
        "v2.0에서 '감정 인장' 컨셉으로 전면 리디자인 — 전통 안료 5색(치자·자초·갈매·쪽·연지) 한지 테마, SwiftUI Shape로 손그림 인장 5종을 직접 구현, 조각보 형태의 감정 통계 뷰와 한지 질감 렌더링까지 디자인 시스템으로 체계화.",
        '프라이버시를 구조로 보장: 로그인 UI 없이 CloudKit 자동 백업(Apple ID 암묵 인증 + 로컬 폴백), Face ID + Keychain 6자리 잠금(opt-in), 구버전 사용자 마이그레이션 로직까지 설계. 개인정보 수집 항목 "없음"으로 심사 통과.',
      ],
      en: [
        'Designed a "one question + one emotion" flow averaging 30 seconds, refined through 3 rounds of user feedback; visualized reflective stats by date and emotion with Swift Charts.',
        "Fully redesigned v2.0 around an 'emotion seal' concept: a hanji theme in five traditional pigments, five hand-drawn seals built as custom SwiftUI Shapes, patchwork-style stats and paper-grain rendering, all systematized into a design system.",
        'Guaranteed privacy structurally: login-free CloudKit backup (implicit Apple ID auth + local fallback), opt-in Face ID + Keychain 6-digit lock with migration for legacy users. Passed review with a "no data collected" privacy label.',
      ],
    },
    result: {
      ko: '30일 지속률 70% — 기존 일기 앱 대비 3배. "감정 패턴이 보인다" 만족도 85%. 출시 후 1년간 v2.0까지 지속 운영·개선 중인 라이브 프로덕트.',
      en: '70% 30-day retention, 3× typical journaling apps. 85% satisfaction on "I can see my emotional patterns." A live product, operated and improved through v2.0 over a year since launch.',
    },
    architecture: {
      lines: [
        'TodayView · RecordsView · MindView (SwiftUI, 3 tabs)',
        '↓ design system (hanji palette · EmotionSeal Shapes)',
        'SwiftData local store: source of truth',
        '↓ optional',
        'CloudKit backup (implicit Apple ID · local fallback) / Face ID + Keychain lock',
      ],
    },
    decision: {
      context: { ko: '서버 없는 프라이버시 일기라 백업은 필요했지만, 로그인 UI는 "완전히 사적인 일기"라는 제품 서사를 훼손한다.', en: 'As a serverless privacy diary, backup was needed — but a login UI would break the "completely private diary" narrative.' },
      decision: { ko: '계정 시스템 대신 CloudKit(암묵적 Apple ID) 자동 백업 + 로컬 폴백 구조를 택했다.', en: 'Chose CloudKit automatic backup on the implicit Apple ID plus a local fallback, instead of an account system.' },
      alternatives: { ko: '소셜 로그인 + 자체 서버 / 백업 미지원.', en: 'Social login with a backend, or no backup at all.' },
      tradeoff: { ko: '미로그인·용량 부족 같은 실패 케이스를 직접 처리해야 하지만, 로그인 단계가 0이 된다.', en: 'You must handle failure cases like signed-out devices or full quotas, but the login step drops to zero.' },
      result: { ko: '개인정보 "수집 없음"으로 심사를 통과했고, 로그인 없이 기기 간 동기화가 동작한다.', en: 'Passed review with a "no data collected" label, and cross-device sync works with no login.' },
    },

    troubleshooting: [
      {
        title: { ko: '로그인 없이 백업하기 — 프라이버시 서사를 지키는 CloudKit', en: 'Backup without login: CloudKit that keeps the privacy story' },
        found: {
          ko: '백업 요구는 컸지만 소셜 로그인을 붙이는 순간 "완전히 사적인 일기"라는 제품 서사가 무너진다.',
          en: 'Users wanted backup, but adding social login would break the "completely private diary" narrative.',
        },
        analysis: {
          ko: '서버 없는 구조에서 계정 시스템은 역할이 없다. Apple ID를 암묵적으로 쓰는 CloudKit이면 로그인 UI 없이 동기화가 가능하지만, 미로그인·용량 부족 등 실패 케이스가 남는다.',
          en: 'In a serverless design an account system has no role. CloudKit rides the implicit Apple ID with zero login UI, but leaves failure cases like signed-out devices or full quotas.',
        },
        fix: {
          ko: 'CloudKit .automatic + 로컬 폴백 구조로 설계해 실패 시에도 데이터가 항상 로컬에 남게 했고, 잠금은 Face ID + Keychain 6자리(opt-in)로 분리. 구버전 강제 잠금 사용자를 위한 마이그레이션 로직도 넣었다.',
          en: 'Designed CloudKit .automatic with a local fallback so data always survives locally on failure; the lock is a separate opt-in Face ID + Keychain 6-digit flow, with migration for users of the older forced-lock version.',
        },
        learned: {
          ko: '기능 하나를 더하는 결정에도 제품 서사와의 정합성을 먼저 따진다 — 아키텍처가 곧 브랜드 약속이 될 수 있다.',
          en: 'Even a single feature must cohere with the product narrative; architecture itself can be the brand promise.',
        },
      },
    ],
    resultTiles: [
      { big: { ko: '70%', en: '70%' }, small: { ko: '30일 지속률 · 초기 코호트 (기존 3배)', en: '30-day retention · early cohort (3× typical)' } },
      { big: { ko: '85%', en: '85%' }, small: { ko: '"패턴이 보인다" 만족도 (테스트 10명)', en: '"I see patterns" (10 testers)' } },
      { big: { ko: 'v2.0', en: 'v2.0' }, small: { ko: '1년간 지속 운영·개선', en: 'A year of live operation' } },
    ],
  },

  {
    slug: 'rootrip',
    name: 'Rootrip',
    icon: { img: '/images/icons/rootrip.png', text: 'R', bg: '#FF6B4A', color: '#FFFFFF' },
    platform: 'iPadOS',
    featured: false,
    period: '2025.07 – 2025.09',
    status: { ko: '팀 프로젝트', en: 'Team project' },
    role: {
      ko: '팀 6인 / PencilKit 드로잉 시스템 전담',
      en: 'Team of 6 / owned the PencilKit drawing system',
    },
    oneLiner: {
      ko: '지도 위에 Apple Pencil로 루트를 그리는 협업 여행 플래너. 캔버스 좌표 → MapKit 좌표계 변환으로 드로잉을 실제 지도 오버레이로 표시하고, 닫힌 도형 감지(영역/선 구분)·Undo/Redo·PKDrawing 직렬화 기반 영속성까지 드로잉 시스템 전체를 전담 구현.',
      en: 'A collaborative travel planner where you draw routes on the map with Apple Pencil. Owned the entire drawing system: canvas-to-MapKit coordinate conversion rendering strokes as real map overlays, closed-shape detection (area vs line), undo/redo, and PKDrawing-serialized persistence.',
    },
    stack: ['PencilKit', 'MapKit', 'SwiftUI', 'SwiftData', 'Firebase'],
    shots: [],
    links: {},
    problem: {
      ko: '여행 계획 시 지도·메모·일정 앱 3개를 오가며 동선 파악에 평균 20분 소요. 지도 위에 루트를 직관적으로 표현할 방법이 없음.',
      en: 'Trip planning meant juggling map, notes and schedule apps, about 20 minutes just to grasp a route, with no intuitive way to draw it on the map.',
    },
    actions: { ko: [], en: [] },
    result: {
      ko: '테스트 사용자 8명 기준 — 경로 계획 시간 60% 단축 (20분 → 8분) · "지도를 보며 직관적으로 계획된다" 만족도 90%.',
      en: 'With 8 test users — route-planning time down 60% (20 → 8 min); 90% satisfaction on "planning feels intuitive on the map."',
    },
    architecture: null,
    troubleshooting: [],
    resultTiles: [],
  },

];

export const featuredCaseStudies = caseStudies.filter((c) => c.featured);
export const miniCaseStudies = caseStudies.filter((c) => !c.featured);
export const getCaseStudy = (slug) => caseStudies.find((c) => c.slug === slug);
