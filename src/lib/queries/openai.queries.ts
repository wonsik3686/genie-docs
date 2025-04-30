import { useOpenAIStore } from '@/store/openaiStore';
import { AIResponse, AITemplate } from '@/types/openai.types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type OpenAIMutationParams = {
  prompt: string;
  template: AITemplate;
  openAIKey: string;
};

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

export const useOpenAIChatGPTStream = () => {
  const queryClient = useQueryClient();
  const { setAiResponse } = useOpenAIStore();

  return useMutation({
    mutationFn: async ({
      prompt,
      template,
      openAIKey,
    }: OpenAIMutationParams) => {
      // 스트리밍 시작 시 초기화
      queryClient.setQueryData(['openai', 'stream'], '');
      setAiResponse(null); // aiResponse도 초기화

      const response = await fetch('/api/openai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt, template, openAIKey }),
      });

      if (!response.ok) {
        throw new Error('API 요청 실패');
      }

      if (!response.body) {
        throw new Error('응답 스트림을 읽을 수 없습니다');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let result = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(5)) as {
                done: boolean;
                aiResponse: AIResponse;
                content: string;
              };

              if (data.done) {
                setAiResponse(data.aiResponse);
                queryClient.setQueryData(['openai', 'stream'], null);
                return data.aiResponse;
              } else if (data.content) {
                result += data.content;
                // 스트리밍 컨텐츠만 업데이트
                queryClient.setQueryData(['openai', 'stream'], result);
              }
            } catch (e) {
              // eslint-disable-next-line no-console
              console.error('스트림 데이터 파싱 오류:', e);
            }
          }
        }
      }
    },
  });
};
