/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { Client } from '@notionhq/client';
import {
  GetPageResponse,
  ListBlockChildrenResponse,
} from '@notionhq/client/build/src/api-endpoints';
import { NextRequest, NextResponse } from 'next/server';

export const notion = new Client({ auth: process.env.NOTION_API_KEY });

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const { searchParams } = url;
    const parentPageId = searchParams.get('parentPageId');
    const pages = {
      pageTitle: '',
      pageId: '',
      children: [],
    };
    const list = [];

    if (!parentPageId) {
      return NextResponse.json(
        { error: 'parentPageId가 제공되지 않았습니다.' },
        { status: 400 }
      );
    }

    const pageInfo: GetPageResponse = await notion.pages.retrieve({
      page_id: parentPageId,
    });
    if ('properties' in pageInfo && 'Name' in pageInfo.properties) {
      const titleProperty = pageInfo.properties.Name;
      if (titleProperty.type === 'title' && titleProperty.title.length > 0) {
        pages.pageTitle = titleProperty.title[0].plain_text;
      } else {
        pages.pageTitle = '제목 없음';
      }
    } else {
      pages.pageTitle = '제목 없음';
    }
    pages.pageId = pageInfo.id;
    list.push({ pageTitle: pages.pageTitle, pageId: pages.pageId });
    const children = await getChildPagesRecursive(parentPageId, list);
    pages.children = children as unknown as never[];

    // console.log('API | api/notion/pages | pages: ', pages);
    // console.log('API | api/notion/pages | list: ', list);

    return NextResponse.json({
      pages,
      list,
    });
  } catch (error) {
    return NextResponse.json(
      { error: '페이지 조회 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

async function getChildPagesRecursive(pageId: string, list: any[]) {
  const children: ListBlockChildrenResponse = await notion.blocks.children.list(
    {
      block_id: pageId,
    }
  );
  const childPages: any[] = await Promise.all(
    children.results.map(async (child: any) => {
      if (child.hasOwnProperty('child_page')) {
        const subPage = await getChildPagesRecursive(child.id, list);
        list.push({
          pageTitle: child.child_page.title,
          pageId: child.id,
        });
        return {
          pageTitle: child.child_page.title,
          pageId: child.id,
          children: subPage,
        };
      }
      return null;
    })
  );
  return childPages.filter((page) => page !== null);
}
