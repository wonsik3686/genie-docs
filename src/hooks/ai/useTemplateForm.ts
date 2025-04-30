import { useNotionBlocksBatch } from '@/queries/notion.queries';
import { useOpenAIChatGPTStream } from '@/queries/openai.queries';
import { useNotionStore } from '@/store/notionStore';
import { useInitializeSettings, useSettingStore } from '@/store/settingStore';
import { AITemplate } from '@/types/openai.types';
import { getTextFromBlock } from '@/utils/notion.utils';
import { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { UseFormReturn } from 'react-hook-form';

export function useTemplateForm<T extends object>(
  form: UseFormReturn<T>,
  getPromptTemplate: (formValues: T, pagesContent: string) => string,
  templateType: AITemplate
) {
  useInitializeSettings();
  const { selectedPages } = useNotionStore();
  const { openAiApiKey } = useSettingStore();
  const { mutate: askOpenAI, isPending: isAIPending } =
    useOpenAIChatGPTStream();

  // 선택된 페이지들의 블록 데이터
  const { data: blocksData, isPending: isBlocksPending } = useNotionBlocksBatch(
    selectedPages.map((page) => page.pageId),
    {
      enabled: selectedPages.length > 0,
    }
  );

  const handleSubmit = () => {
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

  return {
    selectedPages,
    blocksData,
    isAIPending,
    isBlocksPending,
    handleSubmit,
  };
}
