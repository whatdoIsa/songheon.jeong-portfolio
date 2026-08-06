# FODI iOS Developer 지원 — 포트폴리오 감사 (2026-08-06)

목적: 채용담당자가 10초 안에 "SwiftUI로 제품을 설계·출시·운영할 수 있는 사람"임을 이해하도록
포트폴리오·이력서를 재구성하기 전, 현재 상태를 사실 기준으로 감사한다.

---

## 1. 현재 정보 구조

| 경로 | 내용 | 상태 |
|---|---|---|
| `/` (app/page.js) | 스캔 헤더(사진·소개·연락처) → 팩트 4개 → 케이스 스터디 카드 4 + 미니 2 → Skills 3열 → Education → Contact | 최신 (2026-08 리디자인) |
| `/case/[slug]` | 문서형 케이스 스터디 (개요표 → 문제 → 접근 → 아키텍처 → 트러블슈팅 → 성과), smartedge·showx·kip·retou 4개 정적 생성 | 최신 |
| `/resume` | 요약 → 기술 스택 표 → 프로젝트 5(P/A/R 1줄) → 교육 → 성과, 인쇄 기반 PDF(전화번호 인쇄 전용) | 최신 |
| `data/caseStudies.js` | 케이스 스터디 단일 소스 (ko/en, 6항목) | 최신 — 사실 기준 |
| `data/projects.js` | 이력서 페이지 전용 (5항목) | **구버전 정보 잔존** |
| `locales/ko·en.json` | UI 문자열 + resume 콘텐츠 + (미사용 죽은 키 다수) | 부분 구버전 |
| `README.md` | 저장소 소개 | **구버전** ("신입", 삭제된 컴포넌트 구조 설명) |
| `.github/workflows/deploy.yml` | main 푸시 → GitHub Pages 배포 | 동작 확인됨 |

## 2. 채용공고와 일치하는 증거 (저장소·링크에서 확인됨)

| 공고 요건 | 확인된 증거 | 위치 |
|---|---|---|
| SwiftUI | SmartEdge·Show(X)·kip!·ReToU·Rootrip·SEED 전부 SwiftUI. SmartEdge는 AppKit 결합 | caseStudies, 로컬 저장소 |
| 앱스토어 출시·배포·유지보수 | SmartEdge(Mac App Store, v1.1), ReToU(App Store, v2.0), Show(X)·kip!(App Store) — 링크 4개 유효(HTTP 확인) | caseStudies.links |
| 전 과정 담당 | SmartEdge·ReToU 개인 100% (기획→심사→수익화→운영) | caseStudies.role |
| QA 프로세스 | Show(X) 행사 중 5회 업데이트(현장 관찰), SmartEdge 실기기 QA·시스템 제약 진단, **SmartEdge Tests/ 4개 테스트 파일 실재**, SEED JurinKit 단위 테스트(로컬 `swift test`) | 로컬 저장소 확인 |
| AI 개발도구 (Claude Code) | SmartEdge·ReToU·SEED·포트폴리오 전부 Claude Code 병행 개발 (세션·프로젝트 메모리 실재) | 로컬 작업 이력 |
| Firebase | Rootrip Firestore 동기화 (팀 repo 공개) | projects.js, GitHub |
| Cloudflare | SEED `server/tutor-worker.js` — Cloudflare Workers 프록시 (로컬 저장소에 코드 실재, 배포 기록은 저장소 문서 기준) | 로컬 SEED 저장소 |
| 스타트업형 실행력 | 1인 스튜디오 운영: 2년 7개 제품 완주, 2개 라이브 운영 | 전체 |
| 공연·행사 도메인 | Show(X) = 200+명 실내 행사 운영 앱 + 본인이 현장 운영 참여 | caseStudies, 이력서 |

## 3. 불일치·부족한 부분

1. **포지셔닝 불일치**: README "iOS 신입 개발자"·"T자형" vs 홈 "7개 출시·운영". layout.js keywords에 `신입 iOS 개발자`, React/Vue/Next.js/HealthKit/Cross Platform 등 웹 시절 키워드 잔존.
2. **첫 화면이 공고 요건순이 아님**: 팩트 4개가 성과 중심(차트·지속률)이라 SwiftUI/QA/AI 워크플로/Firebase가 스크롤 전에 안 보임.
3. **QA·AI 도구가 '한 줄 스킬'로만 존재**: 프로세스 형태 아님. 실제 수행 vs 도입 예정 구분 없음.
4. **아키텍처 의사결정 서술 없음**: 트러블슈팅(문제해결)은 있으나 "왜 이 기술을 골랐나"(Context/Decision/Trade-off)가 없음.
5. **출시·운영 현황을 한눈에 보는 표 없음**: 카드들을 다 읽어야 함.
6. **placeholder**: layout.js `verification.google: 'your-google-verification-code'`.
7. **FODI 맞춤 진입점 없음**: 공고 요건 ↔ 경험 매핑, 90일 계획, 도메인 연결 부재.

## 4. 중복된 데이터 소스

- `data/caseStudies.js`(메인·케이스 페이지) vs `data/projects.js`(이력서) — 같은 프로젝트를 이중 관리.
- 확인된 불일치:
  - **ReToU appstore 링크**: projects.js `null` ↔ 실제 출시됨(`id6745058969`, caseStudies에 존재)
  - **Rootrip 역할**: projects.js "Development Lead" ↔ caseStudies·이력서 원본 "PencilKit 드로잉 시스템 전담"
  - **Rootrip 기간**: projects.js `2025.07-2025.08` ↔ caseStudies `2025.07–2025.09`
  - **ReToU 기간**: projects.js `2025.04-2025.06` ↔ 실제 v2.0 운영 중(`2025.04–현재`)
  - **Rootrip features "Unit testing and UI testing implementation"** — 로컬 저장소에 테스트 타깃 없음 → **미검증 주장, 제거 대상**
  - Rootrip stack의 `Gitmoji`(도구 아님), 구버전 `webConnection` 필드들
- 통합 방침(목표 I): 전면 통합은 이력서 렌더 로직 리스크가 있어, ①projects.js의 불일치 필드를 caseStudies 기준으로 정정하고 ②`scripts/check-data-consistency.mjs`로 이름·기간·역할·링크 일치를 개발 시 검증한다.

## 5. 검증되지 않았거나 근거 표기가 필요한 수치

(웹 표기 유지 여부와 처리 방식 — 상세는 VERIFICATION_CHECKLIST.md)

| 수치 | 출처 | 처리 |
|---|---|---|
| 앱 출시 7개 | 사용자 확정(SEED 포함 지시) | 유지. FODI 페이지에는 "App Store 링크 4 + 팀·개인 완주 포함 7" 구조로 표기 |
| Apple Indoor Map 국내 최초 | 사용자 이력서 (외부 공증 없음) | 유지 + "자체 조사 기준" 각주 |
| 차트 #37 · #66 | 사용자 이력서 (스크린샷 미보유 상태) | 유지 + "App Store 카테고리 차트, 2025.11 기록" 각주 · 체크리스트 등록 |
| 안내 문의 40%↓ | 행사 기간 운영 집계(표본=행사 5일) | 유지 + 측정 기준 각주 |
| 정리 시간 60%↓ / 만족도 95% | 테스트 사용자 15명 자체 측정 | 유지 + 표본 각주 |
| 30일 지속률 70% / 만족도 85% | 초기 사용자 코호트 자체 측정 | 유지 + 각주 |
| 계획 시간 60%↓ / 만족도 90% (Rootrip) | 테스트 사용자 8명 | 유지 + 각주 |
| 개발 담당 40%(kip)·50%(Show(X)) | 사용자 이력서 | 유지 (기존 자료와 일치) |
| Rootrip 단위·UI 테스트 | 로컬 저장소에 없음 | **웹에서 제거** |
| "CI/CD 운영" | 앱 CI 없음(Actions는 포트폴리오 배포·별도 자동화) | "GitHub Actions(웹 배포 자동화)"로 한정 표기 |

## 6. 모바일·데스크톱·다크모드

- 모바일: 히어로 사진 `hidden sm:block` — 모바일에서 사진 없음(의도). 팩트 그리드 2열 폴백 정상.
- 다크모드: `dark:` 클래스 전반 적용. 신규 섹션도 동일 토큰 사용 필요.
- 케이스 표(신규 출시·운영 표)는 모바일에서 `overflow-x-auto` 필요.

## 7. 접근성

- 링크 focus 스타일이 브라우저 기본에 의존 → 신규 요소에는 `focus-visible` 링 제공.
- 아이콘 이미지 `alt=""`(장식) 처리돼 있음 — 유지.
- 수치 각주는 시각적 크기만 줄이고 텍스트로 제공(스크린리더 접근 가능).

## 8. SEO·메타데이터

- keywords에 구버전 웹 스택·`신입 iOS 개발자` 잔존 → 제거.
- `verification.google` placeholder → 제거.
- OG description은 최신이나, 권장 메타 설명으로 통일.
- FODI 페이지는 지원용 → `robots: noindex` 지정(공개 URL이지만 검색 노출 불필요).

## 9. 예상 수정 파일

- 신규: `docs/FODI_PORTFOLIO_AUDIT.md`, `docs/VERIFICATION_CHECKLIST.md`, `app/applications/fodi-ios/page.js`, `scripts/check-data-consistency.mjs`
- 수정: `README.md`, `app/layout.js`, `app/page.js`, `app/resume/page.js`, `data/caseStudies.js`(decision·metricsNote 추가), `data/projects.js`(불일치 정정), `locales/ko.json`·`en.json`(죽은 키 정리 최소화), `components/case/CaseDoc.js`(Architecture Decision 섹션), `package.json`(check:data 스크립트)

## 10. 구현 순서

1. VERIFICATION_CHECKLIST.md 초안
2. A: 포지셔닝(README·layout.js·히어로) 통일
3. B/G/H: 첫 화면 Evidence 5종 + 출시·운영 표 + 수치 각주(data에 metricsNote)
4. F: caseStudies에 architecture decision 추가 + CaseDoc 렌더
5. C/D/E/K/L: `/applications/fodi-ios` 페이지
6. I: projects.js 정정 + 정합성 스크립트 / J: `/resume?profile=fodi-ios`
7. 빌드·lint·다국어·모바일·다크·인쇄·링크·콘솔 전수 검증
