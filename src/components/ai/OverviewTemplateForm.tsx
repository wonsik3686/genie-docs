'use client';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { OverviewTemplateSchemaType } from '@/constants/formSchemas/OverviewTemplate.schema';
import OverviewPromptTemplate from '@/constants/promptTemplates/OverviewTemplatePrompt';
import { useForm } from 'react-hook-form';
import TemplateFormBase from './TemplateFormBase';

function OverviewTemplateForm() {
  const form = useForm<OverviewTemplateSchemaType>({
    defaultValues: {
      projectName: '',
      goalAndBackground: '',
      keyFeatures: '',
      targetUsers: '',
      additionalPrompt: '',
    },
  });

  const formFields = (
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
        name="goalAndBackground"
        render={({ field }) => (
          <FormItem>
            <FormLabel>목표 및 배경</FormLabel>
            <FormControl>
              <Textarea
                id="goalAndBackground"
                placeholder="목표 및 배경을 입력해주세요. (1000자 이하)"
                {...field}
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="keyFeatures"
        render={({ field }) => (
          <FormItem>
            <FormLabel>주요 기능</FormLabel>
            <FormControl>
              <Textarea
                id="keyFeatures"
                placeholder="주요 기능을 입력해주세요. (1000자 이하)"
                {...field}
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="targetUsers"
        render={({ field }) => (
          <FormItem>
            <FormLabel>대상 사용자</FormLabel>
            <FormControl>
              <Textarea
                id="targetUsers"
                placeholder="대상 사용자를 입력해주세요. (1000자 이하)"
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
    formValues: OverviewTemplateSchemaType,
    pagesContent: string
  ) => {
    return OverviewPromptTemplate(
      formValues.projectName,
      formValues.goalAndBackground,
      formValues.keyFeatures,
      formValues.targetUsers,
      formValues.additionalPrompt,
      pagesContent
    );
  };

  return (
    <TemplateFormBase
      form={form}
      formFields={formFields}
      getPromptTemplate={getPromptTemplate}
      templateType="project-overview"
    />
  );
}

export default OverviewTemplateForm;
