/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { AIResponse } from '@/types/openai.types';
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
export async function POST(req: NextRequest) {
  const { prompt, template, openAIKey } = await req.json();

  if (!prompt) {
    return NextResponse.json(
      { success: false, error: 'Prompt is required' },
      { status: 400 }
    );
  }

  if (!openAIKey) {
    return NextResponse.json(
      { success: false, error: 'OpenAI API Key is required' },
      { status: 400 }
    );
  }

  if (!template) {
    return NextResponse.json(
      { success: false, error: 'Template type is required' },
      { status: 400 }
    );
  }

  const openai = new OpenAI({
    apiKey: openAIKey,
  });

  const templateMessages = {
    'project-overview':
      'You are a helpful assistant that generates project overview documents.',
    'api-document': 'You are a helpful assistant that generates API documents.',
    readme: 'You are a helpful assistant that generates README documents.',
    custom: 'You are a helpful assistant that generates documents.',
  };

  const messageContent =
    templateMessages[template as keyof typeof templateMessages] ||
    'You are a helpful assistant.';

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo',
      messages: [
        {
          role: 'system',
          content: messageContent,
        },
        { role: 'user', content: prompt },
      ],
      max_tokens: 4000,
      temperature: 0.7,
    });

    const aiResponse: AIResponse = {
      id: response.id,
      template: template,
      title: template,
      content: response.choices[0].message.content?.trim() || '',
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json({ success: true, aiResponse });
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.error(error.message);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch data from OpenAI API',
      },
      { status: 500 }
    );
  }
}
