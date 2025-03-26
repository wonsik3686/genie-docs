'use client';

import useStoredAIResponseList from '@/hooks/ai/useStoredAIResponseList';
import useInfiniteScroll from '@/hooks/utils/useInfiniteScroll';
import ReactMarkdown from 'react-markdown';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

function StoredAIResponseList() {
  const { data, fetchNextPage, hasNextPage, isLoading } =
    useStoredAIResponseList();
  const observerTarget = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isLoading,
  });

  return (
    <div
      className="border-card-background grid grid-cols-1 gap-4 rounded-xl border
								bg-background p-4 text-card-foreground shadow md:grid-cols-2 lg:grid-cols-3"
    >
      {data.map(
        (response: { title: string; content: string }, index: number) => (
          <Card key={index} className="bg-secondary">
            <CardHeader>
              <CardTitle className="text-lg font-bold">
                {response.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ReactMarkdown>{response.content}</ReactMarkdown>
            </CardContent>
          </Card>
        )
      )}
      <div ref={observerTarget} className="h-4 w-full" />
    </div>
  );
}

export default StoredAIResponseList;
