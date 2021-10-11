import axios from "axios";
import {FastifyReply} from "fastify";
import { users } from "../../models/user";
import { logger} from "../../main";
import { guild } from "../../models/guild";
import { channels } from "../../models/channel"


type me = {
  id: string;
  name: string;
  avatarurl: string;
  bot: boolean;
  state: number;
  guilds: any;
}

export async function getMe(req: any, res: FastifyReply) {
  let response_data: me = {
    id: "",
    name: "",
    avatarurl: "",
    bot: false,
    state: 0,
    guilds: []
  };

  let userdata;
  if (process.env.NODE_ENV === "production"){
    // Auth0にユーザー情報を問い合わせる(廃止予定
    // ToDo: Auth0での認証をやめる
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


    // 返ってきたAuth0ユーザー情報からOshaveryのユーザー情報を取得
    userdata = await users.getFromSub(response.sub);
    if (!userdata) { return res.status(400).send("Invalid request") }
  }else {
    userdata = await users.getFromSub("oshavery|1");
  }


  // 参加しているギルドを取得
  const guilds = await guild.searchJoinedGuilds(userdata.id);
  if (!guilds) { return; }

  // ギルドにあるチャンネルリストの取得
  let channel = [], guild_datas = Array<any>(); // ToDo: Anyやめる
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

  return res.send(response_data);
}
