import { FastifyReply, FastifyRequest } from "fastify";
import { message } from "../../models/message.js";
import { messageUpdated } from "../notificationcontroller.js";
import { logger } from "../../main.js";
import {
  GetOneMessageParams,
  updateMessageRequestBody,
} from "../../types/message_types";
import { AuthHeaders } from "../../types/auth_types";
import { IncomingMessage, Server } from "http";
import { checklogin } from "../auth/checklogin";
import { InvalidTokenError } from "../auth/verifytoken";

export async function updateMessage(
  req: FastifyRequest<
    {
      Body: updateMessageRequestBody;
      Headers: AuthHeaders;
      Params: GetOneMessageParams;
    },
    Server,
    IncomingMessage
  >,
  res: FastifyReply
) {
  if (!req.headers.authorization) return;
  const check = await checklogin(req.headers.authorization);
  if (check instanceof InvalidTokenError) {
    res.status(401).send("Invalid request");
    return;
  }
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
