'use client';

import { z } from 'zod';

export const notionApiKeySchema = z
  .string()
  .max(300, '유효하지 않은 Notion API Key 형식입니다.')
  .or(z.literal(''))
  .transform((val) => val || '');

export const notionPageIdSchema = z
  .string()
  .max(300, '유효하지 않은 Notion Page ID 형식입니다.')
  .or(z.literal(''))
  .transform((val) => val || '');

export const openAiApiKeySchema = z
  .string()
  .max(300, '유효하지 않은 OpenAI API Key 형식입니다.')
  .or(z.literal(''))
  .transform((val) => val || '');

export const settingSchema = z.object({
  notionApiKey: notionApiKeySchema,
  notionPageId: notionPageIdSchema,
  openAiApiKey: openAiApiKeySchema,
});

export type SettingSchemaType = z.infer<typeof settingSchema>;
