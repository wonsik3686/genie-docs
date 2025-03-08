'use client';

import Cookies from 'js-cookie';
import { useEffect } from 'react';
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
      setNotionApiKey: (notionApiKey) => {
        Cookies.set('notionApiKey', notionApiKey, {
          expires: 7,
          sameSite: 'strict',
        });
        set({ notionApiKey });
      },
      setOpenAiApiKey: (openAiApiKey) => {
        Cookies.set('openAiApiKey', openAiApiKey, {
          expires: 7,
          sameSite: 'strict',
        });
        set({ openAiApiKey });
      },
      setNotionPageId: (notionPageId) => set({ notionPageId }),
    }),
    {
      name: 'setting',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        notionPageId: state.notionPageId,
      }),
    }
  )
);

// 쿠키에서 값을 읽어와 상태를 설정 (hydration mismatch 발생 시 사용)
export function useInitializeSettings() {
  const setNotionApiKey = useSettingStore((state) => state.setNotionApiKey);
  const setOpenAiApiKey = useSettingStore((state) => state.setOpenAiApiKey);

  useEffect(() => {
    const notionApiKey = Cookies.get('notionApiKey') || '';
    const openAiApiKey = Cookies.get('openAiApiKey') || '';

    setNotionApiKey(notionApiKey);
    setOpenAiApiKey(openAiApiKey);
  }, [setNotionApiKey, setOpenAiApiKey]);
}
