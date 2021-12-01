import { FastifyReply, FastifyRequest } from "fastify";
import deleteMes from "../../service/messages/delete";
import { messageDeleted } from "../notificationcontroller";
import { GetOneMessageParams } from "../../types/message_types";

export async function deleteMessage(
  req: FastifyRequest<{ Params: GetOneMessageParams }>,
  res: FastifyReply
) {
  const { messageId } = req.params;

  const resp = await deleteMes(messageId);

  // ここでの削除は論理削除で実際には削除されない(ユーザーに表示されなくなるだけ)
  if (resp === null) {
    res.log.error("Message Not Found");
    return res.status(404).send("Not found");
  } else {
    // ws
    await messageDeleted(resp.channel_id, resp.id);
    return res.status(204);
  }
}
