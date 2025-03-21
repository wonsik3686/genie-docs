'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useNotionStore } from '@/store/notionStore';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { ScrollArea } from '../ui/scroll-area';

function SelectPageDialog() {
  const { notionPageList, selectedPages, setSelectedPages } = useNotionStore();
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-secondary hover:bg-secondary/80 active:bg-secondary/60"
        >
          페이지 선택
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>페이지 선택</DialogTitle>
          <DialogDescription>
            페이지를 선택하여 프로젝트 개요 문서 생성에 활용할 수 있습니다.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[60vh]">
          <div className="flex flex-col gap-2 md:gap-1">
            {notionPageList.map((page) => (
              <div
                className="flex items-center space-x-2 rounded-lg px-2 py-3 hover:bg-secondary/50 active:bg-secondary/30"
                key={page.pageId}
              >
                <Checkbox
                  id={page.pageId}
                  checked={selectedPages.some((p) => p.pageId === page.pageId)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedPages([...selectedPages, page]);
                    } else {
                      setSelectedPages(
                        selectedPages.filter((p) => p.pageId !== page.pageId)
                      );
                    }
                  }}
                />
                <label
                  htmlFor={page.pageId}
                  className="h-full w-full text-lg-regular leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {page.pageTitle}
                </label>
              </div>
            ))}
          </div>
        </ScrollArea>
        <DialogFooter>
          <Button
            type="submit"
            onClick={() => {
              setOpen(false);
            }}
          >
            선택 완료
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default SelectPageDialog;
