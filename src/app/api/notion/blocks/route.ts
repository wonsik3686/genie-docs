import { Client, isNotionClientError } from '@notionhq/client';
import { ListBlockChildrenResponse } from '@notionhq/client/build/src/api-endpoints';
import { parse } from 'cookie';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Handles a GET request to fetch the children blocks of a Notion page.
 *
 * Extracts the Notion API key from the request cookies and the page identifier from the query parameters.
 * If the page identifier is missing, it returns a 400 JSON response. Upon a valid request, it fetches the children
 * blocks from the specified Notion page via the Notion client. If an error occurs during the Notion API call,
 * it returns a 500 JSON response with the error details.
 *
 * @param req - The incoming Next.js request containing the query parameters and cookies.
 * @returns A JSON response containing the fetched block children or an error message.
 */
export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const { searchParams } = url;
    const cookies = parse(req.headers.get('cookie') || '');
    const notionApiKey = cookies.notionApiKey;
    const notion = new Client({ auth: notionApiKey });

    const pageId = searchParams.get('pageId');

    if (!pageId) {
      return NextResponse.json(
        { error: 'pageId가 제공되지 않았습니다.' },
        { status: 400 }
      );
    }

    const response: ListBlockChildrenResponse =
      await notion.blocks.children.list({
        block_id: pageId,
      });

    return NextResponse.json(response);
  } catch (error) {
    if (isNotionClientError(error)) {
      const notionError = error;
      return NextResponse.json(
        {
          error: '블록 조회 중 오류가 발생했습니다: NotionClientError:',
          notionError,
        },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        { error: '블록 조회 중 오류가 발생했습니다.' },
        { status: 500 }
      );
    }
  }
}
