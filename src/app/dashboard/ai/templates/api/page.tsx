import AIResponseDisplay from '@/components/ai/AIResponseDisplay';
import APITemplateForm from '@/components/ai/APITemplateForm';

function ApiPage() {
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

export default ApiPage;
