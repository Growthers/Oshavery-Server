import { FastifyReply, FastifyRequest } from "fastify";
import { message, message_struct } from "../../models/message";
import { users } from "../../models/user";
import { messageCreated } from "../notificationcontroller";
import { logger } from "../../main";
import { createMessageBody } from "../../types/message_types";
import { ChannelIdParams } from "../../types/message_types";

export async function createMessage(
  req: FastifyRequest<{ Params: ChannelIdParams; Body: createMessageBody }>,
  res: FastifyReply
) {
  // 現在時刻を取得
  const now = new Date();
  // ToDo: ユーザーIP取得の廃止
  const ip_address = req.headers["x-forwaded-for"] || "";
  // ToDo: ここでテスト用アカウントを使うことを強制しているのでそれをやめる(開発モードの影響)
  const author = await users.getFromSub("oshavery|1");

  if (!author) {
    return res.status(404).send("Not found");
  }

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
    channel_id: req.params.id,
  };

  // ここでメッセージの最大文字数を決めることができる
  /* nodejsで"<文字列>.length"を使うと漢字の異体字やUnicode絵文字の文字数がおかしくなるので、
      スプレッド構文 "[...<文字列>].length"を使ってバイト数ではなく文字数で判定している
      https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/String/length#unicode
  */
  if (mes.content === "" || !mes.content || [...mes.content].length > 10000) {
    return res.status(400).send("Invalid request");
  }

  let createMessage;
  try {
    createMessage = await message.createMessage(mes);
  } catch (e) {
    logger.error(e);
    return;
  }
  await messageCreated(createMessage.channel_id, createMessage.id);
  res.status(201).send(createMessage);

  logger.info("Message Created");
  return;
}
