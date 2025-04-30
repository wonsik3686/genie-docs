'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { useTemplateForm } from '@/hooks/ai/useTemplateForm';
import { AITemplate } from '@/types/openai.types';
import { File, Loader2 } from 'lucide-react';
import { FieldValues, UseFormReturn } from 'react-hook-form';
import SelectPageDialog from '../dialogs/SelectPageDialog';

type TemplateFormBaseProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
  formFields: React.ReactNode;
  getPromptTemplate: (formValues: T, pagesContent: string) => string;
  templateType: AITemplate;
};

export default function TemplateFormBase<T extends FieldValues>({
  form,
  formFields,
  getPromptTemplate,
  templateType,
}: TemplateFormBaseProps<T>) {
  const { selectedPages, isAIPending, isBlocksPending, handleSubmit } =
    useTemplateForm(form, getPromptTemplate, templateType);

  return (
    <div className="mb-10 flex flex-col gap-4">
      <Form {...form}>
        <div className="space-y-8">
          {/* 페이지 선택 */}
          <Card className="flex w-full flex-col gap-4">
            <SelectPageDialog />
            <CardContent>
              {selectedPages.length > 0 && (
                <div className="flex w-full flex-col gap-2">
                  {selectedPages.map((page) => (
                    <div
                      key={page.pageId}
                      className="flex items-center gap-2 text-sm"
                    >
                      <File className="h-4 w-4" />
                      {page.pageTitle}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
          {/* 폼 필드 */}
          {formFields}
          {/* 생성 버튼 */}
          <div className="flex justify-end">
            <Button
              className="h-10 w-full bg-accent-point hover:bg-accent-point/80 active:bg-accent-point/60 md:w-60"
              type="button"
              onClick={handleSubmit}
              disabled={isAIPending || isBlocksPending}
            >
              {isAIPending || isBlocksPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                '생성'
              )}
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
}
