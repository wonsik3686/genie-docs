'use client';

import { useSettingStore } from '@/store/settingStore';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

export default function useNotionIntegrationStatus() {
  const [notionApiKey, setNotionApiKey] = useState<string | undefined>();
  const [openAIApiKey, setOpenAIApiKey] = useState<string | undefined>();
  const [notionPageId] = useSettingStore((state) => state.notionPageId);
  const [isNotionIntegrated, setIsNotionIntegrated] = useState<boolean>(false);
  const [isOpenAIIntegrated, setIsOpenAIIntegrated] = useState<boolean>(false);

  useEffect(() => {
    setNotionApiKey(Cookies.get('notionApiKey'));
    setOpenAIApiKey(Cookies.get('openAiApiKey'));
  }, []);

  useEffect(() => {
    setIsNotionIntegrated(!!notionApiKey && !!notionPageId);
    setIsOpenAIIntegrated(!!openAIApiKey);
  }, [notionApiKey, openAIApiKey, notionPageId]);

  return {
    isNotionIntegrated,
    isOpenAIIntegrated,
  };
}
