import express from "express";
import {message, message_struct} from "../../models/message"
import {users} from "../../models/user";
import jwt_decode from "jwt-decode";
import {messageCreated} from "../notificationcontroller";
import {logger} from "../../main";


export async function createMessage(req: express.Request, res: express.Response) {
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

  // ここでメッセージの最大文字数を決めることができる
  // nodejsはバイトごとではなく文字数ごとにlengthが出せる仕様
  if (mes.content === "" || !mes.content || mes.content.length > 10000 ){return res.status(400).send("Invalid request")}
  let createMessage;
  try {
    createMessage = await message.createMessage(mes)
  }catch (e) {
    logger.error(e);
    return;
  }
  await messageCreated(createMessage.channel_id,createMessage.id)
  res.status(201).json(createMessage);

  logger.info("Message Created");
  return;
}
