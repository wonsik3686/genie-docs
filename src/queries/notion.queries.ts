/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import { useNotionStore } from '@/store/notionStore';
import { NotionPagesResponse } from '@/types/dto/notion.dto.types';
import {
  GetBlockResponse,
  GetPageResponse,
  ListBlockChildrenResponse,
} from '@notionhq/client/build/src/api-endpoints';
import { useMutation, useQuery } from '@tanstack/react-query';
import { notionQueryKeys } from './keys/notion.keys';

/**
 * Fetches all Notion pages under the specified parent page and updates the global Notion store.
 *
 * This hook uses React Query to retrieve pages from the Notion API by providing the parent page ID.
 * Upon a successful fetch, the Notion store is updated with both the complete page data and a simplified
 * list of pages (including ID, title, and an empty content field) for easy reference.
 * An error is thrown if the API response is not successful.
 *
 * @param parentPageId - The identifier of the parent Notion page used to fetch its child pages.
 * @returns A query object containing the fetched Notion pages data.
 * @throws {Error} If the API request fails.
 */
export function useNotionPages(parentPageId: string) {
  return useQuery<NotionPagesResponse>({
    queryKey: notionQueryKeys.pages(parentPageId),
    queryFn: async () => {
      const response = await fetch(
        `/api/notion/pages?parentPageId=${parentPageId}`
      );
      if (!response.ok) throw new Error('페이지 조회 중 오류가 발생했습니다.');
      const data = (await response.json()) as NotionPagesResponse;
      useNotionStore.getState().setPages(data.pages);
      useNotionStore.getState().setNotionPageList(
        data.list.map((item: any) => ({
          pageId: item.pageId,
          pageTitle: item.pageTitle,
          pageContent: '',
        }))
      );
      return data;
    },
  });
}

/**
 * Retrieves a Notion page by its ID.
 *
 * This hook uses react-query to fetch a single page from the Notion API. It sends an HTTP request to
 * retrieve the page data and returns a query object containing the result. If the API response indicates
 * failure, an error is thrown.
 *
 * @param pageId - The unique identifier of the Notion page.
 * @returns A query object containing the page data as defined by {@link GetPageResponse}.
 *
 * @throws {Error} If the API response is not successful.
 */
export function useNotionPage(pageId: string) {
  return useQuery<GetPageResponse, Error>({
    queryKey: ['notion', 'page', pageId],
    queryFn: async () => {
      const response = await fetch(`/api/notion/page?pageId=${pageId}`);
      if (!response.ok) {
        throw new Error('페이지 조회 중 오류가 발생했습니다.');
      }
      return response.json();
    },
  });
}

/**
 * Returns a mutation hook for creating a new Notion page.
 *
 * This hook provides a mutation function that sends a POST request to `/api/notion/createPage`
 * with a JSON payload containing the parent page ID, title, and content. The mutation function
 * throws an error if the API response is not OK.
 *
 * @example
 * const { mutate } = useCreateNotionPage();
 * mutate({ parentPageId: 'parent-id', title: 'New Page', content: 'Page content' });
 */
export function useCreateNotionPage() {
  return useMutation({
    mutationFn: async ({
      parentPageId,
      title,
      content,
    }: {
      parentPageId: string;
      title: string;
      content: string;
    }) => {
      const response = await fetch('/api/notion/createPage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ parentPageId, title, content }),
      });
      if (!response.ok) {
        throw new Error('페이지 생성 중 오류가 발생했습니다.');
      }
      return response.json();
    },
  });
}

/**
 * Fetches the list of blocks (children) for a specific Notion page.
 *
 * This hook uses React Query to call the Notion API endpoint that retrieves block children 
 * for the provided page ID. It handles the API request asynchronously and throws an error 
 * if the response is unsuccessful.
 *
 * @param pageId - The unique identifier of the Notion page from which to fetch blocks.
 *
 * @returns A React Query result object containing the fetched blocks, along with loading and error states.
 *
 * @throws {Error} Thrown if the API response is not OK.
 */
export function useNotionBlocks(pageId: string) {
  return useQuery<ListBlockChildrenResponse, Error>({
    queryKey: notionQueryKeys.blocks(pageId),
    queryFn: async () => {
      const response = await fetch(`/api/notion/blocks?pageId=${pageId}`);
      if (!response.ok) {
        throw new Error('블록 조회 중 오류가 발생했습니다.');
      }
      return response.json();
    },
  });
}

/**
 * Fetches a specific Notion block.
 *
 * This hook uses React Query's `useQuery` to asynchronously retrieve block data from the Notion API.
 * A GET request is sent to the `/api/notion/block` endpoint with the provided block identifier.
 * If the response is not successful, an error is thrown.
 *
 * @param blockId - The unique identifier of the Notion block to retrieve.
 *
 * @returns A query result containing the block data as defined by {@link GetBlockResponse}.
 *
 * @throws {Error} When the API response status is not OK.
 */
export function useNotionBlock(blockId: string) {
  return useQuery<GetBlockResponse, Error>({
    queryKey: notionQueryKeys.block(blockId),
    queryFn: async () => {
      const response = await fetch(`/api/notion/block?blockId=${blockId}`);
      if (!response.ok) {
        throw new Error('블록 조회 중 오류가 발생했습니다.');
      }
      return response.json();
    },
  });
}
