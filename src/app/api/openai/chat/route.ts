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
      ' 너는 프로젝트 개요를 작성하는 전문가이자 어시스턴트야.',
    'api-document': ' 너는 API 문서를 작성하는 전문가이자 어시스턴트야.',
    readme: ' 너는 README 문서를 작성하는 전문가이자 어시스턴트야.',
    custom: ' 너는 문서를 작성하는 전문가이자 어시스턴트야.',
  };

  const messageContent =
    templateMessages[template as keyof typeof templateMessages] ||
    'You are a helpful assistant.';

  try {
    const stream = await openai.chat.completions.create({
      model: 'gpt-4-turbo',
      messages: [
        {
          role: 'system',
          content: messageContent,
        },
        { role: 'user', content: prompt },
      ],
      stream: true,
      max_tokens: 4000,
      temperature: 0.7,
    });

    // SSE 스트림 설정
    const encoder = new TextEncoder();
    const customStream = new ReadableStream({
      async start(controller) {
        let fullContent = '';

        try {
          for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content || '';
            fullContent += content;

            // 클라이언트에 청크 전송
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify({ content })}\n\n`)
            );
          }

          // 스트림 완료 시 전체 응답 전송
          const aiResponse: AIResponse = {
            id: crypto.randomUUID(),
            template,
            title: template,
            content: fullContent,
            createdAt: new Date().toISOString(),
          };

          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({ done: true, aiResponse })}\n\n`
            )
          );
        } catch (error) {
          controller.error(error);
        }
        controller.close();
      },
    });

    return new NextResponse(customStream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    });
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({ error: error.message || 'OpenAI API 오류' }),
      { status: 500 }
    );
  }
}
