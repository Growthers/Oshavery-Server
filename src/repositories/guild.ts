import {
  messageCreated,
  userJoined,
} from "../controllers/notificationcontroller";
import { prisma } from "./client";

export class GuildNotFoundError extends Error {}

// POST /guilds
export async function createGuild(data: { name: string; topics: string }) {
  return prisma.guilds.create({
    data: {
      icon: "https://media.oshavery-app.net/logos/well.png",
      name: data.name,
      topic: data.topics,
    },
  });
}

// PATCH /guilds/:guildId
export async function updateGuild(
  guildId: string,
  body: { name: string; icon: string; owner: string }
) {
  return prisma.guilds.update({
    where: {
      id: guildId,
    },
    data: {
      name: body.name,
    },
  });
}

// DELETE /guilds/:guildId
export async function deleteGuild(guildId: string) {
  return prisma.guilds.delete({
    where: {
      id: guildId,
    },
  });
}

// GET /guilds/:guildId
export async function get(guildId: string) {
  const res = await prisma.guilds.findUnique({
    where: {
      id: guildId,
    },
  });

  if (!res) {
    return null;
  } else {
    return res;
  }
}

// export async function allget() {
//   return prisma.guilds.findMany();
// }

// 仮
// 要動作確認
// 要確認
// よくわかってない
export async function addUsertoGuild(
  userid: string,
  guildid: string,
  name: string
) {
  // guild_users_mappingsを作成するとギルドに参加したことになる
  await prisma.guild_users_mappings.create({
    data: {
      name,
      guild: { connect: { id: guildid } },
      users: { connect: { id: userid } },
    },
  });
  // ws
  userJoined(userid, guildid);
  // 参加通知をするチャンネルをきめておく
  const channelId = "";

  // 参加通知のメッセージを送る
  const mesres = await prisma.messages.create({
    data: {
      content: `${name}が参加しました`,
      ip: "",
      channels: { connect: { id: channelId } },
      user: { connect: { id: userid } },
    },
  });
  // メッセージが作成されたことをwsで通知する
  messageCreated(channelId, mesres.id);
}

// ギルドに属するメンバーを検索
export async function searchJoinedGuildMembers(id: string) {
  return prisma.guild_users_mappings.findMany({
    where: {
      guild_id: id,
    },
  });
}

// 1人のメンバーが所属しているギルドリストを取得
export async function searchJoinedGuilds(id: string) {
  return prisma.guild_users_mappings.findMany({
    where: {
      usersId: id,
    },
  });
}
