'use client';

import { FaEnvelope, FaGithub, FaLinkedin, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { useRef, useEffect, useState } from 'react';
import { useTranslation } from '@/lib/i18n';

export default function Resume() {
  const { t, locale } = useTranslation();
  const [resumeData, setResumeData] = useState({ career: [], education: [], etc: [], achievements: [], projectDetails: {} });
  // 전화번호는 정적 HTML·번들에 평문으로 남지 않도록 base64로 두고 마운트 후 디코드해
  // 렌더링하며(수집 봇 차단), 화면에서는 숨긴 채 인쇄(PDF 저장) 시에만 표시한다.
  const [phone, setPhone] = useState('');
  useEffect(() => {
    setPhone(atob('MDEwLTI1MTQtMjQyNg=='));
  }, []);
  // 이력서에 싣는 프로젝트 — 순서·기간·기술스택만 여기서 정의하고
  // 제목·역할·설명·하이라이트는 로케일(projectDetails[key])에서 가져온다.
  const resumeProjects = [
    { key: '자연어 챗봇 PoC', duration: '2026.11', techStack: ['Java 21', 'Spring Boot 3.5', 'PostgreSQL 16', 'MyBatis', 'React+TypeScript+Vite', '로컬 LLM(Ollama)'] },
    { key: 'kip!', duration: '2025.09 - 현재', techStack: ['SwiftUI', 'Vision', 'Apple Intelligence', 'SwiftData'] },
    { key: 'SEED', duration: '2026.08 - 현재', techStack: ['Swift Package', 'SwiftData', 'CloudKit', 'StoreKit 2'] },
    { key: '웹 포트폴리오', duration: '2025 - 현재', techStack: ['React 18', 'Next.js 14', 'Tailwind CSS', 'Framer Motion', 'GitHub Actions'] },
    { key: 'Show(X)', duration: '2025.09 - 2025.11', techStack: ['SwiftUI', 'MapKit', 'Indoor Positioning', 'SwiftData'] },
    { key: 'ReToU (오늘의 넌)', duration: '2025.04 - 현재', techStack: ['SwiftUI', 'CloudKit', 'Face ID', 'Charts'] },
  ];
  const ko = (locale || 'ko') === 'ko';
  const resumeRef = useRef(null);

  useEffect(() => {
    const loadResumeData = async () => {
      try {
        const currentLocale = locale || 'ko';
        let localeData;
        
        if (currentLocale === 'en') {
          localeData = await import('@/locales/en.json');
        } else {
          localeData = await import('@/locales/ko.json');
        }
        
        setResumeData({
          career: localeData.default.resume?.career || [],
          education: localeData.default.resume?.education || [],
          etc: localeData.default.resume?.etc || [],
          achievements: localeData.default.resume?.achievements || [],
          projectDetails: localeData.default.projects?.projectDetails || {}
        });
      } catch (error) {
        console.error('Failed to load resume data:', error);
        setResumeData({ career: [], education: [], etc: [], achievements: [], projectDetails: {} });
      }
    };
    
    loadResumeData();
  }, [locale]);

  // 브라우저 인쇄 대화상자에서 "PDF로 저장" — 텍스트가 벡터로 유지되어
  // 선택·검색·ATS 파싱이 가능하다 (캔버스 캡처 방식과의 차이).
  // 저장되는 PDF 파일명은 document.title을 따르므로 인쇄 동안만 제목을 교체한다.
  const handleDownloadPDF = () => {
    // 인쇄 대화상자는 document.title을 파일명으로 쓴다. print() 직후 즉시 복원하면
    // 대화상자가 열리기 전에 원래 제목으로 돌아가 버리므로, afterprint에서 복원한다.
    const previousTitle = document.title;
    document.title = ko ? '정송헌_이력서' : 'SongheonJeong_Resume';
    const restore = () => {
      document.title = previousTitle;
      window.removeEventListener('afterprint', restore);
    };
    window.addEventListener('afterprint', restore);
    window.print();
  };

  return (
    <div className="min-h-screen bg-white text-black pt-20">
      <div ref={resumeRef} className="max-w-4xl mx-auto p-8">
        {/* Header */}
        <header className="mb-8 border-b-2 border-gray-800 pb-6 page-break-avoid">
          <div className="flex items-start gap-6 mb-4">
            {/* Profile Image */}
            <div className="flex-shrink-0">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-800 shadow-lg">
                <img
                  src={`${process.env.NODE_ENV === 'production' ? '/songheon.jeong-portfolio' : ''}/images/profile.jpg`}
                  alt="Dean 정송헌"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>

            {/* Name and Title */}
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2">{t('resume.title')}</h1>
              <p className="text-xl text-gray-700 mb-4">{t('resume.subtitle')}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 text-sm">
            {/* 화면에는 숨김 — 인쇄(PDF 저장) 시에만 표시 */}
            <div className="hidden print:flex items-center gap-2">
              <FaPhone />
              <span>{phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaEnvelope />
              <a href="mailto:gmlwns5504@naver.com" className="hover:text-blue-600">gmlwns5504@naver.com</a>
            </div>
            <div className="flex items-center gap-2">
              <FaGithub />
              <a href="https://github.com/whatdoIsa" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">github.com/whatdoIsa</a>
            </div>
            <div className="flex items-center gap-2">
              <FaLinkedin />
              <a href="https://www.linkedin.com/in/송헌-정-04a44b331/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">LinkedIn</a>
            </div>
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt />
              <span>{t('resume.contact.location')}</span>
            </div>
          </div>
        </header>

        {/* Summary */}
        <section className="mb-8 page-break-avoid">
          <h2 className="text-2xl font-bold mb-4 border-b border-gray-300 pb-2">{t('resume.sections.summary')}</h2>
          <p className="text-gray-800 leading-relaxed mb-3">
            {t('resume.summary.text1')}
          </p>
          <p className="text-gray-800 leading-relaxed">
            {t('resume.summary.text2')}
          </p>
        </section>

        {/* Experience / Career */}
        <section className="mb-8 page-break-avoid">
          <h2 className="text-2xl font-bold mb-4 border-b border-gray-300 pb-2">{t('resume.sections.career')}</h2>
          <div className="space-y-4">
            {resumeData.career.map((job, index) => (
              <div key={index} className="page-break-avoid">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold">{job.name}</h3>
                  <span className="text-sm text-gray-600">{job.period}</span>
                </div>
                {job.description && <p className="text-gray-700">{job.description}</p>}
              </div>
            ))}
          </div>
        </section>

        {/* Skills — 카테고리별 구분 */}
        <section className="mb-8 page-break-avoid">
          <h2 className="text-2xl font-bold mb-4 border-b border-gray-300 pb-2">{t('resume.sections.skills')}</h2>
          <table className="w-full text-sm">
            <tbody>
              {((locale || 'ko') === 'en'
                ? [
                    ['Web · Full-stack', 'React · TypeScript · Vite · Next.js 14 · Spring Boot 3.5 · Java 21 · REST API'],
                    ['Data', 'PostgreSQL · MyBatis · SQL · Data modeling'],
                    ['AI', 'Local LLM (Ollama) · Prompt engineering · Tool routing · Evaluation (golden set) · On-device classification (Vision · Apple Intelligence)'],
                    ['Engineering', 'Git · GitHub Actions (CI/CD) · Unit · integration tests · Docker'],
                    ['Apple platforms', 'Swift · SwiftUI · SwiftData · StoreKit 2'],
                  ]
                : [
                    ['웹 · 풀스택', 'React · TypeScript · Vite · Next.js 14 · Spring Boot 3.5 · Java 21 · REST API'],
                    ['데이터', 'PostgreSQL · MyBatis · SQL · 데이터 모델링'],
                    ['AI', '로컬 LLM(Ollama) · 프롬프트 엔지니어링 · 도구 라우팅 · 평가체계(골든셋) · 온디바이스 분류(Vision · Apple Intelligence)'],
                    ['엔지니어링', 'Git · GitHub Actions(CI/CD) · 단위·통합 테스트 · Docker'],
                    ['Apple 플랫폼', 'Swift · SwiftUI · SwiftData · StoreKit 2'],
                  ]
              ).map(([category, items]) => (
                <tr key={category} className="border-b border-gray-100 last:border-0">
                  <th className="text-left align-top font-semibold text-gray-900 w-40 py-1.5 pr-4 whitespace-nowrap">{category}</th>
                  <td className="py-1.5 text-gray-700">{items}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Experience / Projects */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 border-b border-gray-300 pb-2">{t('resume.sections.projects')}</h2>

          <div className="space-y-6">
            {resumeProjects.map((project, index) => {
              const det = (resumeData.projectDetails && resumeData.projectDetails[project.key]) || {};
              const title = det.title || project.key;
              const highlights = (det.highlights || []).slice(0, 4);
              return (
                <div key={project.key} className={`page-break-avoid ${index !== resumeProjects.length - 1 ? 'border-b border-gray-200 pb-4' : ''}`}>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold">{title}</h3>
                    <span className="text-sm text-gray-600">{project.duration}</span>
                  </div>
                  {det.role && <p className="text-sm text-gray-600 mb-2">{det.role}</p>}
                  <p className="text-gray-800 mb-2">{det.description}</p>
                  <div className="mb-2">
                    <span className="text-sm font-semibold">Tech Stack: </span>
                    <span className="text-sm text-gray-700">{project.techStack.join(', ')}</span>
                  </div>
                  {highlights.length > 0 && (
                    <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                      {highlights.map((highlight, idx) => {
                        // 콜론(:) 앞 라벨을 굵게 표시
                        if (!highlight || typeof highlight !== 'string') {
                          return <li key={idx}>-</li>;
                        }
                        const parts = highlight.split(/(:)/);
                        const label = parts[0] || '';
                        const colon = parts[1] || '';
                        const content = parts.slice(2).join('') || '';
                        return (
                          <li key={idx}>
                            <span className="font-bold text-base">{label}{colon}</span>
                            {content}
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Education */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 border-b border-gray-300 pb-2">{t('resume.sections.education')}</h2>
          <div className="space-y-4">
            {resumeData.education.map((edu, index) => (
              <div key={index} className="page-break-avoid">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold">{edu.name}</h3>
                  <span className="text-sm text-gray-600">{edu.period}</span>
                </div>
                <p className="text-gray-700">{edu.description}</p>
                {edu.details && (
                  <ul className="list-disc list-inside text-sm text-gray-700 mt-2">
                    {edu.details.map((detail, idx) => (
                      <li key={idx}>{detail}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Other / 기타 */}
        {resumeData.etc && resumeData.etc.length > 0 && (
          <section className="mb-8 page-break-avoid">
            <h2 className="text-2xl font-bold mb-4 border-b border-gray-300 pb-2">{t('resume.sections.etc')}</h2>
            <div className="space-y-4">
              {resumeData.etc.map((item, index) => (
                <div key={index} className="page-break-avoid">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold">{item.name}</h3>
                    <span className="text-sm text-gray-600">{item.period}</span>
                  </div>
                  {item.description && <p className="text-gray-700">{item.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Key Achievements */}
        <section className="mb-8 page-break-avoid">
          <h2 className="text-2xl font-bold mb-4 border-b border-gray-300 pb-2">{t('resume.sections.achievements')}</h2>
          <ul className="list-disc list-inside text-gray-800 space-y-2">
            {resumeData.achievements.map((achievement, index) => (
              <li key={index}>{achievement}</li>
            ))}
          </ul>
        </section>

        {/* Footer */}
        <footer className="mt-12 pt-6 border-t border-gray-300 text-center text-sm text-gray-600">
          <p>{t('resume.footer.portfolio')} <a href="https://whatdoisa.github.io/songheon.jeong-portfolio/" className="text-blue-600 hover:underline">whatdoisa.github.io/songheon.jeong-portfolio</a></p>
          <p className="mt-2">{t('resume.footer.downloadDescription')}</p>
        </footer>
      </div>

      {/* PDF 저장 버튼 (인쇄 시 숨김) — 모바일: 하단 우측 플로팅 / 데스크톱: 상단 우측. z-50으로 항상 최상위. */}
      <div className="fixed z-50 right-4 bottom-6 sm:bottom-auto sm:top-20 print:hidden">
        <button
          onClick={handleDownloadPDF}
          className="bg-ios-gray-900 text-white dark:bg-white dark:text-ios-gray-900 px-5 py-2.5 rounded-xl shadow-lg text-sm font-bold hover:opacity-85 transition-opacity"
          title={t('resume.downloadHint')}
        >
          {t('resume.download')}
        </button>
      </div>
    </div>
  );
}
