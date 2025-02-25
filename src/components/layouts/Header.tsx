'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect } from 'react';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

function Header() {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    if (theme === undefined) {
      setTheme('light');
    }
  }, [theme, setTheme]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-4 bg-background dark:bg-background">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" asChild>
          <Link href="/">
            <span className="text-xl font-bold text-brand-dark dark:text-brand-light font-mono">
              Genie Docs
            </span>
          </Link>
        </Button>
        <nav className="space-x-4">
          <Button variant="ghost" asChild>
            <Link href="/dashboard">Dashboard</Link>
          </Button>
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
