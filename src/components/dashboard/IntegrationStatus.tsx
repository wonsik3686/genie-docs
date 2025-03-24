'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import useNotionIntegrationStatus from '@/hooks/notion/useNotionIntegrationStatus';
import { cn } from '@/lib/utils';
import React from 'react';

const IntegrationStatus: React.FC = () => {
  const { isNotionIntegrated, isOpenAIIntegrated } =
    useNotionIntegrationStatus();

  return (
    <Card className="w-full md:w-1/2">
      <CardHeader className="text-lg font-bold">설정 현황</CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div
              className={cn(
                'h-2 w-2 rounded-full',
                isNotionIntegrated ? 'bg-green-500' : 'bg-red-500'
              )}
            />
            <p>노션 연동 {isNotionIntegrated ? '완료' : '미완료'}</p>
          </div>
          <div className="flex items-center gap-2">
            <div
              className={cn(
                'h-2 w-2 rounded-full',
                isOpenAIIntegrated ? 'bg-green-500' : 'bg-red-500'
              )}
            />
            <p>OpenAI 연동 {isOpenAIIntegrated ? '완료' : '미완료'}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default IntegrationStatus;
