import { Client, isNotionClientError } from '@notionhq/client';
import { ListBlockChildrenResponse } from '@notionhq/client/build/src/api-endpoints';
import { parse } from 'cookie';
import { NextRequest, NextResponse } from 'next/server';

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
