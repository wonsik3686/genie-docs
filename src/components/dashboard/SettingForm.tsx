'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  settingSchema,
  type SettingSchemaType,
} from '@/constants/formSchemas/SettingSchemas.schema';
import { useInitializeSettings, useSettingStore } from '@/store/settingStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

export default function SettingForm() {
  useInitializeSettings();
  const {
    notionApiKey,
    notionPageId,
    openAiApiKey,
    setNotionApiKey,
    setNotionPageId,
    setOpenAiApiKey,
  } = useSettingStore();

  const form = useForm<SettingSchemaType>({
    mode: 'onBlur',
    resolver: zodResolver(settingSchema),
    defaultValues: {
      notionApiKey: '',
      notionPageId: '',
      openAiApiKey: '',
    },
  });

  useEffect(() => {
    form.reset({
      notionApiKey,
      notionPageId,
      openAiApiKey,
    });
  }, [form, notionApiKey, notionPageId, openAiApiKey]);

  const formValues = form.watch();
  const hasUnsavedChanges =
    formValues.notionApiKey !== notionApiKey ||
    formValues.notionPageId !== notionPageId ||
    formValues.openAiApiKey !== openAiApiKey;

  function onSubmit(values: SettingSchemaType) {
    try {
      setNotionApiKey(values.notionApiKey);
      setNotionPageId(values.notionPageId);
      setOpenAiApiKey(values.openAiApiKey);
    } catch (error) {
      if (error instanceof Error) {
        form.setError('root', {
          type: 'manual',
          message: `설정 저장 중 오류가 발생했습니다: ${error.message}`,
        });
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="notionApiKey"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notion API Key</FormLabel>
              <FormControl>
                <Input placeholder="노션 API Key를 입력하세요" {...field} />
              </FormControl>
              <FormDescription>
                {form.formState.errors.notionApiKey
                  ? form.formState.errors.notionApiKey?.message
                  : 'Notion 통합을 위한 API 키를 입력하세요.'}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notionPageId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notion Page ID</FormLabel>
              <FormControl>
                <Input placeholder="노션 페이지 ID를 입력하세요" {...field} />
              </FormControl>
              <FormDescription>
                {form.formState.errors.notionPageId
                  ? form.formState.errors.notionPageId?.message
                  : '연동할 Notion 페이지의 ID를 입력하세요.'}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="openAiApiKey"
          render={({ field }) => (
            <FormItem>
              <FormLabel>OpenAI API Key</FormLabel>
              <FormControl>
                <Input placeholder="OpenAI API Key를 입력하세요" {...field} />
              </FormControl>
              <FormDescription>
                {form.formState.errors.openAiApiKey
                  ? form.formState.errors.openAiApiKey?.message
                  : 'OpenAI 기능 사용을 위한 API 키를 입력하세요.'}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex w-full flex-col items-center gap-2">
          <div className="flex gap-2">
            <Button
              className={
                hasUnsavedChanges
                  ? 'bg-accent-light hover:bg-accent-point'
                  : 'bg-accent-dark hover:bg-accent-point'
              }
              type="submit"
              disabled={!hasUnsavedChanges}
            >
              저장
            </Button>
          </div>
          {hasUnsavedChanges && (
            <p className="text-sm text-accent-point">
              저장되지 않은 변경사항이 있습니다.
            </p>
          )}
          {form.formState.errors.root && (
            <p className="text-sm text-destructive">
              {form.formState.errors.root.message}
            </p>
          )}
        </div>
      </form>
    </Form>
  );
}
