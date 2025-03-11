/* eslint-disable @typescript-eslint/no-unused-vars */
import { Client } from '@notionhq/client';
import { GetBlockResponse } from '@notionhq/client/build/src/api-endpoints';
import { parse } from 'cookie';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const { searchParams } = url;
    const blockId = searchParams.get('blockId');
    const cookies = parse(req.headers.get('cookie') || '');
    const notionApiKey = cookies.notionApiKey;
    const notion = new Client({ auth: notionApiKey });

    if (!blockId) {
      return NextResponse.json(
        { error: 'blockId가 제공되지 않았습니다.' },
        { status: 400 }
      );
    }

    const response: GetBlockResponse = await notion.blocks.retrieve({
      block_id: blockId,
    });

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      { error: '블록 조회 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
