import AITemplateSelector from '@/components/ai/AITemplateSelector';
import StoredAIResponseList from '@/components/ai/StoredAIResponseList';
import { Metadata } from 'next';

function AiPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">AI</h1>
      <div className="flex flex-col gap-4">
        <AITemplateSelector />
        <StoredAIResponseList />
      </div>
    </div>
  );
}

export default AiPage;

export const metadata: Metadata = {
  title: 'AI 문서 관리 | Genie Docs',
  description: 'AI로 생성된 문서들을 관리하고 확인하세요.',
  openGraph: {
    title: 'AI 문서 관리 | Genie Docs',
    description: 'AI로 생성된 문서들을 관리하고 확인하세요.',
    type: 'website',
  },
};
