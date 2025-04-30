import { NotionPageHierarchy } from '../notion.types';

export type NotionPagesResponse = {
  pages: NotionPageHierarchy;
  list: { pageId: string; pageTitle: string }[];
};

export type SearchRequestBody = {
  query: string;
  filterType: 'page' | 'database';
  pageSize?: number;
};

export type SearchResponse = {
  results: Array<{
    [x: string]: any;
    id: string;
    title: string;
    url: string;
    properties: {
      title: {
        title: {
          plain_text: string;
        }[];
      };
    };
  }>;
  next_cursor: string | null;
  has_more: boolean;
};
