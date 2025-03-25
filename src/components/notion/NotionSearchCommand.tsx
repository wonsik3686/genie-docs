'use client';

import { Loader2, Search } from 'lucide-react';

import {
  CommandDialog,
  CommandInput,
  CommandList,
} from '@/components/ui/command';
import { useIsMobile } from '@/hooks/shadcn/use-mobile';
import useDebounce from '@/hooks/utils/useDebounce';
import { useNotionSearch } from '@/queries/notion.queries';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';

export default function NotionSearchCommand() {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const isMobile = useIsMobile();
  const router = useRouter();
  const { mutate: searchNotion, data, isError, isPending } = useNotionSearch();

  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  useEffect(() => {
    if (debouncedSearchQuery.trim()) {
      handleSearch(debouncedSearchQuery);
    }
  }, [debouncedSearchQuery]);

  const handleSearch = (value: string) => {
    searchNotion({ query: value, filterType: 'page', pageSize: 100 });
  };

  return (
    <>
      {isMobile ? (
        <Button variant="outline" size="icon" onClick={() => setOpen(true)}>
          <Search className="h-4 w-4" />
        </Button>
      ) : (
        <Button
          className="w-full justify-start rounded-lg px-4 py-1 text-left font-normal text-muted-foreground hover:text-foreground"
          variant="outline"
          size="icon"
          onClick={() => setOpen(true)}
        >
          <p className="flex w-48 items-center justify-between text-sm">
            <span className="flex items-center gap-1 text-xs">
              <Search className="h-4 w-4" />
              Notion 페이지 검색..
            </span>
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
              <span className="text-xs">⌘</span>K
            </kbd>
          </p>
        </Button>
      )}
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        commandValue={searchQuery}
      >
        <CommandInput
          placeholder="페이지 제목 검색..."
          onValueChange={(value) => {
            setSearchQuery(value);
          }}
        />

        <CommandList>
          {data?.results.map((result) => {
            return (
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
                    {result.properties?.title.title[0].plain_text}
                  </p>
                </Link>
              </Button>
            );
          })}
          {isPending && (
            <div className="flex w-full items-center justify-center py-4">
              <Loader2 className="h-4 w-4 animate-spin" />
            </div>
          )}
          {isError && (
            <div className="flex w-full items-center justify-center py-4">
              <p className="text-center text-sm text-muted-foreground">
                검색 중 오류가 발생했습니다.
              </p>
            </div>
          )}
          {data?.results.length === 0 && (
            <div className="flex w-full items-center justify-center py-4">
              <p className="text-center text-sm text-muted-foreground">
                검색 결과가 없습니다.
              </p>
            </div>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}
