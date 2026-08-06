#!/usr/bin/env node
// projects.js와 caseStudies.js가 같은 프로젝트에 대해 서로 다른 사실을 말하지 않는지 검사한다.
// 파싱 리스크를 피하려고 파일을 텍스트로 읽어 App Store 링크와 핵심 불변식만 확인한다.
// 실행: npm run check:data  (불일치 시 exit 1)

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const projects = readFileSync(join(root, 'data/projects.js'), 'utf8');
const caseStudies = readFileSync(join(root, 'data/caseStudies.js'), 'utf8');
const page = readFileSync(join(root, 'app/page.js'), 'utf8');

// 이력서(projects.js)와 케이스(caseStudies.js) 양쪽에 동일하게 유지해야 하는 출시작 링크.
const SHIPPED = {
  SmartEdge: 'https://apps.apple.com/kr/app/smartedge/id6787634027?mt=12',
  'Show(X)': 'https://apps.apple.com/kr/app/showx/id6755496321',
  'kip!': 'https://apps.apple.com/kr/app/kip/id6754709167',
  ReToU: 'https://apps.apple.com/kr/app/re-tou/id6745058969',
};

// SEED는 출시작이지만 이력서 카드(projects.js)에는 편입하지 않기로 함 →
// 케이스(caseStudies.js)와 출시·운영 표(app/page.js)에서만 링크 일치를 검사한다.
const SHIPPED_CASE_ONLY = {
  SEED: 'https://apps.apple.com/kr/app/seed-%ED%88%AC%EC%9E%90-%EC%97%B0%EC%8A%B5%EC%9E%A5/id6789554674',
};

const errors = [];

for (const [name, url] of Object.entries(SHIPPED)) {
  if (!projects.includes(url)) errors.push(`projects.js에 ${name} App Store 링크 누락/불일치: ${url}`);
  if (!caseStudies.includes(url)) errors.push(`caseStudies.js에 ${name} App Store 링크 누락/불일치: ${url}`);
}

for (const [name, url] of Object.entries(SHIPPED_CASE_ONLY)) {
  if (!caseStudies.includes(url)) errors.push(`caseStudies.js에 ${name} App Store 링크 누락/불일치: ${url}`);
  if (!page.includes(url)) errors.push(`app/page.js(출시·운영 표)에 ${name} App Store 링크 누락/불일치: ${url}`);
}

// 미검증으로 제거하기로 한 주장이 다시 들어오지 않았는지 가드.
const banned = [
  ['Rootrip 단위/UI 테스트 주장', /Unit testing and UI testing/i, projects],
  ['Supabase(근거 없음)', /supabase/i, projects + caseStudies],
];
for (const [label, re, hay] of banned) {
  if (re.test(hay)) errors.push(`금지 표현이 다시 등장: ${label}`);
}

if (errors.length) {
  console.error('❌ 데이터 정합성 검사 실패:');
  for (const e of errors) console.error('  - ' + e);
  process.exit(1);
}
console.log('✅ 데이터 정합성 검사 통과 (App Store 링크 일치, 금지 표현 없음)');
