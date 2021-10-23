import { FastifyInstance } from "fastify";
import { getMessages, getOneMessage } from "../controllers/messages/getmessage";
import { createMessage } from "../controllers/messages/createmessage";
import { deleteMessage } from "../controllers/messages/deletemessage";
import { updateMessage } from "../controllers/messages/updatemessage";

export async function MessageRouter(server: FastifyInstance) {
  server.get("/channels/:channelId/messages", getMessages);
  server.post("/channels/:channelId/messages", createMessage);

  server.get("/channels/:channelId/messages/:messageId", getOneMessage);
  server.patch("/channels/:channelId/messages/:messageId", updateMessage);
  server.delete("/channels/:channelId/messages/:messageId", deleteMessage);
}
