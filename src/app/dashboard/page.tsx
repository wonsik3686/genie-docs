import IntegrationStatus from '@/components/dashboard/IntegrationStatus';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Link from 'next/link';

export default function Dashboard() {
  return (
    <div className="flex w-full">
      <div className="w-full pr-8 pt-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="mt-8 flex flex-col gap-4 md:flex-row">
          <IntegrationStatus />
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
