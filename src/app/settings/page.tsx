import SettingForm from '@/components/dashboard/SettingForm';
import { Metadata } from 'next';

export default function SettingsPage() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 p-4 sm:p-8">
      <h1 className="mb-4 text-2xl font-bold">설정</h1>
      <SettingForm />
    </div>
  );
}

export const metadata: Metadata = {
  title: '설정 | Genie Docs',
  description: 'Genie Docs의 API 키 설정 및 기타 환경 설정을 관리하세요.',
  openGraph: {
    title: '설정 | Genie Docs',
    description: 'Genie Docs의 API 키 설정 및 기타 환경 설정을 관리하세요.',
    type: 'website',
  },
};
