/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { AIResponse } from '@/types/openai.types';
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
export async function POST(req: NextRequest) {
  const { prompt } = await req.json();

  if (!prompt) {
    return NextResponse.json(
      { success: false, error: 'Prompt is required' },
      { status: 400 }
    );
  }

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo',
      messages: [
        {
          role: 'developer',
          content:
            'You are a helpful assistant that generates project overview documents.',
        },
        { role: 'user', content: prompt },
      ],
      max_tokens: 1000,
      temperature: 0.7,
    });

    const message =
      response.choices[0].message.content?.trim() || 'No response';

    const aiResponse: AIResponse = {
      id: '',
      template: 'project-overview',
      title: '',
      content: message,
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
