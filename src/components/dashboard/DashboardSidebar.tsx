'use client';

import {
  BookOpen,
  BookOpenIcon,
  Brain,
  ChevronDown,
  ChevronRight,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  CodeIcon,
  FileIcon,
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
  SidebarRail,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { useSidebarState } from '@/hooks/dashboard/useSidebarState';
import { useNotionPageTree } from '@/hooks/notion/useNotionPageTree';
import { NotionPageHierarchy } from '@/types/notion.types';
import Link from 'next/link';
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
  {
    title: '노션 페이지',
    url: '/dashboard/notion',
    icon: BookOpen,
  },
];

/**
 * 노션 페이지 트리를 재귀적으로 렌더링하는 컴포넌트
 */
function NotionPageTreeItem({ page }: { page: NotionPageHierarchy }) {
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
                <SidebarMenuButton className="w-40 hover:bg-secondary" asChild>
                  <Link
                    className="flex w-full items-center justify-between"
                    href={`/dashboard/notion/page?pageId=${page.pageId}`}
                  >
                    <FileIcon />
                    <span className="w-full truncate">{page.pageTitle}</span>
                    {page.children && page.children.length > 0 && (
                      <ChevronDown
                        className={`ml-auto transition-transform group-data-[state=open]/collapsible${page.pageId}:rotate-90`}
                      />
                    )}
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
              {page.children.map((child) => (
                <NotionPageTreeItem key={child.pageId} page={child} />
              ))}
            </CollapsibleContent>
          )}
        </SidebarMenuSubItem>
      </Collapsible>
    </SidebarMenuSub>
  );
}

export function DashboardSidebar() {
  const {
    isSidebarOpen,
    handleMouseEnter,
    handleMouseLeave,
    handleToggleSidebar,
  } = useSidebarState();
  const { pages } = useNotionPageTree();

  return (
    <Sidebar
      className="mt-16 h-[calc(100svh-theme(spacing.16))] w-64 pr-0"
      variant="floating"
      collapsible="icon"
    >
      <TooltipProvider>
        <Button
          onClick={handleToggleSidebar}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          variant="ghost"
          className="ml-1 mt-3 hidden h-10 w-10 rounded-full md:block"
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
                          <SidebarMenuButton
                            className="hover:bg-secondary"
                            asChild
                          >
                            <button
                              type="button"
                              className="flex w-full items-center justify-between"
                            >
                              <BookOpen />
                              <span className="w-full truncate">
                                {item.title}
                              </span>
                              <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                            </button>
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          {pages.children?.map((child) => (
                            <NotionPageTreeItem
                              key={child.pageId}
                              page={child}
                            />
                          ))}
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
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          className="hover:bg-secondary"
                          asChild
                        >
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
                            <SidebarMenuSubButton
                              className="hover:bg-secondary"
                              asChild
                            >
                              <Link
                                className="flex items-center gap-2"
                                href="/dashboard/ai/templates/overview"
                              >
                                <BookOpenIcon className="h-4 w-4" />
                                <span className="w-full truncate">
                                  프로젝트 개요 문서 생성
                                </span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                          <SidebarMenuSubItem>
                            <SidebarMenuSubButton
                              className="hover:bg-secondary"
                              asChild
                            >
                              <Link
                                className="flex items-center gap-2"
                                href="/dashboard/ai/templates/readme"
                              >
                                <FileIcon className="h-4 w-4" />
                                <span className="w-full truncate">
                                  README 문서 생성
                                </span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                          <SidebarMenuSubItem>
                            <SidebarMenuSubButton
                              className="hover:bg-secondary"
                              asChild
                            >
                              <Link
                                className="flex items-center gap-2"
                                href="/dashboard/ai/templates/api"
                              >
                                <CodeIcon className="h-4 w-4" />
                                <span className="w-full truncate">
                                  API 문서 생성
                                </span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarSeparator />
          </ScrollArea>
        </SidebarContent>
      </TooltipProvider>
      <SidebarRail />
    </Sidebar>
  );
}
