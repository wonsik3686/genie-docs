'use client';

import { Menu, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect } from 'react';

import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useIsMobile } from '@/hooks/shadcn/use-mobile';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import NotionSearchCommand from '../notion/NotionSearchCommand';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '../ui/navigation-menu';

function Header() {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const menuItems = [
    {
      label: '대시보드',
      href: '/dashboard',
    },
    {
      label: '설정',
      href: '/settings',
    },
  ];

  useEffect(() => {
    if (theme === undefined) {
      setTheme('light');
    }
  }, [theme, setTheme]);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between bg-background p-4 dark:bg-background">
      <div className="flex items-center space-x-4">
        {pathname.includes('/dashboard') && (
          <SidebarTrigger className="md:hidden" />
        )}
        <Button variant="ghost" asChild>
          <Link href="/">
            <span className="xs:text-md font-mono text-xl font-bold text-brand-dark dark:text-brand-light xs:text-md-bold">
              Genie Docs
            </span>
          </Link>
        </Button>
        {!isMobile && (
          <nav className="space-x-4 xs:space-x-0">
            {menuItems.map((item) => (
              <Button
                className={`${pathname === item.href ? 'font-bold' : 'font-semibold text-gray-600 dark:text-gray-300'}`}
                variant="ghost"
                asChild
                key={item.href}
              >
                <Link href={item.href}>{item.label}</Link>
              </Button>
            ))}
          </nav>
        )}
      </div>
      <div className="absolute right-4 flex items-center space-x-4">
        {isMobile && (
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  <Menu className="h-[1.2rem] w-[1.2rem]" />
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  {menuItems.map((item) => (
                    <Link key={item.href} href={item.href}>
                      <NavigationMenuLink asChild>
                        <Button
                          variant="ghost"
                          className="w-full px-10 text-lg-bold"
                        >
                          {item.label}
                        </Button>
                      </NavigationMenuLink>
                    </Link>
                  ))}
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        )}
        <NotionSearchCommand />
        <Button
          variant="outline"
          size="icon"
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>
    </header>
  );
}

export default Header;
