import { useOpenAIStore } from '@/store/openaiStore';
import { AIResponse, AITemplate } from '@/types/openai.types';
import { useMutation } from '@tanstack/react-query';

export function useAskOpenAI() {
  const { setAiResponse } = useOpenAIStore();

  return useMutation<
    AIResponse | null,
    Error,
    { prompt: string; template: AITemplate; openAIKey: string }
  >({
    gcTime: 0,
    mutationFn: async ({ prompt, template, openAIKey }) => {
      const response = await fetch('/api/openai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt, template, openAIKey }),
      });

      if (!response.ok) {
        const errorData = (await response.json()) as { error: string };
        throw new Error(errorData.error);
      }

      const data = (await response.json()) as { aiResponse: AIResponse };
      return data.aiResponse;
    },
    onSuccess: (data) => {
      setAiResponse(data || null);
    },
  });
}
