import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollProgress from '@/components/layout/ScrollProgress';
import { I18nProvider } from '@/lib/i18n';

const SITE_DESCRIPTION =
  'SwiftUI로 iOS·macOS 앱을 설계하고 App Store 출시와 운영까지 책임지는 개발자 정송헌의 포트폴리오입니다. 앱 개발, QA, 배포, 유지보수와 AI 개발 워크플로 경험을 소개합니다.';

const SITE_URL = 'https://whatdoisa.github.io/iOS-Portfolio/';
const OG_IMAGE = 'https://whatdoisa.github.io/iOS-Portfolio/og.png';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: '정송헌 (Dean) | iOS·macOS Developer',
  description: SITE_DESCRIPTION,
  keywords: [
    'iOS Developer',
    'macOS Developer',
    'SwiftUI',
    'UIKit',
    'AppKit',
    'StoreKit 2',
    'MapKit',
    'Firebase',
    'App Store 출시',
    '앱 유지보수',
    '정송헌',
    'Dean',
    '포트폴리오',
  ],
  authors: [{ name: 'Dean (정송헌)' }],
  creator: 'Dean',
  publisher: 'Dean',
  openGraph: {
    title: '정송헌 (Dean) | iOS·macOS Developer',
    description: SITE_DESCRIPTION,
    type: 'website',
    locale: 'ko_KR',
    siteName: 'Dean Portfolio',
    url: SITE_URL,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: '정송헌 (Dean) — iOS·macOS Developer' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '정송헌 (Dean) | iOS·macOS Developer',
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
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
