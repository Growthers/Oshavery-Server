import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import {logger} from "../main";

// post時のbodyの型
// /guilds/:guildId/channels
export interface channel {
  channel_name: string;
  channel_topics: string;
  channel_type: string;
  channel_position: number;
};

export class GuildNotFoundError extends Error{};

//命名がややこしいので要検討
export const channels = {
  // GET
  // /guilds/:guildId/channels
  async get(guild_id: string) {
    let res;
    try {
      res = await prisma.channels.findMany({
        where: {
          guildId: guild_id
        }
      });

    } catch (e) {
      logger.error(e);
    }

    if (!res){
      throw new GuildNotFoundError();
    }else {
      return res;
    }

  },

  async getOneChannel(id: string) {
    return await prisma.channels.findUnique({
      where: {
        id: id
      }
    })
  },

  // POST
  // /guilds/:guildId/channel
  async create(body: channel, guildId: string) {
    const res = await prisma.channels.create({
      data: {
        latest_message_id: "",
        guilds: { connect: { id: guildId } },
        name: body.channel_name,
        topic: body.channel_topics,
        type: body.channel_type,
        position: body.channel_position
      }
    });

    await prisma.messages.create({
      data: {
        content: `チャンネルが作成されました ここが${res.name}のはじまりです`,
        ip: "SYSTEM",
        channels: { connect: { id: res.id } },
        user: { connect: { id: "00000000-0000-0000-0000-000000000000" } }
      }
    });
    // Todo: 作成通知を出す

    return res;
  },

}
