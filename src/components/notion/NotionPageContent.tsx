import {
  BlockObjectResponse,
  ListBlockChildrenResponse,
} from '@notionhq/client/build/src/api-endpoints';
import NotionBlockRenderer from './NotionBlockRenderer';

export type NotionPageContentProps = {
  notionPageContent: ListBlockChildrenResponse;
};

const NotionPageContent = ({ notionPageContent }: NotionPageContentProps) => {
  return (
    <div className="notion-page-content rounded-lg bg-transparent p-6">
      {notionPageContent.results.map((block) => (
        <NotionBlockRenderer
          key={block.id}
          block={block as BlockObjectResponse}
        />
      ))}
    </div>
  );
};

export default NotionPageContent;
