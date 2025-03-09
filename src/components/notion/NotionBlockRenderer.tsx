'use client';

import { useNotionBlock } from '@/queries/notion.queries';
import { getMediaSourceText, getTextFromBlock } from '@/utils/notion.utils';
import {
  BlockObjectResponse,
  ImageBlockObjectResponse,
  ToggleBlockObjectResponse,
} from '@notionhq/client/build/src/api-endpoints';
import Image from 'next/image';

const NotionBlockRenderer = ({ block }: { block: BlockObjectResponse }) => {
  const isImageBlock = (
    block: BlockObjectResponse
  ): block is ImageBlockObjectResponse => {
    return block.type === 'image';
  };

  switch (block.type) {
    case 'paragraph':
      return <p>{block.paragraph.rich_text[0]?.plain_text}</p>;
    case 'heading_1':
      return <h1>{block.heading_1.rich_text[0]?.plain_text}</h1>;
    case 'heading_2':
      return <h2>{block.heading_2.rich_text[0]?.plain_text}</h2>;
    case 'heading_3':
      return <h3>{block.heading_3.rich_text[0]?.plain_text}</h3>;
    case 'bulleted_list_item':
      return <li>{block.bulleted_list_item.rich_text[0]?.plain_text}</li>;
    case 'numbered_list_item':
      return <li>{block.numbered_list_item.rich_text[0]?.plain_text}</li>;
    case 'quote':
      return <blockquote>{block.quote.rich_text[0]?.plain_text}</blockquote>;
    case 'code':
      return (
        <pre>
          <code>{block.code.rich_text[0]?.plain_text}</code>
        </pre>
      );
    case 'to_do':
      return (
        <div>
          <input type="checkbox" checked={block.to_do.checked} readOnly />
          <span>{block.to_do.rich_text[0]?.plain_text}</span>
        </div>
      );
    case 'toggle':
      return (
        <details>
          <summary>{block.toggle.rich_text[0]?.plain_text}</summary>
          {block.has_children && <ToggleChildrenRenderer block={block} />}
        </details>
      );
    case 'child_page':
      return <div>{block.child_page.title}</div>;
    case 'divider':
      return <hr />;
    case 'image':
      if (isImageBlock(block)) {
        const imageUrl =
          block.image.type === 'file'
            ? block.image.file.url
            : block.image.external.url;
        const imageAlt =
          block.image.type === 'file'
            ? block.image.file.url
            : block.image.external.url;
        return (
          <div>
            <Image
              src={imageUrl}
              alt={imageAlt}
              width={500}
              height={500}
              className="rounded-md"
            />
            <p>{getMediaSourceText(block)}</p>
          </div>
        );
      }
      break;
    case 'pdf':
    case 'embed':
    case 'video':
    case 'file':
      return (
        <div>
          <p>{getMediaSourceText(block)}</p>
        </div>
      );
    default:
      return (
        <div>
          Unsupported block type: {block.type} {getTextFromBlock(block)}
        </div>
      );
  }
};

const ToggleChildrenRenderer = ({
  block,
}: {
  block: ToggleBlockObjectResponse;
}) => {
  const { data } = useNotionBlock(block.id);
  const toggle = data as ToggleBlockObjectResponse;
  return (
    <>
      {toggle?.toggle.rich_text.map((child) => (
        <div key={child.plain_text}>{child.plain_text}</div>
      ))}
    </>
  );
};

export default NotionBlockRenderer;
