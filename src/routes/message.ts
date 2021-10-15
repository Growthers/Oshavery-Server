import { FastifyInstance } from "fastify";
import { getMessages, getOneMessage } from "../controllers/messages/getmessage";
import { createMessage } from "../controllers/messages/createmessage";
import { deleteMessage } from "../controllers/messages/deletemessage";
import { updateMessage } from "../controllers/messages/updatemessage";

export async function MessageRouter(server: FastifyInstance) {
  server.get("/channels/:channelId/messages", getMessages);
  server.post("/channels/:channelId/messages", createMessage);

  server.get("/channels/:channelId/messages", getOneMessage);
  server.patch("/channels/:channelId/messages", updateMessage);
  server.delete("/channels/:channelId/messages", deleteMessage);
}
