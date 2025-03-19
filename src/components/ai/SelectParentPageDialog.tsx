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

function SelectParentPageDialog() {
  const { notionPageList, selectedParentPage, setSelectedParentPage } =
    useNotionStore();
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">저장될 대상 페이지 선택</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>저장될 대상 페이지 선택</DialogTitle>
          <DialogDescription>
            AI 응답이 저장될 페이지를 선택합니다.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[60vh]">
          <div className="flex flex-col gap-2">
            {notionPageList.map((page) => (
              <div className="flex items-center space-x-2" key={page.pageId}>
                <Checkbox
                  id={page.pageId}
                  checked={selectedParentPage.pageId === page.pageId}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedParentPage(page);
                    } else {
                      setSelectedParentPage({
                        pageId: '',
                        pageTitle: '',
                        pageContent: '',
                      });
                    }
                  }}
                />
                <label
                  htmlFor={page.pageId}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
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

export default SelectParentPageDialog;
