import express from "express";
import { message_struct, message } from "../models/message"
import { users } from "../models/user";
import jwt_decode from "jwt-decode";

interface res {
  id: string;
  timestamp: Date;
  author?: {
    id: string;
    name: string;
    avatarurl: string;
    bot: boolean;
    state: 0
  },
  content: string;
  guild_id: string,
  channel_id: string,
  edited_timestamp?: Date | null,
}

export const messageController = {

  async createMessage(req: express.Request, res: express.Response) {
    const now = new Date();
    const ip_address = req.headers["x-forwaded-for"] || "";

    // トークンを取る
    const token = req.headers.authorization || "";
    // デコード
    const decoded: any = await jwt_decode(token)
    const sub = decoded.sub

    // ユーザー検索
    const author = await users.getFromSub(sub);

    if (!author) { return res.status(404).send("Not found") }

    const mes: message_struct = {
      timestamp: now,
      author: {
        id: author.id,
        name: author.name,
        avator: author.avatarurl,
        bot: author.bot,
        state: 0,
      },
      ip: ip_address[0] || "unknown",
      content: req.body.content,
      channel_id: req.params.channelId
    }

    await message.createMessage(mes)
      .then((r) => {
        res.status(201).json(r);
      })
      .catch((e) => {
        console.error(e);
      });

    return;
  },

  async getMessages(req: express.Request, res: express.Response) {
    const channelId = req.params.channelId;
    let before, limit, respo = [];;

    before = !req.query.before ? await message.getFirstMessage(channelId).then((r) => { return r?.id }) : req.query.before;

    limit = Number(req.query.limit) === NaN || Number(req.query.limit) >= 100 || !req.query.limit ? 100 : Number(req.query.limit)

    const rr = await message.getMessages(channelId, before, limit)
      .catch((e) => {
        console.log(e);
      });

    if (!rr) { return console.error("error"); }

    for (let i = 0; i < rr.length; i++) {
      const usr = await users.get(rr[i].userId || "")
      if (!usr) {
        return res.status(500).send("server error")
      }

      const return_mes: res = {
        id: rr[i].id,
        timestamp: rr[i].created_at,
        content: rr[i].content,
        guild_id: rr[i].guildsId || "",
        channel_id: rr[i].channel_id,
        edited_timestamp: rr[i].updated_at || null,
        author: {
          id: rr[i].userId || "",
          name: usr.name,
          avatarurl: usr.avatarurl,
          bot: usr.bot,
          state: 0
        }
      }

      respo[i] = return_mes;
    }
    return res.json(respo);
  },

  async getOneMessage(req: express.Request, res: express.Response) {
    // const channelId:string = req.params.channelId;
    const messageId: string = req.params.messageId;

    await message.getOneMessage(messageId)
      .then((r) => {
        res.status(200).json(r);
      })
      .catch((e) => {
        console.log(e);
      });

    return;
  },

  async updateMessage(req: express.Request, res: express.Response) {
    const id = req.params.messageId;
    const content = req.body.content;
    return await message.updateMessage(id, content)
      .then((r) => {
        return res.status(200).json(r);
      })
      .catch((e) => {
        console.error(e);
        return res.status(400).send("Invalid request");
      })
  },

  async deleteMessage(req: express.Request, res: express.Response) {
    const messageId: string = req.params.messageId;
    const date: Date = new Date;
    return await message.deleteMessage(messageId, date)
      .then(() => {
        return res.status(204);
      })
      .catch((e) => {
        console.log(e);
        return res.status(404).send("Not found");
      })
  }
}


