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
  async get(guild_id: string) {
    console.log(guild_id);
    // ToDo: Guildの完全な実装が終わったらここを改修する
    // return await prisma.channels.findMany({
    //   where: {
    //     guildsId: guild_id
    //   }
    // });
  },

  // POST
  // /guilds/:guildId/channel
  async create(body: channel, guildId: string) {
    console.log(guildId);
    return await prisma.channels.create({
      data: {
        // guildId: guildId,
        name: body.channel_name,
        topic: body.channel_topics,
        type: body.channel_type,
        position: body.channel_position
      }
    });
  }

}
