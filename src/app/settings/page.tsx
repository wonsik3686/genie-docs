import SettingForm from '@/components/dashboard/SettingForm';

export default function SettingsPage() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 p-4 sm:p-8">
      <h1 className="mb-4 text-2xl font-bold">설정</h1>
      <SettingForm />
    </div>
  );
}
