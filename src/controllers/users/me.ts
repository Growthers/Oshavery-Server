import axios from "axios";
import { FastifyReply } from "fastify";
import { users } from "../../models/user";
import { logger } from "../../main";
import { guild } from "../../models/guild";
import { channels } from "../../models/channel";

type me = {
  id: string;
  name: string;
  avatarurl: string;
  bot: boolean;
  state: number;
  // eslint-disable-next-line
  guilds: any;
};

// eslint-disable-next-line
export async function getMe(_req: any, res: FastifyReply) {
  let response_data: me = {
    id: "",
    name: "",
    avatarurl: "",
    bot: false,
    state: 0,
    guilds: [],
  };

  const userdata = await users.getFromSub("oshavery|1");

  // 参加しているギルドを取得
  const guilds = await guild.searchJoinedGuilds(userdata.id);
  if (!guilds) {
    return;
  }

  // ギルドにあるチャンネルリストの取得
  // eslint-disable-next-line
  const guild_datas = Array<any>(); // ToDo: Anyやめる
  for (let i = 0; i < guilds.length; i++) {
    // ギルド情報を取り出す
    guild_datas[i] = await guild.get(guilds[i].guild_id || "");

    // ギルドからチャンネル一覧を取り出す
    const gld = await channels.get(guilds[i].guild_id || "");
    if (!gld) {
      return;
    }
    guild_datas[i].channels = gld;
  }

  response_data = {
    id: userdata.id,
    name: userdata.name,
    avatarurl: userdata.avatarurl,
    bot: userdata.bot,
    state: 0,
    guilds: guild_datas,
  };

  return res.send(response_data);
}
