import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// post時のbodyの型
// /guilds/:guildId/channels
export interface channel {
  channel_name: string;
  channel_topics: string;
  channel_type: string;
  channel_position: number;
};

//命名がややこしいので要検討
export const channels = {
  // GET
  // /guilds/:guildId/channels
  async get() {
    return await prisma.channels.findMany();
  },

  // POST
  // /guilds/:guildId/channel
  async create(body: channel) {
    await prisma.channels.create({
      data: {
        name: body.channel_name,
        topic: body.channel_topics,
        type: body.channel_type,
        position: body.channel_position
      }
    })
    return;
  },

}
