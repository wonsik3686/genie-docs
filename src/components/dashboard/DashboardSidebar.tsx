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

  function NotionPageChevron({ hasChildren }: { hasChildren: boolean }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {
      setIsOpen(!isOpen);
    };

    return (
      <div onClick={toggleOpen} className="flex cursor-pointer items-center">
        {hasChildren && (
          <ChevronDown
            className={`ml-auto h-4 w-4 transition-transform duration-300 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        )}
      </div>
    );
  }

  function renderNotionPages(page: NotionPageHierarchy) {
    return (
      <SidebarMenuSub key={page.pageId}>
        <Collapsible key={page.pageId} defaultOpen>
          <SidebarMenuSubItem>
            <Tooltip>
              <TooltipTrigger>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton asChild>
                    <Link href={`/dashboard/notion/page?pageId=${page.pageId}`}>
                      <FileIcon />
                      <span className="w-full truncate">{page.pageTitle}</span>
                      <NotionPageChevron
                        hasChildren={page.children.length > 0}
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
    <Sidebar className="mt-16 pr-0" variant="floating" collapsible="icon">
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
        <ScrollArea className="rounded-md">
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>문서</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <Collapsible defaultOpen className="group/collapsible">
                    {documentsMenuItems.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton asChild>
                            <Button variant="ghost">
                              <BookOpen />
                              <span>{item.title}</span>
                              <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
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
        </ScrollArea>
      </TooltipProvider>
    </Sidebar>
  );
}
