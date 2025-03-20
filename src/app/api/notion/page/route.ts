/* eslint-disable @typescript-eslint/no-unused-vars */
import { Client } from '@notionhq/client';
import {
  CreatePageResponse,
  GetPageResponse,
} from '@notionhq/client/build/src/api-endpoints';
import { parse } from 'cookie';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Handles an HTTP GET request to retrieve a Notion page.
 *
 * Extracts the `pageId` from the request's query parameters and the Notion API key from cookies.
 * It creates a Notion client using the API key and retrieves the specified page details.
 * If `pageId` is missing, it responds with a 400 error, and if an error occurs during retrieval,
 * it responds with a 500 error indicating a retrieval failure.
 *
 * @param req - The incoming Next.js request containing query parameters and cookies.
 * @returns A NextResponse JSON object with the page details or an error message.
 */
export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const { searchParams } = url;
    const pageId = searchParams.get('pageId');
    const cookies = parse(req.headers.get('cookie') || '');
    const notionApiKey = cookies.notionApiKey;
    const notion = new Client({ auth: notionApiKey });

    if (!pageId) {
      return NextResponse.json(
        { error: 'pageId가 제공되지 않았습니다.' },
        { status: 400 }
      );
    }

    const response: GetPageResponse = await notion.pages.retrieve({
      page_id: pageId,
    });
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      { error: '페이지 조회 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

/**
 * Creates a new page in Notion using details specified in the request.
 *
 * Extracts the parent page ID, title, and content from the JSON body of the provided request. Retrieves the Notion API key from the cookies to instantiate a Notion client, which is then used to create a page with the given title and a paragraph block containing the content. Returns the Notion API response as a JSON response, or a 500 error response if page creation fails.
 *
 * @param req - The HTTP request containing a JSON body with "parentPageId", "title", and "content", along with cookies holding the Notion API key.
 * @returns A JSON response with the Notion page creation result or an error message with status 500.
 */
export async function POST(req: NextRequest) {
  const { parentPageId, title, content } = (await req.json()) as {
    parentPageId: string;
    title: string;
    content: string;
  };

  try {
    const cookies = parse(req.headers.get('cookie') || '');
    const notionApiKey = cookies.notionApiKey;
    const notion = new Client({ auth: notionApiKey });

    const response: CreatePageResponse = await notion.pages.create({
      parent: {
        type: 'page_id',
        page_id: parentPageId,
      },
      properties: {
        title: {
          type: 'title',
          title: [
            {
              type: 'text',
              text: {
                content: title,
              },
            },
          ],
        },
      },
      children: [
        {
          object: 'block',
          type: 'paragraph',
          paragraph: {
            rich_text: [
              {
                type: 'text',
                text: { content },
              },
            ],
          },
        },
      ],
    });
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      { error: '페이지 생성 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
