import { FastifyReply } from "fastify";
import { message } from "../../models/message";
import { messageDeleted } from "../notificationcontroller";
import { logger } from "../../main";

// eslint-disable-next-line
export async function deleteMessage(req: any, res: FastifyReply) {
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
