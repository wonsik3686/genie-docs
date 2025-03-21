'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useSettingStore } from '@/store/settingStore';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export function SettingAlarmDialog() {
  const notionPageId = useSettingStore((state) => state.notionPageId);
  const openAiApiKey = Cookies.get('openAiApiKey');
  const notionApiKey = Cookies.get('notionApiKey');

  const [hasSettings, setHasSettings] = useState(true);

  useEffect(() => {
    setHasSettings(
      notionPageId !== '' && openAiApiKey !== '' && notionApiKey !== ''
    );
  }, [notionPageId, openAiApiKey, notionApiKey]);

  return (
    <AlertDialog
      open={!hasSettings}
      onOpenChange={() => {
        setHasSettings(true);
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>설정이 필요합니다</AlertDialogTitle>
          <AlertDialogDescription>
            설정 값이 없습니다. 설정 페이지로 이동하시겠습니까?
            <br />
            <br />
            {notionPageId}
            <br />
            {openAiApiKey}
            <br />
            {notionApiKey}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Link href="/settings">이동</Link>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
