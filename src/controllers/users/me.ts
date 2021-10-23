import { FastifyReply } from "fastify";
import { users } from "../../models/user.js";
import { guild } from "../../models/guild.js";
import { channels } from "../../models/channel.js";
import { checklogin } from "../auth/checklogin";
import { InvalidTokenError } from "../auth/verifytoken";
import jwt_decode from "jwt-decode";

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
export async function getMe(req: any, res: FastifyReply) {
  if (!req.headers.authorization) return;
  const check = await checklogin(req.headers.authorization);
  if (check instanceof InvalidTokenError) {
    res.status(401).send("Invalid request");
    return;
  }
  let response_data: me = {
    id: "",
    name: "",
    avatarurl: "",
    bot: false,
    state: 0,
    guilds: [],
  };

  const user = jwt_decode(req.headers.authorization);

  // eslint-disable-next-line
  // @ts-ignore
  const userdata = await users.getFromSub(user.uid);

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

  if (!userdata.avatarurl) {
    return;
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
