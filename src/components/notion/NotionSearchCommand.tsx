'use client';

import { File, Search } from 'lucide-react';
import * as React from 'react';

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { useIsMobile } from '@/hooks/shadcn/use-mobile';
import { Button } from '../ui/button';

export default function NotionSearchCommand() {
  const [open, setOpen] = React.useState(false);
  const isMobile = useIsMobile();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

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
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="페이지 제목 검색..." />
        <CommandList>
          <CommandEmpty>검색 결과가 없습니다.</CommandEmpty>
          <CommandGroup heading="페이지">
            <CommandItem>
              <File />
              <span>페이지</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
