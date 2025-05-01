import AIResponseDisplay from '@/components/ai/AIResponseDisplay';
import APITemplateForm from '@/components/ai/templates/api';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'API 문서 생성 | Genie Docs',
  description: 'AI를 활용하여 API 문서를 자동으로 생성합니다.',
  openGraph: {
    title: 'API 문서 생성 | Genie Docs',
    description: 'AI를 활용하여 API 문서를 자동으로 생성합니다.',
    type: 'website',
  },
};

export default function ApiPage() {
  return (
    <>
      <h1 className="text-2xl font-bold">API 문서 생성</h1>
      <div className="grid h-[calc(100vh-10rem)] grid-cols-1 gap-4 md:grid-cols-2">
        <APITemplateForm />
        <AIResponseDisplay />
      </div>
    </>
  );
}
