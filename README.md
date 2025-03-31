![지니독스_랜딩페이지](https://github.com/user-attachments/assets/ef545a69-d5a6-40cf-b402-8b9efaeb0336)# Genie Docs

> OpenAI 와 Notion 를 활용하여 문서를 생성하는 프로젝트
> 

## 📚 목차

1. [프로젝트 소개](#1-프로젝트-소개)
2. [개발 환경](#2-개발-환경)
3. [기술 스택](#3-기술-스택)
4. [페이지 구성](#4-페이지-구성)
5. [주요 기능](#5-주요-기능)
6. [유저 플로우](#6-유저-플로우)
7. [아키텍처](#7-아키텍처)
8. [주요 폴더 구조](#8-주요-폴더-구조)
9. [배포 및 실행 방법](#9-배포-및-실행-방법)

---

## 1. 프로젝트 소개

**Genie Docs** 는 Notion 에 저장되어 있는 페이지 정보를 불러와, OpenAI API 를 통해 프로젝트 개요·API 문서·README 등을 생성해 주는 웹 애플리케이션입니다.

- **AI 기반 문서 생성**: OpenAI 를 기반으로 프로젝트 개요, API 스펙, README 등 문서 생성
- **Notion 연동**: 문서 검색 및 선택된 페이지(블록)들을 불러와서 문서 생성에 활용
- **스트리밍**: OpenAI API의 SSE(Server-Sent Events) 기능으로 실시간 결과 표시

### 개발 기간

- 2025년 2월 ~ 2025년 3월 (약 1개월)

### 프로젝트 링크

- **GitHub**: https://github.com/your-username/genie-docs
- **배포 주소(Vercel)**: [https://genie-docs.vercel.app](https://genie-docs.vercel.app/)
- **배포 주소(Netlify):**  [https://geniedocs.netlify.app](https://geniedocs.netlify.app/)

---

## 2. 개발 환경

- **Node.js**: v19 이상
- **IDE**: VSCode
- **OS**: Windows / macOS
- **Package Manager**: npm v9 이상
- **Lint/Format**: ESLint, Prettier
- **Version Control**: git
- **deploy**: vercel, netlify

---

## 3. 기술 스택

| 카테고리 | 기술 | 버전/설명 |
| --- | --- | --- |
| **프레임워크** | Next.js | App Router 구조 |
|  | React | 18 이상 |
|  | TypeScript | 5.0 이상 |
| **상태 관리** | Zustand | 클라이언트 상태 관리 |
|  | React Query | 서버 상태 관리 |
| **UI/스타일링** | Shadcn/ui | UI 컴포넌트 라이브러리 |
|  | TailwindCSS | CSS 프레임워크 |
| **API 통합** | OpenAI API | GPT-4 Turbo |
|  | Notion API | 페이지/블록 관리 |
| **폼 관리** | React Hook Form | 폼 상태 관리 |
|  | Zod | 스키마 검증 |
| **개발 도구** | ESLint | 코드 품질 관리 |
|  | Prettier | 코드 포맷팅 |
| **타입 시스템** | TypeScript | 정적 타입 체크 |

---

## 4. 페이지 구성

### 1) 랜딩 페이지 (`/`)

![지니독스_랜딩페이지](https://github.com/user-attachments/assets/1e306093-c7c9-4edb-ae4c-c4b59d83b631)

- **서비스 소개**
- **설정 방법**

### 2) 대시보드 (`/dashboard`)

![지니독스_문서](https://github.com/user-attachments/assets/3a0dc4f5-16f0-4bc8-a926-9efa313c16c2)

- **연동 상태 모니터링**: Notion, OpenAI 연동 상태 확인
- **문서 생성 메뉴**: 프로젝트 개요, README, API 문서 생성 바로가기

### 3) AI 페이지 (`/dashboard/ai`)

![지니독스_저장문서리스트](https://github.com/user-attachments/assets/956d655c-2019-4eda-8228-b19cead41ecb)

- **문서 히스토리**: 생성된 모든 AI 문서 목록 표시

### 4)  AI 문서 생성 페이지 (`/dashboard/ai/templates/overview`)

![지니독스_문서작성1](https://github.com/user-attachments/assets/a5595618-df4d-4d04-b238-0454b5170ac5)

![지니독스_문서저장](https://github.com/user-attachments/assets/75bc4392-c111-49a4-94cd-ce7bb2fae90a)

![지니독스_페이지선택](https://github.com/user-attachments/assets/c3dabb4f-942f-4e1b-b9e6-e7453551c427)

- **페이지 선택**: 프롬프트에 사용할 Notion 페이지 데이터 선택
- **프롬프트 항목 폼:** 문서 생성 시 필요한 정보를 입력할 수 있는 폼
- **실시간 AI 응답**: 생성 버튼 클릭 시 OpenAI API 를 통해 요청하며 생성되는 응답을 스트리밍을 통해 UI 로 확인
- **Notion 저장:** 생성된 응답을 Notion 에 페이지로 저장

### 설정 페이지 (`/settings`)

![지니독스_설정](https://github.com/user-attachments/assets/5d5377d2-3580-40cf-8a0c-c6a90009495c)

- **API 키 관리**: OpenAI, Notion API 키 설정
- **기본 설정**: 기본 Notion 페이지 ID 설정

각 페이지는 반응형 디자인이 적용되어 있으며, SEO 최적화를 위한 메타데이터가 구성되어 있습니다.

---

## 5. 주요 기능

### 1. AI 기반 문서 생성

- **다양한 문서 템플릿 지원**
    
    ![지니독스_문서작성1](https://github.com/user-attachments/assets/385957ca-f3eb-4673-8b12-8197f39c62a1)

    - 프로젝트 개요, API 문서, README 등 목적별 특화 템플릿
    - OpenAI 기반의 AI 문서 생성
    - 커스텀 프롬프트 입력 기능
- **Notion 블록 데이터 활용**
    
    ![지니독스_페이지선택](https://github.com/user-attachments/assets/2731b3ab-ebda-4162-88cb-f1c13ac2f673)

    ```tsx
    const getPromptTemplate = (
      formValues: ReadmeTemplateSchemaType,
      pagesContent: string
    ) => {
      return ReadmeTemplatePrompt(
        formValues.projectName,
        formValues.installation,
        formValues.usage,
        formValues.contribution,
        formValues.additionalPrompt,
        pagesContent // Notion 페이지 데이터
      );
    };
    
    ```
    
    - 기존 Notion 문서를 컨텍스트로 활용
    - 프로젝트 컨텍스트를 이해한 맞춤형 문서 생성
- **Server-Sent Events(SSE) 구현 (스트리밍)**
    
    ![지니독스_문서작성1](https://github.com/user-attachments/assets/1bd154a1-8a5b-4f3b-9a37-b12561e7b834)

    ```tsx
    // 서버 측 (OpenAI 스트리밍)
    
    // 1. OpenAI로부터 스트림 받기
    const stream = await openai.chat.completions.create({
      model: 'gpt-4-turbo',
      messages: [...],
      stream: true,  // 스트리밍 모드 활성화
    });
    
    // 2. SSE 스트림 변환
    const customStream = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          const content = chunk.choices[0]?.delta?.content || '';
          // SSE 형식: "data: {데이터}\n\n"
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ content })}\n\n`)
          );
        }
      }
    });
    
    // 3. SSE 헤더 설정
    return new NextResponse(customStream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    });
    ```
    
    ```tsx
    
    // 클라이언트 측 (스트림 처리)
    
    // 1. 스트림 읽기 설정
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    
    while (true) {
      // 2. 청크 단위로 데이터 읽기
      const { done, value } = await reader.read();
      if (done) break;
    
      // 3. 데이터 파싱 및 처리
      const chunk = decoder.decode(value);
      const lines = chunk.split('\n');
    
      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = JSON.parse(line.slice(5));
          // 4. React Query로 상태 업데이트
          queryClient.setQueryData(['openai', 'stream'], result);
        }
      }
    }
    ```
    
    - OpenAI API의 스트리밍 응답을 실시간으로 클라이언트에 전달
    - 청크 단위 디코딩 및 마크다운 렌더링
    - React Query를 활용한 상태 관리

### 3. Notion 연동

- **포맷팅 및 페이지 저장**
    
    ![지니독스_문서저장](https://github.com/user-attachments/assets/020630e1-fc27-4b2e-8b0b-47a4759c14ee)

    ```tsx
    function handleSaveAIResponse() {
      if (aiResponse) {
        createNotionPage({
          parentPageId: selectedParentPage.pageId,
          title: aiResponse.title,
          content: aiResponse.content,
        });
      }
    }
    ```
    
    - AI 응답을 선택된 Notion 페이지의 하위 페이지로 저장
    - 이미지, 코드 블록 등 리치 컨텐츠 지원

- **실시간 문서 검색**
    
    ![지니독스_검색](https://github.com/user-attachments/assets/aa4f38bb-cea3-42e4-aed3-b546f1c5ad8e)

    - 연결된 페이지 내 문서 실시간 검색
    - 제목 기반 필터링
    - 최근 수정 순 정렬 지원
- **계층 구조 탐색**
    
    ![지니독스_문서](https://github.com/user-attachments/assets/da16a8b7-b1ee-4969-9f6a-fd8e1991fe39)

    - Notion API 를 활용해 페이지 데이터 요청
    - 페이지 구조 시각화

---

## 6. 유저 플로우

1. 사용자가 랜딩 페이지에 진입하여 서비스 소개, 설정 방법을 확인합니다.
2. 설정 페이지에서 Notion API Key, Notion PageID, OpenAI API Key 를 설정합니다.
3. 대시보드 진입 후 사이드바에서 연동된 Notion 페이지 계층을 확인할 수 있고, 하나를 클릭해 노션 문서 페이지로 진입하면 내용도 확인할 수 있습니다.
4. AI 문서 작성 페이지에 진입해 작성할 문서 템플릿을 선택해 AI 문서 작성 템플릿 페이지로 진입합니다.
5. **Notion 페이지 선택** → AI 문서 작성 프롬프트에 사용하기 원하는 페이지들을 선택합니다.
6. **프롬프트 입력** → 프로젝트 개요, API 문서, README 등 카테고리에 맞춰 필요한 추가 정보를 기입합니다.
7. **OpenAI Chat API 호출** → 서버 측에서 GPT-4 turbo 모델을 사용해 실시간 스트리밍합니다.
8. **결과 확인** → 스트리밍되는 결과를 실시간으로 UI에 표시합니다.
9. **Notion에 저장** → 생성된 문서를 Notion 페이지로 저장합니다.(옵션)

![image](https://github.com/user-attachments/assets/d582724c-4fb9-4966-9d77-8fecccd04768)

---

## 7. 아키텍처

![image](https://github.com/user-attachments/assets/0cf41630-0570-43c8-9108-5f8c38eee00e)

- **프론트엔드**: Next.js로 구성, `React Query`를 통해 데이터 상태 관리
- API Route: `/api/openai/chat` 라우트에서 OpenAI API 호출 및 SSE 처리, `/api/notion/page, block, search` 라우트에서 Notion API 호출
- **OpenAI API**: 스트리밍 응답을 수신
- **Notion API**: 문서화할 페이지(블록) 정보 조회 및 저장

### 프로젝트 구조

- **UI Layer**: 컴포넌트(`/components`)
- **Business Layer**: (`/hooks`)
- **State Layer**: React Query (`/queries`), Zustand (`/store`)
- **API Layer**: Serverless Function(`/app/api/openai/chat/route.ts`)
- **Router**: Next.js App Router(`/app/dashboard/...`)

---

## 8. 주요 폴더 구조

```bash
src/
├── app/
│   ├── api/
│   │   ├── notion/
│   │   │   └── page, block, search/
│   │   │       └── route.ts         # Notion API 라우트
│   │   └── openai/
│   │       └── chat/
│   │           └── route.ts         # OpenAI API 라우트
│   ├── dashboard/                   # 대시보드 페이지
│   ├── settings/                   # 세팅 페이지
│   └── page.tsx                    # 메인 페이지
├── components/
│   ├── ai/                         # AI 관련 컴포넌트
│   ├── notion/                     # Notion 관련 컴포넌트
│   ├── dashboard/                  # 대시보드 관련 컴포넌트
│   └── ui/                        # UI 컴포넌트 (shadcn/ui)
├── hooks/                         # 훅 관련
├── constants/
│   ├── formSchemas/               # zod 스키마
│   └── promptTemplates/           # AI 프롬프트 템플릿
├── queries/                       # React Query 관련
│   ├── keys/                     # 쿼리 키 관련
│   ├── notion.queries.ts         # Notion API 쿼리
│   └── openai.queries.ts         # OpenAI API 쿼리
├── store/                        # Zustand 스토어
│   ├── notionStore.ts           # Notion 관련 상태
│   ├── openaiStore.ts           # OpenAI 관련 상태
│   └── settingStore.ts          # 설정 관련 상태
├── types/                       # 타입 정의
│   ├── notion.types.ts
│   └── openai.types.ts
└── /utils                        # 유틸리티 함수들
```

---

## 9. 배포 및 실행 방법

1. **리포지토리 클론**
    
    ```bash
    git clone <https://github.com/your-username/genie-docs.git>
    
    ```
    
2. **의존성 설치**
    
    ```bash
    cd genie-docs
    npm install
    ```
    
3. **개발 서버 실행**
    
    ```bash
    npm run dev
    ```
    
    - 브라우저에서 `http://localhost:3000`에 접속
4. **빌드 및 배포**
    
    ```bash
    npm run build
    npm run start
    ```
    
    - [Vercel](https://vercel.com/) 배포 시에는, GitHub 리포지토리 연결 후 빌드 커맨드 `npm run build` 지정

---

