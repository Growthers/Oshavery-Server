import express from "express";
import {message} from "../../models/message"
import {messageUpdated} from "../notificationcontroller";
import {logger} from "../../main";

export async function updateMessage(req: express.Request, res: express.Response) {
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
}
