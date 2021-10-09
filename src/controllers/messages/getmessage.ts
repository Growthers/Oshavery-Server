import express from "express";
import {message} from "../../models/message";
import {users} from "../../models/user";
import {medias} from "../../models/media";
import {logger} from "../../main";

export async function getMessages(req: express.Request, res: express.Response) {
  const channelId = req.params.channelId;
  let before, limit, respo = [];

  if (req.query.before === undefined){
    before = await message.getFirstMessage(channelId).then((r) => { return r?.id })
  }else{
    before = req.query.before
  }

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
}

export async function getOneMessage(req: express.Request, res: express.Response) {
  const messageId: string = req.params.messageId;

  await message.getOneMessage(messageId)
    .then((r) => {
      res.status(200).json(r);
    })
    .catch((e) => {
      logger.error(e);
    });

  return;
}
