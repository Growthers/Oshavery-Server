import { PrismaClient } from "@prisma/client";
import { messageCreated, userJoined } from "../controllers/notificationcontroller";
const prisma = new PrismaClient();

// post時のbodyの型
export type guild_struct_post = {
  guild_name: string,
  guild_topics: string
}

// patch時のbodyの型
export type guild_struct_patch = {
  name: string,
  icon: string,
  owner_id: string
}

export class GuildNotFoundError extends Error{}

export const guild = {
  // POST /guilds
  async create(guild_struct: guild_struct_post) {
    return await prisma.guilds.create({
      data: {
        icon: "https://media.oshavery-app.net/logos/well.png",
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
    const res = await prisma.guilds.findUnique({
      where: {
        id: guildId
      }
    });

    if (!res){
      throw new GuildNotFoundError();
    }else {
      return res
    }

  },

  async allget() {
    return await prisma.guilds.findMany();
  },

  //仮
  //要動作確認
  //要確認
  //よくわかってない
  async addUsertoGuild(userid: string, guildid: string, name: string) {
    // guild_users_mappingsを作成するとギルドに参加したことになる
    await prisma.guild_users_mappings.create({
      data: {
        name: name,
        guild: { connect: { id: guildid } },
        users: { connect: { id: userid } }
      }
    });
    //ws
    userJoined(userid,guildid)
    // 参加通知をするチャンネルをきめておく
    const channelId = "";

    // 参加通知のメッセージを送る
    const mesres = await prisma.messages.create({
      data: {
        content: name + 'が参加しました',
        ip: "",
        channels: { connect: { id: channelId } },
        user: { connect: { id: userid } }
      }
    });
    // メッセージが作成されたことをwsで通知する
    messageCreated(channelId, mesres.id)

    return;
  },

  // ギルドに属するメンバーを検索
  async searchJoinedGuildMembers(id: string) {
    return await prisma.guild_users_mappings.findMany({
      where: {
        guild_id: id
      }
    });
  },

  // 1人のメンバーが所属しているギルドリストを取得
  async searchJoinedGuilds(id: string) {
    return await prisma.guild_users_mappings.findMany({
      where: {
        usersId: id
      }
    });
  }
}
