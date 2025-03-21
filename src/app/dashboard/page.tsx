import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
export default function Dashboard() {
  return (
    <div className="flex w-full">
      <DashboardSidebar />
      <div className="w-full p-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>
    </div>
  );
}
