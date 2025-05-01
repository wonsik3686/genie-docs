/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

// 리치 텍스트를 지원하는 블록 자식에서 리치 텍스트 배열을 가져와서 일반 텍스트로 반환합니다.

import {
  BlockObjectResponse,
  RichTextItemResponse,
} from '@notionhq/client/build/src/api-endpoints';

export const getPlainTextFromRichText = (richText: RichTextItemResponse[]) => {
  return richText.map((t) => t.plain_text).join('');
};

export const getMediaSourceText = (block: BlockObjectResponse) => {
  let source, caption;
  const blockContent = block[block.type as keyof typeof block] as any;

  if (blockContent.external) {
    source = blockContent.external.url;
  } else if (blockContent.file) {
    source = blockContent.file.url;
  } else if (blockContent.url) {
    source = blockContent.url;
  } else {
    source = '[미디어 블록 유형에 대한 누락된 경우]: ' + block.type;
  }
  if (blockContent.caption?.length) {
    caption = getPlainTextFromRichText(blockContent.caption);
    return caption + ': ' + source;
  }
  return source;
};

export const getTextFromBlock = (block: BlockObjectResponse) => {
  let text;
  const blockContent = block[block.type as keyof typeof block] as any;

  if (blockContent.rich_text) {
    text = getPlainTextFromRichText(blockContent.rich_text);
  } else {
    switch (block.type) {
      case 'unsupported':
        text = '[지원되지 않는 블록 유형]';
        break;
      case 'bookmark':
        text = block.bookmark.url;
        break;
      case 'child_database':
        text = block.child_database.title;
        break;
      case 'child_page':
        text = block.child_page.title;
        break;
      case 'embed':
      case 'video':
      case 'file':
      case 'image':
      case 'pdf':
        text = getMediaSourceText(block);
        break;
      case 'equation':
        text = block.equation.expression;
        break;
      case 'link_preview':
        text = block.link_preview.url;
        break;
      case 'synced_block':
        text = block.synced_block.synced_from
          ? '이 블록은 다음 ID를 가진 블록과 동기화되었습니다: ' +
            block.synced_block.synced_from[block.synced_block.synced_from.type]
          : '다른 블록과 동기화된 소스 블록입니다.';
        break;
      case 'table':
        text = '테이블 너비: ' + block.table.table_width;
        break;
      case 'table_of_contents':
        text = 'ToC 색상: ' + block.table_of_contents.color;
        break;
      case 'breadcrumb':
      case 'column_list':
      case 'divider':
        text = '사용 가능한 텍스트 없음';
        break;
      default:
        text = '[케이스 추가 필요]';
        break;
    }
  }
  if (block.has_children) {
    text = text + ' (자식 있음)';
  }
  return block.type + ': ' + text;
};
