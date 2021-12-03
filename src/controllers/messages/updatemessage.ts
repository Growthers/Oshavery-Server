import { FastifyReply, FastifyRequest } from "fastify";
import {
  GetOneMessageParams,
  updateMessageRequestBody,
} from "../../types/message_types";
import update from "../../service/messages/update";

export async function updateMessage(
  req: FastifyRequest<{
    Params: GetOneMessageParams;
    Body: updateMessageRequestBody;
  }>,
  res: FastifyReply
) {
  const id = req.params.messageId;
  const { content } = req.body;

  const resp = await update(id, content);
  if (resp !== null) {
    return res.status(200).send(resp);
  } else {
    res.log.error("Failed to update message");
    return res.status(400).send("Invalid Request");
  }
}
