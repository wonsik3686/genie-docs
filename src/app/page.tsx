import MainScene from '@/components/three/MainScene';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BotIcon,
  FastForwardIcon,
  GithubIcon,
  NotepadTextIcon,
  TargetIcon,
} from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-16 p-8 pb-20 sm:p-20">
      <MainScene />
      <main className="flex flex-col items-center justify-center gap-8">
        <div className="flex flex-col items-center justify-center gap-2 text-center">
          <span className="break-words break-keep p-4 text-center text-2xl font-medium">
            반복 업무는 Genie Docs 에게, 더 중요한 일에 집중하세요
          </span>
        </div>
        <div className="feature-cards grid grid-cols-1 gap-4 break-keep sm:grid-cols-2 lg:grid-cols-4">
          <Card className="flex flex-col items-center justify-center gap-2 p-10">
            <NotepadTextIcon />
            <h3>노션 문서 연동</h3>
            <p>노션과 연결하여 모든 문서를 한 곳에서 관리하세요.</p>
          </Card>
          <Card className="flex flex-col items-center justify-center gap-2 p-10">
            <BotIcon />
            <h3>AI 문서 작성</h3>
            <p>AI가 문서를 자동 생성하고, 스타일을 맞춰줍니다.</p>
          </Card>
          <Card className="flex flex-col items-center justify-center gap-2 p-10">
            <FastForwardIcon />
            <h3>반복 업무 자동화</h3>
            <p>규칙을 설정하면 매주 정리된 보고서를 자동으로 생성해요.</p>
          </Card>
          <Card className="flex flex-col items-center justify-center gap-2 p-10">
            <TargetIcon name="target" />
            <h3>맞춤형 설정</h3>
            <p>당신에게 꼭 맞는 문서 환경을 설정하세요.</p>
          </Card>
        </div>
        <Card className="usage-guide flex w-full flex-col items-center justify-center gap-4 break-keep p-8">
          <h2 className="text-xl font-bold">✨ 3단계로 시작하기!</h2>
          <Card className="w-full max-w-2xl">
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
                <span className="rounded-md p-1 font-bold text-accent-point outline outline-accent-point">
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
          <Card className="w-full max-w-2xl">
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
              <p>
                (예) 복사된 URL이
                https://www.notion.so/BookNotion-3956b991ea4a4b90b893f3abd1ed054b라면,
                <br />
                페이지 ID는 3956b991ea4a4b90b893f3abd1ed054b 입니다.
              </p>
              <p>페이지 ID를 입력하고 페이지에 입력해 주세요.</p>
            </CardContent>
          </Card>
          <Card className="w-full max-w-2xl">
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
          <Button
            className="mt-4 w-52 bg-accent-light text-lg-bold hover:bg-accent-light/80 dark:bg-accent-dark dark:hover:bg-accent-dark/80	"
            variant="default"
            asChild
          >
            <Link href="/dashboard/settings">설정 시작하기</Link>
          </Button>
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
