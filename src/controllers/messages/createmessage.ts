import { FastifyReply } from "fastify";
import jwt_decode from "jwt-decode";
import { message, message_struct } from "../../models/message";
import { users } from "../../models/user";
import { messageCreated } from "../notificationcontroller";
import { logger } from "../../main";

// eslint-disable-next-line
export async function createMessage(req: any, res: FastifyReply) {
  // 現在時刻を取得
  const now = new Date();
  // ToDo: ユーザーIP取得の廃止
  const ip_address = req.headers["x-forwaded-for"] || "";
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
    channel_id: req.params.channelId,
  };

  // ここでメッセージの最大文字数を決めることができる
  // nodejsはバイトごとではなく文字数ごとにlengthが出せる仕様
  if (mes.content === "" || !mes.content || mes.content.length > 10000) {
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
