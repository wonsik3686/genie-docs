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
import { useAIResponse } from '@/hooks/ai/useAIResponse';
import { Loader2 } from 'lucide-react';

export default function AIResponseDisplay() {
  const {
    displayContent,
    isPending,
    handleSaveAIResponse,
    selectedParentPage,
    streamingContent,
    aiResponse,
  } = useAIResponse();

  return (
    <Card className="w-full">
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
      <CardFooter className="flex flex-wrap justify-end gap-3">
        <div className="flex w-full flex-wrap items-center justify-end gap-3 md:w-auto md:flex-nowrap">
          <SelectParentPageDialog />
          <Button
            className="w-full bg-accent-point hover:bg-accent-point/80 active:bg-accent-point/60 md:w-auto"
            onClick={handleSaveAIResponse}
            disabled={isPending || !selectedParentPage.pageId}
          >
            {isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              'Notion에 저장'
            )}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
