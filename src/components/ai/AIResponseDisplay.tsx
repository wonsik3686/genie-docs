'use client';

import MarkdownRenderer from '@/components/ai/common/MarkdownRenderer';
import SelectParentPageDialog from '@/components/ai/dialogs/SelectParentPageDialog';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useCreateNotionPage } from '@/queries/notion.queries';
import { useNotionStore } from '@/store/notionStore';
import { useOpenAIStore } from '@/store/openaiStore';
import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function AIResponseDisplay() {
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

  function handleSaveAIResponse() {
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
  }

  return (
    <div className="flex flex-col gap-4">
      <Card className="bg-secondary/55">
        <CardHeader>
          <CardTitle>
            {streamingContent ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>작성중...</span>
              </div>
            ) : (
              aiResponse?.title || 'AI 응답'
            )}
          </CardTitle>
        </CardHeader>

        <CardContent>
          <MarkdownRenderer content={displayContent} />
        </CardContent>

        <CardFooter className="mt-auto flex flex-col gap-3 md:flex-row md:justify-end">
          <SelectParentPageDialog />
          <Button
            className="w-full md:w-40"
            onClick={handleSaveAIResponse}
            disabled={isPending || !aiResponse}
          >
            {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : '저장'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
