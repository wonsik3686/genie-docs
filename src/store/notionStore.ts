import { NotionPage, NotionPageHierarchy } from '@/types/notion.types';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type notionState = {
  pages: NotionPageHierarchy;
  notionPageList: NotionPage[];
  selectedPages: NotionPage[];
  selectedParentPage: NotionPage;
};

export type notionAction = {
  setPages: (pages: NotionPageHierarchy) => void;
  setNotionPageList: (notionPageList: NotionPage[]) => void;
  setSelectedPages: (selectedPages: NotionPage[]) => void;
  setSelectedParentPage: (selectedParentPage: NotionPage) => void;
};

const initialState: notionState = {
  pages: {
    pageId: '',
    pageTitle: '',
    children: [],
  },
  notionPageList: [],
  selectedPages: [],
  selectedParentPage: {
    pageId: '',
    pageTitle: '',
    pageContent: '',
  },
};

export const useNotionStore = create<notionState & notionAction>()(
  persist(
    (set) => ({
      ...initialState,
      setPages: (pages) => set({ pages }),
      setNotionPageList: (notionPageList) => set({ notionPageList }),
      setSelectedPages: (selectedPages) => set({ selectedPages }),
      setSelectedParentPage: (selectedParentPage) =>
        set({ selectedParentPage }),
    }),
    {
      name: 'notion-store',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
