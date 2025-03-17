'use client';

import {
  BookOpen,
  Brain,
  ChevronDown,
  ChevronRight,
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
import { ScrollArea } from '../ui/scroll-area';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';

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

// const aiMenuItems = [
//   {
//     title: 'AI',
//     url: '/dashboard/ai',
//     icon: Brain,
//   },
//   {
//     title: '프로젝트 개요 문서 생성',
//     url: '/dashboard/ai/project-overview',
//     icon: Brain,
//   },
// ];

const etcMenuItems = [
  {
    title: '설정',
    url: '/dashboard/settings',
    icon: Settings,
  },
];

export function DashboardSidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
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

  function renderNotionPages(page: NotionPageHierarchy) {
    return (
      <SidebarMenuSub key={page.pageId}>
        <Collapsible
          key={page.pageId}
          defaultOpen={false}
          className={`group/collapsible${page.pageId}`}
        >
          <SidebarMenuSubItem>
            <Tooltip>
              <TooltipTrigger>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton className="w-40" asChild>
                    <Link
                      className="flex w-full items-center justify-between"
                      href={`/dashboard/notion/page?pageId=${page.pageId}`}
                    >
                      <FileIcon />
                      <span className="w-full truncate">{page.pageTitle}</span>
                      <ChevronDown
                        className={`ml-auto transition-transform group-data-[state=open]/collapsible${page.pageId}:rotate-90`}
                      />
                    </Link>
                  </SidebarMenuButton>
                </CollapsibleTrigger>
              </TooltipTrigger>
              <TooltipContent>
                <p>{page.pageTitle}</p>
              </TooltipContent>
            </Tooltip>
            {page.children && page.children.length > 0 && (
              <CollapsibleContent>
                {page.children.map((child) => renderNotionPages(child))}
              </CollapsibleContent>
            )}
          </SidebarMenuSubItem>
        </Collapsible>
      </SidebarMenuSub>
    );
  }

  return (
    <Sidebar className="mt-16 w-64 pr-0" variant="floating" collapsible="icon">
      <TooltipProvider>
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
        <SidebarContent className="pr-0">
          <ScrollArea>
            <SidebarGroup>
              <SidebarGroupLabel>문서</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <Collapsible
                    defaultOpen={false}
                    className="group/collapsible"
                  >
                    {documentsMenuItems.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton asChild>
                            <Button variant="ghost">
                              <BookOpen />
                              <span className="w-full truncate">
                                {item.title}
                              </span>
                              <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                            </Button>
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          {notionPages.children &&
                            notionPages.children.length > 0 &&
                            renderNotionPages(notionPages)}
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
                  <Collapsible defaultOpen className="group/collapsible">
                    {/* {aiMenuItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <Link href={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))} */}
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton asChild>
                          <Link href="/dashboard/ai">
                            <Brain />
                            <span>AI</span>
                            <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                          </Link>
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          <SidebarMenuSubItem>
                            <Link href="/dashboard/ai/templates/overview">
                              <span>프로젝트 개요 문서 생성</span>
                            </Link>
                          </SidebarMenuSubItem>
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
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
          </ScrollArea>
        </SidebarContent>
      </TooltipProvider>
    </Sidebar>
  );
}
