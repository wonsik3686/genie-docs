import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';

function AITemplateSelector() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-bold">
            프로젝트 개요 문서 생성
          </CardTitle>
          <CardDescription>프로젝트 개요 문서를 생성합니다.</CardDescription>
        </CardHeader>
        <CardContent>
          <Link href="/dashboard/ai/templates/overview">
            <Button className="w-full">생성하기</Button>
          </Link>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-bold">README 문서 생성</CardTitle>
          <CardDescription>README 문서를 생성합니다.</CardDescription>
        </CardHeader>
        <CardContent>
          <Link href="/dashboard/ai/templates/readme">
            <Button className="w-full">생성하기</Button>
          </Link>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-bold">API 문서 생성</CardTitle>
          <CardDescription>API 문서를 생성합니다.</CardDescription>
        </CardHeader>
        <CardContent>
          <Link href="/dashboard/ai/templates/api">
            <Button className="w-full">생성하기</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}

export default AITemplateSelector;
