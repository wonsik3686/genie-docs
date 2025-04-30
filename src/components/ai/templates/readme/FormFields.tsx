'use client';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ReadmeTemplateSchemaType } from '@/constants/formSchemas/ReadmeTemplate.schema';
import { UseFormReturn } from 'react-hook-form';

interface FormFieldsProps {
  form: UseFormReturn<ReadmeTemplateSchemaType>;
}

export default function FormFields({ form }: FormFieldsProps) {
  return (
    <>
      <FormField
        control={form.control}
        name="projectName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>프로젝트 이름</FormLabel>
            <FormControl>
              <Input
                id="projectName"
                placeholder="프로젝트 이름을 입력해주세요. (100자 이하)"
                {...field}
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="installation"
        render={({ field }) => (
          <FormItem>
            <FormLabel>설치 방법</FormLabel>
            <FormControl>
              <Textarea
                id="installation"
                placeholder="설치 방법을 입력해주세요. (1000자 이하)"
                {...field}
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="usage"
        render={({ field }) => (
          <FormItem>
            <FormLabel>사용 방법</FormLabel>
            <FormControl>
              <Textarea
                id="usage"
                placeholder="사용 방법을 입력해주세요. (1000자 이하)"
                {...field}
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="contribution"
        render={({ field }) => (
          <FormItem>
            <FormLabel>기여 방법</FormLabel>
            <FormControl>
              <Textarea
                id="contribution"
                placeholder="기여 방법을 입력해주세요. (1000자 이하)"
                {...field}
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="additionalPrompt"
        render={({ field }) => (
          <FormItem>
            <FormLabel>추가 프롬프트</FormLabel>
            <FormControl>
              <Textarea
                id="additionalPrompt"
                placeholder="추가 프롬프트를 입력해주세요. (1000자 이하)"
                {...field}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </>
  );
}
