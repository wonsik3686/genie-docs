'use client';

import { Button } from '@/components/ui/button';
import { SearchResponse } from '@/lib/types/dto/notion.dto.types';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface NotionSearchResultsProps {
  data?: SearchResponse;
  isError: boolean;
  isPending: boolean;
}

export default function NotionSearchResults({
  data,
  isError,
  isPending,
}: NotionSearchResultsProps) {
  const router = useRouter();

  if (isPending) {
    return (
      <div className="flex w-full items-center justify-center py-4">
        <Loader2 className="h-4 w-4 animate-spin" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex w-full items-center justify-center py-4">
        <p className="text-center text-sm text-muted-foreground">
          검색 중 오류가 발생했습니다.
        </p>
      </div>
    );
  }

  if (!data?.results?.length) {
    return (
      <div className="flex w-full items-center justify-center py-4">
        <p className="text-center text-sm text-muted-foreground">
          검색 결과가 없습니다.
        </p>
      </div>
    );
  }

  return (
    <>
      {data.results.map((result) => (
        <Button
          key={result.id}
          variant="ghost"
          className="w-full justify-start"
          onClick={() => {
            router.push(`/dashboard/notion/page?pageId=${result.id}`);
          }}
          asChild
        >
          <Link href={`/dashboard/notion/page?pageId=${result.id}`}>
            <p className="text-left">
              {result.properties?.title?.title?.[0]?.plain_text || '제목 없음'}
            </p>
          </Link>
        </Button>
      ))}
    </>
  );
}
