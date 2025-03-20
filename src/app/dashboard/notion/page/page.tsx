import NotionPageComponent from '@/components/notion/NotionPageComponent';
import { Loader2 } from 'lucide-react';
import { Suspense } from 'react';

/**
 * Renders the Notion page content within a Suspense component.
 *
 * While the NotionPageComponent is being asynchronously loaded, a loading spinner is displayed as a fallback UI.
 */
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
