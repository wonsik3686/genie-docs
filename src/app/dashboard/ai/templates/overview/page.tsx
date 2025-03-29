import AIResponseDisplay from '@/components/ai/AIResponseDisplay';
import OverviewTemplateForm from '@/components/ai/OverviewTemplateForm';

function OverviewPage() {
  return (
    <>
      <h1 className="text-2xl font-bold">프로젝트 개요 문서 생성</h1>
      <div className="grid h-[calc(100vh-10rem)] grid-cols-1 gap-4 md:grid-cols-2">
        <OverviewTemplateForm />
        <AIResponseDisplay />
      </div>
    </>
  );
}

export default OverviewPage;
