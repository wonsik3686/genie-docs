'use client';

import TemplateFormBase from '@/components/ai/common/TemplateFormBase';
import { OverviewTemplateSchemaType } from '@/constants/formSchemas/OverviewTemplate.schema';
import OverviewTemplatePrompt from '@/constants/promptTemplates/OverviewTemplatePrompt';
import { useForm } from 'react-hook-form';
import FormFields from './FormFields';

export default function OverviewTemplateForm() {
  const form = useForm<OverviewTemplateSchemaType>({
    defaultValues: {
      projectName: '',
      goalAndBackground: '',
      keyFeatures: '',
      targetUsers: '',
      additionalPrompt: '',
    },
  });

  const getPromptTemplate = (
    formValues: OverviewTemplateSchemaType,
    pagesContent: string
  ) => {
    return OverviewTemplatePrompt(
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
      formFields={<FormFields form={form} />}
      getPromptTemplate={getPromptTemplate}
      templateType="project-overview"
    />
  );
}
