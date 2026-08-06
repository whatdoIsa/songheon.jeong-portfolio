import { featuredCaseStudies } from '@/data/caseStudies';
import CaseDoc from '@/components/case/CaseDoc';

export function generateStaticParams() {
  return featuredCaseStudies.map((cs) => ({ slug: cs.slug }));
}

export function generateMetadata({ params }) {
  const cs = featuredCaseStudies.find((c) => c.slug === params.slug);
  return {
    title: cs ? `${cs.name} — 케이스 스터디 | 정송헌` : '케이스 스터디 | 정송헌',
  };
}

export default function CasePage({ params }) {
  return <CaseDoc slug={params.slug} />;
}
