import AIResponseDisplay from '@/components/ai/AIResponseDisplay';
import OverviewTemplateForm from '@/components/ai/OverviewTemplateForm';

function OverviewPage() {
  return (
    <>
      <h1 className="text-2xl font-bold">프로젝트 개요 문서 생성</h1>
      <OverviewTemplateForm />
      <AIResponseDisplay />
    </>
  );
}

export default OverviewPage;
