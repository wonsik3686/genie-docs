import AITemplateSelector from '@/components/ai/AITemplateSelector';

function AiPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">AI</h1>
      <div className="flex flex-col gap-4">
        <AITemplateSelector />
      </div>
    </div>
  );
}

export default AiPage;
