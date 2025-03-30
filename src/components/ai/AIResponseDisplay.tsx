/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useCreateNotionPage } from '@/queries/notion.queries';
import { useNotionStore } from '@/store/notionStore';
import { useOpenAIStore } from '@/store/openaiStore';
import { useQuery } from '@tanstack/react-query';
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
import { ScrollArea, ScrollBar } from '../ui/scroll-area';
import SelectParentPageDialog from './SelectParentPageDialog';
function AIResponseDisplay() {
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
          <ReactMarkdown
            components={{
              // 코드 블록 스타일링
              code({ node, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                return match ? (
                  <ScrollArea className="rounded-lg border bg-muted/50 p-4">
                    <ScrollBar orientation="horizontal" />
                    <pre className="overflow-x-auto rounded-lg p-4">
                      <code className={className} {...props}>
                        {children}
                      </code>
                    </pre>
                  </ScrollArea>
                ) : (
                  <ScrollArea>
                    <ScrollBar orientation="horizontal" />
                    <code
                      className="rounded-md bg-muted px-1.5 py-0.5"
                      {...props}
                    >
                      {children}
                    </code>
                  </ScrollArea>
                );
              },
              // 헤딩 스타일링
              h1: ({ children }) => (
                <h1 className="mb-4 mt-6 text-2xl font-bold">{children}</h1>
              ),
              h2: ({ children }) => (
                <h2 className="mb-3 mt-5 text-xl font-bold">{children}</h2>
              ),
              h3: ({ children }) => (
                <h3 className="mb-2 mt-4 text-lg font-bold">{children}</h3>
              ),
              // 리스트 스타일링
              ul: ({ children }) => (
                <ul className="my-4 list-inside list-disc">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="my-4 list-inside list-decimal">{children}</ol>
              ),
              // 링크 스타일링
              a: ({ children, href }) => (
                <a
                  href={href}
                  className="text-blue-500 underline hover:text-blue-700"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {children}
                </a>
              ),
              // 블록쿼트 스타일링
              blockquote: ({ children }) => (
                <blockquote className="my-4 border-l-4 border-gray-300 pl-4 italic">
                  {children}
                </blockquote>
              ),
            }}
          >
            {displayContent}
          </ReactMarkdown>
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

export default AIResponseDisplay;
