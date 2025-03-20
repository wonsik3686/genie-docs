/* eslint-disable @typescript-eslint/no-unused-vars */
import { Client } from '@notionhq/client';
import { GetBlockResponse } from '@notionhq/client/build/src/api-endpoints';
import { parse } from 'cookie';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Handles GET requests to retrieve a block from the Notion API.
 *
 * This function extracts the block identifier from the request URL's query parameters and retrieves the Notion API key from the request cookies. It then instantiates a Notion client using the API key and fetches the corresponding block from the Notion API.
 *
 * If the blockId parameter is missing, a JSON response with a 400 status code and an appropriate error message is returned. If an error occurs during the retrieval process, a JSON response with a 500 status code is returned instead.
 *
 * @param req - The incoming HTTP GET request.
 * @returns A JSON response containing either the retrieved block data or an error message.
 */
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
