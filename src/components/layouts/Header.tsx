'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect } from 'react';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SidebarTrigger } from '../ui/sidebar';

function Header() {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const menuItems = [
    {
      label: 'Dashboard',
      href: '/dashboard',
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
        {pathname.includes('/dashboard') && <SidebarTrigger />}
        <Button variant="ghost" asChild>
          <Link href="/">
            <span className="font-mono text-xl font-bold text-brand-dark dark:text-brand-light">
              Genie Docs
            </span>
          </Link>
        </Button>
        <nav className="space-x-4">
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
      </div>
      <div className="flex items-center space-x-4">
        {/* <Button variant="outline" asChild>
          <Link href="/auth/signin">SignIn</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/auth/signup">SignUp</Link>
        </Button> */}
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
