# 정송헌 (Dean) — 프로덕트 엔지니어 (iOS · 웹) 포트폴리오

제품을 기획부터 출시·운영까지 책임지는 프로덕트 엔지니어 정송헌의 포트폴리오입니다. iOS 앱(SwiftUI)과 웹·풀스택(React·Next.js·Spring), 온디바이스·LLM AI를 다룹니다.

개인·팀 프로젝트에서 여러 앱을 출시했고, 현재도 **ReToU**와 **SEED**(iOS)를
직접 업데이트하며 운영하고 있습니다. 빠른 구현뿐 아니라 심사 대응, 사용자 피드백,
버전 업데이트, 제품 안정성까지 개발자의 책임으로 봅니다.

- 라이브: https://whatdoisa.github.io/songheon.jeong-portfolio/
- 이력서: `/resume`

## 기술 스택 (이 사이트)

- **Framework**: Next.js 14 (App Router, static export)
- **Language**: JavaScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Deploy**: GitHub Actions → GitHub Pages

## 구조

```
app/
├── layout.js            # 루트 레이아웃 + 메타데이터
├── page.js              # 홈 (스캔 헤더 · 케이스 스터디 · 출시·운영 현황 · Skills)
└── resume/page.js       # 이력서 (인쇄 기반 PDF)
components/
├── case/CaseCard.js · CaseDoc.js · MiniCard.js   # 케이스 스터디 카드/문서
└── layout/                       # Navbar · Footer · ScrollProgress · LanguageSwitcher
data/
├── caseStudies.js       # 케이스 스터디 단일 소스 (ko/en)
└── projects.js          # 이력서용 프로젝트 (caseStudies와 정합 유지)
scripts/check-data-consistency.mjs   # 데이터 정합성 검사 (npm run check:data)
```

## 개발

```bash
npm install
npm run dev          # 개발 서버
npm run build        # 정적 빌드 (out/)
npm run check:data   # projects ↔ caseStudies 정합성 검사
```

## 작성자

**정송헌 (Dean)** · gmlwns5504@naver.com · [@whatdoIsa](https://github.com/whatdoIsa)
