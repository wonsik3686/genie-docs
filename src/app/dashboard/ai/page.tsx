import AITemplateSelector from '@/components/ai/AITemplateSelector';
import StoredAIResponseList from '@/components/ai/StoredAIResponseList';

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
