import { useOpenAIStore } from '@/store/openaiStore';
import { AIResponse } from '@/types/openai.types';
import { useMutation } from '@tanstack/react-query';

export function useAskOpenAI() {
  const { setAiResponse } = useOpenAIStore();

  return useMutation<AIResponse | null, Error, string>({
    mutationFn: async (prompt: string) => {
      const response = await fetch('/api/openai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        const errorData = (await response.json()) as { error: string };
        throw new Error(errorData.error);
      }

      const data = (await response.json()) as AIResponse;
      return data;
    },
    onSuccess: (data) => {
      setAiResponse(data || null);
    },
  });
}
