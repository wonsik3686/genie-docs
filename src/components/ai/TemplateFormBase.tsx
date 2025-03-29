'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { useNotionBlocksBatch } from '@/queries/notion.queries';
import { useAskOpenAI } from '@/queries/openai.queries';
import { useNotionStore } from '@/store/notionStore';
import { useInitializeSettings, useSettingStore } from '@/store/settingStore';
import { AITemplate } from '@/types/openai.types';
import { getTextFromBlock } from '@/utils/notion.utils';
import { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { File, Loader2 } from 'lucide-react';
import { FieldValues, UseFormReturn } from 'react-hook-form';
import SelectPageDialog from './SelectPageDialog';

type TemplateFormBaseProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
  formFields: React.ReactNode;
  getPromptTemplate: (formValues: T, pagesContent: string) => string;
  templateType: AITemplate;
};

function TemplateFormBase<T extends FieldValues>({
  form,
  formFields,
  getPromptTemplate,
  templateType,
}: TemplateFormBaseProps<T>) {
  useInitializeSettings();
  const { selectedPages } = useNotionStore();
  const { openAiApiKey } = useSettingStore();
  const { mutate: askOpenAI, isPending: isAIPending } = useAskOpenAI();

  // 선택된 페이지들의 블록 데이터를 가져오기
  const { data: blocksData, isPending: isBlocksPending } = useNotionBlocksBatch(
    selectedPages.map((page) => page.pageId)
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 각 페이지의 블록 내용을 텍스트로 변환
    const selectedPagesString = selectedPages
      .map((page, index) => {
        const blocks = blocksData?.[index]?.results || [];
        const pageContent = blocks
          .map((block) => getTextFromBlock(block as BlockObjectResponse))
          .filter((text) => text)
          .join('\n');

        return `페이지 제목: ${page.pageTitle}\n내용: ${pageContent}`;
      })
      .join('\n\n');

    const formValues = form.getValues();
    const promptWithPages = getPromptTemplate(formValues, selectedPagesString);

    askOpenAI({
      prompt: promptWithPages,
      template: templateType,
      openAIKey: openAiApiKey,
    });
  };

  return (
    <div className="mb-10 flex flex-col gap-4">
      <Form {...form}>
        <form onSubmit={handleSubmit} className="space-y-8">
          <Card className="flex w-full flex-col gap-4">
            <SelectPageDialog />
            <CardContent>
              {selectedPages.length > 0 && (
                <div className="flex w-full flex-col gap-2">
                  {selectedPages.map((page) => (
                    <div
                      key={page.pageId}
                      className="flex items-center gap-2 text-sm"
                    >
                      <File className="h-4 w-4" />
                      {page.pageTitle}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
          {formFields}
          <div className="flex justify-end">
            <Button
              className="h-10 w-full bg-accent-point hover:bg-accent-point/80 active:bg-accent-point/60 md:w-60"
              type="submit"
              disabled={isAIPending || isBlocksPending}
            >
              {isAIPending || isBlocksPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                '생성'
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default TemplateFormBase;
