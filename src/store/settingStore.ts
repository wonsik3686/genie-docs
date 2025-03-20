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
      name: 'setting-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        notionPageId: state.notionPageId,
      }),
    }
  )
);

/**
 * Initializes application settings by hydrating API keys from cookies to handle potential hydration mismatches.
 *
 * This hook retrieves the `notionApiKey` and `openAiApiKey` from cookies (defaulting to empty strings if absent)
 * and updates the Zustand store with these values on component mount.
 */
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
