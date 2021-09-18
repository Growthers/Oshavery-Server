import axios from "axios";
import express from "express";
import { users, register } from "../models/user";
import { conf , logger} from "../main";
import { guild } from "../models/guild";
// import { guild_users_mappings } from ".prisma/client";
import { channels } from "../models/channel"

conf;

interface me {
  id: string;
  name: string;
  avatarurl: string;
  bot: boolean;
  state: number;
  guilds: any,
  channels: any
}

export const userController = {
  async getAllUsers(req: express.Request, res: express.Response) {
    console.log(req.path);
    return await users.getAllUsers().then((r) => { return res.status(200).json(r) }).catch((e) => { return console.log(e); })
  },

  async getUsers(req: express.Request, res: express.Response) {
    if (req.path === "/me") { userController.getMe(req, res); return; }

    const user_id = req.params.userId;

    await users.get(user_id)
      .then((ur) => {
        res.status(200).json(ur);
        return;
      })
      .catch((e) => {
        logger.error(e);
        res.status(404).send("User Not Found");
        return;
      });
    return;
  },

  async register(req: express.Request, res: express.Response) {
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

    logger.info("User Created")

    const data: register = {
      name: response.name,
      sub: response.sub,
      avatar: response.picture
    }

    //締め切り直前で動けばいい，動けばいいという処理をしています．
    //ここは再実装必須です．汚いコードには目をつぶってください
    await users.createUserAccount(data)
      .then((r) => {
        this.autg(r.id,r.name);
        res.status(201).json(r);
        return;
      })
      .catch((e) => { logger.error(e); return res.status(400).send("Invalid request"); });
    return;
  },


  async autg(userId: string, name: string) {
    const guildarr = await guild.allget()
    for (let i = 0; i < guildarr.length; i++) {
      guild.addUsertoGuild(userId,guildarr[i].id,name)
    }
  },

  async getMe(req: express.Request, res: express.Response) {
    console.log("a")
    let response_data: me = {
      id: "",
      name: "",
      avatarurl: "",
      bot: false,
      state: 0,
      guilds: [],
      channels: []
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
    let channel = []
    for (let i = 0; i < guilds.length; i++) {
      // ギルドからチャンネル一覧を取り出す
      const gld = await channels.get(guilds[i].guild_id || "");
      if (!gld) { return; }
      channel[i] = gld[0]
    }

    response_data = {
      id: userdata.id,
      name: userdata.name,
      avatarurl: userdata.avatarurl,
      bot: userdata.bot,
      state: 0,
      guilds: guilds,
      channels: channel,
    }

    return res.json(response_data);
  },

  async updateUser(req: express.Request, res: express.Response){
    if (req.path === "/me") { userController.updateMe(req, res); return; }
      else{
        return res.status(403).send("Forbidden")
      }
    //  強制アップデート用
  },

  async updateMe(req: express.Request, res: express.Response){
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
        console.log(err);
      });

    const usr = await users.getFromSub(response.sub)
    if (!usr){return res.status(400).send("Invalid request")}
    await users.updateUser(usr.id, req.body.name).then(() => {return}).catch((e) => {logger.error(e); res.status(400)})
    return res.status(204).send("");
  }
}
