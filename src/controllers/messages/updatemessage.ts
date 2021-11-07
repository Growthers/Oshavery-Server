import { FastifyReply, FastifyRequest } from "fastify";
import { message } from "../../models/message";
import { messageUpdated } from "../notificationcontroller";
import { logger } from "../../main";
import {
  GetOneMessageParams,
  updateMessageRequestBody,
} from "../../types/message_types";

export async function updateMessage(
  req: FastifyRequest<{
    Params: GetOneMessageParams;
    Body: updateMessageRequestBody;
  }>,
  res: FastifyReply
) {
  const id = req.params.messageId;
  const { content } = req.body;
  return message
    .updateMessage(id, content)
    .then((r) => {
      // ws
      messageUpdated(r.channel_id, r.id);
      return res.status(200).send(r);
    })
    .catch((e) => {
      logger.error(e);
      return res.status(400).send("Invalid request");
    });
}
