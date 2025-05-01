import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { APITemplateSchemaType } from '@/lib/constants/formSchemas/APITemplate.schema';
import { UseFormReturn } from 'react-hook-form';

type APITemplateFormFieldsProps = {
  form: UseFormReturn<APITemplateSchemaType>;
};

export default function APITemplateFormFields({
  form,
}: APITemplateFormFieldsProps) {
  return (
    <>
      <FormField
        control={form.control}
        name="apiName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>API 이름</FormLabel>
            <FormControl>
              <Input
                id="apiName"
                placeholder="API 이름을 입력해주세요. (100자 이하)"
                {...field}
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="requestFormat.headers"
        render={({ field }) => (
          <FormItem>
            <FormLabel>요청 헤더</FormLabel>
            <FormControl>
              <Textarea
                id="requestFormat.headers"
                placeholder="요청 헤더를 입력해주세요. (1000자 이하)"
                {...field}
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="requestFormat.body"
        render={({ field }) => (
          <FormItem>
            <FormLabel>요청 바디</FormLabel>
            <FormControl>
              <Textarea
                id="requestFormat.body"
                placeholder="요청 바디를 입력해주세요. (1000자 이하)"
                {...field}
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="responseFormat.status"
        render={({ field }) => (
          <FormItem>
            <FormLabel>응답 상태</FormLabel>
            <FormControl>
              <Textarea
                id="responseFormat.status"
                placeholder="응답 상태를 입력해주세요. (1000자 이하)"
                {...field}
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="responseFormat.body"
        render={({ field }) => (
          <FormItem>
            <FormLabel>응답 바디</FormLabel>
            <FormControl>
              <Textarea
                id="responseFormat.body"
                placeholder="응답 바디를 입력해주세요. (1000자 이하)"
                {...field}
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="examples"
        render={({ field }) => (
          <FormItem>
            <FormLabel>예시</FormLabel>
            <FormControl>
              <Textarea
                id="examples"
                placeholder="예시를 입력해주세요. (1000자 이하)"
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
