import AIResponseDisplay from '@/components/ai/AIResponseDisplay';
import APITemplateForm from '@/components/ai/APITemplateForm';

function ApiPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">API 문서 생성</h1>
      <APITemplateForm />
      <AIResponseDisplay />
    </div>
  );
}

export default ApiPage;
