'use client';

import NotionPageContent from '@/components/notion/NotionPageContent';
import NotionPageMeta from '@/components/notion/NotionPageMeta';
import { useNotionBlocks, useNotionPage } from '@/queries/notion.queries';
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { Loader2 } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

/**
 * Renders a Notion page view based on a pageId from the URL search parameters.
 *
 * If no pageId is provided, it shows a fallback message. The component uses custom hooks
 * to fetch the Notion page data and its associated blocks, displaying a loading spinner during
 * data retrieval and an error message if fetching fails. Once the data is successfully loaded,
 * it renders the NotionPageMeta and NotionPageContent components.
 *
 * @returns The React element representing the current state of the Notion page view.
 */
function NotionPageComponent() {
  const searchParams = useSearchParams();
  const pageId = searchParams.get('pageId');

  if (!pageId) {
    return (
      <div className="flex h-full items-center justify-center">No pageId</div>
    );
  }

  const {
    data: page,
    error: pageError,
    isLoading: pageLoading,
  } = useNotionPage(pageId);
  const {
    data: blocks,
    error: blocksError,
    isLoading: blocksLoading,
  } = useNotionBlocks(pageId);

  if (pageLoading || blocksLoading)
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-4 w-4 animate-spin" />
      </div>
    );
  if (pageError || blocksError)
    return (
      <div className="flex h-full w-full items-center justify-center">
        Error: {pageError?.message || blocksError?.message}
      </div>
    );

  return (
    <div className="flex h-full w-full flex-col gap-4 rounded-md bg-secondary/50 p-4">
      {page && <NotionPageMeta notionPageMeta={page as PageObjectResponse} />}
      {blocks && <NotionPageContent notionPageContent={blocks} />}
    </div>
  );
}

export default NotionPageComponent;
