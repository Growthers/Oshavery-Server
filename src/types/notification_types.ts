export type notification<
  T extends opeChannelBody | opeMessageBody | opeUserBody
> = {
  type: string;
  body: T;
};

export type opeChannelBody = {
  channelId: string;
};

export type opeMessageBody = {
  channelId: string;
  messageId: string;
};

export type opeUserBody = {
  userId: string;
  guildId: string;
};
