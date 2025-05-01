import useDebounce from '@/hooks/utils/useDebounce';
import { useNotionSearch as useNotionSearchQuery } from '@/lib/queries/notion.queries';
import { useEffect, useState } from 'react';

export function useNotionSearch() {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const {
    mutate: searchNotion,
    data,
    isError,
    isPending,
  } = useNotionSearchQuery();

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

  return {
    open,
    setOpen,
    searchQuery,
    setSearchQuery,
    searchResults: data,
    isError,
    isPending,
  };
}
