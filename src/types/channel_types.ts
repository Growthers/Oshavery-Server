export type Channel = {
  id: string;
  channel_type: string;
  channel_topics: string;
  channel_position: number;
  creator_id: string;
};

export type CreateChannel = {
  channel_name: string;
  channel_topics: string;
  channel_type: string;
  channel_position: number;
};

export type UpdateChannel = {
  channel_name: string;
  channel_position: number;
  channel_topic: string;
};

export type ChannelIdParams = {
  guildId: string;
};
