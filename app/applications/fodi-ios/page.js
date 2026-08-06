import FodiApplication from '@/components/fodi/FodiApplication';

export const metadata = {
  title: 'FODI iOS Developer 지원 | 정송헌',
  description:
    'FODI iOS Developer 포지션 지원 — SwiftUI로 앱을 설계·출시·운영해 온 정송헌의 요건 매핑, QA·릴리스 프로세스, AI 개발 워크플로, 아키텍처 의사결정, 90일 실행 계획.',
  robots: { index: false, follow: false },
};

export default function FodiIosPage() {
  return <FodiApplication />;
}
