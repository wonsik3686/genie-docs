import AIResponseDisplay from '@/components/ai/AIResponseDisplay';
import ReadmeTemplateForm from '@/components/ai/ReadmeTemplateForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'README 문서 생성 | Genie Docs',
  description: 'AI를 활용하여 프로젝트의 README 문서를 자동으로 생성합니다.',
  openGraph: {
    title: 'README 문서 생성 | Genie Docs',
    description: 'AI를 활용하여 프로젝트의 README 문서를 자동으로 생성합니다.',
    type: 'website',
  },
};

function ReadmePage() {
  return (
    <>
      <h1 className="text-2xl font-bold">README 문서 생성</h1>
      <div className="grid h-[calc(100vh-10rem)] grid-cols-1 gap-4 md:grid-cols-2">
        <ReadmeTemplateForm />
        <AIResponseDisplay />
      </div>
    </>
  );
}

export default ReadmePage;
