import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { ExternalLinkIcon } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';

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

      <div className="my-4 flex h-5 items-center justify-end space-x-4">
        <Button variant="outline" size="sm" asChild>
          <Link href={notionPageMeta.public_url || ''} target="_blank">
            공개 URL
            <ExternalLinkIcon className="h-4 w-4" />
          </Link>
        </Button>
        <Separator orientation="vertical" />
        <Button variant="outline" size="sm" asChild>
          <Link href={notionPageMeta.url} target="_blank">
            내부 URL
            <ExternalLinkIcon className="h-4 w-4" />
          </Link>
        </Button>
      </div>
      <Separator />

      <div className="my-2 flex h-5 items-center space-x-4 text-sm-regular">
        <p className="w-32">ID</p>
        <Separator orientation="vertical" />
        <p>{notionPageMeta.id}</p>
      </div>
      <Separator />

      <div className="my-2 flex h-5 items-center space-x-4 text-sm-regular">
        <p className="w-32">생성 시간</p>
        <Separator orientation="vertical" />
        <p>{new Date(notionPageMeta.created_time).toLocaleString()}</p>
      </div>
      <Separator />

      <div className="my-2 flex h-5 items-center space-x-4 text-sm-regular">
        <p className="w-32">수정 시간</p>
        <Separator orientation="vertical" />
        <p>{new Date(notionPageMeta.last_edited_time).toLocaleString()}</p>
      </div>
      <Separator />

      {/* <div className="my-2 flex h-5 items-center space-x-4">
        <p className="w-32">생성자</p>
        <Separator orientation="vertical" />
        <p>{notionPageMeta.created_by.id}</p>
      </div>
      <Separator /> */}

      {/* <div className="my-2 flex h-5 items-center space-x-4">
        <p className="w-32">수정자</p>
        <Separator orientation="vertical" />
        <p>{notionPageMeta.last_edited_by.id}</p>
      </div> */}
    </div>
  );
};

export default NotionPageMeta;
