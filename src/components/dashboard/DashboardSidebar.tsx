'use client';

import {
  BookOpen,
  Brain,
  ChevronDown,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  FileIcon,
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
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarSeparator,
  useSidebar,
} from '@/components/ui/sidebar';
import { useNotionPages } from '@/queries/notion.queries';
import { useNotionStore } from '@/store/notionStore';
import { useSettingStore } from '@/store/settingStore';
import { NotionPageHierarchy } from '@/types/notion.types';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from '../ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../ui/collapsible';

const documentsMenuItems = [
  // {
  //   title: '노션 페이지 전체 보기',
  //   url: '/dashboard/notion/pages',
  //   icon: BookOpen,
  // },
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

  const notionPageId = useSettingStore((state) => state.notionPageId);
  useNotionPages(notionPageId);
  const notionPages = useNotionStore((state) => state.pages);

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

  function renderNotionPages(pages: NotionPageHierarchy[]) {
    return pages.map((page) => (
      <SidebarMenuSub key={page.pageId}>
        <SidebarMenuButton asChild>
          <Link href={`/dashboard/notion/page?pageId=${page.pageId}`}>
            <BookOpen />
            <span>{page.pageTitle}</span>
          </Link>
        </SidebarMenuButton>
        {page.children &&
          page.children.length > 0 &&
          page.children.map((child) => (
            <CollapsibleContent key={child.pageId}>
              <SidebarMenuSub>
                {renderNotionPages(child.children)}
              </SidebarMenuSub>
            </CollapsibleContent>
          ))}
      </SidebarMenuSub>
    ));
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
              <Collapsible defaultOpen className="group/collapsible">
                {documentsMenuItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton asChild>
                        <Link href={item.url}>
                          <FileIcon />
                          <span>{item.title}</span>
                          <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                        </Link>
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        <Collapsible className="grouptwo/collapsible">
                          <SidebarMenuSubItem>
                            <CollapsibleTrigger asChild>
                              <SidebarMenuSubButton>
                                <FileIcon />
                                <span>노션 페이지</span>
                                <ChevronDown className="grouptwo-data-[state=open]/collapsible:rotate-180 ml-auto transition-transform" />
                              </SidebarMenuSubButton>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                              {notionPages.children &&
                                notionPages.children.length > 0 &&
                                renderNotionPages(notionPages.children)}
                            </CollapsibleContent>
                          </SidebarMenuSubItem>
                        </Collapsible>
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                ))}
              </Collapsible>
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
