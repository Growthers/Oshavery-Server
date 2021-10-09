import express from "express";
import {message} from "../../models/message";
import {messageDeleted} from "../notificationcontroller";
import {logger} from "../../main";

export async function deleteMessage(req: express.Request, res: express.Response) {
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
