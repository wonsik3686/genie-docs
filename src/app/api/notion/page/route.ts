/* eslint-disable @typescript-eslint/no-unused-vars */
import { Client } from '@notionhq/client';
import {
  CreatePageResponse,
  GetPageResponse,
} from '@notionhq/client/build/src/api-endpoints';
import { parse } from 'cookie';
import { NextRequest, NextResponse } from 'next/server';

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
