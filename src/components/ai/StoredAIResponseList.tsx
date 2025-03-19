'use client';

import { useOpenAIStore } from '@/store/openaiStore';
import ReactMarkdown from 'react-markdown';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

function StoredAIResponseList() {
  const { storedAIResponse } = useOpenAIStore();

  return (
    <div
      className="border-card-background grid grid-cols-1 gap-4 rounded-xl border
								bg-background p-4 text-card-foreground shadow md:grid-cols-2 lg:grid-cols-3"
    >
      {storedAIResponse.map((response, index) => (
        <Card key={index} className="bg-secondary">
          <CardHeader>
            <CardTitle className="text-lg font-bold">
              {response.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ReactMarkdown>{response.content}</ReactMarkdown>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default StoredAIResponseList;
