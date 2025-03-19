import { AIResponse } from '@/types/openai.types';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type OpenAIState = {
  aiResponse: AIResponse | null; // 현재 반환된 AI 응답
  storedAIResponse: AIResponse[]; // 사용자가 저장한 AI 응답 목록
};

export type OpenAIAction = {
  setAiResponse: (response: AIResponse | null) => void;
  setStoredAIResponse: (response: AIResponse[]) => void;
};

const initialState: OpenAIState = {
  aiResponse: null,
  storedAIResponse: [],
};

export const useOpenAIStore = create<OpenAIState & OpenAIAction>()(
  persist(
    (set) => ({
      ...initialState,
      setAiResponse: (response) => set({ aiResponse: response }),
      setStoredAIResponse: (response) => set({ storedAIResponse: response }),
    }),
    {
      name: 'openai-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        storedAIResponse: state.storedAIResponse,
      }),
    }
  )
);
