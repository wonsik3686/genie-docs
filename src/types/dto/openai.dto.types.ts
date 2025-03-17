import { AIResponse, AITemplate } from '@/types/openai.types';

export type ChatOpenAIResponse = {
  success: boolean;
  aiResponse?: AIResponse;
  error?: string;
};

export type ChatOpenAIRequest = {
  prompt: string;
  openAIKey: string;
  template: AITemplate;
};
