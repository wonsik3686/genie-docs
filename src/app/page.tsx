import MainScene from '@/components/three/MainScene';
import { Card } from '@/components/ui/card';
import {
  BotIcon,
  FastForwardIcon,
  NotepadTextIcon,
  TargetIcon,
} from 'lucide-react';

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
      </main>
      <footer className="flex flex-wrap items-center justify-center gap-6">
        <p>footer</p>
      </footer>
    </div>
  );
}
