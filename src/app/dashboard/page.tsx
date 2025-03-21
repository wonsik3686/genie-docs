'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useSettingStore } from '@/store/settingStore';
import Cookies from 'js-cookie';
import Link from 'next/link';

export default function Dashboard() {
  const notionApiKey = Cookies.get('notionApiKey');
  const { notionPageId } = useSettingStore();
  const openAIApiKey = Cookies.get('openAiApiKey');

  return (
    <div className="flex w-full">
      <div className="w-full pr-8 pt-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="mt-8 flex flex-col gap-4 md:flex-row">
          <Card className="w-full md:w-1/2">
            <CardHeader className="text-lg font-bold">설정 현황</CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <div
                    className={cn(
                      'h-2 w-2 rounded-full',
                      notionApiKey && notionPageId
                        ? 'bg-green-500'
                        : 'bg-red-500'
                    )}
                  />
                  <p>
                    노션 연동 {notionApiKey && notionPageId ? '완료' : '미완료'}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className={cn(
                      'h-2 w-2 rounded-full',
                      openAIApiKey ? 'bg-green-500' : 'bg-red-500'
                    )}
                  />
                  <p>OpenAI 연동 {openAIApiKey ? '완료' : '미완료'}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="w-full md:w-1/2">
            <CardHeader className="text-lg font-bold">AI 문서 작성</CardHeader>
            <CardContent>
              <Button variant="ghost" asChild>
                <Link href="/dashboard/ai" className="w-full text-lg-regular">
                  저장된 문서 보기
                </Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link
                  href="/dashboard/ai/templates/overview"
                  className="w-full text-lg-regular font-bold"
                >
                  프로젝트 개요 문서 생성
                </Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link
                  href="/dashboard/ai/templates/readme"
                  className="w-full text-lg-regular font-bold"
                >
                  README 문서 생성
                </Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link
                  href="/dashboard/ai/templates/api"
                  className="w-full text-lg-regular font-bold"
                >
                  API 문서 생성
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
