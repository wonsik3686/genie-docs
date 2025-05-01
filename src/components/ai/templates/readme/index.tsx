'use client';

import TemplateFormBase from '@/components/ai/common/TemplateFormBase';
import { ReadmeTemplateSchemaType } from '@/lib/constants/formSchemas/ReadmeTemplate.schema';
import ReadmeTemplatePrompt from '@/lib/constants/promptTemplates/ReadmeTemplatePrompt';
import { useForm } from 'react-hook-form';
import FormFields from './FormFields';

export default function ReadmeTemplateForm() {
  const form = useForm<ReadmeTemplateSchemaType>({
    defaultValues: {
      projectName: '',
      installation: '',
      usage: '',
      contribution: '',
      additionalPrompt: '',
    },
  });

  const getPromptTemplate = (
    formValues: ReadmeTemplateSchemaType,
    pagesContent: string
  ) => {
    return ReadmeTemplatePrompt(
      formValues.projectName,
      formValues.installation,
      formValues.usage,
      formValues.contribution,
      formValues.additionalPrompt,
      pagesContent
    );
  };

  return (
    <TemplateFormBase
      form={form}
      formFields={<FormFields form={form} />}
      getPromptTemplate={getPromptTemplate}
      templateType="readme"
    />
  );
}
