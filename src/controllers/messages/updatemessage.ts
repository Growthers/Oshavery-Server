import { FastifyReply } from "fastify";
import {message} from "../../models/message"
import {messageUpdated} from "../notificationcontroller";
import {logger} from "../../refactor-main";

export async function updateMessage(req: any, res: FastifyReply) {
  const id = req.params.messageId;
  const content = req.body.content;
  return await message.updateMessage(id, content)
    .then((r) => {

      //ws
      messageUpdated(r.channel_id,r.id)
      return res.status(200).send(r);
    })
    .catch((e) => {
      logger.error(e);
      return res.status(400).send("Invalid request");
    })
}
