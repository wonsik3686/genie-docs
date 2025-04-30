'use client';

import TemplateFormBase from '@/components/ai/common/TemplateFormBase';
import { APITemplateSchemaType } from '@/constants/formSchemas/APITemplate.schema';
import APITemplatePrompt from '@/constants/promptTemplates/APITemplatePrompt';
import { useForm } from 'react-hook-form';
import FormFields from './FormFields';

function APITemplateForm() {
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
      formFields={<FormFields form={form} />}
      getPromptTemplate={getPromptTemplate}
      templateType="api-document"
    />
  );
}

export default APITemplateForm;
