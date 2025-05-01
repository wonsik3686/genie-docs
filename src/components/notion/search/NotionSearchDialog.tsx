'use client';

import {
  CommandDialog,
  CommandInput,
  CommandList,
} from '@/components/ui/command';
import { SearchResponse } from '@/lib/types/dto/notion.dto.types';
import NotionSearchResults from './NotionSearchResults';

interface NotionSearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  searchQuery: string;
  onSearch: (value: string) => void;
  searchResults?: SearchResponse;
  isError: boolean;
  isPending: boolean;
}

export default function NotionSearchDialog({
  open,
  onOpenChange,
  searchQuery,
  onSearch,
  searchResults,
  isError,
  isPending,
}: NotionSearchDialogProps) {
  return (
    <CommandDialog
      open={open}
      onOpenChange={onOpenChange}
      commandValue={searchQuery}
    >
      <CommandInput
        placeholder="페이지 제목 검색..."
        onValueChange={onSearch}
      />
      <CommandList>
        <NotionSearchResults
          data={searchResults}
          isError={isError}
          isPending={isPending}
        />
      </CommandList>
    </CommandDialog>
  );
}
