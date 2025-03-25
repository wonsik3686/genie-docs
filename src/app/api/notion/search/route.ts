import { Client } from '@notionhq/client';
import { parse } from 'cookie';
import { NextRequest, NextResponse } from 'next/server';

type SearchRequestBody = {
  query: string;
  filterType: 'page' | 'database';
  pageSize?: number;
};

export async function POST(req: NextRequest) {
  try {
    const { query, filterType, pageSize } =
      (await req.json()) as SearchRequestBody;
    const cookies = parse(req.headers.get('cookie') || '');
    const notionApiKey = cookies.notionApiKey;
    const notion = new Client({ auth: notionApiKey });

    const response = await notion.search({
      query,
      filter: {
        value: filterType,
        property: 'object',
      },
      sort: {
        direction: 'ascending',
        timestamp: 'last_edited_time',
      },
      page_size: pageSize || 100,
    });

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      { error: '검색 중 오류가 발생했습니다.', errorMessage: error },
      { status: 500 }
    );
  }
}
