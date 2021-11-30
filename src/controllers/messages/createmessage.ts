import { FastifyReply, FastifyRequest } from "fastify";
import CreateMessage from "../../service/messages/create";
import { createMessageBody } from "../../types/message_types";
import { ChannelIdParams } from "../../types/message_types";

export async function createMessage(
  req: FastifyRequest<{ Params: ChannelIdParams; Body: createMessageBody }>,
  res: FastifyReply
) {
  // ToDo: ユーザーIP取得の廃止
  const ip_address = req.headers["x-forwaded-for"] || "";

  const message = await CreateMessage({
    ip: ip_address[0] || "unknown",
    content: req.body.content,
    channelId: req.params.id,
  });
  if (message !== null) {
    res.log.info("Message Created");
    return res.status(201).send(message);
  } else {
    return res.status(400).send("Invalid Request");
  }
}
