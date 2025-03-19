'use client';

import { z } from 'zod';

export const projectNameSchema = z
  .string()
  .min(1, '프로젝트 이름을 입력해주세요.')
  .max(100, '프로젝트 이름은 100자 이하여야 합니다.');

export const additionalPromptSchema = z
  .string()
  .min(1, '추가 프롬프트를 입력해주세요.')
  .max(1000, '추가 프롬프트는 1000자 이하여야 합니다.');

export const goalAndBackgroundSchema = z
  .string()
  .min(1, '목표를 입력해주세요.')
  .max(1000, '목표는 1000자 이하여야 합니다.');

export const keyFeaturesSchema = z
  .string()
  .min(1, '주요 기능을 입력해주세요.')
  .max(1000, '주요 기능은 1000자 이하여야 합니다.');

export const targetUsersSchema = z
  .string()
  .min(1, '대상 사용자를 입력해주세요.')
  .max(1000, '대상 사용자는 1000자 이하여야 합니다.');

export const overviewTemplateSchema = z.object({
  projectName: projectNameSchema,
  goalAndBackground: goalAndBackgroundSchema,
  keyFeatures: keyFeaturesSchema,
  targetUsers: targetUsersSchema,
  additionalPrompt: additionalPromptSchema,
});

export type OverviewTemplateSchemaType = z.infer<typeof overviewTemplateSchema>;
