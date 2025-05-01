import { useNotionPages } from '@/lib/queries/notion.queries';
import { useNotionStore } from '@/store/notionStore';
import { useSettingStore } from '@/store/settingStore';

/**
 * 노션 페이지 트리 데이터를 관리하는 훅
 * @returns {Object} 노션 페이지 트리 데이터
 * @property {NotionPageHierarchy} pages - 노션 페이지 트리 데이터
 */
export function useNotionPageTree() {
  const notionPageId = useSettingStore((state) => state.notionPageId);
  useNotionPages(notionPageId);
  const pages = useNotionStore((state) => state.pages);

  return {
    pages,
  };
}
