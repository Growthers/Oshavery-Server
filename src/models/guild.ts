import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// post時のbodyの型
export interface guild_struct_post {
  guild_name: string,
  guild_topics: string
};

// patch時のbodyの型
export interface guild_struct_patch {
  name: string,
  icon: string,
  owner_id: string
};

export const guild = {
  // POST /guilds
  async create(guild_struct: guild_struct_post) {
    return await prisma.guilds.create({
      data: {
        name: guild_struct.guild_name,
        topic: guild_struct.guild_topics
      }
    });
  },

  // PATCH /guilds/:guildId
  async update(guildId: string, body: guild_struct_patch) {
    return await prisma.guilds.update({
      where: {
        id: guildId
      },
      data: {
        name: body.name
      }
    });
  },

  // DELETE /guilds/:guildId
  async delete(guildId: string) {
    return await prisma.guilds.delete({
      where: {
        id: guildId
      }
    });
  },

  // GET /guilds/:guildId
  async get(guildId: string) {
    return await prisma.guilds.findUnique({
      where: {
        id: guildId
      }
    });
  }
}
