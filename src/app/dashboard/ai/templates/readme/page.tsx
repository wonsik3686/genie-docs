import AIResponseDisplay from '@/components/ai/AIResponseDisplay';
import ReadmeTemplateForm from '@/components/ai/ReadmeTemplateForm';

function ReadmePage() {
  return (
    <>
      <h1 className="text-2xl font-bold">README 문서 생성</h1>
      <ReadmeTemplateForm />
      <AIResponseDisplay />
    </>
  );
}

export default ReadmePage;
