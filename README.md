# Genie Docs

**Genie Docs**는 Next.js 기반으로 개발된 프로젝트로, 문서 관리와 AI 기반 기능(OpenAI, Notion)을 접목하여 **효율적인 생산성**을 제공하는 프론트엔드 애플리케이션입니다.  
Tailwind CSS, Shadcn/UI, React Query 등을 통합해 **쉽고 빠른 UI/UX**를 구현할 수 있도록 구성했습니다.

---

## 주요 기능

- **Next.js 13+**  
  App Router를 사용하여 페이지와 API 라우트를 효율적으로 구성할 수 있습니다.
- **TypeScript**  
  안정적인 타입 지원을 통해 유지보수성과 협업 효율을 높였습니다.
- **Tailwind CSS**  
  Utility-First 스타일링 프레임워크로 빠르고 일관성 있는 UI 구현이 가능합니다.
- **Shadcn/UI**  
  Tailwind 기반 컴포넌트 라이브러리로, 반복 개발 요소를 최소화하고 UI 일관성을 향상시킵니다.
- **React Query (@tanstack/react-query)**  
  데이터 패칭, 캐싱, 상태 관리를 효율적으로 처리하여 사용자 경험을 개선합니다.
- **OpenAI / Notion Client**  
  AI 문서 작성, 노션 데이터 연동 등을 위한 API 연동 기능을 제공합니다.

---

## 시작하기

### 개발 서버 실행

````bash
npm run dev
# 또는
yarn dev
# 또는
pnpm dev
# 또는
bun dev

브라우저에서 http://localhost:3000을 열면 페이지가 정상적으로 표시됩니다.
app/page.tsx 파일을 수정하여 실시간으로 결과를 확인할 수 있습니다.

### 빌드 & 프로덕션 실행

```bash
npm run build
# 또는
yarn build
# 또는
pnpm build
# 또는
bun build
````

### 환경 변수 설정

.env.local 또는 .env 파일에 다음처럼 API 키와 중요 정보를 저장합니다(예: OpenAI, Notion API):

```bash
OPENAI_API_KEY=...
NOTION_API_KEY=...
```

### 배포하기

가장 간편한 배포 방법은 Vercel 플랫폼을 사용하는 것입니다.
Next.js를 만든 Vercel을 통해 손쉽게 CI/CD 파이프라인을 구성할 수 있고, 자동으로 프리뷰 환경도 생성할 수 있습니다.

```bash
# 예시: Vercel CLI 설치 후
npm i -g vercel
vercel
```
