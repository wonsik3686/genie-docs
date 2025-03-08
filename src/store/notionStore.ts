import { NotionPage, NotionPageHierarchy } from '@/types/notion.types';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type notionState = {
  pages: NotionPageHierarchy[];
  notionPageList: NotionPage[];
  selectedPages: NotionPage[];
};

export type notionAction = {
  setPages: (pages: NotionPageHierarchy[]) => void;
  setNotionPageList: (notionPageList: NotionPage[]) => void;
  setSelectedPages: (selectedPages: NotionPage[]) => void;
};

const initialState: notionState = {
  pages: [],
  notionPageList: [],
  selectedPages: [],
};

export const notionStore = create<notionState & notionAction>()(
  persist(
    (set) => ({
      ...initialState,
      setPages: (pages) => set({ pages }),
      setNotionPageList: (notionPageList) => set({ notionPageList }),
      setSelectedPages: (selectedPages) => set({ selectedPages }),
    }),
    {
      name: 'notion-store',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
