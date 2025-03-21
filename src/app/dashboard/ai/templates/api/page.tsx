import AIResponseDisplay from '@/components/ai/AIResponseDisplay';
import APITemplateForm from '@/components/ai/APITemplateForm';

function ApiPage() {
  return (
    <>
      <h1 className="text-2xl font-bold">API 문서 생성</h1>
      <APITemplateForm />
      <AIResponseDisplay />
    </>
  );
}

export default ApiPage;
