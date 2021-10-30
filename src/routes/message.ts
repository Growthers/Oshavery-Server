import { FastifyInstance } from "fastify";
import { getMessages, getOneMessage } from "../controllers/messages/getmessage";
import { createMessage } from "../controllers/messages/createmessage";
import { deleteMessage } from "../controllers/messages/deletemessage";
import { updateMessage } from "../controllers/messages/updatemessage";
import {
  ChannelIdParams,
  createMessageBody,
  GetOneMessageParams,
  messageQuery,
  updateMessageRequestBody,
} from "../types/message_types";

export async function MessageRouter(server: FastifyInstance) {
  server.get<{ Params: GetOneMessageParams; Querystring: messageQuery }>(
    "/channels/:channelId/messages",
    getMessages
  );
  server.post<{ Params: ChannelIdParams; Body: createMessageBody }>(
    "/channels/:channelId/messages",
    createMessage
  );

  server.get<{ Params: GetOneMessageParams }>(
    "/channels/:channelId/messages/:messageId",
    getOneMessage
  );
  server.patch<{
    Params: GetOneMessageParams;
    Body: updateMessageRequestBody;
  }>("/channels/:channelId/messages/:messageId", updateMessage);
  server.delete<{ Params: GetOneMessageParams }>(
    "/channels/:channelId/messages/:messageId",
    deleteMessage
  );
}
