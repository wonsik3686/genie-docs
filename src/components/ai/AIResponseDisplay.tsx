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
      <CardHeader className="border-b pb-4">
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
      <CardContent className="flex-1 overflow-auto py-6">
        <MarkdownRenderer content={displayContent} />
      </CardContent>
      <CardFooter className="flex flex-wrap justify-end gap-3 border-t pt-4">
        <div className="flex w-full flex-wrap items-center justify-end gap-3 md:w-auto md:flex-nowrap">
          <SelectParentPageDialog />
          <Button
            variant="accent"
            size="default"
            width="full"
            className="w-full md:w-auto"
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
