import AIResponseDisplay from '@/components/ai/AIResponseDisplay';
import ReadmeTemplateForm from '@/components/ai/ReadmeTemplateForm';

function ReadmePage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">README 문서 생성</h1>
      <ReadmeTemplateForm />
      <AIResponseDisplay />
    </div>
  );
}

export default ReadmePage;
