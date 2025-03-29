'use client';

import { useCreateNotionPage } from '@/queries/notion.queries';
import { useNotionStore } from '@/store/notionStore';
import { useOpenAIStore } from '@/store/openaiStore';
import { Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Button } from '../ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import SelectParentPageDialog from './SelectParentPageDialog';

function AIResponseDisplay() {
  const { aiResponse, storedAIResponse, setStoredAIResponse } =
    useOpenAIStore();
  const { mutate: createNotionPage, isPending } = useCreateNotionPage();
  const { selectedParentPage } = useNotionStore();

  function handleSaveAIResponse() {
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
    <div className="flex h-full flex-col gap-4">
      <Card className="bg-secondary/55">
        <CardHeader>
          <CardTitle>{aiResponse?.title}</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="pr-4">
            <div className="max-w-full whitespace-pre-wrap break-words">
              <ReactMarkdown>{aiResponse?.content}</ReactMarkdown>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-3 md:flex-row md:justify-end">
          <SelectParentPageDialog />
          <Button
            className="w-full md:w-40"
            onClick={handleSaveAIResponse}
            disabled={isPending}
          >
            {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : '저장'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default AIResponseDisplay;
