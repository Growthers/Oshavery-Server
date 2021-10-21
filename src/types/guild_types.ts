import { User } from "./user_types";
import { Channel } from "./channel_types";

export type GetGuild = {
  id: string;
  name: string;
  topic: string;
  icon: string;
  owner_id: string;
  users: Array<User>;
  channels: Array<Channel>;
};

export type CreateGuild = {
  name: string;
  topic: string;
};

export type GuildIdParam = {
  id: string;
};

export type UpdateGuildInfo = {
  name: string;
  icon: string;
  owner_id: string;
};
