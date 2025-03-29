import AIResponseDisplay from '@/components/ai/AIResponseDisplay';
import ReadmeTemplateForm from '@/components/ai/ReadmeTemplateForm';

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
