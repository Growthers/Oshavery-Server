import axios from "axios";
import express from "express";
import { users, register } from "../../models/user";
import { conf , logger} from "../../main";
import { guild } from "../../models/guild";
import { channels } from "../../models/channel"

conf;

type me = {
  id: string;
  name: string;
  avatarurl: string;
  bot: boolean;
  state: number;
  guilds: any;
}

export async function getMe(req: express.Request, res: express.Response) {
  console.log("a")
  let response_data: me = {
    id: "",
    name: "",
    avatarurl: "",
    bot: false,
    state: 0,
    guilds: []
  };

  const accessToken = req.headers.authorization;
  const response = await axios("https://" + process.env.AUTH0_DOMAIN + "/userinfo" || "", {
    method: "GET",
    headers: {
      Authorization: accessToken,
    }
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      logger.error(err);
    });

  // ユーザー情報を取得
  const userdata = await users.getFromSub(response.sub);
  if (!userdata) { return res.status(400).send("Invalid request") }
  // 参加しているギルドを取得
  const guilds = await guild.searchJoinedGuilds(userdata.id);
  if (!guilds) { return; }

  // ギルドにあるチャンネルリストの取得
  let channel = [], guild_datas = Array<any>();
  for (let i = 0; i < guilds.length; i++) {
    // ギルド情報を取り出す
    guild_datas[i] = await guild.get(guilds[i].guild_id||"");

    // ギルドからチャンネル一覧を取り出す
    const gld = await channels.get(guilds[i].guild_id || "");
    if (!gld) { return; }
    guild_datas[i].channels = gld;
  }

  response_data = {
    id: userdata.id,
    name: userdata.name,
    avatarurl: userdata.avatarurl,
    bot: userdata.bot,
    state: 0,
    guilds: guild_datas,
  }

  return res.json(response_data);
}
