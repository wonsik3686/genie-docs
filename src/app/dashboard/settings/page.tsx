import SettingForm from '@/components/dashboard/SettingForm';

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">설정</h1>
      <SettingForm />
    </div>
  );
}
