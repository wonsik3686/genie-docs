'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { OverviewTemplateSchemaType } from '@/constants/formSchemas/OverviewTemplateSchemas.schema';
import OverviewPromptTemplate from '@/constants/promptTemplates/overviewPromptTemplate';
import { useAskOpenAI } from '@/queries/openai.queries';
import { useNotionStore } from '@/store/notionStore';
import { useInitializeSettings, useSettingStore } from '@/store/settingStore';
import { getTextFromBlock } from '@/utils/notion.utils';
import { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { File, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent } from '../ui/card';
import SelectPageDialog from './SelectPageDialog';

function OverviewTemplateForm() {
  useInitializeSettings();
  const { selectedPages } = useNotionStore();
  const { openAiApiKey } = useSettingStore();
  const { mutate: askOpenAI, isPending } = useAskOpenAI();
  const [pageContents] = useState<
    Array<{ pageId: string; blocks: BlockObjectResponse[] }>
  >([]);

  const form = useForm<OverviewTemplateSchemaType>({
    defaultValues: {
      projectName: '',
      goalAndBackground: '',
      keyFeatures: '',
      targetUsers: '',
      additionalPrompt: '',
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const selectedPagesString = pageContents
      .map((content) => {
        if (!content.blocks) return '';
        return `내용: ${content.blocks
          .map((block) => getTextFromBlock(block))
          .filter(Boolean)
          .join(', ')}`;
      })
      .filter(Boolean)
      .join('; ');

    const promptWithPages = OverviewPromptTemplate(
      form.getValues('projectName'),
      form.getValues('goalAndBackground'),
      form.getValues('keyFeatures'),
      form.getValues('targetUsers'),
      form.getValues('additionalPrompt'),
      selectedPagesString
    );

    askOpenAI({
      prompt: promptWithPages,
      template: 'project-overview',
      openAIKey: openAiApiKey,
    });
  };

  return (
    <div className="flex flex-col gap-4">
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
          <FormField
            control={form.control}
            name="projectName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>프로젝트 이름</FormLabel>
                <FormControl>
                  <Input
                    id="projectName"
                    placeholder="프로젝트 이름을 입력해주세요. (100자 이하)"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="goalAndBackground"
            render={({ field }) => (
              <FormItem>
                <FormLabel>목표 및 배경</FormLabel>
                <FormControl>
                  <Textarea
                    id="goalAndBackground"
                    placeholder="목표 및 배경을 입력해주세요. (1000자 이하)"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="keyFeatures"
            render={({ field }) => (
              <FormItem>
                <FormLabel>주요 기능</FormLabel>
                <FormControl>
                  <Textarea
                    id="keyFeatures"
                    placeholder="주요 기능을 입력해주세요. (1000자 이하)"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="targetUsers"
            render={({ field }) => (
              <FormItem>
                <FormLabel>대상 사용자</FormLabel>
                <FormControl>
                  <Textarea
                    id="targetUsers"
                    placeholder="대상 사용자를 입력해주세요. (1000자 이하)"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="additionalPrompt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>추가 프롬프트</FormLabel>
                <FormControl>
                  <Textarea
                    id="additionalPrompt"
                    placeholder="추가 프롬프트를 입력해주세요. (1000자 이하)"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            className="w-full bg-accent-point hover:bg-accent-point/80"
            type="submit"
            disabled={isPending}
          >
            {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : '생성'}
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default OverviewTemplateForm;
