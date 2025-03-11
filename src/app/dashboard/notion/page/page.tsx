import NotionPageComponent from '@/components/notion/NotionPageComponent';
import { Loader2 } from 'lucide-react';
import { Suspense } from 'react';

export default function NotionPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen w-full items-center justify-center">
          <Loader2 className="h-4 w-4 animate-spin" />
        </div>
      }
    >
      <NotionPageComponent />
    </Suspense>
  );
}
