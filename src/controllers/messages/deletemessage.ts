import { FastifyReply, FastifyRequest } from "fastify";
import { message } from "../../models/message.js";
import { messageDeleted } from "../notificationcontroller.js";
import { logger } from "../../main.js";
import { GetOneMessageParams } from "../../types/message_types";
import { AuthHeaders } from "../../types/auth_types";
import { IncomingMessage, Server } from "http";
import { checklogin } from "../auth/checklogin";
import { InvalidTokenError } from "../auth/verifytoken";

export async function deleteMessage(
  req: FastifyRequest<
    { Params: GetOneMessageParams; Headers: AuthHeaders },
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
  const { messageId } = req.params;
  const date: Date = new Date();

  // ここでの削除は論理削除で実際には削除されない(ユーザーに表示されなくなるだけ)
  return message
    .deleteMessage(messageId, date)
    .then((r) => {
      // ws
      messageDeleted(r.channel_id, r.id);
      return res.status(204);
    })
    .catch((e) => {
      logger.error(e);
      return res.status(404).send("Not found");
    });
}
