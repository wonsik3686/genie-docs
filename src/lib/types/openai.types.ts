export type AIResponse = {
  id: string;
  template: AITemplate;
  title: string;
  content: string;
  createdAt: string;
};

export type AITemplate =
  | 'project-overview'
  | 'api-document'
  | 'readme'
  | 'custom';
