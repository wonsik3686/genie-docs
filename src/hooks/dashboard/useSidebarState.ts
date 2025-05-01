import { useSidebar } from '@/components/ui/sidebar';
import { useCallback, useState } from 'react';

export function useSidebarState() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { setOpen } = useSidebar();

  const handleMouseEnter = useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  const handleMouseLeave = useCallback(() => {
    if (!isSidebarOpen) {
      setOpen(false);
      setIsSidebarOpen(false);
    }
  }, [isSidebarOpen, setOpen]);

  const handleToggleSidebar = useCallback(() => {
    if (isSidebarOpen) {
      setOpen(false);
      setIsSidebarOpen(false);
    } else {
      setOpen(true);
      setIsSidebarOpen(true);
    }
  }, [isSidebarOpen, setOpen]);

  return {
    isSidebarOpen,
    handleMouseEnter,
    handleMouseLeave,
    handleToggleSidebar,
  };
}
