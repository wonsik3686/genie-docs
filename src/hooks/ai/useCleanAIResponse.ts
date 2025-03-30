'use client';

import { useOpenAIStore } from '@/store/openaiStore';
import { useEffect } from 'react';

export const useCleanAIResponse = () => {
  const { aiResponse, setAiResponse } = useOpenAIStore((state) => state);
  useEffect(() => {
    if (aiResponse) {
      setAiResponse(null);
    }
  }, []);
};
