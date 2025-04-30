import { useCreateNotionPage } from '@/queries/notion.queries';
import { useNotionStore } from '@/store/notionStore';
import { useOpenAIStore } from '@/store/openaiStore';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useAIResponse() {
  const { data: streamingContent } = useQuery({
    queryKey: ['openai', 'stream'],
    initialData: '',
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const { aiResponse, storedAIResponse, setStoredAIResponse } =
    useOpenAIStore();
  const { mutate: createNotionPage, isPending } = useCreateNotionPage();
  const { selectedParentPage } = useNotionStore();

  // 표시할 컨텐츠 결정
  const displayContent = streamingContent || (aiResponse?.content ?? '');

  const handleSaveAIResponse = () => {
    if (!selectedParentPage.pageId) {
      toast.error('AI 응답을 저장할 페이지를 먼저 선택해주세요.');
      return;
    }

    if (aiResponse) {
      setStoredAIResponse([...storedAIResponse, aiResponse]);
      createNotionPage({
        parentPageId: selectedParentPage.pageId,
        title: aiResponse.title,
        content: aiResponse.content,
      });
    }
  };

  return {
    displayContent,
    isPending,
    handleSaveAIResponse,
    selectedParentPage,
    streamingContent,
    aiResponse,
  };
}
