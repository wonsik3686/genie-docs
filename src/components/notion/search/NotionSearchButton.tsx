'use client';

import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/shadcn/use-mobile';
import { Search } from 'lucide-react';

interface NotionSearchButtonProps {
  onClick: () => void;
}

export default function NotionSearchButton({
  onClick,
}: NotionSearchButtonProps) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Button variant="outline" size="icon" onClick={onClick}>
        <Search className="h-4 w-4" />
      </Button>
    );
  }

  return (
    <Button
      className="w-full justify-start rounded-lg px-4 py-1 text-left font-normal text-muted-foreground hover:text-foreground"
      variant="outline"
      size="icon"
      onClick={onClick}
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
  );
}
