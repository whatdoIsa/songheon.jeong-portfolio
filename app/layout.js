import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollProgress from '@/components/layout/ScrollProgress';
import { I18nProvider } from '@/lib/i18n';

const SITE_DESCRIPTION =
  '제품을 기획부터 출시·운영까지 책임지는 프로덕트 엔지니어 정송헌의 포트폴리오입니다. iOS 앱(SwiftUI·App Store)과 웹·풀스택(React·Next.js·Spring·PostgreSQL), 온디바이스·LLM AI 경험을 소개합니다.';

const SITE_URL = 'https://whatdoisa.github.io/iOS-Portfolio/';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: '정송헌 (Dean) | 프로덕트 엔지니어 (iOS · 웹)',
  description: SITE_DESCRIPTION,
  keywords: [
    '프로덕트 엔지니어',
    'iOS 개발',
    'SwiftUI',
    '웹 개발',
    'React',
    'Next.js',
    'TypeScript',
    'Spring Boot',
    'PostgreSQL',
    '풀스택',
    'AI',
    'App Store 출시',
    '정송헌',
    'Dean',
    '포트폴리오',
  ],
  authors: [{ name: 'Dean (정송헌)' }],
  creator: 'Dean',
  publisher: 'Dean',
  openGraph: {
    title: '정송헌 (Dean) | 프로덕트 엔지니어 (iOS · 웹)',
    description: SITE_DESCRIPTION,
    type: 'website',
    locale: 'ko_KR',
    siteName: 'Dean Portfolio',
    url: SITE_URL,
  },
  twitter: {
    card: 'summary',
    title: '정송헌 (Dean) | 프로덕트 엔지니어 (iOS · 웹)',
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css"
        />
      </head>
      <body className="antialiased font-pretendard">
        <I18nProvider>
          <ScrollProgress />
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </I18nProvider>
      </body>
    </html>
  );
}
