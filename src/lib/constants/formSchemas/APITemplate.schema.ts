import { z } from 'zod';

const apiNameSchema = z.string().min(1, 'API 이름은 필수입니다.');

const requestSchema = z.object({
  headers: z.string(),
  body: z.string(),
});

const responseSchema = z.object({
  status: z.string(),
  body: z.string(),
});

const exampleSchema = z.string().min(1, '사용 예제는 필수입니다.');

const additionalPromptSchema = z.string().min(1, '추가 프롬프트는 필수입니다.');

export const apiDocumentationSchema = z.object({
  apiName: apiNameSchema,
  requestFormat: requestSchema,
  responseFormat: responseSchema,
  examples: exampleSchema,
  additionalPrompt: additionalPromptSchema,
});

export type APITemplateSchemaType = z.infer<typeof apiDocumentationSchema>;
