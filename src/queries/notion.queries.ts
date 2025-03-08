/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import { useNotionStore } from '@/store/notionStore';
import { NotionPagesResponse } from '@/types/dto/notion.dto.types';
import {
  GetBlockResponse,
  ListBlockChildrenResponse,
} from '@notionhq/client/build/src/api-endpoints';
import { useMutation, useQuery } from '@tanstack/react-query';
import { notionQueryKeys } from './keys/notion.keys';

// 노션 페이지 전체 가져오기
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

// 노션 페이지 가져오기
export function useNotionPage(pageId: string) {
  return useQuery({
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

// 페이지 생성하기
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

// 노션 블록 목록 가져오기
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

// 노션 블록 가져오기
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
