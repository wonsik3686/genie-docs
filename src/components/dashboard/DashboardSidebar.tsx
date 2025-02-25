'use client';

import {
  BookOpen,
  Brain,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  Settings,
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from '../ui/button';

const documentsMenuItems = [
  {
    title: '노션 페이지 전체 보기',
    url: '/dashboard/notion/pages',
    icon: BookOpen,
  },
  {
    title: '노션 페이지',
    url: '/dashboard/notion',
    icon: BookOpen,
  },
];

const aiMenuItems = [
  {
    title: 'AI',
    url: '/dashboard/ai',
    icon: Brain,
  },
  {
    title: '프로젝트 개요 문서 생성',
    url: '/dashboard/ai/project-overview',
    icon: Brain,
  },
];

const etcMenuItems = [
  {
    title: '설정',
    url: '/dashboard/settings',
    icon: Settings,
  },
];

export function DashboardSidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { setOpen } = useSidebar();

  function handleMouseEnter() {
    setOpen(true);
  }

  function handleMouseLeave() {
    if (!isSidebarOpen) {
      setOpen(false);
      setIsSidebarOpen(false);
    }
  }

  function handleToggleSidebar() {
    if (isSidebarOpen) {
      setOpen(false);
      setIsSidebarOpen(false);
    } else {
      setOpen(true);
      setIsSidebarOpen(true);
    }
  }

  return (
    <Sidebar className="mt-16 pr-0" variant="floating" collapsible="icon">
      <Button
        onClick={handleToggleSidebar}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        variant="ghost"
        className="ml-1 mt-3 h-10 w-10 rounded-full"
      >
        {isSidebarOpen ? (
          <ChevronsLeftIcon className="h-4 w-4" />
        ) : (
          <ChevronsRightIcon className="h-4 w-4" />
        )}
      </Button>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {documentsMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>메뉴</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {aiMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {etcMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
