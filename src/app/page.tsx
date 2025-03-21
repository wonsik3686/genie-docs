'use client';

import MainScene from '@/components/three/MainScene';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GithubIcon } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';

const features = [
  {
    title: '🔗 노션 문서 연동',
    description: '모든 문서를 한 곳에서 관리하세요.',
  },
  { title: '✍️ AI 문서 작성', description: 'AI가 자동으로 문서를 생성합니다.' },
  {
    title: '⚡ 반복 업무 자동화',
    description: '매주 정리된 보고서를 자동 생성하세요.',
  },
  {
    title: '🎯 맞춤 설정',
    description: '당신에게 맞는 문서 환경을 설정하세요.',
  },
];

export default function Home() {
  const handleClickLookOver = () => {
    const element = document.getElementById('feature-cards');
    if (element) {
      const headerOffset = 80; // 헤더의 높이만큼 오프셋 추가
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="flex flex-col gap-16 p-8 pb-20 sm:pt-36 xs:pt-20">
      <MainScene />
      <main className="flex flex-col gap-8 break-keep">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-10 flex flex-col items-center justify-center py-20 text-center"
        >
          <h1 className="text-4xl font-bold">
            AI와 함께 더 스마트한 문서 관리
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            반복적인 문서 작업은 Genie Docs 에게 맡기고 더 중요한 일에
            집중하세요.
          </p>
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="mt-6"
          >
            <Button
              className="w-40 rounded-lg bg-accent-point text-white shadow-sm shadow-accent-point hover:bg-accent-point/80 dark:text-white"
              variant="default"
              onClick={handleClickLookOver}
            >
              살펴보기
            </Button>
          </motion.div>
        </motion.section>
        <div
          id="feature-cards"
          className="feature-cards mb-20 grid grid-cols-1 gap-4 break-keep sm:grid-cols-2 lg:grid-cols-4"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: false }}
              className="rounded-lg bg-secondary p-6 shadow-md"
            >
              <h3 className="text-xl font-bold">{feature.title}</h3>
              <p className="mt-2">{feature.description}</p>
            </motion.div>
          ))}
        </div>
        <Card className="usage-guide flex w-full flex-col items-center justify-center gap-4 break-keep p-8 xs:px-2 xs:py-6">
          <h2 className="text-xl font-bold">✨ 3단계로 시작하기!</h2>
          <Card className="w-full max-w-2xl bg-secondary">
            <CardHeader>
              <CardTitle className="text-xl font-bold">
                1. 노션 계정을 연결하세요
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <p>
                노션 계정을 연결하면 모든 문서를 한 곳에서 관리할 수 있어요.
              </p>
              <p>
                <Link
                  className="text-blue-500 underline"
                  href="https://www.notion.so/my-integrations"
                  target="_blank"
                >
                  Notion 통합 대시보드
                </Link>
                {'  '}에 접속 후{'  '}
                <span className="rounded-md border border-accent-point p-1 font-bold text-accent-point">
                  + New integration
                </span>{' '}
                버튼을 클릭하세요.
              </p>
              <p>
                통합 이름을 입력하고 관련 작업 공간, 유형을 선택하고 통합을
                생성하세요.
              </p>
              <p>
                통합의 Configuration 탭에서 API 시크릿을 복사 후 설정 페이지에
                붙여넣기 해주세요.
              </p>
              <p>
                Notion 통합 설정 페이지에서 콘텐츠 읽기, 업데이트, 입력 기능을
                승인해주세요.
              </p>
            </CardContent>
          </Card>
          <Card className="w-full max-w-2xl bg-secondary">
            <CardHeader>
              <CardTitle className="text-xl font-bold">
                2. 연동할 Notion 페이지의 페이지 ID 를 입력하세요
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <p>
                연동할 Notion 페이지의 ID 는 해당 Notion 페이지 URL 에서 확인할
                수 있어요.
              </p>
              <p>
                URL 형식은 https://www.notion.so/[페이지 이름]-
                <span className="font-bold text-accent-point">
                  [페이지 ID (32자리 문자열)]
                </span>
                입니다.
              </p>
              <p>이 페이지의 마지막에 있는 32자리 문자열이 페이지 ID 입니다.</p>
              <p className="break-all">
                (예) 복사된 URL이 https://www.notion.so/
                BookNotion-3956b991ea4a4b90b893f3abd1ed054b라면,
                <br />
                페이지 ID는 3956b991ea4a4b90b893f3abd1ed054b 입니다.
              </p>
              <p>페이지 ID를 입력하고 페이지에 입력해 주세요.</p>
            </CardContent>
          </Card>
          <Card className="w-full max-w-2xl bg-secondary">
            <CardHeader>
              <CardTitle className="text-xl font-bold">
                3. OpenAI API 키를 입력하세요
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <p>
                <Link
                  className="text-blue-500 underline"
                  href="https://platform.openai.com/api-keys"
                  target="_blank"
                >
                  OpenAI 대시보드
                </Link>
                에 접속 후 API 키를 생성합니다.
              </p>
              <p>
                <span className="p-1 font-bold text-accent-point">API 키</span>{' '}
                를 복사 후 설정 페이지에 붙여넣기 해주세요.
              </p>
              <p>
                모든 설정 항목을 입력하고 저장 버튼을 누르면 설정이 완료됩니다.
              </p>
            </CardContent>
          </Card>
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              className="mt-4 w-52 rounded-lg bg-accent-point text-white shadow-sm shadow-accent-point hover:bg-accent-point/80 dark:text-white"
              variant="default"
              asChild
            >
              <Link href="/settings">설정 시작하기</Link>
            </Button>
          </motion.div>
        </Card>
      </main>
      <footer className="flex flex-wrap items-center justify-center gap-6">
        <Link
          className="flex items-center gap-2"
          href="https://github.com/wonsik3686/genie-docs"
        >
          <GithubIcon className="h-6 w-6 rounded-full border border-black p-1 dark:border-white" />
          깃허브
        </Link>
      </footer>
    </div>
  );
}
