'use client';

import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import ReactMarkdown from 'react-markdown';

type MarkdownRendererProps = {
  content: string;
};

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <ReactMarkdown
      components={{
        // 코드 블록 스타일링
        code({ className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '');
          return match ? (
            <ScrollArea className="rounded-lg border bg-muted/50 p-4">
              <ScrollBar orientation="horizontal" />
              <pre className="overflow-x-auto rounded-lg p-4">
                <code className={className} {...props}>
                  {children}
                </code>
              </pre>
            </ScrollArea>
          ) : (
            <ScrollArea>
              <ScrollBar orientation="horizontal" />
              <code className="rounded-md bg-muted px-1.5 py-0.5" {...props}>
                {children}
              </code>
            </ScrollArea>
          );
        },
        // 헤딩 스타일링
        h1: ({ children }) => (
          <h1 className="mb-4 mt-6 text-2xl font-bold">{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 className="mb-3 mt-5 text-xl font-bold">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className="mb-2 mt-4 text-lg font-bold">{children}</h3>
        ),
        // 리스트 스타일링
        ul: ({ children }) => (
          <ul className="my-4 list-inside list-disc">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="my-4 list-inside list-decimal">{children}</ol>
        ),
        // 링크 스타일링
        a: ({ children, href }) => (
          <a
            href={href}
            className="text-blue-500 underline hover:text-blue-700"
            target="_blank"
            rel="noopener noreferrer"
          >
            {children}
          </a>
        ),
        // 블록쿼트 스타일링
        blockquote: ({ children }) => (
          <blockquote className="my-4 border-l-4 border-gray-300 pl-4 italic">
            {children}
          </blockquote>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
