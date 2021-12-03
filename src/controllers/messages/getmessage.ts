import { FastifyReply, FastifyRequest } from "fastify";
import { GetOneMessageParams, messageQuery } from "../../types/message_types";
import { Server } from "https";
import { IncomingMessage } from "http";
import {
  getMessage,
  getOneMessage as getMes,
} from "../../service/messages/get";

export async function getMessages(
  req: FastifyRequest<
    { Querystring: messageQuery; Params: GetOneMessageParams },
    Server,
    IncomingMessage
  >,
  res: FastifyReply
) {
  const respo = await getMessage(
    req.query.beforeId,
    req.params.channelId,
    Number(req.query.limit)
  );

  return res.send(respo);
}

export async function getOneMessage(
  req: FastifyRequest<{ Params: GetOneMessageParams }>,
  res: FastifyReply
) {
  await getMes(req.params.messageId)
    .then((r) => {
      res.status(200).send(r);
    })
    .catch((e) => {
      return req.log.error(e);
    });
}
