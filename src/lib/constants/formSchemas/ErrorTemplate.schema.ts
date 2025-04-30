import { z } from 'zod';

const errorNameSchema = z.string().min(1, '에러 이름은 필수입니다.');

const errorCodeSchema = z.string().min(1, '에러 코드는 필수입니다.');

const errorDescriptionSchema = z.string().min(1, '에러 설명은 필수입니다.');

const errorSolutionSchema = z.string().min(1, '해결 방법은 필수입니다.');

const additionalPromptSchema = z.string().min(1, '추가 프롬프트는 필수입니다.');

export const errorTemplateSchema = z.object({
  errorName: errorNameSchema,
  errorCode: errorCodeSchema,
  errorDescription: errorDescriptionSchema,
  errorSolution: errorSolutionSchema,
  additionalPrompt: additionalPromptSchema,
});

export type ErrorTemplateSchemaType = z.infer<typeof errorTemplateSchema>;
