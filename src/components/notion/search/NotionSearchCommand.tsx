'use client';

import NotionSearchButton from '@/components/notion/search/NotionSearchButton';
import NotionSearchDialog from '@/components/notion/search/NotionSearchDialog';
import { useNotionSearch } from '@/hooks/notion/useNotionSearch';

export default function NotionSearchCommand() {
  const {
    open,
    setOpen,
    searchQuery,
    setSearchQuery,
    searchResults,
    isError,
    isPending,
  } = useNotionSearch();

  return (
    <>
      <NotionSearchButton onClick={() => setOpen(true)} />
      <NotionSearchDialog
        open={open}
        onOpenChange={setOpen}
        searchQuery={searchQuery}
        onSearch={setSearchQuery}
        searchResults={searchResults}
        isError={isError}
        isPending={isPending}
      />
    </>
  );
}
