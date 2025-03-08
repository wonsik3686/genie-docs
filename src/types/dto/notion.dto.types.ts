import { NotionPageHierarchy } from '../notion.types';

export type NotionPagesResponse = {
  pages: NotionPageHierarchy;
  list: { pageId: string; pageTitle: string }[];
};
