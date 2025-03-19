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

  const openai = new OpenAI({
    apiKey: openAIKey,
  });

  let messageContent = '';
  if (template === 'project-overview') {
    messageContent =
      'You are a helpful assistant that generates project overview documents.';
  } else if (template === 'api-document') {
    messageContent =
      'You are a helpful assistant that generates API documents.';
  } else if (template === 'readme') {
    messageContent =
      'You are a helpful assistant that generates README documents.';
  } else if (template === 'custom') {
    messageContent = 'You are a helpful assistant that generates documents.';
  }

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo',
      messages: [
        {
          role: 'developer',
          content: messageContent,
        },
        { role: 'user', content: prompt },
      ],
      max_tokens: 1000,
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
