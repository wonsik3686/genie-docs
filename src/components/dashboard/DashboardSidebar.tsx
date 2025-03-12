'use client';

import {
  BookOpen,
  Brain,
  ChevronDown,
  ChevronRight,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  FileText,
  Settings,
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
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

// const etcMenuItems = [
//   {
//     title: '설정',
//     url: '/dashboard/settings',
//     icon: Settings,
//   },
// ];

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
          className="group/collapsible"
        >
          <SidebarMenuSubItem>
            <Tooltip>
              <TooltipTrigger>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton className="max-w-52" asChild>
                    <Link
                      className="flex w-full items-center justify-between"
                      href={`/dashboard/notion/page?pageId=${page.pageId}`}
                    >
                      {/* <FileIcon /> */}
                      {page.children && page.children.length > 0 && (
                        <ChevronDown className="transition-transform group-data-[state=isOpen]/collapsible:rotate-0" />
                      )}
                      <span className="w-full truncate">{page.pageTitle}</span>
                    </Link>
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                {/* <SidebarMenuAction className="hover:bg-secondary"> */}
                {/* {page.children && page.children.length > 0 && (
                    <ChevronRight className="transition-transform group-data-[state=open]/collapsible:rotate-90" />
                  )} */}
                {/* </SidebarMenuAction> */}
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
    <Sidebar className="w-64 pr-0 pt-20" variant="floating" collapsible="icon">
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
                      <CollapsibleTrigger key={item.title} asChild>
                        <SidebarMenuItem className="max-w-56" key={item.title}>
                          <SidebarMenuButton>
                            <BookOpen />
                            {item.title}
                          </SidebarMenuButton>
                          <SidebarMenuAction className="hover:bg-secondary">
                            <ChevronRight className="transition-transform group-data-[state=open]/collapsible:rotate-90" />
                          </SidebarMenuAction>
                          <CollapsibleContent>
                            {notionPages.children &&
                              notionPages.children.length > 0 &&
                              renderNotionPages(notionPages)}
                          </CollapsibleContent>
                        </SidebarMenuItem>
                      </CollapsibleTrigger>
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
                    <CollapsibleTrigger asChild>
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                          <SidebarMenuButton>
                            <Brain />
                            자동 완성
                          </SidebarMenuButton>
                        </SidebarMenuButton>
                        <SidebarMenuAction>
                          <ChevronRight className="transition-transform group-data-[state=open]/collapsible:rotate-90" />
                        </SidebarMenuAction>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            <SidebarMenuSubItem>
                              <SidebarMenuButton asChild>
                                <Link href="/dashboard/ai/project-overview">
                                  <FileText />
                                  프로젝트 개요 문서
                                </Link>
                              </SidebarMenuButton>
                            </SidebarMenuSubItem>
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </CollapsibleTrigger>
                  </Collapsible>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarSeparator />
          </ScrollArea>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/dashboard/settings">
                    <Settings />
                    <span>설정</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </SidebarContent>
      </TooltipProvider>
    </Sidebar>
  );
}
