import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { SidebarTrigger } from '@/components/ui/sidebar';
import React from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full">
      <SidebarTrigger />
      <DashboardSidebar />
      <div className="w-full p-8 pt-20">{children}</div>
    </div>
  );
}
