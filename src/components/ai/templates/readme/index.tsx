'use client';

import TemplateFormBase from '@/components/ai/common/TemplateFormBase';
import { ReadmeTemplateSchemaType } from '@/constants/formSchemas/ReadmeTemplate.schema';
import ReadmeTemplatePrompt from '@/constants/promptTemplates/ReadmeTemplatePrompt';
import { useForm } from 'react-hook-form';
import FormFields from './FormFields';

function ReadmeTemplateForm() {
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

export default ReadmeTemplateForm;
