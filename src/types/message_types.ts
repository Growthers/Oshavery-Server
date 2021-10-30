export type createMessage = {
  content: string;
};

export type updateMessageRequestBody = {
  content: string;
};

export type messageQuery = {
  beforeId?: string;
  limit?: number;
};

export type GetOneMessageParams = {
  channelId: string;
  messageId: string;
};
