import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

export type NotionPageMetaProps = {
  notionPageMeta: PageObjectResponse;
};

const NotionPageMeta = ({ notionPageMeta }: NotionPageMetaProps) => {
  const titleProperty = notionPageMeta.properties['title'];
  const title =
    titleProperty?.type === 'title'
      ? titleProperty.title[0]?.plain_text
      : '제목 없음';

  return (
    <div className="notion-page-meta rounded-lg bg-transparent p-6">
      <h1 className="mb-4 text-2xl font-bold">{title}</h1>
      <p>ID: {notionPageMeta.id}</p>
      <p>
        Created Time: {new Date(notionPageMeta.created_time).toLocaleString()}
      </p>
      <p>
        Last Edited Time:{' '}
        {new Date(notionPageMeta.last_edited_time).toLocaleString()}
      </p>
      <p>Created By: {notionPageMeta.created_by.id}</p>
      <p>Last Edited By: {notionPageMeta.last_edited_by.id}</p>
      <p>
        URL:{' '}
        <a
          href={notionPageMeta.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          {notionPageMeta.url}
        </a>
      </p>
      <p>
        Public URL:{' '}
        <a
          href={notionPageMeta.public_url || undefined}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          {notionPageMeta.public_url}
        </a>
      </p>
    </div>
  );
};

export default NotionPageMeta;
