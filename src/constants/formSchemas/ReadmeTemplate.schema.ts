import { z } from 'zod';

const projectNameSchema = z.string().min(1, '프로젝트 이름은 필수입니다.');

const installationSchema = z.string().min(1, '설치 방법은 필수입니다.');

const usageSchema = z.string().min(1, '사용 방법은 필수입니다.');

const contributionSchema = z.string().min(1, '기여 방법은 필수입니다.');

const additionalPromptSchema = z.string().min(1, '추가 프롬프트는 필수입니다.');

const relatedInfoSchema = z.string().min(1, '관련 정보는 필수입니다.');

export const readmeTemplateSchema = z.object({
  projectName: projectNameSchema,
  installation: installationSchema,
  usage: usageSchema,
  contribution: contributionSchema,
  additionalPrompt: additionalPromptSchema,
  relatedInfo: relatedInfoSchema,
});

export type ReadmeTemplateSchemaType = z.infer<typeof readmeTemplateSchema>;
