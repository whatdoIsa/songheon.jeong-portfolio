// 케이스 스터디 데이터 — 메인 페이지(P-A-R 카드)와 상세 페이지(문서형)가 공유하는 단일 소스.
// 텍스트 필드는 { ko, en } 이중언어 객체. 수치는 실제 테스트/운영 데이터 기준.

export const caseStudies = [
  {
    slug: 'smartedge',
    name: 'SmartEdge',
    icon: { img: '/images/icons/smartedge.png', text: 'SE', bg: '#191F28', color: '#FFFFFF' },
    platform: 'macOS',
    featured: true,
    period: '2025.12 –',
    status: { ko: '출시 · v1.1 운영 중', en: 'Live · v1.1' },
    badge: { ko: 'IAP 수익화', en: 'IAP monetized' },
    role: {
      ko: '개인 프로젝트 — 기획·개발·디자인·출시·운영 100%',
      en: 'Solo project — planning, development, design, release & ops 100%',
    },
    oneLiner: {
      ko: 'MacBook 노치를 음악 컨트롤·캘린더·파일 보관함·뽀모도로 타이머를 모은 마이크로 워크스페이스로 바꾸는 메뉴바 앱. 무료 + Pro(일회성 구매) 모델로 Mac App Store에서 판매 중.',
      en: 'A menu-bar app that turns the MacBook notch into a micro-workspace: music controls, calendar, file shelf and a Pomodoro timer. Sold on the Mac App Store as free + one-time Pro purchase.',
    },
    stack: ['SwiftUI', 'AppKit', 'App Sandbox · Entitlements', 'StoreKit 2', 'EventKit', 'Apple Music · Spotify'],
    shots: [
      { src: '/images/projects/smartedge/music.jpg', caption: { ko: '음악 — 노치에서 바로 재생 컨트롤', en: 'Music — playback controls right in the notch' } },
      { src: '/images/projects/smartedge/shelf.jpg', caption: { ko: '보관함 — 드래그로 파일 임시 보관·공유', en: 'Shelf — drop files to stage and share' } },
      { src: '/images/projects/smartedge/pomodoro.jpg', caption: { ko: '뽀모도로 — 노치 집중 타이머', en: 'Pomodoro — a focus timer in the notch' } },
    ],
    links: {
      appstore: { url: 'https://apps.apple.com/kr/app/smartedge/id6787634027?mt=12', label: { ko: 'Mac App Store', en: 'Mac App Store' } },
      intro: { url: 'https://www.arcseed.kr/ko/products/smartedge', label: { ko: '소개 페이지', en: 'Product page' } },
    },
    problem: {
      ko: '음악 확인·파일 공유·일정 확인마다 각각 다른 앱으로 전환하는 컨텍스트 스위칭 비용. 노치는 매일 보면서도 아무 기능이 없는 공간 — 그러나 "항상 최상위에 떠 있는 UI"는 macOS 시스템 제약(샌드박스·TCC·윈도우 레벨)과 정면으로 충돌하는 영역.',
      en: 'Checking music, sharing files and glancing at the calendar each meant switching apps. The notch is stared at daily yet does nothing — but an always-on-top UI collides head-on with macOS system constraints (sandbox, TCC, window levels).',
    },
    actions: {
      ko: [
        'AppKit 윈도우 레벨 제어와 SwiftUI를 결합해 노치 확장형 UI 구현 — 시스템 제약 2건을 로그 분석으로 해결(아래 트러블슈팅).',
        'StoreKit 2로 무료 + Pro(비소모성 IAP) 수익 모델 구현, 한/영 로컬라이제이션 후 전 세계 출시.',
        '전역 단축키(보관함·캘린더·뽀모도로)로 어디서든 호출 가능하게 설계.',
      ],
      en: [
        'Built the notch-anchored UI by combining AppKit window-level control with SwiftUI — resolved two system-level blockers via log analysis (see troubleshooting).',
        'Implemented a free + Pro (non-consumable IAP) model with StoreKit 2; localized in Korean/English and shipped worldwide.',
        'Designed global hotkeys (Shelf, Calendar, Pomodoro) so every surface is reachable from anywhere.',
      ],
    },
    result: {
      ko: 'Mac App Store 심사 통과·출시, v1.1 업데이트로 전역 단축키·다중 파일 공유 확장. 기획→개발→심사→수익화→운영의 전체 제품 사이클을 혼자 완주.',
      en: 'Passed Mac App Store review and shipped; v1.1 added global hotkeys and multi-file sharing. Completed the full product cycle — planning → development → review → monetization → operations — solo.',
    },
    architecture: {
      lines: [
        'NotchWindowManager (NSPanel · window-level control)',
        '↓ state subscription',
        'AppCoordinator — MusicService / CalendarService / ShelfService / TimerService',
        '↓',
        'SwiftUI Views (NotchView · ShelfView · SettingsView)',
      ],
    },
    troubleshooting: [
      {
        title: { ko: '샌드박스가 Apple Events를 커널에서 차단', en: 'The sandbox blocked Apple Events at the kernel' },
        found: {
          ko: 'Apple Music이 재생 중인데 노치는 "No Music Playing". 크래시도, 에러도 없는 무증상 실패 — 권한 프롬프트조차 뜨지 않았다.',
          en: 'Apple Music was playing but the notch said "No Music Playing" — a symptomless failure with no crash, no error, and no permission prompt.',
        },
        analysis: {
          ko: '시스템 로그를 추적해 deny appleevent-send com.apple.Music을 발견. App Sandbox가 Apple Events를 커널 수준에서 차단해 TCC 권한 요청 단계까지 도달하지 못한 것. 자동화 entitlement 하나로 충분하다는 통념이 틀린 지점.',
          en: 'Tracing system logs surfaced "deny appleevent-send com.apple.Music" — the App Sandbox was blocking Apple Events at the kernel, before the TCC prompt could even appear. The common assumption that the automation entitlement alone suffices was wrong here.',
        },
        fix: {
          ko: 'Apple Music·Spotify를 타겟으로 명시한 예외 entitlement를 추가해 샌드박스 통과 → TCC 프롬프트 정상 노출. 권한 미허용(-1743) 상태를 감지해 인앱 권한 안내 UX까지 설계.',
          en: 'Added a targeted exception entitlement naming Apple Music and Spotify so the send passes the sandbox and the TCC prompt appears. Also detect the not-authorized state (-1743) and guide users through an in-app permission flow.',
        },
        learned: {
          ko: 'macOS에서 "동작하지 않는다"는 앱 코드 → 샌드박스 → TCC 세 층을 분리해서 진단해야 한다. 이후 모든 권한 기능에 로그 기반 진단 루틴을 먼저 만들게 됐다.',
          en: 'On macOS, "it doesn\'t work" must be diagnosed across three layers — app code, sandbox, TCC. Every permission-gated feature I build now starts with a log-based diagnostic routine.',
        },
      },
      {
        title: { ko: '최상위 윈도우에는 Finder 드래그가 오지 않는다', en: 'Finder drags never reach top-level windows' },
        found: {
          ko: '보관함으로 파일 드래그가 완전 무반응 — draggingEntered조차 호출되지 않았다.',
          en: 'Dragging files onto the Shelf did nothing at all — even draggingEntered never fired.',
        },
        analysis: {
          ko: 'macOS는 screenSaver 레벨(노치의 최상위 레벨) 윈도우에 드래그 이벤트를 전달하지 않는다는 제약을 확인. 샌드박스나 등록 문제가 아니었다.',
          en: 'Confirmed a platform constraint: macOS does not deliver drag events to windows at the screenSaver level (the notch\'s always-on-top level). It was never a sandbox or registration issue.',
        },
        fix: {
          ko: '드래그 처리를 SwiftUI .onDrop에서 AppKit NSPanel + registerForDraggedTypes로 이전하고, 보관함이 열릴 때만 윈도우 레벨을 동적으로 낮추는 구조로 드래그 앤 드롭을 성립시켰다.',
          en: 'Moved drag handling from SwiftUI .onDrop to an AppKit NSPanel with registerForDraggedTypes, and dynamically lower the window level only while the Shelf is open — making drag & drop work.',
        },
        learned: {
          ko: '프레임워크 추상화(SwiftUI)가 시스템 제약을 숨길 때는 한 층 아래(AppKit)에서 검증한다.',
          en: 'When a framework abstraction (SwiftUI) hides a system constraint, verify one layer down (AppKit).',
        },
      },
    ],
    resultTiles: [
      { big: { ko: '출시 + v1.1', en: 'Shipped + v1.1' }, small: { ko: 'Mac App Store 심사 통과, 운영 중', en: 'Passed review, in operation' } },
      { big: { ko: 'IAP 수익화', en: 'IAP revenue' }, small: { ko: 'StoreKit 2 무료+Pro 모델', en: 'StoreKit 2 free + Pro model' } },
      { big: { ko: '2개 언어', en: '2 languages' }, small: { ko: '한/영 로컬라이제이션 전 세계 출시', en: 'KO/EN localization, worldwide' } },
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
      en: 'GPS is useless indoors — 200+ attendees couldn\'t find booths, and inquiries overwhelmed the guidance staff. Indoor maps had no Korean precedent, from Apple\'s approval process on down; there was no reference to follow.',
    },
    actions: {
      ko: [
        'Apple의 실내 지도 데이터 규격에 맞춰 행사장을 층/구역/부스 단위로 GeoJSON 데이터 모델링하고, 제출부터 승인까지의 프로세스를 직접 뚫어 Apple Indoor Map 국내 최초 승인 획득.',
        'MapKit Indoor Positioning API + 커스텀 오버레이 렌더링으로 실내 지도 모듈을 SwiftUI로 단독 개발. 카테고리 필터 검색·일정·팀 정보 연동.',
        '행사 현장에서 참가자 동선을 직접 관찰하며 운영 기간 중 5회 업데이트로 반복 개선. 기획·디자이너 6인과 Figma 협업, 한/영 로컬라이제이션 완료.',
      ],
      en: [
        'Modeled the venue as floor/zone/booth GeoJSON to Apple\'s indoor-map data spec and drove the submission-to-approval process myself — earning Korea\'s first Apple Indoor Map approval.',
        'Single-handedly built the indoor map module in SwiftUI on MapKit\'s Indoor Positioning API with custom overlay rendering; wired up category-filtered search, schedules and team info.',
        'Observed attendee movement on site and shipped 5 iterative updates during the event; collaborated with 6 planners/designers via Figma and completed KO/EN localization.',
      ],
    },
    result: {
      ko: '행사 기간 현장 안내 문의 40% 감소 — 운영 병목을 앱으로 직접 해소. App Store 내비게이션 차트 #37. 선례 없는 도메인을 조사→모델링→승인→운영까지 완주한 경험.',
      en: 'On-site guidance inquiries dropped 40% during the event — the app itself relieved the operational bottleneck. Reached #37 on the App Store navigation chart. Took an unprecedented domain from research → modeling → approval → operations.',
    },
    architecture: {
      lines: [
        'IMDF/GeoJSON venue data (floor · zone · booth)',
        '↓ decode & validate',
        'IndoorMapService — overlay build / level switch / positioning',
        '↓',
        'SwiftUI MapView (custom overlays · search · schedule)',
      ],
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
          en: 'In a domain without references, the official spec and validator feedback are the only compass — short submission cycles are the answer.',
        },
      },
    ],
    resultTiles: [
      { big: { ko: '-40%', en: '-40%' }, small: { ko: '행사 기간 현장 안내 문의', en: 'On-site guidance inquiries' } },
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
      en: 'An on-device-AI productivity app that auto-organizes screenshots — fully local processing, nothing sent to a server.',
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
        'Built an on-device pipeline — Vision recognizes text/objects, Apple Intelligence Writing Tools classifies — reaching 85% accuracy, with automatic date/time/memo extraction and location-based reminders.',
        'Designed a SwiftData-local architecture where server transmission is physically absent, structurally removing the privacy concern.',
        'Added an opt-in Gemini/GPT fallback for devices without Apple Intelligence, closing the device-support gap; optimized bulk-image async processing with Combine.',
      ],
    },
    result: {
      ko: '스크린샷 정리 시간 60% 단축 (5분 → 2분). "서버 전송이 없어 안심된다" 만족도 95% — 프라이버시가 실제 선택 이유가 됨을 검증. App Store 생산성 차트 #66.',
      en: 'Cut organizing time 60% (5 → 2 min). 95% satisfaction on "no server upload feels safe" — validating privacy as a real purchase reason. Reached #66 on the App Store productivity chart.',
    },
    architecture: {
      lines: [
        'PhotoKit screenshots',
        '↓ Vision (text · object recognition)',
        'Apple Intelligence classification — fallback: Gemini / GPT (opt-in)',
        '↓',
        'SwiftData local store → notifications · search · collections',
      ],
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
          en: 'Privacy guaranteed by architecture — not policy — comes back as user trust (95% satisfaction).',
        },
      },
    ],
    resultTiles: [
      { big: { ko: '-60%', en: '-60%' }, small: { ko: '정리 시간 (5분 → 2분)', en: 'Organizing time (5 → 2 min)' } },
      { big: { ko: '95%', en: '95%' }, small: { ko: '"안심된다" 만족도', en: '"Feels safe" satisfaction' } },
      { big: { ko: '#66', en: '#66' }, small: { ko: 'App Store 생산성 차트', en: 'App Store productivity chart' } },
    ],
  },

  {
    slug: 'retou',
    name: 'ReToU — 오늘의 넌',
    nameEn: 'ReToU',
    icon: { img: '/images/icons/retou.png', text: '乚', bg: '#8B6F52', color: '#FFFFFF' },
    platform: 'iOS',
    featured: true,
    period: '2025.04 –',
    status: { ko: '출시 · v2.0 운영 중', en: 'Live · v2.0' },
    badge: { ko: '30일 지속률 70%', en: '70% 30-day retention' },
    role: {
      ko: '개인 프로젝트 — 기획·개발·디자인 100%',
      en: 'Solo project — planning, development & design 100%',
    },
    oneLiner: {
      ko: '하루 한 번, 한지 위에 도장을 새기듯 30초 만에 감정을 기록하는 감정 일기. 서버 없는 온디바이스 구조로 "일기는 완전히 사적이어야 한다"는 원칙을 아키텍처로 구현.',
      en: 'A once-a-day emotion diary — 30 seconds to press your feeling like a seal on hanji paper. A serverless, on-device architecture embodies the principle that a diary must be completely private.',
    },
    stack: ['SwiftUI', 'SwiftData', 'CloudKit', 'Swift Charts', 'Face ID · Keychain', '커스텀 Shape 드로잉'],
    shots: [
      { src: '/images/projects/retou/2-today.jpg', caption: { ko: '오늘 — 1질문 + 감정 인장 선택', en: 'Today — one question + an emotion seal' } },
      { src: '/images/projects/retou/3-records.jpg', caption: { ko: '자취 — 한지 위에 쌓이는 기록', en: 'Traces — records layered on hanji' } },
      { src: '/images/projects/retou/4-mind.jpg', caption: { ko: '마음결 — 조각보 감정 통계', en: 'Mind — patchwork emotion stats' } },
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
        "Fully redesigned v2.0 around an 'emotion seal' concept — a hanji theme in five traditional pigments, five hand-drawn seals built as custom SwiftUI Shapes, patchwork-style stats and paper-grain rendering, all systematized into a design system.",
        'Guaranteed privacy structurally: login-free CloudKit backup (implicit Apple ID auth + local fallback), opt-in Face ID + Keychain 6-digit lock with migration for legacy users. Passed review with a "no data collected" privacy label.',
      ],
    },
    result: {
      ko: '30일 지속률 70% — 기존 일기 앱 대비 3배. "감정 패턴이 보인다" 만족도 85%. 출시 후 1년간 v2.0까지 지속 운영·개선 중인 라이브 프로덕트.',
      en: '70% 30-day retention — 3× typical journaling apps. 85% satisfaction on "I can see my emotional patterns." A live product, operated and improved through v2.0 over a year since launch.',
    },
    architecture: {
      lines: [
        'TodayView · RecordsView · MindView (SwiftUI, 3 tabs)',
        '↓ design system (hanji palette · EmotionSeal Shapes)',
        'SwiftData local store — source of truth',
        '↓ optional',
        'CloudKit backup (implicit Apple ID · local fallback) / Face ID + Keychain lock',
      ],
    },
    troubleshooting: [
      {
        title: { ko: '로그인 없이 백업하기 — 프라이버시 서사를 지키는 CloudKit', en: 'Backup without login — CloudKit that keeps the privacy story' },
        found: {
          ko: '백업 요구는 컸지만 소셜 로그인을 붙이는 순간 "완전히 사적인 일기"라는 제품 서사가 무너진다.',
          en: 'Users wanted backup, but adding social login would break the "completely private diary" narrative.',
        },
        analysis: {
          ko: '서버 없는 구조에서 계정 시스템은 역할이 없다. Apple ID를 암묵적으로 쓰는 CloudKit이면 로그인 UI 없이 동기화가 가능하지만, 미로그인·용량 부족 등 실패 케이스가 남는다.',
          en: 'In a serverless design an account system has no role. CloudKit rides the implicit Apple ID with zero login UI — but leaves failure cases like signed-out devices or full quotas.',
        },
        fix: {
          ko: 'CloudKit .automatic + 로컬 폴백 구조로 설계해 실패 시에도 데이터가 항상 로컬에 남게 했고, 잠금은 Face ID + Keychain 6자리(opt-in)로 분리. 구버전 강제 잠금 사용자를 위한 마이그레이션 로직도 넣었다.',
          en: 'Designed CloudKit .automatic with a local fallback so data always survives locally on failure; the lock is a separate opt-in Face ID + Keychain 6-digit flow, with migration for users of the older forced-lock version.',
        },
        learned: {
          ko: '기능 하나를 더하는 결정에도 제품 서사와의 정합성을 먼저 따진다 — 아키텍처가 곧 브랜드 약속이 될 수 있다.',
          en: 'Even a single feature must cohere with the product narrative — architecture itself can be the brand promise.',
        },
      },
    ],
    resultTiles: [
      { big: { ko: '70%', en: '70%' }, small: { ko: '30일 지속률 (기존 대비 3배)', en: '30-day retention (3× typical)' } },
      { big: { ko: '85%', en: '85%' }, small: { ko: '"패턴이 보인다" 만족도', en: '"I see patterns" satisfaction' } },
      { big: { ko: 'v2.0', en: 'v2.0' }, small: { ko: '1년간 지속 운영·개선', en: 'A year of live operation' } },
    ],
  },

  {
    slug: 'seed',
    name: 'SEED',
    icon: { img: '/images/icons/seed.png', text: 'S', bg: '#6B4EFF', color: '#FFFFFF' },
    platform: 'iOS',
    featured: false,
    period: '2026 –',
    status: { ko: '개인 프로젝트', en: 'Personal project' },
    role: {
      ko: '개인 프로젝트 — 기획·개발·디자인 100%',
      en: 'Solo project — planning, development & design 100%',
    },
    oneLiner: {
      ko: '가상 합성 시장에서 투자 습관을 훈련하는 주식 학습 앱. 종목 추천·수익 보장 없이, 광고·가입 없이 — "연습으로 지표를 보는 눈을 기른다"는 철학을 제품 전체에 관철.',
      en: 'A stock-learning app that trains investing habits in a fully synthetic market — no stock picks, no profit promises, no ads, no sign-up. One philosophy carried through the whole product: practice builds the eye for the numbers.',
    },
    stack: ['SwiftUI', 'SwiftData · CloudKit', 'WidgetKit', 'StoreKit 2', 'Swift Package (엔진 분리)'],
    shots: [],
    links: {},
    problem: {
      ko: '',
      en: '',
    },
    actions: { ko: [], en: [] },
    result: {
      ko: '호가창 매칭·수수료·상하한가 등 거래 제도 로직을 별도 Swift 패키지 엔진으로 분리하고 단위 테스트 102개로 검증. 12편 학습 커리큘럼과 위젯·iCloud 백업까지 갖춘 풀 사이즈 프로덕트.',
      en: 'Split the trading engine (order-book matching, fees, price limits) into its own Swift package verified by 102 unit tests; a full-size product with a 12-lesson curriculum, widgets and iCloud backup.',
    },
    architecture: null,
    troubleshooting: [],
    resultTiles: [],
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
    links: {
      github: { url: 'https://github.com/DeveloperAcademy-POSTECH/2025-C4-M7-TPAP', label: { ko: 'GitHub', en: 'GitHub' } },
      intro: { url: 'https://www.arcseed.kr/ko/products/rootrip', label: { ko: '소개 페이지', en: 'Product page' } },
    },
    problem: {
      ko: '여행 계획 시 지도·메모·일정 앱 3개를 오가며 동선 파악에 평균 20분 소요. 지도 위에 루트를 직관적으로 표현할 방법이 없음.',
      en: 'Trip planning meant juggling map, notes and schedule apps — ~20 minutes just to grasp a route, with no intuitive way to draw it on the map.',
    },
    actions: { ko: [], en: [] },
    result: {
      ko: '경로 계획 시간 60% 단축 (20분 → 8분) · "지도를 보며 직관적으로 계획된다" 만족도 90%.',
      en: 'Route-planning time down 60% (20 → 8 min); 90% satisfaction on "planning feels intuitive on the map."',
    },
    architecture: null,
    troubleshooting: [],
    resultTiles: [],
  },

  {
    slug: 'displaycut',
    name: 'DisplayCut',
    icon: { img: '/images/icons/displaycut.png', text: 'DC', bg: '#4E5968', color: '#FFFFFF' },
    platform: 'macOS',
    featured: false,
    period: '2025.06 – 2025.08',
    status: { ko: '출시', en: 'Live' },
    role: {
      ko: '개인 프로젝트 — 100%',
      en: 'Solo project — 100%',
    },
    oneLiner: {
      ko: '6가지 레이아웃 프리셋과 단축키 10개로 창을 정리하는 macOS 윈도우 관리 유틸리티. Accessibility API로 전체 활성 윈도우를 1초 내 배치 — 키보드만으로 창 제어가 가능하도록 설계.',
      en: 'A macOS window manager with 6 layout presets and 10 hotkeys. Uses the Accessibility API to arrange every active window within a second — fully keyboard-drivable.',
    },
    stack: ['SwiftUI', 'AppKit', 'Accessibility API'],
    shots: [],
    links: {
      intro: { url: 'https://www.arcseed.kr/ko/products/displaycut', label: { ko: '소개 페이지', en: 'Product page' } },
    },
    problem: {
      ko: '멀티 윈도우 작업 시 윈도우 배치에 하루 평균 15분 소요. Mission Control 사용률 20% 미만.',
      en: 'Multi-window work burned ~15 minutes a day on window arrangement; Mission Control usage sat under 20%.',
    },
    actions: { ko: [], en: [] },
    result: {
      ko: '일일 윈도우 배치 시간 80% 감소 (15분 → 3분). macOS Accessibility API와 윈도우 관리 메커니즘 이해 확보.',
      en: 'Daily arrangement time down 80% (15 → 3 min); built deep understanding of the Accessibility API and macOS window management.',
    },
    architecture: null,
    troubleshooting: [],
    resultTiles: [],
  },
];

export const featuredCaseStudies = caseStudies.filter((c) => c.featured);
export const miniCaseStudies = caseStudies.filter((c) => !c.featured);
export const getCaseStudy = (slug) => caseStudies.find((c) => c.slug === slug);
