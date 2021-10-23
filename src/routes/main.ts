import { FastifyInstance } from "fastify";
import { InstanceInfoRouter } from "./info.js";
import { ChannelRouter } from "./channel.js";
import { MediaRouter } from "./media.js";
import { UserRouter } from "./user.js";
import { GuildRouter } from "./guild.js";
import { Login } from "../controllers/auth/login.js";
import { MessageRouter } from "./message.js";

export async function MainRouting(server: FastifyInstance) {
  // /version /server-info
  await InstanceInfoRouter(server);
  await ChannelRouter(server);
  await MediaRouter(server);
  await UserRouter(server);
  await GuildRouter(server);
  await AuthRouter(server);
  await MessageRouter(server);
}

async function AuthRouter(server: FastifyInstance) {
  await Login(server);
}
