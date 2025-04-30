import { APITemplateSchemaType } from '@/constants/formSchemas/APITemplate.schema';
import APITemplatePrompt from '@/constants/promptTemplates/APITemplatePrompt';

export const getPromptTemplate = (
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
