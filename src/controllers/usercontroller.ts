import axios from "axios";
import express from "express";
import { users, register } from "../models/user";
import { conf } from "../main";
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

    console.log(req.path);
    const user_id = req.params.userId;

    await users.get(user_id)
      .then((ur) => {
        console.log(ur);
        res.status(200).json(ur);
        return;
      })
      .catch((e) => {
        console.error(e);
        res.status(404).send("User Not Found");
        return;
      });
    return;
  },

  async register(req: express.Request, res: express.Response) {
    const accessToken = req.headers.authorization;
    console.log(process.env.AUTH0_DOMAIN + "/userinfo")
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

    console.table(response);

    const data: register = {
      name: response.name,
      sub: response.sub,
      avatar: response.picture
    }

    await users.createUserAccount(data)
      .then((r) => { return res.status(201).json(r); })
      .catch((e) => { console.error(e); return res.status(400).send("Invalid request"); });

    return;
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
    console.log(accessToken)
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

    // ユーザー情報を取得
    const userdata = await users.getFromSub(response.sub);
    if (!userdata) { return res.status(400).send("Invalid request") }
    // 参加しているギルドを取得
    const guilds = await guild.searchJoinedGuilds(userdata.id);
    if (!guilds) { return; }

    console.table(guilds)
    // ギルドにあるチャンネルリストの取得
    let channel = []
    for (let i = 0; i < guilds.length; i++) {
      // ギルドからチャンネル一覧を取り出す
      const gld = await channels.get(guilds[i].guild_id || "");
      if (!gld) { return; }
      console.table(gld);
      channel[i] = gld[0]
    }

    console.table(channel);
    // return res.send("n");

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
    await users.updateUser(usr.id, req.body.name).then((r) => {console.log(r); return}).catch((e) => {console.table(e); res.status(400)})
    return res.status(204).send("");
  }
}
