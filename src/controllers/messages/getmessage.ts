import { FastifyReply, FastifyRequest } from "fastify";
import { message } from "../../models/message";
import { users } from "../../models/user";
import { medias } from "../../models/media";
import { logger } from "../../main";
import { GetOneMessageParams, messageQuery } from "../../types/message_types";
import { Server } from "https";
import { IncomingMessage } from "http";

export async function getMessages(
  req: FastifyRequest<
    { Querystring: messageQuery; Params: GetOneMessageParams },
    Server,
    IncomingMessage
  >,
  res: FastifyReply
) {
  const { channelId } = req.params;
  let before;
  const respo = [];

  // before: 指定したidのメッセージより前のメッセージを取得できる  指定しないと最新のメッセージ以降100件を返す
  if (req.query.beforeId === undefined) {
    before = await message.getFirstMessage(channelId).then((r) => r?.id);
  } else {
    before = req.query.beforeId;
  }

  /*
  limit: 一回で取得するメッセージの数を指定
  最大は100件で何も指定しないと100件取得とみなす
  */
  const limit =
    isNaN(Number(req.query.limit)) ||
    Number(req.query.limit) >= 100 ||
    !req.query.limit
      ? 100
      : Number(req.query.limit);

  const messages = await message.getMessages(channelId, before, limit);

  if (!messages) {
    return console.error("error");
  }

  for (let i = 0; i < messages.length; i++) {
    const usr = await users.get(messages[i].userId || "");
    if (!usr) {
      return res.status(500).send("server error");
    }

    // contentが空のメッセージはメディアファイルを含んでいるのでメディアをメッセージIDで検索
    if (messages[i].content === "") {
      const media = await medias.getMediaFromMessageId(messages[i].id);
      if (!media) {
        return;
      }
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
          state: 0,
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
          fullpath: media.fullpath,
        },
      };
    } else {
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
          state: 0,
        },
      };
    }
  }

  return res.send(respo);
}

export async function getOneMessage(
  req: FastifyRequest<{ Params: GetOneMessageParams }>,
  res: FastifyReply
) {
  const { messageId } = req.params;

  await message
    .getOneMessage(messageId)
    .then((r) => {
      res.status(200).send(r);
    })
    .catch((e) => {
      logger.error(e);
    });
}
