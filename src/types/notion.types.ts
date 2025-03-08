/* eslint-disable @typescript-eslint/no-unused-vars */

import { PartialUserObjectResponse } from '@notionhq/client/build/src/api-endpoints';

type TextRequest = string;

type IdRequest = string;

type EmptyObject = Record<string, never>;

type DateRequest = {
  start: string;
  end?: string | null;
  time_zone?: string | null;
};

type TemplateMentionRequest =
  | {
      template_mention_date: 'today' | 'now';
      type?: 'template_mention_date';
    }
  | {
      template_mention_user: 'me';
      type?: 'template_mention_user';
    };

type RichTextItemResponse =
  | {
      text: {
        content: string;
        link?: {
          url: TextRequest;
        } | null;
      };
      type?: 'text';
      annotations?: {
        bold?: boolean;
        italic?: boolean;
        strikethrough?: boolean;
        underline?: boolean;
        code?: boolean;
        color?:
          | 'default'
          | 'gray'
          | 'brown'
          | 'orange'
          | 'yellow'
          | 'green'
          | 'blue'
          | 'purple'
          | 'pink'
          | 'red'
          | 'gray_background'
          | 'brown_background'
          | 'orange_background'
          | 'yellow_background'
          | 'green_background'
          | 'blue_background'
          | 'purple_background'
          | 'pink_background'
          | 'red_background';
      };
    }
  | {
      mention:
        | {
            user:
              | {
                  id: IdRequest;
                }
              | {
                  person: {
                    email?: string;
                  };
                  id: IdRequest;
                  type?: 'person';
                  name?: string | null;
                  avatar_url?: string | null;
                  object?: 'user';
                }
              | {
                  bot:
                    | EmptyObject
                    | {
                        owner:
                          | {
                              type: 'user';
                              user:
                                | {
                                    type: 'person';
                                    person: {
                                      email: string;
                                    };
                                    name: string | null;
                                    avatar_url: string | null;
                                    id: IdRequest;
                                    object: 'user';
                                  }
                                | PartialUserObjectResponse;
                            }
                          | {
                              type: 'workspace';
                              workspace: true;
                            };
                        workspace_name: string | null;
                      };
                  id: IdRequest;
                  type?: 'bot';
                  name?: string | null;
                  avatar_url?: string | null;
                  object?: 'user';
                };
          }
        | {
            date: DateRequest;
          }
        | {
            page: {
              id: IdRequest;
            };
          }
        | {
            database: {
              id: IdRequest;
            };
          }
        | {
            template_mention: TemplateMentionRequest;
          };
      type?: 'mention';
      annotations?: {
        bold?: boolean;
        italic?: boolean;
        strikethrough?: boolean;
        underline?: boolean;
        code?: boolean;
        color?:
          | 'default'
          | 'gray'
          | 'brown'
          | 'orange'
          | 'yellow'
          | 'green'
          | 'blue'
          | 'purple'
          | 'pink'
          | 'red'
          | 'gray_background'
          | 'brown_background'
          | 'orange_background'
          | 'yellow_background'
          | 'green_background'
          | 'blue_background'
          | 'purple_background'
          | 'pink_background'
          | 'red_background';
      };
    }
  | {
      equation: {
        expression: TextRequest;
      };
      type?: 'equation';
      annotations?: {
        bold?: boolean;
        italic?: boolean;
        strikethrough?: boolean;
        underline?: boolean;
        code?: boolean;
        color?:
          | 'default'
          | 'gray'
          | 'brown'
          | 'orange'
          | 'yellow'
          | 'green'
          | 'blue'
          | 'purple'
          | 'pink'
          | 'red'
          | 'gray_background'
          | 'brown_background'
          | 'orange_background'
          | 'yellow_background'
          | 'green_background'
          | 'blue_background'
          | 'purple_background'
          | 'pink_background'
          | 'red_background';
      };
    };

export type NotionPageHierarchy = {
  pageId: string;
  pageTitle: string;
  children: NotionPageHierarchy[];
};

export type NotionPage = {
  pageId: string;
  pageTitle: string;
  pageContent: string;
};
