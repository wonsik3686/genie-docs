import {
  settingSchema,
  type SettingSchemaType,
} from '@/constants/formSchemas/Setting.schema';
import { useSettingStore } from '@/store/settingStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

export function useSettingForm() {
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

  const onSubmit = (values: SettingSchemaType) => {
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
  };

  return {
    form,
    hasUnsavedChanges,
    onSubmit,
  };
}
