import express from "express";
import {message, message_struct} from "../models/message"
import {users} from "../models/user";
import jwt_decode from "jwt-decode";
import {media, medias} from "../models/media";
import {messageCreated, messageDeleted, messageUpdated} from "./notificationcontroller";
import {logger} from "../main";

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
  media?: media
}

export const messageController = {

  async createMessage(req: express.Request, res: express.Response) {
    const now = new Date();
    const ip_address = req.headers["x-forwaded-for"] || "";
    let sub, author;

    if (process.env.NODE_ENV === "production"){
      // トークンを取る
      const token = req.headers.authorization || "";
      // デコード
      const decoded: any = await jwt_decode(token);
      sub = decoded.sub;
      // ユーザー検索
      author = await users.getFromSub(sub);
    }else {
      author = await users.getFromSub("oshavery|1")
    }


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

    // ここでメッセージの最大文字数を決めることができる
    /* nodejsで"<文字列>.length"を使うと漢字の異体字や絵文字の文字数がおかしくなるので、
        スプレッド構文 "[...<文字列>].length"を使ってバイト数ではなく文字数で判定している
        https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/String/length#unicode
    */
    if (mes.content === "" || !mes.content || [...mes.content].length > 10000 ){return res.status(400).send("Invalid request")}

    await message.createMessage(mes)
      .then((r) => {
        messageCreated(r.channel_id,r.id)
        res.status(201).json(r);
      })
      .catch((e) => {
        logger.error(e);
      });

    logger.info("Message Created");
    return;
  },

  async getMessages(req: express.Request, res: express.Response) {
    const channelId = req.params.channelId;
    let before, limit, respo = [];

    if (req.query.before === undefined){
      before = await message.getFirstMessage(channelId).then((r) => { return r?.id })
    }else{
      before = req.query.before
    }

    // before = req.query.before === undefined ? await message.getFirstMessage(channelId).then((r) => { return r?.id }) : "";
    // console.log(await message.getFirstMessage(channelId).then((r) => { return r?.id }))
    limit = isNaN(Number(req.query.limit)) || Number(req.query.limit) >= 100 || !req.query.limit ? 100 : Number(req.query.limit)

    const messages = await message.getMessages(channelId, before, limit)


    if (!messages) { return console.error("error"); }

    for (let i = 0; i < messages.length; i++) {

      const usr = await users.get(messages[i].userId || "")
      if (!usr) {
        return res.status(500).send("server error")
      }

      // contentが空なのはメディアを含むメッセージのみ
      if (messages[i].content === ""){
        const media = await medias.getMediaFromMessageId(messages[i].id)
        if (!media){return;}
        respo[i] = {
          id: messages[i].id,
          timestamp: messages[i].created_at,
          content:  messages[i].content,
          guild_id: messages[i].guildsId || "",
          channel_id: messages[i].channel_id,
          edited_timestamp: messages[i].updated_at || null,
          author: {
            id: messages[i].userId || "",
            name: usr.name,
            avatarurl: usr.avatarurl,
            bot: usr.bot,
            state: 0
          },
          media: {
            name: media.name,
            mime: media.mime,
            size: 0,
            uploaderId: media.uploaderId || "",
            channelId: media.channelId || "",
            type: "",
            ip: "",
            path: media.path,
            fullpath: media.fullpath
          }
        };
      }
      else {
        respo[i] = {
          id: messages[i].id,
          timestamp: messages[i].created_at,
          content: messages[i].content,
          guild_id: messages[i].guildsId || "",
          channel_id: messages[i].channel_id,
          edited_timestamp: messages[i].updated_at || null,
          author: {
            id: messages[i].userId || "",
            name: usr.name,
            avatarurl: usr.avatarurl,
            bot: usr.bot,
            state: 0
          }
        };
      }
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
        logger.error(e);
      });

    return;
  },

  async updateMessage(req: express.Request, res: express.Response) {
    const id = req.params.messageId;
    const content = req.body.content;
    return await message.updateMessage(id, content)
      .then((r) => {

        //ws
        messageUpdated(r.channel_id,r.id)
        return res.status(200).json(r);
      })
      .catch((e) => {
        logger.error(e);
        return res.status(400).send("Invalid request");
      })
  },

  async deleteMessage(req: express.Request, res: express.Response) {
    const messageId: string = req.params.messageId;
    const date: Date = new Date;
    return await message.deleteMessage(messageId, date)
      .then((r) => {

        //ws
        messageDeleted(r.channel_id,r.id)
        return res.status(204);
      })
      .catch((e) => {
        logger.error(e);
        return res.status(404).send("Not found");
      })
  }
}


