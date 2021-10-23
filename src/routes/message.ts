import { FastifyInstance } from "fastify";
import {
  getMessages,
  getOneMessage,
} from "../controllers/messages/getmessage.js";
import { createMessage } from "../controllers/messages/createmessage.js";
import { deleteMessage } from "../controllers/messages/deletemessage.js";
import { updateMessage } from "../controllers/messages/updatemessage.js";
import { GuildIdParam } from "../types/guild_types";
import { AuthHeaders } from "../types/auth_types";
import {
  GetOneMessageParams,
  messageQuery,
  updateMessageRequestBody,
} from "../types/message_types";
import { createMessage as CreateMessage } from "../types/message_types";

export async function MessageRouter(server: FastifyInstance) {
  server.get<{
    Params: GuildIdParam;
    Headers: AuthHeaders;
    Querystring: messageQuery;
  }>("/channels/:channelId/messages", getMessages);
  server.post<{ Body: CreateMessage; Headers: AuthHeaders }>(
    "/channels/:channelId/messages",
    createMessage
  );

  server.get<{ Params: GetOneMessageParams; Headers: AuthHeaders }>(
    "/channels/:channelId/messages/:messageId",
    getOneMessage
  );
  server.patch<{
    Params: GetOneMessageParams;
    Headers: AuthHeaders;
    Body: updateMessageRequestBody;
  }>("/channels/:channelId/messages/:messageId", updateMessage);
  server.delete<{ Params: GetOneMessageParams; Headers: AuthHeaders }>(
    "/channels/:channelId/messages/:messageId",
    deleteMessage
  );
}
