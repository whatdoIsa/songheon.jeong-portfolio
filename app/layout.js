import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollProgress from '@/components/layout/ScrollProgress';
import { I18nProvider } from '@/lib/i18n';

export const metadata = {
  title: '정송헌 (Dean) | iOS Developer',
  description: '2년간 11개 앱을 App Store에 출시하고 SmartEdge·ReToU를 운영하는 iOS/macOS 개발자 정송헌입니다. 설계·개발·배포·운영 전 과정을 담당합니다.',
  keywords: [
    'iOS Developer',
    'SwiftUI',
    'UIKit',
    'React',
    'Vue.js',
    'Next.js',
    'Frontend Developer',
    'Mobile Developer',
    '정송헌',
    'Dean',
        '선언형 UI',
    'Declarative UI',
    'HealthKit',
    'MapKit',
    'Firebase',
    'Cross Platform',
    '신입 iOS 개발자',
    '포트폴리오'
  ],
  authors: [{ name: 'Dean (정송헌)' }],
  creator: 'Dean',
  publisher: 'Dean',
  openGraph: {
    title: '정송헌 (Dean) | iOS Developer',
    description: 'App Store 출시 11회 · SmartEdge·ReToU 운영 — iOS/macOS 개발자 정송헌',
    type: 'website',
    locale: 'ko_KR',
    siteName: 'Dean Portfolio',
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
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        <link rel="icon" href="/favicon.ico" />
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
