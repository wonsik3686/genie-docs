import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type SettingState = {
  notionApiKey: string;
  notionPageId: string;
  openAiApiKey: string;
};

export type SettingActions = {
  setNotionApiKey: (notionApiKey: string) => void;
  setNotionPageId: (notionPageId: string) => void;
  setOpenAiApiKey: (openAiApiKey: string) => void;
};

const initialState: SettingState = {
  notionApiKey: '',
  notionPageId: '',
  openAiApiKey: '',
};

export const useSettingStore = create<SettingState & SettingActions>()(
  persist(
    (set) => ({
      ...initialState,
      setNotionApiKey: (notionApiKey) => set({ notionApiKey }),
      setNotionPageId: (notionPageId) => set({ notionPageId }),
      setOpenAiApiKey: (openAiApiKey) => set({ openAiApiKey }),
    }),
    {
      name: 'setting',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
