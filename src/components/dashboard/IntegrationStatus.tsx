'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useSettingStore } from '@/store/settingStore';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';

const IntegrationStatus: React.FC = () => {
  const [notionApiKey, setNotionApiKey] = useState<string | undefined>();
  const [openAIApiKey, setOpenAIApiKey] = useState<string | undefined>();

  useEffect(() => {
    setNotionApiKey(Cookies.get('notionApiKey'));
    setOpenAIApiKey(Cookies.get('openAiApiKey'));
  }, []);

  const { notionPageId } = useSettingStore();

  return (
    <Card className="w-full md:w-1/2">
      <CardHeader className="text-lg font-bold">설정 현황</CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div
              className={cn(
                'h-2 w-2 rounded-full',
                notionApiKey && notionPageId ? 'bg-green-500' : 'bg-red-500'
              )}
            />
            <p>노션 연동 {notionApiKey && notionPageId ? '완료' : '미완료'}</p>
          </div>
          <div className="flex items-center gap-2">
            <div
              className={cn(
                'h-2 w-2 rounded-full',
                openAIApiKey ? 'bg-green-500' : 'bg-red-500'
              )}
            />
            <p>OpenAI 연동 {openAIApiKey ? '완료' : '미완료'}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default IntegrationStatus;
