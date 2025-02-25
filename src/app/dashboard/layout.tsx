import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import React from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full">
      <SidebarProvider>
        <DashboardSidebar />
        <div className="w-full p-8">{children}</div>
      </SidebarProvider>
    </div>
  );
}
