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
import { APITemplateSchemaType } from '@/constants/formSchemas/APITemplate.schema';
import APITemplatePrompt from '@/constants/promptTemplates/APITemplatePrompt';
import { useAskOpenAI } from '@/queries/openai.queries';
import { useNotionStore } from '@/store/notionStore';
import { useInitializeSettings, useSettingStore } from '@/store/settingStore';
import { File, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Card, CardContent } from '../ui/card';
import SelectPageDialog from './SelectPageDialog';

function ApiTemplateForm() {
  useInitializeSettings();
  const { selectedPages } = useNotionStore();
  const { openAiApiKey } = useSettingStore();
  const { mutate: askOpenAI, isPending } = useAskOpenAI();

  const form = useForm<APITemplateSchemaType>({
    defaultValues: {
      apiName: '',
      requestFormat: {
        headers: '',
        body: '',
      },
      responseFormat: {
        status: '',
        body: '',
      },
      examples: '',
      additionalPrompt: '',
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const selectedPagesString = selectedPages
      .map((content) => {
        if (!content.pageContent) return '';
        return `내용: ${content.pageContent}`;
      })
      .join('; ');

    const requestFormat = `헤더: ${form.getValues('requestFormat.headers')}\n\n바디: ${form.getValues('requestFormat.body')}`;
    const responseFormat = `상태: ${form.getValues('responseFormat.status')}\n\n바디: ${form.getValues('responseFormat.body')}`;

    const promptWithPages = APITemplatePrompt(
      form.getValues('apiName'),
      requestFormat,
      responseFormat,
      form.getValues('examples'),
      form.getValues('additionalPrompt'),
      selectedPagesString
    );

    askOpenAI({
      prompt: promptWithPages,
      template: 'api-document',
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
            name="apiName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>API 이름</FormLabel>
                <FormControl>
                  <Input
                    id="apiName"
                    placeholder="API 이름을 입력해주세요. (100자 이하)"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="requestFormat.headers"
            render={({ field }) => (
              <FormItem>
                <FormLabel>요청 헤더</FormLabel>
                <FormControl>
                  <Textarea
                    id="requestFormat.headers"
                    placeholder="요청 헤더에 대한 설명을 입력해주세요. (1000자 이하)"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="requestFormat.body"
            render={({ field }) => (
              <FormItem>
                <FormLabel>요청 바디</FormLabel>
                <FormControl>
                  <Textarea
                    id="requestFormat.body"
                    placeholder="요청 바디에 대한 설명을 입력해주세요. (1000자 이하)"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="responseFormat.status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>응답 헤더</FormLabel>
                <FormControl>
                  <Textarea
                    id="responseFormat.status"
                    placeholder="응답 헤더에 대한 설명을 입력해주세요. (1000자 이하)"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="responseFormat.body"
            render={({ field }) => (
              <FormItem>
                <FormLabel>응답 바디</FormLabel>
                <FormControl>
                  <Textarea
                    id="responseFormat.body"
                    placeholder="응답 바디에 대한 설명을 입력해주세요. (1000자 이하)"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="examples"
            render={({ field }) => (
              <FormItem>
                <FormLabel>사용 예제</FormLabel>
                <FormControl>
                  <Textarea
                    id="examples"
                    placeholder="사용 예제를 입력해주세요. (1000자 이하)"
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
          <div className="flex justify-end">
            <Button
              className="h-10 w-40 bg-accent-point hover:bg-accent-point/80 active:bg-accent-point/60 md:w-80"
              type="submit"
              disabled={isPending}
            >
              {isPending ? (
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

export default ApiTemplateForm;
