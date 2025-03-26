'use client';

import { useOpenAIStore } from '@/store/openaiStore';
import { useEffect, useState } from 'react';

const PAGE_SIZE = 10;

export default function useStoredAIResponseList() {
  const { storedAIResponse } = useOpenAIStore();
  const [currentPage, setCurrentPage] = useState(0);
  const [data, setData] = useState(storedAIResponse.slice(0, PAGE_SIZE));
  const [hasNextPage, setHasNextPage] = useState(
    storedAIResponse.length > PAGE_SIZE
  );
  const [isLoading, setIsLoading] = useState(false);

  const fetchNextPage = () => {
    if (!hasNextPage || isLoading) return;
    setIsLoading(true);
    const nextPage = currentPage + 1;
    const start = nextPage * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    const nextData = storedAIResponse.slice(start, end);
    setData((prevData) => [...prevData, ...nextData]);
    setCurrentPage(nextPage);
    setHasNextPage(end < storedAIResponse.length);
    setIsLoading(false);
  };

  useEffect(() => {
    setData(storedAIResponse.slice(0, PAGE_SIZE));
    setCurrentPage(0);
    setHasNextPage(storedAIResponse.length > PAGE_SIZE);
  }, [storedAIResponse]);

  return { data, fetchNextPage, hasNextPage, isLoading };
}
