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
import { parse } from 'cookie';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Handles GET requests to retrieve a Notion page and its child pages recursively.
 *
 * This function obtains the Notion API key from the request cookies and extracts the parent page ID from the URL
 * search parameters. It then retrieves the page details using the Notion API—attempting to determine the page title
 * from either the "Name" or "title" property and defaulting to "제목 없음" if no valid title is found. After setting 
 * the main page details, it recursively fetches child pages and returns a JSON response containing both the structured 
 * page object and a flat list of pages.
 *
 * @param req - The incoming HTTP request.
 * @returns A JSON response with the page details and list of pages; returns status 400 if the parent page ID is missing and status 500 if an error occurs during retrieval.
 */
export async function GET(req: NextRequest) {
  try {
    const cookies = parse(req.headers.get('cookie') || '');
    const notionApiKey = cookies.notionApiKey;
    const notion = new Client({ auth: notionApiKey });

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
    } else if ('properties' in pageInfo && 'title' in pageInfo.properties) {
      const titleProperty = pageInfo.properties.title;
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
    const children = await getChildPagesRecursive(parentPageId, list, notion);
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

/**
 * Recursively retrieves child pages for the specified page using the Notion API.
 *
 * This function fetches the child blocks of the given page ID and processes each block that contains a page.
 * When a child page is identified, its title and ID are added to the provided list and its own children are retrieved recursively.
 * Blocks without a child page are skipped.
 *
 * @param pageId - The ID of the page for which to fetch child pages.
 * @param list - An array that accumulates page information during the recursive traversal.
 *
 * @returns A promise that resolves to an array of child page objects, each including a page title, page ID, and an array of its child pages.
 */
async function getChildPagesRecursive(
  pageId: string,
  list: any[],
  notion: Client
) {
  const children: ListBlockChildrenResponse = await notion.blocks.children.list(
    {
      block_id: pageId,
    }
  );
  const childPages: any[] = await Promise.all(
    children.results.map(async (child: any) => {
      if (child.hasOwnProperty('child_page')) {
        const subPage = await getChildPagesRecursive(child.id, list, notion);
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
