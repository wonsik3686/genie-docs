'use client';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { APITemplateSchemaType } from '@/constants/formSchemas/APITemplate.schema';
import APITemplatePrompt from '@/constants/promptTemplates/APITemplatePrompt';
import { useForm } from 'react-hook-form';
import TemplateFormBase from './TemplateFormBase';

function ApiTemplateForm() {
  const form = useForm<APITemplateSchemaType>({
    defaultValues: {
      apiName: '',
      requestFormat: {
        headers: '',
        body: '',
      },
      responseFormat: {
        status: '',
        body: '',
      },
      examples: '',
      additionalPrompt: '',
    },
  });

  const formFields = (
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

  const getPromptTemplate = (
    formValues: APITemplateSchemaType,
    pagesContent: string
  ) => {
    const requestFormat = `헤더: ${formValues.requestFormat.headers}\n\n바디: ${formValues.requestFormat.body}`;
    const responseFormat = `상태: ${formValues.responseFormat.status}\n\n바디: ${formValues.responseFormat.body}`;

    return APITemplatePrompt(
      formValues.apiName,
      requestFormat,
      responseFormat,
      formValues.examples,
      formValues.additionalPrompt,
      pagesContent
    );
  };

  return (
    <TemplateFormBase
      form={form}
      formFields={formFields}
      getPromptTemplate={getPromptTemplate}
      templateType="api-document"
    />
  );
}

export default ApiTemplateForm;
