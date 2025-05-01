export const notionQueryKeys = {
  pages: (pageId?: string) => ['notion', 'pages', pageId],
  pageDetail: (pageId: string) => ['notion', 'page', 'detail', pageId],
  pageComments: (pageId: string) => ['notion', 'page', 'comments', pageId],
  block: (blockId: string) => ['notion', 'block', blockId],
  blocks: (pageId: string) => ['notion', 'blocks', pageId],
  blocksBatch: (pageIdList: string[]) => [
    'notion',
    'blocks',
    'batch',
    pageIdList,
  ],
};
